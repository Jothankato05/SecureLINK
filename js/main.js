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
0.
  window.addEventListener('click', (event) => {z
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
    "pricing": "SecureLink offers flexible pricing plans tailored to the needs of institutions across Africa. Contact sales for detailed information.",
    "support": "Our support team is available 24/7 to assist with any issues or questions you may have.",
    "integration": "SecureLink integrates seamlessly with existing emergency management systems and communication platforms.",
    "training": "We provide comprehensive training programs to ensure your team can effectively use SecureLink.",
    "compliance": "SecureLink complies with international standards for data security and emergency response protocols.",
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
  // Remove toggle button and make chatbot always open
  const securebot = document.getElementById('securebot');
  const securebotClose = document.getElementById('securebot-close');
  const securebotMessages = document.getElementById('securebot-messages');
  const securebotForm = document.getElementById('securebot-form');
  const securebotInput = document.getElementById('securebot-input');

  // Show chatbot by default
  securebot.classList.add('open');

  // Remove toggle button element if exists
  const securebotToggle = document.getElementById('securebot-toggle');
  if (securebotToggle) {
    securebotToggle.remove();
  }

  securebotClose.addEventListener('click', () => {
    securebot.classList.remove('open');
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

  // Light/Dark mode toggle removed
});
