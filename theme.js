// Light/dark toggle. The initial theme is set inline in <head> to avoid a flash.
document.addEventListener('click', e => {
  if (!e.target.closest('.theme-toggle')) return;
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch (err) {}
});
