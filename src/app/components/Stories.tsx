import Image from 'next/image'

const Stories = () => {
    return (
        <div className="p-4 bg-white rounded-lg shadow-md overflow-scroll text-sm scrollbar-none">
            {/* Since the parent div has overflow-scroll when the size of the second div is w-full. It won't try to overflow. So tag this div with a maximum content to allow the overflow. */}
            <div className="flex gap-8 w-max">
                {/* Stories */}
                <div className="flex flex-col items-center gap-2 cursor-pointer">
                    <Image 
                        src="https://images.pexels.com/photos/1066176/pexels-photo-1066176.jpeg?auto=compress&cs=tinysrgb&w=800" 
                        alt='' 
                        width={80} 
                        height={80} 
                        className="w-20 h-20 rounded-full ring-2" 
                    />
                    <span className="font-medium">Partha</span>
                </div>
                <div className="flex flex-col items-center gap-2 cursor-pointer">
                    <Image 
                        src="https://images.pexels.com/photos/1066176/pexels-photo-1066176.jpeg?auto=compress&cs=tinysrgb&w=800" 
                        alt='' 
                        width={80} 
                        height={80} 
                        className="w-20 h-20 rounded-full ring-2" 
                    />
                    <span className="font-medium">Partha</span>
                </div>
                <div className="flex flex-col items-center gap-2 cursor-pointer">
                    <Image 
                        src="https://images.pexels.com/photos/1066176/pexels-photo-1066176.jpeg?auto=compress&cs=tinysrgb&w=800" 
                        alt='' 
                        width={80} 
                        height={80} 
                        className="w-20 h-20 rounded-full ring-2" 
                    />
                    <span className="font-medium">Partha</span>
                </div>
                <div className="flex flex-col items-center gap-2 cursor-pointer">
                    <Image 
                        src="https://images.pexels.com/photos/1066176/pexels-photo-1066176.jpeg?auto=compress&cs=tinysrgb&w=800" 
                        alt='' 
                        width={80} 
                        height={80} 
                        className="w-20 h-20 rounded-full ring-2" 
                    />
                    <span className="font-medium">Partha</span>
                </div>
                <div className="flex flex-col items-center gap-2 cursor-pointer">
                    <Image 
                        src="https://images.pexels.com/photos/1066176/pexels-photo-1066176.jpeg?auto=compress&cs=tinysrgb&w=800" 
                        alt='' 
                        width={80} 
                        height={80} 
                        className="w-20 h-20 rounded-full ring-2" 
                    />
                    <span className="font-medium">Partha</span>
                </div>
                <div className="flex flex-col items-center gap-2 cursor-pointer">
                    <Image 
                        src="https://images.pexels.com/photos/1066176/pexels-photo-1066176.jpeg?auto=compress&cs=tinysrgb&w=800" 
                        alt='' 
                        width={80} 
                        height={80} 
                        className="w-20 h-20 rounded-full ring-2" 
                    />
                    <span className="font-medium">Partha</span>
                </div>
                <div className="flex flex-col items-center gap-2 cursor-pointer">
                    <Image 
                        src="https://images.pexels.com/photos/1066176/pexels-photo-1066176.jpeg?auto=compress&cs=tinysrgb&w=800" 
                        alt='' 
                        width={80} 
                        height={80} 
                        className="w-20 h-20 rounded-full ring-2" 
                    />
                    <span className="font-medium">Partha</span>
                </div>
                <div className="flex flex-col items-center gap-2 cursor-pointer">
                    <Image 
                        src="https://images.pexels.com/photos/1066176/pexels-photo-1066176.jpeg?auto=compress&cs=tinysrgb&w=800" 
                        alt='' 
                        width={80} 
                        height={80} 
                        className="w-20 h-20 rounded-full ring-2" 
                    />
                    <span className="font-medium">Partha</span>
                </div>
                <div className="flex flex-col items-center gap-2 cursor-pointer">
                    <Image 
                        src="https://images.pexels.com/photos/1066176/pexels-photo-1066176.jpeg?auto=compress&cs=tinysrgb&w=800" 
                        alt='' 
                        width={80} 
                        height={80} 
                        className="w-20 h-20 rounded-full ring-2" 
                    />
                    <span className="font-medium">Partha</span>
                </div>
                <div className="flex flex-col items-center gap-2 cursor-pointer">
                    <Image 
                        src="https://images.pexels.com/photos/1066176/pexels-photo-1066176.jpeg?auto=compress&cs=tinysrgb&w=800" 
                        alt='' 
                        width={80} 
                        height={80} 
                        className="w-20 h-20 rounded-full ring-2" 
                    />
                    <span className="font-medium">Partha</span>
                </div>
            </div>
        </div>
    )
}

export default Stories