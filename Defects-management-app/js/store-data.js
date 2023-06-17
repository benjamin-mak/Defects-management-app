/*** Global Variables ****/
const priorityOptions = ["--Select--", "High", "Medium", "Low"];
const statusOptions = [
  "--Select--",
  "To assign",
  "To rectify",
  "For inspection",
  "Closed",
];

// Functions //
// Save project to the session storage
function saveProject(projectName, projectDataObj) {
  localStorage.setItem(projectName, JSON.stringify(projectDataObj));
}

// Retrieve project data as an object from the session storage
function getProjectDataObj(projectName) {
  const stringData = localStorage.getItem(projectName);
  const dataObj = stringData ? JSON.parse(stringData) : {};
  return dataObj;
}

// Get an array of all the local storage values objects, sorted by project id
function getProjectDataObjAll() {
  const valuesArr = [];
  const keys = Object.keys(localStorage);
  for (let key of keys) {
    let obj = getProjectDataObj(key);
    valuesArr.push(obj);
  }
  // Sort the array by id
  valuesArr.sort((a, b) => {
    return a.id - b.id;
  });
  return valuesArr;
}

// Returns the current number of projects in storage
function projectCount() {
  return getProjectDataObjAll().length;
}

// Get the array of all issues for the specified project, sorted by ascending number
function getProjectIssues(projectName) {
  const obj = getProjectDataObj(projectName);
  //Sort the array by number
  const arr = obj.issueArr;
  if (arr.length === 0) {
    return [];
  } else {
    arr.sort((a, b) => {
      return a.number - b.number;
    });
    return arr;
  }
}

// Returns the current total number of issues for the specified project
function issueCount(projectName) {
  return getProjectIssues(projectName).length;
}

// Returns the total number of issues for all projects
function issueCountAll() {
  let totalCount = 0;
  const allProjects = getProjectDataObjAll();
  for (let obj of allProjects) {
    totalCount += obj.issueArr.length;
  }
  return totalCount;
}

// Returns an object of total number of issues for all projects split by month
function issueCountAllDate() {
  const dateObj = {};
  const allProjects = getProjectDataObjAll();
  for (let obj of allProjects) {
    // For each project object, loop through each issue
    for (let i = 0; i < obj.issueArr.length; i++) {
      // Get the month of each issue
      let dateString = obj.issueArr[i].date;
      let date = new Date(dateString);
      let month = date.toLocaleString("default", { month: "short" });
      // if month is in dateObj, add 1 to month
      if (dateObj.hasOwnProperty(month)) {
        dateObj[month] += 1;
      } else {
        // else add month to dateObj
        dateObj[month] = 1;
      }
    }
  }

  return dateObj;
}

// Returns an object of the number of issues split by month and priority
function issueCountDatePriority() {
  const dateObj = {};
  const allProjects = getProjectDataObjAll();
  for (let obj of allProjects) {
    // For each project object, loop through each issue
    for (let i = 0; i < obj.issueArr.length; i++) {
      // Get the month of each issue
      let dateString = obj.issueArr[i].date;
      let date = new Date(dateString);
      let month = date.toLocaleString("default", { month: "short" });

      let priority = obj.issueArr[i].priority;

      // if month is in dateObj, add 1 to month
      if (dateObj.hasOwnProperty(month)) {
        dateObj[month][priority] += 1;
      } else {
        // else add month to dateObj
        dateObj[month] = { High: 0, Medium: 0, Low: 0 };
        dateObj[month][priority] += 1;
      }
    }
  }

  return dateObj;
}

// Keep track of and return the last issue id number
function lastNumber(projectName) {
  const arr = getProjectIssues(projectName);
  if (arr.length === 0) {
    return 0;
  } else {
    return arr[arr.length - 1].number;
  }
}

// Update the issues array of a particular project by passing in the project name and new issues array
function updateIssueLS(projectName, newissueArr) {
  const newProjectObj = getProjectDataObj(projectName);
  newProjectObj.issueArr = newissueArr;
  saveProject(projectName, newProjectObj);
}

// Stores an issue in localstorage for a specified issue number and project name
function addNewIssueLS(projectName, issueNum) {
  const projectObj = getProjectDataObj(projectName);
  const arr = getProjectIssues(projectName);
  const newIssue = { number: issueNum, priority: "-", date: "-", status: "-" };
  arr.push(newIssue);
  projectObj.issueArr = arr;
  saveProject(projectName, projectObj);
}
