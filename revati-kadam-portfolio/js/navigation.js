// ── THEME (run immediately to avoid flash) ──
(function () {
  const saved = localStorage.getItem("theme");
  if (saved === "light") document.body.classList.add("light-theme");
})();

// ── TYPING ANIMATION ──
const roles = ["Software Engineer", "Full-Stack Developer", "Problem Solver", "Open-Source Contributor"];
let i = 0, j = 0, del = false;

function type() {
  const text = roles[i];
  j = del ? j - 1 : j + 1;
  document.getElementById("typing").innerText = text.substring(0, j);
  if (!del && j === text.length) {
    del = true;
    return setTimeout(type, 1500);
  }
  if (del && j === 0) {
    del = false;
    i = (i + 1) % roles.length;
  }
  setTimeout(type, del ? 80 : 180);
}
type();

// ── SHOW SECTION (smooth scroll) ──
function showSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// ── HAMBURGER TOGGLE ──
function toggleNavbar() {
  const nav = document.getElementById("navLinks");
  if (nav) nav.classList.toggle("show");
}

// ── SETTINGS MENU ──
function toggleSettings() {
  document.getElementById("settingsMenu").classList.toggle("show");
}

function setTheme(mode) {
  if (mode === "light") {
    document.body.classList.add("light-theme");
  } else {
    document.body.classList.remove("light-theme");
  }
  localStorage.setItem("theme", mode);
}

function setColor(color) {
  document.documentElement.style.setProperty("--primary", color);
}

// Close settings when clicking outside
document.addEventListener("click", function (e) {
  const settings = document.querySelector(".settings");
  const menu = document.getElementById("settingsMenu");
  if (settings && menu && !settings.contains(e.target)) {
    menu.classList.remove("show");
  }
});

// ── SCROLL PROGRESS BAR ──
const progressBar = document.getElementById("scroll-progress");
window.addEventListener("scroll", () => {
  if (!progressBar) return;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = pct + "%";
});

// ── INTERSECTION OBSERVER — makes sections visible + highlights navbar ──
const sections = document.querySelectorAll(".section");
const navItems = document.querySelectorAll(".nav-links li");

// Make ALL sections visible immediately as a fallback
// (in case IntersectionObserver doesn't fire, e.g. file:// protocol)
sections.forEach(sec => sec.classList.add("section-visible"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      // Reveal section when it enters viewport
      if (entry.isIntersecting) {
        entry.target.classList.add("section-visible");

        // Highlight matching nav item
        const id = entry.target.getAttribute("id");
        navItems.forEach(item => {
          item.classList.remove("nav-active");
          // Match by the onclick text, e.g. showSection('certifications')
          const onclick = item.getAttribute("onclick") || "";
          if (onclick.includes(`'${id}'`)) {
            item.classList.add("nav-active");
          }
        });
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: "-60px 0px -60px 0px"
  }
);

sections.forEach(sec => observer.observe(sec));

// ── CUSTOM CURSOR ──
const cursorReticle = document.querySelector(".cursor-reticle");

if (cursorReticle) {
  window.addEventListener("mousemove", e => {
    cursorReticle.style.left = e.clientX + "px";
    cursorReticle.style.top = e.clientY + "px";
  });

  document.querySelectorAll("a, button, .skill-tab, .details-toggle").forEach(el => {
    el.addEventListener("mouseenter", () => cursorReticle.classList.add("cursor-active"));
    el.addEventListener("mouseleave", () => cursorReticle.classList.remove("cursor-active"));
  });
}