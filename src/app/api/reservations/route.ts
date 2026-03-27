import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, tickets, needsChildcare } = body;
    
    // Attempt connecting to SMTP if user set the .env variables
    // For free tiers, developers typically specify their personal/work GMail.
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const ticketId = `TCK-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const htmlContent = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e5e5; border-radius: 12px; overflow: hidden; background-color: #ffffff; color: #333333;">
        <div style="background-color: #8c9c74; padding: 30px; text-align: center; color: #ffffff;">
          <h1 style="margin: 0; font-size: 24px; font-weight: bold; letter-spacing: 1px;">DIGITAL TICKET</h1>
          <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Western Sydney Faith-Based Psychosocial Mental Health Conference</p>
        </div>
        
        <div style="padding: 30px;">
          <h2 style="margin-top: 0; color: #333333;">Hello ${fullName},</h2>
          <p style="line-height: 1.6; color: #555555;">Thank you for your reservation! Your seat has been successfully secured. Please present this digital ticket upon arrival.</p>
          
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
                <td style="padding: 8px 0; text-align: right; font-weight: bold; color: #333;">Fri 24th April, 2026<br/>7:00pm - 9:00pm</td>
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

    // It's acceptable for the server to successfully 'process' the ticket without emailing
    // if the user hasn't set up the .env variables yet.
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await transporter.sendMail({
        from: `"Ethos Clinical Supervision" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Your Digital Ticket: Conference 2026",
        html: htmlContent,
      });
      console.log("Email sent successfully to", email);
    } else {
      console.warn("EMAIL_USER and EMAIL_PASS not set in .env. Digital ticket generated but email delivery skipped for:", email);
    }

    return NextResponse.json({ success: true, ticketId });
  } catch (error) {
    console.error("Booking api error:", error);
    return NextResponse.json(
      { error: "Failed to process reservation" },
      { status: 500 }
    );
  }
}
