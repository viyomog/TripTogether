# ✈️ TripTogether — Forge Your Global Journey

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Node](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

> **Experience the future of travel planning.** TripTogether combines high-end 3D glassmorphism with robust full-stack authentication to provide a premium boarding experience for modern explorers.

---

## ✨ Interface Highlights

TripTogether isn't just an app; it's a visual odyssey.

*   🌌 **3D Mesh Backgrounds**: Immersive, multi-colored gradients with dynamic motion.
*   💎 **Glassmorphism Redefined**: Borderless, semi-transparent panels powered by `backdrop-filter`.
*   🎭 **Fluid Animations**: Smooth state transitions and micro-interactions powered by `Framer Motion`.
*   📱 **Responsive Canvas**: A perfect experience from your desktop workstation to your mobile device.

---

## 🛠️ Technology Stack

### Frontend Architecture
- **Vite + React**: For lightning-fast HMR and optimized builds.
- **Axios**: Robust API communication with the backend.
- **React-Hot-Toast**: Elegant, non-intrusive notification system.
- **Lucide-React**: Minimalist, high-performance icon system.
- **Google OAuth 2.0**: Seamless social authentication integration.

### Backend Infrastructure
- **Node.js & Express**: Scalable event-driven architecture.
- **MongoDB + Mongoose**: Flexible, schema-based data modeling.
- **JWT & Cookies**: Secure, stateless authentication with `httpOnly` cookie support.
- **Bcrypt**: Industrial-grade password hashing.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas or Local Instance
- Google Developer Console Client ID

### Installation

1. **Clone the Voyage**
   ```bash
   git clone https://github.com/viyomog/TripTogether.git
   cd TripTogether
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   # Create a .env file and add:
   # VITE_GOOGLE_CLIENT_ID=your_id_here
   npm run dev
   ```

3. **Backend Setup**
   ```bash
   cd ../backend
   npm install
   # Create a .env file and add:
   # MONGO_URI=your_mongodb_uri
   # JWT_SECRET_KEY=your_secret_key
   npm run dev
   ```

---

## 📁 Project Structure

```text
TripTogether/
├── frontend/           # React + Vite Application
│   ├── src/
│   │   ├── components/ # Shared UI & Layouts (3D Magic)
│   │   ├── pages/      # Authenticated & Public routes
│   │   └── styles/     # Centralized Auth.css design system
│   └── public/         # Icons & Branding assets
├── backend/            # Express.js Server
│   ├── routes/         # Auth & Data API endpoints
│   ├── models/         # User & Trip Schemas
│   └── index.js        # Main Entry Point
└── README.md
```

---

## 🤝 Contributing
Ready to build the future of travel? Fork the repo, push your feature branch, and let's map the world together.

---

<p align="center">
  MADE BY Explorer <br>
  <b>FOR THE WORLD</b>
</p>
