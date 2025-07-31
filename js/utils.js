export function initThemeToggle() {
  const toggle = document.querySelector('input[name="toggle"]');
  if (toggle) {
    toggle.addEventListener('click', () => {
      toggle.removeAttribute('class');
      if (toggle.checked) {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
      } else {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
      }
    });
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    if (prefersLight) {
      toggle.checked = true;
      document.body.classList.add('light-mode');
    } else {
      toggle.checked = false;
      document.body.classList.add('dark-mode');
    }
  }
}

export function highlightNavLinks() {
  const navLinks = document.querySelectorAll('nav.navbar a');
  navLinks.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}
