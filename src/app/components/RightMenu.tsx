import { FriendRequests, Birthdays, Ad, UserInfoCard, UserMediaCard } from './subComponents'

const RightMenu = ({ userId }:{ userId?: string }) => {
  userId && console.log(userId);
  return (
    <div className="flex flex-col col-span-2 gap-6">
      {userId ?(
        <>
          <UserInfoCard userId={userId} />
          <UserMediaCard userId={userId} />
        </>
      ): null}
      <FriendRequests />
      <Birthdays />
      <Ad size='md' />
    </div>
  )
}

export default RightMenu