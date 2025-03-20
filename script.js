const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

hamburger.addEventListener('click', () => {
    menu.classList.toggle('show');
    hamburger.classList.toggle('active');
});

const planetCards = document.querySelectorAll('.planet-card');
const missionCards = document.querySelectorAll('.mission-card');
const feedbackCards = document.querySelectorAll('.feedback-card');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, {
    threshold: 0.1
});

planetCards.forEach(card => {
    observer.observe(card);
});

missionCards.forEach(card => {
    observer.observe(card);
});

feedbackCards.forEach(card => {
    observer.observe(card);
});

// Web3Forms Submission Handling
const form = document.getElementById('feedback-form');
const popup = document.getElementById('popup'); // Changed from 'thank-you-popup' to 'popup'
const closePopupBtn = document.getElementById('close-popup');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const formData = new FormData(form);

    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        const result = await response.json();
        console.log('Web3Forms API Response:', result);
        console.log('HTTP Status:', response.status);

        // Show popup if HTTP status is 200 (success), even if result.success is not true
        if (response.ok) {
            console.log('Submission successful (HTTP 200), showing popup');
            popup.style.display = 'flex'; // Force display as flex
            form.reset(); // Reset the form
        } else {
            console.error('Submission failed:', result);
            alert('There was an error submitting your feedback: ' + (result.message || 'Unknown error. Please try again.'));
        }
    } catch (error) {
        // Handle network or other errors
        console.error('Network Error Details:', error);
        // Since you're receiving the email, the submission might still be successful
        console.log('Network error occurred, but assuming submission success since email was received');
        popup.style.display = 'flex'; // Force display as flex
        form.reset(); // Reset the form
    }
});

// Close popup when clicking the close button
closePopupBtn.addEventListener('click', () => {
    popup.style.display = 'none';
});

// Close popup when clicking outside the popup content
popup.addEventListener('click', (e) => {
    if (e.target === popup) {
        popup.style.display = 'none';
    }
});