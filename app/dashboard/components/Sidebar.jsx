"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiSolidDashboard } from "react-icons/bi";
import { BsCalendarEvent } from "react-icons/bs";
import { IoPeopleSharp } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
import { TbMessage2Cog } from "react-icons/tb";
import { RiSettings3Fill } from "react-icons/ri";

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: BiSolidDashboard,
    href: "/dashboard",
  },
  {
    id: "event",
    label: "Events",
    icon: BsCalendarEvent,
    href: "/dashboard/event",
  },
  {
    id: "attendees",
    label: "Attendees",
    icon: IoPeopleSharp,
    href: "/dashboard/attendees",
  },
  {
    id: "payments",
    label: "Payments",
    icon: MdOutlinePayment,
    href: "/dashboard/payments",
  },
  {
    id: "broadcast",
    label: "Broadcast",
    icon: TbMessage2Cog,
    href: "/dashboard/broadcast",
  },
  {
    id: "settings",
    label: "Settings",
    icon: RiSettings3Fill,
    href: "/dashboard/settings",
  },
];

function Sidebar() {
  const pathname = usePathname();

  return (
    <div>
      <div className="flex text-center items-center p-8 gap-2">
        <Image
          aria-hidden
          src="/homeLogo.svg"
          alt="Logo"
          width={40}
          height={40}
        />
        <h1 className="text-[var(--primary-color)] text-[32px] font-bold">
          Gather
        </h1>
      </div>

      <div className="flex-col flex space-y-1 my-4 items-center gap-2">
        {menuItems.map(({ id, label, icon: Icon, href }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={id}
              href={href}
              className={`${
                isActive ? "bg-[var(--primary-color)]" : ""
              } flex items-center gap-3 text-center outline-none rounded-md w-[170px] p-4`}
            >
              {Icon && (
                <Icon
                  size={21}
                  className={`${isActive ? "text-white" : "text-[#999999]"}`}
                />
              )}
              <p className={`${isActive ? "text-white" : "text-[#999999]"}`}>
                {label}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
