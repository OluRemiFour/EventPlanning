"use client";

import { useEffect, useState } from "react";
import ReviewEvent from "./ReviewEvent";

function EventTiming({
  setEventTiming,
  eventTiming,
  eventName,
  eventType,
  eventDescription,
  selectedTags,
}) {
  const [disabled, setDisabled] = useState(true);
  const [eventStartDate, setEventStartDate] = useState();
  const [eventEndDate, setEventEndDate] = useState();
  const [eventPricing, setEventPricing] = useState("");
  const [eventPlace, setEventPlace] = useState("");
  const [eventAttendee, setEventAttendee] = useState("");
  const [placeholder, setPlaceholder] = useState("Free");
  const [venuePlaceholder, setVenuePlaceholder] = useState("Online");
  const [inputPlaceValue, setPlaceInputValue] = useState("");
  const [inputTicketValue, setTicketInputValue] = useState("");
  const [reviewEvent, setReviewEvent] = useState(false);
  const [currentStep, setCurrentStep] = useState("eventTiming");

  const handleTicketChange = (event) => {
    if (event.target.value === "Free") {
      setPlaceholder("Free Event");
    } else if (event.target.value === "Paid") {
      setPlaceholder("Input ticket price");
    }
    setEventPricing(event.target.value);
  };

  const handleVenuePlaceholder = (event) => {
    if (event.target.value === "Online") {
      setVenuePlaceholder(
        "Paste the link to your virtual event (e.g., Zoom, Google Meet)"
      );
    } else if (event.target.value === "Physical") {
      setVenuePlaceholder("Input the address");
    }
    setEventPlace(event.target.value);
  };

  const handlePlaceInputChange = (event) => {
    setPlaceInputValue(event.target.value);
  };
  const handleTicketInput = (event) => {
    setTicketInputValue(event.target.value);
  };

  const handleUserOptions = () => {
    if (
      setEventStartDate.length < 1 ||
      setEventEndDate.length < 1 ||
      eventPricing.length < 1 ||
      eventPlace.length < 1 ||
      eventAttendee.length < 1 ||
      venuePlaceholder.length < 2 ||
      inputTicketValue.length < 2
    ) {
      setDisabled(true);
      return;
    } else {
      setDisabled(false);
    }
  };

  console.log(inputTicketValue);

  useEffect(() => {
    handleUserOptions();
  }, [eventStartDate, eventEndDate, eventPricing, eventPlace, eventAttendee]);

  const handleNextEvent = () => {
    if (currentStep === "eventTiming") {
      setCurrentStep("reviewEvent");
    } else {
      setCurrentStep("eventTiming");
    }

    console.log(
      eventStartDate,
      eventEndDate,
      eventAttendee,
      eventPricing,
      inputPlaceValue,
      inputTicketValue
    );
  };

  return (
    <>
      {currentStep === "eventTiming" && (
        <div
          className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-[1000] transform duration-700 ease-in-out overflow-hidden`}
        >
          <div className="bg-white rounded-lg text-sm shadow-md flex-col justify-center w-fit h-fit mx-auto my-[3%]">
            <div className="flex-col justify-center items-center flex p-10">
              <h1 className="font-semibold text-[20px]">
                Bring Your Event to Life
              </h1>
              <p className="text-[#999999] py-1">
                Create, customise, and launch your event with ease.
              </p>
            </div>
            <form className="px-6">
              <div className="flex items-center gap-3">
                <div className="pb-2">
                  <label className="flex-row py-2 flex">
                    Event Start Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    name="eventName"
                    onChange={(e) => setEventStartDate(e.target.value)}
                    className="rounded-lg border px-2 py-3 outline-none w-full"
                    placeholder="12/15/2024 09:00 AM"
                    min={new Date().toISOString().slice(0, 16)}
                  />
                </div>
                <div className="pb-2">
                  <label className="flex-row py-2 flex">
                    Event End Date & Time
                  </label>
                  <input
                    name="eventName"
                    type="datetime-local"
                    onChange={(e) => setEventEndDate(e.target.value)}
                    className="rounded-lg border px-2 py-3 outline-none w-full"
                    placeholder="12/15/2024 05:00 PM"
                    min={new Date().toISOString().slice(0, 16)}
                  />
                </div>
              </div>
              <div className="flex-col flex my-2 space-y-2">
                <div className="flex py-2 justify-between items-center">
                  <p>Location or Link</p>
                  <div>
                    <label className="flex gap-2 items-center">
                      <input
                        type="radio"
                        className="text-red-400"
                        name="venue"
                        required
                        value="Online"
                        onChange={handleVenuePlaceholder}
                      />
                      Online
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        className="text-red-400"
                        name="venue"
                        value="Physical"
                        required
                        onChange={handleVenuePlaceholder}
                      />
                      Physical Location
                    </label>
                  </div>
                </div>
                <label>
                  <input
                    className="rounded-lg border px-2 py-3 outline-none w-full"
                    name="location"
                    placeholder={venuePlaceholder}
                    onChange={handlePlaceInputChange}
                  />
                </label>
              </div>

              <div>
                <div className="flex flex-col">
                  <label className="flex-row flex">Attendee Capacity</label>
                  <input
                    type="number"
                    name="eventName"
                    required
                    onChange={(e) => setEventAttendee(e.target.value)}
                    className="rounded-lg border px-2 py-3 outline-none w-full"
                    placeholder="Enter maximum number of attendees"
                  />
                </div>
              </div>

              <div className="flex-col flex my-2 space-y-2">
                <div className="flex py-2 justify-between items-center">
                  <p>Ticket Pricing</p>
                  <div>
                    <label className="flex gap-2 items-center">
                      <input
                        type="radio"
                        name="ticket"
                        // required
                        value="Free"
                        onChange={handleTicketChange}
                      />
                      Free
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="ticket"
                        // required
                        value="Paid"
                        onChange={handleTicketChange}
                      />
                      Paid
                    </label>
                  </div>
                </div>
                <label>
                  <input
                    className="rounded-lg border px-2 py-3 outline-none w-full"
                    placeholder={placeholder}
                    onChange={handleTicketInput}
                  />
                </label>
              </div>

              <div className="flex text-center my-16 py-6 justify-center gap-4 items-center">
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    setEventTiming(false);
                  }}
                  className="text-[var(--primary-color)] w-[50%] cursor-pointer rounded-[8px] py-3 px-4 border border-[var(--primary-color)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={(event) => {
                    event.preventDefault();
                    handleNextEvent();
                  }}
                  disabled={disabled}
                  aria-disabled={disabled}
                  className={`${
                    disabled
                      ? "bg-[#0062CC4D] cursor-not-allowed"
                      : "bg-[var(--primary-color)] cursor-pointer"
                  } text-white w-[50%] rounded-[8px] py-3 px-4 transition duration-200`}
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {currentStep === "reviewEvent" && (
        <ReviewEvent
          eventStartDate={eventStartDate}
          eventEndDate={eventEndDate}
          eventAttendee={eventAttendee}
          eventPricing={eventPricing}
          setEventPricing={setEventPricing}
          eventPlace={inputPlaceValue}
          inputTicketValue={inputTicketValue}
          setTicketInputValue={setTicketInputValue}
          eventName={eventName}
          eventType={eventType}
          eventDescription={eventDescription}
          selectedTags={selectedTags}
        />
      )}
    </>
  );
}

export default EventTiming;
