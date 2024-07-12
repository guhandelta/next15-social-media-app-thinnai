
import { auth } from '@clerk/nextjs/server';
import Post from './Post'
import prisma from '@/lib/client';

const Feed = async ({ username }: { username: string }) => {

    const { userId } = auth();

    let posts:any[] = [];

    if(username){
        // Fetch all the posts of the user
        posts = await prisma.post.findMany({
            where: {
                user:{
                    username: username
                }
            },
            orderBy:{
                createdAt: "desc"
            },
            include:{
                user: true,
                likes: {
                    select: {
                        userId: true
                    }
                },
                _count: {
                    select: {
                        comments: true
                    }
                },
            }
        });
    }

    // The user is in the homepage
    if(!username && userId){
        const following = await prisma.follower.findMany({
            where: {
                followerId: userId
            },
            select: {
                followingId: true
            },
        });

        const followingIds = following.map((post) => post.followingId);
        const Ids = [...followingIds, userId]
        
        console.log("Following Ids: ", followingIds);
        
        posts = await prisma.post.findMany({
            where: {
                userId: {
                    in: Ids // followingIds
                }
            },
            orderBy:{
                createdAt: "desc"
            },
            include:{
                user: true,
                likes: {
                    select: {
                        userId: true
                    }
                },
                _count: {
                    select: {
                        comments: true
                    }
                },
            }
        });
        
    }

    return (
        <div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-12">
            {
                posts.length ? (posts.map((post) => (
                            <Post key={post.id} post={post} />
                        ))) 
                    : 
                        "No posts found"
            }
        </div>
    )
}

export default Feed;