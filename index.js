document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');

    const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};
    const revealOnScroll = (entries, observer) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
}
});
};
    const observer = new IntersectionObserver(revealOnScroll, observerOptions);
    sections.forEach(section => {
    observer.observe(section);
});
});
