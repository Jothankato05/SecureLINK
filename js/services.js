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
  const servicesOverview = document.getElementById('services-overview');
  if (servicesOverview) {
    servicesOverview.classList.add('animate__fadeIn');
  }

  const otherServices = document.getElementById('other-services');
  if (otherServices) {
    otherServices.classList.add('animate__fadeInUp');
  }

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
