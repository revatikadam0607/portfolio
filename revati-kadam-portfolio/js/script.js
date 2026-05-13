// --- Navigation & Sections ---
function showSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

function toggleNavbar() {
  const navLinks = document.getElementById("navLinks");
  const hamburger = document.querySelector(".hamburger");
  const isExpanded = navLinks.classList.toggle("show");
  
  if (hamburger) {
    hamburger.setAttribute("aria-expanded", isExpanded);
  }
}

// --- Typing Animation ---
const roles = ["Programmer", "Student", "Web Developer", "Website Designer", "Problem Solver", "Tech Enthusiast"];
let i = 0, j = 0, del = false;

function type() {
  const typingElement = document.getElementById("typing");
  if (!typingElement) return;

  let text = roles[i];
  j = del ? j - 1 : j + 1;

  typingElement.innerText = text.substring(0, j);

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

// --- Theme & Customization ---
function setTheme(mode) {
  if (mode === "light") {
    document.documentElement.style.setProperty('--bg', '#f8fafc');
    document.documentElement.style.setProperty('--text', '#000');
    document.documentElement.style.setProperty('--card', '#e2e8f0');
  } else {
    document.documentElement.style.setProperty('--bg', '#0f172a');
    document.documentElement.style.setProperty('--text', '#fff');
    document.documentElement.style.setProperty('--card', '#1e293b');
  }
  localStorage.setItem('portfolio-theme', mode);
}

function setColor(color) {
  document.documentElement.style.setProperty('--primary', color);
  localStorage.setItem('portfolio-primary-color', color);
}

function toggleSettings() {
  document.getElementById("settingsMenu").classList.toggle("show");
}

// Initialize Theme from LocalStorage
function initCustomization() {
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  const savedColor = localStorage.getItem('portfolio-primary-color') || '#3b82f6';
  
  setTheme(savedTheme);
  setColor(savedColor);
}

// --- Interactive Effects ---
document.addEventListener("click", function (e) {
  const settings = document.querySelector(".settings");
  if (settings && !settings.contains(e.target)) {
    document.getElementById("settingsMenu").classList.remove("show");
  }
});

document.addEventListener("mousemove", e => {
  const s = document.createElement("div");
  s.className = "spark";
  s.style.left = e.pageX + "px";
  s.style.top = e.pageY + "px";
  document.body.appendChild(s);
  setTimeout(() => s.remove(), 100);
});

// --- Data Fetching ---
const skillIcons = {
  "React": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "MongoDB": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "HTML": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  "CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "Java": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  "Express.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  "Bootstrap": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  "Tailwind CSS": "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg",
  "SQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  "Object-Oriented Programming": "https://img.icons8.com/ios-filled/50/code.png",
  "Operating Systems": "https://img.icons8.com/ios-filled/50/windows-10.png",
  "Database Management Systems": "https://img.icons8.com/ios-filled/50/database.png",
  "Computer Networks": "https://img.icons8.com/ios-filled/50/network.png"
};

async function loadData() {
  try {
    // Load Skills
    const skillsRes = await fetch("data/skills.json");
    const skills = await skillsRes.json();
    const skillsContainer = document.getElementById("skills-container");
    if (skillsContainer) {
      skillsContainer.innerHTML = skills.map(skill => `
        <div class="skill-card">
          <img src="${skillIcons[skill] || ''}" alt="${skill} icon" />
          <p>${skill}</p>
        </div>
      `).join('');
    }

    // Load Projects
    const projectsRes = await fetch("data/projects.json");
    const projects = await projectsRes.json();
    const projectsContainer = document.getElementById("projects-container");
    if (projectsContainer) {
      projectsContainer.innerHTML = projects.map(p => `
        <div class="project-card">
          <h3>${p.name}</h3>
          <img src="${p.image}" alt="${p.name} preview" width="300" onerror="this.src='https://via.placeholder.com/300'">
          <div class="project-links">
            <a href="${p.live}" target="_blank" rel="noopener noreferrer">Live Demo</a>
            <a href="${p.github}" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      `).join('');
    }
  } catch (err) {
    console.error("Error loading portfolio data:", err);
  }
}

// --- Contact Form ---
function initContactForm() {
  const contactForm = document.getElementById("contact-form");
  if (!contactForm) return;

  // Initialize EmailJS with Public Key
  emailjs.init("kqnCcPYqtdwl_Oaqt");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerText;
    
    submitBtn.innerText = "Sending...";
    submitBtn.disabled = true;

    emailjs.sendForm("service_08nkbcb", "template_2yrnipb", this)
      .then(() => {
        alert("Message sent successfully!");
        this.reset();
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        alert("Failed to send message. Please try again later.");
      })
      .finally(() => {
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;
      });
  });
}

// --- Global Initialization ---
document.addEventListener("DOMContentLoaded", () => {
  initCustomization();
  type();
  loadData();
  initContactForm();
});

