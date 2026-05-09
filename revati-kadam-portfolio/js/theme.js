function setTheme(mode){
  if(mode==="light"){
    document.documentElement.style.setProperty('--bg','#f8fafc');
    document.documentElement.style.setProperty('--text','#111');
    document.documentElement.style.setProperty('--card','#e2e8f0');
    document.documentElement.style.setProperty('--sidebar','#e2e8f0');
    document.documentElement.style.setProperty('--btn','#f1f5f9');
    document.documentElement.style.setProperty('--secondary-bg','#cbd5e1');
  } else {
    document.documentElement.style.setProperty('--bg','#0f172a');
    document.documentElement.style.setProperty('--text','#e5e7eb');
    document.documentElement.style.setProperty('--card','#1e293b');
    document.documentElement.style.setProperty('--sidebar','#020617');
    document.documentElement.style.setProperty('--btn','#333');
    document.documentElement.style.setProperty('--secondary-bg','#1e293b');
  }
}