import {
  addIssueDB,
  getProjectDataAll,
  getProjectData,
  projectCount,
  getProjectIssues,
  updateIssueDB,
  lastNumber,
} from "../data-storage-js/firebase-db.js";

import { eventHandlers, removeSiblings, userLogout } from "./functions.js";

/***** Event handlers object *****/
const eventHandlersProject = {
  //Displays all issues on the page
  displayIssues: () => {
    //clear all issues from the page
    removeSiblings("h1#project-title");
    let title = document.querySelector("h1#project-title");

    //Display all the issues for that project
    getProjectIssues(getProjectName()).then((allIssues) => {
      if (allIssues.length > 0) {
        for (let issue of allIssues) {
          // html code containing all the elements for a new issue
          let issueHTML = `<div class="issue-main-container" id="${issue.number}"> 
          <div class="issue-btns"> <button class="update-btn">Update</button> <button class="delete-btn">Delete</button></div>
          <div class="issue-sub-container"> 
          <div class="issue-container-left"> 
          <div class="row"> 
          <div class="row-box"> <div>Issue number</div> <div class="issue-number">${issue.number}</div> </div> 
          <div class="row-box"> <div>Priority</div>  
          <select class="priority"> <option>${priorityOptions[0]}</option> <option>${priorityOptions[1]}</option> <option>${priorityOptions[2]}</option> <option>${priorityOptions[3]}</option> </select> <div>${issue.priority}</div> </div> 
          <div class="row-box"> <div>Date</div> <input type="date" class="date-input"/> <div>${issue.date}</div> </div> 
          <div class="row-box"> <div>Status</div> <select class="status"> <option>${statusOptions[0]}</option> <option>${statusOptions[1]}</option> <option>${statusOptions[2]}</option> <option>${statusOptions[3]}</option> <option>${statusOptions[4]}</option> </select> <div>${issue.status}</div> </div>  </div> 
          <label for="freeform">Description:</label> <br /> <textarea class="freeform" name="freeform" rows="10" cols="70">${issue.description}</textarea> </div>      
          <div class="issue-container-right"> <button>Click to upload</button> <div><img src="" alt="image" /> </div> </div> </div> </div>`;
          // prepend each issue right after the title
          title.insertAdjacentHTML("afterend", issueHTML);

          eventHandlersProject.updateIssue();
          eventHandlersProject.deleteIssue();
        }
      }
    });
  },

  //Add and displays a new issue on page
  addIssue: () => {
    // Get the issue number
    lastNumber(getProjectName()).then((result) => {
      let lastNum = result + 1;
      const newIssue = {
        number: lastNum,
        priority: "-",
        date: "",
        status: statusOptions[1],
        description: "",
      };

      //Save to DB
      addIssueDB(getProjectName(), newIssue);

      // Display issue on page
      // html code containing all the elements for a new issue
      let issueHTML = `<div class="issue-main-container" id="${lastNum}"> 
      <div class="issue-btns"> <button class="update-btn">Update</button> <button class="delete-btn">Delete</button></div>
      <div class="issue-sub-container"> 
      <div class="issue-container-left"> 
      <div class="row"> 
      <div class="row-box"> <div>Issue number</div> <div class="issue-number">${lastNum}</div> </div> 
      <div class="row-box"> <div>Priority</div> <select class="priority"> <option>--Select--</option>  <option>High</option> <option>Medium</option> <option>Low</option> </select> <div></div> </div> 
      <div class="row-box"> <div>Date</div> <input type="date" class="date-input"/> <div></div> </div> 
      <div class="row-box"> <div>Status</div> <select class="status"> <option>--Select--</option> <option>To assign</option>  <option>To rectify</option> <option>For inspection</option> <option>Closed</option> </select> <div></div> </div>  </div> <label for="freeform">Description:</label>        <br />        <textarea class="freeform" name="freeform" rows="10" cols="70">        </textarea>      </div>      
      <div class="issue-container-right"> <button>Click to upload</button> <div><img src="" alt="image" /></div>      </div>    </div>  </div>`;
      // prepend each issue right after the title
      const title = document.querySelector("h1#project-title");
      title.insertAdjacentHTML("afterend", issueHTML);

      eventHandlersProject.updateIssue();
      eventHandlersProject.deleteIssue();
    });
  },

  // Updates an issue
  updateIssue: () => {
    // Opens up the popup window
    document.querySelector(".update-btn").addEventListener("click", (e) => {
      updatePopupAdd();

      // Closes the popup window
      document
        .querySelector("#update-popup-close-btn")
        .addEventListener("click", () => {
          updatePopupRemove();
        });

      // Updates the issue on confirm button click
      document
        .querySelector("#update-popup-btn")
        .addEventListener("click", () => {
          // selecting the issue-main-container node
          let issueIdNum = Number(
            e.target.parentNode.parentNode.getAttribute("id")
          );
          let issueId = e.target.parentNode.parentNode;
          let p = issueId.querySelector("select.priority");
          let s = issueId.querySelector("select.status");
          let d = issueId.querySelector(".date-input");
          let des = issueId.querySelector(".freeform");

          // Find and update the issue
          getProjectIssues(getProjectName()).then((issuesArr) => {
            let index = issuesArr.findIndex((obj) => obj.number === issueIdNum);

            // Update priority
            issuesArr[index].priority =
              p.options[p.selectedIndex].text === priorityOptions[0]
                ? issuesArr[index].priority
                : p.options[p.selectedIndex].text;
            //Update the DOM
            p.nextElementSibling.textContent =
              p.options[p.selectedIndex].text === priorityOptions[0]
                ? issuesArr[index].priority
                : p.options[p.selectedIndex].text;

            // Update date
            issuesArr[index].date =
              d.value === "" ? issuesArr[index].date : d.value;
            // Update the DOM
            d.nextElementSibling.textContent =
              d.value === "" ? issuesArr[index].date : d.value;

            // Update status
            issuesArr[index].status =
              s.options[s.selectedIndex].text === statusOptions[0]
                ? issuesArr[index].status
                : s.options[s.selectedIndex].text;
            // Update DOM
            s.nextElementSibling.textContent =
              s.options[s.selectedIndex].text === statusOptions[0]
                ? issuesArr[index].status
                : s.options[s.selectedIndex].text;

            // Update description
            issuesArr[index].description = des.value;
            // Update DOM
            des.textContent = des.value;

            //Save to firebase
            updateIssueDB(getProjectName(), issuesArr);
          });
          updatePopupRemove();
        });
    });
  },

  // Deletes an issue
  deleteIssue: () => {
    document.querySelector(".delete-btn").addEventListener("click", (e) => {
      deletePopupAdd();
      console.log(e.target.parentNode.parentNode);

      //Close the popup window
      document
        .querySelector("#delete-popup-close-btn")
        .addEventListener("click", () => {
          deletePopupRemove();
        });

      document
        .querySelector("#delete-popup-btn")
        .addEventListener("click", () => {
          // let issueId = e.target.parentNode.parentNode;
          let issueIdNum = Number(
            e.target.parentNode.parentNode.getAttribute("id")
          );
          let issueId = e.target.parentNode.parentNode;
          //Remove from firebase
          getProjectIssues(getProjectName()).then((issuesArr) => {
            let index = issuesArr.findIndex((obj) => obj.number === issueIdNum);
            if (index !== -1) {
              issuesArr.splice(index, 1);
              updateIssueDB(getProjectName(), issuesArr);
            }

            // Remove from DOM
            issueId.remove();
          });

          //Close confirm popup
          deletePopupRemove();
        });
    });
  },
};

