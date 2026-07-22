/* ==========================================================
   VESTTIGIO - SCRIPT.JS
========================================================== */

/* ==========================================================
   LOADER
========================================================== */
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    if (!loader) return;

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

if (header) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 80) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
}

/* ==========================================================
   MENU SCROLL AJUSTE
========================================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        if (!href || href === "#") return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();

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
const nav = document.getElementById("primary-navigation") || document.querySelector("nav ul");

if (menuMobile && nav) {
    const toggleMenu = () => {
        const isOpen = nav.classList.toggle("active");
        menuMobile.setAttribute("aria-expanded", String(isOpen));
        document.body.classList.toggle("menu-open", isOpen);
    };

    menuMobile.addEventListener("click", (event) => {
        event.stopPropagation();
        toggleMenu();
    });

    document.addEventListener("click", (event) => {
        const clickedInsideMenu = nav.contains(event.target) || menuMobile.contains(event.target);

        if (!clickedInsideMenu && nav.classList.contains("active")) {
            nav.classList.remove("active");
            menuMobile.setAttribute("aria-expanded", "false");
            document.body.classList.remove("menu-open");
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && nav.classList.contains("active")) {
            nav.classList.remove("active");
            menuMobile.setAttribute("aria-expanded", "false");
            document.body.classList.remove("menu-open");
        }
    });

    window.addEventListener("scroll", () => {
        if (nav.classList.contains("active")) {
            nav.classList.remove("active");
            menuMobile.setAttribute("aria-expanded", "false");
            document.body.classList.remove("menu-open");
        }
    }, { passive: true });
}

/* ==========================================================
   BACK TO TOP
========================================================== */
const backTop = document.getElementById("backTop");

if (backTop) {
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
}

/* ==========================================================
   SCROLL REVEAL SIMPLES
========================================================== */
const revealElements = document.querySelectorAll(
    ".member, .show, .gallery-item, .press-card"
);

if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                entry.target.style.transition = "0.8s ease";
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        revealObserver.observe(el);
    });
}

/* ==========================================================
   HEADER MOBILE FIX
========================================================== */
const navLinks = document.querySelectorAll("nav ul li a");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (nav) {
            nav.classList.remove("active");
        }
    });
});
