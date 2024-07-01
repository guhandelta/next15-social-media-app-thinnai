"use client";; 
import { handleFollow } from '@/lib/actions';
import { useState } from 'react'

const UserInfoCardInteraction = ({ 
    userId,
    currentUserId,
    isBlocked,
    isFollowing,
    isFollowingSent 
}:{
    userId: string,
    currentUserId: string,
    isBlocked: boolean,
    isFollowing: boolean,
    isFollowingSent: boolean

}) => {
    // Using state here to change the butotn text as per following status
    const [userState, setUserState] = useState({
        blocked: isBlocked,
        following: isFollowing,
        followingRequestSent: isFollowingSent,
    });

    const follow = async () => {
        try {
            await handleFollow(userId);
            // Upadate only the following state and followingRequestSent state, without changing the blocked state
            setUserState((prev) => ({
                ...prev,
                // If the user is already following(prev.following is true), then set following to false
                following: prev.following && false,
                // If the user was not already followed and a follow request was not already sent, then set followingRequestSent to true
                followingRequestSent: !prev.following && !prev.followingRequestSent ? true : false
            }));
        } catch (error) {
            
        }
    };

    return (
        <>
            <form action={follow}>
                <button className="bg-blue-200 w-full h-8 hover:bg-blue-500 text-white text-sm rounded-md">
                    {
                        userState.following
                            ? "Following" 
                                : userState.followingRequestSent
                                    ? "Follow Request Sent"
                                    : "Follow"
                    }
                </button>
            </form>
            <form action="" className='self-end'>
                <span className="bg-red-100 w-full p-2 rounded-md hover:bg-red-500 hover:text-white self-end text-xs cursor-pointer">
                    { userState.blocked ? "Unblock User" : "Block User"}
                </span>
            </form>
        </>
    )
}

export default UserInfoCardInteraction