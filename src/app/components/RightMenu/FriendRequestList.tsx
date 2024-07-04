"use client";
{/* When a friend request is accepted or rejected, it should disappear, which can beimplemented using useOptimistic hook, which can be done only in a client component, so that part would be isolated into it's own client component, as data fetching is always best when done using server component  */}
import { acceptFollowRequest, rejectFollowRequest } from '@/lib/actions';
import { FollowRequest, User } from '@prisma/client';
import Image from 'next/image';
import { useOptimistic, useState } from 'react'

type RequestWithUser = FollowRequest & {
    sender: User
};

// The type for the requests prop is cannote be given as Request,as the user/sender data  datais also fetched from teh FollowRequest table
const FriendRequestList = ({ requests }: { requests: RequestWithUser[] }) => {
    const [requestState, setRequestState] = useState(requests);

    const accept = async (requestId: number, userId: string) => {

        removeOptimisticRequest(requestId);

        try {
            await acceptFollowRequest(userId);
            setRequestState((prev) => prev.filter((request) => request.id !== requestId));
        } catch (error) {
            console.log(`error: ${error}`);
        }
    }

    const reject = async (requestId: number, userId: string) => {

        removeOptimisticRequest(requestId);

        try {
            await rejectFollowRequest(userId);
            setRequestState((prev) => prev.filter((request) => request.id !== requestId));
        } catch (error) {
            console.log(`error: ${error}`);
        }
    }
    
    const [ optimisticRequests, removeOptimisticRequest ] = useOptimistic(
        requestState,
        (state, value: number) => state.filter((request) => request.id !== value)
    );
    return (
        <div>
            {optimisticRequests.map(({ id, sender }) => (
                <div className="flex items-center justify-between" key={id}>
                    <div className="flex items-center gap-4">
                        <Image 
                            src={sender.avatar || "https://images.pexels.com/photos/7125530/pexels-photo-7125530.jpeg?auto=compress&cs=tinysrgb&w=800"}
                            alt="Hiker" 
                            width={40} 
                            height={40} 
                            className="w-10 h-10 rounded-full object-cover" 
                        />
                        <span className="font-semibold">
                            { 
                                (sender.name && sender.surname) 
                                    ? sender.name 
                                    : sender.username 
                            }
                        </span>
                    </div>
                    <div className="flex gap-3 justify-end">
                        <form action={() => accept(id, sender.id)}>
                            <button type='submit'>
                                <Image src="/accept.png" alt="accept" width={20} height={20} className="cursor-pointer" />
                            </button>
                        </form>
                        <form action={() => reject(id, sender.id)}>
                            <button type='submit'>
                                <Image src="/reject.png" alt="reject" width={20} height={20} className="cursor-pointer" />
                            </button>
                        </form>
                    </div>
                </div> 
            ))}
        </div>
    )
}

export default FriendRequestList