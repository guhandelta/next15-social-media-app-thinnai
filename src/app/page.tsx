import Image from "next/image";
import { AddPost, Feed, LeftMenu, RightMenu, Stories } from "./components";

export default function Home() {
  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[25%]">
        <LeftMenu type="home" />
      </div>
      <div className="w-full lg:w-[60%] xl:-[50%]">
        <div className="flex flex-col gap-6">
          <Stories />
          <AddPost />
          <Feed />
        </div>
      </div>
      <div className="hidden lg:block w-[35%]">
        <RightMenu userId="123" />
      </div>
    </div>
  );
}
