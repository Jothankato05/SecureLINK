import { initThemeToggle } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();

  // Smooth scroll for in-page anchor links
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    if (link.id === 'learnMoreBtn') return;
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
    const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstFocusable = focusableElements[0];
    firstFocusable.focus();
    modal.addEventListener('keydown', trapFocus);
  });

  closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    modal.removeEventListener('keydown', trapFocus);
  });

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
      modal.removeEventListener('keydown', trapFocus);
    }
  });

  function trapFocus(e) {
    const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  // Chatbot functionality
  const securebot = document.getElementById('securebot');
  const securebotToggle = document.getElementById('securebot-toggle');
  const securebotClose = document.getElementById('securebot-close');
  const securebotMessages = document.getElementById('securebot-messages');
  const securebotForm = document.getElementById('securebot-form');
  const securebotInput = document.getElementById('securebot-input');
  const securebotVoice = document.getElementById('securebot-voice');
  let history = [];

  securebotToggle.addEventListener('click', () => {
    securebot.classList.add('open');
    securebotToggle.style.display = 'none';
    securebotInput.focus();
  });

  securebotClose.addEventListener('click', () => {
    securebot.classList.remove('open');
    securebotToggle.style.display = 'block';
  });

  const knowledgeBase = {
    "what is securelink": "SecureLink is a next-generation emergency response system designed to keep you safe and connected. It integrates multiple devices and communication channels to ensure rapid and reliable alerts.",
    "who built securelink": "SecureLink is built by Primers Organisation, a trusted institution in Africa.",
    "how does securelink work": "SecureLink delivers multi-device emergency broadcast systems across Africa, designed for speed, security, and sovereignty.",
    "contact": "You can contact SecureLink at securelink.primersorganization@gmail.com or call +234-800-SECURE.",
    "default": "I'm sorry, I don't have information on that. Please ask about SecureLink or say 'help' for emergency assistance."
  };

  function addMessage(text, sender) {
    const msg = document.createElement('div');
    msg.classList.add('securebot-message', sender);
    msg.textContent = text;
    securebotMessages.appendChild(msg);
    securebotMessages.scrollTop = securebotMessages.scrollHeight;
  }

  function respond(input) {
    history.push(input);
    input = input.toLowerCase();

    if (input.includes('danger') || input.includes('followed') || input.includes('robbery') || input.includes('kidnap')) {
      const locations = ['Wuse II', 'Gwarimpa', 'Ikeja', 'Zaria', 'Bodija'];
      const loc = locations[Math.floor(Math.random() * locations.length)];
      addMessage(`📡 SOS simulated: "I'm in danger at ${loc}. Please help me!"`, 'bot');
      return 'Stay calm. Move to a safe or busy place immediately. SOS simulated.';
    }

    if (input.includes('cut') || input.includes('bleeding') || input.includes('burn') || input.includes('injury')) {
      return 'Use clean water to rinse. Apply pressure. Cover with cloth. Remain calm.';
    }

    if (input.includes('help') || input.includes('panic') || input.includes('afraid') || input.includes('scared')) {
      const calm = [
        'You’re not alone. I’m with you. Stay calm.',
        'Just breathe. Find a place with people.',
        'You’re strong. You’ve got this. Move carefully.'
      ];
      return calm[Math.floor(Math.random() * calm.length)];
    }

    if (input.includes('police')) {
      return 'Police stations are often near LGA HQs or busy roads. Look for signboards or ask a local.';
    }

    for (const key in knowledgeBase) {
      if (input.includes(key)) {
        return knowledgeBase[key];
      }
    }

    return knowledgeBase['default'];
  }

  securebotForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userInput = securebotInput.value.trim();
    if (!userInput) return;
    addMessage(userInput, 'user');
    securebotInput.value = '';
    setTimeout(() => {
      const response = respond(userInput);
      addMessage(response, 'bot');
      securebotSpeak(response);
    }, 500);
  });

  securebotVoice.addEventListener('click', () => {
    securebotListen();
  });

  function securebotSpeak(text) {
    if (!window.speechSynthesis) return;
    const utter = new SpeechSynthesisUtterance(text);
    speechSynthesis.onvoiceschanged = () => {
      utter.voice = speechSynthesis.getVoices().find(v => v.lang.includes('en')) || null;
      speechSynthesis.speak(utter);
    };
    speechSynthesis.getVoices();
  }

  function securebotListen() {
    if (!('webkitSpeechRecognition' in window)) {
      addMessage('Voice input not supported in this browser.', 'bot');
      return;
    }
    const recog = new webkitSpeechRecognition();
    recog.lang = 'en-US';
    recog.interimResults = false;
    recog.maxAlternatives = 1;
    recog.onresult = (event) => {
      const result = event.results[0][0].transcript;
      addMessage(result, 'user');
      const response = respond(result);
      addMessage(response, 'bot');
      securebotSpeak(response);
    };
    recog.onerror = () => {
      addMessage('Voice recognition failed. Please try again.', 'bot');
    };
    recog.start();
  }

  // Greeting on load
  setTimeout(() => {
    addMessage('Hi, I’m SecureBot. I’m here to help with SecureLink info or emergency assistance. How can I assist you?', 'bot');
    securebotSpeak('Hi, I’m SecureBot. I’m here to help with SecureLink info or emergency assistance. How can I assist you?');
  }, 600);
});
