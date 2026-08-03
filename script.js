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
const downloadCatalog = {
    'rider-tecnico': {
        label: 'Rider Técnico',
        description: 'Especificações e mapa de palco.',
        files: [
            {
                title: 'Rider Técnico',
                description: 'Especificações e mapa de palco.',
                file: 'assets/downloads/rider.pdf',
                format: 'PDF',
                type: 'pdf'
            }
        ]
    },
    'release': {
        label: 'Release',
        description: 'Histórico e proposta da banda.',
        files: [
            {
                title: 'Release',
                description: 'Histórico e proposta da banda.',
                file: 'assets/downloads/release.pdf',
                format: 'PDF',
                type: 'pdf'
            }
        ]
    },
    'fotos-oficiais': {
        label: 'Fotos Oficiais',
        description: 'Material de divulgação em alta.',
        files: [
            {
                title: 'Fotos Oficiais',
                description: 'Material de divulgação em alta.',
                file: 'assets/downloads/banner.png',
                format: 'PNG',
                type: 'image',
                preview: 'assets/downloads/banner.png'
            }
        ]
    },
    'logotipos': {
        label: 'Logotipos',
        description: 'Arquivos em vetor e PNG.',
        files: [
            {
                title: 'Logo Vesttigio – versão principal',
                description: 'Arquivo JPG em alta resolução.',
                file: 'assets/downloads/logo.jpg',
                format: 'JPG',
                type: 'image',
                preview: 'assets/downloads/logo.jpg'
            },
            {
                title: 'Logo Vesttigio – fundo transparente',
                description: 'Arquivo PNG com fundo transparente.',
                file: 'assets/downloads/semfundo.png',
                format: 'PNG',
                type: 'image',
                preview: 'assets/downloads/semfundo.png'
            }
        ]
    }
};

const downloadModalBackdrop = document.createElement('div');
downloadModalBackdrop.className = 'download-modal-backdrop';
downloadModalBackdrop.innerHTML = `
    <div class="download-modal" role="dialog" aria-modal="true" aria-labelledby="downloadModalTitle">
        <div class="download-modal-header">
            <div>
                <h2 id="downloadModalTitle"></h2>
                <p id="downloadModalDescription"></p>
            </div>
            <button type="button" class="download-modal-close" aria-label="Fechar painel de downloads">×</button>
        </div>
        <div class="download-modal-list" id="downloadModalList"></div>
        <div class="download-modal-preview" id="downloadModalPreview" hidden>
            <h3 id="downloadModalPreviewTitle"></h3>
            <div class="download-modal-preview-content" id="downloadModalPreviewContent"></div>
            <a id="downloadModalPreviewDownload" class="btn outline" href="#" download>Download</a>
        </div>
    </div>
`;
document.body.appendChild(downloadModalBackdrop);

const downloadModalClose = downloadModalBackdrop.querySelector('.download-modal-close');
const downloadModalList = downloadModalBackdrop.querySelector('#downloadModalList');
const downloadModalTitle = downloadModalBackdrop.querySelector('#downloadModalTitle');
const downloadModalDescription = downloadModalBackdrop.querySelector('#downloadModalDescription');
const downloadModalPreview = downloadModalBackdrop.querySelector('#downloadModalPreview');
const downloadModalPreviewTitle = downloadModalBackdrop.querySelector('#downloadModalPreviewTitle');
const downloadModalPreviewContent = downloadModalBackdrop.querySelector('#downloadModalPreviewContent');
const downloadModalPreviewDownload = downloadModalBackdrop.querySelector('#downloadModalPreviewDownload');

const openDownloadModal = (categoryKey) => {
    const category = downloadCatalog[categoryKey];
    if (!category) return;

    downloadModalTitle.textContent = category.label;
    downloadModalDescription.textContent = category.description;
    downloadModalPreview.hidden = true;
    downloadModalPreviewContent.innerHTML = '';

    downloadModalList.innerHTML = category.files.map((file, index) => `
        <div class="download-modal-item" data-file-index="${index}">
            <div class="download-modal-item-header">
                <div>
                    <p class="download-modal-item-title">${file.title}</p>
                    <p class="download-modal-item-format">${file.format}</p>
                </div>
                <div class="download-modal-item-actions">
                    <button type="button" class="download-modal-view">Visualizar</button>
                    <a href="${file.file}" download>Download</a>
                </div>
            </div>
            <p class="download-modal-item-description">${file.description}</p>
        </div>
    `).join('');

    downloadModalBackdrop.classList.add('active');
};

const closeDownloadModal = () => {
    downloadModalBackdrop.classList.remove('active');
    downloadModalPreview.hidden = true;
    downloadModalPreviewContent.innerHTML = '';
};

const renderDownloadPreview = (file) => {
    downloadModalPreviewTitle.textContent = file.title;
    downloadModalPreviewDownload.href = file.file;

    downloadModalPreviewContent.innerHTML = '';
    if (file.type === 'image' && file.preview) {
        const img = document.createElement('img');
        img.src = file.preview;
        img.alt = file.title;
        downloadModalPreviewContent.appendChild(img);
    } else if (file.type === 'pdf') {
        const iframe = document.createElement('iframe');
        iframe.src = file.file;
        iframe.title = file.title;
        downloadModalPreviewContent.appendChild(iframe);
    } else {
        const notice = document.createElement('div');
        notice.className = 'download-modal-preview-notice';
        notice.textContent = `${file.format} não possui pré-visualização direta.`;
        downloadModalPreviewContent.appendChild(notice);
    }
    downloadModalPreview.hidden = false;
};

downloadModalBackdrop.addEventListener('click', (event) => {
    if (event.target === downloadModalBackdrop) {
        closeDownloadModal();
    }
});

downloadModalClose.addEventListener('click', closeDownloadModal);

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && downloadModalBackdrop.classList.contains('active')) {
        closeDownloadModal();
    }
});

const downloadCards = document.querySelectorAll('.press-card');

downloadCards.forEach(card => {
    card.addEventListener('click', (event) => {
        if (event.target.closest('a')) return;
        const category = card.getAttribute('data-download-category');
        if (!category) return;
        openDownloadModal(category);
    });
});

const delegateViewClick = (event) => {
    const viewButton = event.target.closest('.download-modal-view');
    if (!viewButton) return;

    const item = viewButton.closest('.download-modal-item');
    if (!item) return;

    const categoryKey = downloadModalTitle.textContent.toLowerCase().replace(/ /g, '-');
    const category = Object.values(downloadCatalog).find(cat => cat.label === downloadModalTitle.textContent);
    if (!category) return;

    const fileIndex = Number(item.dataset.fileIndex);
    const file = category.files[fileIndex];
    if (!file) return;
    renderDownloadPreview(file);
};

downloadModalList.addEventListener('click', delegateViewClick);
