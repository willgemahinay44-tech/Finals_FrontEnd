# SchoolDash — Kolehiyo ng Pantukan (KNP) Admin Dashboard

React + Vite frontend for the **SchoolDash** admin dashboard, built for **Kolehiyo ng Pantukan**, Davao de Oro. It provides login, dashboard statistics and charts, program/subject offerings, and a weather widget.

---

## Features

- **Authentication** — Admin login with Laravel backend or demo mode when backend is unavailable
- **Dashboard** — Stat cards (students, courses, school days, attendance), enrollment trends, course distribution, and attendance patterns charts
- **Program Offerings** — Browse and filter academic programs
- **Subject Offerings** — Browse and filter subjects with search and filters
- **Weather Widget** — Current weather via OpenWeather API

---

## Prerequisites

- **Node.js** 18+ and npm
- **Laravel backend** running (optional; app works in demo mode without it)
- **OpenWeather API key** (optional; for weather widget)

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/willgemahinay44-tech/Finals_FrontEnd.git
cd Finals_FrontEnd
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment variables

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

Edit `.env`:

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API base URL (e.g. `http://127.0.0.1:8000/api`) |
| `VITE_WEATHER_API_KEY` | OpenWeather API key for the weather widget |

If you omit these, the app uses defaults: API at `http://127.0.0.1:8000/api` and weather will fail until a key is set.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Build for production

```bash
npm run build
npm run preview   # optional: preview production build locally
```

Production assets are in `dist/`.

---

## Demo mode

If the backend is not running or login fails, you can sign in with the **demo account**:

- **Email:** `admin@school.edu`
- **Password:** `password123`

Charts and stats that depend on the API will show “Failed to load…” until the backend is available.

---

## Project structure

```
src/
├── components/
│   ├── auth/          # Login
│   ├── common/        # Navbar, loading, error boundary
│   ├── dashboard/     # Dashboard, stat cards, charts
│   ├── weather/       # Weather widget
│   ├── ProgramPage.jsx, ProgramList.jsx, ProgramCard.jsx, ProgramDetails.jsx
│   ├── SubjectPage.jsx, SubjectList.jsx, SubjectCard.jsx, SubjectDetails.jsx, FilterBar.jsx
├── data/              # Mock data for programs & subjects
├── services/
│   └── api.js         # Axios instance, auth, dashboard, student, course API
├── App.jsx
└── main.jsx
public/
├── knp-emblem.png     # KNP logo (navbar & login)
└── knp-banner.png     # Optional login background
```

---

## Documentation

- **[API Documentation](docs/API.md)** — Endpoints and expected responses used by the frontend
- **[Technologies](docs/TECHNOLOGIES.md)** — List of technologies and versions
- **[Deliverables guide](docs/DELIVERABLES.md)** — Screenshots checklist and video demo outline

---

## Backend

This frontend is designed to work with the Laravel backend (**Finals_BackEnd**). Ensure the backend is running and CORS is configured for your frontend origin. For full API behavior, run the backend and use real login; demo mode does not send the demo token to the backend.

---

## License

For academic use — IT15/L Integrative Programming, Kolehiyo ng Pantukan.
