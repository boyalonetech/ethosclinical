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
  } catch (error: unknown) {
    const pbError = error as { response?: { message?: string, data?: Record<string, { message: string }> }, message?: string };
    console.error("Booking API error:", pbError);
    let errorMessage = pbError?.response?.message || pbError?.message || "Failed to process reservation";
    
    if (pbError?.response?.data && Object.keys(pbError.response.data).length > 0) {
      const validationErrs = Object.entries(pbError.response.data)
        .map(([field, err]) => `${field}: ${err.message}`)
        .join('; ');
      errorMessage = `Validation error: ${validationErrs}`;
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
