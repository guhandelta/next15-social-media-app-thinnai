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
                // The current user is not being followed and a request was not already sent, send a request
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