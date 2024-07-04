import prisma from '@/lib/client';
import { auth } from '@clerk/nextjs/server';
import { User } from '@prisma/client';
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import UserInfoCardInteraction from './UserInfoCardInteraction';

const UserInfoCard = async ({ user }:{ user: User }) => {

    const { name, username, description, website, city, school, work, createdAt } = user;

    const formattedDate = createdAt.toLocaleDateString("en-US",{
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    let isBlocked = false;
    let isFollowing = false;
    let isFollowingSent = false;

    const { userId: currentUserId } =  auth();

    if(currentUserId){
        const blockStatusResponse = await prisma.block.findFirst({
            where: {
                blockedId: user.id,
                blockerId: currentUserId
            }
        });
        
        blockStatusResponse ? (isBlocked = true) : (isBlocked = false);
        
        const followStatusResponse = await prisma.follower.findFirst({
            where: {
                followingId: user.id,
                followerId: currentUserId
            }
        });

        followStatusResponse ? (isFollowing = true) : (isFollowing = false);

        const followRequestStatusResponse = await prisma.followRequest.findFirst({
            where: {
                senderId: currentUserId,
                receiverId: user.id
            }
        });

        followRequestStatusResponse ? (isFollowingSent = true) : (isFollowingSent = false);
    }

    console.log("User Info: ", user)

    return (
        <div className="p-4 bg-white rounded-lg shadow-sm text-sm flex flex-col gap-4">
            {/* TOP */}
            <div className="flex gap-3 justify-between">
                <span className="text-gray-500">User Information</span>
                <Link href="" className="text-blue-500 text-sm">See More</Link>
            </div>
            {/* BOTTOM */}
            <div className="flex flex-col gap-4 text-gray-500">
                <div className="flex items-center gap-2">
                    <span className="text-xl text-black">
                    { (user.name && user.surname) ? user.name + " " + user.surname : user.username }
                    </span>
                    <span className="text-sm">@{name}</span>
                </div>
                <p className="">
                    {description}
                </p>
                <div className="flex items-center gap-2">
                    <Image src="/map.png" alt="" width={16} height={16} />
                    <span>Living in <b>{city}</b></span>
                </div>
                <div className="flex items-center gap-2">
                    <Image src="/map.png" alt="" width={16} height={16} />
                    <span>Went to <b>{school}</b></span>
                </div>
                <div className="flex items-center gap-2">
                    <Image src="/map.png" alt="" width={16} height={16} />
                    <span>Works at <b>{work}</b></span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex gap-1 items-center">
                        <Image src="/link.png" alt='' width={16} height={16} />
                        <Link href="https://guhaprasaanthn.com" className="text-blue-500 font-medium">{website}</Link>
                    </div>
                </div>
                <div className="flex gap-1 items-center">
                    <Image src="/date.png" alt='' width={16} height={16} />
                    <span className="">Joined on: {formattedDate}</span>
                </div>
            </div>
            {(!currentUserId && currentUserId !== user.id) && <UserInfoCardInteraction 
                userId={user.id}
                isBlocked={isBlocked}
                isFollowing={isFollowing}
                isFollowingSent={isFollowingSent}
            />}
        </div>
    )
}

export default UserInfoCard