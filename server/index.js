const express = require('express');
const http = require('http');
const path = require('path');
const { WebSocketServer } = require('ws');

// In-memory timer store
const timers = new Map();

const app = express();
app.use(express.json());
// Serve static overlays for OBS/vMix
app.use(express.static(path.join(__dirname, '..', 'public')));

// Get all timers
app.get('/api/timers', (req, res) => {
  res.json(Array.from(timers.values()));
});

// Create or update a timer
app.post('/api/timers', (req, res) => {
  const timer = req.body;
  if (!timer || !timer.id) {
    return res.status(400).json({ error: 'Timer id required' });
  }
  timers.set(timer.id, timer);
  broadcast({ type: 'upsert', timer });
  res.json({ status: 'ok' });
});

// Remove a timer
app.delete('/api/timers/:id', (req, res) => {
  const { id } = req.params;
  if (timers.delete(id)) {
    broadcast({ type: 'delete', id });
    res.json({ status: 'ok' });
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Broadcast helper
function broadcast(msg) {
  const data = JSON.stringify(msg);
  for (const client of wss.clients) {
    if (client.readyState === 1) {
      client.send(data);
    }
  }
}

wss.on('connection', (ws) => {
  ws.send(JSON.stringify({ type: 'init', timers: Array.from(timers.values()) }));
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`API server listening on ${PORT}`);
});
