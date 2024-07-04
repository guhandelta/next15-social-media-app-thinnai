import { FC } from "react";
import Image from "next/image";
import Link from "next/link"
import prisma from "@/lib/client";
import { User } from "@prisma/client";

// 'UserMediaCard' implicitly has type 'any' because it does not have a type annotation and is referenced directly or indirectly in its own initializer, so used te 'FC' type annotation
const UserMediaCard: FC<{ user: User }> = async ({ user }) => {

    const postsWithMedia = await prisma.post.findMany({
        where: {
            userId: user.id,
            // If only the desc is available, then it is not required
            img: {
                not: null
            },
        },
        take: 8,
        orderBy: {
            createdAt: 'desc'
        }
    });
    
    return ( <div className="p-4 bg-white rounded-lg shadow-sm text-sm flex flex-col gap-4">
        {/* TOP */}
        <div className="flex gap-3 justify-between">
            <span className="text-gray-500">User Media</span>
            <Link href="" className="text-blue-500 text-sm">See More</Link>
        </div>
        {/* BOTTOM */}
        <div className="flex flex-wrap gap-4 justify-between">
            {postsWithMedia.length ? postsWithMedia.map(({ id, img }) => 
                <div key={id} className="relative w-1/5 h-24">
                    <Image src={img!} alt="" fill className="object-cover rounded-md" />
                </div>
            ):"No media found!"}
        </div>
    </div>
)}

export default UserMediaCard