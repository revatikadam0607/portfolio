function showSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

const roles = ["Web Developer", "Programmer", "Problem Solver", "Website Designer", "Tech Enthusiast"];
let i = 0, j = 0, del = false;

function type() {
  let text = roles[i];
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

(function() {
  const saved = localStorage.getItem("theme");
  if (saved === "light") document.body.classList.add("light-theme");
})();

function setTheme(mode) {
  if (mode === "light") {
    document.body.classList.add("light-theme");
  } else {
    document.body.classList.remove("light-theme");
  }
  localStorage.setItem("theme", mode);
}

function setColor(color) {
  document.documentElement.style.setProperty('--primary', color);
}

function toggleSettings() {
  document.getElementById("settingsMenu").classList.toggle("show");
}

document.addEventListener("click", function (e) {
  const settings = document.querySelector(".settings");
  if (!settings.contains(e.target)) {
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

// Hamburger toggle
function toggleNavbar() {
  const links = document.getElementById("navLinks");
  if (window.innerWidth <= 768) {
    links.classList.toggle("show");
  }
}
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
        <div class="project-info">
          <h3>${p.name}</h3>
          <p>${p.description || ""}</p>
          <div class="tech-tags">${techTags}</div>
          <div class="project-links">
            <a href="${p.live}" target="_blank">Live ↗</a>
            <a href="${p.github}" target="_blank">GitHub ↗</a>
          </div>
        </div>
      `;
      c.appendChild(d);
    });
  })
  .catch(() => {
    document.getElementById("projects-container").innerHTML = "<p>Could not load projects.</p>";
  });

// ── EMAILJS ──
(function () {
  emailjs.init("kqnCcPYqtdwl_Oaqt");
})();

document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const btn = this.querySelector("button");
  btn.textContent = "Sending...";
  btn.disabled = true;

  emailjs.sendForm("service_08nkbcb", "template_2yrnipb", this)
    .then(() => {
      alert("Message sent successfully!");
      this.reset();
      btn.textContent = "Send Message";
      btn.disabled = false;
    }, () => {
      alert("Failed to send. Please try again.");
      btn.textContent = "Send Message";
      btn.disabled = false;
    });
});