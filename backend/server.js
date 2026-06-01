const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const reservationRoutes = require("./routes/reservationRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
const allowedOrigins = new Set([
  CLIENT_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5173"
]);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.has(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
  })
);
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ message: "Eventify API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/reservations", reservationRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
});

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Eventify API running on port ${PORT}`);
  });
};

startServer();
