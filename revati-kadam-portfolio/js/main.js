// Load skills
fetch("data/skills.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("skills-container");

    data.forEach(skill => {
      const btn = document.createElement("button");
      btn.innerText = skill;
      btn.className = "skills-btn";
      container.appendChild(btn);
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