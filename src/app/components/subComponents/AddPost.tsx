'use client';
import { useAuth } from '@clerk/nextjs'
import Image from 'next/image'
import { useEffect } from 'react';

const AddPost = () => {

  const { userId } = useAuth();

  useEffect(() => console.log("UserId:\t",userId), [])

  const testAction = () => {

  }

  return (
    <div className="p-4  bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm">
      {/* AVATAR */}
      <Image
        src="https://images.pexels.com/photos/1387037/pexels-photo-1387037.jpeg?auto=compress&cs=tinysrgb&w=800"
        alt=""
        width={48}
        height={48}
        className='w-12 h-12 rounded-full object-cover'
        />
      {/* POST */}
      <div className=" flex-1">
        {/* TEXT INPUT */}
        <form className="flex gap-4">
          <textarea className='flex-1 p-2 rounded-lg bg-slate-100' placeholder='What is on your mind?'></textarea>
          <Image 
            src="/emoji.png"
            alt=""
            width={20}
            height={20}
            className='w-5 h-5 cursor-pointer self-end'
          />
        </form>
        {/* POST OPTIONS */}
        <div className="flex items-center gap-4 mt-4 text-gray-400 flex-wrap">
          <div className="flex items-center gap-2 cursor-pointer">
            <Image 
              src="/addImage.png"
              alt=""
              width={20}
              height={20}
              className='w-5 h-5'
            />
            <span>Photo</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image 
              src="/addVideo.png"
              alt=""
              width={20}
              height={20}
              className='w-5 h-5'
            />
            <span>Video</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image 
              src="/addEvent.png"
              alt=""
              width={20}
              height={20}
              className='w-5 h-5'
            />
            <span>Event</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image 
              src="/poll.png"
              alt=""
              width={20}
              height={20}
              className='w-5 h-5'
            />
            <span>Poll</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddPost