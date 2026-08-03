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
    ".member, .show, .gallery-item, .press-card, section"
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
        if (el.tagName === 'SECTION') {
            el.classList.add('section-ready');
        }
        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        revealObserver.observe(el);
    });
}

/* ==========================================================
   HEADER MOBILE FIX
========================================================== */
const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (nav && window.innerWidth <= 768) {
            nav.classList.remove("active");
            if (menuMobile) {
                menuMobile.setAttribute("aria-expanded", "false");
                document.body.classList.remove("menu-open");
            }
        }
    });
});

// Ajustes para TVs grandes
if (window.innerWidth >= 1400) {
    const particles = document.getElementById("particles");
    if (particles) particles.style.display = "none";

    const hoverSound = document.getElementById("hoverSound");
    if (hoverSound) hoverSound.remove();
}
window.addEventListener("load", () => {
  if (window.innerWidth >= 1200) {
    const particles = document.getElementById("particles");
    if (particles) particles.style.display = "none";

    const hoverSound = document.getElementById("hoverSound");
    if (hoverSound) hoverSound.remove();
  }
});

/* ==========================================================
   DOWNLOADS CATALOG
========================================================= */
const downloadData = [
    {
        id: 'logotipos',
        label: 'Logotipos',
        description: 'Identidade visual e versões do logo.',
        items: [
            {
                id: 'logo-vesttigio-principal',
                title: 'Logo Vesttigio – versão principal',
                description: 'Arquivo JPG em alta resolução.',
                file: 'assets/downloads/logo.jpg',
                type: 'image',
                format: 'JPG',
                preview: 'assets/downloads/logo.jpg'
            },
            {
                id: 'logo-fundo-transparente',
                title: 'Logo Vesttigio – fundo transparente',
                description: 'Arquivo PNG com fundo transparente.',
                file: 'assets/downloads/semfundo.png',
                type: 'image',
                format: 'PNG',
                preview: 'assets/downloads/semfundo.png'
            }
        ]
    },
    {
        id: 'downloads',
        label: 'Downloads',
        description: 'Arquivos diversos para download.',
        items: [
            {
                id: 'rider-tecnico',
                title: 'Rider Técnico',
                description: 'Especificações e mapa de palco.',
                file: 'assets/downloads/rider.pdf',
                type: 'pdf',
                format: 'PDF'
            },
            {
                id: 'release',
                title: 'Release',
                description: 'Histórico e proposta da banda.',
                file: 'assets/downloads/release.pdf',
                type: 'pdf',
                format: 'PDF'
            },
            {
                id: 'fotos-oficiais',
                title: 'Fotos Oficiais',
                description: 'Material de divulgação em alta.',
                file: 'assets/downloads/banner.png',
                type: 'image',
                format: 'PNG',
                preview: 'assets/downloads/banner.png'
            }
        ]
    }
];

const categoriesContainer = document.querySelector('.download-categories');
const itemsContainer = document.getElementById('downloadItems');
const currentLabel = document.querySelector('.download-current-label');
const currentDescription = document.querySelector('.download-current-description');
const backButton = document.querySelector('.download-back');
const previewModal = document.getElementById('downloadPreviewModal');
const previewMedia = document.getElementById('downloadPreviewMedia');
const previewTitle = document.getElementById('downloadPreviewTitle');
const previewText = document.getElementById('downloadPreviewText');
const previewDownload = document.getElementById('downloadPreviewDownload');
const previewClose = document.querySelector('.download-preview-close');

let activeCategory = null;

const fileIconMap = {
    image: 'fas fa-image',
    pdf: 'fas fa-file-pdf',
    other: 'fas fa-file'
};

const renderCategories = () => {
    categoriesContainer.innerHTML = '';
    downloadData.forEach(category => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'download-category';
        button.innerHTML = `<span>${category.label}</span><small>${category.items.length} arquivo${category.items.length === 1 ? '' : 's'}</small>`;
        button.addEventListener('click', () => selectCategory(category.id));
        categoriesContainer.appendChild(button);
    });
};

const renderItems = (category) => {
    itemsContainer.innerHTML = '';
    currentLabel.textContent = category.label;
    currentDescription.textContent = category.description;
    backButton.hidden = false;

    category.items.forEach(item => {
        const card = document.createElement('article');
        card.className = 'download-card';

        const preview = document.createElement('div');
        preview.className = 'download-card-preview';

        const iconClass = fileIconMap[item.type] || fileIconMap.other;
        if (item.type === 'image' && item.preview) {
            const img = document.createElement('img');
            img.src = item.preview;
            img.alt = item.title;
            preview.appendChild(img);
        } else if (item.type === 'pdf') {
            const icon = document.createElement('i');
            icon.className = `${iconClass} download-card-icon`;
            preview.appendChild(icon);
        } else {
            const icon = document.createElement('i');
            icon.className = `${iconClass} download-card-icon`;
            preview.appendChild(icon);
        }

        const content = document.createElement('div');
        content.className = 'download-card-content';
        content.innerHTML = `
            <div class="download-card-meta">
                <h4>${item.title}</h4>
                <span>${item.format}</span>
            </div>
            <p class="download-card-description">${item.description}</p>
        `;

        const actions = document.createElement('div');
        actions.className = 'download-card-actions';

        const viewButton = document.createElement('button');
        viewButton.type = 'button';
        viewButton.textContent = 'Visualizar';
        viewButton.addEventListener('click', () => openPreview(item));

        const downloadLink = document.createElement('a');
        downloadLink.href = item.file;
        downloadLink.download = '';
        downloadLink.textContent = 'Download';

        actions.appendChild(viewButton);
        actions.appendChild(downloadLink);
        content.appendChild(actions);

        card.appendChild(preview);
        card.appendChild(content);
        itemsContainer.appendChild(card);
    });
};

const selectCategory = (categoryId) => {
    const category = downloadData.find(item => item.id === categoryId);
    if (!category) return;

    activeCategory = category;
    document.querySelectorAll('.download-category').forEach(button => {
        button.classList.toggle('active', button.textContent.includes(category.label));
    });
    renderItems(category);
};

const openPreview = (item) => {
    previewMedia.innerHTML = '';
    previewTitle.textContent = item.title;
    previewText.textContent = item.description;
    previewDownload.href = item.file;
    previewDownload.download = '';

    if (item.type === 'image' && item.preview) {
        const img = document.createElement('img');
        img.src = item.preview;
        img.alt = item.title;
        previewMedia.appendChild(img);
    } else if (item.type === 'pdf') {
        const iframe = document.createElement('iframe');
        iframe.src = item.file;
        iframe.title = item.title;
        previewMedia.appendChild(iframe);
    } else {
        const info = document.createElement('div');
        info.className = 'download-card-icon';
        info.textContent = `${item.format} não possui pré-visualização direta.`;
        previewMedia.appendChild(info);
    }

    previewModal.classList.add('active');
    previewModal.setAttribute('aria-hidden', 'false');
};

const closePreview = () => {
    previewModal.classList.remove('active');
    previewModal.setAttribute('aria-hidden', 'true');
    previewMedia.innerHTML = '';
};

if (categoriesContainer && itemsContainer) {
    renderCategories();
}

backButton.addEventListener('click', () => {
    activeCategory = null;
    currentLabel.textContent = 'Selecione uma categoria';
    currentDescription.textContent = 'Clique em uma categoria para ver os arquivos disponíveis.';
    backButton.hidden = true;
    itemsContainer.innerHTML = '';
    document.querySelectorAll('.download-category').forEach(btn => btn.classList.remove('active'));
});

previewClose.addEventListener('click', closePreview);
previewModal.addEventListener('click', (event) => {
    if (event.target === previewModal) closePreview();
});
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && previewModal.classList.contains('active')) {
        closePreview();
    }
});
