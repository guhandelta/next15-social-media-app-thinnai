import { Feed, LeftMenu, RightMenu } from '@/app/components';
import Image from 'next/image';

const ProfilePage = () => {

    return (
            <div className="flex gap-6 pt-6">
                <div className="hidden xl:block w-[25%]">
                    <LeftMenu type='profile' />
                </div>
                <div className="w-full lg:w-[60%] xl:-[50%]">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col items-center justify-center">
                            <div className="w-full h-64 relative">
                                <Image src="/cover.png" alt='' fill className='object-cover rounded-md' />
                                <Image src="/dp.png" alt='' width={128} height={128} className='object-cover w-32 h-32 rounded-full absolute left-0 right-0 m-auto -bottom-16 ring-4 ring-white' />
                            </div>
                            <h1 className="mt-20 mb-4 text-2xl font-medium">Guhaprasaanth Nandagopal</h1>
                            <div className="flex items-center justify-center gap-12 mb-4">
                                <div className="flex flex-col items-center">
                                    <span className="font-medium">231</span>
                                    <span className="text-sm">Posts</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="font-medium">1.4k</span>
                                    <span className="text-sm">Followers</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="font-medium">632</span>
                                    <span className="text-sm">Following</span>
                                </div>
                            </div>
                        </div>
                        <Feed />
                    </div>
                </div>
                <div className="hidden lg:block w-[35%]">
                    <RightMenu userId="test" />
                </div>
            </div>
        );
}

export default ProfilePage