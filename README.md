# JetPulse Healthcare 🏥✨
> **Intelligent Healthcare Companion & Connected Family Health Ecosystem**

JetPulse is a modern, full-stack healthcare platform designed to simplify care coordination, bridge the gap for families managing elderly or remote healthcare needs, and empower patients with AI-powered care navigation and certified companion booking.

---

## 🌟 Key Highlights & Features

- 🤖 **AI Care Navigator**: Smart triage, instant symptom understanding, and automated specialist recommendations.
- 🤝 **Verified Companion Booking**: Dedicated medical and non-medical companions for clinical visits, elderly assistance, and post-surgery care.
- 👨‍👩‍👧‍👦 **Family Health Ecosystem**: Centralized dashboard for real-time visit tracking, vital signs monitoring, and seamless family updates.
- ⚡ **Real-Time Care Journey**: Step-by-step visibility from companion dispatch to consultation, report compilation, and prescription delivery.
- 🛡️ **Enterprise Backend**: Built on Django REST Framework with JWT authentication, RBAC, background task queues with Celery & Redis, and Dockerized infrastructure.
- 🎨 **Modern Frontend**: Crafted with React 18, Vite, and Lucide icons featuring high-performance glassmorphic UI.

---

## 🏗️ Architecture & Tech Stack

### **Frontend**
- **Framework**: React 18, Vite
- **Icons & Visuals**: Lucide React
- **Design System**: Vanilla Modern CSS (Responsive, Glassmorphism, Micro-animations)

### **Backend**
- **Framework**: Django 4.2+ & Django REST Framework
- **Authentication**: SimpleJWT (Access & Refresh tokens)
- **Database**: PostgreSQL (Production/Docker) with automatic SQLite fallback for local development
- **Task Queue & Caching**: Celery + Redis
- **API Documentation**: OpenAPI 3 / DRF Spectacular (Swagger & Redoc)
- **Testing**: Pytest, Pytest-Django

---

## 📁 Repository Structure

```
halwa/
├── src/                          # React Frontend Source
│   ├── components/               # Modular UI Components
│   │   ├── CareNavigatorUI.jsx   # Interactive AI Navigator
│   │   ├── CompanionBookingModal.jsx # Booking flow
│   │   ├── SaaSAppDashboard.jsx  # Health metrics & analytics
│   │   ├── FamilyHealthEcosystem.jsx # Family coordination
│   │   ├── RealJourneys.jsx      # Patient stories & testimonials
│   │   └── ...
│   ├── App.jsx                   # Main React Entry Component
│   ├── main.jsx                  # React DOM Root
│   └── index.css                 # Global CSS & Design Tokens
├── public/                       # Static Assets & Scenario Media
├── backend/                      # Django REST API
│   ├── apps/                     # Modular Django Apps
│   │   ├── accounts/             # Authentication & User Profiles
│   │   ├── appointments/         # Doctor Consultations
│   │   ├── bookings/             # Companion Bookings & Dispatch
│   │   ├── companions/           # Companion Profiles & Verification
│   │   ├── families/             # Family Circles & Member Management
│   │   ├── health_records/       # Medical Records & Document Vault
│   │   ├── journeys/             # Real-Time Journey Milestones
│   │   ├── navigator/            # AI Triage & Routing Engine
│   │   ├── notifications/        # Multi-Channel Alerts & Celery Tasks
│   │   ├── payments/             # Payments & Billing Integration
│   │   ├── providers/            # Hospitals & Specialist Directory
│   │   ├── reviews/              # Ratings & Patient Feedback
│   │   └── support/              # Ticketing & Patient Assistance
│   ├── config/                   # Django Settings, ASGI, WSGI, Celery
│   ├── Dockerfile                # Backend Container definition
│   ├── docker-compose.yml        # Multi-container orchestration (API + DB + Redis + Celery)
│   ├── requirements.txt          # Python dependencies
│   └── manage.py
├── package.json                  # Frontend dependencies
├── vite.config.js                # Vite build configuration
└── .gitignore                    # Comprehensive secrets & build ignores
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18.0 or higher
- **Python**: 3.10 or higher
- *(Optional)* **Docker & Docker Compose**

---

### 1. Frontend Setup

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```
> The frontend will be available at **`http://localhost:5173`** (or configured Vite port).

---

### 2. Backend Setup (Local Python)

```bash
# Navigate to the backend directory
cd backend

# Create and activate virtual environment
# Windows (PowerShell):
python -m venv venv
.\venv\Scripts\Activate.ps1

# Linux / macOS:
# python3 -m venv venv && source venv/bin/activate

# Install requirements
pip install -r requirements.txt

# Copy environment template
cp .env.example .env

# Apply migrations
python manage.py migrate

# (Optional) Seed demo data for testing
python manage.py seed_demo_data

# Start the Django development server
python manage.py runserver
```
> Backend API will be available at **`http://localhost:8000`**.

---

### 3. Docker Compose Setup (Full Stack Services)

To spin up Postgres, Redis, Celery workers, and Django in containers:

```bash
cd backend
docker-compose up -d --build
```

---

## 🧪 Running Tests & Quality Checks

```bash
cd backend

# Run backend unit & integration tests
pytest

# Code linting & formatting checks
ruff check .
black --check .
```

---

## 📄 License & Attribution

Distributed under the MIT License. Developed with ❤️ for better, accessible healthcare coordination.
