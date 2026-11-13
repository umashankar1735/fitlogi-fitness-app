// src/utils/storageUtils.js
export const saveGoalProgress = (goals) => {
  localStorage.setItem("goalProgress", JSON.stringify(goals));
};

