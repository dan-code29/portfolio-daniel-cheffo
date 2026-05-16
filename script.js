/**
 * PORTFOLIO DANIEL NEGUEM - SCRIPT GLOBAL
 * Version: 3.0 - Unifiée et robuste
 */

// ==================== NAMESPACE GLOBAL ====================
window.Portfolio = window.Portfolio || {};

// ==================== SYSTÈME DE TRADUCTION ====================
let currentLanguage = localStorage.getItem('language') || 'fr';
let translations = {};

async function loadTranslations() {
    try {
        const response = await fetch('translations.json');
        translations = await response.json();
        applyTranslations();
        updateLanguageButtonText();
    } catch (error) {
        console.warn('Traduction non disponible (fichier manquant ou erreur serveur)');
        // Pas d'erreur bloquante – le site reste en français par défaut
    }
}

function applyTranslations() {
    const lang = translations[currentLanguage];
    if (!lang) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const value = key.split('.').reduce((obj, k) => obj?.[k], lang);
        if (value) el.textContent = value;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const value = key.split('.').reduce((obj, k) => obj?.[k], lang);
        if (value) el.placeholder = value;
    });
}

function toggleLanguage() {
    currentLanguage = currentLanguage === 'fr' ? 'en' : 'fr';
    localStorage.setItem('language', currentLanguage);
    applyTranslations();
    updateLanguageButtonText();

    // Redémarrer le typewriter avec les nouveaux mots
    if (window.Portfolio.typewriterInterval) {
        clearInterval(window.Portfolio.typewriterInterval);
        window.Portfolio.typewriterInterval = null;
    }
    initTypewriter();
}

function updateLanguageButtonText() {
    const btn = document.getElementById('lang-text');
    if (btn) btn.textContent = currentLanguage === 'fr' ? 'EN' : 'FR';
}

// ==================== DONNÉES DES PROJETS (MODALES CLASSIQUES) ====================
const projectData = {
    'modal-p1': {
        title: "Installation Vidéosurveillance IP",
        text: "Mise en place de 20 caméras Hikvision, configuration du NVR, paramétrage du logiciel VMS et accès distant sécurisé.",
        media: [
            { type: 'image', url: 'assets/images/chantier1.jpg' },
            { type: 'image', url: 'assets/images/camera-posee.jpg' },
            { type: 'video', url: 'assets/videos/test-nuit.mp4' }
        ]
    },
    'modal-p2': {
        title: "Câblage Baie de Brassage",
        text: "Identification de 150 points réseaux, passage de câbles Cat6a, brassage avec peignes et certification Fluke.",
        media: [
            { type: 'image', url: 'assets/images/baie-avant.jpg' },
            { type: 'image', url: 'assets/images/baie-apres.jpg' }
        ]
    },
    'modal-p3': {
        title: "Projet CYDEP & Management - Vaal University",
        text: "Leadership spirituel, formation en management des petites entreprises à Vaal University et vie communautaire.",
        media: [
            { type: 'video', url: 'assets/videos/danielCYDP.mp4' },
            { type: 'image', url: 'assets/images/etude-biblique.jpg' },
            { type: 'image', url: 'assets/images/universite-vaal.jpg' },
            { type: 'image', url: 'assets/images/equipe-volontaires.jpg' }
        ]
    }
};

// ==================== MODALE PRINCIPALE (projets & diplômes) ====================
function openModal(projectId) {
    const modal = document.getElementById('projectModal');
    const body = document.getElementById('modal-body');
    const data = projectData[projectId];

    if (data && modal && body) {
        let mediaHTML = '<div class="modal-gallery">';
        data.media.forEach(item => {
            if (item.type === 'image') {
                mediaHTML += `<img src="${item.url}" class="modal-media-item" alt="Photo du projet" onerror="this.src='assets/images/fallback.jpg'">`;
            } else if (item.type === 'video') {
                mediaHTML += `
                    <video controls class="modal-media-item">
                        <source src="${item.url}" type="video/mp4">
                        Votre navigateur ne supporte pas la vidéo.
                    </video>`;
            }
        });
        mediaHTML += '</div>';

        body.innerHTML = `
            <div class="modal-body-content">
                <h3 id="modal-title">${data.title}</h3>
                <p class="modal-description">${data.text}</p>
                <hr>
                <h4><i class="fas fa-images"></i> Galerie du projet :</h4>
                ${mediaHTML}
            </div>
        `;

        modal.style.display = "flex";
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = "hidden";
        const closeBtn = modal.querySelector('.close-btn');
        if (closeBtn) closeBtn.focus();
    }
}

