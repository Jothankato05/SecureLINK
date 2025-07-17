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
    console.log('Learn More button clicked');
    try {
      modal.style.display = 'block';
      console.log('Modal displayed');
    } catch (error) {
      console.error('Error displaying modal:', error);
    }
  });

  closeModalBtn.addEventListener('click', () => {
    console.log('Close button clicked');
    try {
      modal.style.display = 'none';
      console.log('Modal hidden');
    } catch (error) {
      console.error('Error hiding modal:', error);
    }
  });

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
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
  });

  securebotClose.addEventListener('click', () => {
    securebot.classList.remove('open');
    securebotToggle.style.display = 'block';
  });

  // Simple chatbot knowledge base
  const knowledgeBase = {
    "what is securelink": "SecureLink is a next-generation emergency response system designed to keep you safe and connected. It integrates multiple devices and communication channels to ensure rapid and reliable alerts.",
    "who built securelink": "SecureLink is built by Primers Organisation, a trusted institution in Africa.",
    "how does securelink work": "SecureLink delivers multi-device emergency broadcast systems across Africa, designed for speed, security, and sovereignty.",
    "contact": "You can contact SecureLink at securelink.primersorganization@gmail.com or call +234-800-SECURE.",
    "default": "I'm sorry, I don't have information on that. Please ask about SecureLink."
  };

  function addMessage(text, sender) {
    const msg = document.createElement('div');
    msg.classList.add('securebot-message', sender);
    msg.textContent = text;
    securebotMessages.appendChild(msg);
    securebotMessages.scrollTop = securebotMessages.scrollHeight;
  }

  securebotForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userInput = securebotInput.value.trim().toLowerCase();
    if (!userInput) return;
    addMessage(userInput, 'user');
    securebotInput.value = '';

    // Simple response logic
    let response = knowledgeBase["default"];
    for (const key in knowledgeBase) {
      if (userInput.includes(key)) {
        response = knowledgeBase[key];
        break;
      }
    }
    setTimeout(() => addMessage(response, 'bot'), 500);
  });
});

// Remove pristine class on toggle click to enable animation and toggle light/dark mode
document.addEventListener("click", e => {
  let tar = e.target;
  if (tar.name === "toggle") {
    tar.removeAttribute("class");
    // Toggle light/dark mode on body
    if (tar.checked) {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    } else {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    }
  }
});

// Initialize mode based on prefers-color-scheme
window.addEventListener("DOMContentLoaded", () => {
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  const toggle = document.querySelector('input[name="toggle"]');
  if (prefersLight) {
    toggle.checked = true;
    document.body.classList.add("light-mode");
  } else {
    toggle.checked = false;
    document.body.classList.add("dark-mode");
  }
});
