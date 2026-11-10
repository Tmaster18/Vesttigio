/* ==========================================================
   VESTTIGIO - SCRIPT.JS
   Inicialização defensiva e compatível com navegadores atuais.
========================================================== */

/* LOADER: nunca deve impedir o acesso ao conteúdo. */
(() => {
    const hideLoader = () => {
        const loader = document.getElementById("loader");
        if (!loader || loader.classList.contains("is-hidden")) return;
        loader.style.transition = "opacity 0.6s ease";
        loader.style.opacity = "0";
        loader.style.pointerEvents = "none";
        window.setTimeout(() => {
            loader.classList.add("is-hidden");
            loader.setAttribute("aria-hidden", "true");
        }, 650);
    };

    if (document.readyState === "complete") {
        window.setTimeout(hideLoader, 350);
    } else {
        window.addEventListener("load", () => window.setTimeout(hideLoader, 350), { once: true });
        // Fallback: mesmo que algum recurso externo não termine de carregar.
        window.setTimeout(hideLoader, 5000);
    }
})();

const header = document.getElementById("header");
const menuMobile = document.querySelector(".menu-mobile");
const nav = document.getElementById("primary-navigation") || document.querySelector("nav ul");
const backTop = document.getElementById("backTop");

/* Atualiza os elementos dependentes da rolagem em um único listener. */
let scrollFramePending = false;
const updateScrollUI = () => {
    if (header) header.classList.toggle("scrolled", window.scrollY > 80);
    if (backTop) backTop.classList.toggle("active", window.scrollY > 400);
    scrollFramePending = false;
};
window.addEventListener("scroll", () => {
    if (!scrollFramePending) {
        scrollFramePending = true;
        window.requestAnimationFrame(updateScrollUI);
    }
}, { passive: true });
updateScrollUI();

/* Rolagem suave para âncoras válidas. */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", event => {
        const href = anchor.getAttribute("href");
        if (!href || href === "#") return;
        let target;
        try { target = document.querySelector(href); } catch (_) { return; }
        if (!target) return;
        event.preventDefault();
        const offset = header ? header.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
        closeMenu();
    });
});

/* Menu mobile com estado acessível e fechamento centralizado. */
const closeMenu = () => {
    if (nav) nav.classList.remove("active");
    if (menuMobile) {
        menuMobile.setAttribute("aria-expanded", "false");
        menuMobile.setAttribute("aria-label", "Abrir menu");
    }
    document.body.classList.remove("menu-open");
};

if (menuMobile && nav) {
    menuMobile.addEventListener("click", event => {
        event.stopPropagation();
        const willOpen = !nav.classList.contains("active");
        nav.classList.toggle("active", willOpen);
        menuMobile.setAttribute("aria-expanded", String(willOpen));
        menuMobile.setAttribute("aria-label", willOpen ? "Fechar menu" : "Abrir menu");
        document.body.classList.toggle("menu-open", willOpen);
        if (willOpen) {
            const firstLink = nav.querySelector("a[href]");
            if (firstLink) window.setTimeout(() => firstLink.focus(), 0);
        }
    });
    document.addEventListener("click", event => {
        if (nav.classList.contains("active") && !nav.contains(event.target) && !menuMobile.contains(event.target)) closeMenu();
    });
    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && nav.classList.contains("active")) {
            closeMenu();
            menuMobile.focus();
        }
    });
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) closeMenu();
    }, { passive: true });
    window.addEventListener("scroll", () => {
        if (nav.classList.contains("active")) closeMenu();
    }, { passive: true });
}

if (backTop) {
    backTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    });
}


/* Agenda: separa próximos shows e eventos realizados automaticamente. */
const showsTimeline = document.querySelector("#shows .timeline");
if (showsTimeline) {
    const showCards = Array.from(showsTimeline.querySelectorAll(".show[data-date]"));
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingShows = [];
    const completedShows = [];

    showCards.forEach(card => {
        const [year, month, day] = (card.dataset.date || "").split("-").map(Number);
        if (!year || !month || !day) return;

        const eventDate = new Date(year, month - 1, day);
        eventDate.setHours(0, 0, 0, 0);
        const isUpcoming = eventDate >= today;
        const status = card.querySelector(".show-status");

        card.classList.toggle("is-upcoming", isUpcoming);
        card.classList.toggle("is-past", !isUpcoming);
        if (status) {
            status.textContent = isUpcoming ? "PRÓXIMO SHOW" : "JÁ REALIZADO";
            status.setAttribute("aria-label", isUpcoming ? "Próximo show" : "Show já realizado");
        }
        (isUpcoming ? upcomingShows : completedShows).push({ card, eventDate });
    });

    upcomingShows.sort((a, b) => a.eventDate - b.eventDate);
    completedShows.sort((a, b) => b.eventDate - a.eventDate);

    const createShowGroup = (id, title, entries) => {
        if (!entries.length) return null;
        const group = document.createElement("div");
        group.className = "shows-group";
        group.id = id;
        const heading = document.createElement("h2");
        heading.className = "shows-group-title";
        heading.textContent = title;
        group.appendChild(heading);
        entries.forEach(entry => group.appendChild(entry.card));
        return group;
    };

    const upcomingGroup = createShowGroup("upcoming-shows", "PRÓXIMOS SHOWS", upcomingShows);
    const completedGroup = createShowGroup("completed-shows", "SHOWS REALIZADOS", completedShows);
    showsTimeline.replaceChildren();
    if (upcomingGroup) showsTimeline.appendChild(upcomingGroup);
    if (completedGroup) showsTimeline.appendChild(completedGroup);
}

