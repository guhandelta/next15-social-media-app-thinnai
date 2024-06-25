import Image from "next/image"


const ProfileCard = () => {
    return (
        <div className=" bg-white rounded-lg shadow-md text-sm flex flex-col gap-6">
            <div className="h-20 relative">
                <Image src="https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&w=1200" 
                    alt="" 
                    fill
                    className="rounded-md object-cover" 
                    />
                <Image src="https://images.pexels.com/photos/2405640/pexels-photo-2405640.jpeg?auto=compress&cs=tinysrgb&w=800" 
                    alt="" 
                    width={64} 
                    height={64} 
                    className=" rounded-full object-cover w-18 h-16 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10" 
                />
            </div>
            <div className=" h-24 flex flex-col gap-2 items-center">
                <span className="font-semibold">Guhaprasaanth Nandagopal</span>
                <div className="flex items-center gap-4">
                    <div className="flex">
                        <Image src="https://images.pexels.com/photos/7125530/pexels-photo-7125530.jpeg?auto=compress&cs=tinysrgb&w=800" 
                            alt="" 
                            width={12} 
                            height={12} 
                            className="rounded-full object-cover w-3 h-3" 
                        />
                        <Image src="https://images.pexels.com/photos/712067/pexels-photo-712067.jpeg?auto=compress&cs=tinysrgb&w=800" 
                            alt="" 
                            width={12} 
                            height={12} 
                            className="rounded-full object-cover w-3 h-3" 
                        />
                        <Image src="https://images.pexels.com/photos/1539225/pexels-photo-1539225.jpeg?auto=compress&cs=tinysrgb&w=800" 
                            alt="" 
                            width={12} 
                            height={12} 
                            className="rounded-full object-cover w-3 h-3" 
                        />
                    </div>
                    <span className="text-xs text-gray-500">450 Followers</span>
                </div>
                <button className="p-2 bg-blue-500 text-white text-xs rounded-md">My Profile</button>
            </div>
        </div>
    )
}

export default ProfileCard