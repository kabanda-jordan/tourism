import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Sandbox: use onboarding@resend.dev until you verify a domain
const FROM_EMAIL = "Trekly <onboarding@resend.dev>";
const APP_NAME = "Trekly";

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [to],
    subject,
    html,
  });

  if (error) {
    console.error("Email send error:", error);
    return { error: error.message };
  }

  return { data };
}

// ==================== EMAIL TEMPLATES ====================

function baseTemplate(content: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#FAFAFA;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:40px 20px;">
    <!-- Logo -->
    <div style="text-align:center;margin-bottom:32px;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL}" style="text-decoration:none;">
        <span style="font-size:28px;font-weight:700;color:#0F766E;">Trekly</span>
      </a>
    </div>
    <!-- Card -->
    <div style="background:#fff;border-radius:16px;border:1px solid #f0f0f0;padding:40px 32px;">
      ${content}
    </div>
    <!-- Footer -->
    <div style="text-align:center;margin-top:24px;">
      <p style="font-size:12px;color:#9CA3AF;">
        &copy; ${new Date().getFullYear()} Trekly. All rights reserved.<br/>
        Kigali, Rwanda
      </p>
    </div>
  </div>
</body>
</html>`;
}

export function otpEmail(name: string, code: string): { subject: string; html: string } {
  return {
    subject: `Your Trekly verification code: ${code}`,
    html: baseTemplate(`
      <h2 style="margin:0 0 8px;font-size:20px;font-weight:700;color:#111827;">
        Verify your email
      </h2>
      <p style="margin:0 0 24px;font-size:14px;color:#6B7280;line-height:1.6;">
        Hi ${name}, use the code below to verify your email address. This code expires in 10 minutes.
      </p>
      <div style="text-align:center;margin:24px 0;">
        <div style="display:inline-block;background:#F0FDFA;border:2px dashed #0F766E;border-radius:12px;padding:16px 32px;">
          <span style="font-size:32px;font-weight:700;color:#0F766E;letter-spacing:8px;font-family:monospace;">
            ${code}
          </span>
        </div>
      </div>
      <p style="font-size:13px;color:#9CA3AF;text-align:center;margin:16px 0 0;">
        If you didn't create an account, you can safely ignore this email.
      </p>
    `),
  };
}

export function welcomeEmail(name: string): { subject: string; html: string } {
  return {
    subject: `Welcome to ${APP_NAME}! 🎉`,
    html: baseTemplate(`
      <h2 style="margin:0 0 8px;font-size:20px;font-weight:700;color:#111827;">
        Welcome to Trekly, ${name}!
      </h2>
      <p style="margin:0 0 16px;font-size:14px;color:#6B7280;line-height:1.6;">
        Your account is ready. Start exploring Rwanda's best vehicles for your next adventure.
      </p>
      <div style="text-align:center;margin:24px 0;">
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/search"
           style="display:inline-block;background:#0F766E;color:#fff;text-decoration:none;
                  padding:12px 32px;border-radius:12px;font-size:14px;font-weight:600;">
          Browse Vehicles
        </a>
      </div>
    `),
  };
}

export function passwordResetEmail(name: string, resetUrl: string): { subject: string; html: string } {
  return {
    subject: `Reset your ${APP_NAME} password`,
    html: baseTemplate(`
      <h2 style="margin:0 0 8px;font-size:20px;font-weight:700;color:#111827;">
        Reset your password
      </h2>
      <p style="margin:0 0 16px;font-size:14px;color:#6B7280;line-height:1.6;">
        Hi ${name}, we received a request to reset your password. Click the button below to set a new one.
      </p>
      <div style="text-align:center;margin:24px 0;">
        <a href="${resetUrl}"
           style="display:inline-block;background:#0F766E;color:#fff;text-decoration:none;
                  padding:12px 32px;border-radius:12px;font-size:14px;font-weight:600;">
          Reset Password
        </a>
      </div>
      <p style="font-size:13px;color:#9CA3AF;text-align:center;margin:16px 0 0;">
        This link expires in 1 hour. If you didn't request this, ignore this email.
      </p>
    `),
  };
}

export function bookingConfirmationEmail(
  name: string,
  bookingCode: string,
  vehicleName: string,
  pickupDate: string,
  dropoffDate: string,
  totalPrice: number
): { subject: string; html: string } {
  return {
    subject: `Booking Confirmed - ${bookingCode}`,
    html: baseTemplate(`
      <h2 style="margin:0 0 8px;font-size:20px;font-weight:700;color:#111827;">
        Booking Confirmed!
      </h2>
      <p style="margin:0 0 16px;font-size:14px;color:#6B7280;line-height:1.6;">
        Hi ${name}, your vehicle booking has been confirmed.
      </p>
      <div style="background:#F9FAFB;border-radius:12px;padding:20px;margin:16px 0;">
        <table style="width:100%;font-size:14px;color:#374151;">
          <tr>
            <td style="padding:4px 0;color:#6B7280;">Booking Code</td>
            <td style="padding:4px 0;font-weight:600;text-align:right;">${bookingCode}</td>
          </tr>
          <tr>
            <td style="padding:4px 0;color:#6B7280;">Vehicle</td>
            <td style="padding:4px 0;font-weight:600;text-align:right;">${vehicleName}</td>
          </tr>
          <tr>
            <td style="padding:4px 0;color:#6B7280;">Pickup</td>
            <td style="padding:4px 0;text-align:right;">${pickupDate}</td>
          </tr>
          <tr>
            <td style="padding:4px 0;color:#6B7280;">Drop-off</td>
            <td style="padding:4px 0;text-align:right;">${dropoffDate}</td>
          </tr>
          <tr>
            <td style="padding:8px 0 0;color:#6B7280;border-top:1px solid #E5E7EB;">Total</td>
            <td style="padding:8px 0 0;font-weight:700;color:#0F766E;text-align:right;border-top:1px solid #E5E7EB;font-size:16px;">
              ${new Intl.NumberFormat("en-RW", { style: "currency", currency: "RWF" }).format(totalPrice)}
            </td>
          </tr>
        </table>
      </div>
      <div style="text-align:center;margin:24px 0;">
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/trips"
           style="display:inline-block;background:#0F766E;color:#fff;text-decoration:none;
                  padding:12px 32px;border-radius:12px;font-size:14px;font-weight:600;">
          View My Trip
        </a>
      </div>
    `),
  };
}

export function paymentReceiptEmail(
  name: string,
  bookingCode: string,
  amount: number,
  paymentMethod: string
): { subject: string; html: string } {
  return {
    subject: `Payment Receipt - ${bookingCode}`,
    html: baseTemplate(`
      <h2 style="margin:0 0 8px;font-size:20px;font-weight:700;color:#111827;">
        Payment Received
      </h2>
      <p style="margin:0 0 16px;font-size:14px;color:#6B7280;line-height:1.6;">
        Hi ${name}, your payment has been processed successfully.
      </p>
      <div style="background:#F0FDF4;border-radius:12px;padding:20px;margin:16px 0;text-align:center;">
        <p style="margin:0;font-size:13px;color:#6B7280;">Amount Paid</p>
        <p style="margin:4px 0 0;font-size:28px;font-weight:700;color:#0F766E;">
          ${new Intl.NumberFormat("en-RW", { style: "currency", currency: "RWF" }).format(amount)}
        </p>
        <p style="margin:8px 0 0;font-size:12px;color:#9CA3AF;">
          ${paymentMethod.toUpperCase()} &bull; Booking ${bookingCode}
        </p>
      </div>
    `),
  };
}
