import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { fullName, email, phone, message } = await request.json();

    // Configure your SMTP transporter here
    // It's highly recommended to use an App Password if using Gmail,
    // and store these in your .env.local file:
    // EMAIL_USER=your_email@gmail.com
    // EMAIL_PASS=your_app_password
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "stephenonyekwere@gmail.com", // The destination email provided by you
      replyTo: email,
      subject: `Ethos Contact Message from ${fullName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #faf9f6; border-radius: 8px; border: 1px solid #eaeaea; }
            .header { background-color: #8c9c74; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; margin: -20px -20px 20px -20px; }
            .content { padding: 20px; background-color: white; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
            h2 { margin-top: 0; font-weight: 500; font-size: 20px; }
            .row { margin-bottom: 12px; border-bottom: 1px solid #f0f0f0; padding-bottom: 12px; }
            .row:last-child { border-bottom: none; }
            .label { font-size: 12px; text-transform: uppercase; color: #888; font-weight: bold; letter-spacing: 0.5px; display: block; margin-bottom: 4px; }
            .value { font-size: 15px; color: #111; }
            .message-box { background-color: #f9f9f9; padding: 16px; border-radius: 6px; border-left: 4px solid #8d6959; margin-top: 8px; font-size: 15px; white-space: pre-wrap; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #888; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Ethos Clinical Supervision</h2>
            </div>
            <div class="content">
              <h2>New Contact Message</h2>
              <div class="row">
                <span class="label">Name</span>
                <span class="value">${fullName}</span>
              </div>
              <div class="row">
                <span class="label">Email</span>
                <span class="value"><a href="mailto:${email}" style="color: #8c9c74; text-decoration: none;">${email}</a></span>
              </div>
              <div class="row">
                <span class="label">Phone Number</span>
                <span class="value">${phone || "<i>Not provided</i>"}</span>
              </div>
              <div class="row">
                <span class="label">Message</span>
                <div class="message-box">${message.replace(/\n/g, "<br>")}</div>
              </div>
            </div>
            <div class="footer">
              <p>This message was sent securely from the Ethos Clinical website contact form.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 },
    );
  }
}
