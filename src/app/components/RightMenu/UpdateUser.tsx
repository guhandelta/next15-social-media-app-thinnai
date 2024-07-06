"use client";
import { updateProfile } from '@/lib/actions';
import { User } from '@prisma/client';
import Image from 'next/image';
import { useState } from 'react'

const UpdateUser = ({ user }: { user: User }) => {

    const [open, setOpen] = useState(false);

    const handleClose = () => { 
        setOpen(false);
    };

    return (
        <div>
            <span className="text-xs text-blue-500 cursor-pointer" onClick={() => setOpen(true)}>Update User</span>
            {open && (
                <div className="absolute w-screen h-screen top-0 left-0 bg-black bg-opacity-65 flex items-center justify-center z-50">
                    <form 
                        action={updateProfile} 
                        className="p-12 h-[98%] bg-white rounded-lg shadow-md flex flex-col gap-2 w-full md:w-1/2 xl:w-1/3 relative"
                    >
                        <h1>Update Profile</h1>
                        <div className="mt-4 text-xs text-gray-50">
                            Use the Navbar to change the Avatar or Username
                        </div>
                        <div className="flex flex-col gap-4 m-23">
                            <label htmlFor="">Cover Picture</label>
                            <div className="flex items-center gap-2 cursor-pointer">
                                <Image src={user.cover || "/noCover.png"} alt="" width={48} height={32} className="w-12 h-8 rounded-md object-cover" />
                                <span className="text-xs underline text-gray-600">Change</span>
                            </div>
                        </div>
                        {/* INPUT */}
                        <div className="flex flex-wrap justify-between gap-2 xl:gap-4">
                            <div className="flex flex-col gap-4">
                                <label htmlFor="" className="text-xs text-gray-500">
                                    First Name
                                </label>
                                <input name="firstname" type="text" placeholder={user.name || 'Kandha'} id="" className='ring-1 ring-gray-300 p-[13px] rounded-md text-sm' />
                            </div>
                        </div>
                        {/* INPUT */}
                        <div className="flex flex-wrap justify-between gap-2 xl:gap-4">
                            <div className="flex flex-col gap-4">
                                <label htmlFor="" className="text-xs text-gray-500">
                                    Surname
                                </label>
                                <input name="surname" type="text" placeholder={user.surname || 'Kandha'} id="" className='ring-1 ring-gray-300 p-[13px] rounded-md text-sm' />
                            </div>
                        </div>
                        {/* INPUT */}
                        <div className="flex flex-wrap justify-between gap-2 xl:gap-4">
                            <div className="flex flex-col gap-4">
                                <label htmlFor="" className="text-xs text-gray-500">
                                    Description
                                </label>
                                <input name="description" type="text" placeholder={user.description || 'Kandha'} id="" className='ring-1 ring-gray-300 p-[13px] rounded-md text-sm' />
                            </div>
                        </div>
                        {/* INPUT */}
                        <div className="flex flex-wrap justify-between gap-2 xl:gap-4">
                            <div className="flex flex-col gap-4">
                                <label htmlFor="" className="text-xs text-gray-500">
                                    City
                                </label>
                                <input name="city" type="text" placeholder={user.city || 'Kandha'} id="" className='ring-1 ring-gray-300 p-[13px] rounded-md text-sm' />
                            </div>
                        </div>
                        {/* INPUT */}
                        <div className="flex flex-wrap justify-between gap-2 xl:gap-4">
                            <div className="flex flex-col gap-4">
                                <label htmlFor="" className="text-xs text-gray-500">
                                    School
                                </label>
                                <input name="school" type="text" placeholder={user.school || 'Kandha'} id="" className='ring-1 ring-gray-300 p-[13px] rounded-md text-sm' />
                            </div>
                        </div>
                        {/* INPUT */}
                        <div className="flex flex-wrap justify-between gap-2 xl:gap-4">
                            <div className="flex flex-col gap-4">
                                <label htmlFor="" className="text-xs text-gray-500">
                                    Work
                                </label>
                                <input name="work" type="text" placeholder={user.work || 'Kandha'} id="" className='ring-1 ring-gray-300 p-[13px] rounded-md text-sm' />
                            </div>
                        </div>
                        {/* INPUT */}
                        <div className="flex flex-wrap justify-between gap-2 xl:gap-4">
                            <div className="flex flex-col gap-4">
                                <label htmlFor="" className="text-xs text-gray-500">
                                    Website
                                </label>
                                <input name="website" type="text" placeholder={user.website || 'Kandha'} id="" className='ring-1 ring-gray-300 p-[13px] rounded-md text-sm' />
                            </div>
                        </div>
                        <button className="bg-blue-500 p-2 mt-2 rounded-md text-white">Update</button>
                        <div className="absolute font-bold text-xl right-6 top-4 cursor-pointer hover:text-red-500" onClick={handleClose}>
                            X
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}

export default UpdateUser