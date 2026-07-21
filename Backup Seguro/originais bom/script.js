/* ==========================================================
   VESTTIGIO - SCRIPT.JS
========================================================== */

/* ==========================================================
   LOADER
========================================================== */
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.pointerEvents = "none";
        loader.style.transition = "1s";
    }, 1200);
});

/* ==========================================================
   HEADER SCROLL
========================================================== */
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

/* ==========================================================
   MENU SCROLL AJUSTE
========================================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;

    // pega a altura real do cabeçalho fixo
    const header = document.getElementById("header");
    const headerOffset = header ? header.offsetHeight : 0;

    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  });
});

/* ==========================================================
   MENU MOBILE
========================================================== */
const menuMobile = document.querySelector(".menu-mobile");
const nav = document.querySelector("nav ul");

menuMobile.addEventListener("click", () => {
    nav.classList.toggle("active");
});

/* ==========================================================
   BACK TO TOP
========================================================== */
const backTop = document.getElementById("backTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        backTop.classList.add("active");
    } else {
        backTop.classList.remove("active");
    }
});

backTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

/* ==========================================================
   SCROLL REVEAL SIMPLES
========================================================== */
const revealElements = document.querySelectorAll(
    ".member, .show, .gallery-item, .press-card"
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
            entry.target.style.transition = "0.8s ease";
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = "translateY(40px)";
    revealObserver.observe(el);
});

/* ==========================================================
   HEADER MOBILE FIX
========================================================== */
const navLinks = document.querySelectorAll("nav ul li a");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("active");
    });
});
