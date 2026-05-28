const body = document.body;
const menuToggle = document.querySelector('.menu-toggle');
const menuPanel = document.querySelector('#site-menu');
const menuClose = document.querySelector('.menu-close');
const hotspotButton = document.querySelector('#toggle-hotspots');
const modal = document.querySelector('#image-modal');
const modalImg = modal.querySelector('img');
const modalClose = modal.querySelector('.modal-close');

function openMenu() {
  menuPanel.classList.add('open');
  menuPanel.setAttribute('aria-hidden', 'false');
  menuToggle?.setAttribute('aria-expanded', 'true');
}

function closeMenu() {
  menuPanel.classList.remove('open');
  menuPanel.setAttribute('aria-hidden', 'true');
  menuToggle?.setAttribute('aria-expanded', 'false');
}

menuToggle?.addEventListener('click', openMenu);
menuClose?.addEventListener('click', closeMenu);
menuPanel?.addEventListener('click', (event) => {
  if (event.target.matches('a')) closeMenu();
});

hotspotButton?.addEventListener('click', () => {
  body.classList.toggle('show-hotspots');
  hotspotButton.textContent = body.classList.contains('show-hotspots')
    ? 'Masquer les zones cliquables'
    : 'Afficher les zones cliquables';
});

document.querySelectorAll('[data-zoom]').forEach((image) => {
  image.addEventListener('click', (event) => {
    if (event.target.closest('.hotspot')) return;
    modalImg.src = image.currentSrc || image.src;
    modalImg.alt = image.alt || 'Page du dossier agrandie';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    modalClose.focus();
  });
});

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  modalImg.removeAttribute('src');
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (event) => {
  if (event.target === modal) closeModal();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenu();
    if (modal.classList.contains('open')) closeModal();
  }
});

const sections = [...document.querySelectorAll('.page-section')];
const menuLinks = [...document.querySelectorAll('.quick-nav a, .menu-panel a')]
  .filter((link) => link.hash);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const id = `#${entry.target.id}`;
    menuLinks.forEach((link) => {
      link.toggleAttribute('aria-current', link.hash === id);
    });
  });
}, { rootMargin: '-45% 0px -45% 0px', threshold: 0.01 });

sections.forEach((section) => observer.observe(section));
