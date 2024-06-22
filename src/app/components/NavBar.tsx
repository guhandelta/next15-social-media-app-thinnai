import Link from "next/link"
import MobileMenu from "./MobileMenu"
import Image from "next/image"
import LoginIcon from '@mui/icons-material/Login';
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"


const NavBar = () => {
    return (
        <div className="h-24 flex items-center justify-between">
            {/* Left */}
            <div className="md:hidden lg:block w-[20%]">
                <Link className="font-bold text-xl text-orange-500" href="/">திண்ணை</Link>
            </div>

            {/* Center */}
            <div className="hidden md:flex w-[50%] text-sm items-center justify-between">
                <div className="flex gap-6 text-gray-600 pt-2">
                    <Link href="/" className="flex gap-2">
                        <Image alt="home" src="/home.png" className="w-4 h-4" width={16} height={16} />
                        <span className="">Home</span>
                    </Link>
                    <Link href="/" className="flex gap-2">
                        <Image alt="friends" src="/friends.png" className="w-4 h-4 mt-1" width={16} height={16} />
                        <span className="">Friends</span>
                    </Link>
                    <Link href="/" className="flex gap-2">
                        <Image alt="stories" src="/stories.png" className="w-4 h-4 mt-1" width={16} height={16} />
                        <span className="">Stories</span>
                    </Link>
                </div>
                <div className="hidden xl:flex items-center p-2 bg-slate-100 rounded-xl">
                    <input type="text" placeholder="search..." id="" className="bg-transparent outline-none" />
                    <Image src='/search.png' alt="" width={14} height={14} />
                </div>
            </div>

            {/* Right */}
            <div className="w-[30%] flex items-center gap-4 xl:gap-8 justify-end">
                <ClerkLoading>
                    <div
                        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                        role="status">
                        <span
                            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                            >Loading...
                        </span>
                    </div>
                </ClerkLoading>
                <ClerkLoaded>
                    <SignedIn>
                        <div className="cursor-pointer">
                            <Image src="/people.png" alt="" width={20} height={20} />
                        </div>
                        <div className="cursor-pointer">
                            <Image src="/messages.png" alt="" width={20} height={20} />
                        </div>
                        <div className="cursor-pointer">
                            <Image src="/notifications.png" alt="" width={20} height={20} />
                        </div>
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        <div className="flex items-center gap-2 text-black">
                            <LoginIcon />
                            <Link href="/sign-in">Login/Register</Link>
                        </div>
                    </SignedOut>
                </ClerkLoaded>
                <MobileMenu />
            </div>
        </div>
    )
}

export default NavBar