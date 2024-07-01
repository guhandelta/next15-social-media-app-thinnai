import { User } from '@prisma/client';
import { FriendRequests, Birthdays, Ad, UserInfoCard, UserMediaCard } from '../subComponents'
import { Suspense } from 'react';

const RightMenu = ({ user }:{ user: User }) => {
  user && console.log(user);
  return (
    <div className="flex flex-col col-span-2 gap-6">
      {user ?(
        <>
          <Suspense fallback="loading...">
            <UserInfoCard user={user} />
          </Suspense>
          <Suspense fallback="loading...">
            <UserMediaCard user={user} />
          </Suspense>
        </>
      ): null}
      <FriendRequests />
      <Birthdays />
      <Ad size='md' />
    </div>
  )
}

export default RightMenu