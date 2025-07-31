import { initThemeToggle, highlightNavLinks } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  highlightNavLinks();
  initThemeToggle();

  // Animate content fade in
  const servicesOverview = document.getElementById('services-overview');
  if (servicesOverview) {
    servicesOverview.classList.add('animate__fadeIn');
  }

  const otherServices = document.getElementById('other-services');
  if (otherServices) {
    otherServices.classList.add('animate__fadeInUp');
  }
});
