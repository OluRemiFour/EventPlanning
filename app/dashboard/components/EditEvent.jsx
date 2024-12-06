import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function EditEvent({ setEditEvent, eventData, authUser, currentEventId }) {
  const [editEventData, setEditEventData] = useState([""]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    tags: "",
    start_date: "",
    end_date: "",
    location_link: "",
    attendance_capacity: Number(0),
    ticket_pricing: "",
    ticket_price: Number(0),
    draft: false,
  });

  // console.log(authUser);

  useEffect(() => {
    if (eventData) {
      const formatDate = (date) => {
        if (!date) return null;

        return date.replace("T", "T");
      };
      setFormData({
        name: eventData?.name || "",
        type: eventData?.type || "",
        description: eventData?.description || "",
        tags: eventData?.tags || "",
        start_date: formatDate(eventData?.start_date),
        end_date: formatDate(eventData?.end_date),
        location_link: eventData?.location_link || "",
        attendance_capacity: Number(eventData?.attendance_capacity) || 0,
        ticket_pricing: eventData?.ticket_pricing || "",
        ticket_price: Number(eventData?.ticket_price) || 0,
        draft: eventData?.draft || false,
      });
    }
  }, [eventData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "attendance_capacity" || name === "ticket_price") {
      const numericValue = value ? Number(value) : 0;
      setFormData((prevData) => ({
        ...prevData,
        [name]: numericValue,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleRefresh = () => {
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  const handleEditEvent = async (token, currentEventId) => {
    const baseUrl = `/api/editEvent?id=${currentEventId}`;

    console.log("API URL:", baseUrl);
    console.log(token);
    setIsLoading(true);

    try {
      const request = await fetch(baseUrl, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (request.ok) {
        const response = await request.json();
        console.log("Response from API:", response);
        setEditEventData(response.data);
        toast.success("Event updated successfully!");
        handleRefresh();
      } else {
        const errorData = await request.json();
        console.log("Error from API:", errorData);
        toast.error(
          `Error updating event: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.log("Network error:", error);
      toast.error("Failed to update event. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-[1000] transform duration-700 ease-in-out overflow-hidden">
      <div className="bg-white rounded-lg text-sm shadow-md flex-col justify-center w-fit h-fit mx-auto my-[3%]">
        <div className="flex-col justify-center items-center flex px-10 py-6">
          <h1 className="font-semibold text-[20px]">Edit Your Event</h1>
          <p className="text-[#999999] pt-1">
            Take a moment to edit your event setup.
          </p>
        </div>
        <form className="px-6">
          <div className="space-y-2 py-1">
            <p>Event Information</p>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="text-[#7D7D7D] rounded-lg border bg-[#f0f0f0] px-2 py-3 outline-none w-full"
              />
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="text-[#7D7D7D] rounded-lg border bg-[#f0f0f0] px-2 py-3 outline-none w-full"
              />
            </div>
            <p>Event Details</p>
            <div className="flex gap-2 items-center">
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="text-[#7D7D7D] rounded-lg border bg-[#f0f0f0] px-2 py-3 outline-none w-full"
              />
              <textarea
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="text-[#7D7D7D] rounded-lg border bg-[#f0f0f0] px-2 py-3 outline-none w-full"
              />
            </div>
          </div>
          <div className="space-y-2 py-1">
            <p>Event Schedule</p>
            <div className="flex gap-2 items-center">
              <input
                type="datetime-local"
                name="start_date"
                value={formData.start_date}
                onChange={handleInputChange}
                className="text-[#7D7D7D] rounded-lg border bg-[#f0f0f0] px-2 py-3 outline-none w-full"
              />
              <input
                type="datetime-local"
                name="end_date"
                value={formData.end_date}
                onChange={handleInputChange}
                className="text-[#7D7D7D] rounded-lg border bg-[#f0f0f0] px-2 py-3 outline-none w-full"
              />
            </div>
            <p>Event Details</p>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                name="location_link"
                value={formData.location_link}
                onChange={handleInputChange}
                className="text-[#7D7D7D] rounded-lg border bg-[#f0f0f0] px-2 py-3 outline-none w-full"
              />
              <input
                type="number"
                name="attendance_capacity"
                value={formData.attendance_capacity}
                onChange={handleInputChange}
                className="text-[#7D7D7D] rounded-lg border bg-[#f0f0f0] px-2 py-3 outline-none w-full"
              />
            </div>
          </div>
          <div className="space-y-2 py-1">
            <p>Ticket Pricing</p>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                name="ticket_pricing"
                value={formData.ticket_pricing}
                onChange={handleInputChange}
                className="text-[#7D7D7D] rounded-lg border bg-[#f0f0f0] px-2 py-3 outline-none w-full"
              />
              <input
                type="number"
                name="ticket_price"
                value={formData.ticket_price}
                onChange={handleInputChange}
                className="text-[#7D7D7D] rounded-lg border bg-[#f0f0f0] px-2 py-3 outline-none w-full"
              />
            </div>
          </div>
          <div className="flex text-center my-2 py-4 justify-center gap-4 items-center">
            <button
              onClick={(event) => {
                event.preventDefault();
                setEditEvent(false);
              }}
              className="text-[var(--primary-color)] outline-none w-[50%] cursor-pointer rounded-[8px] py-3 px-4 border border-[var(--primary-color)]"
            >
              Close
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleEditEvent(authUser, currentEventId);
              }}
              className="bg-[var(--primary-color)] text-white outline-none w-[50%] cursor-pointer rounded-[8px] py-3 px-4 border border-[var(--primary-color)]"
            >
              {isLoading ? (
                <div className="animate-spin justity-center items-center flex rounded-full h-5 w-5 mx-auto text-center border-b-2 border-t-2 border-[#ffff]" />
              ) : (
                "Update Event"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEvent;
