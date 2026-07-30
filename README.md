# Recon Dashboard
A responsive reconnaissance dashboard built with HTML, CSS, and Vanilla JavaScript for managing reconnaissance targets during security assessments.

This project was developed as part of a structured learning journey to understand professional frontend development, Git workflows, and software engineering best practices before moving to backend development.

The application allows users to create, edit, delete, search, filter, and organize reconnaissance targets while storing data locally using the browser's Local Storage.

## Project Goals
- Manage reconnaissance targets efficiently
- Organize reconnaissance data in a centralized dashboard
- Learn frontend development using HTML, CSS, and JavaScript
- Practice professional Git and GitHub workflows
- Prepare the project for backend integration using Node.js and SQLite
# Tech Stack

### Frontend:

- HTML
- CSS
- JavaScript

### Backend:

- Node.js
- Express.js

### Database:

- SQLite

## Features

### Target Management
- Add new reconnaissance targets
- Edit existing targets
- Delete targets
- Prevent duplicate entries
- Input validation

### Search & Filtering
- Search targets by domain
- Filter targets by status
- Dynamic result count

### Dashboard Insights
- Total targets
- Active targets
- Pending targets
- Completed targets
- Completion percentage
- Targets added today

### Activity Tracking
- Activity log for target actions
- Persistent activity history using Local Storage

### Data Management
- Automatic data persistence with Local Storage
- Export targets as JSON
- Clear all targets

### User Experience
- Responsive layout for desktop and mobile devices
- Accessible form controls
- Improved empty states
- Clean and consistent UI

## Roadmap

### Phase 1
- Dashboard UI
- Target CRUD

### Phase 2
- Subdomain Management
- Technology Tracking

### Phase 3
- Findings Tracking

### Phase 4
- Authentication
- Export Features

## Learning Objectives

This project helps me strengthen my understanding of:

- Software Engineering Principles
- Full-Stack Web Development
- JavaScript Fundamentals
- DOM Manipulation
- Responsive UI Design
- Git & GitHub Workflow
- Project Architecture
- Industry Development Practices

## API Endpoints

- GET /api/targets
- POST /api/targets
- PUT /api/targets/:id
- DELETE /api/targets/:id

Detailed API documentation is available in `backend/API.md`.

## Running the Backend

```bash
cd backend
npm install
npm start
```

## Environment Variables

Create a `.env` file inside the `backend` folder.

```env
PORT=3000
```
