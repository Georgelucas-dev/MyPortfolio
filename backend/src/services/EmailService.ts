import nodemailer from "nodemailer";

export class EmailService {
  static async send(data: { name: string; email: string; message: string }) {
    const smtpHost = process.env.SMTP_HOST?.trim();
    const smtpUser = process.env.SMTP_USER?.trim();
    const smtpPass = process.env.SMTP_PASS?.replace(/\s+/g, "").trim();
    const emailFrom = process.env.EMAIL_FROM?.trim();
    const emailTo = process.env.EMAIL_TO?.trim();

    if (!smtpHost || !smtpUser || !smtpPass || !emailFrom || !emailTo) {
      throw new Error(
        "SMTP configuration is incomplete. Check your backend .env file.",
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    try {
      await transporter.sendMail({
        from: emailFrom,
        to: emailTo,
        replyTo: data.email,
        subject: `New contact from ${data.name}`,
        text: `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`,
      });
    } catch (error) {
      const details = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to send email: ${details}`);
    }
  }
}
