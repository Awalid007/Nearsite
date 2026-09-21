// In-memory feed for recent bookings and leads
// This endpoint allows the Nearsite CEO app (https://i-want-to-build-for-myself-only-which-is.rork.app/)
// or external CRMs to read live bookings and leads.

interface FeedStore {
  bookings: any[];
  leads: any[];
}

const store: FeedStore = {
  bookings: [],
  leads: [],
};

export function addBookingToStore(booking: any) {
  store.bookings.unshift(booking);
  if (store.bookings.length > 50) store.bookings.pop();
}

export function addLeadToStore(lead: any) {
  store.leads.unshift(lead);
  if (store.leads.length > 50) store.leads.pop();
}

function sendJson(res: any, status: number, data: any) {
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    return res.status(status).json(data);
  }
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      if (body?.type === 'booking' && body?.data) {
        addBookingToStore(body.data);
      } else if (body?.type === 'lead' && body?.data) {
        addLeadToStore(body.data);
      }
      return sendJson(res, 200, { success: true, count: { bookings: store.bookings.length, leads: store.leads.length } });
    } catch (e: any) {
      return sendJson(res, 400, { error: e.message });
    }
  }

  // GET: Return recent leads and bookings formatted for Nearsite CEO
  return sendJson(res, 200, {
    ceoApp: 'https://i-want-to-build-for-myself-only-which-is.rork.app/',
    timestamp: new Date().toISOString(),
    bookings: store.bookings,
    leads: store.leads,
  });
}
