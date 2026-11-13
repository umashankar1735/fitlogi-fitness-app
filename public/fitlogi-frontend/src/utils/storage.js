export const saveGoals = (goals) => {
  localStorage.setItem("fitness_goals", JSON.stringify(goals));
};

export const getGoals = () => {
  const data = localStorage.getItem("fitness_goals");
  return data ? JSON.parse(data) : [];
};
