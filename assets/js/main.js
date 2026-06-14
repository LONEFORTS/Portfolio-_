/* ============================================
   AYUSH SUDHIR LONE — Portfolio 2.0
   Neural Constellation Engine
   Blossom Particle System
   Ambient Nebula Background
   ============================================ */

// ============ NAVIGATION SCROLL ============
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ============ SCROLL REVEAL ============
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// ============ NEBULA BACKGROUND ============
const nebulaCanvas = document.getElementById('nebula-canvas');
const nCtx = nebulaCanvas.getContext('2d');
let nebulaW, nebulaH;

function resizeNebula() {
  nebulaW = nebulaCanvas.width = window.innerWidth;
  nebulaH = nebulaCanvas.height = window.innerHeight;
}
resizeNebula();

const nebulaPoints = [];
for (let i = 0; i < 5; i++) {
  nebulaPoints.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 400 + 200,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    hue: Math.random() > 0.5 ? 220 : 330
  });
}

function drawNebula() {
  nCtx.fillStyle = '#02040a';
  nCtx.fillRect(0, 0, nebulaW, nebulaH);

  nebulaPoints.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < -p.r) p.x = nebulaW + p.r;
    if (p.x > nebulaW + p.r) p.x = -p.r;
    if (p.y < -p.r) p.y = nebulaH + p.r;
    if (p.y > nebulaH + p.r) p.y = -p.r;

    const grad = nCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
    const color = p.hue === 220 ? '37, 99, 235' : '232, 121, 168';
    grad.addColorStop(0, `rgba(${color}, 0.04)`);
    grad.addColorStop(0.5, `rgba(${color}, 0.015)`);
    grad.addColorStop(1, 'transparent');

    nCtx.fillStyle = grad;
    nCtx.beginPath();
    nCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    nCtx.fill();
  });

  requestAnimationFrame(drawNebula);
}
drawNebula();

// ============ CHERRY BLOSSOM PARTICLES ============
const blossomCanvas = document.getElementById('blossom-canvas');
const bCtx = blossomCanvas.getContext('2d');
let blossoms = [];
const BLOSSOM_COUNT = 45;

function resizeBlossom() {
  blossomCanvas.width = window.innerWidth;
  blossomCanvas.height = window.innerHeight;
}
resizeBlossom();

class Blossom {
  constructor() {
    this.reset();
    this.y = Math.random() * blossomCanvas.height;
  }
  reset() {
    this.x = Math.random() * blossomCanvas.width;
    this.y = -20;
    this.size = Math.random() * 4 + 2.5;
    this.speedY = Math.random() * 0.8 + 0.3;
    this.speedX = Math.random() * 0.4 - 0.2;
    this.sway = Math.random() * 0.012 + 0.004;
    this.swayOffset = Math.random() * Math.PI * 2;
    this.opacity = Math.random() * 0.4 + 0.15;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotSpeed = Math.random() * 0.012 - 0.006;
    this.petalCount = 5;
  }
  update() {
    this.y += this.speedY;
    this.x += this.speedX + Math.sin(this.y * this.sway + this.swayOffset) * 0.3;
    this.rotation += this.rotSpeed;
    if (this.y > blossomCanvas.height + 20) this.reset();
    if (this.x > blossomCanvas.width + 20) this.x = -20;
    if (this.x < -20) this.x = blossomCanvas.width + 20;
  }
  draw() {
    bCtx.save();
    bCtx.translate(this.x, this.y);
    bCtx.rotate(this.rotation);
    bCtx.fillStyle = `rgba(232, 121, 168, ${this.opacity})`;

    for (let i = 0; i < this.petalCount; i++) {
      const angle = (i * 2 * Math.PI) / this.petalCount;
      const cx = Math.cos(angle) * this.size * 0.55;
      const cy = Math.sin(angle) * this.size * 0.55;
      bCtx.beginPath();
      bCtx.ellipse(cx, cy, this.size * 0.5, this.size * 0.22, angle, 0, Math.PI * 2);
      bCtx.fill();
    }

    bCtx.beginPath();
    bCtx.arc(0, 0, this.size * 0.12, 0, Math.PI * 2);
    bCtx.fillStyle = `rgba(255, 200, 220, ${this.opacity + 0.15})`;
    bCtx.fill();
    bCtx.restore();
  }
}

