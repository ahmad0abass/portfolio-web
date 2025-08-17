(() => {
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');

  const systemPrefersDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;
  const stored = localStorage.getItem('theme');
  const initial = stored || (systemPrefersDark() ? 'dark' : 'light');
  root.setAttribute('data-theme', initial);

  function updateButton() {
    if (!btn) return;
    const mode = root.getAttribute('data-theme');
    btn.setAttribute('aria-label', mode === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    btn.textContent = mode === 'dark' ? 'Light' : 'Dark';
  }
  updateButton();

  if (btn) {
    btn.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateButton();
    });
  }

  // Only follow OS changes if user hasn't explicitly chosen
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (localStorage.getItem('theme')) return;
    root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    updateButton();
  });
})();
