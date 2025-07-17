document.addEventListener('DOMContentLoaded', () => {
  // Highlight active nav link
  const navLinks = document.querySelectorAll('nav.navbar a');
  navLinks.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

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

  form.addEventListener('submit', (e) => {
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
      // Simulate form submission
      alert('Thank you for contacting SecureLink! We will get back to you shortly.');
      form.reset();
    }
  });

  // Light/Dark mode toggle (reuse from main.js if needed)
  const toggle = document.getElementById('toggle');
  if (toggle) {
    toggle.addEventListener('change', () => {
      if (toggle.checked) {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        toggle.setAttribute('aria-checked', 'true');
      } else {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        toggle.setAttribute('aria-checked', 'false');
      }
    });

    // Initialize mode based on prefers-color-scheme
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    if (prefersLight) {
      toggle.checked = true;
      document.body.classList.add("light-mode");
      toggle.setAttribute('aria-checked', 'true');
    } else {
      toggle.checked = false;
      document.body.classList.add("dark-mode");
      toggle.setAttribute('aria-checked', 'false');
    }
  }
});
