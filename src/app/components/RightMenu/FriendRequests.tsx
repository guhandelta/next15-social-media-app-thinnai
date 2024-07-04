import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image"
import Link from "next/link"
import FriendRequestList from "./FriendRequestList";

const FriendRequests = async () => {

    const { userId } = auth();

    if(!userId) return null;

    const requests = await prisma.followRequest.findMany({
        where: {
            receiverId: userId
        },
        include: {
            // Fetch all the info of the sender, by utilizing the Sender field available in the FollowRequest table
            sender: true
        }
    });

    // This component will only be visible if there are any requests
    if(requests.length === 0) return null;

    return (
        <div className="p-4 bg-white rounded-lg shadow-sm text-sm flex flex-col gap-4">
            {/* TOP */}
            <div className="flex gap-3 justify-between">
                <span className="text-gray-500">Friend Requests</span>
                <Link href="" className="text-blue-500 text-sm">See More</Link>
            </div>
            {/* USER */}
            {/* When a friend request is accepted or rejected, it should disappear, which can beimplemented using useOptimistic hook, which can be done only in a client component, so that part would be isolated into it's own client component, as data fetching is always best when done using server component  */}
            <FriendRequestList requests={requests} />
        </div>
    )
}

export default FriendRequests