# 🛡️ User Authentication API

A secure user authentication system using Node.js, Express, MongoDB, JWT, and `express-validator`.

---

## 📌 Features

- ✅ User Registration
- 🔐 User Login (JWT via HttpOnly cookies)
- 🚪 User Logout
- 🛡️ Route protection with middleware
- 🗄️ MongoDB Atlas integration
- ✅ Input validation using express-validator

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB Atlas**
- **Mongoose**
- **bcrypt**
- **express-validator**
- **jsonwebtoken**
- **cookie-parser**
- **dotenv**

---

## 📂 Project Structure

```
/project-root
│
├── config/
│   └── mongo.connect.js
│
├── controllers/
│   ├── user.login.js
│   ├── user.logout.js
│   └── user.register.js
│
├── middlewares/
│   └── authentication.js
│
├── models/
│   └── user.schema.js
│
├── routes/
│   └── user.routes.js
│
├── .env
├── app.js
└── package.json
```

---

## 🔐 Environment Variables (`.env`)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=dev||prod
```

---

## 📬 Postman Collection

Use this collection to test all the routes easily:

🔗 [Click here to open Postman Collection](https://www.postman.com/devx33-7676/workspace/user-auth-app/collection/32335787-92b1ea9f-2daf-482f-87eb-bcf2a09657f4?action=share&creator=32335787)

---

## 🌐 Live Deployment

🟢 Live URL: _Coming Soon_  
_(Deploy on Render, Cyclic, Vercel, or Railway for public access)_

---

## 🚀 API Endpoints

### 📍 Base URL

```
http://localhost:5000/api/v1
```

---

### 📝 Register

- **POST** `/register`
- **Body:**

```json
{
  "name": "Dev",
  "email": "dev@maildrop@gmail.com",
  "password": "strongpassword"
}
```

- **Response:**

```json
{
  "success": true,
  "message": "User registered successfully"
}
```

---

### 🔑 Login

- **POST** `/login`
- **Body:**

```json
{
  "email": "dev@maildrop@gmail.com",
  "password": "strongpassword"
}
```

- **Response:**

```json
{
  "success": true,
  "message": "Login successful"
}
```

- JWT is sent in `HttpOnly` cookie.

---

### 🚪 Logout

- **POST** `/logout`
- **Headers:** (if not using cookie)

```http
Authorization: Bearer <your_token>
```

- **Response:**

```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

## 📊 Dashboard (Protected)

- **GET** `/dashboard`

### 🔐 Headers:

```http
Authorization: Bearer <your_token>
```

```json
{
  "message": "Welcome to the protected dashboard!"
}
```

## 🧪 Postman Usage Instructions

1. Import the collection from the link above.
2. Use the `/login` route to authenticate.
3. Automatically store token (cookie or header).
4. Use `/logout` or any protected routes with token.

---

## 🔒 Protecting Routes

Use `authenticateUser` middleware to secure any route:

```js
router.get("/dashboard", authenticateUser, (req, res) => {
  res.send("Welcome to the protected dashboard!");
});
```

---

## 📄 Scripts

```bash
npm install     # Install all dependencies
npm run dev     # Start server with nodemon
npm start       # Start production server
```

---

## 🤝 Contribution

Feel free to fork and contribute. PRs are welcome!

---

## 📄 License

Licensed under the [MIT License](https://opensource.org/licenses/MIT)
