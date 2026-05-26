// --- Documentation & FAQ Logic ---
const overlayContent = {
  privacy: `
    <h2 id="overlay-title">🛡️ Privacy Policy</h2>
    <p>Last updated: May 2024</p>
    <h3>1. Data Collection</h3>
    <p>We only collect data that you voluntarily provide through the contact form (Name, Email, Message). This data is processed via EmailJS and is not stored on our local database.</p>
    <h3>2. Usage of Information</h3>
    <p>The information provided is used solely for the purpose of responding to your inquiries.</p>
    <h3>3. Data Persistence</h3>
    <p>We use local storage to save your theme and color preferences for a better user experience. No tracking cookies are utilized.</p>
  `,
  terms: `
    <h2 id="overlay-title">⚖️ Terms of Service</h2>
    <p>By using this portfolio, you agree to the following terms:</p>
    <h3>1. Content Ownership</h3>
    <p>The code, design, and content of this portfolio are the intellectual property of Revati Kadam unless otherwise stated.</p>
    <h3>2. External Links</h3>
    <p>This site contains links to external platforms like GitHub and LinkedIn. We are not responsible for the content or privacy practices of these third-party sites.</p>
    <h3>3. Limitation of Liability</h3>
    <p>The projects and information provided are for demonstration purposes and come with no warranty.</p>
  `,
  docs: `
    <h2 id="overlay-title">📖 Documentation</h2>
    <h3>Technical Stack</h3>
    <p>This portfolio is built using modern web standards:</p>
    <ul>
      <li><b>Structure</b>: Semantic HTML5</li>
      <li><b>Styling</b>: Modern CSS with Grid and Flexbox</li>
      <li><b>Interactivity</b>: Vanilla JavaScript (ES6+)</li>
      <li><b>API Integration</b>: EmailJS for form handling</li>
    </ul>
    <h3>Feature List</h3>
    <p>• Dynamic theme and accent color switcher.</p>
    <p>• Intersection Observer for active navigation tracking.</p>
    <p>• Mobile-first responsive design.</p>
    <p>• Data-driven skills and projects sections.</p>
  `
};

function openOverlay(type) {
  const overlay = document.getElementById("docs-overlay");
  const content = document.getElementById("overlay-content");
  if (overlay && content && overlayContent[type]) {
    content.innerHTML = overlayContent[type];
    overlay.classList.add("show");
    document.body.style.overflow = "hidden"; // Prevent background scroll
    // Scroll to top of overlay
    document.querySelector(".overlay-card").scrollTop = 0;
  }
}

function closeOverlay() {
  const overlay = document.getElementById("docs-overlay");
  if (overlay) {
    overlay.classList.remove("show");
    document.body.style.overflow = "auto";
  }
}

function toggleAccordion(header) {
  const item = header.parentElement;
  const isActive = item.classList.contains("active");

  // Close all other items
  document.querySelectorAll(".accordion-item").forEach(i => {
    i.classList.remove("active");
    i.querySelector(".accordion-header").setAttribute("aria-expanded", "false");
  });

  if (!isActive) {
    item.classList.add("active");
    header.setAttribute("aria-expanded", "true");
  }
}

// Close overlay on escape key or outside click
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeOverlay();
});

window.addEventListener("click", (e) => {
  const overlay = document.getElementById("docs-overlay");
  if (e.target === overlay) closeOverlay();
});

// --- Navigation & Sections ---
function showSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
    // Update URL hash without jumping
    history.pushState(null, null, `#${id}`);
    updateActiveLink(id);
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

function updateActiveLink(id) {
  const buttons = document.querySelectorAll(".nav-links li button");
  buttons.forEach(btn => {
    const onClick = btn.getAttribute("onclick");
    if (onClick && onClick.includes(`'${id}'`)) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

// Navbar Scroll Effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Section Observer for Active Links
function initSectionObserver() {
  const sections = document.querySelectorAll(".section");
  const options = {
    threshold: 0.6
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        updateActiveLink(entry.target.id);
      }
    });
  }, options);

  sections.forEach(section => {
    observer.observe(section);
  });
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

  // Close nav on mobile if clicking link
  const navLinks = document.getElementById("navLinks");
  if (navLinks.classList.contains("show") && e.target.closest(".nav-links li button")) {
    toggleNavbar();
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
  "Computer Networks": "https://img.icons8.com/ios-filled/50/network.png",
  "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  "GitHub": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  "VS Code": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
  "Netlify": "https://www.vectorlogo.zone/logos/netlify/netlify-icon.svg",
  "Docker": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  "AWS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
};

fetch("data/skills.json")
  .then(res => res.json())
  .then(data => {

    const container =
      document.getElementById("skills-container");

    container.innerHTML = "";

    Object.entries(data).forEach(
      ([category, skills]) => {

        const section =
          document.createElement("div");

        section.className =
          "skills-category";

        section.dataset.category =
          category;

        section.innerHTML = `
          <h3 class="skills-category-title">
            ${category}
          </h3>

          <div class="skills-grid"></div>
        `;

        const grid =
          section.querySelector(".skills-grid");

        skills.forEach(skill => {

          const card =
            document.createElement("div");

          card.className = "skill-card";

          card.innerHTML = `
            <div class="skill-card-content">

              <img
                src="${skillIcons[skill.name]}"
                alt="${skill.name}"
              >

              <h3>${skill.name}</h3>

              <span class="skill-level">
                ${skill.level}
              </span>

            </div>
          `;

          grid.appendChild(card);
        });

        container.appendChild(section);
      });
  })
  .catch(() => {

    document.getElementById(
      "skills-container"
    ).innerHTML =
      "<p>Could not load skills.</p>";
  });
  document.addEventListener(
  "click",
  function(e) {

    if (
      e.target.classList.contains(
        "skill-tab"
      )
    ) {

      const tabs =
        document.querySelectorAll(
          ".skill-tab"
        );

      tabs.forEach(tab =>
        tab.classList.remove("active")
      );

      e.target.classList.add("active");

      const category =
        e.target.dataset.category;

      const sections =
        document.querySelectorAll(
          ".skills-category"
        );

      sections.forEach(section => {

        if (
          category === "all"
        ) {

          section.style.display =
            "block";

        } else {

          section.style.display =
            section.dataset.category === category
              ? "block"
              : "none";
        }
      });
    }
  }
);

fetch("data/projects.json")
  .then(res => res.json())
  .then(data => {
    const c = document.getElementById("projects-container");
    c.innerHTML = "";
    data.forEach(p => {
      const d = document.createElement("div");
      d.className = "project-card";
      const techTags = (p.tech || []).map(t => `<span class="tech-tag">${t}</span>`).join("");
      d.innerHTML = `
        <div class="project-thumb">
          <img src="${p.image}" alt="${p.name}" onerror="this.parentElement.style.background='#1e3a5f'; this.style.display='none'">
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
          <img src="${p.image}" alt="${p.name} preview" onerror="this.src='https://via.placeholder.com/350x220'">
          <h3>${p.name}</h3>
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
  initSectionObserver();

  // Handle Initial Hash
  const hash = window.location.hash.substring(1);
  if (hash) {
    setTimeout(() => showSection(hash), 500);
  }
});

