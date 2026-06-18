// Load skills
fetch("data/skills.json")
  .then(res => res.json())
  .then(data => {

    const container =
      document.getElementById("skills-container");

    const tabs =
      document.querySelectorAll(".tab-btn");

    function renderSkills(category) {

      container.innerHTML = "";

      data[category].forEach(skill => {

        const card = document.createElement("div");

        card.className =
          skill.featured
          ? "skill-card featured"
          : "skill-card";

        card.innerHTML = `
          <div class="skill-card-content">

            <h3>${skill.name}</h3>

            ${
              skill.level
                ? `<span class="skill-level">
                    ${skill.level}
                  </span>`
                : ""
            }

          </div>
        `;

        container.appendChild(card);

      });
    }

    // Default category
    renderSkills("frontend");

    tabs.forEach(tab => {

      tab.addEventListener("click", () => {

        tabs.forEach(btn =>
          btn.classList.remove("active")
        );

        tab.classList.add("active");

        const category =
          tab.dataset.category;

        renderSkills(category);

      });

    });

  });

// Load projects
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