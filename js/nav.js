function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const leftNav = document.getElementById('left-nav');
  if (!toggle || !leftNav) return;

  const overlay = document.createElement('div');
  overlay.id = 'nav-overlay';
  document.body.appendChild(overlay);

  const openNav = () => {
    leftNav.classList.add('open');
    toggle.classList.add('open');
    overlay.classList.add('visible');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeNav = () => {
    leftNav.classList.remove('open');
    toggle.classList.remove('open');
    overlay.classList.remove('visible');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  toggle.addEventListener('click', () => {
    leftNav.classList.contains('open') ? closeNav() : openNav();
  });

  overlay.addEventListener('click', closeNav);

  leftNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });
}
