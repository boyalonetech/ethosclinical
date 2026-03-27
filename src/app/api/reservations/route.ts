import { NextResponse } from "next/server";
import { createReservation } from "@/backend/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, tickets, needsChildcare } = body;
    
    // Save to PocketBase with pending status
    const created = await createReservation({
      fullName,
      email,
      phone,
      tickets,
      needsChildcare,
      status: 'pending'
    });

    return NextResponse.json({ success: true, id: created.id });
  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json(
      { error: "Failed to process reservation" },
      { status: 500 }
    );
  }
}
