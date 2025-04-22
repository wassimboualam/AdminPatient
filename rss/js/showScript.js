const pdfButton = document.querySelector(".pdf");
const pdfAnchor = document.querySelector("[download]");
pdfAnchor.href += id;
let x;
// pdfButton.addEventListener("click", e => {
//     fetch("/pdf?id="+id)
//       .then(res=>{
//         console.log(res);
//         console.log("Response has been sent")
//         return res.arrayBuffer();

//       })
      
//       .then(file=>{
//         console.log("File has been converted")
//         console.log(file);
//         const base64Str = Buffer.from(file).toString("base64");
//         return (file);
//       });
// })