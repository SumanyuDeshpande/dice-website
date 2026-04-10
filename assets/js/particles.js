 
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
let animationId;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function createParticle() {
  return {
    x: randomBetween(0, canvas.width),
    y: randomBetween(0, canvas.height),
    radius: randomBetween(0.5, 2),
    speedX: randomBetween(-0.3, 0.3),
    speedY: randomBetween(-0.5, -0.1),
    opacity: randomBetween(0.1, 0.7),
    color: Math.random() > 0.5 ? '108,99,255' : '56,189,248',
  };
}

function initParticles(count = 120) {
  particles = [];
  for (let i = 0; i < count; i++) {
    particles.push(createParticle());
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    // Draw particle
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${p.color},${p.opacity})`;
    ctx.fill();

    // Connect nearby particles with lines
    particles.forEach((p2, j) => {
      if (i === j) return;
      const dx = p.x - p2.x;
      const dy = p.y - p2.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(108,99,255,${0.08 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    });

    // Move
    p.x += p.speedX;
    p.y += p.speedY;

    // Reset if out of bounds
    if (p.y < -5) {
      p.y = canvas.height + 5;
      p.x = randomBetween(0, canvas.width);
    }
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
  });

  animationId = requestAnimationFrame(drawParticles);
}

// Mouse interaction
let mouse = { x: null, y: null };
window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  particles.forEach(p => {
    const dx = p.x - mouse.x;
    const dy = p.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 100) {
      p.x += dx * 0.02;
      p.y += dy * 0.02;
    }
  });
});

window.addEventListener('resize', () => {
  resize();
  cancelAnimationFrame(animationId);
  initParticles();
  drawParticles();
});

resize();
initParticles();
drawParticles();