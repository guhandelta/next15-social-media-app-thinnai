'use client';
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

const UserInfoCard = ({ userId }:{ userId?: string }) => {

    return (
        <div className="p-4 bg-white rounded-lg shadow-sm text-sm flex flex-col gap-4">
            {/* TOP */}
            <div className="flex gap-3 justify-between">
                <span className="text-gray-500">User Information</span>
                <Link href="" className="text-blue-500 text-sm">See More</Link>
            </div>
            {/* BOTTOM */}
            <div className="flex flex-col gap-4 text-gray-500">
                <div className="flex items-center gap-2">
                    <span className="text-xl text-black">Guha</span>
                    <span className="text-sm">@guhan</span>
                </div>
                <p className="">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, libero at eos autem cupiditate dignissimos totam aliquid, debitis perferendis.
                </p>
                <div className="flex items-center gap-2">
                    <Image src="/map.png" alt="" width={16} height={16} />
                    <span>Living in <b>Charlotte</b></span>
                </div>
                <div className="flex items-center gap-2">
                    <Image src="/map.png" alt="" width={16} height={16} />
                    <span>Went to <b>Marshall University</b></span>
                </div>
                <div className="flex items-center gap-2">
                    <Image src="/map.png" alt="" width={16} height={16} />
                    <span>Works at <b>Walmart</b></span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex gap-1 items-center">
                        <Image src="/link.png" alt='' width={16} height={16} />
                        <Link href="https://guhaprasaanthn.com" className="text-blue-500 font-medium">guhaprasaanthn.com</Link>
                    </div>
                </div>
                <div className="flex gap-1 items-center">
                    <Image src="/date.png" alt='' width={16} height={16} />
                    <span className="">Joined June 2019</span>
                </div>
            </div>
            <button className="bg-blue-200 hover:bg-blue-500 text-white text-sm rounded-md">Follow</button>
            <span className="bg-red-100 hover:bg-red-500 self-end text-xs cursor-pointer">Block User</span>
        </div>
    )
}

export default UserInfoCard