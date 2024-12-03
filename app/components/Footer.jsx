import Image from "next/image";
import React from "react";
import { IoLogoTwitter } from "react-icons/io";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";

function Footer() {
  return (
    <div className="border border-t-[#EAEAEA] mt-24">
      <div className="pt-14 mx-auto w-fit">
        <div className="items-center flex gap-4">
          <Image
            // className="dark:invert"
            src="fotterLogo.svg"
            alt="Logo"
            width={40}
            height={40}
          />
          <p className="text-[32px] dark:text-gray-400">Gather</p>
        </div>
        <div className="flex gap-12 items-center py-10">
          <IoLogoTwitter color="#03A9F4" />
          <FaFacebookF color="#475993" />
          <FaInstagram />
        </div>
      </div>

      <p className="text-[#999999] md:text-base text-sm text-center pb-4">
        ©2024 Gather Event Management System. All rights reserved
      </p>
    </div>
  );
}

export default Footer;
