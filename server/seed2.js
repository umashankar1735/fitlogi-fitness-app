const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Exercise = require("./models/Exercise");

dotenv.config({ path: "./.env" });

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("🌱 Connected to MongoDB for seeding");

    await Exercise.deleteMany(); // clear previous
    await Exercise.insertMany([
      {
        userId: "harshii123",
        name: "Running",
        category: "Cardio",
        duration: 30,
        calories: 300,
        date: new Date()
      },
      {
        userId: "harshii123",
        name: "Push Ups",
        category: "Strength",
        duration: 15,
        calories: 100,
        date: new Date()
      }
    ]);

    console.log("✅ Seeded exercises successfully");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  });
