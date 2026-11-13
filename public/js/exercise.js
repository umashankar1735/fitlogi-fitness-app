const mongoose = require("mongoose");
require("dotenv").config();
const Exercise = require("./models/exercise.model");

const sampleExercises = [
  {
    name: "Jumping Jacks",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/10456/10456833.png",
    description: "Full-body warm-up exercise.",
    duration: "5 mins",
    calories: 50,
  },
  {
    name: "Push Ups",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/9558/9558642.png",
    description: "Upper body strength training.",
    duration: "10 mins",
    calories: 100,
  },
  {
    name: "Plank",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/10378/10378242.png",
    description: "Core stabilizing exercise.",
    duration: "2 mins",
    calories: 35,
  },
  {
    name: "Squats",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/8768/8768450.png",
    description: "Legs and glutes strengthening.",
    duration: "8 mins",
    calories: 80,
  },
];

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    await Exercise.deleteMany(); // Clear existing
    await Exercise.insertMany(sampleExercises); // Insert new
    console.log("🌱 Exercise data seeded!");
    mongoose.disconnect();
  })
  .catch((err) => console.error("❌ Seeding error:", err));