function toggleDiplomaDescription(event, descId) {
    event.stopPropagation();
    const desc = document.getElementById(descId);
    if (desc) {
        document.querySelectorAll('.diploma-description.show').forEach(d => {
            if (d.id !== descId) d.classList.remove('show');
        });
        desc.classList.toggle('show');
        if (desc.classList.contains('show')) {
            setTimeout(() => {
                const closeOnClickOutside = (e) => {
                    if (!e.target.closest('.diploma-card')) {
                        desc.classList.remove('show');
                        document.removeEventListener('click', closeOnClickOutside);
                    }
                };
                document.addEventListener('click', closeOnClickOutside);
            }, 0);
        }
    }
}

const originalCloseModal = function() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.style.display = "none";
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = "auto";
        modal.classList.remove('gallery-lightbox');
    }
};

window.closeModal = originalCloseModal;

// ==================== ANIMATIONS & INTERACTIONS ====================
function initTypewriter() {
    const textElement = document.getElementById('typewriter-text');
    if (!textElement) return;

    const words = currentLanguage === 'en' ? [
        "Computer Networks",
        "Electricity and Home Automation",
        "Electronic Security"
    ] : [
        "Réseaux Informatiques",
        "Électricité et Domotique",
        "Sécurité Électronique"
    ];

    let wordIndex = 0, charIndex = 0, isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            textElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            textElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        window.Portfolio.typewriterInterval = setTimeout(type, typeSpeed);
    }

    if (window.Portfolio.typewriterInterval) clearTimeout(window.Portfolio.typewriterInterval);
    type();
}

function initDarkMode() {
    const btn = document.getElementById('dark-mode-toggle');
    if (!btn) return;

    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
        document.body.classList.add('dark');
        const icon = btn.querySelector('i');
        if (icon) icon.classList.replace('fa-moon', 'fa-sun');
    }

    btn.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const isNowDark = document.body.classList.contains('dark');
        localStorage.setItem('darkMode', isNowDark);
        const icon = btn.querySelector('i');
        if (icon) {
            if (isNowDark) icon.classList.replace('fa-moon', 'fa-sun');
            else icon.classList.replace('fa-sun', 'fa-moon');
        }
    });
}

function initHoverVideos() {
    document.querySelectorAll('.project-card').forEach(card => {
        const video = card.querySelector('.project-video');
        if (video) {
            card.addEventListener('mouseenter', () => {
                video.load();
                video.play().catch(() => {});
            });
            card.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
            });
        }
    });
}

function initBackToTop() {
    const btn = document.getElementById("backToTop");
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            btn.classList.add("show");
        } else {
            btn.classList.remove("show");
        }
    });

    btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

function initModalEscape() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

// ==================== GALERIE PHOTO (optionnelle) ====================
const galleryData = [
    {
        type: 'image',
        url: 'assets/images/projet1-grand.jpg',
        thumbnail: 'assets/images/projet1-petit.png',
        title: 'Installation caméras Hikvision',
        description: 'Mise en service d’un système de vidéosurveillance IP (20 caméras).'
    },
    {
        type: 'image',
        url: 'assets/images/projet2-grand.jpg',
        thumbnail: 'assets/images/projet2-petit.png',
        title: 'Baie de brassage Cat6a',
        description: 'Brassage et certification Fluke d’une baie réseau.'
    },
    {
        type: 'image',
        url: 'assets/images/cydpwork.jpg',
        thumbnail: 'assets/images/cydpwork1.jpg',
        title: 'CYDEP – Workshop',
        description: 'CYDP WORKSHOP Welding.'
    },
    {
        type: 'video',
        url: 'assets/videos/demo-reseau.mp4',
        thumbnail: 'assets/images/vignette-reseau.jpg',
        title: 'Démonstration réseau',
        description: 'Test de performance d’une infrastructure 10 Gb/s.'
    }
];

function buildGallery() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;

    grid.innerHTML = '';
    galleryData.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        div.innerHTML = `
            <img src="${item.thumbnail}" class="gallery-thumb" alt="${item.title}" loading="lazy">
            <div class="gallery-caption">${item.title}</div>
        `;
        div.addEventListener('click', () => openLightbox(index));
        grid.appendChild(div);
    });
}

