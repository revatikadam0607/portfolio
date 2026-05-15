function showSection(id, scope = document) {
  const target = scope.getElementById(id);
  if (!target) return;

  scope.querySelectorAll("[data-section]").forEach(s => {
    s.classList.remove("active");
  });

  target.classList.add("active");
}
