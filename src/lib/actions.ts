"use server";
import { auth } from "@clerk/nextjs/server";
import prisma from "./client";


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

export const updateProfile = async (formData: FormData) =>{

    console.log("updateProfile Entry");

    console.log("\nForm Data:\t", Object.fromEntries(formData));
    
    const data = Object.fromEntries(formData);
    
    console.log("updateProfile Exit");
    
}