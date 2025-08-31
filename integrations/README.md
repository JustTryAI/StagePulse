# Integrations

This directory contains example configurations for third-party tools.

- `companion-streamdeck.json` – sample profile for Bitfocus Companion or Elgato Stream Deck. Each button triggers StagePulse's HTTP API to start or delete a demo timer.
- `../public/obs-overlay.html` – lightweight browser source for OBS or vMix that displays the active timer via WebSockets.

Import the JSON profile into your control software and point OBS/vMix to `http://HOST:3001/obs-overlay.html` as a browser source.