/* Reveal progressivo; sem IntersectionObserver, o conteúdo continua visível. */
const revealElements = document.querySelectorAll(".member, .gallery-item, .press-card, section");
if (revealElements.length && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            entry.target.style.transition = "opacity 0.8s ease, transform 0.8s ease";
            revealObserver.unobserve(entry.target);
        });
    }, { threshold: 0.08, rootMargin: "0px 0px 40px 0px" });

    revealElements.forEach(element => {
        element.style.opacity = "0";
        element.style.transform = "translateY(40px)";
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach(element => {
        element.style.opacity = "1";
        element.style.transform = "none";
    });
}

/* Ajustes opcionais para telas grandes. */
const applyLargeScreenAdjustments = () => {
    if (window.innerWidth >= 1200) {
        const particles = document.getElementById("particles");
        if (particles) particles.style.display = "none";
        const hoverSound = document.getElementById("hoverSound");
        if (hoverSound) hoverSound.remove();
    }
};
applyLargeScreenAdjustments();
window.addEventListener("resize", applyLargeScreenAdjustments, { passive: true });

/* ==========================================================
   DOWNLOADS CATALOG
========================================================= */
const getFileNameFromPath = (path) => path.split('/').pop();

const downloadCatalog = {
    'rider-tecnico': {
        label: 'Rider Técnico',
        description: 'Especificações e mapa de palco.',
        files: [
            {
                title: 'Rider Técnico (PDF)',
                description: 'Especificações e mapa de palco.',
                file: 'assets/downloads/rider.pdf',
                format: 'PDF',
                type: 'pdf',
                fileName: getFileNameFromPath('assets/downloads/rider.pdf')
            },
            {
                title: 'Rider Técnico (ZIP)',
                description: 'Pacote com rider e materiais extras.',
                file: 'assets/downloads/rider.zip',
                format: 'ZIP',
                type: 'zip',
                fileName: getFileNameFromPath('assets/downloads/rider.zip')
            },
            {
                title: 'Mapa de Palco (JPG)',
                description: 'Mapa de palco em alta resolução.',
                file: 'assets/downloads/Mapa.jpg',
                format: 'JPG',
                type: 'image',
                preview: 'assets/downloads/Mapa.jpg',
                fileName: getFileNameFromPath('assets/downloads/Mapa.jpg')
            },
            {
                title: 'Mapa de Palco (PNG)',
                description: 'Mapa de palco em alta resolução.',
                file: 'assets/downloads/mapa.png',
                format: 'PNG',
                type: 'image',
                preview: 'assets/downloads/mapa.png',
                fileName: getFileNameFromPath('assets/downloads/mapa.png')
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
                type: 'pdf',
                fileName: getFileNameFromPath('assets/downloads/release.pdf')
            }
        ]
    },
    'fotos-oficiais': {
        label: 'Fotos Oficiais',
        description: 'Material de divulgação em alta.',
        files: [
            {
                title: 'Banner de Divulgação',
                description: 'Imagem para material promocional.',
                file: 'assets/downloads/banner.png',
                format: 'PNG',
                type: 'image',
                preview: 'assets/downloads/banner.png',
                fileName: getFileNameFromPath('assets/downloads/banner.png')
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
                preview: 'assets/downloads/logo.jpg',
                fileName: getFileNameFromPath('assets/downloads/logo.jpg')
            },
            {
                title: 'Logo Vesttigio – fundo transparente',
                description: 'Arquivo PNG com fundo transparente.',
                file: 'assets/downloads/semfundo.png',
                format: 'PNG',
                type: 'image',
                preview: 'assets/downloads/semfundo.png',
                fileName: getFileNameFromPath('assets/downloads/semfundo.png')
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

let activeDownloadCategoryKey = null;
let previousModalFocus = null;

const openDownloadModal = (categoryKey) => {
    const category = downloadCatalog[categoryKey];
    if (!category) return;

    activeDownloadCategoryKey = categoryKey;
    previousModalFocus = document.activeElement;
    downloadModalTitle.textContent = category.label;
    downloadModalDescription.textContent = category.description;
    downloadModalPreview.hidden = true;
    downloadModalPreviewContent.innerHTML = '';

    downloadModalList.innerHTML = category.files.map((file, index) => {
        const canPreview = ['pdf', 'image'].includes(file.type);
        return `
        <div class="download-modal-item" data-file-index="${index}">
            <div class="download-modal-item-header">
                <div>
                    <p class="download-modal-item-title">${file.title}</p>
                    <p class="download-modal-item-filename">${file.fileName}</p>
                    <p class="download-modal-item-format">${file.format}</p>
                </div>
                <div class="download-modal-item-actions">
                    ${canPreview ? `<button type="button" class="download-modal-view">Visualizar</button>` : ''}
                    <a href="${file.file}" download="${file.fileName}">Baixar</a>
                </div>
            </div>
            <p class="download-modal-item-description">${file.description}</p>
        </div>
    `;
    }).join('');

    downloadModalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    downloadModalClose.focus();
};

const closeDownloadModal = () => {
    downloadModalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
    if (previousModalFocus && typeof previousModalFocus.focus === 'function') previousModalFocus.focus();
    previousModalFocus = null;
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

const delegateViewClick = (event) => {
    const origin = event.target instanceof Element ? event.target : event.target.parentElement;
    if (!origin) return;
    const viewButton = origin.closest('.download-modal-view');
    if (!viewButton) return;

    const item = viewButton.closest('.download-modal-item');
    if (!item) return;

    if (!activeDownloadCategoryKey) return;
    const category = downloadCatalog[activeDownloadCategoryKey];
    if (!category) return;

    const fileIndex = Number(item.dataset.fileIndex);
    const file = category.files[fileIndex];
    if (!file) return;
    renderDownloadPreview(file);
};

const downloadCardLinks = document.querySelectorAll('.press-card a');

downloadCardLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const card = link.closest('.press-card');
        if (!card) return;

        const category = card.getAttribute('data-category');
        if (!category) return;

        openDownloadModal(category);
    });
});

downloadModalList.addEventListener('click', delegateViewClick);


/* ==========================================================
   PREVIA ETAPA 2 — GALERIA AMPLIADA E VIDEOS SOB DEMANDA
========================================================== */
(() => {
    const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
    if (galleryItems.length) {
        const lightbox = document.createElement('div');
        lightbox.className = 'gallery-lightbox';
        lightbox.setAttribute('role', 'dialog');
        lightbox.setAttribute('aria-modal', 'true');
        lightbox.setAttribute('aria-label', 'Fotografia ampliada');
        lightbox.innerHTML = `
            <button class="gallery-lightbox-close" type="button" aria-label="Fechar fotografia">&times;</button>
            <img alt="" src="">
            <p class="gallery-lightbox-caption"></p>
        `;
        document.body.appendChild(lightbox);
        const image = lightbox.querySelector('img');
        const caption = lightbox.querySelector('.gallery-lightbox-caption');
        const closeButton = lightbox.querySelector('.gallery-lightbox-close');
        let previousFocus = null;

        const open = (item) => {
            const thumb = item.querySelector('img');
            if (!thumb) return;
            previousFocus = item;
            image.src = thumb.currentSrc || thumb.src;
            image.alt = thumb.alt || 'Fotografia da banda Vesttigio';
            caption.textContent = thumb.alt || '';
            lightbox.classList.add('is-open');
            document.body.style.overflow = 'hidden';
            closeButton.focus();
        };
        const close = () => {
            lightbox.classList.remove('is-open');
            document.body.style.overflow = '';
            image.removeAttribute('src');
            if (previousFocus && previousFocus.focus) previousFocus.focus();
            previousFocus = null;
        };
        galleryItems.forEach(item => {
            item.addEventListener('click', () => open(item));
            item.addEventListener('keydown', event => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    open(item);
                }
            });
        });
        closeButton.addEventListener('click', close);
        lightbox.addEventListener('click', event => { if (event.target === lightbox) close(); });
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && lightbox.classList.contains('is-open')) close();
        });
    }

    document.querySelectorAll('.video-card[data-video-id]').forEach(card => {
        const playButton = card.querySelector('.video-preview');
        if (!playButton) return;
        playButton.addEventListener('click', () => {
            const videoId = card.dataset.videoId;
            if (!/^[\w-]{11}$/.test(videoId || '')) return;
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
            iframe.title = 'Vídeo da banda Vesttigio no YouTube';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
            iframe.allowFullscreen = true;
            iframe.loading = 'lazy';
            playButton.replaceWith(iframe);
            const caption = card.querySelector('.video-caption');
            if (caption) caption.textContent = 'Reprodução do vídeo';
        }, { once: true });
    });
})();
