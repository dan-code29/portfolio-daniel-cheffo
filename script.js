/**
 * PORTFOLIO DANIEL NEGUEM - SCRIPT GLOBAL AMÉLIORÉ
 * Version: 2.0 - Refactorisation modulaire
 */

// Namespace global pour éviter la pollution du scope
window.Portfolio = window.Portfolio || {};

// ==================== 1. DONNÉES PROJETS ====================
const projectData = {
    'modal-p1': {
        title: "Installation Vidéosurveillance IP",
        text: "Mise en place de 20 caméras Hikvision, configuration du NVR, paramétrage du logiciel VMS et accès distant sécurisé.",
        media: [
            { type: 'image', url: 'chantier1.jpg' },
            { type: 'image', url: 'camera-posee.jpg' },
            { type: 'video', url: 'test-nuit.mp4' }
        ]
    },
    'modal-p2': {
        title: "Câblage Baie de Brassage",
        text: "Identification de 150 points réseaux, passage de câbles Cat6a, brassage avec peignes et certification Fluke.",
        media: [
            { type: 'image', url: 'baie-avant.jpg' },
            { type: 'image', url: 'baie-apres.jpg' }
        ]
    },
    'modal-p3': {
        title: "Projet CYDEP & Management - Vaal University",
        text: "Leadership spirituel, formation en management des petites entreprises à Vaal University et vie communautaire.",
        media: [
            { type: 'video', url: 'danielCYDP.mp4' },
            { type: 'image', url: 'etude-biblique.jpg' },
            { type: 'image', url: 'universite-vaal.jpg' },
            { type: 'image', url: 'equipe-volontaires.jpg' }
        ]
    }
};

