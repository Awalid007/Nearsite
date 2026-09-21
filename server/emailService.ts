import nodemailer from 'nodemailer';

export interface BookingEmailData {
  firstName: string;
  lastName?: string;
  email: string;
  bizName: string;
  bizType?: string;
  budget?: string;
  date?: string;
  timeSlot?: string;
  selectedFeatures?: string[];
  notes?: string;
  createdAt?: string;
}

/**
 * Creates the HTML email sent to the client confirming their booking
 */
export function generateClientConfirmationHtml(data: BookingEmailData): string {
  const { firstName, bizName, date, timeSlot, budget, selectedFeatures, notes } = data;

  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Scheduled Date (confirmed via calendar)';

  const featuresList =
    selectedFeatures && selectedFeatures.length > 0
      ? selectedFeatures.join(', ')
      : 'Complete Custom Website ($699 All-Inclusive)';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your Website Discovery Call is Confirmed</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #070d0d;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #e2e8f0;
    }
    .wrapper {
      width: 100%;
      table-layout: fixed;
      background-color: #070d0d;
      padding: 40px 0 60px 0;
    }
    .main-card {
      max-width: 600px;
      margin: 0 auto;
      background-color: #0c1515;
      border: 1px solid #10b98133;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    }
    .header {
      padding: 32px 32px 24px 32px;
      background: linear-gradient(180deg, rgba(16, 185, 129, 0.12) 0%, transparent 100%);
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }
    .brand {
      font-size: 20px;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: -0.5px;
    }
    .brand-accent {
      color: #10b981;
    }
    .content {
      padding: 32px;
    }
    h1 {
      font-size: 22px;
      font-weight: 700;
      color: #ffffff;
      margin: 0 0 12px 0;
    }
    p {
      font-size: 15px;
      line-height: 1.6;
      color: #94a3b8;
      margin: 0 0 20px 0;
    }
    .details-box {
      background-color: #081010;
      border: 1px solid rgba(16, 185, 129, 0.2);
      border-radius: 12px;
      padding: 20px;
      margin: 24px 0;
    }
    .detail-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      font-size: 14px;
    }
    .detail-row:last-child {
      border-bottom: none;
    }
    .detail-label {
      color: #64748b;
      font-weight: 600;
      text-transform: uppercase;
      font-size: 11px;
      letter-spacing: 0.5px;
    }
    .detail-value {
      color: #ffffff;
      font-weight: 600;
      text-align: right;
    }
    .badge {
      display: inline-block;
      background-color: rgba(16, 185, 129, 0.15);
      color: #10b981;
      padding: 4px 10px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 700;
    }
    .next-steps {
      background-color: rgba(255, 255, 255, 0.02);
      border-left: 3px solid #10b981;
      padding: 16px;
      border-radius: 0 8px 8px 0;
      margin: 24px 0;
    }
    .step-item {
      font-size: 13.5px;
      color: #cbd5e1;
      margin-bottom: 8px;
    }
    .footer {
      padding: 24px 32px;
      background-color: #060b0b;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      font-size: 13px;
      color: #64748b;
      line-height: 1.5;
    }
    .button {
      display: inline-block;
      background-color: #10b981;
      color: #000000 !important;
      font-weight: 700;
      font-size: 14px;
      padding: 12px 24px;
      border-radius: 10px;
      text-decoration: none;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="main-card">
      <div class="header">
        <div class="brand">Near<span class="brand-accent">site</span></div>
      </div>

      <div class="content">
        <div class="badge">Meeting Confirmed</div>
        <h1 style="margin-top: 12px;">You're on Ahmad's calendar, ${firstName}!</h1>
        <p>
          Thank you for scheduling a discovery call. I'm looking forward to reviewing <strong>${bizName}</strong> and discussing how we can build a high-converting website that turns local searchers into paying clients.
        </p>

        <div class="details-box">
          <table width="100%" cellpadding="6" cellspacing="0" style="border-collapse: collapse;">
            <tr>
              <td style="color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase;">Date</td>
              <td style="color: #ffffff; font-size: 14px; font-weight: 600; text-align: right;">${formattedDate}</td>
            </tr>
            <tr>
              <td style="color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase;">Time</td>
              <td style="color: #10b981; font-size: 14px; font-weight: 700; text-align: right;">${timeSlot || 'Scheduled Time'}</td>
            </tr>
            <tr>
              <td style="color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase;">Host</td>
              <td style="color: #ffffff; font-size: 14px; font-weight: 600; text-align: right;">Ahmad (Founder, Nearsite)</td>
            </tr>
            <tr>
              <td style="color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase;">Location</td>
              <td style="color: #ffffff; font-size: 14px; font-weight: 600; text-align: right;">Google Meet (link sent prior to call)</td>
            </tr>
            ${
              budget
                ? `<tr>
              <td style="color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase;">Budget Tier</td>
              <td style="color: #ffffff; font-size: 14px; font-weight: 600; text-align: right;">${budget}</td>
            </tr>`
                : ''
            }
          </table>
        </div>

        <div class="next-steps">
          <div style="font-weight: 700; color: #ffffff; margin-bottom: 8px; font-size: 14px;">What we will cover in 15 minutes:</div>
          <div class="step-item">1. <strong>Local Competitor Audit:</strong> Who is currently ranking at the top of Google Maps in your area.</div>
          <div class="step-item">2. <strong>High-Converting Blueprint:</strong> Layout, mobile tap-to-call, and fast-booking features tailored to your service.</div>
          <div class="step-item">3. <strong>Clear Scope & Timeline:</strong> Guaranteed delivery in under 14 days with our $699 all-inclusive guarantee.</div>
        </div>

        ${
          notes
            ? `<p style="font-size: 13px; background: rgba(255,255,255,0.03); padding: 12px; border-radius: 8px;"><strong>Your Notes:</strong> ${notes}</p>`
            : ''
        }

        <p style="margin-top: 24px;">
          Need to reschedule or have a quick question before our meeting? Simply reply directly to this email or write to <a href="mailto:Nearsiteahmad@gmail.com" style="color: #10b981; text-decoration: none;">Nearsiteahmad@gmail.com</a>.
        </p>

        <p style="margin-bottom: 0; color: #cbd5e1;">
          Talk soon,<br />
          <strong>Ahmad</strong><br />
          <span style="font-size: 13px; color: #64748b;">Founder & Developer, Nearsite</span>
        </p>
      </div>

      <div class="footer">
        Nearsite • Modern High-Converting Websites for Local Businesses<br />
        Stafford, VA • <a href="mailto:Nearsiteahmad@gmail.com" style="color: #94a3b8;">Nearsiteahmad@gmail.com</a>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Creates the admin alert email sent to Ahmad whenever a new booking occurs
 */
export function generateAdminNotificationHtml(data: BookingEmailData): string {
  const { firstName, lastName, email, bizName, bizType, budget, date, timeSlot, selectedFeatures, notes, createdAt } = data;

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; color: #111; line-height: 1.6;">
      <h2 style="color: #10b981; margin-bottom: 8px;">🚀 New Discovery Call Booked!</h2>
      <p style="font-size: 15px; margin-top: 0;">A new client has scheduled a discovery call on your website:</p>
      
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 20px 0;">
        <ul style="list-style: none; padding: 0; margin: 0; font-size: 14px;">
          <li style="margin-bottom: 8px;"><strong>Client:</strong> ${firstName} ${lastName || ''}</li>
          <li style="margin-bottom: 8px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #2563eb; font-weight: 600;">${email}</a></li>
          <li style="margin-bottom: 8px;"><strong>Business:</strong> ${bizName} (${bizType || 'Local Business'})</li>
          <li style="margin-bottom: 8px;"><strong>Date & Time:</strong> ${date || 'N/A'} at ${timeSlot || 'N/A'}</li>
          <li style="margin-bottom: 8px;"><strong>Budget:</strong> ${budget || 'Not specified'}</li>
          <li style="margin-bottom: 8px;"><strong>Requested Package:</strong> ${selectedFeatures ? selectedFeatures.join(', ') : 'All-Inclusive $699'}</li>
          <li style="margin-bottom: 8px;"><strong>Notes:</strong> ${notes || 'None'}</li>
          <li><strong>Timestamp:</strong> ${createdAt || new Date().toISOString()}</li>
        </ul>
      </div>

      <div style="margin-top: 24px;">
        <a href="https://i-want-to-build-for-myself-only-which-is.rork.app/bookings" target="_blank" style="display: inline-block; background: #0f172a; color: #ffffff; padding: 12px 24px; border-radius: 10px; font-weight: 600; text-decoration: none; font-size: 14px;">
          Open in Nearsite CEO App →
        </a>
      </div>
    </div>
  `;
}

/**
 * Transporter setup using Gmail SMTP with Nearsiteahmad@gmail.com
 */
export function getMailTransporter() {
  const user = process.env.GMAIL_USER || 'Nearsiteahmad@gmail.com';
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!pass) {
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user,
      pass,
    },
  });
}

/**
 * Send the booking confirmation email
 */
export async function sendBookingEmails(booking: BookingEmailData): Promise<{
  success: boolean;
  simulated?: boolean;
  message: string;
}> {
  const fromAddress = `"Ahmad from Nearsite" <${process.env.GMAIL_USER || 'Nearsiteahmad@gmail.com'}>`;
  const replyTo = 'Nearsiteahmad@gmail.com';

  const clientHtml = generateClientConfirmationHtml(booking);
  const adminHtml = generateAdminNotificationHtml(booking);

  const transporter = getMailTransporter();

  // If GMAIL_APP_PASSWORD is not set yet, log beautifully and return simulation info
  if (!transporter) {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📬 [EMAIL DISPATCH READY] (Simulated Mode - Set GMAIL_APP_PASSWORD in .env)');
    console.log(`From: ${fromAddress}`);
    console.log(`To: ${booking.email}`);
    console.log(`Subject: Confirmed: Your Website Discovery Call with Nearsite`);
    console.log(`Client: ${booking.firstName} (${booking.bizName}) | Date: ${booking.date} at ${booking.timeSlot}`);
    console.log('Admin Notification also prepared for Nearsiteahmad@gmail.com');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    return {
      success: true,
      simulated: true,
      message: 'Email confirmation generated successfully. In production, set GMAIL_APP_PASSWORD in environment variables to deliver directly to inbox.',
    };
  }

  try {
    // 1. Send confirmation to the client who booked
    await transporter.sendMail({
      from: fromAddress,
      to: booking.email,
      replyTo,
      subject: `Confirmed: Your Website Discovery Call with Nearsite (${booking.bizName})`,
      html: clientHtml,
    });

    // 2. Send notification copy to Ahmad
    await transporter.sendMail({
      from: fromAddress,
      to: 'Nearsiteahmad@gmail.com',
      replyTo: booking.email,
      subject: `🔔 New Booking: ${booking.firstName} from ${booking.bizName}`,
      html: adminHtml,
    });

    return {
      success: true,
      simulated: false,
      message: `Confirmation email dispatched to ${booking.email} from Nearsiteahmad@gmail.com`,
    };
  } catch (error: any) {
    console.error('Failed to send email via Gmail SMTP:', error);
    return {
      success: false,
      message: error?.message || 'Failed to dispatch email',
    };
  }
}

export interface ContactEmailData {
  name: string;
  email: string;
  businessName?: string;
  existingWebsite?: string;
  serviceInterest?: string;
  timeline?: string;
  message: string;
  createdAt?: string;
}

/**
 * Send contact inquiry emails (client auto-acknowledgement + alert to Ahmad)
 */
export async function sendContactEmails(contact: ContactEmailData): Promise<{
  success: boolean;
  simulated?: boolean;
  message: string;
}> {
  const fromAddress = `"Ahmad from Nearsite" <${process.env.GMAIL_USER || 'Nearsiteahmad@gmail.com'}>`;
  const replyTo = 'Nearsiteahmad@gmail.com';

  const transporter = getMailTransporter();

  const clientHtml = `
    <div style="background-color: #070d0d; color: #e2e8f0; font-family: sans-serif; padding: 30px;">
      <div style="max-width: 580px; margin: 0 auto; background: #0c1515; border: 1px solid #10b98133; border-radius: 14px; padding: 28px;">
        <h2 style="color: #ffffff; margin-top: 0;">Message Received, ${contact.name}!</h2>
        <p style="color: #94a3b8; line-height: 1.6;">
          Thank you for reaching out to Nearsite. I've received your project inquiry and will personally review your details.
        </p>
        <div style="background: #081010; border-left: 3px solid #10b981; padding: 14px; margin: 18px 0; border-radius: 4px;">
          <p style="margin: 0; color: #cbd5e1; font-size: 14px;"><strong>Your message:</strong> "${contact.message}"</p>
        </div>
        <p style="color: #94a3b8; line-height: 1.6;">
          You can expect a response within 2 hours during normal business hours. If you'd like to jump on a quick 15-minute intro call instead, feel free to reply directly to this email.
        </p>
        <p style="color: #cbd5e1; margin-bottom: 0;">
          Best regards,<br />
          <strong>Ahmad</strong><br />
          <span style="color: #64748b; font-size: 12px;">Founder & Developer, Nearsite • Stafford, VA</span>
        </p>
      </div>
    </div>
  `;

  const adminHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; color: #111; line-height: 1.6;">
      <h2 style="color: #0284c7; margin-bottom: 8px;">📬 New Lead Inquiry from Website!</h2>
      <p style="font-size: 15px; margin-top: 0;">A prospect reached out on your website contact form:</p>

      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 20px 0;">
        <ul style="list-style: none; padding: 0; margin: 0; font-size: 14px;">
          <li style="margin-bottom: 8px;"><strong>Name:</strong> ${contact.name}</li>
          <li style="margin-bottom: 8px;"><strong>Email:</strong> <a href="mailto:${contact.email}" style="color: #2563eb; font-weight: 600;">${contact.email}</a></li>
          <li style="margin-bottom: 8px;"><strong>Business:</strong> ${contact.businessName || 'N/A'}</li>
          <li style="margin-bottom: 8px;"><strong>Existing Website:</strong> ${contact.existingWebsite || 'None'}</li>
          <li style="margin-bottom: 8px;"><strong>Service Interest:</strong> ${contact.serviceInterest || 'N/A'}</li>
          <li style="margin-bottom: 8px;"><strong>Timeline:</strong> ${contact.timeline || 'N/A'}</li>
          <li style="margin-top: 12px; padding-top: 12px; border-top: 1px dashed #cbd5e1;"><strong>Message:</strong><br/>${contact.message}</li>
        </ul>
      </div>

      <div style="margin-top: 24px;">
        <a href="https://i-want-to-build-for-myself-only-which-is.rork.app/leads" target="_blank" style="display: inline-block; background: #0f172a; color: #ffffff; padding: 12px 24px; border-radius: 10px; font-weight: 600; text-decoration: none; font-size: 14px;">
          Open in Nearsite CEO App (/leads) →
        </a>
      </div>
    </div>
  `;

  if (!transporter) {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📬 [CONTACT EMAIL READY] (Simulated Mode)');
    console.log(`From: ${fromAddress} -> To: ${contact.email}`);
    console.log(`Inquiry: ${contact.name} (${contact.businessName}) - "${contact.message}"`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    return {
      success: true,
      simulated: true,
      message: 'Contact inquiry recorded.',
    };
  }

  try {
    // Client confirmation
    await transporter.sendMail({
      from: fromAddress,
      to: contact.email,
      replyTo,
      subject: `We received your inquiry - Nearsite (${contact.businessName || 'Website Project'})`,
      html: clientHtml,
    });

    // Ahmad admin alert
    await transporter.sendMail({
      from: fromAddress,
      to: 'Nearsiteahmad@gmail.com',
      replyTo: contact.email,
      subject: `💬 New Inquiry: ${contact.name} (${contact.businessName || 'Website Project'})`,
      html: adminHtml,
    });

    return {
      success: true,
      simulated: false,
      message: 'Contact emails sent successfully.',
    };
  } catch (err: any) {
    console.error('Failed to send contact emails:', err);
    return {
      success: false,
      message: err?.message || 'Failed to dispatch contact email',
    };
  }
}

