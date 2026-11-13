import React, { createContext, useState, useEffect } from "react";
import { getGoals, saveGoals } from "../utils/storage";

export const GoalContext = createContext();

export const GoalProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const storedGoals = getGoals();
    setGoals(storedGoals);
  }, []);

  useEffect(() => {
    saveGoals(goals);
  }, [goals]);

  const addGoal = (goal) => {
    setGoals([...goals, goal]);
  };

  const updateGoalProgress = (id, newProgress) => {
    const updated = goals.map((goal) =>
      goal.id === id ? { ...goal, current: newProgress } : goal
    );
    setGoals(updated);
  };

  return (
    <GoalContext.Provider value={{ goals, addGoal, updateGoalProgress }}>
      {children}
    </GoalContext.Provider>
  );
};
