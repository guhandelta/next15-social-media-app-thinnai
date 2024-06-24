import Image from "next/image"
import Link from "next/link"

const users = [
    {
        id: 1,
        name: "Nevethitha",
        image: "https://images.pexels.com/photos/20792003/pexels-photo-20792003/free-photo-of-woman-standing-in-blue-traditional-clothing-in-doorway.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        id: 2,
        name: "Andrew",
        image: "https://images.pexels.com/photos/20752332/pexels-photo-20752332/free-photo-of-portrait-of-man-covered-with-paint.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        id: 3,
        name: "Makesh",
        image: "https://images.pexels.com/photos/20769879/pexels-photo-20769879/free-photo-of-people-during-color-festival.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
];

const FriendRequests = () => {
    return (
        <div className="p-4 bg-white rounded-lg shadow-sm text-sm flex flex-col gap-4">
            {/* TOP */}
            <div className="">
                <span className="text-gray-500">Friend Requests</span>
                <Link href="" className="text-blue-500 text-sm">See More</Link>
            </div>
            {/* USER */}
            {users.map(({ id, name, image }) => (
                <div key={id} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Image 
                            src={image}
                            alt="" 
                            width={40} 
                            height={40} 
                            className="w-10 h-10 rounded-full object-cover" 
                        />
                        <span className="">{name}</span>
                    </div>
                    <div className="flex gap-3 justify-end">
                        <Image src="/accept.png" alt="accept" width={20} height={20} className="cursor-pointer" />
                        <Image src="/reject.png" alt="reject" width={20} height={20} className="cursor-pointer" />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default FriendRequests