// ===========================
// CURSOR GLOW
// ===========================
const cursorGlow = document.getElementById('cursorGlow');

if (window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });
}

// ===========================
// NAVBAR
// ===========================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
    });
});

// Active nav link
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (link) {
            link.classList.toggle('active', scrollY >= top && scrollY < top + height);
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ===========================
// SCROLL REVEAL
// ===========================
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Counter animation for stat numbers
            entry.target.querySelectorAll('.stat-num').forEach(animateCounter);
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ===========================
// COUNTER ANIMATION
// ===========================
function animateCounter(el) {
    if (el.dataset.animated) return;
    el.dataset.animated = true;
    
    const target = parseFloat(el.dataset.count);
    const isDecimal = target % 1 !== 0;
    const duration = 1800;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out
        const current = eased * target;
        
        el.textContent = isDecimal ? current.toFixed(2) : Math.floor(current);
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = isDecimal ? target.toFixed(2) : target;
        }
    }
    
    requestAnimationFrame(update);
}

// ===========================
// VIDEO HOVER PLAY
// ===========================
document.querySelectorAll('.case-card').forEach(card => {
    const video = card.querySelector('video');
    if (video) {
        card.addEventListener('mouseenter', () => video.play().catch(() => {}));
        card.addEventListener('mouseleave', () => video.pause());
    }
});

// Play video button
document.querySelectorAll('.play-video-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = btn.closest('.case-card');
        const video = card.querySelector('video');
        if (video) {
            if (video.paused) {
                video.play();
                btn.querySelector('span').textContent = 'Pause';
                btn.querySelector('i').className = 'fas fa-pause';
            } else {
                video.pause();
                btn.querySelector('span').textContent = 'Play Video';
                btn.querySelector('i').className = 'fas fa-play';
            }
        }
    });
});

// ===========================
// LIGHTBOX
// ===========================
const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightboxContent');
const lightboxClose = document.querySelector('.lightbox-close');

// Video lightbox
document.querySelectorAll('.play-btn[data-video]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const src = btn.dataset.video;
        lightboxContent.innerHTML = `<video controls autoplay style="max-width:90vw;max-height:85vh;border-radius:16px;"><source src="${src}" type="video/mp4"></video>`;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Image lightbox
document.querySelectorAll('.expand-img-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const img = btn.closest('.case-media').querySelector('img');
        if (img) {
            lightboxContent.innerHTML = `<img src="${img.src}" alt="${img.alt}" style="max-width:90vw;max-height:85vh;border-radius:16px;">`;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
        const v = lightboxContent.querySelector('video');
        if (v) v.pause();
        lightboxContent.innerHTML = '';
    }, 300);
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

// ===========================
// SMOOTH SCROLL
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});
