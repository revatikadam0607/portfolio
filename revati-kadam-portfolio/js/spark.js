let lastTime = 0;

document.addEventListener("mousemove", e => {
  const now = Date.now();

  if (now - lastTime < 40) return; // control speed (increase = slower)

  lastTime = now;

  const s = document.createElement("div");
  s.className = "spark";
  s.style.left = e.pageX + "px";
  s.style.top = e.pageY + "px";

  document.body.appendChild(s);

  setTimeout(() => s.remove(), 300); // slightly longer visibility
});