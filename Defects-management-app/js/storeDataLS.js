function saveData(projectTitle, dataInput) {    
    localStorage.setItem(projectTitle, JSON.stringify(dataInput));
}

function getProjectData(projectTitle) {
    const stringData = localStorage.getItem(projectTitle);
    const dataObject = stringData ? JSON.parse(stringData) : [];
    return dataObject;
}