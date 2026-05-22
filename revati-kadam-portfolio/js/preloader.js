const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', () => {
  if (prefersReducedMotion) {
    const loader = document.getElementById("preloader");
    if (loader) loader.style.display = "none";
    document.body.classList.remove("loading");
    if (typeof initHeroV2 === "function") {
      initHeroV2();
    }
    return;
  }
  
  startPreloaderAnimation();
});

function startPreloaderAnimation() {
  const circleEl = document.getElementById("preloaderCircle");
  
  // Set up GSAP timeline
  const tl = gsap.timeline();
  
  // 1. Premium Logo Character Reveal (Staggered scale, translation, and rotational flip)
  tl.fromTo('.preloader-logo span', 
    { y: 40, rotateX: -60, opacity: 0 },
    { y: 0, rotateX: 0, opacity: 1, duration: 0.8, stagger: 0.04, ease: "back.out(1.5)" }
  );
  
  // Status messages and transition tracking variables
  const statusMessages = [
    { min: 0, max: 20, text: "CONNECTING TO PORTFOLIO NODE..." },
    { min: 20, max: 45, text: "INITIALIZING DIGITAL GRIDS..." },
    { min: 45, max: 70, text: "RESOLVING IMMERSIVE PHYSICS..." },
    { min: 70, max: 90, text: "STABILIZING GRAPHICS MESH..." },
    { min: 90, max: 100, text: "PREPARING INTERFACE..." }
  ];
  
  let lastHundreds = -1;
  let lastTens = -1;
  let lastOnes = -1;
  let lastStatusText = "";
  
  // Progress tracker object
  const progressObj = { value: 0 };
  
  // 2. Count progress from 0 to 100
  tl.to(progressObj, {
    value: 100,
    duration: 2.2,
    ease: "power2.out",
    onUpdate: () => {
      const roundedVal = Math.floor(progressObj.value);
      
      // A. Update Circular Progress Stroke
      if (circleEl) {
        // stroke-dasharray is 282.7 (2 * PI * r)
        const offset = 282.7 - (roundedVal / 100) * 282.7;
        circleEl.style.strokeDashoffset = offset;
      }
      
      // B. Calculate digits for mechanical rolling ticker
      const hundreds = Math.floor(roundedVal / 100);
      const tens = Math.floor((roundedVal % 100) / 10);
      const ones = roundedVal % 10;
      
      // C. Animate Hundreds Digit Column (only visible at >= 100%)
      if (hundreds !== lastHundreds) {
        lastHundreds = hundreds;
        const col = document.getElementById("tickerHundreds");
        if (col) {
          if (hundreds > 0) {
            col.classList.add("visible");
          }
          gsap.to(col, { y: -hundreds * 36, duration: 0.4, ease: "back.out(1.2)" });
        }
      }
      
      // D. Animate Tens Digit Column
      if (tens !== lastTens) {
        lastTens = tens;
        const col = document.getElementById("tickerTens");
        if (col) {
          gsap.to(col, { y: -tens * 36, duration: 0.35, ease: "back.out(1.2)" });
        }
      }
      
      // E. Animate Ones Digit Column
      if (ones !== lastOnes) {
        lastOnes = ones;
        const col = document.getElementById("tickerOnes");
        if (col) {
          gsap.to(col, { y: -ones * 36, duration: 0.15, ease: "power1.out" });
        }
      }
      
      // F. Smooth change transition for status messages
      const activeMsg = statusMessages.find(m => roundedVal >= m.min && roundedVal <= m.max)?.text || "";
      if (activeMsg !== lastStatusText) {
        lastStatusText = activeMsg;
        const statusEl = document.getElementById("preloaderStatus");
        if (statusEl) {
          gsap.to(statusEl, { 
            opacity: 0, 
            y: -5, 
            duration: 0.1, 
            onComplete: () => {
              statusEl.innerText = activeMsg;
              gsap.to(statusEl, { opacity: 0.8, y: 0, duration: 0.15 });
            }
          });
        }
      }
    },
    onComplete: dismissPreloader
  }, "-=0.2");
}

function dismissPreloader() {
  const exitTimeline = gsap.timeline({
    onComplete: () => {
      const loader = document.getElementById("preloader");
      if (loader) loader.style.display = "none";
      document.body.classList.remove("loading");
    }
  });
  
  // 1. Stagger letters out upwards with tilt rotation
  exitTimeline.to('.preloader-logo span', {
    y: -40,
    rotateX: 45,
    opacity: 0,
    duration: 0.45,
    stagger: 0.02,
    ease: "power2.in"
  }, 0);
  
  // 2. Fade out other loading dashboard components
  exitTimeline.to(['.preloader-dashboard', '.preloader-radial'], {
    opacity: 0,
    scale: 0.9,
    duration: 0.4,
    ease: "power2.in"
  }, 0);
  
  // 3. Staggered, skewed diagonal curtain split reveals
  
  // LAYER 1: Frontmost solid curtains
  exitTimeline.to('.preloader-curtain--left.preloader-curtain--layer1', {
    xPercent: -105,
    skewX: -10,
    duration: 1.1,
    ease: "power3.inOut"
  }, 0.2);
  
  exitTimeline.to('.preloader-curtain--right.preloader-curtain--layer1', {
    xPercent: 105,
    skewX: 10,
    duration: 1.1,
    ease: "power3.inOut"
  }, "<");
  
  // LAYER 2: Middle colored gradient curtains
  exitTimeline.to('.preloader-curtain--left.preloader-curtain--layer2', {
    xPercent: -105,
    skewX: -7,
    duration: 1.25,
    ease: "power3.inOut"
  }, 0.28);
  
  exitTimeline.to('.preloader-curtain--right.preloader-curtain--layer2', {
    xPercent: 105,
    skewX: 7,
    duration: 1.25,
    ease: "power3.inOut"
  }, "<");
  
  // LAYER 3: Backmost glassmorphic blur curtains
  exitTimeline.to('.preloader-curtain--left.preloader-curtain--layer3', {
    xPercent: -105,
    skewX: -4,
    duration: 1.4,
    ease: "power3.inOut"
  }, 0.36);
  
  exitTimeline.to('.preloader-curtain--right.preloader-curtain--layer3', {
    xPercent: 105,
    skewX: 4,
    duration: 1.4,
    ease: "power3.inOut"
  }, "<");
  
  // 4. Hero Cinematic Handoff
  const heroEl = document.querySelector('.hero-v2');
  if (heroEl) {
    gsap.set(heroEl, { scale: 0.96, filter: "blur(8px)" });
    exitTimeline.to(heroEl, {
      scale: 1,
      filter: "blur(0px)",
      duration: 1.5,
      ease: "power2.out"
    }, 0.36); // Starts exactly when the glassmorphic layer begins to pull back
  }
  
  // Trigger standard hero element staggers mid-reveal
  exitTimeline.call(() => {
    if (typeof initHeroV2 === "function") {
      initHeroV2();
    }
  }, null, 0.44);
}
