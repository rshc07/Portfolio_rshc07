function downloadCV() {
    const link = document.createElement('a');
    link.href = '/assets/Hemachandran_RS_CV.pdf'; // Replace with the actual path to your CV
    link.download = 'Hemachandran_RS_CV.pdf';
    link.click();
}

function fetchWithTimeout(resource, options = {}) {
    const { timeout = 8000 } = options;

    return Promise.race([
        fetch(resource, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Request timeout')), timeout)
        )
    ]);
}

function submitToGoogleSheets(event) {
    console.log("Form submission intercepted.");
    event.preventDefault();

    const name = document.querySelector('[name="Name"]').value.trim();
    const email = document.querySelector('[name="Email"]').value.trim();
    const message = document.querySelector('[name="Message"]').value.trim();

    if (!name || !validateEmail(email) || !message) {
        alert('Please fill all fields with valid data.');
        return;
    }

    const scriptURL = 'https://script.google.com/macros/s/AKfycbx3VAsfHjb_smc3cjsGaQsJKjNDiN0-RiT5l3Y_j7kCSK57XsO8rCJGVQK7lZW3OpJV/exec';
    const formData = new FormData();
    formData.append('Name', name);
    formData.append('Email', email);
    formData.append('Message', message);

    fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'success') {
                alert('Thank You!, Your message has been sent successfully😊.');
                document.querySelector('.contact-form').reset();
                window.location.href = "#home";
                
            } else {
                throw new Error(data.message || 'Unexpected response format');
            }
        })
        .catch(error => {
            console.error('Error occurred:', error);
            alert('An error occurred while sending your message. Please try again later.');
        });
}
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});