function showSection(id){
  document.getElementById(id).scrollIntoView({behavior:"smooth"});
}

// Typing
const roles=["Programmer", "Student","Web Developer","Website Designer","Problem Solver","Tech Enthusiast"];
let i=0,j=0,del=false;

function type(){
  let text=roles[i];
  j=del?j-1:j+1;

  document.getElementById("typing").innerText=text.substring(0,j);

  if(!del && j===text.length){
    del=true;
    return setTimeout(type,1500);
  }

  if(del && j===0){
    del=false;
    i=(i+1)%roles.length;
  }

  setTimeout(type,del?80:180);
}
type();

// Theme
function setTheme(mode){
  if(mode==="light"){
    document.documentElement.style.setProperty('--bg','#f8fafc');
    document.documentElement.style.setProperty('--text','#000');
    document.documentElement.style.setProperty('--card','#e2e8f0');
    document.documentElement.style.setProperty('--sidebar','#e5e7eb'); // FIXED
  } else {
    document.documentElement.style.setProperty('--bg','#0f172a');
    document.documentElement.style.setProperty('--text','#fff');
    document.documentElement.style.setProperty('--card','#1e293b');
    document.documentElement.style.setProperty('--sidebar','#020617');
  }
}

// Color
function setColor(color){
  document.documentElement.style.setProperty('--primary',color);
}

// Settings
function toggleSettings(){
  document.getElementById("settingsMenu").classList.toggle("show");
}

document.addEventListener("click", function(e){
  const settings=document.querySelector(".settings");
  if(!settings.contains(e.target)){
    document.getElementById("settingsMenu").classList.remove("show");
  }
});

// ❤️ Spark
document.addEventListener("mousemove", e=>{
  const s=document.createElement("div");
  s.className="spark";
  s.style.left=e.pageX+"px";
  s.style.top=e.pageY+"px";
  document.body.appendChild(s);
  setTimeout(()=>s.remove(),100);
});

// Skills
fetch("data/skills.json")
.then(res => res.json())
.then(data => {
  const container = document.getElementById("skills-container");
  container.innerHTML = "";

  data.forEach(skill => {
    const card = document.createElement("div");
    card.className = "skill-card";

    card.innerHTML = `
      <img src="${skillIcons[skill] || ''}" />
      <p>${skill}</p>
    `;

    container.appendChild(card);
  });
});
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

// Projects
fetch("data/projects.json")
.then(res => res.json())
.then(data => {
  const c = document.getElementById("projects-container");

  c.innerHTML = ""; // clear first

  data.forEach(p => {
    let d = document.createElement("div");

    d.innerHTML = `
      <h3>${p.name}</h3>
      <img src="${p.image}" width="300" onerror="this.src='https://via.placeholder.com/300'">
      <br>
      <a href="${p.live}" target="_blank">Live</a> |
      <a href="${p.github}" target="_blank">GitHub</a>
    `;

    c.appendChild(d);
  });
})
.catch(err => {
  document.getElementById("projects-container").innerHTML = "Error loading projects";
});
// EMAILJS INIT (IMPORTANT)
(function(){
  emailjs.init("YOUR_PUBLIC_KEY"); // replace
})();

// CONTACT FORM SEND
document.getElementById("contact-form").addEventListener("submit", function(e){
  e.preventDefault();

  emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", this)
    .then(function(){
      alert("Message sent successfully!");
      this.reset();
     }).catch((error) => {
    console.log("Error:", error);
    alert("Failed to send message.");
  });
});

// Initialize EmailJS
(function(){
  emailjs.init("kqnCcPYqtdwl_Oaqt");
})();

// Send form
document.getElementById("contact-form").addEventListener("submit", function(e){
  e.preventDefault();

  emailjs.sendForm("service_08nkbcb", "template_2yrnipb", this)
    .then(function(){
      alert("Message sent successfully!");
    }, function(error){
      alert("Failed to send message.");
    });
});