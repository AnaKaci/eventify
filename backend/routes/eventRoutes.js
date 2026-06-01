const express = require("express");
const {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} = require("../controllers/eventController");
const { reserveEvent, cancelReservation } = require("../controllers/reservationController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getEvents);
router.get("/:id", getEventById);
router.post("/", protect, adminOnly, createEvent);
router.put("/:id", protect, adminOnly, updateEvent);
router.delete("/:id", protect, adminOnly, deleteEvent);
router.post("/:id/reserve", protect, reserveEvent);
router.delete("/:id/cancel", protect, cancelReservation);

module.exports = router;
