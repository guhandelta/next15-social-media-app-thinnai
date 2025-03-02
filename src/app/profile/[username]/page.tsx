import { Feed, LeftMenu, RightMenu } from '@/app/components';
import prisma from '@/lib/client';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const ProfilePage = async ({ params }: { params: { username: string } } ) => {

    const username = params.username;

    // Get the follower count
    const user = await prisma.user.findFirst({
        where: {
            username
        },
        include: {
            _count: {
                select: {
                    followers: true,
                    followings: true,
                    posts: true
                }
            }
        }
    });

    if(!user) return notFound();
    
    const { userId: currentUserId } = auth();
    
    let isBlocked;
    
    if(currentUserId){
        const res = await prisma.block.findFirst({
            where: {
                blockedId: user.id,
                blockerId: currentUserId
            },
        });
        
        if(res) isBlocked = true;
    } else{
        isBlocked = false;
    }

    // If the user is blocked, then do not show the profile page
    if(isBlocked) return notFound();

    return (
            <div className="flex gap-6 pt-6">
                <div className="hidden xl:block w-[25%]">
                    <LeftMenu type='profile' />
                </div>
                <div className="w-full lg:w-[60%] xl:-[50%]">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col items-center justify-center">
                            <div className="w-full h-64 relative">
                                <Image src={ user.cover || "/cover.png"} alt='' fill className='object-cover rounded-md' />
                                <Image src={user.avatar || "/noAvatar.png"} alt='' width={128} height={128} className='object-cover w-32 h-32 rounded-full absolute left-0 right-0 m-auto -bottom-16 ring-4 ring-white' />
                            </div>
                            <h1 className="mt-20 mb-4 text-2xl font-medium">{ (user.name && user.surname) ? user.name + " " + user.surname : user.username }</h1>
                            <div className="flex items-center justify-center gap-12 mb-4">
                                <div className="flex flex-col items-center">
                                    <span className="font-medium">{user._count.posts}</span>
                                    <span className="text-sm">Posts</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="font-medium">{user._count.followers}</span>
                                    <span className="text-sm">Followers</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="font-medium">{user._count.followings}</span>
                                    <span className="text-sm">Following</span>
                                </div>
                            </div>
                        </div>
                        <Feed username={user.username} />
                    </div>
                </div>
                <div className="hidden lg:block w-[35%]">
                    <RightMenu user={user} />
                </div>
            </div>
        );
}

export default ProfilePage