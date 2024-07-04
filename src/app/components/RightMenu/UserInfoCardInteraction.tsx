"use client";; 
import { handleBlock, handleFollow } from '@/lib/actions';
import { useOptimistic, useState } from 'react'

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
        // Call the handleOptimisticFollow function to update the UI optimistically by passing what should be updated
        handleOptimisticState("follow");

        try {
            // Call the server action with the userId from the props to handle the follow request
            await handleFollow(userId);
            // Upadate only the following state and followingRequestSent state, without changing the blocked state
            setUserState((prev) => ({
                // Spread the previous state to preventh overwriting the blocked state
                ...prev,
                // If the user is already following(prev.following is true), then set following to false
                following: prev.following && false,
                /* If the user was not already followed,
                and a follow request was not already sent, then set followingRequestSent to true 
                
                If the user is already followed, and if the request was not already sent, remove the request and the result with be false, but if the request was not sent, the result will be true.
                set followingRequestSent to false
                */
                followingRequestSent: !prev.following && !prev.followingRequestSent ? true : false
            }));
        } catch (error) {
            console.log(`error: ${error}`);
        }
    };
    
    const block = async () => {
        // Call the handleOptimisticFollow function to update the UI optimistically by passing what should be updated
        handleOptimisticState("block");
        
        try {
            await handleBlock(userId);
            // Update the blocked state by flipping it
            setUserState((prev) => ({
                ...prev,
                blocked: !prev.blocked
            }));
        } catch (error) {
            console.log(`error: ${error}`);
        }
    }

    // Since the state also holds the blocked state, we can use the same useOptimistic() hook to update the UI optimistically
    const [ optimisticState, handleOptimisticState ] = useOptimistic(
        userState,
        (state, value: "follow" | "block") => value === "follow" 
        ? {
            ...state,
            following: state.following && false,
            followingRequestSent: !state.following && !state.followingRequestSent ? true : false
        } : {
            ...state,
            blocked: !state.blocked
        }
    );

    return (
        <>
            <form action={follow}>
                <button className="bg-blue-200 w-full h-8 hover:bg-blue-500 text-white text-sm rounded-md">
                    {
                        optimisticState.following
                            ? "Following" 
                                : optimisticState.followingRequestSent
                                    ? "Follow Request Sent"
                                    : "Follow"
                    }
                </button>
            </form>
            <form action={block} className='self-end'>
                <button>
                    <span className="bg-red-100 w-full p-2 rounded-md hover:bg-red-500 hover:text-white self-end text-xs cursor-pointer">
                        { optimisticState.blocked ? "Unblock User" : "Block User"}
                    </span>
                </button>
            </form>
        </>
    )
}

export default UserInfoCardInteraction