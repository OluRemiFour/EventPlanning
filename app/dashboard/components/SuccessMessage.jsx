import Image from "next/image";
import Link from "next/link";
import React from "react";

function SuccessMessage() {
  const handleRefresh = () => {
    window.location.reload();
  };
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-[1000] transform duration-700 ease-in-out overflow-hidden`}
    >
      <div className="bg-white rounded-lg text-sm shadow-md flex-col justify-center w-fit h-fit mx-auto my-[3%]">
        <div className="flex-col justify-center items-center flex p-6">
          <Image src="/success.svg" alt="Success" width={300} height={200} />
        </div>

        <div className="text-center mt-2">
          <div className="mb-8">
            <h1 className="font-semibold text-center text-[28px]">
              Success! 🎉
            </h1>
            <p className="py-2 text-center text-[#999999]">
              Your event has been published and is now live!
            </p>
          </div>
          <button
            onClick={handleRefresh}
            className="bg-[#00458f] text-center text-white cursor-pointer rounded-[8px] px-8 py-4 border border-[var(--primary-color)]"
          >
            Go to Dashboard
          </button>
        </div>

        <div className="mt-8 py-6 px-16">
          <div className="flex justify-between pb-2 items-center">
            <p>Event Link</p>
            <p className="text-[#00458f] cursor-pointer">Copy Link</p>
          </div>

          <p className="text-[#7D7D7D] my-4 rounded-lg border bg-[#f0f0f0] px-2 py-3 outline-none w-full">
            https://eventsplatform.com/event/future-of-tech-2024
          </p>
        </div>
      </div>
    </div>
  );
}

export default SuccessMessage;
