/**** Event handlers object ****/
const eventHandlers1 = {
  //Add a new issue
  addIssue: () => {
    issueCount += 1;
    // html code containing all the elements
    let issueHTML = `<div class="issue-main-container" id="${issueCount}"> 
    <div class="issue-btns"> <button class="update-btn">Update</button> <button class="delete-btn">Delete</button></div>
    <div class="issue-sub-container"> 
    <div class="issue-container-left"> 
    <div class="row"> 
    <div class="row-box"> <div>Issue number</div> <div class="issue-number">${issueCount}</div> </div> <div class="row-box"> <div>Priority</div>  <select class="priority">  <option>High</option> <option>Medium</option> <option>Low</option> </select> </div> 
    <div class="row-box"> <div>Date</div> <input type="date" class="date-input"/> </div> 
    <div class="row-box"> <div>Status</div> <select class="status"> <option>To assign</option>  <option>To rectify</option> <option>For inspection</option> <option>Closed</option> </select> </div>  </div> <label for="freeform">Description:</label>        <br />        <textarea class="freeform" name="freeform" rows="10" cols="70">        </textarea>      </div>      
    <div class="issue-container-right"> <button>Click to upload</button> <div><img src="" alt="image" /></div>      </div>    </div>  </div>`;
    // prepend each issue right after the title
    const parent = document.querySelector("#main-background");
    parent.firstElementChild.insertAdjacentHTML("afterend", issueHTML);
  },

  // Updates an issue
  updateIssue: () => {
    document.querySelector(".update-btn").addEventListener("click", (e) => {
      // selecting the issue-main-container node
      let issueIdNum = Number(
        e.target.parentNode.parentNode.getAttribute("id")
      );
      let issueId = e.target.parentNode.parentNode;
      let p = issueId.querySelector("select.priority");
      let s = issueId.querySelector("select.status");
      //Check if issue is in the issues array
      if (issuesArr.some((obj) => obj.issueNum === issueIdNum)) {
        // Get index of that issue in the array
        let index = issuesArr.findIndex((obj) => obj.issueNum === issueIdNum);
        // Update priority
        issuesArr[index].priority = p.options[p.selectedIndex].text;
        // Update date
        issuesArr[index].date = issueId.querySelector(".date-input").value;
        // Update status
        issuesArr[index].status = s.options[s.selectedIndex].text;
      } else {
        //If not create a new object and add to the issue array
        let newIssueObj = {};
        newIssueObj.issueNum = issueIdNum;
        newIssueObj.priority = p.options[p.selectedIndex].text;
        newIssueObj.date = issueId.querySelector(".date-input").value;
        newIssueObj.status = s.options[s.selectedIndex].text;
        issuesArr.push(newIssueObj);
      }
    });
  },
};

/**** Buttons ****/
//Add issue button - on click, adds a new issue to the project page
document
  .querySelector("#add-issue-btn")
  .addEventListener("click", eventHandlers1.addIssue);
//Add issue button - on click, adds an event handler to the update button
document
  .querySelector("#add-issue-btn")
  .addEventListener("click", eventHandlers1.updateIssue);

/*** Functions ***/

/* Global variables */
let issueCount = 0;
// Array of objects to store data
const issuesArr = []; // { issueNum: 1, priority: "", date: "", status: "" }

const priority = ["Low", "Medium", "High"];
const status = ["To assign", "To rectify", "For inspection", "Closed"];

/* Main script */
// Change title of project
// document.querySelector("title").textContent = `Projects | ${projects[0].Name}`;
// document.querySelector("#project-title").textContent = projects[0].Name;
