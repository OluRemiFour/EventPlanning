import React, { useEffect, useState } from "react";
import EventTiming from "./EventTiming";

function CreateEvent({ setCreateEvent }) {
  const eventTags = [
    "Networking",
    "Marketing",
    "Tech Event",
    "Business",
    "Public Speaking",
    "Entrepreneurship",
    "Finance & Investment",
    "Motivational",
    "Others",
  ];
  const [disabled, setDisabled] = useState(true);
  const [selectedTag, setSelectedTag] = useState(null);
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState(null);
  const [eventDescription, setEventDescription] = useState("");
  const [eventDetails, setEventDetails] = useState(true);
  const [eventTiming, setEventTiming] = useState(false);

  const handleUserOptions = () => {
    if (
      eventName.trim().length < 1 ||
      !eventType ||
      eventDescription.trim().length < 1
    ) {
      // setError("Please fill out all fields correctly.");
      setDisabled(true);
      return;
    }
    // setError("");
    setDisabled(false);
  };

  const handleNextEvent = () => {
    setEventDetails(false);
    setEventTiming(true);
  };

  useEffect(() => {
    handleUserOptions();
  }, [eventName, eventType, eventDescription]);

  return (
    <>
      {eventDetails && (
        <div
          className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-[1000] transform duration-700 ease-in-out overflow-hidden`}
        >
          <div className="bg-white rounded-lg text-sm shadow-md flex-col justify-center w-fit h-fit mx-auto my-[3%]">
            <div className="flex-col justify-center items-center flex p-6">
              <h1 className="font-semibold text-[20px]">
                Bring Your Event to Life
              </h1>
              <p className="text-[#999999] pt-2">
                Create, customise, and launch your event with ease.
              </p>
            </div>

            <form className="px-6">
              <div className="space-y-2">
                <label className="flex-row flex">Event Name</label>
                <input
                  type="text"
                  name="eventName"
                  onChange={(e) => setEventName(e.target.value)}
                  className="rounded-lg border px-2 py-3 outline-none w-full"
                  placeholder="Enter the name of your event"
                />
              </div>
              <div className="flex-col flex my-3 space-y-2 py-1">
                <label>Event Type </label>
                <select
                  onChange={(e) => setEventType(e.target.value)}
                  className="rounded-lg border px-2 py-3 outline-none "
                >
                  <option value="0">Select Event Type</option>
                  <option value="1">Conference</option>
                  <option value="2">Workshop</option>
                  <option value="4">Webinar</option>
                  <option value="5">Networking </option>
                  <option value="6">Party or Celebration</option>
                  <option value="7">Fundraiser</option>
                  <option value="8">Product Launch</option>
                  <option value="9">Meetup</option>
                  <option value="10">Hackathon</option>
                </select>
              </div>
              <div className="flex-col flex my-2 space-y-2">
                <label>Event Description </label>
                <label>
                  <textarea
                    className="rounded-lg border px-2 py-3 outline-none w-full"
                    name="description"
                    onChange={(e) => setEventDescription(e.target.value)}
                    rows="4"
                    cols="50"
                    placeholder="Provide a brief description of the event."
                  ></textarea>
                </label>
              </div>

              <div>
                <h1 className="font-semibold mb-4">Event Tags (Optional)</h1>
                <div className="grid grid-cols-3 gap-3">
                  {eventTags.map((tag, index) => (
                    <button
                      key={index}
                      onClick={(event) => {
                        event.preventDefault();
                        setSelectedTag(tag);
                      }}
                      className={`${
                        selectedTag === tag
                          ? "bg-[#00458f] text-white"
                          : "bg-gray-100 text-[#999999]"
                      } flex items-center justify-center p-2 rounded-full shadow-sm`}
                    >
                      <p className="text-sm">{tag}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex text-center justify-center gap-4 items-center mt-4 py-6">
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    setCreateEvent(false);
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
      {eventTiming && (
        <EventTiming
          setEventTiming={setEventTiming}
          eventTiming={eventTiming}
        />
      )}
    </>
  );
}

export default CreateEvent;
