# ✈️ TripTogether — Forge Your Global Journey

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
</p>

> **Experience the future of travel planning.** TripTogether blends high-end glassmorphism UI with robust full-stack authentication to deliver a premium boarding experience for modern explorers.

---

## 🌟 At a Glance

| 🎨 Design | ⚡ Performance | 🔒 Security | 🌍 Community |
|:---:|:---:|:---:|:---:|
| Glassmorphic UI & 3D Mesh Backgrounds | Vite + React for blazing fast HMR | JWT + `httpOnly` Cookies + Bcrypt | Find & connect with travel mates |
| Fluid Framer Motion Animations | Optimized builds & lazy loading | Google OAuth 2.0 Integration | Real-time profile & trip sharing |
| Fully Responsive & Mobile-First | Axios API communication | Protected Routes & Auth Middleware | Interactive interest & style matching |

---

## ✨ Interface Highlights

TripTogether isn't just an app; it's a visual odyssey.

- 🌌 **Immersive Backgrounds** – Multi-colored gradient meshes with dynamic motion
- 💎 **Glassmorphism Redefined** – Semi-transparent, backdrop-blurred panels with subtle borders
- 🎭 **Fluid Interactions** – Smooth page transitions, hover effects, and micro-animations via `Framer Motion`
- 📱 **Responsive Canvas** – Pixel-perfect experience from 4K desktops to mobile screens

---

## 🛠️ Technology Stack

### 🖥️ Frontend Architecture
| Tool | Purpose |
|:---|:---|
| `Vite + React` | Lightning-fast development & optimized production builds |
| `Tailwind CSS` | Utility-first styling with dark theme & custom design tokens |
| `Framer Motion` | Declarative animations & gesture-based interactions |
| `Axios` | Robust HTTP client with interceptors & error handling |
| `React Hot Toast` | Elegant, non-intrusive notification system |
| `Lucide React` | Minimalist, high-performance SVG icon library |
| `React Router v6` | Declarative routing with protected & animated transitions |

### 🖧 Backend Infrastructure
| Tool | Purpose |
|:---|:---|
| `Node.js + Express` | Scalable, event-driven REST API architecture |
| `MongoDB + Mongoose` | Flexible schema modeling with validation & population |
| `JWT + Cookies` | Secure, stateless authentication with `httpOnly` & `sameSite` flags |
| `Bcrypt` | Industrial-grade password hashing & salting |
| `CORS` | Cross-origin resource sharing with credential support |
| `Dotenv` | Secure environment variable management |

---

## 🚀 Getting Started

### 📋 Prerequisites
- `Node.js` (v18 or higher)
- `MongoDB` (Atlas cloud or local instance)
- `Google Developer Console` Client ID (for OAuth)

### 📦 Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/viyomog/TripTogether.git
   cd TripTogether
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```
   Create a `.env` file in the `frontend/` directory:
   ```env
   VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
   ```

3. **Backend Setup**
   ```bash
   cd ../backend
   npm install
   ```
   Create a `.env` file in the `backend/` directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET_KEY=your_super_secret_jwt_key
   PORT=5000
   ```

4. **Run the Application**
   Open two terminal windows:
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```
   🌐 Frontend: `http://localhost:5173`  
   🔌 Backend: `http://localhost:5000`

---

## 📁 Project Structure

```text
TripTogether/
├── frontend/                 # ⚛️ React + Vite SPA
│   ├── src/
│   │   ├── components/       # 🧩 Reusable UI & Layouts
│   │   ├── pages/            # 📄 Route components (Auth, Profile, Mates, etc.)
│   │   ├── context/          # 🌐 React Context providers
│   │   └── styles/           # 🎨 Global CSS & Auth design system
│   └── public/               # 🖼️ Static assets & branding
├── backend/                  # 🖧 Node.js + Express API
│   ├── routes/               # 🛣️ Auth & User profile endpoints
│   ├── models/               # 📦 Mongoose schemas & validation
│   ├── middlewares/          # 🔐 JWT auth & error handling
│   └── index.js              # 🚀 Server entry point & DB connection
└── README.md                 # 📖 You are here
```

---

## 🤝 Contributing

Ready to build the future of travel? We welcome contributions of all kinds!

1. 🍴 **Fork** the repository
2. 🌿 Create your feature branch: `git checkout -b feature/AmazingFeature`
3. 💾 Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. 📤 Push to the branch: `git push origin feature/AmazingFeature`
5. 🔀 Open a **Pull Request**

---

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

<p align="center">
  <sub>MADE WITH ❤️ BY <strong>Explorer</strong> • FOR THE WORLD 🌍</sub>
</p>