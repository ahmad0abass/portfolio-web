document.addEventListener('DOMContentLoaded', () => {
  const sections = Array.from(document.querySelectorAll('main section'));
  const links = Array.from(document.querySelectorAll('nav a'));
  const scrollBtn = document.getElementById('scrollTopBtn');

  // Reveal on scroll
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  sections.forEach((sec) => revealObserver.observe(sec));

  // Active link / aria-current
  function setActive(id) {
    links.forEach((a) => {
      const isActive = a.getAttribute('href') === `#${id}`;
      if (isActive) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  }
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: '0px 0px -65% 0px', threshold: 0.1 });
  sections.forEach((sec) => spy.observe(sec));

  // Scroll-to-top button
  const onScroll = () => {
    if (window.scrollY > 300) scrollBtn.classList.add('show');
    else scrollBtn.classList.remove('show');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
});
