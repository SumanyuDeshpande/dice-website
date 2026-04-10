 
// ── NAVBAR SCROLL EFFECT ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ── HAMBURGER MOBILE MENU ──
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    navLinks.classList.remove('open');
  }
});

// ── REVEAL ON SCROLL ──
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(el => revealObserver.observe(el));

// ── TYPEWRITER EFFECT ──
const commands = [
  'Open Spotify and play lo-fi',
  'Search latest AI news',
  'Set a timer for 25 minutes',
  'Open terminal in project folder',
  'Summarize my clipboard text',
  'Translate this to French',
  'Run my morning routine',
  'Screenshot and annotate',
];

let cmdIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterEl = document.getElementById('typewriter');

function type() {
  const current = commands[cmdIndex];

  if (!isDeleting) {
    typewriterEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typewriterEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      cmdIndex = (cmdIndex + 1) % commands.length;
    }
  }

  setTimeout(type, isDeleting ? 40 : 70);
}

type();

// ── DEMO TERMINAL ANIMATION ──
const demoCommands = [
  {
    command: 'dice open spotify',
    response: '✓ Spotify launched successfully'
  },
  {
    command: 'dice search "AI news today"',
    response: '✓ Opening browser with top AI results...'
  },
  {
    command: 'dice timer 25m "Focus session"',
    response: '✓ Timer set — 25 minutes. Stay locked in.'
  },
  {
    command: 'dice summarize clipboard',
    response: '✓ Summary generated — 3 key points extracted'
  },
  {
    command: 'dice run morning-routine',
    response: '✓ Routine started: News → Music → Tasks'
  },
];

const demoBody = document.getElementById('demo-body');
const demoInput = document.getElementById('demo-input');
let demoIndex = 0;

function runDemoCommand() {
  const item = demoCommands[demoIndex % demoCommands.length];
  let i = 0;
  demoInput.textContent = '';

  // Type the command
  const typeCmd = setInterval(() => {
    demoInput.textContent += item.command[i];
    i++;
    if (i >= item.command.length) {
      clearInterval(typeCmd);

      // After typing, show result
      setTimeout(() => {
        const cmdLine = document.createElement('div');
        cmdLine.className = 'demo-line command';
        cmdLine.textContent = '$ ' + item.command;
        demoBody.appendChild(cmdLine);

        const resLine = document.createElement('div');
        resLine.className = 'demo-line response';
        resLine.textContent = item.response;
        demoBody.appendChild(resLine);

        // Keep only last 8 lines
        while (demoBody.children.length > 8) {
          demoBody.removeChild(demoBody.firstChild);
        }

        demoBody.scrollTop = demoBody.scrollHeight;
        demoInput.textContent = '';
        demoIndex++;

        setTimeout(runDemoCommand, 1500);
      }, 400);
    }
  }, 55);
}

// Start demo when section is visible
const demoSection = document.getElementById('demo');
const demoObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(runDemoCommand, 1000);
      demoObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

demoObserver.observe(demoSection);

// ── SMOOTH ACTIVE NAV HIGHLIGHT ──
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === '#' + current) {
      a.style.color = 'var(--accent2)';
    }
  });
});
// ── COMING SOON DOWNLOAD ──
const downloadBtn = document.querySelector('.btn-large');

downloadBtn.addEventListener('click', (e) => {
  e.preventDefault();
  downloadBtn.innerHTML = '🎲 Coming Soon — Stay Tuned!';
  downloadBtn.style.background = 'linear-gradient(135deg, #1a1a3e, #2d2d5e)';
  downloadBtn.style.cursor = 'default';
  downloadBtn.style.boxShadow = 'none';

  setTimeout(() => {
    downloadBtn.innerHTML = '<i class="fa-solid fa-download"></i> Download D.I.C.E. — Free';
    downloadBtn.style.background = '';
    downloadBtn.style.cursor = 'pointer';
    downloadBtn.style.boxShadow = '';
  }, 3000);
});