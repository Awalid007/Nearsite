import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

function emailApiPlugin(): Plugin {
  return {
    name: 'email-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/send-booking-confirmation' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: Buffer) => {
            body += chunk.toString();
          });
          req.on('end', async () => {
            try {
              const { sendBookingEmails } = await import('./server/emailService');
              const { addBookingToStore } = await import('./api/ceo-feed');
              const data = JSON.parse(body);
              addBookingToStore({
                id: `book-${Date.now().toString(36)}`,
                name: `${data.firstName} ${data.lastName || ''}`.trim(),
                business: data.bizName || 'Local Business',
                email: data.email,
                date: data.date || new Date().toISOString().slice(0, 10),
                time: data.timeSlot || '10:00 AM',
                topic: `Discovery call — ${data.selectedFeatures?.join(', ') || 'Custom Website'}`,
                status: 'requested',
                createdAt: data.createdAt || new Date().toISOString(),
              });
              const result = await sendBookingEmails(data);
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(JSON.stringify(result));
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err?.message || 'Server error' }));
            }
          });
          return;
        }

        if (req.url === '/api/contact' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: Buffer) => {
            body += chunk.toString();
          });
          req.on('end', async () => {
            try {
              const { sendContactEmails } = await import('./server/emailService');
              const { addLeadToStore } = await import('./api/ceo-feed');
              const data = JSON.parse(body);
              const now = new Date().toISOString();
              addLeadToStore({
                id: `lead-${Date.now().toString(36)}`,
                name: data.name,
                business: data.businessName || 'Website Inquiry',
                email: data.email,
                interestedIn: data.serviceInterest || 'growth',
                source: 'Website form',
                message: data.message,
                status: 'new',
                notes: [],
                createdAt: now,
                updatedAt: now,
              });
              const result = await sendContactEmails(data);
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(JSON.stringify(result));
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err?.message || 'Server error' }));
            }
          });
          return;
        }

        if (req.url && req.url.startsWith('/api/ceo-feed')) {
          try {
            const ceoFeedModule = await import('./api/ceo-feed');
            await ceoFeedModule.default(req, res);
          } catch (err: any) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err?.message || 'Server error' }));
          }
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), emailApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
