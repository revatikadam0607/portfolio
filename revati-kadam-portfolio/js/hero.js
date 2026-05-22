/* ═══════════════════════════════════════════
   HERO V2 — Immersive Motion Engine (GSAP & Canvas)
   Staggered Load, Orbital Physics, Magnetic Hooks, Canvas Repulsion
   ═══════════════════════════════════════════ */

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobile = window.matchMedia('(max-width: 767px)').matches;

// Decoupled trigger: initHeroV2() is now called by the preloader script on loading completion.


function initHeroV2() {
  if (prefersReduced) {
    showAllInstant();
    return;
  }

  // 1. Entrance Staggered Orchestration
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // Activate glows and meshes
  tl.to('.hv2-radial--a', { opacity: 1, duration: 2.0 }, 0.0)
    .to('.hv2-radial--b', { opacity: 1, duration: 2.0 }, 0.2)
    .to('.hv2-radial--c', { opacity: 1, duration: 1.5 }, 0.4);

  // Stagger Header Navigation items
  tl.fromTo('.navbar .logo', 
    { y: -20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8 }, 0.2);

  tl.fromTo('.desktop-nav .nav-link',
    { y: -20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 }, 0.3);

  tl.fromTo('.nav-actions',
    { y: -20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8 }, 0.5);

  // Left Content Text Elements
  tl.fromTo('.hv2-eyebrow-wrap',
    { y: 24, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8 }, 0.4);

  tl.fromTo('.hv2-heading',
    { y: 35, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.0 }, 0.6);

  tl.fromTo('.hv2-typing-wrap',
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8 }, 0.95);

  tl.fromTo('.hv2-desc',
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8 }, 1.1);

  tl.fromTo('#hv2CTA',
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8 }, 1.25);

  tl.fromTo('#hv2Social',
    { y: 15, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8 }, 1.35);

  // Right Centerpiece Portrait Scene
  tl.fromTo('#hv2Portrait',
    { scale: 0.88, opacity: 0, rotationY: -15, y: 30 },
    { scale: 1, opacity: 1, rotationY: 0, y: 0, duration: 1.5, ease: 'power4.out' },
    0.85);

  tl.fromTo('#statusBadge',
    { y: 20, opacity: 0, scale: 0.85 },
    { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.4)' },
    1.4);

  // Bottom Stats Panel
  tl.fromTo('#heroStatsPanel',
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out' },
    1.4);

  // Scroll Down Indicator
  tl.fromTo('#scrollIndicator',
    { y: 15, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8 },
    1.6);

  // Loop & Ambient Handlers Initialization
  tl.add(() => {
    initOrbitRotation();
    if (!isMobile) {
      initParallax();
      initMagneticInteractivity();
    }
    initCanvasMesh();
  }, 1.8);
}

function showAllInstant() {
  gsap.set([
    '.hv2-radial', '.navbar .logo', '.desktop-nav .nav-link', '.nav-actions',
    '.hv2-eyebrow-wrap', '.hv2-heading', '.hv2-typing-wrap', '.hv2-desc',
    '#hv2CTA', '#hv2Social', '#hv2Portrait', '#statusBadge',
    '#heroStatsPanel', '#scrollIndicator'
  ], { opacity: 1, y: 0, scale: 1, rotationY: 0, skewX: 0 });
}

/* ── GSAP CONTINUOUS ORBIT ROTATION ── */
function initOrbitRotation() {
  gsap.to('#portraitOrbital', {
    rotation: 360,
    duration: 20,
    repeat: -1,
    ease: 'none'
  });
  gsap.to('#portraitOrbital2', {
    rotation: -360,
    duration: 30,
    repeat: -1,
    ease: 'none'
  });
}

