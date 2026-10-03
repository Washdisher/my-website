const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

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
    '.education-block, .project-card, .skill-group, .interest, form'
);

// Children of each block arrive in sequence; the index restarts for every block
revealTargets.forEach(el => {
    el.querySelectorAll('.fact, .timeline-body li, .skill-tags span').forEach((child, i) => {
        child.style.setProperty('--i', Math.min(i, 12));
    });
});

if ('IntersectionObserver' in window && !reduceMotion.matches) {
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
} else {
    revealTargets.forEach(el => el.classList.add('reveal', 'visible'));
}

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

// Scroll with nav offset for in-page links (instant when the visitor prefers reduced motion)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href.length < 2) return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const navHeight = navbar.offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;
        window.scrollTo({ top, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    });
});
