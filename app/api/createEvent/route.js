import { NextResponse } from "next/server";

export async function POST(req) {
  const authorizationHeader = req.headers.get("Authorization");

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  const token = authorizationHeader.split(" ")[1];

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
  console.log(data);
  try {
    const response = await fetch(
      "https://event-planner-backend-api.onrender.com/api/v1/user/event/create",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      const userData = await response.json();
      return NextResponse.json(userData);
    } else {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }
  } catch (error) {
    console.error("Server Error:", error.message);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
