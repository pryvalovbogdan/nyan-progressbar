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

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderUninstall(payload: ContactPayload) {
  const { email, uninstall } = payload;

  if (!uninstall) return null;

  const { rating, reasons, whatWentWrong, howToImprove, anonymous } = uninstall;
  const reasonsList = reasons.length ? reasons : ['(none selected)'];
  const submitter = anonymous ? 'Anonymous' : email || 'Anonymous';

  const subject = `[uninstall] Feedback (rating: ${rating}/5)`;

  const text = [
    `Rating: ${rating}/5`,
    `Submitted by: ${submitter}`,
    '',
    'Reasons:',
    ...reasonsList.map(r => `  - ${r}`),
    '',
    'What went wrong:',
    whatWentWrong || '(no answer)',
    '',
    'How to improve:',
    howToImprove || '(no answer)',
  ].join('\n');

  const html = `
    <p><strong>Rating:</strong> ${rating}/5</p>
    <p><strong>Submitted by:</strong> ${escapeHtml(submitter)}</p>
    <p><strong>Reasons:</strong></p>
    <ul>${reasonsList.map(r => `<li>${escapeHtml(r)}</li>`).join('')}</ul>
    <p><strong>What went wrong:</strong></p>
    <p>${escapeHtml(whatWentWrong || '(no answer)').replace(/\n/g, '<br/>')}</p>
    <p><strong>How to improve:</strong></p>
    <p>${escapeHtml(howToImprove || '(no answer)').replace(/\n/g, '<br/>')}</p>
  `;

  return { subject, text, html };
}

export async function sendContactEmail(payload: ContactPayload) {
  const { name, email, category, message, attachment } = payload;
  const uninstallEmail = renderUninstall(payload);

  const subject = uninstallEmail ? uninstallEmail.subject : `[${category}] New message from ${name}`;
  const text = uninstallEmail
    ? uninstallEmail.text
    : `Name: ${name}\nEmail: ${email}\nCategory: ${category}\n\n${message}`;
  const html = uninstallEmail
    ? uninstallEmail.html
    : `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Category:</strong> ${category}</p><hr/><p>${message.replace(/\n/g, '<br/>')}</p>`;

  await transporter.sendMail({
    from: `"Nyan Website" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_TO,
    ...(email ? { replyTo: email } : {}),
    subject,
    text,
    html,
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
