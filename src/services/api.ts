/**
 * Service to connect bookings, contact forms, and lead captures
 * to an external app, CRM, or webhook endpoint (e.g. on Vercel, Supabase, Zapier, Make, or custom API).
 */

export interface BookingPayload {
  selectedFeatures?: string[];
  date?: string;
  timeSlot?: string;
  firstName: string;
  lastName?: string;
  email: string;
  bizName: string;
  bizType?: string;
  budget?: string;
  notes?: string;
  createdAt: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  businessName?: string;
  existingWebsite?: string;
  serviceInterest?: string;
  timeline?: string;
  timeframe?: string;
  message: string;
  createdAt: string;
}

export interface NewsletterPayload {
  email: string;
  createdAt: string;
}

export const CEO_APP_URL = 'https://i-want-to-build-for-myself-only-which-is.rork.app';

const getEndpointUrl = (): string | null => {
  const url = import.meta.env.VITE_APP_API_URL || import.meta.env.VITE_APP_WEBHOOK_URL;
  return url && url.trim().length > 0 ? url.trim() : null;
};

/**
 * Sends booking details to trigger confirmation email from Nearsiteahmad@gmail.com,
 * syncs to the Nearsite CEO feed, and forwards to external app/webhook if configured.
 */
export async function submitBookingToApp(booking: BookingPayload): Promise<{ success: boolean; error?: string }> {
  const endpoint = getEndpointUrl();

  // 1. Dispatch confirmation email & sync to CEO feed via server API
  try {
    fetch('/api/send-booking-confirmation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(booking),
    }).then(async (res) => {
      if (res.ok) {
        const json = await res.json();
        console.info('[Nearsite Email Service] Confirmation status:', json);
      }
    }).catch((err) => {
      console.warn('[Nearsite Email Service] Could not send confirmation:', err);
    });
  } catch (err) {
    console.warn('[Nearsite Email Service] Dispatch error:', err);
  }

  // 2. Format specifically for Nearsite CEO App structure
  const ceoBookingRecord = {
    id: `book-${Date.now().toString(36)}`,
    name: `${booking.firstName} ${booking.lastName || ''}`.trim(),
    business: booking.bizName || 'Local Business',
    email: booking.email,
    date: booking.date || new Date().toISOString().slice(0, 10),
    time: booking.timeSlot || '10:00 AM',
    topic: `Discovery call — ${booking.selectedFeatures?.join(', ') || 'Custom Website'}`,
    status: 'requested',
    createdAt: booking.createdAt || new Date().toISOString(),
  };

  // Sync to CEO feed endpoint
  try {
    fetch('/api/ceo-feed', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'booking', data: ceoBookingRecord }),
    }).catch(() => {});
  } catch {}

  // 3. Forward to user's external app / webhook
  const payload = {
    eventType: 'booking_created',
    ceoAppUrl: CEO_APP_URL,
    timestamp: new Date().toISOString(),
    ceoBookingRecord,
    data: booking,
  };

  if (!endpoint) {
    console.info(`[Nearsite CEO Sync] Booking linked for CEO Dashboard (${CEO_APP_URL}/bookings):`, payload);
    return { success: true };
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.warn(`[Nearsite App Integration] Server responded with status ${response.status}`);
      return { success: false, error: `HTTP ${response.status}` };
    }

    return { success: true };
  } catch (err: any) {
    console.error('[Nearsite App Integration] Failed to dispatch booking to app:', err);
    return { success: false, error: err?.message || 'Network error' };
  }
}

/**
 * Sends contact inquiry to trigger notification email from Nearsiteahmad@gmail.com,
 * syncs to the Nearsite CEO feed, and forwards to external app/webhook if configured.
 */
export async function submitContactToApp(contact: ContactPayload): Promise<{ success: boolean; error?: string }> {
  const endpoint = getEndpointUrl();

  // 1. Dispatch contact notification via server API
  try {
    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    }).catch((err) => {
      console.warn('[Nearsite Email Service] Could not send contact email:', err);
    });
  } catch (err) {
    console.warn('[Nearsite Email Service] Dispatch error:', err);
  }

  // 2. Format specifically for Nearsite CEO App structure
  const now = new Date().toISOString();
  const ceoLeadRecord = {
    id: `lead-${Date.now().toString(36)}`,
    name: contact.name,
    business: contact.businessName || 'Website Inquiry',
    email: contact.email,
    interestedIn: contact.serviceInterest || 'growth',
    source: 'Website form',
    message: contact.message,
    status: 'new',
    notes: [],
    createdAt: now,
    updatedAt: now,
  };

  // Sync to CEO feed endpoint
  try {
    fetch('/api/ceo-feed', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'lead', data: ceoLeadRecord }),
    }).catch(() => {});
  } catch {}

  // 3. Forward to external app if configured
  const payload = {
    eventType: 'contact_submitted',
    ceoAppUrl: CEO_APP_URL,
    timestamp: now,
    ceoLeadRecord,
    data: contact,
  };

  if (!endpoint) {
    console.info(`[Nearsite CEO Sync] Contact lead recorded for CEO Dashboard (${CEO_APP_URL}/leads):`, payload);
    return { success: true };
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    return { success: response.ok };
  } catch (err: any) {
    console.error('[Nearsite App Integration] Failed to dispatch contact inquiry:', err);
    return { success: false, error: err?.message };
  }
}

/**
 * Sends newsletter subscription to the external app / webhook
 */
export async function submitNewsletterToApp(newsletter: NewsletterPayload): Promise<{ success: boolean }> {
  const endpoint = getEndpointUrl();

  const payload = {
    eventType: 'newsletter_subscription',
    timestamp: new Date().toISOString(),
    data: newsletter,
  };

  if (!endpoint) {
    console.info('[Nearsite App Integration] Newsletter subscription captured:', payload);
    return { success: true };
  }

  try {
    await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    return { success: true };
  } catch (err) {
    console.error('[Nearsite App Integration] Failed to forward newsletter subscription:', err);
    return { success: false };
  }
}
