import { sendBookingEmails, BookingEmailData } from '../server/emailService';
import { addBookingToStore } from './ceo-feed';

export default async function handler(req: any, res: any) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const bookingData: BookingEmailData = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    if (!bookingData || !bookingData.email || !bookingData.firstName) {
      return res.status(400).json({ error: 'Missing required fields: email and firstName are required.' });
    }

    // Save formatted booking for Nearsite CEO
    addBookingToStore({
      id: `book-${Date.now().toString(36)}`,
      name: `${bookingData.firstName} ${bookingData.lastName || ''}`.trim(),
      business: bookingData.bizName || 'Local Business',
      email: bookingData.email,
      date: bookingData.date || new Date().toISOString().slice(0, 10),
      time: bookingData.timeSlot || '10:00 AM',
      topic: `Discovery call — ${bookingData.selectedFeatures?.join(', ') || 'Custom Website'}`,
      status: 'requested',
      createdAt: bookingData.createdAt || new Date().toISOString(),
    });

    const result = await sendBookingEmails(bookingData);

    return res.status(200).json(result);
  } catch (err: any) {
    console.error('Error handling /api/send-booking-confirmation:', err);
    return res.status(500).json({ error: err?.message || 'Internal Server Error' });
  }
}
