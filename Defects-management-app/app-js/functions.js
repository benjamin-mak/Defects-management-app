import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

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
  issueCountAllMonthPriority,
} from "../data-storage-js/firebase-db.js";

const firebaseConfig = {
  apiKey: "AIzaSyAOSdFfxqi8gpqi_WY5Qp8GOx1keZsZd0Q",
  authDomain: "ga-project1-4755b.firebaseapp.com",
  projectId: "ga-project1-4755b",
  storageBucket: "ga-project1-4755b.appspot.com",
  messagingSenderId: "242311190800",
  appId: "1:242311190800:web:5964d422f791d7a18b2d95",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialise authentication
const auth = getAuth(app);

/**** Login/logout Functions *****/
// Function that validates user details and signs into firebase
export const userLogin = async (userEmail, userPassword) => {
  const loginEmail = userEmail.value;
  const loginPassword = userPassword.value;
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      loginEmail,
      loginPassword
    );
    alert("Login success");
    checkAuthState();
  } catch (error) {
    const errorCode = error.errorCode;
    const errorMessage = error.message;
    console.log(errorCode + errorMessage);
    // Show error message on the page
    let div = document.querySelector("#login-error");
    div.textContent = "";
    setTimeout(() => {
      div.textContent = "Wrong email/password. Try again.";
    }, 300);
  }
};

// Function that checks the current authentication state
export const checkAuthState = async () => {
  onAuthStateChanged(auth, (user) => {
    // If user is signed into firebase, redirect to dashboard home
    if (user) {
      window.location.assign(
        "/Defects-management-app/dashboard-html/dashboard.html"
      );
    } else {
      // if not, redirect to login page
      window.location.assign("/Defects-management-app/login.html");
    }
  });
};

// Function that signs the user out of firebase
export const userLogout = async () => {
  try {
    await signOut(auth);
    alert("You have signed out successfully.");
  } catch (error) {
    const errorCode = error.errorCode;
    const errorMessage = error.message;
    console.log(errorCode + errorMessage);
    alert("Unable to sign out.");
  }
  checkAuthState();
};

/***** Event handlers object *****/
export const eventHandlers = {
  // Returns to the home dashboard page
  dashboardHome: (event) => {
    event.target.href = "dashboard-html/dashboard.html";
    eventHandlers.displayProjects();
    eventHandlers.totalIssues();
    eventHandlers.totalIssuesSplit();
    eventHandlers.totalIssuesStatus();
    dateBarChart();
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

  // Adds a new project to firebase
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

      // eventHandlers.displayProjects(); // Refactor this
      //invoke a function that adds the new project to the DOM
      eventHandlers.newProjectDOM(projectName);
      eventHandlers.closeAddProject();
    } else {
      errorMessage.textContent = "Project name cannot be blank!";
    }
  },

  //Add the new project to the DOM
  newProjectDOM: (projectName) => {
    let newProjectDiv = document.createElement("div");
    newProjectDiv.className = "project";
    newProjectDiv.textContent = projectName;
    // Add click event to the div that redirects to project page
    newProjectDiv.addEventListener("click", () => {
      window.location.assign(
        `/Defects-management-app/dashboard-html/project-template.html?page=${projectName}`
      );
    });
    document.querySelector("#projects-tab").appendChild(newProjectDiv);
  },

  // Display the projects in the project tab
  displayProjects: () => {
    // Clear any recent projects from the page to reset the page
    removeSiblings("#add-project");

    // Display all the projects in firebase
    getProjectDataAll().then((projectsArr) => {
      for (let i = 0; i < projectsArr.length; i++) {
        //Display each project on dashboard
        let newProjectDiv = document.createElement("div");
        newProjectDiv.className = "project";
        newProjectDiv.textContent = projectsArr[i].name;
        newProjectDiv.addEventListener("click", () => {
          window.location.assign(
            `/Defects-management-app/dashboard-html/project-template.html?page=${projectsArr[i].name}`
          );
        });
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
            if (
              element.priority === priorityOptions[1] &&
              element.status !== statusOptions[4]
            )
              totalHigh += 1;
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

/***** Dashboard Functions *****/
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
export const statusPieChart = (yValues) => {
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
        backgroundColor: ["#1c4e80", "#ea6a47", "#0091d5", "green"],
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
        title: {
          display: true,
          text: "Total defects by status",
        },
      },
    },
  });
};

// Function that displays the bar chart of issues per month
export const dateBarChart = () => {
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

    //Creates the bar chart
    new Chart(barChart, {
      type: "bar",
      data: barChartData,
    });
  });
};

// Function that displays the bar chart of issues per month, separated by priority
export const datePriorityBarChart = () => {
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
  const yValuesHigh = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const yValuesMedium = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const yValuesLow = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  issueCountAllMonthPriority().then((issuesMonth) => {
    for (let month of xValues) {
      if (issuesMonth.hasOwnProperty(month)) {
        // Find the index of that month
        let index = xValues.indexOf(month);
        yValuesHigh[index] += issuesMonth[month][priorityOptions[1]];
        yValuesMedium[index] += issuesMonth[month][priorityOptions[2]];
        yValuesLow[index] += issuesMonth[month][priorityOptions[3]];
      }
    }

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
      options: {
        plugins: {
          title: {
            display: true,
            text: "Number of defects by priority",
          },
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
            grid: { display: false },
          },
          y: {
            stacked: true,
            title: { display: true, text: "Total number" },
            ticks: {
              beginAtZero: true,
              callback: function (value) {
                if (value % 1 === 0) {
                  return value;
                } else {
                  return "";
                }
              },
            },
          },
        },
      },
    });
  });
};
