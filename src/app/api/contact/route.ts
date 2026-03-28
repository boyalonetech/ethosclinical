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
        <h2>Ethos Contact Message from</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <br />
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
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