let currentLightboxIndex = 0;

function openLightbox(index) {
    const modal = document.getElementById('projectModal');
    if (!modal) return;
    currentLightboxIndex = index;
    showLightboxItem(currentLightboxIndex);
    modal.classList.add('gallery-lightbox');
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function showLightboxItem(index) {
    const item = galleryData[index];
    if (!item) return;
    const modalBody = document.getElementById('modal-body');
    if (!modalBody) return;

    let mediaHTML = '';
    if (item.type === 'image') {
        mediaHTML = `<img src="${item.url}" class="lightbox-media" alt="${item.title}">`;
    } else if (item.type === 'video') {
        mediaHTML = `
            <video controls autoplay class="lightbox-media">
                <source src="${item.url}" type="video/mp4">
                Votre navigateur ne supporte pas la vidéo.
            </video>
        `;
    }

    modalBody.innerHTML = `
        <div class="lightbox-content">
            ${mediaHTML}
            <div class="lightbox-caption">
                <strong>${item.title}</strong><br>
                ${item.description}
            </div>
            <div class="lightbox-nav">
                <button class="prev-btn"><i class="fas fa-chevron-left"></i> Précédent</button>
                <button class="next-btn">Suivant <i class="fas fa-chevron-right"></i></button>
            </div>
        </div>
    `;

    const prevBtn = modalBody.querySelector('.prev-btn');
    const nextBtn = modalBody.querySelector('.next-btn');
    if (prevBtn) prevBtn.onclick = () => navigateLightbox(-1);
    if (nextBtn) nextBtn.onclick = () => navigateLightbox(1);
}

function navigateLightbox(delta) {
    let newIndex = currentLightboxIndex + delta;
    if (newIndex < 0) newIndex = galleryData.length - 1;
    if (newIndex >= galleryData.length) newIndex = 0;
    currentLightboxIndex = newIndex;
    showLightboxItem(currentLightboxIndex);
}

// ==================== CARROUSEL PROJETS (expertises) ====================
function initExpertiseCarousel() {
    const container = document.querySelector('.projects-carousel-container');
    if (!container) return;

    const track = container.querySelector('.projects-carousel');
    const slides = container.querySelectorAll('.carousel-project-slide');
    const prevBtn = container.querySelector('.carousel-project-prev');
    const nextBtn = container.querySelector('.carousel-project-next');
    let indicators = container.querySelectorAll('.carousel-project-indicator');

    if (!track || slides.length === 0) return;

    // Créer les indicateurs s'ils n'existent pas
    if (indicators.length === 0 && slides.length > 1) {
        const indicatorsDiv = container.querySelector('.carousel-project-indicators') || (() => {
            const div = document.createElement('div');
            div.className = 'carousel-project-indicators';
            container.appendChild(div);
            return div;
        })();
        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('span');
            dot.classList.add('carousel-project-indicator');
            if (i === 0) dot.classList.add('active');
            indicatorsDiv.appendChild(dot);
        }
        indicators = container.querySelectorAll('.carousel-project-indicator');
    }

    let currentIndex = 0;
    let autoInterval = null;
    const delay = 6000;

    function showSlide(index) {
        // Gestion des limites
        if (index >= slides.length) currentIndex = 0;
        else if (index < 0) currentIndex = slides.length - 1;
        else currentIndex = index;

        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentIndex);
        });
        indicators.forEach((ind, i) => {
            ind.classList.toggle('active', i === currentIndex);
        });
    }

    function nextSlide() { showSlide(currentIndex + 1); }
    function prevSlide() { showSlide(currentIndex - 1); }

    function startAuto() {
        if (autoInterval) clearInterval(autoInterval);
        autoInterval = setInterval(nextSlide, delay);
    }
    function stopAuto() { if (autoInterval) clearInterval(autoInterval); }

    if (prevBtn) prevBtn.addEventListener('click', () => { stopAuto(); prevSlide(); startAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { stopAuto(); nextSlide(); startAuto(); });

    indicators.forEach((ind, idx) => {
        ind.addEventListener('click', () => { stopAuto(); showSlide(idx); startAuto(); });
    });

    container.addEventListener('mouseenter', stopAuto);
    container.addEventListener('mouseleave', startAuto);

    // Gestion vidéos au survol
    slides.forEach(slide => {
        const video = slide.querySelector('.carousel-project-video');
        if (video) {
            slide.addEventListener('mouseenter', () => {
                video.load();
                video.play().catch(() => {});
            });
            slide.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
            });
        }
    });

    // Clic pour agrandir (lightbox simple)
    slides.forEach(slide => {
        const media = slide.querySelector('.carousel-project-media');
        if (!media) return;
        media.style.cursor = 'pointer';
        media.addEventListener('click', (e) => {
            e.stopPropagation();
            const img = slide.querySelector('.carousel-project-img');
            const video = slide.querySelector('.carousel-project-video');
            const title = slide.querySelector('h4')?.innerText || 'Projet';
            const date = slide.querySelector('.carousel-project-date')?.innerText || '';
            const desc = slide.querySelector('p')?.innerText || '';

            let mediaHTML = '';
            if (video && video.src) {
                mediaHTML = `<video controls autoplay style="width:100%; max-height:70vh;"><source src="${video.src}" type="video/mp4">Vidéo non supportée</video>`;
            } else if (img && img.src) {
                mediaHTML = `<img src="${img.src}" style="width:100%; max-height:70vh; object-fit:contain;" alt="${title}">`;
            }

            const modalBody = document.getElementById('modal-body');
            if (modalBody) {
                modalBody.innerHTML = `
                    <div style="text-align:center;">
                        <h3>${title}</h3>
                        <span style="color:var(--accent);">${date}</span>
                        <p>${desc}</p>
                        <hr>
                        ${mediaHTML}
                    </div>
                `;
                const modal = document.getElementById('projectModal');
                if (modal) {
                    modal.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                }
            }
        });
    });

    showSlide(0);
    startAuto();
}

