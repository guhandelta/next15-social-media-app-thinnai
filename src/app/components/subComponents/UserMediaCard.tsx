'use client';
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link"
import { useEffect } from "react";

const media = [
    {
        id: 1,
        image: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        id: 2,
        image: "https://images.pexels.com/photos/6775268/pexels-photo-6775268.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        id: 3,
        image: "https://images.pexels.com/photos/572861/pexels-photo-572861.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        id: 4,
        image: "https://images.pexels.com/photos/4846437/pexels-photo-4846437.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        id: 5,
        image: "https://images.pexels.com/photos/5560909/pexels-photo-5560909.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        id: 6,
        image: "https://images.pexels.com/photos/784633/pexels-photo-784633.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
];

const UserMediaCard = ({ user }:{ user : User }) => {
    media.map(({ id, image }) => console.log({ id, image }));
    
    return ( <div className="p-4 bg-white rounded-lg shadow-sm text-sm flex flex-col gap-4">
        {/* TOP */}
        <div className="flex gap-3 justify-between">
            <span className="text-gray-500">User Media</span>
            <Link href="" className="text-blue-500 text-sm">See More</Link>
        </div>
        {/* BOTTOM */}
        <div className="flex flex-wrap gap-4 justify-between">
            {media.map(({ id, image }) => 
                <div key={id} className="relative w-1/5 h-24">
                    <Image src={image} alt="" fill className="object-cover rounded-md" />
                </div>
            )}
        </div>
    </div>
)}


export default UserMediaCard