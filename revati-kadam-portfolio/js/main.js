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
    const container = document.getElementById("projects-container");

    data.forEach(project => {
      const div = document.createElement("div");

      div.innerHTML = `
        <h3>${project.name}</h3>
        <img src="${project.image}" width="300">
        <br>
        <a href="${project.live}">Live</a> |
        <a href="${project.github}">GitHub</a>
      `;

      container.appendChild(div);
    });
  });
  