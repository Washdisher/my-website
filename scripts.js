// Navbar + back-to-top on scroll
const navbar = document.getElementById('navbar');
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
    backToTop.classList.toggle('visible', window.scrollY > 400);
});

// Dynamic footer year
document.getElementById('current-year').textContent = new Date().getFullYear();

// Scroll reveal
const revealTargets = document.querySelectorAll(
    '.section-label, .section-title, .section-intro, .about-grid, ' +
    '.timeline-item, .edu-grid, .skills-grid, .interests-grid, ' +
    'form, .fact-card, .interest-card, .skill-group'
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealTargets.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.innerHTML = isOpen ? '&#10005;' : '&#9776;';
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.innerHTML = '&#9776;';
    });
});
