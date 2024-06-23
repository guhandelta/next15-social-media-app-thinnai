import Image from "next/image"


const Comments = () => {
    return (
        <div className="">
            {/* NEW COMMENT */}
            <div className="flex items-center gap-4">
                <Image src="https://images.pexels.com/photos/20803175/pexels-photo-20803175/free-photo-of-farm-in-the-foothills-of-the-mountain-in-winter.jpeg?auto=compress&cs=tinysrgb&w=800" alt='farm' width={32} height={32} className="w-8 h-8 rounded-full" />
                <div className="flex items-center justify-between bg-slate-100 rounded-xl text-sm py-2 px-6 w-full flex-1">
                    <input type="text" className="bg-transparent outline-none flex-1" placeholder='Share your thoughts...' />
                    <Image src="/emoji.png" alt='farm' width={16} height={16} className="cursor-pointer" />
                </div>
            </div>
            {/* OLD COMMENTS */}
            <div className="">
                {/* COMMENTS */}
                <div className="flex gap-4 justify-between mt-6">
                    {/* Avatar */}
                    <Image src="https://images.pexels.com/photos/20803175/pexels-photo-20803175/free-photo-of-farm-in-the-foothills-of-the-mountain-in-winter.jpeg?auto=compress&cs=tinysrgb&w=800" alt='farm' width={40} height={40} className="w-10 h-10 rounded-full" />
                    {/* Description */}
                    <div className="flex flex-col gap-4">
                        <span className="font-medium">Ranganayaki</span>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error enim rem distinctio, delectus dolore voluptatem! Reprehenderit aperiam harum id molestiae veniam fugiat molestias provident, eum eaque, iusto, dolore odit modi?</p>  
                        <div className="flex items-center gap-8 text-xs text-gray-500 mt-">
                            <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
                                <Image src="/like.png" alt='like' width={16} height={16} className="cursor-pointer"></Image>
                                <span className="text-gray-300">|</span>
                                <span className="text-gray-500">24 &nbsp;
                                    <span className="hidden md:inline">
                                        Likes
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* Icon */}
                    <Image src='/more.png' alt="" width={16} height={16} className="w-4 h-4 cursor-pointer" />
                </div>
            </div>
        </div>
    )
}

export default Comments