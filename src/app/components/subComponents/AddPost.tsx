'use client';
import { addPost } from '@/lib/actions';
import { useUser } from '@clerk/nextjs'
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image'
import { useEffect, useState } from 'react';
import AddPostButton from './AddPostButton';

const AddPost = () => {

  const { user, isLoaded } = useUser();
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState<any>("");

  if(!isLoaded) return 'Loading...';  

  const testAction = () => {

  }

  return (
    <div className="p-4  bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm">
      {/* AVATAR */}
      <Image
        src={user?.imageUrl || "/noAvatar.png"} 
        alt=""
        width={48}
        height={48}
        className='w-12 h-12 rounded-full object-cover'
      />
      {/* POST */}
      <div className=" flex-1">
        {/* TEXT INPUT */}
        <form action={formData => addPost(formData, img?.secure_url || "")} className="flex gap-4">
          <textarea 
            className='flex-1 p-2 rounded-lg bg-slate-100' 
            placeholder='What is on your mind?'
            name="desc"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <div className="flex flex-col h-full items-center border-black">
            <Image 
              src="/emoji.png"
              alt=""
              width={20}
              height={20}
              className=' w-5 h-5 cursor-pointer self-end'
            />
            <AddPostButton />
          </div>
        </form>
        {/* POST OPTIONS */}
        <div className="flex items-center gap-4 mt-4 text-gray-400 flex-wrap">
          <CldUploadWidget 
            uploadPreset="social"  
            onSuccess={(result,{ widget }) => {
              setImg(result.info);  
            }}>
                {({ open, close }) => {
                    return (
                      <div className="flex items-center gap-2 cursor-pointer" onClick={() => open()}>
                        <p className="" onClick={() => close()}>x</p>
                        <Image 
                          src="/addImage.png"
                          alt=""
                          width={20}
                          height={20}
                          className='w-5 h-5'
                        />
                        <span>Photo</span>
                      </div>
                    );
                }}
          </CldUploadWidget>
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