for (let i = 0; i < BLOSSOM_COUNT; i++) blossoms.push(new Blossom());

function animateBlossoms() {
  bCtx.clearRect(0, 0, blossomCanvas.width, blossomCanvas.height);
  blossoms.forEach(b => { b.update(); b.draw(); });
  requestAnimationFrame(animateBlossoms);
}
animateBlossoms();

// ============ FLOATING PARTICLES ============
const particleCanvas = document.getElementById('particle-canvas');
const pCtx = particleCanvas.getContext('2d');
let particles = [];
const PARTICLE_COUNT = 60;

function resizeParticles() {
  particleCanvas.width = window.innerWidth;
  particleCanvas.height = window.innerHeight;
}
resizeParticles();

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * particleCanvas.width;
    this.y = Math.random() * particleCanvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.pulse = Math.random() * Math.PI * 2;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.pulse += 0.02;
    this.currentOpacity = this.opacity * (0.5 + 0.5 * Math.sin(this.pulse));

    if (this.x < 0) this.x = particleCanvas.width;
    if (this.x > particleCanvas.width) this.x = 0;
    if (this.y < 0) this.y = particleCanvas.height;
    if (this.y > particleCanvas.height) this.y = 0;
  }
  draw() {
    pCtx.beginPath();
    pCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    pCtx.fillStyle = `rgba(100, 150, 255, ${this.currentOpacity})`;
    pCtx.fill();
  }
}

for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

