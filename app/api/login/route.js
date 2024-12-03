import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const params = { email, password };

    const request = await fetch(
      "https://event-planner-backend-api.onrender.com/api/v1/user/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      }
    );
    if (request.ok) {
      const response = await request.json();
      return NextResponse.json(response);
    } else {
      const errorResponse = await request.json();
      return NextResponse.status(errorResponse.statusCode).json(errorResponse);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.status(500).json({ error: "Internal server error" });
  }
}
