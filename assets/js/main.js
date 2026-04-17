 
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

// ── FEEDBACK FORM ──
const urgencySlider = document.getElementById('urgency');
const urgencyValue = document.getElementById('urgency-value');

const urgencyLabels = {
  1: 'Just sharing 😊',
  2: 'Minor issue 🙂',
  3: 'Moderate ⚡',
  4: 'Important 🚨',
  5: 'Critical 🔥'
};

if (urgencySlider) {
  urgencySlider.addEventListener('input', () => {
    urgencyValue.textContent = 'Urgency: ' + urgencyLabels[urgencySlider.value];
  });
}

// Handle form submission
const feedbackForm = document.getElementById('feedback-form');
const feedbackSuccess = document.getElementById('feedback-success');

if (feedbackForm) {
  feedbackForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = feedbackForm.querySelector('.feedback-btn');
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    btn.style.opacity = '0.7';
    btn.disabled = true;

    const formData = new FormData(feedbackForm);

    try {
      const response = await fetch('https://formspree.io/f/xaqlgrkq', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        feedbackForm.style.display = 'none';
        feedbackSuccess.classList.add('show');
      } else {
        btn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Something went wrong — try again';
        btn.style.opacity = '1';
        btn.disabled = false;
      }
    } catch (err) {
      btn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Network error — try again';
      btn.style.opacity = '1';
      btn.disabled = false;
    }
  });
}

// ── WAITLIST FORM ──
const waitlistForm = document.getElementById('waitlist-form');
const waitlistSuccess = document.getElementById('waitlist-success');

if (waitlistForm) {
  waitlistForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = waitlistForm.querySelector('.waitlist-btn');
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Joining...';
    btn.style.opacity = '0.7';
    btn.disabled = true;

    const formData = new FormData(waitlistForm);

    try {
      const response = await fetch('https://formspree.io/f/xykbqrrj', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        waitlistForm.style.display = 'none';
        waitlistSuccess.classList.add('show');
      } else {
        btn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Something went wrong — try again';
        btn.style.opacity = '1';
        btn.disabled = false;
      }
    } catch (err) {
      btn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Network error — try again';
      btn.style.opacity = '1';
      btn.disabled = false;
    }
  });
}

// ── FAQ ACCORDION ──
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');

  question.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    // Close all open items first
    faqItems.forEach(i => i.classList.remove('open'));

    // If it wasn't open, open it
    if (!isOpen) {
      item.classList.add('open');
    }
  });
});

// ── SYSTEM REQUIREMENTS CHECKER POPUP ──
const downloadBtn = document.getElementById('download-btn');

function checkSystemRequirements() {
  const ua = navigator.userAgent;
  const platform = navigator.platform;

  // OS Detection
  const isWindows = ua.includes('Windows');
  const isWin11 = ua.includes('Windows NT 10.0') && navigator.userAgentData?.brands?.some(b => b.brand === 'Google Chrome');
  const isWindows10or11 = ua.includes('Windows NT 10.0');

  // Browser
  const isChrome = ua.includes('Chrome') && !ua.includes('Edg');
  const isEdge = ua.includes('Edg');
  const isFirefox = ua.includes('Firefox');
  const isSafari = ua.includes('Safari') && !ua.includes('Chrome');
  const browserName = isChrome ? 'Google Chrome' : isEdge ? 'Microsoft Edge' : isFirefox ? 'Firefox' : isSafari ? 'Safari' : 'Unknown Browser';

  // RAM (approximate via deviceMemory API)
  const ram = navigator.deviceMemory || null;
  const ramOk = ram ? ram >= 4 : null;

  // CPU cores
  const cores = navigator.hardwareConcurrency || null;
  const coresOk = cores ? cores >= 4 : null;

  // Online
  const isOnline = navigator.onLine;

  // Screen resolution
  const screenW = window.screen.width;
  const screenH = window.screen.height;
  const screenOk = screenW >= 1280 && screenH >= 720;

  return {
    os: { label: 'Operating System', value: isWindows ? (isWindows10or11 ? 'Windows 10/11 detected' : 'Windows (older version)') : 'Non-Windows OS detected', ok: isWindows10or11, required: 'Windows 11' },
    browser: { label: 'Browser', value: browserName, ok: isChrome || isEdge || isFirefox, required: 'Chrome / Edge / Firefox' },
    ram: { label: 'RAM', value: ram ? ram + 'GB detected' : 'Unable to detect', ok: ramOk, required: 'Minimum 4GB RAM' },
    cores: { label: 'CPU Cores', value: cores ? cores + ' cores detected' : 'Unable to detect', ok: coresOk, required: 'Minimum 4 cores' },
    screen: { label: 'Screen Resolution', value: screenW + ' × ' + screenH, ok: screenOk, required: 'Minimum 1280 × 720' },
    internet: { label: 'Internet Connection', value: isOnline ? 'Connected ✅' : 'Offline ⚠️', ok: isOnline, required: 'Required for some features' },
  };
}

