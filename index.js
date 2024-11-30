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
    sections.forEach(section => observer.observe(section));

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);

            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });

                const start = window.pageYOffset;
                const distance = target.offsetTop - start;
                let startTime = null;

                const duration = 10000;

                const animateScroll = (currentTime) => {
                    if (!startTime) startTime = currentTime;

                    const timeElapsed = currentTime - startTime;
                    const run = easeInOutQuad(timeElapsed, start, distance, duration);

                    window.scrollTo(0, run);

                    if (timeElapsed < duration) {
                        requestAnimationFrame(animateScroll);
                    }
                };

                const easeInOutQuad = (t, b, c, d) => {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                };

                requestAnimationFrame(animateScroll);
            }
        });
    });
});

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

const easing = 0.07;
document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.classList.add('visible');
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * easing;
    cursorY += (mouseY - cursorY) * easing;

    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;

    requestAnimationFrame(animateCursor);
}

animateCursor();

const triggers = document.querySelectorAll('.trigger');

function checkCursorProximity() {
    triggers.forEach(trigger => {
        const rect = trigger.getBoundingClientRect();
        const triggerCenterX = rect.left + rect.width / 2;
        const triggerCenterY = rect.top + rect.height / 2;

        const distance = Math.sqrt(
            (triggerCenterX - mouseX) ** 2 + (triggerCenterY - mouseY) ** 2
        );

        if (distance < 50) {
            cursor.classList.add('hover');
        } else {
            cursor.classList.remove('hover');
        }
    });
}

function updateCursor() {
    checkCursorProximity();
    requestAnimationFrame(updateCursor);
}

updateCursor();

document.addEventListener('mousedown', (e) => {
    const cursorRect = cursor.getBoundingClientRect();
    const isInsideCursor =
        e.clientX >= cursorRect.left && e.clientX <= cursorRect.right &&
        e.clientY >= cursorRect.top && e.clientY <= cursorRect.bottom;

    if (isInsideCursor) {
        cursor.classList.add('click');
    }
});

document.addEventListener('mouseup', () => cursor.classList.remove('click'));