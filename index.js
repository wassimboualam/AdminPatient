const express = require("express");
const path = require("path");
const PatientsHandler = require("./src/PatientHandler");
const router  = require("./routers/actionsRouter");
const patientModel = require("./src/patientModel");
const app = express();
const patientsHandler = new PatientsHandler();

app.set('view engine', 'pug');



// send patients data to view engine as string since it don't work otherwise
app.get("/", (req, res) => {
    console.log("Went to home page")
    // To get all patients
    let patients = patientsHandler.showPatients();
    patients = JSON.stringify(patients);
    // See if there is a message
    const msg = req.query.msg;
    return res.render("homePage", {pData:patients, msg: JSON.stringify(msg), model:Object.keys(patientModel)});    
});

// This is for ressources like stylesheets and js file to be sent without hassle
app.get(["/rss/:fileName", "/rss/:folderName/:fileName"], function (req,res) {
    const op = {root:path.join(__dirname)};
    const filePath = "rss/"+
    (req.params.folderName? req.params.folderName+"/":"")
    +req.params.fileName;
    res.sendFile(filePath, op, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log(filePath+" has been sent");
        }
    });
});

// include actionsRouter
app.use("/", router);

app.post("/", (req, res) => res.send("You made a POST request"));

app.listen(3000, () => console.log("Server ready at 3000")); 