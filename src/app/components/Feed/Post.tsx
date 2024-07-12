import Image from 'next/image'
import React, { Suspense } from 'react'
import Comments from './Comments'
import { Post as PostType, User } from '@prisma/client';
import PostInteraction from './PostInteraction';
import PostInfo from './PostInfo';
import { auth } from '@clerk/nextjs/server';

type FeedPostType = PostType & { user: User } & { _count: { comments: number } } & { likes: [{ userId: string }] };

const Post = ({ post }: { post: FeedPostType }) => {
    console.log("Post: ", post);
    console.log("Post User: ", post?.user);

    const { userId } = auth();
    
    return (
        <div className="flex flex-col gap-4">
            {/* User */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Image 
                        src={post?.user.avatar || "/noAvatar.png"} 
                        alt='Skydiver' 
                        width={40}
                        height={40}
                        className='w-10 h-10 rounded-full' 
                    />
                    <span className="font-medium">{
                        post?.user.name && post?.user.surname
                            ? post?.user.name + " " + post?.user.surname
                            : post?.user.username
                    }</span>
                </div>
                {/* Checking the request to the server action to see if the post belongs to the current user, to provide the ability to delete the` post */}
                {userId === post.user.id && <PostInfo postId={post?.id} />}
            </div>
            {/* Description */}
            <div className="flex flex-col gap-4">
                <div className="w-full min-h-96 relative">
                    {post?.img && <Image
                        src={post.img} 
                        alt='Coffee'
                        fill
                        className='rounded-md object-cover'
                    />}
                </div>
                <p>{post?.desc}</p>
            </div>
            {/* Interaction */}
            {/* Likes[] has userId, which cannot be assigned to likes[], so get rid of these userId's and take only strings */}
            <Suspense fallback={<div>Loading...</div>}> 
                <PostInteraction postId={post?.id} likes={post?.likes.map(like => like.userId)} commentsCount={post?._count.comments} />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}> 
                <Comments postId={post?.id} />    
            </Suspense>
        </div>
    )
}

export default Post