// import {
//   addProjectToDB,
//   getProjectDataAll,
//   getProjectData,
//   projectCount,
//   addIssueDB,
//   lastNumber,
//   getProjectIssues,
//   issueCount,
//   issueCountAll,
//   issueCountAllMonth,
// } from "../data-storage-js/firebase-db.js";

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

/***** Other event listeners *****/
// On refresh/load of dashboard page - display all projects in the project tab
// window.addEventListener("load", eventHandlers.displayProjects);

// On refresh/load of dashboard page - display the total number of issues
// Total number
// window.addEventListener("load", eventHandlers.totalIssues);
// // Total number of open/closed/high-priority issues
// window.addEventListener("load", eventHandlers.totalIssuesSplit);
// // Total number of issues split by status
// window.addEventListener("load", eventHandlers.totalIssuesStatus);
// // Total number of issues split by month
// window.addEventListener("load", dateBarChart);

/***** Main script *****/
// Display all projects on first load
eventHandlers.displayProjects();
eventHandlers.totalIssues();
eventHandlers.totalIssuesSplit();
eventHandlers.totalIssuesStatus();
// dateBarChart();
datePriorityBarChart();

issueCountAllMonthPriority().then((result) => {
  console.log(result);
});