function animateParticles() {
  pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ============ NEURAL CONSTELLATION ENGINE ============
const neuralCanvas = document.getElementById('neural-canvas');
const neuralCtx = neuralCanvas.getContext('2d');
let neuralW = 0, neuralH = 0;

const skills = [
  {id: 'ai', label: 'Artificial Intelligence', x: 0, y: 0, r: 28, cat: 'core', desc: 'Core intelligence framework — the foundation of all computational reasoning.'},
  {id: 'ml', label: 'Machine Learning', x: 0, y: 0, r: 26, cat: 'core', desc: 'Pattern recognition and predictive modeling through statistical learning.'},
  {id: 'dl', label: 'Deep Learning', x: 0, y: 0, r: 26, cat: 'core', desc: 'Neural network architectures for complex feature extraction and representation.'},
  {id: 'ds', label: 'Data Science', x: 0, y: 0, r: 24, cat: 'core', desc: 'End-to-end data pipeline: collection, cleaning, analysis, and insight extraction.'},
  {id: 'lead', label: 'Leadership', x: 0, y: 0, r: 24, cat: 'soft', desc: 'Strategic direction and team orchestration toward unified objectives.'},
  {id: 'neg', label: 'Negotiation', x: 0, y: 0, r: 18, cat: 'soft', desc: 'Diplomatic resolution of conflicting interests toward mutual gain.'},
  {id: 'comm', label: 'Communication', x: 0, y: 0, r: 20, cat: 'soft', desc: 'Clear transmission of complex technical concepts across domains.'},
  {id: 'ipa', label: 'International Public Affairs', x: 0, y: 0, r: 20, cat: 'soft', desc: 'Cross-cultural engagement and global strategic positioning.'},
  {id: 'py', label: 'Python', x: 0, y: 0, r: 18, cat: 'tech', desc: 'Primary language for AI/ML development, data processing, and automation.'},
  {id: 'cpp', label: 'C++', x: 0, y: 0, r: 18, cat: 'tech', desc: 'Systems-level programming with performance-critical applications.'},
  {id: 'c', label: 'C', x: 0, y: 0, r: 16, cat: 'tech', desc: 'Low-level memory management and embedded systems programming.'},
  {id: 'java', label: 'Java', x: 0, y: 0, r: 16, cat: 'tech', desc: 'Object-oriented enterprise application development.'},
  {id: 'go', label: 'Go', x: 0, y: 0, r: 15, cat: 'tech', desc: 'Concurrent systems programming and cloud-native services.'},
  {id: 'asm', label: 'Assembly', x: 0, y: 0, r: 14, cat: 'tech', desc: 'Hardware-level instruction sets and processor architecture.'},
  {id: 'rs', label: 'Research', x: 0, y: 0, r: 19, cat: 'soft', desc: 'Systematic investigation and evidence-based inquiry methodology.'},
  {id: 'dm', label: 'Data Modeling', x: 0, y: 0, r: 16, cat: 'tech', desc: 'Structural design of data relationships and schema architecture.'},
  {id: 'dv', label: 'Data Visualization', x: 0, y: 0, r: 16, cat: 'tech', desc: 'Visual encoding of complex datasets for human comprehension.'},
  {id: 'wc', label: 'Written Communication', x: 0, y: 0, r: 16, cat: 'soft', desc: 'Technical documentation, reports, and structured prose.'},
  {id: 'ca', label: 'Current Affairs', x: 0, y: 0, r: 15, cat: 'soft', desc: 'Global awareness and contextual understanding of geopolitical dynamics.'},
  {id: 'adm', label: 'ADM', x: 0, y: 0, r: 14, cat: 'tech', desc: 'Application Development and Maintenance lifecycle management.'}
];

const edges = [
  {s: 'ai', t: 'ml', w: 1, type: 'strong'},
  {s: 'ai', t: 'dl', w: 1, type: 'strong'},
  {s: 'ai', t: 'ds', w: 0.9, type: 'medium'},
  {s: 'ml', t: 'ds', w: 0.95, type: 'strong'},
  {s: 'ml', t: 'py', w: 0.9, type: 'strong'},
  {s: 'dl', t: 'py', w: 0.95, type: 'strong'},
  {s: 'dl', t: 'cpp', w: 0.75, type: 'medium'},
  {s: 'lead', t: 'comm', w: 1, type: 'strong'},
  {s: 'lead', t: 'neg', w: 0.95, type: 'strong'},
  {s: 'lead', t: 'ipa', w: 0.9, type: 'medium'},
  {s: 'lead', t: 'rs', w: 0.8, type: 'medium'},
  {s: 'comm', t: 'wc', w: 1, type: 'strong'},
  {s: 'comm', t: 'neg', w: 0.9, type: 'medium'},
  {s: 'ipa', t: 'ca', w: 0.9, type: 'medium'},
  {s: 'py', t: 'ds', w: 0.95, type: 'strong'},
  {s: 'cpp', t: 'c', w: 1, type: 'strong'},
  {s: 'cpp', t: 'asm', w: 0.8, type: 'medium'},
  {s: 'c', t: 'asm', w: 0.85, type: 'medium'},
  {s: 'java', t: 'ml', w: 0.7, type: 'weak'},
  {s: 'go', t: 'dm', w: 0.6, type: 'weak'},
  {s: 'ds', t: 'dv', w: 0.95, type: 'strong'},
  {s: 'ds', t: 'dm', w: 0.9, type: 'medium'},
  {s: 'ai', t: 'rs', w: 0.9, type: 'medium'},
  {s: 'ml', t: 'cpp', w: 0.7, type: 'weak'},
  {s: 'py', t: 'dm', w: 0.8, type: 'medium'},
  {s: 'lead', t: 'ca', w: 0.7, type: 'weak'},
  {s: 'dv', t: 'dm', w: 0.85, type: 'medium'},
  {s: 'py', t: 'java', w: 0.6, type: 'weak'},
  {s: 'cpp', t: 'go', w: 0.65, type: 'weak'},
  {s: 'ai', t: 'lead', w: 0.75, type: 'medium'},
  {s: 'dl', t: 'rs', w: 0.85, type: 'medium'}
];

let activeNode = null;
let hoveredNode = null;
let mouse = {x: 0, y: 0};
let initialized = false;
let neuralRunning = false;

const edgeMap = edges.map(e => ({
  s: skills.find(sk => sk.id === e.s),
  t: skills.find(sk => sk.id === e.t),
  w: e.w,
  type: e.type,
  pulse: 0,
  signalPos: 0
}));

function initNeuralPositions() {
  if (initialized) return;
  const cx = neuralW / 2;
  const cy = neuralH / 2;
  const radius = Math.min(neuralW, neuralH) * 0.35;

  const coreSkills = skills.filter(s => s.cat === 'core');
  const techSkills = skills.filter(s => s.cat === 'tech');
  const softSkills = skills.filter(s => s.cat === 'soft');

  coreSkills.forEach((s, i) => {
    const angle = (i / coreSkills.length) * Math.PI * 2 - Math.PI / 2;
    const dist = radius * 0.35;
    s.x = cx + Math.cos(angle) * dist;
    s.y = cy + Math.sin(angle) * dist;
    s.vx = 0; s.vy = 0;
    s.pulse = 0;
    s.baseX = s.x;
    s.baseY = s.y;
  });

  techSkills.forEach((s, i) => {
    const angle = (i / techSkills.length) * Math.PI * 2 + Math.PI / 6;
    const dist = radius * 0.75;
    s.x = cx + Math.cos(angle) * dist;
    s.y = cy + Math.sin(angle) * dist;
    s.vx = 0; s.vy = 0;
    s.pulse = 0;
    s.baseX = s.x;
    s.baseY = s.y;
  });

  softSkills.forEach((s, i) => {
    const angle = (i / softSkills.length) * Math.PI * 2 + Math.PI;
    const dist = radius * 0.75;
    s.x = cx + Math.cos(angle) * dist;
    s.y = cy + Math.sin(angle) * dist;
    s.vx = 0; s.vy = 0;
    s.pulse = 0;
    s.baseX = s.x;
    s.baseY = s.y;
  });

  initialized = true;
}

function resizeNeural() {
  const rect = neuralCanvas.parentElement.getBoundingClientRect();
  neuralCanvas.width = rect.width;
  neuralCanvas.height = rect.height;
  neuralW = rect.width;
  neuralH = rect.height;
  initNeuralPositions();
}

function updateNeural() {
  const cx = neuralW / 2;
  const cy = neuralH / 2;

  skills.forEach(s => {
    s.vx += (cx - s.x) * 0.0003;
    s.vy += (cy - s.y) * 0.0003;
    s.vx += (s.baseX - s.x) * 0.001;
    s.vy += (s.baseY - s.y) * 0.001;

    skills.forEach(o => {
      if (s === o) return;
      const dx = s.x - o.x;
      const dy = s.y - o.y;
      const dist = Math.sqrt(dx*dx + dy*dy) || 1;
      const force = 2500 / (dist * dist);
      if (dist < 100) {
        s.vx += (dx/dist) * force;
        s.vy += (dy/dist) * force;
      }
    });

    const mdx = s.x - mouse.x;
    const mdy = s.y - mouse.y;
    const mdist = Math.sqrt(mdx*mdx + mdy*mdy) || 1;
    if (mdist < 120) {
      s.vx += (mdx/mdist) * 1.2;
      s.vy += (mdy/mdist) * 1.2;
    }
  });

  edgeMap.forEach(e => {
    const dx = e.t.x - e.s.x;
    const dy = e.t.y - e.s.y;
    const dist = Math.sqrt(dx*dx + dy*dy) || 1;
    const target = 80 + (1 - e.w) * 60;
    const force = (dist - target) * 0.0006;
    const fx = (dx/dist) * force;
    const fy = (dy/dist) * force;
    e.s.vx += fx; e.s.vy += fy;
    e.t.vx -= fx; e.t.vy -= fy;
  });

  skills.forEach(s => {
    s.vx *= 0.93;
    s.vy *= 0.93;
    s.x += s.vx;
    s.y += s.vy;
    s.x = Math.max(s.r + 15, Math.min(neuralW - s.r - 15, s.x));
    s.y = Math.max(s.r + 15, Math.min(neuralH - s.r - 15, s.y));
    if (s.pulse > 0) s.pulse -= 0.015;
  });

  edgeMap.forEach(e => {
    if (e.pulse > 0) {
      e.pulse -= 0.01;
      e.signalPos += 0.03;
      if (e.signalPos > 1) e.signalPos = 0;
    }
  });
}

function getNodeColor(s, isActive, isHovered) {
  if (isActive) return { fill: '#e879a8', stroke: '#f0a0c8', text: '#0a0f1e' };
  if (isHovered) return { fill: '#1a3a6b', stroke: '#2563eb', text: '#f8fafc' };
  if (s.cat === 'core') return { fill: 'rgba(37, 99, 235, 0.2)', stroke: 'rgba(37, 99, 235, 0.5)', text: '#cbd5e1' };
  if (s.cat === 'tech') return { fill: 'rgba(96, 165, 250, 0.15)', stroke: 'rgba(96, 165, 250, 0.4)', text: '#94a3b8' };
  return { fill: 'rgba(232, 121, 168, 0.15)', stroke: 'rgba(232, 121, 168, 0.4)', text: '#94a3b8' };
}

function drawNeural() {
  neuralCtx.clearRect(0, 0, neuralW, neuralH);

  // Draw grid
  neuralCtx.strokeStyle = 'rgba(12, 26, 51, 0.3)';
  neuralCtx.lineWidth = 0.5;
  const gridSize = 40;
  for (let x = 0; x < neuralW; x += gridSize) {
    neuralCtx.beginPath();
    neuralCtx.moveTo(x, 0);
    neuralCtx.lineTo(x, neuralH);
    neuralCtx.stroke();
  }
  for (let y = 0; y < neuralH; y += gridSize) {
    neuralCtx.beginPath();
    neuralCtx.moveTo(0, y);
    neuralCtx.lineTo(neuralW, y);
    neuralCtx.stroke();
  }

  // Draw edges
  edgeMap.forEach(e => {
    const isConnected = activeNode && (e.s.id === activeNode || e.t.id === activeNode);
    const isActive = e.pulse > 0;

    neuralCtx.beginPath();
    neuralCtx.moveTo(e.s.x, e.s.y);
    neuralCtx.lineTo(e.t.x, e.t.y);

    if (isConnected) {
      neuralCtx.strokeStyle = `rgba(232, 121, 168, ${0.6 + e.pulse * 0.4})`;
      neuralCtx.lineWidth = 2.5;
      neuralCtx.shadowBlur = 15;
      neuralCtx.shadowColor = 'rgba(232, 121, 168, 0.5)';
    } else if (isActive) {
      neuralCtx.strokeStyle = `rgba(37, 99, 235, ${e.pulse * 0.5})`;
      neuralCtx.lineWidth = 1.5;
      neuralCtx.shadowBlur = 8;
      neuralCtx.shadowColor = 'rgba(37, 99, 235, 0.3)';
    } else {
      neuralCtx.strokeStyle = 'rgba(100, 116, 139, 0.12)';
      neuralCtx.lineWidth = 0.8;
      neuralCtx.shadowBlur = 0;
    }
    neuralCtx.stroke();
    neuralCtx.shadowBlur = 0;

    if (isConnected && e.pulse > 0.2) {
      const t = e.signalPos;
      const px = e.s.x + (e.t.x - e.s.x) * t;
      const py = e.s.y + (e.t.y - e.s.y) * t;
      neuralCtx.beginPath();
      neuralCtx.arc(px, py, 4, 0, Math.PI * 2);
      neuralCtx.fillStyle = '#e879a8';
      neuralCtx.shadowBlur = 12;
      neuralCtx.shadowColor = 'rgba(232, 121, 168, 0.8)';
      neuralCtx.fill();
      neuralCtx.shadowBlur = 0;
    }
  });

  // Draw nodes
  skills.forEach(s => {
    const isActive = s.id === activeNode;
    const isHovered = s.id === hoveredNode;
    const colors = getNodeColor(s, isActive, isHovered);

    if (isActive || isHovered) {
      neuralCtx.beginPath();
      neuralCtx.arc(s.x, s.y, s.r + 15, 0, Math.PI * 2);
      neuralCtx.fillStyle = isActive ? 'rgba(232, 121, 168, 0.1)' : 'rgba(37, 99, 235, 0.08)';
      neuralCtx.fill();
    }

    neuralCtx.beginPath();
    neuralCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    neuralCtx.fillStyle = colors.fill;
    neuralCtx.strokeStyle = colors.stroke;
    neuralCtx.lineWidth = isActive ? 2.5 : 1.5;
    neuralCtx.fill();
    neuralCtx.stroke();

    neuralCtx.beginPath();
    neuralCtx.arc(s.x, s.y, s.r * 0.25, 0, Math.PI * 2);
    neuralCtx.fillStyle = isActive ? '#0a0f1e' : colors.stroke;
    neuralCtx.fill();

    neuralCtx.fillStyle = colors.text;
    neuralCtx.font = `${isActive ? 600 : 500} ${Math.max(10, s.r * 0.48)}px 'Space Grotesk', sans-serif`;
    neuralCtx.textAlign = 'center';
    neuralCtx.textBaseline = 'middle';
    neuralCtx.fillText(s.label, s.x, s.y);

    if (isActive) {
      neuralCtx.beginPath();
      neuralCtx.arc(s.x, s.y, s.r + 6, 0, Math.PI * 2);
      neuralCtx.strokeStyle = 'rgba(232, 121, 168, 0.4)';
      neuralCtx.lineWidth = 1;
      neuralCtx.setLineDash([4, 4]);
      neuralCtx.stroke();
      neuralCtx.setLineDash([]);
    }
  });
}

function animateNeural() {
  const neuralSection = document.getElementById('neural-section');
  if (neuralSection) {
    const rect = neuralSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      if (!neuralRunning) { resizeNeural(); neuralRunning = true; }
      updateNeural();
      drawNeural();
    } else {
      neuralRunning = false;
    }
  }
  requestAnimationFrame(animateNeural);
}

