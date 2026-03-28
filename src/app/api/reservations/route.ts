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
      tickets: Number(tickets),
      needsChildcare,
      status: 'pending'
    });

    return NextResponse.json({ success: true, id: created.id });
  } catch (error: any) {
    console.error("Booking API error:", error);
    let errorMessage = error?.response?.message || error?.message || "Failed to process reservation";
    
    if (error?.response?.data && Object.keys(error.response.data).length > 0) {
      const validationErrs = Object.entries(error.response.data)
        .map(([field, err]: any) => `${field}: ${err.message}`)
        .join('; ');
      errorMessage = `Validation error: ${validationErrs}`;
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
