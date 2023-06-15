/**** Event handlers object ****/
const eventHandlers = {
  // Logouts and redirects to login page
  logout: (event) => {
    event.target.href = "../login.html";
  },

  // Returns to the home dashboard page
  dashboardHome: (event) => {
    event.target.parentNode.href = "dashboard-html/dashboard.html";
  },

  // Opens the 'create a new project' popup
  addProject: () => {
    document.querySelector("#project-name-popup-id").classList.add("active");
    document.querySelector("#overlay").classList.add("active");
  },

  // Closes the 'create a new project' popup
  closeAddProject: () => {
    document.querySelector("#project-name-popup-id").classList.remove("active");
    document.querySelector("#overlay").classList.remove("active");
  },

  // Add a new project to the projects array and display it on the dashboard
  newProject: () => {
    let errorMessage = document.querySelector("#project-name-popup-error");
    errorMessage.textContent = " ";
    let projectName = document.querySelector(
      "input.project-name-popup-input"
    ).value;
    // add the project only if input project name is not blank
    if (projectName.trim()) {
      projectCount += 1;
      const projectObject = {
        Name: projectName.trim(),
        ProjectId: projectCount,
      };
      projects.push(projectObject);

      // Display on dashboard
      let newProjectA = document.createElement("a");
      newProjectA.textContent = projectName.trim();
      //Add a link to the project page
      newProjectA.href = "../dashboard-html/project-template.html";

      let newProjectDiv = document.createElement("div");
      newProjectDiv.className = "project";
      newProjectDiv.append(newProjectA);
      document.querySelector("#projects-tab").append(newProjectDiv);

      eventHandlers.closeAddProject();
    } else {
      errorMessage.textContent = "Project name cannot be blank!";
    }
  },
};

/**** Buttons ****/
// Logout button - On click logouts and returns to login page
document
  .querySelector("#logout-btn")
  .addEventListener("click", eventHandlers.logout);

// Home button - On click, returns to home dashboard
document
  .querySelector("#home-btn")
  .addEventListener("click", eventHandlers.dashboardHome);

// Add project button - on click, creates a new project popup
document
  .querySelector("#add-project")
  .addEventListener("click", eventHandlers.addProject);

// Project name popup window close button - on click, closes the popup window
document
  .querySelector("#project-name-popup-close-btn")
  .addEventListener("click", eventHandlers.closeAddProject);

// Project name popup window add button - on click, adds and displays the new project on the dashboard
document
  .querySelector("#project-name-popup-add")
  .addEventListener("click", eventHandlers.newProject);

/**** Global variables ****/
//Array of projects
let projectCount = 0;
const projects = [];
