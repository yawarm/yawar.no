// Light/dark toggle. The initial theme is set inline in <head> to avoid a flash.
document.addEventListener('click', e => {
  if (!e.target.closest('.theme-toggle')) return;
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch (err) {}
});

// Shrink display formulas that are wider than the screen, so they fit on phones.
// Formulas that would get too small keep their size and scroll sideways instead.
function fitMath() {
  document.querySelectorAll('.katex-display').forEach(d => {
    d.style.fontSize = '';
    const k = d.querySelector('.katex');
    if (!k) return;
    const avail = d.clientWidth, need = k.scrollWidth;
    if (need > avail + 1) {
      const px = parseFloat(getComputedStyle(d).fontSize);
      d.style.fontSize = Math.max(px * (avail < 360 ? 0.5 : 0.6), px * (avail - 10) / need) + "px";
    }
  });
}
let fitTimer;
addEventListener('resize', () => { clearTimeout(fitTimer); fitTimer = setTimeout(fitMath, 120); });
// KaTeX's own fonts change the width of the formulas when they arrive, so fit again then.
if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (document.querySelector('.katex-display')) fitMath(); });
addEventListener('load', () => setTimeout(() => { if (document.querySelector('.katex-display')) fitMath(); }, 200));
