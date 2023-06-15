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
