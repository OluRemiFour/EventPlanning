import React from "react";

function ViewEvent({ eventData, setViewEventData }) {
  console.log(eventData);
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-[1000] transform duration-700 ease-in-out overflow-hidden`}
    >
      <div className="bg-white rounded-lg text-sm shadow-md flex-col justify-center w-fit h-fit mx-auto my-[3%]">
        <div className="flex-col justify-center items-center flex px-10 py-6">
          <h1 className="font-semibold text-[20px]">Preview Your Event</h1>
          <p className="text-[#999999] pt-1">
            Take a moment to preview your event setup.
          </p>
        </div>
        <form className="px-6">
          <div className="space-y-2">
            <p className="py-1">Event Name</p>
            <p className="text-[#7D7D7D] rounded-lg border bg-[#f0f0f0] px-2 py-3 outline-none w-[25rem]">
              {eventData?.name}
            </p>
          </div>
          <div className="space-y-2 py-4">
            <p className="">Event Type</p>
            <p className="text-[#7D7D7D] rounded-lg border bg-[#f0f0f0] px-2 py-3 outline-none w-full">
              {eventData?.type}
            </p>
          </div>
          <div className="space-y-2 py-1">
            <p className="">Event Description</p>
            <p className="text-[#7D7D7D] rounded-lg border bg-[#f0f0f0] px-2 py-3 outline-none w-full">
              {eventData?.description}
            </p>
          </div>
          <div className="space-y-2 py-1">
            <p className="">Event Schedule</p>
            <div className="flex gap-2 items-center">
              <p className="text-[#7D7D7D] rounded-lg border bg-[#f0f0f0] px-2 py-3 outline-none w-full">
                {eventData?.start_date}
              </p>
              <p className="text-[#7D7D7D] rounded-lg border bg-[#f0f0f0] px-2 py-3 outline-none w-full">
                {eventData?.end_date}
              </p>
            </div>
            <p className="">Event Details</p>
            <div className="flex gap-2 items-center">
              <p className="text-[#7D7D7D] rounded-lg border bg-[#f0f0f0] px-2 py-3 outline-none w-full">
                {eventData?.attendance_capacity}
              </p>
              <p className="text-[#7D7D7D] rounded-lg border bg-[#f0f0f0] px-2 py-3 outline-none w-full">
                {eventData?.status}
              </p>
            </div>
          </div>
          <div className="space-y-2 py-1">
            <p className="">Location</p>
            <p className="text-[#7D7D7D] rounded-lg border bg-[#f0f0f0] px-2 py-3 outline-none w-full">
              {eventData?.location_link}
            </p>
          </div>
          <div className="flex text-center my-2 py-4 justify-center gap-4 items-center">
            <button
              onClick={(event) => {
                event.preventDefault();
                setViewEventData(false);
                // setSaveToDraft(true);
              }}
              className="text-[var(--primary-color)] outline-none w-[50%] cursor-pointer rounded-[8px] py-3 px-4 border border-[var(--primary-color)]"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ViewEvent;
