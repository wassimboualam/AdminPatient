const express = require("express");
const PatientsHandler = require("../src/PatientHandler");
const methodConverter = require("./middleware/methodConverter");
const formatQuery = require("./middleware/formatQuery");
const PdfMaker = require("../src/pdfMaker");
const path = require("path");

const patientsHandler = new PatientsHandler();
const router = express.Router();

router.use(express.urlencoded({extended:true}))

// middleware for turning POST forms into other methods
router.use(methodConverter)

// middleware to format variables as strings in pug 
router.use(formatQuery);

// directs to form for adding a new patient
router.get("/add", (req,res) => {
    console.log("Went to addForm");
    return res.render("addForm");
})

// receives new patient data
router.post("/add", (req,res) => {
    console.log("Sent addForm")
    let msg = "";
    try {
        // try to insert patient ...
        patientsHandler.addPatient(req.body);
        // in case of successful insertion
        msg = "Patient "+req.body.name+" has been added";
    } catch (err) {
        msg = err.message;
        console.log(err);
    }
    msg = encodeURIComponent(msg);
    res.redirect("/?msg="+msg);
})




// directs to form for updating a patient
router.get("/update", (req,res) => {
    console.log("Went to updateForm");
    const {id, name, consultation}  = req.newQuery;

    return res.render("updateForm", {id, name, consultation});
})

// receives new patient data
router.put("/update", (req,res) => {
    console.log("Sent updateForm");
    let msg = "";
    try {
        // try to insert patient ...
        patientsHandler.updatePatient(req.body.id, {name: req.body.name, consultation: req.body.consultation});
        // in case of successful update
        msg = "Patient "+req.body.name+" has been updated";
    } catch (err) {
        msg = err.message;
        console.log(err);
    }
    msg = encodeURIComponent(msg);
    res.redirect("/?msg="+msg);
})


router.get("/delete", (req,res) => {
    console.log("Went to deleteForm");
    const {id, name}  = req.newQuery;

    return res.render("deleteForm", {id, name});
});

router.delete("/delete", (req,res) => {
    console.log("Sent deleteForm");
    let msg = "";
    try {
        // try to delete patient
        patientsHandler.deletePatient(req.body.id);

        // in case deletion is successful
        msg = "Patient "+req.body.name+" has been deleted"
    } catch (err) {
        msg = err.message;
        console.log(err);
    }
    msg = encodeURIComponent(msg);
    return res.redirect("/?msg="+msg);
});

router.get("/show", (req,res) => {
    
    const {id, name, consultation} = patientsHandler.getPatient(req.query.id);
    console.log("Went to showPatient page for patient: "+name)
    return res.render("showPatient", {id, name, consultation});
});


router.get("/pdf", async (req,res) => {
    
    const {id, name, consultation} = patientsHandler.getPatient(req.query.id);
    const patientData = {patient: {id, name, consultation}};
    const pdfMaker1 = new PdfMaker(patientData);

    await pdfMaker1.createPdf();
    
    const op = {root : path.join("D:\\projects\\admin_patient")};

    return res.sendFile('/output.pdf', op, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log("output.pdf has been sent");
        }
    });
    return res.send({data:"done"});
});




module.exports = router;