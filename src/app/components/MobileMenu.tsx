"use client";
import Link from "next/link";
import { useState } from "react";

const MobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    isOpen && console.log("Mobile Menu Opened");
    !isOpen && console.log("Mobile Menu Closed");
    
    return (
        <div className="">
            <div 
                className="flex flex-col gap-[4.5px] cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                {/* Using HTML elements here to create the Hambuger Meunu Icon to `X` icon animation 
                    origin point is mentioned here to make the animation happen from the left side rather than the center, as only half of the element would be visible when the origin point is in the center(which is be default)
                */}
                <div className={`w-6 h-1 bg-blue-500 rounded-sm ${isOpen ? "rotate-45":""} origin-left ease-in-out duration-500`}></div>
                <div className={`w-6 h-1 bg-blue-500 rounded-sm ${isOpen ? "opacity-0":""} ease-in-out duration-500`}></div>
                <div className={`w-6 h-1 bg-blue-500 rounded-sm ${isOpen ? "-rotate-45":""} origin-left ease-in-out duration-500`}></div>
            </div>
            {isOpen && (
                // Calc => 100vh: Screen Size | 96px -> h-24 (NavBar Height)
                <div className="absolute left-0 top-24 w-full h-[calc(100vh-96px)] bg-white text-black flex flex-col items-center justify-center gap-8 font-medium text-xl z-40">
                    <Link className="" href="/">Home</Link>
                    <Link className="" href="/">Friends</Link>
                    <Link className="" href="/">Groups</Link>
                    <Link className="" href="/">Stories</Link>
                    <Link className="" href="/">Login</Link>
                </div>
            )}
        </div>
    )
}

export default MobileMenu