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

## ✨ Key Features

### 🔐 Authentication & Authorization
- **Multi-Role Support**: Tailored experiences and permissions for **Students**, **Tutors**, and **Admins**.
- **Secure Sessions**: Powered by `Better Auth` for industry-standard session management.
- **Social Integration**: One-click login with Google OAuth.
- **Email Verification**: Automated verification flow via SMTP (Nodemailer).

### 👨‍🏫 Tutor Management
- **Professional Profiles**: Tutors can showcase their expertise, bio, and pricing.
- **Slot-Based Availability**: Manage weekly schedules with flexible time slots.
- **Smart Discovery**: Students can filter tutors by price range, average rating, and subject category.

### 📅 Booking Lifecycle
- **Instant Scheduling**: Students can book available tutors directly.
- **Real-Time Tracking**: Monitor booking statuses from `UPCOMING` to `COMPLETED` or `CANCELLED`.
- **Integrated History**: Clear overview of all past and current learning sessions.

### ⭐ Quality Assurance
- **Tutor Reviews**: Transparent student feedback system with ratings and comments.
- **Trust Metrics**: Aggregated ratings displayed on profiles to ensure platform quality.

### 🛡️ Administrative Control
- **User Moderation**: Admins can oversee all users and ban/unban profiles to maintain safety.
- **Global Monitoring**: High-level visibility into all platform-wide bookings and activities.
- **Category Management**: Centralized management of subject categories and learning areas.

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
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123"
  }
  ```
- `POST /sign-in/email`: Login with email
  ```json
  {
    "email": "john@example.com",
    "password": "securePassword123"
  }
  ```
- `POST /sign-out`: Logout current session
- `GET /get-session`: Get current user session
- `GET /callback/google`: Google OAuth callback

### 👨‍🏫 Tutor Management (`/api/tutors`)
| Method | Endpoint | Auth | Description | Sample Input |
| :--- | :--- | :--- | :--- | :--- |
| GET | `/` | Public | List tutors | - |
| GET | `/:id` | Public | Tutor details | - |
| GET | `/` | Tutor | Dashboard | - |
| GET | `/availability` | Tutor | Get availability | - |
| POST | `/profile` | Tutor | Create profile | See below |
| PUT | `/profile` | Tutor | Update profile | See below |
| PUT | `/availability` | Tutor | Set availability | See below |

#### Tutor Profile (`POST/PUT /profile`)
```json
{
  "bio": "Expert math tutor with 5 years of experience in Calculus and Algebra.",
  "pricePerHr": 45,
  "categoryIds": ["category-uuid-1", "category-uuid-2"]
}
```

#### Availability (`PUT /availability`)
```json
[
  { "day": "Monday", "startTime": "09:00", "endTime": "12:00" },
  { "day": "Wednesday", "startTime": "14:00", "endTime": "17:00" }
]
```

### 📅 Bookings (`/api/bookings`)
| Method | Endpoint | Auth | Description | Sample Input |
| :--- | :--- | :--- | :--- | :--- |
| GET | `/` | Student | My bookings | - |
| GET | `/:id` | Student | Booking details | - |
| POST | `/` | Student | Create booking | `{"tutorId": "tutor-uuid"}` |
| PUT | `/profiles` | Student | Update profile | Same as Tutor Profile |

### ⭐ Reviews (`/api/reviews`)
#### POST `/` (Student)
```json
{
  "tutorId": "tutor-profile-uuid",
  "rating": 5,
  "comment": "Excellent teaching style, very patient!"
}
```

### 🛡️ Admin (`/api/admin`)
| Method | Endpoint | Auth | Description | Sample Input |
| :--- | :--- | :--- | :--- | :--- |
| GET | `/users` | Admin | List users | - |
| GET | `/bookings` | Admin | Monitor bookings | - |
| PATCH | `/users/:id` | Admin | Update status | `{"banned": true}` |

### 📚 Categories (`/categories`)
| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| GET | `/` | Admin | List all categories |

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

## Server Live:
https://skillbridge-server-liart.vercel.app/
