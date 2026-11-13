import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "./Tips.css";

const tipsData = [
  {
    title: "Stay Hydrated 💧",
    description: "Drink at least 8-10 glasses of water daily to keep your body and skin hydrated.",
    category: "Nutrition",
    icon: "💧",
  },
  {
    title: "Exercise Daily 🏃‍♀️",
    description: "Even 30 minutes of light exercise can boost your energy and mood.",
    category: "Fitness",
    icon: "🏃‍♀️",
  },
  {
    title: "Eat Fruits & Veggies 🍎",
    description: "Add colorful fruits and vegetables to your meals for vital nutrients.",
    category: "Nutrition",
    icon: "🍎",
  },
  {
    title: "Proper Sleep 😴",
    description: "Sleep for 7-9 hours to let your body heal and restore energy.",
    category: "Lifestyle",
    icon: "😴",
  },
  {
    title: "Don't Skip Meals 🍱",
    description: "Skipping meals can mess with your metabolism. Eat timely and balanced meals.",
    category: "Nutrition",
    icon: "🍱",
  },
  {
    title: "Reduce Sugar Intake 🍬",
    description: "Too much sugar can cause fatigue and affect your skin. Try natural sweeteners.",
    category: "Nutrition",
    icon: "🍬",
  },
  {
    title: "Practice Mindfulness 🧘‍♀️",
    description: "Just 5-10 mins of meditation daily can reduce stress and improve focus.",
    category: "Mental Health",
    icon: "🧘‍♀️",
  },
  {
    title: "Get Some Sun ☀️",
    description: "Sunlight is a natural source of Vitamin D. Step out for 15-20 mins daily.",
    category: "Lifestyle",
    icon: "☀️",
  },
  {
    title: "Take Breaks ⏸️",
    description: "If you work long hours, take short breaks to relax your eyes and body.",
    category: "Lifestyle",
    icon: "⏸️",
  },
  {
    title: "Limit Screen Time 📵",
    description: "Avoid too much screen time, especially before bed. It can affect your sleep.",
    category: "Lifestyle",
    icon: "📵",
  },
  {
    title: "Stretch Regularly 🧍‍♀️",
    description: "Stretch every hour, especially if you're sitting long hours at work or study.",
    category: "Fitness",
    icon: "🧍‍♀️",
  },
  {
    title: "Avoid Sugary Drinks 🥤",
    description: "Cut down on sodas and opt for natural juices or lemon water.",
    category: "Nutrition",
    icon: "🥤",
  },
  {
    title: "Eat Protein-Rich Food 🍗",
    description: "Include sources of protein like beans, lentils, eggs, or lean meats in your diet.",
    category: "Nutrition",
    icon: "🍗",
  },
  {
    title: "Laugh Often 😂",
    description: "Laughter really is the best medicine — it boosts immunity and reduces stress.",
    category: "Mental Health",
    icon: "😂",
  },
  {
    title: "Keep a Journal 📔",
    description: "Writing your thoughts and goals helps in mental clarity and self-awareness.",
    category: "Mental Health",
    icon: "📔",
  },
  {
    title: "Boost Immunity 🍊",
    description: "Eat foods rich in Vitamin C and zinc like oranges, spinach, and nuts.",
    category: "Nutrition",
    icon: "🍊",
  },
  {
    title: "Take Nature Walks 🌳",
    description: "Spending time outdoors reduces stress and improves focus and mood.",
    category: "Lifestyle",
    icon: "🌳",
  },
  {
    title: "Celebrate Small Wins 🎉",
    description: "Every step towards your goal counts. Acknowledge your efforts regularly!",
    category: "Mental Health",
    icon: "🎉",
  },
  {
    title: "Stay Consistent 💪",
    description: "Small daily habits compound over time. Stay consistent with your routine.",
    category: "Fitness",
    icon: "💪",
  },
  {
    title: "Practice Gratitude 🙏",
    description: "Take a moment each day to appreciate what you have. It improves mental wellbeing.",
    category: "Mental Health",
    icon: "🙏",
  },
  {
    title: "Warm Up Before Exercise 🔥",
    description: "Always warm up before workouts to prevent injuries and improve performance.",
    category: "Fitness",
    icon: "🔥",
  },
];

function Tips() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "Nutrition", "Fitness", "Mental Health", "Lifestyle"];

  const filteredTips = selectedCategory === "All" 
    ? tipsData 
    : tipsData.filter(tip => tip.category === selectedCategory);

  return (
    <>
      <Navbar />
      <div className="tips-page">
        <div className="tips-hero">
          <div className="hero-overlay">
            <h1>💡 Nutrition & Wellness Tips</h1>
            <p>Expert advice to help you achieve your health goals</p>
          </div>
        </div>

        <div className="tips-content">
          <div className="tips-intro">
            <h2>Your Guide to Healthy Living</h2>
            <p>Explore our curated collection of nutrition and wellness tips designed to help you make better choices every day.</p>
          </div>

          <div className="category-filter-section">
            <h3>Filter by Category</h3>
            <div className="category-pills">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`category-pill ${selectedCategory === cat ? "active" : ""}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="tips-count">
            Showing {filteredTips.length} {filteredTips.length === 1 ? 'tip' : 'tips'}
          </div>

          <div className="tips-grid">
            {filteredTips.map((tip, index) => (
              <div className="tip-card" key={index}>
                <div className="tip-icon-wrapper">
                  <span className="tip-icon">{tip.icon}</span>
                </div>
                <div className="tip-content">
                  <span className="tip-category">{tip.category}</span>
                  <h3>{tip.title}</h3>
                  <p>{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Tips;
