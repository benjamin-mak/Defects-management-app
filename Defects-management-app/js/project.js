/**** Event handlers object ****/
const eventHandlers1 = {
  //Add a new issue
  addIssue: () => {
    issueCount += 1;
    let issueHTML = `<div class="issue-main-container" id="${issueCount}"> <div class="issue-btns"> <button id="update-btn">Update</button><button id="delete-btn">Delete</button></div><div class="issue-sub-container"> <div class="issue-container-left"> <div class="row"> <div class="row-box"> <div>Issue number</div> <div class="issue-number">${issueCount}</div>   </div> <div class="row-box"> <div>Priority</div>  <select>  <option>High</option> <option>Medium</option> <option>Low</option> </select> </div> <div class="row-box"> <div>Date</div> <input type="date" /> </div> <div class="row-box"> <div>Status</div> <select> <option>To assign</option>  <option>To rectify</option>              <option>For inspection</option> <option>Closed</option> </select> </div>  </div> <label for="freeform">Description:</label>        <br />        <textarea id="freeform" name="freeform" rows="10" cols="70">        </textarea>      </div>      <div class="issue-container-right">        <button>Click to upload</button>        <div><img src="" alt="image" /></div>      </div>    </div>  </div>`;
    const main = document.querySelector("#main-background");
    main.innerHTML += issueHTML;
  },
};

/**** Buttons ****/
//Add issue button - on click, adds a new issue to the project page
document
  .querySelector("#add-issue-btn")
  .addEventListener("click", eventHandlers1.addIssue);

/* Global variables */
let issueCount = 0;

/* Main script */
//Change title of project
document.querySelector("title").textContent = `Projects | ${projects[0].Name}`;
document.querySelector("#project-title").textContent = projects[0].Name;