// ==================== 2. MODALE (projets & diplômes) ====================
function openModal(projectId) {
    const modal = document.getElementById('projectModal');
    const body = document.getElementById('modal-body');
    const data = projectData[projectId];

    if (data && modal && body) {
        let mediaHTML = '<div class="modal-gallery">';
        data.media.forEach(item => {
            if (item.type === 'image') {
                mediaHTML += `<img src="${item.url}" class="modal-media-item" alt="Photo du projet" onerror="this.src='fallback.jpg'">`;
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
                <hr style="border:0; border-top:1px solid #eee; margin:20px 0;">
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

// Fonction toggle description diplôme
function toggleDiplomaDescription(event, descId) {
    event.stopPropagation();
    const desc = document.getElementById(descId);
    if (desc) {
        // Fermer toutes les autres descriptions
        document.querySelectorAll('.diploma-description.show').forEach(d => {
            if (d.id !== descId) d.classList.remove('show');
        });
        
        // Toggle celle-ci
        desc.classList.toggle('show');
        
        // Fermer si on clique en dehors
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

// Fonction originale closeModal (sauvegardée pour être utilisée dans l'override)
const originalCloseModal = function() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.style.display = "none";
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = "auto";
    }
};

// On remplace closeModal par une version qui gère aussi la galerie
window.closeModal = function() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.classList.remove('gallery-lightbox');
        originalCloseModal();
    }
};

// ==================== 3. FONCTIONS D'ANIMATION & INTERACTIONS ====================
function initTypewriter() {
    const textElement = document.getElementById('typewriter-text');
    if (!textElement) return;

    const words = [
        "Réseaux Informatiques",
        "Électricité et Domotique",
        "Sécurité Électronique",
        "Automatisme Industriel"
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

        setTimeout(type, typeSpeed);
    }
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
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
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
    const backToTopBtn = document.getElementById("backToTop");
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTopBtn.classList.add("show");
        } else {
            backToTopBtn.classList.remove("show");
        }
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

function initModalEscape() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

// ==================== 4. GALERIE PHOTO AVANCÉE ====================
const galleryData = [
    {
        type: 'image',
        url: 'images/projet1-grand.jpg',
        thumbnail: 'images/projet1-petit.jpg',
        title: 'Installation caméras Hikvision',
        description: 'Mise en service d’un système de vidéosurveillance IP (20 caméras).'
    },
    {
        type: 'image',
        url: 'images/projet2-grand.jpg',
        thumbnail: 'images/projet2-petit.jpg',
        title: 'Baie de brassage Cat6a',
        description: 'Brassage et certification Fluke d’une baie réseau.'
    },
    {
        type: 'image',
        url: 'images/projet3-grand.jpg',
        thumbnail: 'images/projet3-petit.jpg',
        title: 'CYDEP – Vaal University',
        description: 'Cérémonie de remise des certificats.'
    },
    {
        type: 'video',
        url: 'videos/demo-reseau.mp4',
        thumbnail: 'images/vignette-reseau.jpg',
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
        div.setAttribute('data-index', index);
        div.innerHTML = `
            <img src="${item.thumbnail}" class="gallery-thumb" alt="${item.title}">
            <div class="gallery-caption">${item.title}</div>
        `;
        div.addEventListener('click', () => openLightbox(index));
        grid.appendChild(div);
    });
}

let currentLightboxIndex = 0;

function openLightbox(index) {
    const modal = document.getElementById('projectModal');
    const body = document.getElementById('modal-body');
    if (!modal || !body) {
        console.error('Modal ou body non trouvé');
        return;
    }

    Portfolio.lightbox = Portfolio.lightbox || {};
    Portfolio.lightbox.currentIndex = index;
    showLightboxItem(Portfolio.lightbox.currentIndex);
    modal.classList.add('gallery-lightbox');
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function showLightboxItem(index) {
    const item = galleryData[index];
    if (!item) return;

    const modalBody = document.getElementById('modal-body');
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
                <button class="prev-btn" aria-label="Précédent"><i class="fas fa-chevron-left"></i> Précédent</button>
                <button class="next-btn" aria-label="Suivant">Suivant <i class="fas fa-chevron-right"></i></button>
            </div>
        </div>
    `;

    const prevBtn = modalBody.querySelector('.prev-btn');
    const nextBtn = modalBody.querySelector('.next-btn');
    if (prevBtn) prevBtn.addEventListener('click', () => navigateLightbox(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => navigateLightbox(1));
}

function navigateLightbox(delta) {
    Portfolio.lightbox = Portfolio.lightbox || {};
    let newIndex = (Portfolio.lightbox.currentIndex || 0) + delta;
    if (newIndex < 0) newIndex = galleryData.length - 1;
    if (newIndex >= galleryData.length) newIndex = 0;
    Portfolio.lightbox.currentIndex = newIndex;
    showLightboxItem(Portfolio.lightbox.currentIndex);
}

// ==================== 5. INITIALISATION GLOBALE ====================
document.addEventListener('DOMContentLoaded', () => {
    try {
        initTypewriter();
        console.log('✓ Typewriter initialisé');
    } catch (e) {
        console.warn('Erreur typewriter:', e);
    }

    try {
        initDarkMode();
        console.log('✓ Mode sombre initialisé');
    } catch (e) {
        console.warn('Erreur dark mode:', e);
    }

    try {
        initHoverVideos();
        console.log('✓ Hover vidéos initialisé');
    } catch (e) {
        console.warn('Erreur hover vidéos:', e);
    }

    try {
        initBackToTop();
        console.log('✓ Back to top initialisé');
    } catch (e) {
        console.warn('Erreur back to top:', e);
    }

    try {
        initModalEscape();
        console.log('✓ Modal escape initialisé');
    } catch (e) {
        console.warn('Erreur modal escape:', e);
    }

    try {
        buildGallery();
        console.log('✓ Galerie construite');
    } catch (e) {
        console.warn('Erreur galerie:', e);
    }

    // Fermeture modale par clic en dehors
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }
    
    console.log('✓ Portfolio initialisé avec succès');
});

// ==================== 6. FOND HIGH-TECH (CANVAS) ====================
(function() {
    const canvas = document.getElementById('networkCanvas');
    if (!canvas) {
        console.error('Canvas #networkCanvas introuvable !');
        return;
    }
    console.log('Canvas trouvé, démarrage du fond high-tech.');

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    // Réduction du nombre de particules pour meilleure performance
    const PARTICLE_COUNT = 60;
    const CONNECTION_DISTANCE = 130;
    const MOUSE_RADIUS = 180;
    let mouseX = null, mouseY = null;
    let animationRunning = true;

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

    function onMouseMove(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }
    function onMouseLeave() {
        mouseX = null;
        mouseY = null;
    }

    try {
        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseleave', onMouseLeave);

        resizeCanvas();
        draw();
    } catch (error) {
        console.error('Erreur lors de l\'initialisation du canvas:', error);
        canvas.style.display = 'none';
    }
})();