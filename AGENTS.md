# Codex CLI Agent Instructions

## Overview

These instructions are for using OpenAI Codex CLI to generate the full **StagePulse** application using the provided project specs and requirements. The agent will be responsible for building the project from scratch, implementing features as specified, and outputting each file as needed.

## Agent Configuration

This file will be used to guide the agent through generating the **entire project**. It will need to handle the **frontend**, **backend**, and **desktop components**. The agent should use **React** for the frontend (with Firebase integration), **Electron** for the desktop app, and **Firebase** for the backend (Firestore, Auth, Hosting).

## Key Features

The agent will be responsible for generating the following:

* **Multiple timers** (countdown, count-up, time-of-day) with scheduling and linking.
* **Real-time sync** across devices using **Firebase** (Firestore and Firestore listeners/WebSockets).
* **Role-based links** for controllers, viewers, and moderators (using URL + QR sharing).
* **Offline desktop support** via Electron (LAN hosting, with Firebase sync on reconnect).
* **Mobile support** using **PWA** for mobile web (Android/iOS).
* **Customizations** for themes, fonts, backgrounds, progress bars, and timer controls.

## Task Breakdown

### Step 1: **Initial Setup**

* Generate a folder structure with relevant directories for the project (`/src`, `/components`, `/services`, `/electron`, etc.).
* Initialize the React app using Create React App or Next.js, with TypeScript enabled.
* Set up **Firebase** integration for authentication, Firestore, and cloud functions (if required).
* Set up **Electron** for desktop functionality, ensuring it serves the app offline over LAN.
* Set up **PWA** support for the mobile version.

### Step 2: **Core Components**

* **Frontend**: Generate components such as `TimerDisplay`, `TimerControls`, `Viewer`, `Agenda`, `Operator`, `Messages`, etc.
* **Backend**: Integrate Firebase services (Firestore, Authentication, Functions). Ensure real-time updates between devices.
* **Electron**: Set up an Electron app with a main process and renderer to serve the React app.

### Step 3: **Advanced Features**

* Implement **role-based links** (Controller, Viewer, Moderator, Operator) with customizable settings like password protection and sync delay.
* Implement **real-time updates** using Firebase listeners for timer state changes.
* Implement **message system** for the Moderator to push messages to the Viewer.
* Implement **CSV import/export** for timer data.
* Set up **Offline Mode** for Electron, where the app can still run with local data sync when not connected to the internet.
* Add **customizable themes** (e.g., timer colors, background images, font size).

### Step 4: **API & Integrations**

* Set up HTTP API endpoints for timer control and message pushing.
* Implement **WebSocket** support for live timer state updates.
* Integrate with **Companion** and **Stream Deck**.
* Ensure **OBS**/vMix integration for timer outputs via browser sources.

### Step 5: **Finalizing the Build**

* Ensure all components are correctly connected, and Firebase sync is working across all platforms.
* Write basic **unit tests** for key features, like timer math and state syncing.
* Write basic **deployment steps** for Firebase Hosting and Electron packaging.

## Instructions for Codex CLI Agent

The agent should:

* Break down tasks into smaller files as described above.
* Follow project specifications exactly as outlined in the prompt. Each task should be addressed in a modular manner, building upon the last.
* Start with the **core setup** (folder structure, Firebase setup) before generating individual components.
* Include brief comments and documentation for each file generated.

For each part of the project:

1. Start by generating the configuration files (e.g., Firebase setup, Electron setup).
2. Generate the **frontend** components first (React and PWA), followed by **backend services** (Firebase functions and Firestore).
3. Generate the **Electron app** (bundling the web app and making it work offline).
4. Implement **real-time features** (sync, updates).
5. Finish by ensuring **role-based access** and **API integration**.

After each file is generated, output the code with the appropriate filename at the top of the code block.

## Deliverables

The Codex CLI agent should produce:

* A working React app (frontend) with Firebase integration and real-time updates.
* A fully functional Electron app that works offline and syncs to Firebase when reconnected.
* Role-based access control for the Controller, Viewer, Moderator, and Operator.
* Integration with Companion and OBS/vMix for live event streaming.
* Complete setup for PWA mobile support.

This document provides instructions for the **Codex CLI agent** to generate the complete project. Follow the steps above to build the app in stages.
