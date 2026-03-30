import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import PocketBase from "pocketbase";
import fs from "fs";

const database = process.env.NEXT_PUBLIC_DATABASE_API || "http://127.0.0.1:8090";

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");
    const { id, fullName, email } = await request.json();

    if (!id || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Init custom pocketbase client and load provided authentication token
    const pb = new PocketBase(database);
    if (authHeader && authHeader.startsWith("Bearer ")) {
      pb.authStore.save(authHeader.substring(7), null);
    }

    // Try to magically update the DB if backend rules allow
    try {
      await pb.collection("reservations").update(id, { status: "cancelled" });
    } catch {
      console.warn("API was restricted from updating the database directly. Relying on frontend proxy.");
    }

    // Send the email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const htmlContent = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e5e5; border-radius: 12px; overflow: hidden; background-color: #ffffff; color: #333333;">
        <div style="background-color: #e11d48; padding: 30px; text-align: center; color: #ffffff;">
          <h1 style="margin: 0; font-size: 24px; font-weight: bold; letter-spacing: 1px;">RESERVATION CANCELLED</h1>
          <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Western Sydney Faith-Based Psychosocial Mental Health Conference</p>
        </div>
        
        <div style="padding: 30px;">
          <h2 style="margin-top: 0; color: #333333;">Hello ${fullName},</h2>
          <p style="line-height: 1.6; color: #555555;">This email is to notify you that your reservation request for the upcoming conference has been cancelled.</p>
          <p style="line-height: 1.6; color: #555555;">If you have any questions regarding this cancellation, or if you believe this was in error, please contact us immediately.</p>
          
          <hr style="border: 0; border-top: 1px dashed #cccccc; margin: 30px 0;" />
          
          <p style="text-align: center; color: #888888; font-size: 12px; margin: 0;">
            Powered by Ethos Clinical Supervision<br/>
            Need help? Text 0491 046 780
          </p>
        </div>
      </div>
    `;

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await transporter.sendMail({
        from: `"Ethos Clinical Supervision" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Reservation Update: Conference 2026",
        html: htmlContent,
      });
      console.log("Cancellation email sent to", email);
    } else {
      console.warn("Skipping email send - missing credentials");
    }

    return NextResponse.json({ success: true });

  } catch (error: unknown) {
    console.error("Cancel api error:", error);
    try {
      const err = error as Error;
      fs.writeFileSync('/tmp/debug.txt', String(err?.stack || err?.message || error));
    } catch {
      // ignore
    }
    return NextResponse.json({ error: "Failed to cancel" }, { status: 500 });
  }
}
