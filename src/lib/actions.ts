"use server";
import { auth } from "@clerk/nextjs/server";
import prisma from "./client";
import { z } from "zod";
import { revalidatePath } from "next/cache";


export const handleFollow = async (userId: string) =>{
    const { userId: currentUserId } = auth();

    if(!currentUserId) throw new Error("User is not currently authenticated");

    try {
        const existingFollow = await prisma.follower.findFirst({
            where:{
                followerId: currentUserId,
                followingId: userId
            },
        });

        if(existingFollow){
            await prisma.follower.delete({
                where:{
                    id: existingFollow.id
                }
            });
        } else {
            // If existingFollow is false, then check if a follow req was already sent, -
            const existingFollowRequest = await prisma.followRequest.findFirst({
                where:{
                    senderId: currentUserId,
                    receiverId: userId
                }
            });

            //- if sent remove it
            if(existingFollowRequest){
                await prisma.followRequest.delete({
                    where:{
                        id: existingFollowRequest.id
                    }
                });
            } else {
                // If the current user is not being followed and a request was not already sent, send a request
                await prisma.followRequest.create({
                    data: {
                        senderId: currentUserId,
                        receiverId: userId
                    }
                });
            }
        }
    } catch (error) {
        console.log(error);
        throw new Error("Something went wrong!!")
    }
}

export const handleBlock = async (userId: string) => {
    const { userId: currentUserId } = auth();

    if(!currentUserId) throw new Error("User is not Authenticated!!");
    
    try{
        const existingBlock = await prisma.block.findFirst({
            where:{
                blockerId: currentUserId,
                blockedId: userId
            }
        });
        
        if(existingBlock){
            await prisma.block.delete({
                where:{
                    id: existingBlock.id
                }
            });
        } else {
            // If the current user is not being followed and a request was not already sent, send a request
            await prisma.block.create({
                data: {
                    blockerId: currentUserId,
                    blockedId: userId
                }
            });
        }
    } catch(err){
        console.log(`Error:\t ${err}`);
    }
}

export const acceptFollowRequest = async (userId: string) => {
    const { userId: currentUserId } = auth();
    
    if(!currentUserId) throw new Error("User is not Authenticated!!");

    try {
        const existingFolloweRequest = await prisma.followRequest.findFirst({
            where:{
                senderId: userId,
                receiverId: currentUserId
            }
        });
    
        if(existingFolloweRequest){
            await prisma.followRequest.delete({
                where:{
                    id: existingFolloweRequest.id
                }
            });
        }
    
        await prisma.follower.create({
            data:{
                followerId: userId,
                followingId: currentUserId
            }
        });
        
    } catch (error) {
        console.log(`Error: ${error}`);
        throw new Error("Something went wrong!");
    }
}

export const rejectFollowRequest = async (userId: string) => {
    const { userId: currentUserId } = auth();
    
    if(!currentUserId) throw new Error("User is not Authenticated!!");

    try {
        const existingFolloweRequest = await prisma.followRequest.findFirst({
            where:{
                senderId: userId,
                receiverId: currentUserId
            }
        });
    
        if(existingFolloweRequest){
            await prisma.followRequest.delete({
                where:{
                    id: existingFolloweRequest.id
                }
            });
        }
    
    } catch (error) {
        console.log(`Error: ${error}`);
        throw new Error("Something went wrong!");
    }
}

export const updateProfile = async (
    prevState: { success: boolean, error: boolean }, 
    payload: { formData: FormData, cover: string }
) => {

    const { cover, formData } = payload;
    console.log("\nForm Data:\t", Object.fromEntries(formData)); 
    
    const data = Object.fromEntries(formData);

    const stringz = z.string();

    const profile = z.object({
        cover: stringz.optional(),
        name: stringz.max(60).optional(),
        surname: stringz.max(60).optional(),
        description: stringz.max(60).optional(),
        city: stringz.max(60).optional(),
        school: stringz.max(60).optional(),
        work: stringz.max(60).optional(),
        website: stringz.max(60).optional(),
    });

    // Spread all the fields and pass in the cover image along with it
    const validateFields = profile.safeParse({ cover, ...data});
    

    if(!validateFields.success) {
        console.log(validateFields.error.flatten().fieldErrors);
        return { success: false, error: true };
    }
    
    const filteredValues = Object.fromEntries(
        // Filter out and don't push the values with empty string "" into the filteredValues[]
        Object.entries(data).filter(
            // This is to prevent the field data to be updated with placeholder data, when the data for that field was not provided during the update{if no data was provided, it reach the db as an empty string ""}
            // PS:  The underscore (_) is used as a placeholder for the key part of the pair, indicating that the key is not used in the filter condition. This is a common convention in programming when a variable is required syntactically but not used.
            ([_, value]) => value !== ""
        )
    );
    
    const { userId } = auth();
    
    if(!userId) return { success: false, error: true };
    
    try {
        await prisma.user.update({
            where:{
                id: userId
            },
            data: validateFields.data
        });
        return { success: true, error: false };
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
    
}

export const addComment = async (postId: number, desc: string) => {
    const { userId } = auth();

    if(!userId) throw new Error("User is not authenticated!!");

    try {
        // createdComment would be used to update the UI
        const createdComment = await prisma.comment.create({
            data:{
                desc,
                postId,
                userId
            },
            include:{
                user: true
            }
        });
        return createdComment;
    } catch (error) {
        console.log(`Error:${error}`);
        throw new Error("Sorry! something went wrong")
    }

}

export const switchLike = async (postId: number) => {
    const { userId } = auth();

    if(!userId) throw new Error("User is not authenticated!!");

    try {
        const existingLike = await prisma.like.findFirst({
            where:{
                postId,
                userId
            },
        });

        // Remove the like if the post that has been liked was already liked(flip the state), if not, like it
        if(existingLike){
            await prisma.like.delete({
                where:{
                    id: existingLike.id
                }
            });
        } else {
            await prisma.like.create({
                data:{
                    postId,
                    userId
                }
            });
        }
    } catch (error) {
        console.log(`Error:${error}`);
        throw new Error("Sorry! something went wrong")
    }

}

export const addPost = async (formData: FormData, img: string) => {

    const desc = formData.get("desc") as string;

    const Desc = z.string().min(15).max(255);

    const validationDesc = Desc.safeParse(desc);

    if(!validationDesc){
        console.log("The description is not valid!!");
        return;
    }

    const { userId } = auth();

    if(!userId) throw new Error("User is not authenticated!!");

    try {
        await prisma.post.create({
            data:{
                desc: validationDesc.data!,
                userId,
                img
            },
        });

        console.log(`This was sent to the server:\t${validationDesc.data}`);
        
        revalidatePath("/");
    } catch (error) {
        console.log(`error:\t${error}`);
    }
}

export const addStory = async (img: string) => {

    const { userId } = auth();

    if(!userId) throw new Error("User is not authenticated!!");

    try {

        const existingStory = await prisma.story.findFirst({
            where:{
                userId
            }
        });

        if(existingStory){
            await prisma.story.delete({
                where:{
                    id: existingStory.id
                }
            });
        }


        const createdStory = await prisma.post.create({
            data:{
                userId,
                img,
                expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
            },
            include:{
                user: true
            }
        });
        
        return createdStory;
    } catch (error) {
        console.log(`error:\t${error}`);
    }
}