// Neural Interactions
neuralCanvas.addEventListener('click', e => {
  const rect = neuralCanvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  let clicked = null;
  skills.forEach(s => {
    const dist = Math.sqrt((mx - s.x)**2 + (my - s.y)**2);
    if (dist < s.r + 10) clicked = s;
  });

  if (clicked) {
    activeNode = clicked.id;
    clicked.pulse = 1;

    edgeMap.forEach(e => {
      if (e.s.id === clicked.id || e.t.id === clicked.id) {
        e.pulse = 1;
        e.signalPos = 0;
        e.s.pulse = Math.max(e.s.pulse, 0.7);
        e.t.pulse = Math.max(e.t.pulse, 0.7);
      }
    });

    updateInfoPanel(clicked);

    setTimeout(() => {
      if (activeNode === clicked.id) {
        activeNode = null;
        document.getElementById('neural-info').classList.remove('active');
      }
    }, 5000);
  } else {
    activeNode = null;
    document.getElementById('neural-info').classList.remove('active');
  }
});

neuralCanvas.addEventListener('mousemove', e => {
  const rect = neuralCanvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;

  let found = null;
  skills.forEach(s => {
    const dist = Math.sqrt((mouse.x - s.x)**2 + (mouse.y - s.y)**2);
    if (dist < s.r + 10) found = s;
  });
  hoveredNode = found ? found.id : null;
  neuralCanvas.style.cursor = found ? 'pointer' : 'crosshair';
});

