const Event = require("../models/Event");

const reserveEvent = async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Only students can reserve events" });
    }

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.date < new Date()) {
      return res.status(400).json({ message: "Past events cannot be reserved" });
    }

    const alreadyReserved = event.reservedUsers.some(
      (userId) => userId.toString() === req.user._id.toString()
    );

    if (alreadyReserved) {
      return res.status(400).json({ message: "You already reserved this event" });
    }

    if (event.reservedUsers.length >= event.totalSeats) {
      return res.status(400).json({ message: "No seats available" });
    }

    event.reservedUsers.push(req.user._id);
    const updatedEvent = await event.save();
    res.status(201).json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: "Could not reserve event" });
  }
};

const cancelReservation = async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Only students can cancel reservations" });
    }

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const hadReservation = event.reservedUsers.some(
      (userId) => userId.toString() === req.user._id.toString()
    );

    if (!hadReservation) {
      return res.status(400).json({ message: "Reservation not found" });
    }

    event.reservedUsers = event.reservedUsers.filter(
      (userId) => userId.toString() !== req.user._id.toString()
    );

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: "Could not cancel reservation" });
  }
};

const getMyReservations = async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Only students have reservations" });
    }

    const events = await Event.find({ reservedUsers: req.user._id }).sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Could not load reservations" });
  }
};

module.exports = { reserveEvent, cancelReservation, getMyReservations };
