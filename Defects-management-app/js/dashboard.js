/***** Event handlers object *****/
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

  // Add a new project to the session storage
  newProject: () => {
    let errorMessage = document.querySelector("#project-name-popup-error");
    errorMessage.textContent = " ";
    let projectName = document.querySelector(
      "input.project-name-popup-input"
    ).value;
    // add the project only if input project name is not blank
    if (projectName.trim()) {
      let count = projectCount();
      count += 1;
      let projectData = { id: count, name: projectName, issueArr: [] };
      saveProject(projectName, projectData);
      eventHandlers.closeAddProject();
    } else {
      errorMessage.textContent = "Project name cannot be blank!";
    }
  },

  // Display the projects in the project tab
  displayProjects: () => {
    // Clear any recent projects from the page
    const h3 = document.querySelector("#add-project");
    let sibling = h3.nextSibling;
    while (sibling) {
      let nextSibling = sibling.nextSibling;
      sibling.remove();
      sibling = nextSibling;
    }

    // Display all the projects in storage
    const projectsArr = getProjectDataObjAll();
    for (let i = 0; i < projectsArr.length; i++) {
      //Create a link for each project
      let newProjectA = document.createElement("a");
      newProjectA.textContent = projectsArr[i].name;
      newProjectA.href = `../dashboard-html/project-template.html?page=${projectsArr[i].name}`; //Add a link to the project page
      //Display each project on dashboard
      let newProjectDiv = document.createElement("div");
      newProjectDiv.className = "project";
      newProjectDiv.append(newProjectA);
      document.querySelector("#projects-tab").appendChild(newProjectDiv);
    }
  },

  // Display the total number of issues on the dashboard
  totalIssues: () => {
    let div = document.querySelector("div#total");
    div.textContent = issueCountAll();
  },

  // Display the number of open/closed/high-priority issues
  totalIssuesSplit: () => {
    let totalOpen = 0;
    let totalHigh = 0;
    const allProjects = getProjectDataObjAll();
    for (let obj of allProjects) {
      obj.issueArr.forEach((element) => {
        if (element.status !== statusOptions[4]) totalOpen += 1;
        if (element.priority === priorityOptions[1]) totalHigh += 1;
      });
    }
    let pOpen = document.querySelector("p#open");
    pOpen.textContent = totalOpen;
    let pHigh = document.querySelector("p#high-priority");
    pHigh.textContent = totalHigh;
    let pClosed = document.querySelector("p#closed");
    pClosed.textContent = issueCountAll() - totalOpen;
  },

  // Display the number of issues split by the different statuses
  totalIssuesStatus: () => {
    let totalAssign = 0;
    let totalRectify = 0;
    let totalInspect = 0;
    const allProjects = getProjectDataObjAll();
    for (let obj of allProjects) {
      obj.issueArr.forEach((element) => {
        if (element.status === statusOptions[1]) totalAssign += 1;
        if (element.status === statusOptions[2]) totalRectify += 1;
        if (element.status === statusOptions[3]) totalInspect += 1;
      });
    }
    let pAssign = document.querySelector("p#assign");
    pAssign.textContent = totalAssign;
    let pRectify = document.querySelector("p#rectify");
    pRectify.textContent = totalRectify;
    let pInspect = document.querySelector("p#inspection");
    pInspect.textContent = totalInspect;
    let pClosed = document.querySelector("p#status-closed");
    pClosed.textContent =
      issueCountAll() - totalAssign - totalRectify - totalInspect;
  },
};

/***** Buttons *****/
// Logout button - On click logouts and returns to login page
document
  .querySelector("#logout-btn")
  .addEventListener("click", eventHandlers.logout);

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

// Project name popup window add button - on click, saves a new project to session storage
document
  .querySelector("#project-name-popup-add")
  .addEventListener("click", eventHandlers.newProject);

// Project name popup window add button - on click, displays all projects in the project tab
document
  .querySelector("#project-name-popup-add")
  .addEventListener("click", eventHandlers.displayProjects);

/***** Other event listeners *****/
// On refresh/load of dashboard page - display all projects in the project tab
window.addEventListener("load", eventHandlers.displayProjects);

// On refresh/load of dashboard page - display the total number of issues
// Total number
window.addEventListener("load", eventHandlers.totalIssues);
// Total number of open
window.addEventListener("load", eventHandlers.totalIssuesSplit);
//
window.addEventListener("load", eventHandlers.totalIssuesStatus);

/***** Global variables *****/
