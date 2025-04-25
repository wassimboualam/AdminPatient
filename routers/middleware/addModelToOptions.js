const patientModel = require("../../src/patientModel");

// This adds patientModel to all get requests

module.exports = function addModelToOptions(req,res,next) {
    
    if(!["get", "GET"].includes(req.method)) {next();return;}
    req.getOptions = {"modelKeys":Object.keys(patientModel), "modelVals": Object.values(patientModel)};

    next();
}