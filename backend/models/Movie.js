const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide movie title"],
      minlength: 3,
      maxlength: 300,
      trim: true,
    },
    description: {
      type: String,
      maxlength: 1000,
      trim: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
      required: [true, "Please provide movie rating"],
    },
    releaseDate: {
      type: Date,
      required: [true, "please provide release date"],
    },
    duration: {
      type: Number, // minutes
      required: [true, "Please provide duration"],
    },
    genre: {
      type: String,
      default: "Unknown",
    },

    directors: {
      type: [String],
      default: [],
    },

    writers: {
      type: [String],
      default: [],
    },

    actors: {
      type: [String],
      default: [],
    },

    mpaaRating: {
      type: String,
      enum: ["G", "PG", "PG-13", "R", "NC-17", "Not Rated"],
      default: "Not Rated",
    },

    poster: {
      type: String,
      default: "/images/default-poster.jpg",
    },
  },
  {
    timestamps: true,
  }
);

MovieSchema.index({ title: 1, description: 1 }, { unique: true });
module.exports = mongoose.model("Movie", MovieSchema);
