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
// Object containing the project names with the responding project ID on firestore
const projectIDs = {};

//Functions//
// Get an array of all the projects objects (get all documents from a collection). Sort by ascending project number
// Works
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
// Works
export async function getProjectData(projectName) {
  // array of all projects
  const allProjects = await getProjectDataAll();
  // find the index of the specified project and return the data as an object
  let index = allProjects.findIndex((obj) => obj.name === projectName);
  const projectObj = allProjects[index];
  return projectObj; //this object includes the document id under field name "id"
}

//Return the current number of projects in the database
// Works
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
    issuesArr: [{ initialise: "NA" }],
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

// Add a new issue to the database for a specified project
//Works
export async function addIssueDB(projectName, newIssueObj) {
  const projectObj = await getProjectData(projectName);
  const arr = projectObj.issuesArr;
  arr.push(newIssueObj);

  // update document field name "issuesArr"
  const docRef = doc(db, users[0], projectObj.id);
  updateDoc(docRef, { issuesArr: arr });
}

// Update an issue in a specified project
export async function updateIssueDB(projectName) {
  // Get the document ID

  const docRef = (db, users[0], docID);
  const data = {
    issuesArr: [],
  };
}

// Returns the total number of issues for all projects

// Keep track of and return the last issue id number
export async function lastNumber(projectName) {
  const arr = await getProjectIssues(projectName);

  if (arr.length === 1) {
    return 0;
  } else {
    return arr[arr.length - 1].number;
  }
}

// Get all the project IDs and corresponding project name
