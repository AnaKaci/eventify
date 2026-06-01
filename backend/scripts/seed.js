const dotenv = require("dotenv");
const connectDB = require("../config/db");
const User = require("../models/User");
const Event = require("../models/Event");

dotenv.config();

const sampleEvents = [
  {
    title: "Startup Pitch Night",
    description:
      "Students present startup ideas, meet mentors, and get friendly feedback from campus founders.",
    category: "Business",
    date: new Date("2026-06-18T18:00:00"),
    location: "Innovation Lab",
    totalSeats: 80
  },
  {
    title: "Web Development Workshop",
    description:
      "A practical React and Node.js workshop for students who want to build portfolio projects.",
    category: "Technology",
    date: new Date("2026-06-21T10:00:00"),
    location: "Computer Science Hall",
    totalSeats: 35
  },
  {
    title: "Campus Music Evening",
    description:
      "An open-air evening with student bands, acoustic sets, and a relaxed end-of-week atmosphere.",
    category: "Culture",
    date: new Date("2026-06-27T19:30:00"),
    location: "Main Courtyard",
    totalSeats: 120
  },
  {
    title: "Career Fair Prep Session",
    description:
      "Bring your CV and practice short introductions before meeting companies at the career fair.",
    category: "Career",
    date: new Date("2026-07-02T14:00:00"),
    location: "Student Center",
    totalSeats: 60
  },
  {
    title: "Robotics Demo Day",
    description:
      "Student teams showcase robots, sensors, and automation projects built during the semester.",
    category: "Technology",
    date: new Date("2026-07-06T11:00:00"),
    location: "Engineering Atrium",
    totalSeats: 70
  },
  {
    title: "Interfaculty Basketball Tournament",
    description:
      "A friendly tournament between faculties with music, supporters, and prizes for the finalists.",
    category: "Sports",
    date: new Date("2026-07-09T17:00:00"),
    location: "Campus Sports Hall",
    totalSeats: 150
  },
  {
    title: "Mental Health Morning",
    description:
      "A calm session about stress management, healthy routines, and support resources for students.",
    category: "Health",
    date: new Date("2026-07-13T09:30:00"),
    location: "Wellness Center",
    totalSeats: 45
  },
  {
    title: "Research Poster Expo",
    description:
      "Final-year students present research posters and discuss their findings with professors and peers.",
    category: "Academic",
    date: new Date("2026-07-16T12:00:00"),
    location: "Library Conference Floor",
    totalSeats: 90
  },
  {
    title: "Photography Walk",
    description:
      "Explore campus through a creative lens and learn simple composition tips from the media club.",
    category: "Culture",
    date: new Date("2026-07-20T18:00:00"),
    location: "Main Gate",
    totalSeats: 25
  },
  {
    title: "Volunteer Fair",
    description:
      "Meet student clubs and local organizations looking for volunteers for community projects.",
    category: "Career",
    date: new Date("2026-07-23T13:00:00"),
    location: "Student Lounge",
    totalSeats: 100
  }
];

const seed = async () => {
  try {
    await connectDB();

    let admin = await User.findOne({ email: "admin@eventify.edu" });

    if (!admin) {
      admin = await User.create({
        name: "Eventify Admin",
        email: "admin@eventify.edu",
        password: "admin123",
        role: "admin"
      });
    }

    for (const event of sampleEvents) {
      await Event.updateOne(
        { title: event.title },
        { $setOnInsert: { ...event, createdBy: admin._id, reservedUsers: [] } },
        { upsert: true }
      );
    }

    console.log("Seed complete. Admin login: admin@eventify.edu / admin123");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();
