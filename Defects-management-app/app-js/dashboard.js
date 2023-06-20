import {
  addProjectToDB,
  getProjectDataAll,
  getProjectData,
  projectCount,
  addIssueDB,
  lastNumber,
  getProjectIssues,
  issueCount,
  issueCountAll,
  issueCountAllMonth,
} from "../data-storage-js/firebase-db.js";

import { userSignOut, checkAuthState } from "./login.js";

checkAuthState();

/***** Event handlers object *****/
export const eventHandlers = {
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

  // Add a new project to firebase
  newProject: () => {
    let errorMessage = document.querySelector("#project-name-popup-error");
    errorMessage.textContent = " ";
    // Get the project name from user input
    let projectName = document.querySelector(
      "input.project-name-popup-input"
    ).value;
    // add the project only if input project name is not blank
    if (projectName.trim()) {
      projectCount().then((count) => {
        addProjectToDB(projectName, count + 1);
      });
      eventHandlers.closeAddProject();
    } else {
      errorMessage.textContent = "Project name cannot be blank!";
    }

    eventHandlers.displayProjects();
  },

  // Display the projects in the project tab
  displayProjects: () => {
    // Clear any recent projects from the page to reset the page
    removeSiblings("#add-project");

    // Display all the projects in storage
    getProjectDataAll().then((projectsArr) => {
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
    });
  },

  // Display the total number of issues on the dashboard
  totalIssues: () => {
    issueCountAll().then((result) => {
      let div = document.querySelector("div#total");
      div.textContent = result;
    });
  },

  // Display the number of open/closed/high-priority issues on the dashboard
  totalIssuesSplit: () => {
    getProjectDataAll().then((allProjects) => {
      issueCountAll().then((count) => {
        let totalOpen = 0;
        let totalHigh = 0;
        for (let obj of allProjects) {
          obj.issuesArr.forEach((element) => {
            if (element.status !== statusOptions[4]) totalOpen += 1;
            if (element.priority === priorityOptions[1]) totalHigh += 1;
          });
        }
        let pOpen = document.querySelector("p#open");
        pOpen.textContent = totalOpen;
        let pHigh = document.querySelector("p#high-priority");
        pHigh.textContent = totalHigh;
        let pClosed = document.querySelector("p#closed");
        pClosed.textContent = count - totalOpen;
      });
    });
  },

  // Display the number of issues split by the different statuses
  totalIssuesStatus: () => {
    getProjectDataAll().then((allProjects) => {
      issueCountAll().then((count) => {
        let totalAssign = 0;
        let totalRectify = 0;
        let totalInspect = 0;
        let totalClosed = 0;
        for (let obj of allProjects) {
          obj.issuesArr.forEach((element) => {
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
        totalClosed = count - totalAssign - totalRectify - totalInspect;
        pClosed.textContent = totalClosed;

        //Display the pie chart
        const yValues = [totalAssign, totalRectify, totalInspect, totalClosed];
        statusPieChart(yValues);
      });
    });
  },
};

/***** Functions *****/
// Function that removes all siblings of a specified element
export const removeSiblings = (id) => {
  const element = document.querySelector(id);
  let sibling = element.nextSibling;
  while (sibling) {
    let nextSibling = sibling.nextSibling;
    sibling.remove();
    sibling = nextSibling;
  }
};

// Function that displays the pie chart of issues split by status
const statusPieChart = (yValues) => {
  const xValues = [
    statusOptions[1],
    statusOptions[2],
    statusOptions[3],
    statusOptions[4],
  ];

  const pieChart = document.querySelector("#status-pie-chart");
  const pieChartdata = {
    labels: xValues,
    datasets: [
      {
        backgroundColor: ["pink", "red", "blue", "green"],
        data: yValues,
        borderColor: "lightgrey",
      },
    ],
  };

  new Chart(pieChart, {
    type: "doughnut",
    data: pieChartdata,
    options: {
      plugins: {
        datalabels: {
          formatter: (value) => {
            return value + "%";
          },
        },
      },
    },
  });
};

// Function that displays the bar chart of issues per month
const dateBarChart = () => {
  const xValues = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Get the number of issues per month
  issueCountAllMonth().then((issuesMonth) => {
    const yValues = [];

    for (let month of xValues) {
      yValues.push(issuesMonth[month]);
    }

    const barChart = document.querySelector("#date-bar-chart");
    const barChartData = {
      labels: xValues,
      datasets: [
        {
          barPercentage: 0.7,
          backgroundColor: "orange",
          // borderColor: ,
          data: yValues,
        },
      ],
    };

    new Chart(barChart, {
      type: "bar",
      data: barChartData,
    });
  });
};

// Function that displays the bar chart of issues per month, separated by priority
const datePriorityBarChart = () => {
  const xValues = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Get the number of issues per month
  const yValuesHigh = [];
  const yValuesMedium = [];
  const yValuesLow = [];
  const issuesMonth = issueCountDatePriority();
  for (let month of xValues) {
    if (issuesMonth.hasOwnProperty(month)) {
      for (const obj in issuesMonth[month]) {
        // yValuesHigh.push(obj[priorityOptions[1]]);
        yValuesHigh.push(obj["High"]);
        // yValuesMedium.push(obj[priorityOptions[2]]);
        yValuesMedium.push(obj["Medium"]);
        // yValuesLow.push(obj[priorityOptions[3]]);
        yValuesLow.push(obj["Low"]);
      }
    }
  }
  console.log(yValuesHigh);

  const barChart = document.querySelector("#date-bar-chart");
  const barChartData = {
    labels: xValues,
    datasets: [
      {
        label: "High",
        backgroundColor: "red",
        data: yValuesHigh,
      },
      {
        label: "Medium",
        backgroundColor: "orange",
        data: yValuesMedium,
      },
      {
        label: "Low",
        backgroundColor: "yellow",
        data: yValuesLow,
      },
    ],
  };

  new Chart(barChart, {
    type: "bar",
    data: barChartData,
  });
};

/***** Buttons *****/
// Logout button - On click logouts and returns to login page
document.querySelector("#logout-btn").addEventListener("click", userSignOut);

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
// Total number of open/closed/high-priority issues
window.addEventListener("load", eventHandlers.totalIssuesSplit);
// Total number of issues split by status
window.addEventListener("load", eventHandlers.totalIssuesStatus);
// Total number of issues split by month
window.addEventListener("load", dateBarChart);
