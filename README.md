# FitLogi - MERN Fitness & Health Tracker

[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

Full-stack MERN application consolidating workout logging, nutrition and diet management, BMI calculation, calorie tracking, and automated fitness progress analytics into a unified, responsive dashboard.

---

## 🌟 Key Features

- **Workout Logging**: Track strength exercises, reps, sets, and cardio metrics with historical session playback.
- **Diet & Calorie Tracking**: Meal logging with calorie estimation and macronutrient balance breakdowns.
- **BMI & Health Telemetry**: Interactive BMI calculator with categorized health range indicators.
- **Progress Visualizations**: Interactive Chart.js graphs mapping workout consistency and weight trends over time.
- **JWT Authentication**: Secure user session management with password hashing and protected REST API endpoints.

---

## 🏗️ Architecture

- **Frontend**: React.js with modular component architecture, Chart.js for data visualization, and responsive CSS styling.
- **Backend API**: Node.js & Express.js REST API structured across controllers, models, and middleware.
- **Database**: MongoDB with Mongoose ODM schemas for users, workouts, diet entries, and progress logs.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js >= 18
- MongoDB instance running locally or via MongoDB Atlas

### 2. Environment Configuration
Create a `.env` file in the root directory:
```env
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/fitlogi
JWT_SECRET=your_jwt_secret_key_here
```

### 3. Installation & Run
```bash
# Install backend dependencies
npm install

# Start backend server
npm start

# In a separate terminal, install and run React frontend
cd public/fitlogi-frontend
npm install
npm start
```

---

## 📄 License
MIT License. Created by K. Sai Uma Shankar.
