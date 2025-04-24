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

function updateObject(params) {
    
}

class PatientsHandler {
    constructor () {
        this.path = "./patients.json";
        this._patients = [];
        this.latestIndex = 0;
        this.copyPatientsFromFile();
    }

    getAllPatients(withDels = false) {
        return this.patients.filter(p => withDels? p:!p.deleted)
    }

    addPatient(patientData) {
        // Verifies necessary data before addition
        if (!patientData.name) throw new Error("name not present");
        if (!patientData.consultation) throw new Error("consultation not present");

        // add new patient
        let newPatient = {"id":this.getLatestIndex(), ...patientData, "deleted": false};
        this.patients = [...this.patients, newPatient];
        return newPatient;
    }

    showPatients() {
        // create copy of the patients array with copies of the patients
        const newPatients = this.getAllPatients().map(patient => copyObject(patient));
        // return the copy but with each object missing the p.deleted property
        return newPatients.map(p => {
            delete p.deleted;
            return p;
        });
         
    }

    getPatient(id) {
        return this.showPatients().find(patient => patient.id == id);
    }

    updatePatient(id, patientData) {
        const patientToUpdate = this.patients.find(p=>p.id == id);
        patientToUpdate.name = patientData.name;
        patientToUpdate.consultation = patientData.consultation;
        this.pastePatientsToFile();
    }

    deletePatient(id) {
        const patientToKill = this.patients.find(p=>p.id == id);
        patientToKill.deleted = true;
        this.pastePatientsToFile();
        return patientToKill;
    }

    clearPatients() {
        this.patients = [];
    }

    get patients(){
        this.copyPatientsFromFile();
        return this._patients;
    }

    set patients(newPatients){
        this._patients = newPatients;
        this.pastePatientsToFile();
    }


    copyPatientsFromFile() {
        this._patients = fs.readFileSync(this.path, {encoding:"utf-8"});
        this._patients = JSON.parse(this._patients);
        this.getLatestIndex();
    }
    
    pastePatientsToFile() {
        fs.writeFileSync(this.path, JSON.stringify(this._patients));
    }

    getLatestIndex() {
        const arr = this._patients.length? this._patients:[{id:0}];
        this.latestIndex = Math.max(...arr.map(p=>p.id))+1;
        
        return this.latestIndex;
    }
    
    
}


module.exports = PatientsHandler;