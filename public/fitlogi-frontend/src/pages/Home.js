import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    goal: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Add animation on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    });

    document.querySelectorAll('.feature-card, .stat-card').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const toggleModal = () => setShowModal(!showModal);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Store user data in localStorage
    localStorage.setItem('userProfile', JSON.stringify(formData));
    localStorage.setItem('isNewUser', 'true');
    
    setShowModal(false);
    
    // Navigate based on goal
    if (formData.goal === 'lose-weight' || formData.goal === 'gain-muscle') {
      navigate('/plans');
    } else {
      navigate('/exercise');
    }
  };

  const features = [
    {
      icon: "🏋️",
      title: "Strength Training",
      description: "Build muscle with personalized workout plans",
      color: "#FF6B6B"
    },
    {
      icon: "🏃",
      title: "Cardio Workouts",
      description: "Burn calories with high-intensity cardio sessions",
      color: "#4ECDC4"
    },
    {
      icon: "🥗",
      title: "Nutrition Plans",
      description: "Custom meal plans tailored to your goals",
      color: "#95E1D3"
    },
    {
      icon: "📊",
      title: "Track Progress",
      description: "Monitor your fitness journey with detailed analytics",
      color: "#F38181"
    }
  ];

  const stats = [
    { number: "500+", label: "Workouts" },
    { number: "50K+", label: "Active Users" },
    { number: "95%", label: "Success Rate" },
    { number: "24/7", label: "Support" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Fitness Enthusiast",
      image: "👩‍💼",
      text: "FitTrack transformed my fitness journey! Lost 15kg in 3 months with their personalized plans.",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Professional Athlete",
      image: "👨‍💻",
      text: "The progress tracking feature is incredible. I can see my improvements week by week!",
      rating: 5
    },
    {
      name: "Emma Williams",
      role: "Yoga Instructor",
      image: "👩‍🏫",
      text: "Best fitness app I've used. The nutrition plans are spot on and easy to follow.",
      rating: 5
    }
  ];

  return (
    <div className="home-container">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">🔥 Your Fitness Journey Starts Here</div>
          <h1 className="hero-title">
            Transform Your Body,<br />
            <span className="gradient-text">Transform Your Life</span>
          </h1>
          <p className="hero-description">
            Join thousands of fitness enthusiasts achieving their goals with personalized 
            workout plans, nutrition tracking, and expert guidance.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={toggleModal}>
              Start Free Trial
            </button>
            <button className="btn-secondary" onClick={() => navigate('/plans')}>
              View Plans
            </button>
          </div>
        </div>
        <div className="hero-image">
          <div className="floating-card card-1">💪 150+ Exercises</div>
          <div className="floating-card card-2">🎯 Goal Tracking</div>
          <div className="floating-card card-3">📈 Progress Analytics</div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <h2 className="stat-number">{stat.number}</h2>
            <p className="stat-label">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Choose FitTrack?</h2>
        <p className="section-subtitle">Everything you need to achieve your fitness goals</p>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card" style={{ '--accent-color': feature.color }}>
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2 className="section-title">What Our Members Say</h2>
        <p className="section-subtitle">Join thousands of satisfied fitness enthusiasts</p>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-rating">
                {"⭐".repeat(testimonial.rating)}
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-author">
                <div className="author-image">{testimonial.image}</div>
                <div className="author-info">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2 className="section-title">Get Started in 3 Easy Steps</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Create Your Profile</h3>
            <p>Tell us about your fitness goals and current level</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Get Your Plan</h3>
            <p>Receive personalized workout and nutrition plans</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Track Progress</h3>
            <p>Monitor your journey and celebrate milestones</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Transform?</h2>
        <p>Start your 7-day free trial today. No credit card required.</p>
        <button className="btn-cta" onClick={toggleModal}>Get Started Now</button>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={toggleModal}>×</button>
            <h2 className="modal-title">🚀 Start Your Journey</h2>
            <p className="modal-subtitle">Tell us about yourself</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  placeholder="Enter your name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Age</label>
                  <input 
                    type="number" 
                    name="age"
                    placeholder="25" 
                    min="1" 
                    max="120" 
                    value={formData.age}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <select 
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Height (cm)</label>
                  <input 
                    type="number" 
                    name="height"
                    placeholder="170" 
                    min="50" 
                    max="300" 
                    value={formData.height}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Weight (kg)</label>
                  <input 
                    type="number" 
                    name="weight"
                    placeholder="70" 
                    min="20" 
                    max="300" 
                    value={formData.weight}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Fitness Goal</label>
                <select 
                  name="goal"
                  value={formData.goal}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>Select your goal</option>
                  <option value="lose-weight">Lose Weight</option>
                  <option value="gain-muscle">Gain Muscle</option>
                  <option value="improve-endurance">Improve Endurance</option>
                  <option value="stay-healthy">Stay Healthy</option>
                </select>
              </div>
              <button type="submit" className="btn-submit">Start My Journey</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
