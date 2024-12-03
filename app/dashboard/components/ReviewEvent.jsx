"use client";

import React, { useState } from "react";
import SuccessMessage from "./SuccessMessage";

function ReviewEvent() {
  const [currentStep, setCurrentStep] = useState("reviewEvent");

  const handleNextEvent = () => {
    if (currentStep === "reviewEvent") {
      setCurrentStep("successMessage");
    } else {
      setCurrentStep("reviewEvent");
    }
  };
  return (
    <>
      {currentStep === "reviewEvent" && (
        <div
          className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-[1000] transform duration-700 ease-in-out overflow-hidden`}
        >
          <div className="bg-white rounded-lg text-sm shadow-md flex-col justify-center w-fit h-fit mx-auto my-[3%]">
            <div className="flex-col justify-center items-center flex p-10">
              <h1 className="font-semibold text-[20px]">Review Your Event</h1>
              <p className="text-[#999999] pt-1">
                Take a moment to review your event setup.
              </p>
            </div>
            <form className="px-6">
              <div className="space-y-2">
                <p className="py-1">Event Event Name</p>
                <p className="text-[#7D7D7D] rounded-lg border bg-[#f0f0f0] px-2 py-3 outline-none w-[25rem]">
                  Advanced UX Design Workshop
                </p>
              </div>
              <div className="space-y-2 py-4">
                <p className="">Event Type</p>
                <p className="text-[#7D7D7D] rounded-lg border bg-[#f0f0f0] px-2 py-3 outline-none w-full">
                  Conference
                </p>
              </div>
              <div className="space-y-2 py-1">
                <p className="">Event Schedule</p>
                <div className="flex items-center">
                  <p className="text-[#7D7D7D] rounded-lg border bg-[#f0f0f0] px-2 py-3 outline-none w-full">
                    Start: 12/15/2024 05:00 PM
                  </p>
                  <p className="text-[#7D7D7D] rounded-lg border bg-[#f0f0f0] px-2 py-3 outline-none w-full">
                    End: 12/15/2024 05:00 PM
                  </p>
                </div>
              </div>
              <div className="space-y-2 py-1">
                <p className="">Location</p>
                <p className="text-[#7D7D7D] rounded-lg border bg-[#f0f0f0] px-2 py-3 outline-none w-full">
                  Online
                </p>
              </div>
              <div className="space-y-2 py-1">
                <p className="">Ticket</p>
                <p className="text-[#7D7D7D] rounded-lg border bg-[#f0f0f0] px-2 py-3 outline-none w-full">
                  Free
                </p>
              </div>

              <div className="flex text-center my-2 py-4 justify-center gap-4 items-center">
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    setEventTiming(false);
                  }}
                  className="text-[var(--primary-color)] w-[50%] cursor-pointer rounded-[8px] py-3 px-4 border border-[var(--primary-color)]"
                >
                  Save as Draft
                </button>
                <button
                  type="submit"
                  onClick={(event) => {
                    event.preventDefault();
                    handleNextEvent();
                  }}
                  className={`bg-[var(--primary-color)] text-white w-[50%] rounded-[8px] py-3 px-4 transition duration-200`}
                >
                  Publish Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {currentStep === "successMessage" && <SuccessMessage />}
    </>
  );
}

export default ReviewEvent;
