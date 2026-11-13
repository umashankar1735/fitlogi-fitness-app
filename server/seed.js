const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const Workout = require("./models/Workout");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const MONGO_URI = process.env.MONGO_URI;

const seedWorkouts = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    await Workout.deleteMany();

    const sampleWorkouts = [
      // 🌟 Weight Loss Plan
      {
        title: "Fat Burn Monday",
        day: "Monday",
        type: "Gym",
        goal: "Weight Loss",
        durationInWeeks: 4,
        image: "https://tse2.mm.bing.net/th/id/OIP.I4OgwbtfWWKoMrVm0bGB7AHaE8?pid=Api&P=0&h=180",
        exercises: [
          {
            name: "Running",
            duration: "30 mins",
            calories: 300,
            rating: 4.7,
            description: "Great for fat burning and improving endurance."
          },
          {
            name: "Jump Rope",
            duration: "15 mins",
            calories: 200,
            rating: 4.5,
            description: "Full-body cardio that improves coordination."
          },
        ],
      },

      // 🧘‍♀️ Flexibility Plan
      {
        title: "Flexy Tuesday",
        day: "Tuesday",
        type: "Yoga",
        goal: "Flexibility",
        durationInWeeks: 3,
        image: "https://cdn.pixabay.com/photo/2016/11/29/04/00/adult-1867743_960_720.jpg",
        exercises: [
          {
            name: "Sun Salutation",
            duration: "20 mins",
            calories: 100,
            rating: 4.8,
            description: "Improves posture and flexibility through flowing movement."
          },
          {
            name: "Breathing Exercise",
            duration: "10 mins",
            calories: 50,
            rating: 4.3,
            description: "Enhances lung capacity and reduces stress."
          },
        ],
      },

      // 💪 Strength Plan
      {
        title: "Power Wednesday",
        day: "Wednesday",
        type: "Gym",
        goal: "Strength",
        durationInWeeks: 6,
        image: "https://cdn.pixabay.com/photo/2017/01/31/13/14/gym-2021143_960_720.jpg",
        exercises: [
          {
            name: "Deadlifts",
            duration: "3 sets of 10 reps",
            calories: 180,
            rating: 4.9,
            description: "Builds back and leg strength effectively."
          },
          {
            name: "Bench Press",
            duration: "3 sets of 8 reps",
            calories: 160,
            rating: 4.6,
            description: "Targets chest, triceps, and shoulders."
          },
        ],
      },

      // 🏃 Cardio Plan
      {
        title: "Cardio Blast Thursday",
        day: "Thursday",
        type: "Gym",
        goal: "Cardio",
        durationInWeeks: 5,
        image: "https://cdn.pixabay.com/photo/2016/11/18/17/20/running-1839087_960_720.jpg",
        exercises: [
          {
            name: "Cycling",
            duration: "30 mins",
            calories: 250,
            rating: 4.4,
            description: "Great for leg endurance and fat burn."
          },
          {
            name: "Treadmill Walk",
            duration: "25 mins",
            calories: 180,
            rating: 4.2,
            description: "Improves heart health and stamina."
          },
        ],
      },
    ];

    await Workout.insertMany(sampleWorkouts);
    console.log("✅ Workout plans seeded successfully with full details!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding workout plans:", err.message);
    process.exit(1);
  }
};

seedWorkouts();
