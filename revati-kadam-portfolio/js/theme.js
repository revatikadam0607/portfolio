function setTheme(mode){
  if(mode==="light"){
    document.documentElement.style.setProperty('--bg','#f8fafc');
    document.documentElement.style.setProperty('--text','#111');
    document.documentElement.style.setProperty('--card','#e2e8f0');
  } else {
    document.documentElement.style.setProperty('--bg','#0f172a');
    document.documentElement.style.setProperty('--text','#e5e7eb');
    document.documentElement.style.setProperty('--card','#1e293b');
  }
}