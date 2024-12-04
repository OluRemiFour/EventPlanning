"use client";
import { useAtom } from "jotai";
import { BsBellFill } from "react-icons/bs";
import { FaUserLarge } from "react-icons/fa6";
import { activeUser } from "@/app/lib/User";

function DashboardHeader() {
  const [loggedInUser] = useAtom(activeUser);

  return (
    <div className="flex py-[34px] px-[60px] border-l border-b shadow-sm justify-between items-center">
      <p className="text-[24px] font-medium">Dashboard</p>

      <div className="flex gap-6 items-center">
        <div className="border border-[var(--primary-color)] rounded-md p-3">
          <BsBellFill color="#0062CC" />
        </div>
        <div className="items-center flex gap-4">
          <div>
            {!loggedInUser ? (
              <div className="animate-spin justity-center items-center flex rounded-full h-5 w-5 mx-auto text-center border-b-2 border-t-2 border-[#0062CC]" />
            ) : (
              loggedInUser
            )}
          </div>
          <div className="bg-[#EAEAEA] rounded-full p-2">
            <FaUserLarge />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
