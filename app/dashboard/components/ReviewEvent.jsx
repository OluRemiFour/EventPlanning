"use client";

import React, { useEffect, useState } from "react";
import SuccessMessage from "./SuccessMessage";
import { toast } from "react-toastify";

function ReviewEvent({
  eventStartDate,
  eventEndDate,
  eventAttendee,
  eventPricing,
  setEventPricing,
  setEventTiming,
  eventPlace,
  inputTicketValue,
  setTicketInputValue,
  eventName,
  eventType,
  eventDescription,
  selectedTags,
}) {
  const [currentStep, setCurrentStep] = useState("reviewEvent");
  const [saveToDraft, setSaveToDraft] = useState(false);
  const authUser = sessionStorage.getItem("authToken");
  const [isLoading, setIsLoading] = useState(false);
  const [eventLink, setEventLink] = useState([""]);

  const handleNextEvent = () => {
    if (currentStep === "reviewEvent") {
      setCurrentStep("successMessage");
    } else {
      setCurrentStep("reviewEvent");
    }
  };

  if (eventPricing === "Free") {
    setTicketInputValue(Number(0));
  }
  const handleCreateEvent = async (token) => {
    const baseUrl = "/api/createEvent";

    if (!token) {
      console.error("Token is required to create an event.");
      return;
    }

    if (!eventName || !eventType || !eventStartDate || !eventEndDate) {
      console.error("Missing required fields");
      return;
    }

    const formatDate = (date) => {
      const d = new Date(date);
      return d.toISOString().slice(0, 19).replace("T", " ");
    };

    const formattedStartDate = formatDate(eventStartDate);
    const formattedEndDate = formatDate(eventEndDate);
    setIsLoading(true);
    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: eventName,
          type: eventType,
          description: eventDescription,
          tags: selectedTags,
          start_date: formattedStartDate,
          end_date: formattedEndDate,
          ticket_price: Number(inputTicketValue),
          location_link: eventPlace,
          attendance_capacity: Number(eventAttendee),
          ticket_pricing: eventPricing,
          draft: saveToDraft,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        toast.success("Event created successfully");
        setIsLoading(false);
        handleNextEvent();
        setEventLink(responseData.data);
      } else {
        const errorData = await response.json();
        console.log("Failed to create event:", errorData);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error creating event:", error.message);
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
                  {eventName}
                </p>
              </div>
              <div className="space-y-2 py-4">
                <p className="">Event Type</p>
                <p className="text-[#7D7D7D] rounded-lg border bg-[#f0f0f0] px-2 py-3 outline-none w-full">
                  {eventType}
                </p>
              </div>
              <div className="space-y-2 py-1">
                <p className="">Event Schedule</p>
                <div className="flex gap-2 items-center">
                  <p className="text-[#7D7D7D] rounded-lg border bg-[#f0f0f0] px-2 py-3 outline-none w-full">
                    {eventStartDate}
                  </p>
                  <p className="text-[#7D7D7D] rounded-lg border bg-[#f0f0f0] px-2 py-3 outline-none w-full">
                    {eventEndDate}
                  </p>
                </div>
              </div>
              <div className="space-y-2 py-1">
                <p className="">Location</p>
                <p className="text-[#7D7D7D] rounded-lg border bg-[#f0f0f0] px-2 py-3 outline-none w-full">
                  {eventPlace}
                </p>
              </div>
              <div className="space-y-2 py-1">
                <p className="">Ticket</p>
                <p className="text-[#7D7D7D] rounded-lg border bg-[#f0f0f0] px-2 py-3 outline-none w-full">
                  {eventPricing}
                </p>
              </div>

              <div className="flex text-center my-2 py-4 justify-center gap-4 items-center">
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    setEventTiming(false);
                    setSaveToDraft(true);
                  }}
                  className="text-[var(--primary-color)] w-[50%] cursor-pointer rounded-[8px] py-3 px-4 border border-[var(--primary-color)]"
                >
                  Save as Draft
                </button>
                <button
                  type="submit"
                  onClick={(event) => {
                    event.preventDefault();
                    handleCreateEvent(authUser);
                  }}
                  className={`bg-[var(--primary-color)] text-white w-[50%] rounded-[8px] py-3 px-4 transition duration-200`}
                >
                  {isLoading ? (
                    <div className="animate-spin justity-center items-center flex rounded-full h-5 w-5 mx-auto text-center border-b-2 border-t-2 border-[#ffff]" />
                  ) : (
                    "Publish Event"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {currentStep === "successMessage" && (
        <SuccessMessage eventLink={eventLink} />
      )}
    </>
  );
}

export default ReviewEvent;
