const exampleFnc = (val) => {
    return new Promise( (resolve, reject) => {
        if(val === "Ben") {
            resolve(10);
        } else if (val === "Azman") {
            resolve(40);
        } else {
            reject("error is found");
        }
        
    });
}

exampleFnc("Azman")
  .then( res => console.log("res", res) )
  .catch( err => console.log("err", err));