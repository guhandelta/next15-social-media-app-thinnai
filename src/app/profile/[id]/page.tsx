import { LeftMenu, RightMenu } from '@/app/components';
import { Feed } from '@mui/icons-material';

const ProfilePage = () => {

    return (
            <div className="flex gap-6 pt-6">
                <div className="hidden xl:block w-[25%]">
                    <LeftMenu type='profile' />
                </div>
                <div className="w-full lg:w-[60%] xl:-[50%]">
                    <div className="flex flex-col gap-6">
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