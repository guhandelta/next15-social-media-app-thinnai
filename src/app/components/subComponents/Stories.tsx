import prisma from '@/lib/client'
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image'
import StoryList from './StoryList';

const Stories = async  () => {
    const { userId: currentUserId } = auth();

    if(!currentUserId) throw new Error("User is not currently authenticated");
    const stories = await prisma.story.findMany({
        where:{
            expiresAt: {
                // greater than today's date, as it will be available for 24 hours
                gt: new Date()
            },
            // Searching for the ID, inside the follower, inside the user, inside the story
            OR:[
                {
                    user: {
                        followers:{
                            some:{
                                followerId: currentUserId 
                            }
                        }
                    }
                },
                {
                    // So the current user can see their own story also
                    userId: currentUserId
                }
            ]
        },
        include:{
            user: true
        }
    });

    return (
        <div className="p-4 bg-white rounded-lg shadow-md overflow-scroll text-sm scrollbar-none">
            {/* Since the parent div has overflow-scroll when the size of the second div is w-full. It won't try to overflow. So tag this div with a maximum content to allow the overflow. */}
            <div className="flex gap-8 w-max">
                {/* Stories */}
                <StoryList stories={stories} userId={currentUserId} />
            </div>
        </div>
    )
}

export default Stories