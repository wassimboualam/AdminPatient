// To make GET query string the default values for the inputs
const urlParams = new URLSearchParams(window.location.search);
try {
    document.querySelector("[name='id']").value = urlParams.get('id');
    document.querySelector("[name='name']").value = urlParams.get('name');
    document.querySelector("[name='consultation']").value = urlParams.get('consultation');
    
} catch (error) {
    console.error(error)
}

// To turn the POST request into a PUT request

const submitButton = document.querySelector("[type='submit']");


