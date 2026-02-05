# Learn App Backend

A Node.js + Express backend API for the **Learn App** platform. This server provides authentication, user management, training management, and image upload functionality using MongoDB and Cloudinary.

---

## 🚀 Features

- JWT authentication (login, register, logout)
- Role-based user system (trainers & students)
- CRUD operations for users and trainings
- MongoDB database integration
- Image upload with Cloudinary
- Token blacklist for logout security
- Modular architecture (routes → services → repositories)

---

## 🛠 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** (official MongoDB driver)
- **JWT (jsonwebtoken)** for authentication
- **Cloudinary + Multer** for image uploads
- **dotenv** for environment configuration
- **CORS** support

---

## 📁 Project Structure

```
learn-app-backend/
│
├── db/                  # Database connection
├── handlers/            # File upload handlers
├── middlewares/         # Auth & token blacklist
├── repositories/        # Data access layer
├── routes/              # Express routes
├── services/            # Business logic layer
├── index.js             # App entry point
└── .env                 # Environment variables
```

---

## ⚙️ Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd learn-app-backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Create a `.env` file** in the root directory:

```env
API_PORT=3080
MONGO_URI=your_mongodb_connection_string
TOKEN_KEY=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. **Run the server**

```bash
npm start
```

The server will run on:

```
http://localhost:3080
```

---

## 🔐 Authentication

Authentication is handled using JWT tokens.

Protected routes:

- `/api/users`
- `/api/trainers`
- `/api/students`
- `/api/trainings`

Include the token in request headers:

```
Authorization: Bearer <token>
```

---

## 📡 API Endpoints

### Auth

| Method | Endpoint         | Description   |
| ------ | ---------------- | ------------- |
| POST   | `/auth/login`    | Login user    |
| POST   | `/auth/register` | Register user |
| POST   | `/auth/logout`   | Revoke token  |

### Users

| Method | Endpoint               | Description          |
| ------ | ---------------------- | -------------------- |
| GET    | `/api/users`           | Get all users        |
| GET    | `/api/users/:userName` | Get user by username |
| PUT    | `/api/users/:ID`       | Update user          |
| DELETE | `/api/users/:ID`       | Delete user          |

### Trainings

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| GET    | `/api/trainings`     | Get all trainings |
| POST   | `/api/trainings`     | Create training   |
| GET    | `/api/trainings/:id` | Get training      |
| DELETE | `/api/trainings/:id` | Delete training   |

### Image Upload

| Method | Endpoint      | Description                |
| ------ | ------------- | -------------------------- |
| POST   | `/api/upload` | Upload image to Cloudinary |

Request must include `multipart/form-data` with field name:

```
file
```

Response:

```json
{
  "message": "Uploaded successfully",
  "url": "cloudinary_image_url"
}
```

---

## 🧠 Architecture Overview

The project follows a layered architecture:

- **Routes** → Handle HTTP requests
- **Services** → Business logic
- **Repositories** → Database access

This separation improves scalability and maintainability.

---

## 🧪 Error Handling

The API returns:

- `400` – Bad request
- `401` – Unauthorized / invalid token
- `404` – Resource not found
- `500` – Internal server error

---

## 🔮 Future Improvements

- Password hashing (bcrypt)
- Role-based authorization middleware
- Request validation
- Logging system
- Unit & integration tests
- Docker support

---

## 📄 License

This project is for educational and portfolio purposes.

---

## 👨‍💻 Author

Stepan Mateiko
Developed as part of the Learn App project.
