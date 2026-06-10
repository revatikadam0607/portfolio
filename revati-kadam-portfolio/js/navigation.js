// ── Show/hide sections (existing logic kept) ──────────────────────────────
function showSection(id) {
  document.getElementById(id).scrollIntoView({
    behavior: "smooth"
  });

  updateActiveNav(id);
}

// ── Active nav link highlight ──────────────────────────────────────────────
function updateActiveNav(activeId) {
  document.querySelectorAll(".nav-links li").forEach(li => {
    li.classList.remove("nav-active");
  });

  // match the li whose onclick calls showSection('activeId')
  document.querySelectorAll(".nav-links li").forEach(li => {
    const onclick = li.getAttribute("onclick") || "";
    if (onclick.includes(`'${activeId}'`)) {
      li.classList.add("nav-active");
    }
  });
}

// ── Scroll progress bar ────────────────────────────────────────────────────
function initScrollProgress() {
  const bar = document.getElementById("scroll-progress");
  if (!bar) return;

  const main = document.querySelector(".main");
  if (!main) return;

  main.addEventListener("scroll", () => {
    const scrollTop  = main.scrollTop;
    const scrollMax  = main.scrollHeight - main.clientHeight;
    const pct        = scrollMax > 0 ? (scrollTop / scrollMax) * 100 : 0;
    bar.style.width  = pct + "%";
  });
}

// ── Section entrance animations via IntersectionObserver ──────────────────
function initSectionAnimations() {
  // respect reduced-motion preference
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("section-visible");
          observer.unobserve(entry.target); // animate only once
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".section").forEach(sec => observer.observe(sec));
}

// ── Toggle hamburger menu (mobile only) ────────────────────────────────────
function toggleNavbar() {
  if (window.innerWidth > 768) return;
  const nav = document.getElementById("navLinks");
  if (nav) nav.classList.toggle("show");
}

// ── Close hamburger on click outside or on window resize ──────────────────
document.addEventListener("click", (e) => {
  const navLinks = document.getElementById("navLinks");
  const hamburger = document.querySelector(".hamburger");
  if (!navLinks || !hamburger) return;
  
  if (navLinks.classList.contains("show")) {
    // If click is not inside the nav list and not on the hamburger button, close it
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      navLinks.classList.remove("show");
    }
  }
});

window.addEventListener("resize", () => {
  // If window resized to desktop (>768px), automatically clean up the mobile dropdown state
  if (window.innerWidth > 768) {
    const navLinks = document.getElementById("navLinks");
    if (navLinks && navLinks.classList.contains("show")) {
      navLinks.classList.remove("show");
    }
  }
});

// ── Init on DOM ready ──────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  // show home by default and highlight its nav link
  showSection("home");
  initScrollProgress();
  initSectionAnimations();
});