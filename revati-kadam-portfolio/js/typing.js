const roles = [
  "Programmer",
  "Student",
  "Web Developer",
  "Website Designer",
  "Problem Solver",
  "Tech Enthusiast"
];

let i = 0, j = 0, current = "", deleting = false;

function type() {
  current = roles[i];

  if (deleting) j--;
  else j++;

  document.getElementById("typing").innerText =
    current.substring(0, j);

  if (!deleting && j === current.length) {
    deleting = true;
    setTimeout(type, 1000);
  } else if (deleting && j === 0) {
    deleting = false;
    i = (i + 1) % roles.length;
  }

  setTimeout(type, deleting ? 50 : 100);
}

type();