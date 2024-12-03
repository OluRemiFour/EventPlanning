import Image from "next/image";
import Link from "next/link";
import React from "react";

function Header() {
  return (
    <div className="flex py-[20px] px-[60px] border-b shadow-sm justify-between items-center">
      <div className="flex items-center gap-2">
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

      <div className="flex gap-4 items-center">
        <Link
          href={"login"}
          className="text-[var(--primary-color)] cursor-pointer rounded-[8px] py-2 px-4 border border-[var(--primary-color)]"
        >
          Create an Account
        </Link>
      </div>
    </div>
  );
}

export default Header;
