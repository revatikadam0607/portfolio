// Load experience
fetch("data/experience.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("experience-container");

    data.forEach(experience => {
      const item = document.createElement("div");
      item.className = "timeline-item";

      const achievementsList = experience.achievements
        .map(achievement => `<li>${achievement}</li>`)
        .join("");

      const techTags = experience.tech
        .map(tech => `<span class="timeline-tag">${tech}</span>`)
        .join("");

      item.innerHTML = `
        <div class="timeline-item-header">
          <div>
            <h3 class="timeline-item-title">${experience.title}</h3>
            <p class="timeline-item-subtitle">${experience.company}</p>
          </div>
          <span class="timeline-item-duration">${experience.duration}</span>
        </div>
        <p class="timeline-item-description">${experience.description}</p>
        <ul class="timeline-item-list">
          ${achievementsList}
        </ul>
        <div class="timeline-item-tags">
          ${techTags}
        </div>
      `;

      container.appendChild(item);
    });
  });

// Load education
fetch("data/education.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("education-container");

    data.forEach(edu => {
      const item = document.createElement("div");
      item.className = "timeline-item";

      const highlightsList = edu.highlights
        .map(highlight => `<li>${highlight}</li>`)
        .join("");

      const gpaDisplay = edu.gpa ? `<span class="education-gpa">GPA: ${edu.gpa}</span>` : "";

      item.innerHTML = `
        <div class="timeline-item-header">
          <div>
            <h3 class="timeline-item-title">${edu.degree}</h3>
            <p class="timeline-item-subtitle">${edu.institution}</p>
          </div>
          <span class="timeline-item-duration">${edu.duration}</span>
        </div>
        ${gpaDisplay}
        <ul class="timeline-item-list">
          ${highlightsList}
        </ul>
      `;

      container.appendChild(item);
    });
  });
  