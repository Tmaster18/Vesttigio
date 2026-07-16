/* ==========================================================
   VESTTIGIO - SCRIPT.JS (Otimizado para Desempenho)
========================================================== */

/* --- LOADER --- */
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = "0";
            loader.style.pointerEvents = "none";
            loader.style.transition = "opacity 0.8s ease";
        }, 1000);
    }
});

/* --- SMOOTH SCROLL CORRIGIDO --- */
document.querySelectorAll("a[href^='#']").forEach(link => {
    link.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;
        
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const header = document.getElementById("header");
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY;
            
            window.scrollTo({
                top: targetPosition - headerHeight,
                behavior: "smooth"
            });
        }
    });
});

/* --- MENU MOBILE --- */
const menuMobile = document.querySelector(".menu-mobile");
const nav = document.querySelector("nav ul");
const navLinks = document.querySelectorAll("nav ul li a");

if (menuMobile && nav) {
    menuMobile.addEventListener("click", () => {
        nav.classList.toggle("active");
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("active");
        });
    });
}

/* --- BACK TO TOP --- */
const backTop = document.getElementById("backTop");
if (backTop) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            backTop.classList.add("active");
        } else {
            backTop.classList.remove("active");
        }
    }, { passive: true });

    backTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

/* --- CONTADORES --- */
const counters = document.querySelectorAll(".counter h2");
const counterSection = document.querySelector(".numbers-section");
let countersAnimated = false;

const animateCounters = () => {
    if (countersAnimated) return;
    countersAnimated = true;

    counters.forEach(counter => {
        const target = +counter.getAttribute("data-target");
        let count = 0;
        const duration = 1500; // Tempo em ms
        const stepTime = 20;
        const steps = duration / stepTime;
        const increment = target / steps;

        const update = () => {
            count += increment;
            if (count < target) {
                counter.innerText = Math.floor(count);
                setTimeout(update, stepTime);
            } else {
                counter.innerText = target;
            }
        };
        update();
    });
};

if (counterSection && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                animateCounters();
            }
        });
    }, { threshold: 0.2 });
    
    counterObserver.observe(counterSection);
}

/* --- SCROLL REVEAL (Sem Reflow via CSS Nativo) --- */
const revealElements = document.querySelectorAll(".reveal-item");

if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                revealObserver.unobserve(entry.target); // Libera o observer do elemento ativo
            }
        });
    }, { threshold: 0.05 });

    revealElements.forEach(el => revealObserver.observe(el));
}

/* --- LIGHT PARTICLES (Otimizado com Interseção) --- */
const particlesContainer = document.getElementById("particles");
const homeSection = document.getElementById("home");

if (particlesContainer && homeSection && 'IntersectionObserver' in window) {
    let animationId;
    let lastTime = 0;
    const interval = window.innerWidth < 768 ? 900 : 400;
    let active = false;

    function createParticle() {
        if (!active) return;
        const p = document.createElement("span");
        const size = Math.random() * 3 + 2;

        p.style.position = "absolute";
        p.style.width = size + "px";
        p.style.height = size + "px";
        p.style.left = Math.random() * 100 + "%";
        p.style.bottom = "-20px";
        p.style.borderRadius = "50%";
        p.style.background = "rgba(0,183,255,.40)";
        p.style.pointerEvents = "none";
        p.style.opacity = Math.random();

        particlesContainer.appendChild(p);

        const distance = window.innerHeight + 100;
        const duration = 6000 + Math.random() * 3000;

        p.animate([
            { transform: "translateY(0)", opacity: p.style.opacity },
            { transform: `translateY(-${distance}px)`, opacity: 0 }
        ], {
            duration: duration,
            easing: "linear"
        });

        setTimeout(() => p.remove(), duration);
    }

    function animate(time) {
        if (!active) return;
        if (time - lastTime > interval) {
            createParticle();
            lastTime = time;
        }
        animationId = requestAnimationFrame(animate);
    }

    // Desativa partículas fora da viewport para economizar bateria e CPU
    const particlesObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                active = true;
                lastTime = performance.now();
                animationId = requestAnimationFrame(animate);
            } else {
                active = false;
                cancelAnimationFrame(animationId);
            }
        });
    }, { threshold: 0.05 });

    particlesObserver.observe(homeSection);
}