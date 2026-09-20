import { sendContactEmails, ContactEmailData } from '../server/emailService';

export default async function handler(req: any, res: any) {
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
    const contactData: ContactEmailData = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    if (!contactData || !contactData.email || !contactData.name) {
      return res.status(400).json({ error: 'Missing required fields: email and name are required.' });
    }

    const result = await sendContactEmails(contactData);
    return res.status(200).json(result);
  } catch (err: any) {
    console.error('Error handling /api/contact:', err);
    return res.status(500).json({ error: err?.message || 'Internal Server Error' });
  }
}