function showRequirementsPopup() {
  const checks = checkSystemRequirements();
  const allOk = Object.values(checks).every(c => c.ok !== false);
  const hasIssues = Object.values(checks).some(c => c.ok === false);

  const rows = Object.values(checks).map(c => {
    const icon = c.ok === true ? '✅' : c.ok === false ? '❌' : '❓';
    const color = c.ok === true ? '#4ade80' : c.ok === false ? '#f87171' : '#94a3b8';
    return `
      <div class="src-row">
        <div class="src-label">${c.label}</div>
        <div class="src-value" style="color:${color}">${icon} ${c.value}</div>
        <div class="src-required">${c.required}</div>
      </div>`;
  }).join('');

  const verdict = allOk
    ? `<div class="src-verdict src-pass">🎲 Your system is ready for D.I.C.E.! Join the waitlist to be first in line.</div>`
    : hasIssues
    ? `<div class="src-verdict src-fail">⚠️ Some requirements may not be met. D.I.C.E. requires Windows 11 to run optimally.</div>`
    : `<div class="src-verdict src-warn">🔍 Some specs couldn't be detected. D.I.C.E. requires Windows 11 with 4GB+ RAM.</div>`;

  const popup = document.createElement('div');
  popup.id = 'src-popup';
  popup.innerHTML = `
    <div class="src-box">
      <div class="demo-topbar">
        <span class="dot red"></span>
        <span class="dot yellow"></span>
        <span class="dot green"></span>
        <span class="demo-title">D.I.C.E. — System Compatibility Check</span>
      </div>
      <div class="src-body">
        <p class="src-subtitle">Checking your system for D.I.C.E. compatibility...</p>
        <div class="src-header-row">
          <span>Requirement</span>
          <span>Your System</span>
          <span>Needed</span>
        </div>
        <div class="src-rows">${rows}</div>
        ${verdict}
        <div class="src-buttons">
          <a href="#waitlist" class="btn-primary" onclick="document.getElementById('src-popup').remove()">
            <i class="fa-solid fa-bell"></i> Join Waitlist
          </a>
          <button class="btn-secondary" onclick="document.getElementById('src-popup').remove()">
            Close
          </button>
        </div>
        <p class="src-note">D.I.C.E. launches Mid/End June 2026 — free for everyone 🎲</p>
      </div>
    </div>
  `;

  document.body.appendChild(popup);

  // Close on outside click
  popup.addEventListener('click', (e) => {
    if (e.target === popup) popup.remove();
  });
}

if (downloadBtn) {
  downloadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showRequirementsPopup();
  });
}

// ── EASTER EGG (Konami Code) ──
const konamiCode = [
  'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
  'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
  'b','a'
];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      triggerEasterEgg();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

