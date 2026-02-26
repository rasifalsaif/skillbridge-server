# SkillBridge Server

SkillBridge is a modern platform designed to connect students with professional tutors. This repository contains the backend server built with a robust and scalable architecture.

## 🚀 Tech Stack

- **Core**: Node.js, Express.js (v5)
- **Language**: TypeScript
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Authentication**: Better Auth (with Google OAuth support)
- **Email Service**: Nodemailer (via SMTP)
- **Deployment**: Vercel ready

---

## 🛠 Prerequisites

Ensure you have the following installed:
- Node.js (v20 or higher)
- npm or yarn
- PostgreSQL instance (or Neon DB)

---

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rasifalsaif/skillbridge-server.git
   cd skillbridge-server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory and add the following variables:
   ```env
   DATABASE_URL="your_postgresql_url"
   BETTER_AUTH_SECRET="your_secret"
   BETTER_AUTH_URL="http://localhost:5000"
   APP_URL="http://localhost:3000"
   
   GOOGLE_CLIENT_ID="your_google_id"
   GOOGLE_CLIENT_SECRET="your_google_secret"
   
   APP_USER="your_email@gmail.com"
   APP_PASS="your_app_password"
   ```

4. **Prisma Setup:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

---

## 📡 API Endpoints

### 🔐 Authentication (`/api/auth`)
Handled by **Better Auth**. Standard endpoints include:
- `POST /sign-up/email`: Register a new user
- `POST /sign-in/email`: Login with email
- `POST /sign-out`: Logout current session
- `GET /get-session`: Get current user session
- `GET /callback/google`: Google OAuth callback

### 👨‍🏫 Tutor Management (`/api/tutors`)
| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| GET | `/` | Public | List all tutors with filters |
| GET | `/:id` | Public | Get detailed tutor profile |
| GET | `/` | Tutor | Get tutor dashboard data |
| GET | `/availability` | Tutor | Get current availability |
| POST | `/profile` | Tutor | Create tutor profile |
| PUT | `/profile` | Tutor | Update tutor profile |
| PUT | `/availability` | Tutor | Update availability slots |

### 📚 Categories (`/categories`)
| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| GET | `/` | Admin | List all available categories |

### 📅 Bookings (`/api/bookings`)
| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| GET | `/` | Student | Get your list of bookings |
| GET | `/:id` | Student | Get specific booking details |
| POST | `/` | Student | Create a new booking |
| PUT | `/profiles` | Student | Update profile as student/tutor |

### ⭐ Reviews (`/api/reviews`)
| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| POST | `/` | Student | Submit a review for a tutor |

### 🛡️ Admin (`/api/admin`)
| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| GET | `/users` | Admin | List all registered users |
| GET | `/bookings` | Admin | Monitor all platform bookings |
| PATCH | `/users/:id` | Admin | Ban/Unban or update user status |

---

## 📦 Build & Deployment

Build for production:
```bash
npm run build
```

The server is configured for **Vercel** serverless functions. Deploy using the Vercel CLI:
```bash
vercel --prod
```

---

## 📜 License
This project is licensed under the ISC License.
