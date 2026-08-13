// Scroll progress
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  document.getElementById('progress').style.width = scrolled + '%';
});

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

// Mobile menu
const toggle = document.getElementById('menu-toggle');
const menu = document.getElementById('mobile-menu');
const iconOpen = document.getElementById('icon-open');
const iconClose = document.getElementById('icon-close');
let menuOpen = false;
toggle.addEventListener('click', () => {
  menuOpen = !menuOpen;
  toggle.setAttribute('aria-expanded', menuOpen);
  if (menuOpen) {
    menu.style.maxHeight = menu.scrollHeight + 'px';
    menu.style.opacity = '1';
    iconOpen.classList.add('hidden'); iconClose.classList.remove('hidden');
  } else {
    menu.style.maxHeight = '0px';
    menu.style.opacity = '0';
    iconOpen.classList.remove('hidden'); iconClose.classList.add('hidden');
  }
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menuOpen = false; menu.style.maxHeight = '0px'; menu.style.opacity = '0';
  iconOpen.classList.remove('hidden'); iconClose.classList.add('hidden');
}));

// Project filters
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.dataset.active = 'false');
    btn.dataset.active = 'true';
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const show = filter === 'all' || card.dataset.cat === filter;
      card.style.display = show ? '' : 'none';
    });
  });
});

// Contact form -> mailto fallback (no backend configured)
document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  const subject = encodeURIComponent('Portfolio contact from ' + name);
  const body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
  window.location.href = `mailto:yatijaiswal435@gmail.com?subject=${subject}&body=${body}`;
});
