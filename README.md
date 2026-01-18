**Techrover Solutions**

The Training Hub Backend is the **core engine** of the system.
It handles all business logic, database operations, authentication, and API services required by the frontend.

This backend is responsible for:

* Storing and managing all data
* Authenticating users
* Validating requests
* Performing CRUD operations
* Serving APIs to the frontend

It is designed to be **secure, scalable, and maintainable**.

---

## 🧠 Introduction (In Simple Words)

The backend is the **brain** of the Training Hub.

Whenever the frontend needs:

* A list of trainees
* Batch details
* Task data
* Payment records
* Login verification

…it sends a request to the backend.

The backend:

1. Receives the request
2. Validates it
3. Talks to the database
4. Processes the data
5. Sends the response back

This ensures:

* Data is safe
* Rules are enforced
* The system works correctly

---

## 🛠 Tech Stack

* **Node.js** – Runtime environment
* **Express.js** – Web framework
* **PostgreSQL** – Relational Database
* **JWT** – Authentication
* **bcrypt** – Password encryption
* **dotenv** – Environment configuration
* **CORS** – Cross-origin support

---

## 📁 Project Structure

```
src/
│
├── controllers/     # Business logic for each module
├── routes/          # API routes
├── models/          # Database queries / ORM models
├── middlewares/     # Auth, validation, error handling
├── config/          # DB and app configuration
├── utils/           # Helper functions
├── app.js           # Express app setup
└── server.js        # Server entry point
```

This structure keeps the backend:

* Modular
* Clean
* Easy to debug
* Ready for scaling

---

## ⚙️ Setup & Installation

1. Clone the repository:

```bash
git clone <backend-repo-url>
```

2. Move into the project folder:

```bash
cd training-hub-backend
```

3. Install dependencies:

```bash
npm install
```

4. Start the server:

```bash
npm run dev
```

Server will run on:

```
http://localhost:5000
```

---

## 🔄 Backend Workflow

1. Frontend sends API request
2. Express receives the request
3. Middleware checks authentication
4. Controller processes logic
5. Model interacts with database
6. Data is fetched or updated
7. Response is sent back to frontend

Example Flow:

```
Frontend → /api/trainees → Auth Middleware → Trainee Controller → DB → Response
```

This ensures:

* Security
* Clean separation of concerns
* Reliable data flow

---

## 📡 API Modules

* 🔐 Authentication (Login, Register, Roles)
* 👨‍🎓 Trainees
* 👨‍🏫 Trainers
* 🏫 Batches
* 📝 Tasks
* 💳 Payments
* 📊 Dashboard Reports

Each module follows:

* Route → Controller → Model → Database

---

## ✨ Key Features

* Role-based authentication
* Secure password hashing
* RESTful APIs
* Input validation
* Centralized error handling
* Modular architecture
* Easy integration with React frontend
* Production-ready structure

---

## 🧪 Testing APIs

You can test APIs using:

* Postman
* Thunder Client
* Insomnia

Base URL:

```
http://localhost:5000/api
```

Example:

```
GET /api/trainees
POST /api/auth/login
POST /api/tasks/create
```

---

## 📦 Production Build

For production:

```bash
npm start
```
