import Image from "next/image"

const Ad = ({ size }: { size: "sm" | "md" | "lg" }) => {
    return (
        <div className="p-4 bg-white rounded-lg shadow-sm text-sm">
            {/* TOP */}
            <div className="flex items-center justify-between text-gray-50 font-medium">
                <span className="flex">Sponsored Ads</span>
                <Image src="/more.png" alt="" width={16} height={16} />
            </div>
            {/* BOTTOM */}
            <div className={`flex flex-col mt-4 ${size === 'sm'? 'gap-2' : 'gap-4'}`}>
                <div className={`relative w-full ${size === 
                    "sm" ? "h-24" : size === "md" ? "h-36" : "h-48"
                }`}>
                    <Image 
                        src="https://images.pexels.com/photos/3771824/pexels-photo-3771824.jpeg?auto=compress&cs=tinysrgb&w=800" 
                        alt="" 
                        fill
                        className="rounded-lg object-cover"
                    />
                </div>
                <div className="flex items-center gap-4">
                    <Image 
                        src="https://images.pexels.com/photos/4450334/pexels-photo-4450334.jpeg?auto=compress&cs=tinysrgb&w=800" 
                        alt="" 
                        width={24} 
                        height={24} 
                        className="w-10 h-10 rounded-full object-cover" 
                    />
                    <span className="text-blue-500 font-medium">Big Chef Lounge</span>
                </div>
                <p className={size === "sm" ? 'text-xs' : 'text-sm'}>
                    {size === "sm" ? "Get 10% off on your first order" : size === "md" ? "Get 20% off on your first order off all appetizers tonight from 6-9 PM." : "Spice up your week with our new street taco menu! Fresh flavors and bold combinations await you and get 30% off on your first order . Visit Allsups today and treat your tastebuds with delicious cuisines."}
                </p>
                <button className="bg-gray-200 text-gray-500 p-2 text-xs rounded-lg hover:bg-blue-500 hover:text-white">Learn More</button>
            </div>
        </div>
    )
}

export default Ad