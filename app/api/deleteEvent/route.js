import { NextResponse } from "next/server";

export async function PUT(req) {
  const authorizationHeader = req.headers.get("Authorization");

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
  const token = authorizationHeader.split(" ")[1];

  const url = new URL(req.url);
  const eventId = url.searchParams.get("id");

  if (!eventId) {
    return NextResponse.json(
      { message: "Event ID is required" },
      { status: 400 }
    );
  }

  const {
    name,
    type,
    description,
    tags,
    start_date,
    end_date,
    location_link,
    attendance_capacity,
    ticket_pricing,
    ticket_price,
    draft,
  } = await req.json();

  const data = {
    name,
    type,
    description,
    tags,
    start_date,
    end_date,
    location_link,
    attendance_capacity,
    ticket_pricing,
    ticket_price,
    draft,
  };

  console.log("Data sent to backend:", data);

  try {
    const response = await fetch(
      `https://event-planner-backend-api.onrender.com/api/v1/user/event/update/${eventId}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      const eventData = await response.json();
      return NextResponse.json(eventData);
    } else {
      const errorResponse = await response.json();
      console.error("Error from API:", errorResponse);
      return NextResponse.json(errorResponse, { status: response.status });
    }
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
