import Image from 'next/image'
import React from 'react'
import Comments from './Comments'
import { Post as PostType, User } from '@prisma/client';
import PostInteraction from './PostInteraction';

type FeedPostType = PostType & { user: User } & { _count: { comments: number } } & { likes: [{ userId: string }] };

const Post = ({ post }: { post: FeedPostType }) => {
    console.log("Post: ", post);
    console.log("Post User: ", post?.user);
    
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
                <Image src="/more.png" alt='User' width={16}height={16} />
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
            <PostInteraction postId={post?.id} likes={post?.likes.map(like => like.userId)} commentsCount={post?._count.comments} />
            <Comments postId={post?.id} />    
        </div>
    )
}

export default Post