import nodemailer from 'nodemailer';
import { ContactPayload } from './types';

const port = Number(process.env.SMTP_PORT ?? 587);

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port,
  secure: port === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendContactEmail(payload: ContactPayload) {
  const { name, email, category, message, attachment } = payload;

  await transporter.sendMail({
    from: `"Nyan Website" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_TO,
    replyTo: email,
    subject: `[${category}] New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nCategory: ${category}\n\n${message}`,
    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Category:</strong> ${category}</p><hr/><p>${message.replace(/\n/g, '<br/>')}</p>`,
    attachments: attachment
      ? [
          {
            filename: attachment.name,
            content: Buffer.from(attachment.data, 'base64'),
            contentType: attachment.mimeType,
          },
        ]
      : [],
  });
}
