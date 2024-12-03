"use client";

import { useEffect, useState } from "react";
import { BsCalendarEvent, BsFillCalendarEventFill } from "react-icons/bs";
import { IoPeopleSharp } from "react-icons/io5";
import CreateEvent from "./components/CreateEvent";
import { useAtom } from "jotai";
import { activeUser } from "../lib/User";
import { toast } from "react-toastify";

function Dashboard() {
  const [event, setEvent] = useState("all");
  const [createEvent, setCreateEvent] = useState(false);
  const [loggedInUser] = useAtom(activeUser);

  const authUser = localStorage.getItem("authToken");
  console.log(authUser);

  // if (!loggedInUser) {
  useEffect(() => {
    if (!authUser) {
      // toast.error("You must be logged in to access dashboard");
      window.location.href = "/login";
      return;
    }
  }, [authUser]);

  const handleEvent = (type) => {
    setEvent(type);
  };
  return (
    <div className="px-16 py-4">
      <div className="flex items-center gap-12">
        <div className="rounded-lg bg-[#e3752b] shadow-md w-[400px] h-[205px] px-3 py-8">
          <div className="p-3">
            <div className="flex text-white items-center gap-2">
              <BsCalendarEvent />
              <p>Upcoming Events</p>
            </div>
            <h1 className="text-[20px] font-semibold pt-2 text-white">
              0 Events Scheduled
            </h1>
          </div>

          <p className="text-white text-sm p-3">
            Total number of all scheduled event.
          </p>
        </div>
        <div className="rounded-lg bg-[#00458f] shadow-md w-[400px] h-[205px] px-3 py-8">
          <div className="p-3">
            <div className="flex text-white items-center gap-2">
              <IoPeopleSharp />
              <p>Attendee Registrations</p>
            </div>
            <h1 className="text-[20px] font-semibold pt-2 text-white">
              0 Total Registrations
            </h1>
          </div>

          <p className="text-white text-sm p-3">
            Total number of attendees registered across all events.
          </p>
        </div>
        <div className="rounded-lg bg-[#cc5a00] shadow-md w-[400px] h-[205px] px-3 py-8">
          <div className="p-3">
            <div className="flex text-white items-center gap-2">
              <BsFillCalendarEventFill />
              <p>Revenue</p>
            </div>
            <h1 className="text-[20px] font-semibold pt-2 text-white">
              0 Earned
            </h1>
          </div>

          <p className="text-white text-sm p-3">
            Total earnings across ticket sales, and other revenue streams.
          </p>
        </div>
      </div>

      <div className="mt-14 mb-8 flex justify-between">
        <div className="flex items-center gap-6">
          <button
            onClick={() => handleEvent("all")}
            className={`${
              event === "all" ? "bg-[#00458f] text-white" : "text-[#999999]"
            } rounded-full px-4 py-2`}
          >
            All Event
          </button>
          <button
            onClick={() => handleEvent("upcoming")}
            className={`${
              event === "upcoming"
                ? "bg-[#00458f] text-white"
                : "text-[#999999]"
            } rounded-full px-4 py-2`}
          >
            Upcoming Event
          </button>
          <button
            onClick={() => handleEvent("completed")}
            className={`${
              event === "completed"
                ? "bg-[#00458f] text-white"
                : "text-[#999999]"
            } rounded-full px-4 py-2`}
          >
            Completed Event
          </button>
        </div>

        <button
          onClick={() => setCreateEvent((event) => !event)}
          className="bg-[#00458f] text-white cursor-pointer rounded-[8px] px-4 py-3 border border-[var(--primary-color)]"
        >
          + Create an Account
        </button>
      </div>

      {/* /table for event */}

      <div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#eaeaea] border-b border">
              <th className="border px-4 py-4 text-sm text-left text-[#999999]">
                Event Name
              </th>
              <th className="border px-4 py-4 text-sm text-left text-[#999999]">
                Date
              </th>
              <th className="border px-4 py-4 text-sm text-left text-[#999999]">
                Type
              </th>
              <th className="border px-4 py-4 text-sm text-left text-[#999999]">
                Attendees
              </th>
              <th className="border px-4 py-4 text-sm text-left text-[#999999]">
                Revenue
              </th>
              <th className="border px-4 py-4 text-sm text-left text-[#999999]">
                Status
              </th>
              <th className="border px-4 py-4 text-sm text-left text-[#999999]">
                Action
              </th>
            </tr>
          </thead>
          <tbody className=""></tbody>
        </table>

        <div className="w-fit text-center mt-14 mx-auto">
          <div className="mb-6">
            <h1 className="font-semibold">You Have No Events Yet</h1>
            <p className="text-sm text-[#999999] pt-1 pb-4">
              It looks like you haven’t created any events.
            </p>
          </div>

          <button
            onClick={() => setCreateEvent((event) => !event)}
            className="bg-[#00458f] text-white cursor-pointer rounded-[8px] px-4 py-2 border border-[var(--primary-color)]"
          >
            + Create an Account
          </button>
        </div>
      </div>

      {createEvent && <CreateEvent setCreateEvent={setCreateEvent} />}
    </div>
  );
}

export default Dashboard;
