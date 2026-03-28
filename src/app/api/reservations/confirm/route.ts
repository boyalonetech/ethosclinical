import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { updateReservation } from "@/backend/server";

export async function POST(request: Request) {
  try {
    const { id, fullName, email, tickets, needsChildcare } =
      await request.json();

    if (!id || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const ticketId = `TCK-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // Update the DB safely before sending
    await updateReservation(id, { status: "confirmed", ticketId });

    const baseUrl = new URL(request.url).origin;
    const ticketImageUrl = `${baseUrl}/api/ticket?name=${encodeURIComponent(fullName)}&ticketId=${ticketId}&tickets=${tickets}`;

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
        <div style="background-color: #8c9c74; padding: 30px; text-align: center; color: #ffffff;">
          <h1 style="margin: 0; font-size: 24px; font-weight: bold; letter-spacing: 1px;">DIGITAL TICKET</h1>
          <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Western Sydney Faith-Based Psychosocial Mental Health Conference</p>
        </div>
        
        <div style="padding: 30px;">
          <h2 style="margin-top: 0; color: #333333;">Hello ${fullName},</h2>
          <p style="line-height: 1.6; color: #555555;">Great news! Your reservation request has been approved. Please present this digital ticket upon arrival.</p>
          
          <div style="background-color: #f9f8f5; border-radius: 8px; padding: 20px; margin: 25px 0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eaeaea; color: #777777; font-size: 14px;">Ticket ID</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eaeaea; text-align: right; font-weight: bold; color: #333;">${ticketId}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eaeaea; color: #777777; font-size: 14px;">Number of Tickets</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eaeaea; text-align: right; font-weight: bold; color: #333;">${tickets}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eaeaea; color: #777777; font-size: 14px;">Childcare Requested</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eaeaea; text-align: right; font-weight: bold; color: #333;">${needsChildcare ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #777777; font-size: 14px;">Date & Time</td>
                <td style="padding: 8px 0; text-align: right; font-weight: bold; color: #333;">Fri 24th April, 2026<br/>7:00pm - 9:30pm</td>
              </tr>
            </table>
          </div>

          <div style="margin-bottom: 20px;">
            <h3 style="margin-bottom: 5px; font-size: 16px;">Location</h3>
            <p style="margin: 0; color: #555555; line-height: 1.5;">St Andrews Marayong Church Hall<br/>36-40 Breakfast Road, Marayong NSW 2148</p>
          </div>
          
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
        subject: "Your Digital Ticket: Conference 2026",
        html: htmlContent,
        attachments: [
          {
            filename: `Digital_Ticket_${ticketId}.png`,
            path: ticketImageUrl,
          },
        ],
      });
      console.log("Ticket email sent to", email);
    } else {
      console.warn("Skipping real email sending - .env credentials missing");
    }

    return NextResponse.json({ success: true, ticketId });
  } catch (error) {
    console.error("Confirm api error:", error);
    return NextResponse.json({ error: "Failed to confirm" }, { status: 500 });
  }
}