function triggerEasterEgg() {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.id = 'easter-egg-overlay';
  overlay.innerHTML = `
    <div class="ee-box">
      <div class="ee-top">
        <span class="dot red"></span>
        <span class="dot yellow"></span>
        <span class="dot green"></span>
        <span class="ee-title">D.I.C.E. — Classified Message</span>
      </div>
      <div class="ee-body">
        <p class="ee-line1">🎲 <span class="gradient-text">D.I.C.E.</span> Secret Channel — Activated</p>
        <p class="ee-line2">// ACCESS LEVEL: ABOVE AVERAGE</p>
        <p class="ee-message">"You weren't supposed to find this…<br/>But since you did — you're officially smarter than average 😌"</p>
        <p class="ee-sign">— Sumanyu, Founder of D.I.C.E.</p>
        <p class="ee-note">↑↑↓↓←→←→BA — Now you know the secret. 🎲</p>
        <button class="btn-primary ee-close" onclick="document.getElementById('easter-egg-overlay').remove()">
          <i class="fa-solid fa-xmark"></i> Close Channel
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  // Auto close after 15 seconds
  setTimeout(() => {
    const el = document.getElementById('easter-egg-overlay');
    if (el) el.remove();
  }, 15000);
}

// ── COMMAND PLAYGROUND ──
const playgroundCommands = {
  // Time & Date
  'what time is it': { response: '🕐 Current time: ' + new Date().toLocaleTimeString(), category: 'Time' },
  'what day is it': { response: '📅 Today is ' + new Date().toLocaleDateString('en-US', {weekday:'long', year:'numeric', month:'long', day:'numeric'}), category: 'Time' },
  'how many days until christmas': { response: '🎄 Calculating... ' + Math.ceil((new Date(new Date().getFullYear(), 11, 25) - new Date()) / 86400000) + ' days until Christmas!', category: 'Time' },

  // Battery & System
  'battery': { response: '🔋 Battery: 87% — Charging ⚡ | CPU: 34% | RAM: 6.2GB / 16GB used', category: 'System' },
  'cpu': { response: '💻 CPU Usage: 34% | RAM: 6.2GB / 16GB | Temp: 48°C — All systems normal ✅', category: 'System' },
  'ram': { response: '🧠 RAM: 6.2GB / 16GB used (39%) | Available: 9.8GB | No memory pressure detected ✅', category: 'System' },
  'performance': { response: '📊 System Performance — CPU: 34% | RAM: 39% | Disk: 12% | Network: Active | Status: ✅ Optimal', category: 'System' },
  'system stats': { response: '📊 System Performance — CPU: 34% | RAM: 39% | Disk: 12% | Network: Active | Status: ✅ Optimal', category: 'System' },

  // Weather
  'weather': { response: '🌤️ Chennai, India — 32°C | Partly Cloudy | Humidity: 74% | Wind: 18 km/h NE | Feels like 36°C', category: 'Weather' },
  'weather in mumbai': { response: '🌦️ Mumbai, India — 29°C | Light Rain | Humidity: 88% | Wind: 22 km/h SW | Feels like 34°C', category: 'Weather' },
  'is it raining': { response: '🌧️ Checking weather... Light rain detected in your area. Humidity: 88%. Grab an umbrella! ☂️', category: 'Weather' },
  'temperature outside': { response: '🌡️ Outside Temperature: 32°C | Feels like 36°C | UV Index: High — Stay hydrated! 💧', category: 'Weather' },

  // Volume
  'volume up': { response: '🔊 Volume increased → 70%', category: 'Media' },
  'volume down': { response: '🔉 Volume decreased → 40%', category: 'Media' },
  'mute': { response: '🔇 System muted ✅', category: 'Media' },
  'set volume to 50': { response: '🔊 Volume set to exactly 50% ✅', category: 'Media' },
  'play': { response: '▶️ Media playing ✅', category: 'Media' },
  'pause': { response: '⏸️ Media paused ✅', category: 'Media' },
  'next song': { response: '⏭️ Skipping to next track... ✅', category: 'Media' },
  'previous song': { response: '⏮️ Going to previous track... ✅', category: 'Media' },

  // Brightness
  'brightness up': { response: '☀️ Brightness increased → 80%', category: 'Display' },
  'brightness down': { response: '🌑 Brightness decreased → 40%', category: 'Display' },
  'set brightness to 70': { response: '🌤️ Brightness set to exactly 70% ✅', category: 'Display' },

  // Window Management
  'minimize all': { response: '🖥️ All windows minimized — Desktop exposed ✅', category: 'Windows' },
  'show desktop': { response: '🖥️ All windows minimized — Desktop exposed ✅', category: 'Windows' },
  'close window': { response: '❌ Current window closed ✅', category: 'Windows' },
  'maximize': { response: '🔲 Window maximized ✅', category: 'Windows' },

  // System Controls
  'lock': { response: '🔒 Locking PC immediately... Goodbye! 👋', category: 'System' },
  'lock screen': { response: '🔒 Locking PC immediately... Goodbye! 👋', category: 'System' },
  'sleep': { response: '😴 Putting computer to sleep... Sweet dreams! 💤', category: 'System' },
  'shutdown': { response: '⚠️ Shutting down in 10 seconds... Say "cancel shutdown" to abort!', category: 'System' },
  'restart': { response: '🔄 Restarting in 10 seconds... Say "cancel shutdown" to abort!', category: 'System' },
  'cancel shutdown': { response: '✅ Shutdown cancelled! Your PC is safe 😌', category: 'System' },
  'clear clipboard': { response: '📋 Clipboard cleared ✅ — Nothing to paste now!', category: 'System' },

  // Timer & Alarm
  'set a timer for 5 minutes': { response: '⏱️ Timer set for 5 minutes! I\'ll alert you at ' + new Date(Date.now() + 300000).toLocaleTimeString() + ' ✅', category: 'Timer' },
  'set a timer for 1 hour 30 minutes': { response: '⏱️ Timer set for 1 hour 30 minutes! See you at ' + new Date(Date.now() + 5400000).toLocaleTimeString() + ' ✅', category: 'Timer' },
  'wake me up at 7am': { response: '⏰ Alarm set for 7:00 AM tomorrow ✅ — Sweet dreams!', category: 'Timer' },
  'cancel my alarm': { response: '✅ All alarms cancelled! Sleep in if you want 😄', category: 'Timer' },

  // Calculator
  'what is 15 percent of 3000': { response: '🧮 15% of 3000 = 450', category: 'Calculator' },
  'calculate 250 times 4': { response: '🧮 250 × 4 = 1,000', category: 'Calculator' },
  'what is 100 divided by 7': { response: '🧮 100 ÷ 7 = 14.2857...', category: 'Calculator' },
  'what is 9 squared': { response: '🧮 9² = 81', category: 'Calculator' },

  // Translator
  'translate hello to tamil': { response: '🌐 "Hello" in Tamil → வணக்கம் (Vanakkam)', category: 'Translate' },
  'translate good morning to hindi': { response: '🌐 "Good morning" in Hindi → सुप्रभात (Suprabhat)', category: 'Translate' },
  'how do you say thank you in french': { response: '🌐 "Thank you" in French → Merci!', category: 'Translate' },
  'say i love you in japanese': { response: '🌐 "I love you" in Japanese → 愛しています (Aishite imasu)', category: 'Translate' },

  // Web & Search
  'search for ai news': { response: '🌐 Opening Google search for "AI news"... ✅', category: 'Web' },
  'open youtube': { response: '▶️ Opening YouTube homepage... ✅', category: 'Web' },
  'open downloads folder': { response: '📁 Opening Downloads folder... ✅', category: 'Files' },
  'open documents folder': { response: '📁 Opening Documents folder... ✅', category: 'Files' },
  'open desktop folder': { response: '📁 Opening Desktop folder... ✅', category: 'Files' },

  // Screen Analysis
  'summarize my screen': { response: '📸 Taking screenshot... 🔍 Running OCR... 🤖 Analyzing with AI...\n✅ Summary: Your screen shows a code editor with Python files. 3 key elements detected.', category: 'AI' },
  'analyse data': { response: '📊 Finding latest Excel/CSV file... 🤖 Analyzing data...\n✅ Found: report.xlsx | 247 rows | 8 columns | Generating charts...', category: 'AI' },

  // Notes
  'show my notes': { response: '📝 Your recent notes:\n1. Buy groceries\n2. Meeting at 3pm\n3. Call mom\n4. Review project files\n5. Submit assignment', category: 'Notes' },
};

// Playground suggestions to show
const playgroundSuggestions = [
  'What time is it', 'Weather', 'Battery', 'Volume up',
  'Set a timer for 5 minutes', 'Translate hello to Tamil',
  'What is 15 percent of 3000', 'Summarize my screen',
  'Lock screen', 'Search for AI news'
];

function initPlayground() {
  const input = document.getElementById('playground-input');
  const sendBtn = document.getElementById('playground-send');
  const body = document.getElementById('playground-body');
  const suggestions = document.querySelectorAll('.pg-suggestion');

  if (!input) return;

  function sendCommand(text) {
    const cmd = text.trim();
    if (!cmd) return;

    // Add user command line
    const userLine = document.createElement('div');
    userLine.className = 'pg-line pg-user';
    userLine.innerHTML = `<span class="pg-prompt">you →</span> ${cmd}`;
    body.appendChild(userLine);

    // Find response
    const key = cmd.toLowerCase();
    let response = null;

    // Exact match first
    if (playgroundCommands[key]) {
      response = playgroundCommands[key].response;
    } else {
      // Partial match
      for (const k in playgroundCommands) {
        if (key.includes(k) || k.includes(key)) {
          response = playgroundCommands[k].response;
          break;
        }
      }
    }

    // Typing indicator
    const typingLine = document.createElement('div');
    typingLine.className = 'pg-line pg-typing';
    typingLine.innerHTML = `<span class="pg-prompt">DICE →</span> <span class="pg-dots"><span>.</span><span>.</span><span>.</span></span>`;
    body.appendChild(typingLine);
    body.scrollTop = body.scrollHeight;

    setTimeout(() => {
      typingLine.remove();
      const responseLine = document.createElement('div');
      responseLine.className = 'pg-line pg-response';
      responseLine.innerHTML = `<span class="pg-prompt dice-prompt">DICE →</span> ${response || '❓ Command not recognized. Try: "weather", "battery", "volume up", or "what time is it"'}`;
      body.appendChild(responseLine);

      // Keep max 20 lines
      while (body.children.length > 20) body.removeChild(body.firstChild);
      body.scrollTop = body.scrollHeight;
    }, 800);

    input.value = '';
  }

  sendBtn.addEventListener('click', () => sendCommand(input.value));
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendCommand(input.value); });

  suggestions.forEach(s => {
    s.addEventListener('click', () => sendCommand(s.textContent));
  });
}

initPlayground();