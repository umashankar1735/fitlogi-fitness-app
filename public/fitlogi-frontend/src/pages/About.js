import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-heading">About FitLogi</h1>
      <p className="about-text">
        FitLogi is your all-in-one fitness companion. We provide personalized diet and workout plans
        to help you stay consistent, track your progress, and achieve your fitness goals effectively.
      </p>
      <div className="about-highlights">
        <div className="highlight">
          <h3>🧠 Personalized Plans</h3>
          <p>Smart algorithms that adapt to your fitness level.</p>
        </div>
        <div className="highlight">
          <h3>📊 Progress Tracking</h3>
          <p>Monitor your improvements with visual feedback.</p>
        </div>
        <div className="highlight">
          <h3>🕒 Reminders</h3>
          <p>Stay on schedule with timely reminders.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
