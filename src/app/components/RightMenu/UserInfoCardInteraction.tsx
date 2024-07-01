"use client";; 
import React from 'react'

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
    return (
        <div>
            <form action="">
                <button className="bg-blue-200 h-8 hover:bg-blue-500 text-white text-sm rounded-md">
                    {
                        isFollowing
                            ? "Following" 
                                : isFollowingSent
                                    ? "Requested"
                                    : "Follow"
                    }
                </button>
            </form>
            <form action="" className='self-end'>
                <span className="bg-red-100 p-2 rounded-md hover:bg-red-500 hover:text-white self-end text-xs cursor-pointer">
                    { isBlocked ? "Unblock User" : "Block User"}
                </span>
            </form>
        </div>
    )
}

export default UserInfoCardInteraction