// ==================== FOND HIGH-TECH (CANVAS) ====================
(function() {
    const canvas = document.getElementById('networkCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const PARTICLE_COUNT = 60;
    const CONNECTION_DISTANCE = 130;
    const MOUSE_RADIUS = 180;
    let mouseX = null, mouseY = null;

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initParticles();
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                radius: 2 + Math.random() * 3
            });
        }
    }

    function draw() {
        if (!ctx) return;
        ctx.clearRect(0, 0, width, height);

        // Connexions
        ctx.lineWidth = 1;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.hypot(dx, dy);
                if (dist < CONNECTION_DISTANCE) {
                    const opacity = 1 - (dist / CONNECTION_DISTANCE);
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(52, 152, 219, ${opacity * 0.7})`;
                    ctx.stroke();
                }
            }
        }

        // Particules
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0) { p.x = 0; p.vx *= -1; }
            if (p.x > width) { p.x = width; p.vx *= -1; }
            if (p.y < 0) { p.y = 0; p.vy *= -1; }
            if (p.y > height) { p.y = height; p.vy *= -1; }

            if (mouseX !== null && mouseY !== null) {
                const dx = p.x - mouseX;
                const dy = p.y - mouseY;
                const dist = Math.hypot(dx, dy);
                if (dist < MOUSE_RADIUS) {
                    const angle = Math.atan2(dy, dx);
                    const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
                    p.vx += Math.cos(angle) * force * 0.2;
                    p.vy += Math.sin(angle) * force * 0.2;
                    const maxSpeed = 1.5;
                    p.vx = Math.min(maxSpeed, Math.max(-maxSpeed, p.vx));
                    p.vy = Math.min(maxSpeed, Math.max(-maxSpeed, p.vy));
                }
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#00d4ff';
            ctx.fill();
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#00d4ff';
            ctx.fill();
            ctx.shadowBlur = 0;
        }

        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });
    window.addEventListener('mouseleave', () => { mouseX = null; mouseY = null; });

    resizeCanvas();
    draw();
})();

// ==================== INITIALISATION UNIQUE ====================
document.addEventListener('DOMContentLoaded', async () => {
    // 1. Traductions (chargement asynchrone mais attendu)
    await loadTranslations();

    // 2. Compositions
    initTypewriter();
    initDarkMode();
    initHoverVideos();
    initBackToTop();
    initModalEscape();
    buildGallery();
    initExpertiseCarousel();   // ← le carrousel pour les pages d'expertise (seulement si la structure existe)

    // 3. Bouton de langue
    const langBtn = document.getElementById('language-toggle');
    if (langBtn) langBtn.addEventListener('click', toggleLanguage);

    // 4. Fermeture modale par clic externe
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    console.log('✅ Portfolio initialisé');
});