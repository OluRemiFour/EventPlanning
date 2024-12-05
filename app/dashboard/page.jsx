"use client";
import { activeUser } from "@/app/lib/User";
import { useSetAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { BsCalendarEvent, BsFillCalendarEventFill } from "react-icons/bs";
import { IoPeopleSharp } from "react-icons/io5";
import CreateEvent from "./components/CreateEvent";
import ViewEvent from "./components/ViewEvent";
import LoadingScreen from "./components/Loader";
import EditEvent from "./components/EditEvent";
import SuccessMessage from "./components/SuccessMessage";

function Dashboard() {
  const [event, setEvent] = useState("all");
  const [createEvent, setCreateEvent] = useState(false);
  const [userDetails, setUserDetails] = useState("");
  const [eventsTypes, setEvetTypes] = useState([""]);
  const [eventsTags, setEventTags] = useState([""]);
  const setActiveUser = useSetAtom(activeUser);
  const [userEvent, setUserEvent] = useState("");
  const [viewEvent, setViewEvent] = useState([""]);
  const [attendance, setAttendance] = useState([""]);
  const authUser = sessionStorage.getItem("authToken");
  const [currentEvent, setCurrentEvent] = useState();
  const [currentEventId, setCurrentEventId] = useState();
  const [eventData, setEventData] = useState([""]);
  const [viewEventData, setViewEventData] = useState(false);
  const [editEvent, setEditEvent] = useState(false);
  const eventTagsCache = useRef(null);
  const eventTypeCache = useRef(null);
  const userProfile = useRef(null);

  useEffect(() => {
    if (!authUser) {
      window.location.href = "/login";
      return;
    }
  }, [authUser]);

  const totalAttendance = attendance?.reduce((acc, event) => {
    return acc + event;
  }, 0);

  const handleRefresh = () => {
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const handleDeleteEvent = async (token, currentEventId) => {
    const baseUrl = `/api/deleteEvent?id=${currentEventId}`;
    try {
      const request = await fetch(baseUrl, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (request.ok) {
        const response = await request.json();
        console.log("Response from API:", response);
        toast.success("Event updated successfully!");
        handleRefresh();
      } else {
        const errorData = await request.json();
        console.error("Error from API:", errorData);
        toast.error(
          `Error updating event: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Network error:", error);
      toast.error("Failed to update event. Please try again.");
    } finally {
    }
  };

  const handleEvent = (type) => {
    setEvent(type);
  };

  const getUserProfile = async (token) => {
    if (userProfile.current) {
      setUserDetails(userProfile.current);
      return;
    }
    const baseUrl = "/api/userProfile";
    try {
      const request = await fetch(baseUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (request.ok) {
        const response = await request.json();
        userProfile.current = response;
        setUserDetails(response);
      } else {
        const errorResponse = await request.json();
      }
    } catch (error) {}
  };

  const getAllEvents = async (token) => {
    const baseUrl = "/api/showEvent";
    try {
      const request = await fetch(baseUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (request.ok) {
        const response = await request.json();
        setViewEvent(response.data);
        // console.log("All Events:", response);
      }
    } catch (error) {}
  };

  const getEventTypes = async () => {
    if (eventTypeCache.current) {
      setEvetTypes(eventTypeCache.current);
      return;
    }
    const baseUrl = "/api/eventTypes";
    try {
      const request = await fetch(baseUrl, {
        method: "GET",
        headers: {
          // Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (request.ok) {
        const response = await request.json();
        eventTypeCache.current = response.data;
        setEvetTypes(response.data);
        // console.log("Event Types:", response);
      }
    } catch (error) {}
  };

  const getEventTags = async () => {
    if (eventTagsCache.current) {
      setEventTags(eventTagsCache.current);
      return;
    }

    const baseUrl = "/api/eventTags";
    try {
      const request = await fetch(baseUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (request.ok) {
        const response = await request.json();
        eventTagsCache.current = response.data;
        setEventTags(response.data);
      }
    } catch (error) {
      console.error("Error fetching event types:", error);
    }
  };

  const handleViewEvent = async (token, currentEventId) => {
    const baseUrl = `/api/viewSingleEvent?id=${currentEventId}`;
    try {
      const request = await fetch(baseUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (request.ok) {
        const response = await request.json();
        setEventData(response.data);
      } else {
        const errorData = await request.json();
        console.error("Error fetching event:", errorData);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    if (authUser) {
      getUserProfile(authUser);
    }
    setActiveUser(userDetails.name);
    getAllEvents(authUser);
    getEventTypes(authUser);
    getEventTags(authUser);
  }, [authUser, userDetails]);

  useEffect(() => {
    setUserEvent(
      viewEvent?.map((event) => {
        return event;
      })
    );
  }, [viewEvent]);

  useEffect(() => {
    setCurrentEventId(
      currentEvent?.map((event) => {
        return event.id;
      })
    );
  }, [viewEvent, currentEvent]);

  useEffect(() => {
    setAttendance(
      viewEvent?.map((event) => {
        return event.attendance_capacity;
      })
    );
  }, [viewEvent]);

  const handleSelectedEvent = (eventCLicked) => {
    const filteredEvents = viewEvent.filter((event) => {
      return event.id === eventCLicked;
    });
    setCurrentEvent(filteredEvents);
  };
  console.log(currentEventId);

  useEffect(() => {
    handleViewEvent(authUser, currentEventId);
  }, [authUser, currentEventId]);

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
              {userEvent?.length < 1 ? "0" : userEvent?.length} Events Scheduled
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
              {isNaN(totalAttendance) ? "0" : totalAttendance} Total
              Registrations
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
            } rounded-full text-sm px-4 py-2`}
          >
            All Event
          </button>
          <button
            onClick={() => handleEvent("upcoming")}
            className={`${
              event === "upcoming"
                ? "bg-[#00458f] text-white"
                : "text-[#999999]"
            } rounded-full text-sm px-4 py-2`}
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
        <table className="w-full rounded-lg border-collapse">
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
          {event === "all" && (
            <tbody className="">
              {viewEvent?.map((event, index) => (
                <tr key={index} className="border-b border">
                  <td className="border px-4 py-4 text-sm text-left text-black">
                    {event &&
                      event.name?.charAt(0).toUpperCase() +
                        event.name?.slice(1)}
                  </td>
                  <td className="border px-4 py-4 text-sm text-left text-black">
                    {event.start_date}
                  </td>
                  <td className="border px-4 py-4 text-sm text-left text-black">
                    {event.type}
                  </td>
                  <td className="border px-4 py-4 text-sm text-left text-black">
                    {event.attendance_capacity} {""} {event && "attendees"}
                  </td>
                  <td className="border px-4 py-4 text-sm text-left text-black">
                    {event && "-"}
                  </td>
                  <td>
                    {event && (
                      <p
                        className={`border px-2 text-sm text-center ${
                          event.status === "upcoming"
                            ? "bg-[#00458f]"
                            : "bg-[#CC5A00]"
                        } text-white rounded-full mx-2 py-1 outline-none`}
                      >
                        {event.status}
                      </p>
                    )}
                  </td>

                  {event && (
                    <td>
                      {event.status === "upcoming" ? (
                        <div className="flex gap-2 items-left">
                          <p
                            onClick={(e) => {
                              e.preventDefault();
                              handleSelectedEvent(event.id);
                              handleViewEvent(authUser, currentEventId);
                              setViewEventData(true);
                            }}
                            className="py-2 px-3 cursor-pointer w-full text-sm bg-[#E2E2E2] text-[#00458f] text-center rounded-md"
                          >
                            View
                          </p>
                          <p
                            onClick={(e) => {
                              e.preventDefault();
                              handleSelectedEvent(event.id);
                              setEditEvent(true);
                            }}
                            className="bg-[#00458f] w-full text-sm cursor-pointer text-white p-2 rounded-md text-center"
                          >
                            Edit
                          </p>
                        </div>
                      ) : (
                        <div className="flex gap-2 items-left">
                          <p
                            onClick={(e) => {
                              e.preventDefault();
                              setViewEventData(true);
                              handleViewEvent(authUser, currentEventId);
                            }}
                            className="p-2 bg-[#E2E2E2] w-full text-sm cursor-pointer text-[#00458f] text-center rounded-md"
                          >
                            View
                          </p>
                          <p
                            onClick={(e) => {
                              e.preventDefault();
                              // setViewEventData(true);
                              handleDeleteEvent(authUser, currentEventId);
                            }}
                            className="bg-[#FF3535] w-full text-sm cursor-pointer text-white p-2 rounded-md text-center"
                          >
                            Delete
                          </p>
                        </div>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          )}

          {event === "upcoming" && (
            <tbody className="">
              {viewEvent
                ?.filter((event) => event.status === "upcoming")
                .map((event, index) => (
                  <tr key={index} className="border-b border">
                    <td className="border px-4 py-4 text-sm text-left text-black">
                      {event &&
                        event.name?.charAt(0).toUpperCase() +
                          event.name?.slice(1)}
                    </td>
                    <td className="border px-4 py-4 text-sm text-left text-black">
                      {event.start_date}
                    </td>
                    <td className="border px-4 py-4 text-sm text-left text-black">
                      {event.type}
                    </td>
                    <td className="border px-4 py-4 text-sm text-left text-black">
                      {event.attendance_capacity} {""} {event && "attendees"}
                    </td>
                    <td className="border px-4 py-4 text-sm text-left text-black">
                      {event && "-"}
                    </td>
                    <td>
                      <p
                        className={`border px-2 text-sm text-center bg-[#00458f] text-white rounded-full mx-2 py-1 outline-none`}
                      >
                        {event.status}
                      </p>
                    </td>
                    <td>
                      <div className="flex gap-2 items-left">
                        <p
                          onClick={(e) => {
                            e.preventDefault();
                            handleSelectedEvent(event.id);
                            handleViewEvent(authUser, currentEventId);
                            setViewEventData(true);
                          }}
                          className="py-2 px-3 cursor-pointer w-full text-sm bg-[#E2E2E2] text-[#00458f] text-center rounded-md"
                        >
                          View
                        </p>
                        <p className="bg-[#00458f] w-full text-sm cursor-pointer text-white p-2 rounded-md text-center">
                          Edit
                        </p>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          )}

          {event === "completed" && (
            <tbody className="">
              {viewEvent
                ?.filter((event) => event.status === "completed")
                .map((event, index) => (
                  <tr key={index} className="border-b border">
                    <td className="border px-4 py-4 text-sm text-left text-black">
                      {event &&
                        event.name?.charAt(0).toUpperCase() +
                          event.name?.slice(1)}
                    </td>
                    <td className="border px-4 py-4 text-sm text-left text-black">
                      {event.start_date}
                    </td>
                    <td className="border px-4 py-4 text-sm text-left text-black">
                      {event.type}
                    </td>
                    <td className="border px-4 py-4 text-sm text-left text-black">
                      {event.attendance_capacity} {""} {event && "attendees"}
                    </td>
                    <td className="border px-4 py-4 text-sm text-left text-black">
                      {event && "-"}
                    </td>
                    <td>
                      <p
                        className={`border px-2 text-sm text-center bg-[#CC5A00] text-white rounded-full mx-2 py-1 outline-none`}
                      >
                        {event.status}
                      </p>
                    </td>
                    <td>
                      <div className="flex gap-2 items-left">
                        <p
                          onClick={(e) => {
                            e.preventDefault();
                            handleSelectedEvent(event.id);
                            handleViewEvent(authUser, currentEventId);
                            setViewEventData(true);
                          }}
                          className="p-2 bg-[#E2E2E2] w-full text-sm cursor-pointer text-[#00458f] text-center rounded-md"
                        >
                          View
                        </p>
                        <p className="bg-[#FF3535] w-full text-sm cursor-pointer text-white p-2 rounded-md text-center">
                          Delete
                        </p>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          )}
        </table>

        {viewEvent?.map(
          (event, index) =>
            event.length < 1 && (
              <div key={index} className="w-fit text-center mt-14 mx-auto">
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
            )
        )}
      </div>

      {createEvent && (
        <CreateEvent
          eventsTypes={eventsTypes}
          eventsTags={eventsTags}
          setCreateEvent={setCreateEvent}
        />
      )}
      {viewEventData && (
        <>
          {eventData === undefined || null ? (
            <LoadingScreen />
          ) : (
            <ViewEvent
              eventData={eventData}
              setViewEventData={setViewEventData}
            />
          )}
        </>
      )}

      {editEvent && (
        <>
          {eventData === undefined || null ? (
            <LoadingScreen />
          ) : (
            <EditEvent
              eventData={eventData}
              setViewEventData={setViewEventData}
              setEditEvent={setEditEvent}
              currentEventId={currentEventId}
              authUser={authUser}
            />
          )}
        </>
      )}

      <SuccessMessage />
    </div>
  );
}

export default Dashboard;
