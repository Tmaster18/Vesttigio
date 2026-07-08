
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
   CONTADORES - CORRIGIDO
========================================================== */

const counters = document.querySelectorAll(".counter h2");
let countersAnimated = false;

const animateCounters = () => {
    if (countersAnimated) return;
    countersAnimated = true;

    counters.forEach(counter => {
        const target = +counter.getAttribute("data-target");
        let count = 0;
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let step = 0;

        const update = () => {
            step++;
            count += increment;
            if (step < steps) {
                counter.innerText = Math.floor(count);
                requestAnimationFrame(update);
            } else {
                counter.innerText = target;
            }
        };
        update();
    });
};

// Observer para a seção de números
const counterSection = document.querySelector(".numbers-section");
if (counterSection) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                animateCounters();
            }
        });
    }, { threshold: 0.3 });
    
    counterObserver.observe(counterSection);
}

/* ==========================================================
   SCROLL REVEAL SIMPLES
========================================================== */

const revealElements = document.querySelectorAll(
    ".member, .show, .gallery-item, .press-card, .reviews article"
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
            entry.target.style.transition = "0.8s ease";
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = "translateY(40px)";
    revealObserver.observe(el);
});


/* ==========================================================
   SMOOTH SCROLL LINKS
========================================================== */

document.querySelectorAll("a[href^='#']").forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});


/* ==========================================================
   LIGHT PARTICLES (OTIMIZADO)
========================================================== */

const particles = document.getElementById("particles");

if (particles) {

    let animationId;
    let lastTime = 0;
    const interval = window.innerWidth < 768 ? 800 : 350;

    function createParticle() {

        const p = document.createElement("span");

        const size = Math.random() * 3 + 2;

        p.style.position = "absolute";
        p.style.width = size + "px";
        p.style.height = size + "px";
        p.style.left = Math.random() * 100 + "%";
        p.style.bottom = "-20px";
        p.style.borderRadius = "50%";
        p.style.background = "rgba(0,183,255,.45)";
        p.style.pointerEvents = "none";
        p.style.opacity = Math.random();

        particles.appendChild(p);

        const distance = window.innerHeight + 200;
        const duration = 6000 + Math.random() * 4000;

        p.animate([
            {
                transform: "translateY(0)",
                opacity: p.style.opacity
            },
            {
                transform: `translateY(-${distance}px)`,
                opacity: 0
            }
        ], {
            duration: duration,
            easing: "linear"
        });

        setTimeout(() => p.remove(), duration);

    }

    function animate(time) {

        if (time - lastTime > interval) {

            createParticle();

            lastTime = time;

        }

        animationId = requestAnimationFrame(animate);

    }

    animationId = requestAnimationFrame(animate);

    document.addEventListener("visibilitychange", () => {

        if (document.hidden) {

            cancelAnimationFrame(animationId);

        } else {

            lastTime = performance.now();

            animationId = requestAnimationFrame(animate);

        }

    });

}

/* ==========================================================
   HEADER MOBILE FIX (BÁSICO)
========================================================== */

const navLinks = document.querySelectorAll("nav ul li a");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("active");
    });
});


/* ==========================================================
   FINAL
========================================================== */