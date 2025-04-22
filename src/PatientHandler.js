const fs = require("fs");
// const applyCopyObject = require("./tests/src/copyObject");
// applyCopyObject()  
// function applyCopyObject() {
//     Object.prototype.copyObject = function () {
//        return JSON.parse(JSON.stringify(this))
//     } 
// }

function copyObject (obj) {
    return JSON.parse(JSON.stringify(obj))
} 

class PatientsHandler {
    constructor () {
        this.path = "./patients.json";
        this.patients = [];
        this.latestIndex = 0;
        this.copyPatientsFromFile();
    }

    getAllPatients(withDels = false) {
        this.copyPatientsFromFile();
        return this.patients.filter(p => withDels? p:!p.deleted)
    }

    addPatient(patientData) {
        if ((!patientData.name)) throw new Error("name not present");
        if ((!patientData.consultation)) throw new Error("consultation not present");

        let newPatient = {"id":this.getLatestIndex(), ...patientData, "deleted": false};
        this.copyPatientsFromFile()
        this.patients.push(newPatient);
        this.pastePatientsToFile();
        return newPatient;
    }

    showPatients() {
        const newPatients = this.getAllPatients().map(patient => copyObject(patient));
        return newPatients.map(p => {
            delete p.deleted;
            return p;
        });
         
    }

    getPatient(id) {
        return this.showPatients().find(patient => patient.id == id);
    }

    updatePatient(id, patientData) {
        this.copyPatientsFromFile();
        const patientToUpdate = this.patients.find(p=>p.id == id);
        patientToUpdate.name = patientData.name;
        patientToUpdate.consultation = patientData.consultation;
        this.pastePatientsToFile()
    }

    deletePatient(id) {
        this.copyPatientsFromFile();
        const patientToKill = this.patients.find(p=>p.id == id);
        patientToKill.deleted = true;
        this.pastePatientsToFile();
        return patientToKill;
    }

    clearPatients() {
        this.patients = [];
        this.pastePatientsToFile();
    }

    copyPatientsFromFile() {
        this.patients = fs.readFileSync(this.path, {encoding:"utf-8"});
        this.patients = JSON.parse(this.patients);
        this.getLatestIndex();
    }
    
    pastePatientsToFile() {
        fs.writeFileSync(this.path, JSON.stringify(this.patients));
    }

    getLatestIndex() {
        const arr = this.patients.length? this.patients:[{id:0}];
        this.latestIndex = Math.max(...arr.map(p=>p.id))+1;
        
        return this.latestIndex;
    }
    
}


module.exports = PatientsHandler;