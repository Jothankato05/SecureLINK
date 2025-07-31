import { initThemeToggle, highlightNavLinks } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  highlightNavLinks();
  initThemeToggle();

  // Animate content fade in
  const contactSection = document.getElementById('contact-section');
  if (contactSection) {
    contactSection.classList.add('animate__fadeIn');
  }

  // Form validation
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let valid = true;

    if (nameInput.value.trim() === '') {
      nameError.textContent = 'Please enter your name.';
      valid = false;
    } else {
      nameError.textContent = '';
    }

    if (!validateEmail(emailInput.value.trim())) {
      emailError.textContent = 'Please enter a valid email address.';
      valid = false;
    } else {
      emailError.textContent = '';
    }

    if (messageInput.value.trim() === '') {
      messageError.textContent = 'Please enter your message.';
      valid = false;
    } else {
      messageError.textContent = '';
    }

    if (valid) {
      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
          alert('Thank you for contacting SecureLink! We will get back to you shortly.');
          form.reset();
        } else {
          alert('Submission failed. Please try again.');
        }
      } catch (error) {
        alert('An error occurred. Please try again later.');
      }
    }
  });
});
