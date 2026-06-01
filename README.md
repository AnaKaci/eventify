# Eventify

Eventify is a MERN full-stack Campus Events & Reservations Platform. Students can register, log in, browse campus events, reserve a spot, cancel reservations, and view their reserved events. Admin users can create, edit, delete, and monitor events.

## Tech Stack

- Frontend: React, React Router, Redux Toolkit, RTK Query, CSS
- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose
- Authentication: JWT
- Password security: bcrypt with salt

## Project Structure

```text
backend/
  config/
  controllers/
  middleware/
  models/
  routes/
  scripts/

frontend/
  src/
    app/
    components/
    features/
    pages/
    services/
    utils/
```

## Main Features

- Student registration and login
- JWT protected routes
- Password hashing with bcrypt
- Event browsing with search and category filters
- Event details page
- Student reservation and cancellation
- My Reservations page
- Admin dashboard for creating, editing, and deleting events
- Reservation count per event
- Role-based UI for students and admins

## Backend Setup

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

`npm run dev` also prepares demo events and the demo admin account before starting the server.

Backend runs on:

```text
http://localhost:5000
```

Example `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://YOUR_DB_USER:YOUR_DB_PASSWORD@YOUR_CLUSTER_URL/eventify?retryWrites=true&w=majority&appName=YOUR_APP_NAME
JWT_SECRET=replace_with_a_long_random_secret
CLIENT_URL=http://localhost:5173
```

## Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

Example `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

## Demo Admin Account

```text
Email: admin@eventify.edu
Password: admin123
```

## API Routes

Auth:

- `POST /api/auth/register`
- `POST /api/auth/login`

Events:

- `GET /api/events`
- `GET /api/events/:id`
- `POST /api/events` admin only
- `PUT /api/events/:id` admin only
- `DELETE /api/events/:id` admin only

Reservations:

- `POST /api/events/:id/reserve`
- `DELETE /api/events/:id/cancel`
- `GET /api/reservations/my`

## Notes For Presentation

- The backend follows the required structure: routes, models, controllers, middleware, and config.
- The `User` model hashes passwords before saving.
- JWT tokens are created during register/login.
- Protected middleware checks if the user is logged in.
- Admin middleware checks if the user role is `admin`.
- RTK Query handles frontend API calls in `frontend/src/services/apiSlice.js`.
- MongoDB data models are defined with Mongoose.

## Important GitHub Note

Do not upload real `.env` files or `node_modules`. They are ignored in `.gitignore`.

Upload these safe files instead:

- `backend/.env.example`
- `frontend/.env.example`
