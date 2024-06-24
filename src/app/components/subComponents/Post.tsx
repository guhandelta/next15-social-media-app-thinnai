import Image from 'next/image'
import React from 'react'
import Comments from './Comments'

const Post = () => {
    return (
        <div className="flex flex-col gap-4">
            {/* User */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Image 
                        src="https://images.pexels.com/photos/5035655/pexels-photo-5035655.jpeg?auto=compress&cs=tinysrgb&w=800" 
                        alt='Skydiver' 
                        width={40}
                        height={40}
                        className='w-10 h-10 rounded-full' 
                    />
                    <span className="font-medium">Guhan</span>
                </div>
                <Image src="/more.png" alt='User' width={16}height={16} />
            </div>
            {/* Description */}
            <div className="flex flex-col gap-4">
                <div className="w-full min-h-96 relative">
                    <Image
                        src="https://images.pexels.com/photos/20841298/pexels-photo-20841298/free-photo-of-man-working-on-a-field.jpeg?auto=compress&cs=tinysrgb&w=800"
                        alt='Coffee'
                        fill
                        className='rounded-md object-cover'
                    />
                </div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error enim rem distinctio, delectus dolore voluptatem! Reprehenderit aperiam harum id molestiae veniam fugiat molestias provident, eum eaque, iusto, dolore odit modi?</p>
            </div>
            {/* Interaction */}
            <div className="flex items-center justify-between">
                <div className="flex gap-8">
                    <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
                        <Image src="/like.png" alt='like' width={16} height={16} className="cursor-pointer"></Image>
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-500">24 &nbsp;
                            <span className="hidden md:inline">
                                Likes
                            </span>
                        </span>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
                        <Image src="/comment.png" alt='like' width={16} height={16} className="cursor-pointer"></Image>
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-500">32 &nbsp;
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