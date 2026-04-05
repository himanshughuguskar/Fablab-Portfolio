// ==================== DOM ELEMENTS ====================
const oceanIntro = document.getElementById('ocean-intro');
const mainSite = document.getElementById('main-site');
const letsGoBtn = document.getElementById('lets-go-btn');
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navLinksContainer = document.getElementById('nav-links');
const heroParticles = document.getElementById('hero-particles');
const cursor = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursor-trail');

// ==================== CUSTOM CURSOR ====================
let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursor) {
        cursor.style.left = mouseX - 10 + 'px';
        cursor.style.top = mouseY - 10 + 'px';
    }
});

function animateTrail() {
    trailX += (mouseX - trailX) * 0.15;
    trailY += (mouseY - trailY) * 0.15;
    if (cursorTrail) {
        cursorTrail.style.left = trailX - 4 + 'px';
        cursorTrail.style.top = trailY - 4 + 'px';
    }
    requestAnimationFrame(animateTrail);
}
animateTrail();

// Cursor hover effect on interactive elements
document.querySelectorAll('a, button, .skill-card, .project-card, .social-link, .contact-item').forEach(el => {
    el.addEventListener('mouseenter', () => cursor && cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor && cursor.classList.remove('hover'));
});

// ==================== CAUSTICS CANVAS ====================
const causticsCanvas = document.getElementById('caustics-canvas');
if (causticsCanvas) {
    const ctx = causticsCanvas.getContext('2d');
    let cW, cH, cTime = 0;

    function resizeCaustics() {
        cW = causticsCanvas.width = window.innerWidth;
        cH = causticsCanvas.height = window.innerHeight;
    }
    resizeCaustics();
    window.addEventListener('resize', resizeCaustics);

    function drawCaustics() {
        ctx.clearRect(0, 0, cW, cH);
        cTime += 0.008;

        for (let i = 0; i < 6; i++) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 247, 255, ${0.08 + Math.sin(cTime + i) * 0.04})`;
            ctx.lineWidth = 1.5;

            for (let x = 0; x < cW; x += 3) {
                const y = cH * 0.3 + Math.sin(x * 0.005 + cTime + i * 1.5) * 80
                    + Math.sin(x * 0.01 + cTime * 1.3 + i) * 40
                    + Math.cos(x * 0.003 + cTime * 0.7 + i * 2) * 60;
                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
        }

        if (!oceanIntro.classList.contains('hidden')) {
            requestAnimationFrame(drawCaustics);
        }
    }
    drawCaustics();
}

// ==================== DYNAMIC BUBBLES ====================
const bubbleContainer = document.getElementById('bubble-container');
if (bubbleContainer) {
    for (let i = 0; i < 20; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        const size = 6 + Math.random() * 18;
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.left = Math.random() * 100 + '%';
        bubble.style.setProperty('--duration', (5 + Math.random() * 8) + 's');
        bubble.style.setProperty('--delay', (Math.random() * 8) + 's');
        bubble.style.setProperty('--drift', (Math.random() * 40 - 20) + 'px');
        bubbleContainer.appendChild(bubble);
    }
}

// ==================== TYPEWRITER EFFECT ====================
function typeWriter(element, text, speed, callback) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    type();
}

const typedLine1 = document.getElementById('typed-line-1');
const typedLine2 = document.getElementById('typed-line-2');
const waveSub = document.getElementById('wave-subtitle');

if (typedLine1 && typedLine2 && waveSub) {
    setTimeout(() => {
        typeWriter(typedLine1, 'Welcome to the', 60, () => {
            typeWriter(typedLine2, 'Deep Blue', 80, () => {
                typeWriter(waveSub, 'Dive into my world of creativity', 30);
            });
        });
    }, 500);
}

// ==================== LET'S GO BUTTON ====================
letsGoBtn.addEventListener('click', () => {
    // Ripple effect
    letsGoBtn.style.pointerEvents = 'none';

    // Slide up ocean intro
    oceanIntro.classList.add('slide-up');

    // After animation, show main site
    setTimeout(() => {
        oceanIntro.classList.add('hidden');
        mainSite.classList.add('visible');
        document.body.style.overflow = 'auto';

        // Trigger hero animations
        animateNameLetters();
        createHeroParticles();
    }, 1800);
});

document.body.style.overflow = 'hidden';

// ==================== HERO NAME LETTER ANIMATION ====================
function animateNameLetters() {
    document.querySelectorAll('.name-part').forEach((letter, index) => {
        letter.style.setProperty('--i', index);
        letter.style.animationDelay = (index * 0.05 + 0.5) + 's';
    });
}

// ==================== HERO PARTICLES ====================
function createHeroParticles() {
    if (!heroParticles) return;
    for (let i = 0; i < 40; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        const size = 2 + Math.random() * 5;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';
        p.style.setProperty('--duration', (4 + Math.random() * 6) + 's');
        p.style.setProperty('--delay', (Math.random() * 5) + 's');
        p.style.setProperty('--moveY', (-10 - Math.random() * 30) + 'px');
        p.style.setProperty('--moveX', (-15 + Math.random() * 30) + 'px');
        p.style.animationDuration = p.style.getPropertyValue('--duration');
        p.style.animationDelay = p.style.getPropertyValue('--delay');
        heroParticles.appendChild(p);
    }
}

// ==================== AMBIENT CANVAS ====================
const ambientCanvas = document.getElementById('ambient-canvas');
if (ambientCanvas) {
    const actx = ambientCanvas.getContext('2d');
    let aW, aH, aTime = 0;

    function resizeAmbient() {
        aW = ambientCanvas.width = window.innerWidth;
        aH = ambientCanvas.height = window.innerHeight;
    }
    resizeAmbient();
    window.addEventListener('resize', resizeAmbient);

    function drawAmbient() {
        actx.clearRect(0, 0, aW, aH);
        aTime += 0.005;

        // Subtle flowing lines
        for (let i = 0; i < 4; i++) {
            actx.beginPath();
            actx.strokeStyle = `rgba(0, 247, 255, ${0.15 + Math.sin(aTime + i) * 0.05})`;
            actx.lineWidth = 1;

            for (let x = 0; x < aW; x += 5) {
                const y = aH * (0.2 + i * 0.2) + Math.sin(x * 0.003 + aTime + i * 2) * 50
                    + Math.cos(x * 0.005 + aTime * 1.5) * 30;
                if (x === 0) actx.moveTo(x, y);
                else actx.lineTo(x, y);
            }
            actx.stroke();
        }

        requestAnimationFrame(drawAmbient);
    }
    drawAmbient();
}

// ==================== NAVBAR EFFECTS ====================
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active nav link
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === current) {
            link.classList.add('active');
        }
    });
});

// ==================== MOBILE NAV ====================
navToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('open');
    navToggle.classList.toggle('active');
});

navLinksContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('open');
        navToggle.classList.remove('active');
    });
});

// ==================== SCROLL REVEAL ====================
const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');

            // Animate skill bars when visible
            entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.setProperty('--target-width', width);
                setTimeout(() => bar.classList.add('animate'), 300);
            });

            // Animate stat counters
            entry.target.querySelectorAll('.stat[data-count]').forEach(stat => {
                animateCounter(stat);
            });
        }
    });
}, observerOptions);

revealElements.forEach(el => revealObserver.observe(el));

// ==================== EDU SCORE BAR ANIMATION ====================
const eduItems = document.querySelectorAll('.edu-item');
const eduObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.3 });
eduItems.forEach(el => eduObserver.observe(el));

// ==================== COUNTER ANIMATION ====================
function animateCounter(stat) {
    const target = parseInt(stat.getAttribute('data-count'));
    const numberEl = stat.querySelector('.stat-number');
    if (!numberEl || numberEl.dataset.animated) return;
    numberEl.dataset.animated = 'true';

    let current = 0;
    const increment = target / 40;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        numberEl.textContent = Math.round(current);
    }, 40);
}

// ==================== SKILL CARD GLOW FOLLOW ====================
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', x + '%');
        card.style.setProperty('--mouse-y', y + '%');
    });
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const position = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: position, behavior: 'smooth' });
        }
    });
});

// ==================== CONTACT FORM ====================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = contactForm.querySelector('button');
        const originalHTML = btn.innerHTML;

        btn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
        btn.style.pointerEvents = 'none';

        setTimeout(() => {
            btn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
            btn.style.background = 'linear-gradient(135deg, #00c853, #00f7ff)';

            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = '';
                btn.style.pointerEvents = '';
                contactForm.reset();
            }, 2500);
        }, 1200);
    });
}

// ==================== PARALLAX ON MOUSE MOVE (Hero) ====================
const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        const imageWrapper = document.getElementById('hero-image-tilt');
        if (imageWrapper) {
            imageWrapper.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
        }
    });

    heroSection.addEventListener('mouseleave', () => {
        const imageWrapper = document.getElementById('hero-image-tilt');
        if (imageWrapper) {
            imageWrapper.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)';
            imageWrapper.style.transition = 'transform 0.5s ease';
            setTimeout(() => { imageWrapper.style.transition = ''; }, 500);
        }
    });
}
