// Shrink Header on Scroll and Show Back-to-Top Button
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    header.classList.toggle('shrink', window.scrollY > 100);
    document.body.classList.toggle('scrolled', window.scrollY > 200);
});

// Dynamically Update Footer Year
document.getElementById('current-year').textContent = new Date().getFullYear();

// Adjust Scroll Position When Navigation Links are Clicked
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        // Get the current height of the header
        const header = document.querySelector('header');
        const headerHeight = header.offsetHeight;

        // Calculate the position to scroll to
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerHeight;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});
