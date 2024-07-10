import Image from 'next/image'
import React from 'react'
import Comments from './Comments'
import { Post as PostType, User } from '@prisma/client';

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
            <div className="flex items-center justify-between">
                <div className="flex gap-8">
                    <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
                        <Image src="/like.png" alt='like' width={16} height={16} className="cursor-pointer"></Image>
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-500">{post?.likes} &nbsp;
                            <span className="hidden md:inline">
                                Likes
                            </span>
                        </span>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
                        <Image src="/comment.png" alt='like' width={16} height={16} className="cursor-pointer"></Image>
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-500">{post?._count}&nbsp;
                            <span className="hidden md:inline">
                                Comments
                            </span>
                        </span>
                    </div>
                </div>
                <div className="">
                    <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
                        <Image src="/share.png" alt='like' width={16} height={16} className="cursor-pointer"></Image>
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-500">24 &nbsp;
                            <span className="hidden md:inline">
                                Shares
                            </span>
                        </span>
                    </div>
                    
                </div>
            </div>
            <Comments />    
        </div>
    )
}

export default Post