function downloadCV() {
    const link = document.createElement('a');
    link.href = 'path-to-your-cv.pdf'; // Replace with the actual path to your CV
    link.download = 'Hemachandran_RS_CV.pdf';
    link.click();
}

function submitToGoogleSheets(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const scriptURL = 'https://script.google.com/macros/s/your-script-id/exec'; // Replace with your Google Apps Script URL
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);

    fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => {
            alert('Message successfully sent!');
            document.querySelector('.contact-form').reset();
        })
        .catch(error => {
            console.error('Error!', error.message);
            alert('There was an error sending your message. Please try again later.');
        });
}