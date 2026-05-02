// Navbar + back-to-top on scroll
const navbar = document.getElementById('navbar');
const backToTop = document.querySelector('.back-to-top');

const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    backToTop.classList.toggle('visible', window.scrollY > 500);
};

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Dynamic footer year
document.getElementById('current-year').textContent = new Date().getFullYear();

// Scroll reveal
const revealTargets = document.querySelectorAll(
    '.section-head, .about-text, .about-facts, .timeline-item, ' +
    '.education-block, .skill-group, .interest, form'
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

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
    document.body.style.overflow = isOpen ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.innerHTML = '&#9776;';
        document.body.style.overflow = '';
    });
});

// Smooth scroll with nav offset for in-page links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href.length < 2) return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const navHeight = navbar.offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});
