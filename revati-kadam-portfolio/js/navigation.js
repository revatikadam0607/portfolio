// ── DOM Elements
const navbar = document.getElementById("navbar");
const navIndicator = document.getElementById("navIndicator");
const desktopNavLinks = document.querySelectorAll(".desktop-nav .nav-link");
const sidebarLinks = document.querySelectorAll(".sidebar-link");
const allNavLinks = [...desktopNavLinks, ...sidebarLinks];
const hamburger = document.getElementById("hamburger");
const closeSidebarBtn = document.getElementById("closeSidebar");
const sidebarDrawer = document.getElementById("sidebarDrawer");
const navOverlay = document.getElementById("navOverlay");
const sections = document.querySelectorAll(".section");
let isMenuOpen = false;

// ── Accessibility Closures
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && isMenuOpen) {
    closeMenu();
    hamburger.focus();
  }
});

if (navOverlay) {
  navOverlay.addEventListener("click", () => {
    if (isMenuOpen) closeMenu();
  });
}

// ── Navbar Scroll Behavior
function handleScroll() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  
  if (scrollTop > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
  
  let currentSection = "";
  sections.forEach(sec => {
    const sectionTop = sec.offsetTop;
    if (scrollTop >= sectionTop - 250) {
      currentSection = sec.getAttribute("id");
    }
  });

  if (currentSection) {
    updateActiveIndicator(currentSection);
  }
}

window.addEventListener("scroll", handleScroll);

// ── Update Active Indicator
function updateActiveIndicator(activeId) {
  allNavLinks.forEach(link => {
    if (link.dataset.section === activeId) {
      link.classList.add("active");
      
      // If desktop/tablet, animate the sliding pill
      if (window.innerWidth >= 768 && link.classList.contains("nav-link")) {
        const linkRect = link.getBoundingClientRect();
        const navRect = document.getElementById("desktopNavLinks").getBoundingClientRect();
        const dotWidth = 6;
        const centerX = (linkRect.left - navRect.left) + (linkRect.width / 2) - (dotWidth / 2);
        
        gsap.to(navIndicator, {
          x: centerX,
          width: dotWidth,
          opacity: 1,
          duration: 0.4,
          ease: "power3.out",
          overwrite: "auto"
        });
      }
    } else {
      link.classList.remove("active");
    }
  });
}

// ── GSAP Navbar Entrance Animation
function animateNavbarEntrance() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  
  gsap.fromTo(navbar, 
    { y: -100, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
  );

  if (window.innerWidth >= 768) {
    gsap.fromTo(desktopNavLinks,
      { y: -15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out", delay: 0.3 }
    );
  }
}

// ── Smooth Sliding Pill Hover Effect
desktopNavLinks.forEach(link => {
  link.addEventListener("mouseenter", () => {
    if (window.innerWidth >= 768) {
      const linkRect = link.getBoundingClientRect();
      const navRect = document.getElementById("desktopNavLinks").getBoundingClientRect();
      const dotWidth = 6;
      const centerX = (linkRect.left - navRect.left) + (linkRect.width / 2) - (dotWidth / 2);
      
      gsap.to(navIndicator, {
        x: centerX,
        width: dotWidth,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto"
      });
    }
  });

  link.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById(link.dataset.section).scrollIntoView({ behavior: "smooth" });
  });
});

const desktopNavContainer = document.getElementById("desktopNavLinks");
if (desktopNavContainer) {
  desktopNavContainer.addEventListener("mouseleave", () => {
    if (window.innerWidth >= 768) {
      const activeLink = document.querySelector(".desktop-nav .nav-link.active");
      if (activeLink) {
        const linkRect = activeLink.getBoundingClientRect();
        const navRect = desktopNavContainer.getBoundingClientRect();
        const dotWidth = 6;
        const centerX = (linkRect.left - navRect.left) + (linkRect.width / 2) - (dotWidth / 2);
        
        gsap.to(navIndicator, {
          x: centerX,
          width: dotWidth,
          opacity: 1,
          duration: 0.4,
          ease: "power3.out",
          overwrite: "auto"
        });
      } else {
        gsap.to(navIndicator, { opacity: 0, duration: 0.3 });
      }
    }
  });
}

const logoLink = document.querySelector(".logo");
if (logoLink) {
  logoLink.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ── Sidebar Clicks
sidebarLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    closeMenu();
    document.getElementById(link.dataset.section).scrollIntoView({ behavior: "smooth" });
  });
});

// ── Mobile Sidebar Drawer GSAP Logic
function openMenu() {
  isMenuOpen = true;
  document.body.style.overflow = "hidden"; // Prevent scroll
  
  hamburger.classList.add("is-active");
  hamburger.setAttribute("aria-expanded", "true");
  sidebarDrawer.setAttribute("aria-hidden", "false");
  
  gsap.to(navOverlay, { autoAlpha: 1, duration: 0.4, ease: "power2.inOut" });
  gsap.to(sidebarDrawer, { x: "0%", duration: 0.6, ease: "power3.out" });
  
  gsap.fromTo(sidebarLinks,
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: "power2.out", delay: 0.2 }
  );
}

function closeMenu() {
  isMenuOpen = false;
  document.body.style.overflow = ""; // Restore scroll
  
  hamburger.classList.remove("is-active");
  hamburger.setAttribute("aria-expanded", "false");
  sidebarDrawer.setAttribute("aria-hidden", "true");
  
  gsap.to(sidebarLinks, {
    y: 20, opacity: 0, duration: 0.2, stagger: { each: 0.03, from: "end" }, ease: "power2.in"
  });
  
  gsap.to(sidebarDrawer, { x: "100%", duration: 0.5, ease: "power3.inOut", delay: 0.1 });
  gsap.to(navOverlay, { autoAlpha: 0, duration: 0.4, ease: "power2.inOut", delay: 0.2 });
}

if (hamburger) {
  hamburger.addEventListener("click", () => {
    if (isMenuOpen) closeMenu();
    else openMenu();
  });
}

if (closeSidebarBtn) {
  closeSidebarBtn.addEventListener("click", closeMenu);
}

// ── Handle Resize
window.addEventListener("resize", () => {
  if (window.innerWidth >= 768 && isMenuOpen) {
    closeMenu();
  }
  if (window.innerWidth >= 768) {
    const activeLink = document.querySelector(".desktop-nav .nav-link.active");
    if (activeLink) updateActiveIndicator(activeLink.dataset.section);
  }
});

// ── Scroll Progress & Observer Initialization
function initScrollProgress() {
  const bar = document.getElementById("scroll-progress");
  if (!bar) return;
  
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollMax = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const pct = scrollMax > 0 ? (scrollTop / scrollMax) * 100 : 0;
    bar.style.width = pct + "%";
  });
}

function initSectionAnimations() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("section-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  
  sections.forEach(sec => observer.observe(sec));
}

// ── Init on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  gsap.set(sidebarDrawer, { x: "100%" }); // Initialize drawer position
  animateNavbarEntrance();
  handleScroll(); 
  initScrollProgress();
  initSectionAnimations();
});