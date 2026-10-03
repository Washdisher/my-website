const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const phoneLayout = window.matchMedia('(max-width: 720px)');

const navbar = document.getElementById('navbar');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const backToTop = document.querySelector('.back-to-top');

// Scroll-spy targets: each section with a matching nav link
const sections = [...document.querySelectorAll('main > section[id]')];
const navAnchors = new Map(
    [...navLinks.querySelectorAll('a[href^="#"]')].map(a => [a.getAttribute('href').slice(1), a])
);

// Navbar state, reading progress, scroll-spy and back-to-top, all from one scroll handler
const onScroll = () => {
    const y = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    navbar.classList.toggle('scrolled', y > 60);
    navbar.style.setProperty('--progress', maxScroll > 0 ? Math.min(1, y / maxScroll).toFixed(4) : 0);
    backToTop.classList.toggle('visible', y > 500);

    // The section whose top has passed 42% of the viewport is "current"; the last one wins at the very bottom
    const probe = y + window.innerHeight * 0.42;
    let current = null;
    for (const s of sections) if (s.offsetTop <= probe) current = s.id;
    if (y + window.innerHeight >= document.documentElement.scrollHeight - 2) current = sections[sections.length - 1].id;
    navAnchors.forEach((a, id) => a.classList.toggle('is-active', id === current));
};

window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll, { passive: true });
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

// Mobile menu: open/close state lives on the button's aria-expanded
navLinks.querySelectorAll('a').forEach((a, i) => a.style.setProperty('--i', i));

// Everything behind the open menu is made inert so focus and screen readers stay inside it
const behindMenu = ['header', 'main', 'footer', '.back-to-top'].map(sel => document.querySelector(sel)).filter(Boolean);

const setMenu = (open) => {
    navLinks.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
    behindMenu.forEach(el => {
        el.toggleAttribute('inert', open);
        if (open) el.setAttribute('aria-hidden', 'true'); else el.removeAttribute('aria-hidden');
    });
};

navToggle.addEventListener('click', () => setMenu(navToggle.getAttribute('aria-expanded') !== 'true'));

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenu(false));
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        navToggle.focus();
    }
});

// Leaving the phone layout with the menu open would otherwise leave the page scroll-locked
phoneLayout.addEventListener('change', (e) => { if (!e.matches) setMenu(false); });

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
