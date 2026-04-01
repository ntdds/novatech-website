document.addEventListener('DOMContentLoaded', async () => {
  try {
    const [headerRes, navRes] = await Promise.all([
      fetch('components/header.html'),
      fetch('components/nav.html')
    ]);
    document.getElementById('site-header').innerHTML = await headerRes.text();
    document.getElementById('left-nav').innerHTML = await navRes.text();

    const normalizePageName = (value) => {
      let normalized = (value || '').split('?')[0].split('#')[0].toLowerCase();
      if (normalized.endsWith('/')) normalized = normalized.slice(0, -1);
      if (normalized.endsWith('.html')) normalized = normalized.slice(0, -5);
      return normalized || 'index';
    };

    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    const rawPage = pathSegments.length ? pathSegments[pathSegments.length - 1] : 'index.html';
    const page = normalizePageName(rawPage);

    document.querySelectorAll('#left-nav nav a').forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;

      const linkPage = normalizePageName(href.split('/').pop());
      if (linkPage === page) {
        link.classList.add('active');
      }
    });

    await new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'js/nav.js';
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
    initMobileNav();
  } catch (e) {
    console.error('Failed to load components:', e);
  }
});
