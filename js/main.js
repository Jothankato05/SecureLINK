document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for in-page anchor links
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    if (link.id === 'learnMoreBtn') return; // Skip smooth scroll for Learn More button
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Modal functionality
  const modal = document.getElementById('modal');
  const openModalBtn = document.getElementById('learnMoreBtn');
  const closeModalBtn = document.getElementById('closeModal');

  openModalBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
  });

  closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
  });

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
    }
  });

  // Chatbot functionality
  const securebot = document.getElementById('securebot');
  const securebotToggle = document.getElementById('securebot-toggle');
  const securebotClose = document.getElementById('securebot-close');
  const securebotMessages = document.getElementById('securebot-messages');
  const securebotForm = document.getElementById('securebot-form');
  const securebotInput = document.getElementById('securebot-input');

  securebotToggle.addEventListener('click', () => {
    securebot.classList.add('open');
    securebotToggle.style.display = 'none';
    securebotInput.focus();
  });

  securebotClose.addEventListener('click', () => {
    securebot.classList.remove('open');
    securebotToggle.style.display = 'block';
  });

  // Expanded chatbot knowledge base with context awareness and fallback
  const knowledgeBase = {
    "what is securelink": "SecureLink is a next-generation emergency response system designed to keep you safe and connected. It integrates multiple devices and communication channels to ensure rapid and reliable alerts.",
    "who built securelink": "SecureLink is built by Primers Organisation, a trusted institution in Africa.",
    "how does securelink work": "SecureLink delivers multi-device emergency broadcast systems across Africa, designed for speed, security, and sovereignty.",
    "contact": "You can contact SecureLink at securelink.primersorganization@gmail.com or call +234-800-SECURE.",
    "features": "SecureLink offers real-time SOS alerts, live geolocation broadcasting, trusted contact management, emergency dashboards, data analytics, and multilingual support.",
    "security": "SecureLink uses end-to-end encryption and anonymizes user alerts to ensure privacy and security.",
    "default": "I'm sorry, I don't have information on that. Please ask about SecureLink."
  };

  let conversationContext = [];

  function addMessage(text, sender) {
    const msg = document.createElement('div');
    msg.classList.add('chatbot-message', sender);
    msg.textContent = text;
    securebotMessages.appendChild(msg);
    securebotMessages.scrollTop = securebotMessages.scrollHeight;
  }

  function getResponse(input) {
    input = input.toLowerCase();
    for (const key in knowledgeBase) {
      if (input.includes(key)) {
        return knowledgeBase[key];
      }
    }
    // Fallback response with context awareness (simple example)
    if (conversationContext.length > 0) {
      return "Let's continue our conversation. How else can I assist you?";
    }
    return knowledgeBase["default"];
  }

  securebotForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userInput = securebotInput.value.trim();
    if (!userInput) return;
    addMessage(userInput, 'user');
    securebotInput.value = '';
    conversationContext.push(userInput);

    const response = getResponse(userInput);
    setTimeout(() => addMessage(response, 'bot'), 500);
  });

  // FAQ collapsible functionality
  const faqItems = document.querySelectorAll('#faq dt');
  faqItems.forEach(item => {
    item.addEventListener('click', () => {
      const expanded = item.getAttribute('aria-expanded') === 'true';
      item.setAttribute('aria-expanded', !expanded);
      const dd = item.nextElementSibling;
      if (dd) {
        dd.style.display = expanded ? 'none' : 'block';
      }
    });
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-expanded', 'false');
  });

  // Newsletter form validation
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterEmail = document.getElementById('newsletter-email');
  const newsletterError = document.getElementById('newsletter-error');

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterEmail.value.trim();
    if (!validateEmail(email)) {
      newsletterError.textContent = 'Please enter a valid email address.';
      newsletterEmail.focus();
      return;
    }
    newsletterError.textContent = '';
    alert('Thank you for subscribing to our newsletter!');
    newsletterForm.reset();
  });

  // Draggable chatbot toggle button
  const securebotToggle = document.getElementById('securebot-toggle');
  let isDragging = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;

  securebotToggle.style.position = 'fixed';

  securebotToggle.addEventListener('mousedown', (e) => {
    isDragging = true;
    dragOffsetX = e.clientX - securebotToggle.getBoundingClientRect().left;
    dragOffsetY = e.clientY - securebotToggle.getBoundingClientRect().top;
    securebotToggle.style.transition = 'none';
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      let newX = e.clientX - dragOffsetX;
      let newY = e.clientY - dragOffsetY;

      // Constrain within viewport
      const maxX = window.innerWidth - securebotToggle.offsetWidth;
      const maxY = window.innerHeight - securebotToggle.offsetHeight;
      newX = Math.min(Math.max(0, newX), maxX);
      newY = Math.min(Math.max(0, newY), maxY);

      securebotToggle.style.left = newX + 'px';
      securebotToggle.style.top = newY + 'px';
      securebotToggle.style.right = 'auto';
      securebotToggle.style.bottom = 'auto';
    }
  });

  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      securebotToggle.style.transition = '';
    }
  });

  // Touch events for mobile
  securebotToggle.addEventListener('touchstart', (e) => {
    isDragging = true;
    const touch = e.touches[0];
    dragOffsetX = touch.clientX - securebotToggle.getBoundingClientRect().left;
    dragOffsetY = touch.clientY - securebotToggle.getBoundingClientRect().top;
    securebotToggle.style.transition = 'none';
  });

  document.addEventListener('touchmove', (e) => {
    if (isDragging) {
      const touch = e.touches[0];
      let newX = touch.clientX - dragOffsetX;
      let newY = touch.clientY - dragOffsetY;

      // Constrain within viewport
      const maxX = window.innerWidth - securebotToggle.offsetWidth;
      const maxY = window.innerHeight - securebotToggle.offsetHeight;
      newX = Math.min(Math.max(0, newX), maxX);
      newY = Math.min(Math.max(0, newY), maxY);

      securebotToggle.style.left = newX + 'px';
      securebotToggle.style.top = newY + 'px';
      securebotToggle.style.right = 'auto';
      securebotToggle.style.bottom = 'auto';
    }
  });

  document.addEventListener('touchend', () => {
    if (isDragging) {
      isDragging = false;
      securebotToggle.style.transition = '';
    }
  });

  // Light/Dark mode toggle
  const toggle = document.getElementById('toggle');
  toggle.addEventListener('change', () => {
    if (toggle.checked) {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
      toggle.setAttribute('aria-checked', 'true');
      localStorage.setItem('colorMode', 'light');
    } else {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
      toggle.setAttribute('aria-checked', 'false');
      localStorage.setItem('colorMode', 'dark');
    }
  });

  // Initialize mode based on saved preference or system preference
  const savedMode = localStorage.getItem('colorMode');
  if (savedMode === 'light') {
    toggle.checked = true;
    document.body.classList.add('light-mode');
    toggle.setAttribute('aria-checked', 'true');
  } else if (savedMode === 'dark') {
    toggle.checked = false;
    document.body.classList.add('dark-mode');
    toggle.setAttribute('aria-checked', 'false');
  } else {
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
