import { NextResponse } from "next/server";

export async function GET(req) {
  const authorizationHeader = req.headers.get("Authorization");

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
  const token = authorizationHeader.split(" ")[1];

  const url = new URL(req.url);
  const eventId = url.searchParams.get("id");

  console.log(eventId);

  if (!eventId) {
    return NextResponse.json(
      { message: "Event ID is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://event-planner-backend-api.onrender.com/api/v1/user/event/show/${eventId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const eventData = await response.json();
      return NextResponse.json(eventData);
    } else {
      return NextResponse.json(response);
    }
  } catch (error) {
    console.log("Server Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
