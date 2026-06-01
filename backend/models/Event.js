const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true
    },
    date: {
      type: Date,
      required: [true, "Date is required"]
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true
    },
    totalSeats: {
      type: Number,
      required: [true, "Total seats are required"],
      min: [1, "An event must have at least one seat"]
    },
    reservedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

eventSchema.virtual("availableSeats").get(function () {
  return Math.max(this.totalSeats - this.reservedUsers.length, 0);
});

eventSchema.virtual("status").get(function () {
  if (this.date < new Date()) {
    return "Past";
  }

  if (this.availableSeats === 0) {
    return "Full";
  }

  return "Open";
});

module.exports = mongoose.model("Event", eventSchema);
