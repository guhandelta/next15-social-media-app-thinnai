import { FriendRequests, Birthdays, Ad } from './subComponents'

const RightMenu = ({ userId }:{ userId?: string }) => {
  return (
    <div className="flex flex-col col-span-2 gap-6">
      <FriendRequests />
      <Birthdays />
      <Ad size='md' />
    </div>
  )
}

export default RightMenu