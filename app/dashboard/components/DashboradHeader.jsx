import { BsBellFill } from "react-icons/bs";
import { FaUserLarge } from "react-icons/fa6";

function DashboardHeader() {
  return (
    <div className="flex py-[34px] px-[60px] border-l border-b shadow-sm justify-between items-center">
      <p className="text-[24px] font-medium">Dashboard</p>

      <div className="flex gap-6 items-center">
        <div className="border border-[var(--primary-color)] rounded-md p-3">
          <BsBellFill color="#0062CC" />
        </div>
        <div className="items-center flex gap-4">
          <p>John Doe</p>
          <div className="bg-[#EAEAEA] rounded-full p-2">
            <FaUserLarge />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
