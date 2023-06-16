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

// Get an array of all the local storage values, sorted by project id
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