function updateInfoPanel(skill) {
  const panel = document.getElementById('neural-info');
  const title = document.getElementById('neural-info-title');
  const skillName = document.getElementById('neural-info-skill');
  const connections = document.getElementById('neural-info-connections');

  const connected = [];
  edgeMap.forEach(e => {
    if (e.s.id === skill.id) connected.push(e.t.label);
    else if (e.t.id === skill.id) connected.push(e.s.label);
  });

  title.textContent = skill.cat.toUpperCase() + ' CAPABILITY';
  skillName.textContent = skill.label;

  if (connected.length > 0) {
    connections.innerHTML = '<strong>Signal pathways to:</strong><br>' + connected.join(', ');
  } else {
    connections.innerHTML = '<strong>Status:</strong> Independent node';
  }

  panel.classList.add('active');
}

setTimeout(() => {
  resizeNeural();
  animateNeural();
}, 300);

// ============ LANGUAGE BARS ANIMATION ============
function animateLangBars() {
  const bars = document.querySelectorAll('.lang-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => { bar.style.width = width; }, 100);
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });

  bars.forEach(bar => observer.observe(bar));
}

// ============ RESIZE HANDLER ============
window.addEventListener('resize', () => {
  resizeNebula();
  resizeBlossom();
  resizeParticles();
  if (document.getElementById('neural-section')) {
    const rect = document.getElementById('neural-section').getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      resizeNeural();
    }
  }
});

animateLangBars();

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
