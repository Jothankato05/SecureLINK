import { initThemeToggle, highlightNavLinks } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  highlightNavLinks();
  initThemeToggle();

  // Animate content fade in
  const latestNews = document.getElementById('latest-news');
  if (latestNews) {
    latestNews.classList.add('animate__fadeIn');
  }
});
