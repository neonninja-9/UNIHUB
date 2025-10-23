// Fade-in animation on load
document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll("header, h3, p, a");
    elements.forEach((el, i) => {
        el.classList.add("fade-in");
        el.style.animationDelay = `${i * 0.15}s`;
    });
});

// Interactive glow hover effect on button
const digilockerBtn = document.querySelector("a");
digilockerBtn.addEventListener("mousemove", (e) => {
    const rect = digilockerBtn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    digilockerBtn.style.background = `radial-gradient(circle at ${x}px ${y}px, var(--accent-blue), var(--accent-purple))`;
});

digilockerBtn.addEventListener("mouseleave", () => {
    digilockerBtn.style.background = `linear-gradient(135deg, var(--accent-blue), var(--accent-purple))`;
});

// Subtle parallax tilt effect for header
const header = document.querySelector("header");
header.addEventListener("mousemove", (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 60;
    const y = (window.innerHeight / 2 - e.pageY) / 60;
    header.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
});

header.addEventListener("mouseleave", () => {
    header.style.transform = "rotateY(0deg) rotateX(0deg)";
});
