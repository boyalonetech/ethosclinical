import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createReservation } from "@/backend/server";
import sharp from "sharp";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fullName,
      email,
      phone,
      tickets,
      needsChildcare,
      makeDonation,
      donationAmount,
    } = body;

    const ticketId = `TCK-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const created = await createReservation({
      fullName,
      email,
      phone,
      tickets: Number(tickets),
      needsChildcare,
      makeDonation: Boolean(makeDonation),
      donationAmount: Number(donationAmount) || 0,
      ticketId,
      status: "confirmed",
    });

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
          <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Building Strong Marriages in Changing Times.</p>
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
              ${
                makeDonation === true
                  ? `
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eaeaea; color: #777777; font-size: 14px;">Donation Amount</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eaeaea; text-align: right; font-weight: bold; color: #8c9c74;">$${donationAmount}</td>
              </tr>
              `
                  : ""
              }
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

    const downloadableTicketSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
  <rect width="600" height="400" fill="#f4f4f5"/>
  <rect x="20" y="20" width="560" height="360" rx="12" fill="#ffffff" stroke="#8c9c74" stroke-width="3"/>
  <path d="M 20 32 Q 20 20 32 20 L 568 20 Q 580 20 580 32 L 580 100 L 20 100 Z" fill="#8c9c74"/>
  <text x="300" y="60" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="28" font-weight="bold" fill="#ffffff" text-anchor="middle" letter-spacing="2">ADMIT ONE</text>
  <text x="300" y="85" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="14" fill="#ffffff" text-anchor="middle" opacity="0.9">Building Strong Marriages in Changing Times</text>
  <text x="50" y="150" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="22" font-weight="bold" fill="#333333">${fullName}</text>
  <text x="50" y="175" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="14" fill="#666666">Please present this digital ticket upon arrival at the venue.</text>
  <line x1="50" y1="200" x2="550" y2="200" stroke="#eeeeee" stroke-width="1"/>
  <text x="50" y="230" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="14" fill="#888888">Ticket ID</text>
  <text x="550" y="230" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="16" font-weight="bold" fill="#8c9c74" text-anchor="end">${ticketId}</text>
  <line x1="50" y1="245" x2="550" y2="245" stroke="#eeeeee" stroke-width="1"/>
  <text x="50" y="275" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="14" fill="#888888">Admit</text>
  <text x="550" y="275" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="15" font-weight="bold" fill="#333333" text-anchor="end">${tickets} Person(s)</text>
  <line x1="50" y1="290" x2="550" y2="290" stroke="#eeeeee" stroke-width="1"/>
  <text x="50" y="320" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="14" fill="#888888">Date / Time</text>
  <text x="550" y="320" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="15" font-weight="bold" fill="#333333" text-anchor="end">Fri 24th April, 2026</text>
  <line x1="50" y1="335" x2="550" y2="335" stroke="#eeeeee" stroke-width="1"/>
  <text x="50" y="365" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="14" fill="#888888">Location</text>
  <text x="550" y="365" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="15" font-weight="bold" fill="#333333" text-anchor="end">St Andrews Marayong</text>
</svg>
    `;

    let pngBuffer;
    try {
      pngBuffer = await sharp(Buffer.from(downloadableTicketSvg)).png().toBuffer();
    } catch (svgErr) {
      console.error("Failed to convert SVG to PNG, fallback to false:", svgErr);
    }

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await transporter.sendMail({
        from: `"Ethos Clinical Supervision" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Your Digital Ticket: Conference 2026",
        html: htmlContent,
        attachments: pngBuffer ? [
          {
            filename: `Digital_Ticket_${ticketId}.png`,
            content: pngBuffer,
            contentType: 'image/png'
          }
        ] : []
      });
      console.log("Confirmation email sent to", email);
    } else {
      console.warn("Skipping real email sending - .env credentials missing");
    }

    return NextResponse.json({ success: true, id: created.id, ticketId });
  } catch (error: unknown) {
    const pbError = error as {
      response?: {
        message?: string;
        data?: Record<string, { message: string }>;
      };
      message?: string;
    };
    console.error("Booking API error:", pbError);
    let errorMessage =
      pbError?.response?.message ||
      pbError?.message ||
      "Failed to process reservation";

    if (
      pbError?.response?.data &&
      Object.keys(pbError.response.data).length > 0
    ) {
      const validationErrs = Object.entries(pbError.response.data)
        .map(([field, err]) => `${field}: ${err.message}`)
        .join("; ");
      errorMessage = `Validation error: ${validationErrs}`;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
