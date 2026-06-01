import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export interface ContactPayload {
  name: string;
  email: string;
  category: string;
  message: string;
}

export async function sendContactEmail(payload: ContactPayload) {
  const { name, email, category, message } = payload;

  await transporter.sendMail({
    from: `"Nyan Website" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_TO,
    replyTo: email,
    subject: `[${category}] New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nCategory: ${category}\n\n${message}`,
    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Category:</strong> ${category}</p><hr/><p>${message.replace(/\n/g, '<br/>')}</p>`,
  });
}