/* ── MULTI-DEPTH MOUSE PARALLAX ── */
function initParallax() {
  const scene = document.querySelector('.hero-v2');
  const chassis = document.getElementById('portraitChassis');
  const glow = document.getElementById('portraitGlow');
  const img = document.getElementById('portraitImg');
  const badge = document.getElementById('statusBadge');

  if (!scene || !chassis) return;

  let mx = 0, my = 0, raf = null;

  function update() {
    gsap.to(chassis, {
      rotationY: mx * 12, rotationX: -my * 10,
      x: mx * 12, y: my * 12,
      duration: 1.2, ease: 'power2.out', overwrite: 'auto'
    });
    gsap.to(img, {
      x: -mx * 10, y: -my * 8,
      duration: 1.4, ease: 'power2.out', overwrite: 'auto'
    });
    gsap.to(glow, {
      x: mx * 30, y: my * 24,
      duration: 1.8, ease: 'power2.out', overwrite: 'auto'
    });
    gsap.to(badge, {
      x: mx * 20, y: my * 15,
      duration: 1.0, ease: 'power2.out', overwrite: 'auto'
    });
    raf = null;
  }

  scene.addEventListener('mousemove', e => {
    const r = scene.getBoundingClientRect();
    mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    my = ((e.clientY - r.top) / r.height - 0.5) * 2;
    if (!raf) raf = requestAnimationFrame(update);
  });

  scene.addEventListener('mouseleave', () => {
    mx = 0; my = 0;
    gsap.to([chassis, img, glow, badge], {
      x: 0, y: 0, rotationX: 0, rotationY: 0,
      duration: 1.6, ease: 'elastic.out(1, 0.35)', overwrite: 'auto'
    });
  });
}

/* ── MAGNETIC HOOKS INTERACTIVITY ── */
function initMagneticInteractivity() {
  const magneticElements = document.querySelectorAll('.magnetic-btn, .hv2-circular-frame, .hv2-status-card');
  
  magneticElements.forEach(elem => {
    elem.addEventListener('mousemove', e => {
      const r = elem.getBoundingClientRect();
      const pullStrength = elem.classList.contains('hv2-circular-frame') ? 0.08 : 0.22;
      const dx = (e.clientX - r.left - r.width / 2) * pullStrength;
      const dy = (e.clientY - r.top - r.height / 2) * pullStrength;
      
      gsap.to(elem, {
        x: dx,
        y: dy,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    });

    elem.addEventListener('mouseleave', () => {
      gsap.to(elem, {
        x: 0,
        y: 0,
        duration: 0.9,
        ease: 'elastic.out(1, 0.3)',
        overwrite: 'auto'
      });
    });
  });
}

/* ── KINETIC CANVAS PARTICLE MESH (Repulsion Physics) ── */
function initCanvasMesh() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  const spacing = 40;
  let mouse = { x: -1000, y: -1000 };
  let animationFrameId;

  function resizeCanvas() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
    generateGrid();
  }

  function generateGrid() {
    particles = [];
    const cols = Math.floor(canvas.width / spacing) + 2;
    const rows = Math.floor(canvas.height / spacing) + 2;

    // We only generate grid points for the bottom half to create a floor grid wave
    const startRow = Math.floor(rows * 0.55);

    for (let r = startRow; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        particles.push({
          baseX: c * spacing,
          baseY: r * spacing,
          x: c * spacing,
          y: r * spacing,
          vx: 0,
          vy: 0
        });
      }
    }
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  const scene = document.querySelector('.hero-v2');
  scene.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  });

  scene.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(99, 102, 241, 0.25)';

    particles.forEach(p => {
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 180;

      if (dist < maxDist) {
        const force = (maxDist - dist) / maxDist;
        p.vx -= (dx / dist) * force * 1.2;
        p.vy -= (dy / dist) * force * 1.2;
      }

      // Spring physics back to grid coordinate anchor
      p.vx += (p.baseX - p.x) * 0.05;
      p.vy += (p.baseY - p.y) * 0.05;

      // Friction damping
      p.vx *= 0.83;
      p.vy *= 0.83;

      p.x += p.vx;
      p.y += p.vy;

      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    });

    animationFrameId = requestAnimationFrame(animate);
  }

  animate();
}
