import Link from "next/link"
import MobileMenu from "./MobileMenu"
import Image from "next/image"


const NavBar = () => {
    return (
        <div className="h-24 flex items-center justify-between">
            {/* Left */}
            <div className="md:hidden lg:block w-[20%]">
                <Link className="font-bold text-xl text-orange-500" href="/">GSpace</Link>
            </div>

            {/* Center */}
            <div className="hidden md:flex w-[50%] text-sm">
                <div className="flex gap-6 text-gray-600">
                    <Link href="/" className="flex gap-2">
                        <Image alt="home" src="/icons/home.png" className="w-4 h-4" width={16} height={16} />
                        <span className="">Home</span>
                    </Link>
                    <Link href="/" className="flex gap-2">
                        <Image alt="friends" src="/icons/friends.png" className="w-4 h-4 mt-1" width={16} height={16} />
                        <span className="">Friends</span>
                    </Link>
                    <Link href="/" className="flex gap-2">
                        <Image alt="stories" src="/icons/stories.png" className="w-4 h-4 mt-1" width={16} height={16} />
                        <span className="">Stories</span>
                    </Link>
                </div>
            </div>

            {/* Right */}
            <div className="w-[30%] flex items-center gap-4 xl:gap-8 justify-end">
                <MobileMenu />
            </div>
        </div>
    )
}

export default NavBar