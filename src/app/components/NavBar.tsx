import Link from "next/link"
import MobileMenu from "./MobileMenu"


const NavBar = () => {
    return (
        <div className="h-24 flex items-center justify-between">
            {/* Left */}
            <div>
                <Link className="font-bold text-xl text-orange-500" href="/">GSpace</Link>
            </div>

            {/* Center */}
            <div className="hidden"></div>

            {/* Right */}
            <div className="">
                <MobileMenu />
            </div>
        </div>
    )
}

export default NavBar