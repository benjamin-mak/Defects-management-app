import { issueCountAllMonthPriority } from "../data-storage-js/firebase-db.js";
import {
  userLogout,
  checkAuthState,
  eventHandlers,
  removeSiblings,
  statusPieChart,
  dateBarChart,
  datePriorityBarChart,
} from "./functions.js";

/***** Buttons *****/
// Logout button - On click logouts and returns to login page
document.querySelector("#logout-btn").addEventListener("click", (e) => {
  e.preventDefault();
  userLogout();
});

// Home button - On click, returns to home dashboard
document
  .querySelector("#home-btn")
  .addEventListener("click", eventHandlers.dashboardHome);

// Add project button - on click, creates a new project popup on the dashboard page
document
  .querySelector("#add-project")
  .addEventListener("click", eventHandlers.addProject);

// Project name popup window close button - on click, closes the popup window on the dashboard page
document
  .querySelector("#project-name-popup-close-btn")
  .addEventListener("click", eventHandlers.closeAddProject);

// Project name popup window add button - on click, saves a new project to firebase
document
  .querySelector("#project-name-popup-add")
  .addEventListener("click", eventHandlers.newProject);

/***** Main script *****/
// Display all projects on first load
eventHandlers.displayProjects();
eventHandlers.totalIssues();
eventHandlers.totalIssuesSplit();
eventHandlers.totalIssuesStatus();
datePriorityBarChart();
