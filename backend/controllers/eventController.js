const Event = require("../models/Event");

const getEvents = async (req, res) => {
  try {
    const { search = "", category = "" } = req.query;
    const filters = {};

    if (category && category !== "All") {
      filters.category = category;
    }

    if (search.trim()) {
      const searchRegex = new RegExp(search.trim(), "i");
      filters.$or = [
        { title: searchRegex },
        { category: searchRegex },
        { location: searchRegex }
      ];
    }

    const events = await Event.find(filters)
      .populate("createdBy", "name email")
      .sort({ date: 1 });

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Could not load events" });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("createdBy", "name email");

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    res.status(400).json({ message: "Invalid event id" });
  }
};

const createEvent = async (req, res) => {
  try {
    const { title, description, category, date, location, totalSeats } = req.body;

    if (!title || !description || !category || !date || !location || !totalSeats) {
      return res.status(400).json({ message: "All event fields are required" });
    }

    if (Number(totalSeats) < 1) {
      return res.status(400).json({ message: "Total seats must be at least 1" });
    }

    const event = await Event.create({
      title,
      description,
      category,
      date,
      location,
      totalSeats,
      createdBy: req.user._id
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: "Could not create event" });
  }
};

const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const nextTotalSeats = Number(req.body.totalSeats ?? event.totalSeats);

    if (nextTotalSeats < event.reservedUsers.length) {
      return res.status(400).json({
        message: "Total seats cannot be lower than current reservations"
      });
    }

    event.title = req.body.title ?? event.title;
    event.description = req.body.description ?? event.description;
    event.category = req.body.category ?? event.category;
    event.date = req.body.date ?? event.date;
    event.location = req.body.location ?? event.location;
    event.totalSeats = nextTotalSeats;

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: "Could not update event" });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    await event.deleteOne();
    res.json({ message: "Event deleted" });
  } catch (error) {
    res.status(400).json({ message: "Could not delete event" });
  }
};

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
};
