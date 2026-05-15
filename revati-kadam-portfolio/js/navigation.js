function showSection(id) {
  document.querySelectorAll(".section").forEach(s => {
    s.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");
}

function toggleNavbar() {
  const navLinks = document.getElementById("navLinks");
  navLinks.classList.toggle("active");
}