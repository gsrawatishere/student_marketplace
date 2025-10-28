# 🏫 CampusKart

**CampusKart** is a **campus-based student marketplace** that connects students within their college to **buy, sell, and offer services** safely and privately.  
Built with modern technologies, it ensures **campus privacy, real-time communication**, and a smooth trading experience.

---

## 🚀 Tech Stack

### 🖥️ Frontend
- **React.js**
- **Tailwind CSS**

### ⚙️ Backend
- **Node.js**
- **Express.js**
- **Prisma ORM**
- **PostgreSQL (Neon DB)**
- **JWT Authentication**
- **Bcrypt for Password Hashing**
- **Socket.io (Real-Time Chat)**
- **Cloudinary (Media Management)**
- **Nodemailer (OTP & Email Services)**

---

## 🌟 Key Features

- 🎓 **Campus Privacy:** Access restricted to verified college email addresses.  
- 🏫 **Campus-Scoped Marketplace:** Students can browse and trade only within their campus.  
- 💬 **Real-Time Chat:** Secure one-to-one messaging between buyers and sellers.  
- ❤️ **Wishlist:** Save items or services for later.  
- 👤 **Profile Management:** Update bio, listings, and personal details easily.  
- 🔑 **Login via College Email:** Ensures campus-specific user access.  
- 🔐 **OTP Verification & Forgot Password:** Secure authentication flow.  
- 🧑‍💼 **Admin Panel:** Manage users, listings, and verify campus activity.  
- ⚡ **Optimized APIs:** Implemented with pagination, Prisma, and efficient query handling.  

---

## 🛠️ Setup Instructions

### 📦 Clone the Repository
```bash
git clone https://github.com/your-username/campuskart.git
cd campuskart

cd frontend
npm install
npm run dev

cd backend
npm install
npm run dev

# DATABASE
DATABASE_URL="postgresql://<user>:<password>@<host>/<database>?sslmode=require"

# SERVER
PORT=4001

# TOKENS
ACCESS_TOKEN_KEY=your_access_secret
REFRESH_TOKEN_KEY=your_refresh_secret

# CLOUDINARY
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# SMTP (For OTP & Forgot Password)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_app_password

# ADMIN (Default Credentials)
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin_password

# FRONTEND
FRONTEND_URL=https://your-frontend-domain.com

```
