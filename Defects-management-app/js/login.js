// Event handlers object //
const eventHandlers = {
  // Redirects to the home dashboard page
  dashboardHome: (event) => {
    event.target.parentNode.href = "dashboard-html/dashboard.html";
  },
};

// Buttons //
// Add dashboardHome event to login button
document
  .querySelector("#login-btn")
  .addEventListener("click", eventHandlers.dashboardHome);
