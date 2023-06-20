import db from "./firebase-info.js";
// import firebase methods
import {
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

/*  ---Documentation---
- Each collection in firestore db will be tied to a user
- Each document in the collection will be a project
*/

// Will use an admin account for now to store data
const users = ["Admin-account"]; // Array that stores users

//Functions//
// Get an array of all the projects objects (get all documents from a collection). Sort by ascending project number
export async function getProjectDataAll() {
  const documentArr = [];
  try {
    const colRef = collection(db, users[0]);
    const docsSnap = await getDocs(colRef);

    docsSnap.forEach((doc) => {
      documentArr.push({ id: doc.id, ...doc.data() });
    });
    documentArr.sort((a, b) => {
      return a.number - b.number;
    });
  } catch (err) {
    console.error("Error retrieving all projects", err);
  }

  return documentArr;
}

// Get the data as an object for a specified project
export async function getProjectData(projectName) {
  // array of all projects
  const allProjects = await getProjectDataAll();
  // find the index of the specified project and return the data as an object
  let index = allProjects.findIndex((obj) => obj.name === projectName);
  const projectObj = allProjects[index];
  return projectObj; //this object includes the document id under field name "id"
}

//Return the current number of projects in the database
export async function projectCount() {
  const arr = await getProjectDataAll();
  return arr.length;
}

// Add a new project to the database
export async function addProjectToDB(projectName, num) {
  const collectionRef = collection(db, users[0]);
  const project = {
    number: num,
    name: projectName,
    issuesArr: [
      { number: 1, priority: "-", date: "-", status: "-", description: "-" },
    ],
  };
  try {
    await addDoc(collectionRef, project);
  } catch (err) {
    console.error("Error adding project", err);
  }
}

// Get the array of all issues for the specified project, sorted by ascending number
export async function getProjectIssues(projectName) {
  const projectObj = await getProjectData(projectName);
  const arr = projectObj.issuesArr;
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
export async function issueCount(projectName) {
  const arr = await getProjectIssues(projectName);
  return arr.length;
}

// Returns the total number of issues for all projects
export async function issueCountAll() {
  const allProjects = await getProjectDataAll();
  let total = 0;
  for (let obj of allProjects) {
    total += obj.issuesArr.length;
  }
  return total;
}

// Add a new issue to the database for a specified project
export async function addIssueDB(projectName, newIssueObj) {
  const projectObj = await getProjectData(projectName);
  const arr = projectObj.issuesArr;
  arr.push(newIssueObj);

  // update document field name "issuesArr"
  const docRef = doc(db, users[0], projectObj.id);
  updateDoc(docRef, { issuesArr: arr });
}

// Update an issue of a specified project in the database
export async function updateIssueDB(projectName, issueArr) {
  // Get the document ID
  const projectObj = await getProjectData(projectName);
  const docRef = doc(db, users[0], projectObj.id);
  updateDoc(docRef, { issuesArr: issueArr });
}

// Keep track of and return the last issue id number
export async function lastNumber(projectName) {
  const arr = await getProjectIssues(projectName);

  if (arr.length === 1) {
    return 1;
  } else {
    return arr[arr.length - 1].number;
  }
}

// Returns an object of total number of issues for all projects split by month
export async function issueCountAllMonth() {
  const dateObj = {};
  const allProjects = await getProjectDataAll();
  for (let obj of allProjects) {
    // For each project object, loop through each issue
    for (let i = 0; i < obj.issuesArr.length; i++) {
      // Get the month of each issue
      let dateString = obj.issuesArr[i].date;
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

// Get all the project IDs and corresponding project name
