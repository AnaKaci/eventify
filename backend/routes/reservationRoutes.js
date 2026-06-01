const express = require("express");
const { getMyReservations } = require("../controllers/reservationController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/my", protect, getMyReservations);

module.exports = router;
