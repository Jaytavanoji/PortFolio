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

    const cleanSubject = subject || "General Inquiry";

    // 3. Notification Email to Site Owner (Jay)
    const ownerMailOptions = {
      from: `"Portfolio Contact Form" <${gmailUser}>`,
      to: gmailUser,
      replyTo: email,
      subject: `[Portfolio Contact] ${subject ? subject : `New Message from ${name}`}`,
      text: `You received a new message from your portfolio contact form:\n\nName: ${name}\nEmail: ${email}\nSubject: ${cleanSubject}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #09090b; color: #f5f5f5; padding: 32px; border-radius: 16px; max-width: 600px; margin: 0 auto; border: 1px solid #27272a;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
            <h2 style="color: #ff4d1f; margin: 0; font-size: 20px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">
              NEW INQUIRY RECEIVED
            </h2>
          </div>
          <hr style="border: none; border-top: 1px solid #27272a; margin: 20px 0;" />
          <p style="margin: 10px 0; font-size: 14px; color: #a1a1aa;">
            <strong style="color: #ffffff;">Sender Name:</strong> ${name}
          </p>
          <p style="margin: 10px 0; font-size: 14px; color: #a1a1aa;">
            <strong style="color: #ffffff;">Sender Email:</strong> <a href="mailto:${email}" style="color: #ff4d1f; text-decoration: none; font-weight: 600;">${email}</a>
          </p>
          <p style="margin: 10px 0; font-size: 14px; color: #a1a1aa;">
            <strong style="color: #ffffff;">Subject:</strong> ${cleanSubject}
          </p>
          <hr style="border: none; border-top: 1px solid #27272a; margin: 20px 0;" />
          <div style="margin-top: 15px;">
            <strong style="color: #ffffff; font-size: 14px;">Message Content:</strong>
            <div style="background-color: #141417; padding: 18px; border-radius: 10px; margin-top: 10px; font-size: 14px; line-height: 1.6; color: #e4e4e7; white-space: pre-wrap; border: 1px solid #27272a;">
${message}
            </div>
          </div>
          <p style="margin-top: 30px; font-size: 11px; color: #71717a; text-align: center;">
            Sent directly from your portfolio web application.
          </p>
        </div>
      `,
    };

    // 4. Auto-Confirmation Email to Sender
    const senderConfirmationOptions = {
      from: `"Jay Shankar Tavanoji" <${gmailUser}>`,
      to: email,
      replyTo: gmailUser,
      subject: `Thanks for reaching out, ${name}! [Message Received]`,
      text: `Hi ${name},\n\nThank you for getting in touch! I have received your message regarding "${cleanSubject}" and will get back to you as soon as possible.\n\nHere is a copy of what you sent:\n${message}\n\nBest regards,\nJay Shankar Tavanoji\nSoftware Developer · Backend Engineer · AI Explorer\nPortfolio: https://portfolio-jaytavanoji.vercel.app`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #09090b; color: #f5f5f5; padding: 32px; border-radius: 16px; max-width: 600px; margin: 0 auto; border: 1px solid #27272a;">
          <div style="margin-bottom: 24px;">
            <span style="color: #ff4d1f; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;">
              MESSAGE CONFIRMATION
            </span>
            <h2 style="color: #ffffff; margin: 8px 0 0 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">
              Thank you for reaching out, ${name}.
            </h2>
          </div>
          <p style="font-size: 14px; line-height: 1.7; color: #d4d4d8; margin: 0 0 16px 0;">
            I have received your inquiry regarding <strong style="color: #ffffff;">"${cleanSubject}"</strong>. I appreciate you taking the time to write, and I will review your note and get back to you shortly.
          </p>
          <hr style="border: none; border-top: 1px solid #27272a; margin: 24px 0;" />
          <div style="margin-bottom: 24px;">
            <span style="font-size: 12px; font-weight: 600; color: #a1a1aa; text-transform: uppercase; letter-spacing: 1px;">
              Summary of Your Message:
            </span>
            <div style="background-color: #141417; padding: 18px; border-radius: 10px; margin-top: 10px; font-size: 13.5px; line-height: 1.6; color: #a1a1aa; white-space: pre-wrap; border: 1px solid #27272a;">
${message}
            </div>
          </div>
          <div style="padding-top: 16px; border-top: 1px solid #27272a;">
            <p style="margin: 0; font-size: 14px; font-weight: 600; color: #ffffff;">
              Jay Shankar Tavanoji
            </p>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #a1a1aa;">
              Software Developer · Backend Engineer · AI Explorer
            </p>
          </div>
        </div>
      `,
    };

    // 5. Send both emails concurrently
    await Promise.all([
      transporter.sendMail(ownerMailOptions),
      transporter.sendMail(senderConfirmationOptions),
    ]);

    return NextResponse.json(
      {
        success: true,
        message: "Your message was sent! A confirmation copy has been sent to your email.",
      },
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
