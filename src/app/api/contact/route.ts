import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // 1. Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const gmailUser = process.env.GMAIL_USER || "jayshankartavanoji2020@gmail.com";
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    if (!gmailPass) {
      return NextResponse.json(
        {
          error:
            "GMAIL_APP_PASSWORD is not configured in .env.local. Please create a 16-character Google App Password in your Google Account security settings.",
        },
        { status: 500 }
      );
    }

    // 2. Configure Gmail SMTP Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    // 3. Email Content
    const mailSubject = `[Portfolio Contact] ${subject || `New Message from ${name}`}`;

    const mailOptions = {
      from: `"Portfolio Contact Form" <${gmailUser}>`,
      to: gmailUser,
      replyTo: email,
      subject: mailSubject,
      text: `You received a new message from your portfolio contact form:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject || "N/A"}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #0d0d11; color: #f5f5f5; padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid #27272a;">
          <h2 style="color: #ff4d1f; margin-top: 0; font-size: 22px; text-transform: uppercase; letter-spacing: 1px;">
            New Portfolio Message
          </h2>
          <hr style="border: none; border-top: 1px solid #27272a; margin: 20px 0;" />
          <p style="margin: 8px 0; font-size: 14px; color: #a1a1aa;">
            <strong style="color: #ffffff;">Sender Name:</strong> ${name}
          </p>
          <p style="margin: 8px 0; font-size: 14px; color: #a1a1aa;">
            <strong style="color: #ffffff;">Sender Email:</strong> <a href="mailto:${email}" style="color: #ff4d1f; text-decoration: none;">${email}</a>
          </p>
          <p style="margin: 8px 0; font-size: 14px; color: #a1a1aa;">
            <strong style="color: #ffffff;">Subject:</strong> ${subject || "General Inquiry"}
          </p>
          <hr style="border: none; border-top: 1px solid #27272a; margin: 20px 0;" />
          <div style="margin-top: 15px;">
            <strong style="color: #ffffff; font-size: 14px;">Message:</strong>
            <div style="background-color: #18181b; padding: 16px; border-radius: 8px; margin-top: 8px; font-size: 14px; line-height: 1.6; color: #e4e4e7; white-space: pre-wrap; border: 1px solid #27272a;">
              ${message}
            </div>
          </div>
          <p style="margin-top: 30px; font-size: 11px; color: #71717a; text-align: center;">
            This email was sent from your portfolio website contact form.
          </p>
        </div>
      `,
    };

    // 4. Send Email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: "Your message has been sent successfully!" },
      { status: 200 }
    );
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Failed to send email";
    console.error("Error sending contact email:", err);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