/***** Functions *****/
// Adds the confirm window when deleting an issue
const deletePopupAdd = () => {
  document.querySelector("#delete-popup-id").classList.add("active");
  document.querySelector("#overlay").classList.add("active");
};

//Removes the confirm window when deleting an issue
const deletePopupRemove = () => {
  document.querySelector("#delete-popup-id").classList.remove("active");
  document.querySelector("#overlay").classList.remove("active");
};

//Adds the confirm window when updating an issue
const updatePopupAdd = () => {
  document.querySelector("#update-popup-id").classList.add("active");
  document.querySelector("#overlay2").classList.add("active");
};

//Removes the confirm window when updating an issue
const updatePopupRemove = () => {
  document.querySelector("#update-popup-id").classList.remove("active");
  document.querySelector("#overlay2").classList.remove("active");
};

// Get the current project name from the current url parameter
const getProjectName = () => {
  const params = new URLSearchParams(window.location.search);
  let projectName = params.get("page");
  return projectName;
};

/***** Buttons *****/
//Add issue button - on click, adds a new issue to the project page
document
  .querySelector("#add-issue-btn")
  .addEventListener("click", eventHandlersProject.addIssue);
//Add issue button - on click, adds an event handler to the update button
// document
//   .querySelector("#add-issue-btn")
//   .addEventListener("click", eventHandlersProject.updateIssue);
// //Add issue button - on click, adds an event handler to the delete button
// document
//   .querySelector("#add-issue-btn")
//   .addEventListener("click", eventHandlersProject.deleteIssue);

// Home button - On click, returns to home dashboard
document
  .querySelector("#home-btn")
  .addEventListener("click", eventHandlers.dashboardHome);

// Logout button - On click logouts and returns to login page
document.querySelector("#logout-btn").addEventListener("click", (e) => {
  e.preventDefault();
  userLogout();
});

/***** Other event listeners *****/
// On refresh of dashboard page - display all projects in the project tab
// window.addEventListener("load", eventHandlers.displayProjects);
// On refresh of dashboard page - display all issues on the webpage
// window.addEventListener("load", eventHandlersProject.displayIssues);

/* Main script */
//Update header title
document.querySelector("head title").textContent =
  "Project | " + getProjectName();

//Update project title on main page
document.querySelector("h1#project-title").textContent = getProjectName();

// Display all projects on first load
eventHandlers.displayProjects();

// Display all issues on first load
eventHandlersProject.displayIssues();
