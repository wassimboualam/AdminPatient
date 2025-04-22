//Required package
var pdf = require("pdf-creator-node");
var fs = require("fs");

class PdfMaker {
    constructor(data, template="./rss/pdfTemplate.html", path="./output.pdf", options= {format:"A3"}) {
        this.setDocument(template, data, path);
        this._options = options;
        console.log("PdfMaker instance has been made");
        this.pdfHasBeenCreated = false;     
    }


    setDocument(template, data, path) {
        
        this.document = {
            html : fs.readFileSync(template, "utf8"),
            data,
            path,
            type:""
        };
    }

    get options() {
        return this._options;
    }

    set options(newOptions) {
        Object.assign(this._options, newOptions)
    }

    createPdf() {
        return new Promise((resolve, reject) => {
            pdf
            .create(this.document, this.options)
              .then((res) => {
                  console.log("pdf in " + res.filename + " has been created");
                  this.pdfHasBeenCreated = true;
                  resolve();
              })
              .catch((error) => {
                  console.error(error);
                  reject();
              });
            
        }) 
    }
}

var data = {"users" :[
    {
      name: "Shyam",
      age: "26",
    },
    {
      name: "Navjot",
      age: "26",
    },
    {
      name: "Vitthal",
      age: "26",
    }
  ]};

// const maker1 = new PdfMaker(data);
// maker1.createPdf();

module.exports = PdfMaker;