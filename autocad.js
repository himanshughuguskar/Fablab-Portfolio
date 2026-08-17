// ============================================
// FUSION 360 LEARNING JOURNEY - SCRIPTS
// Blueprint/CAD Themed Animations
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    initBlueprintBackground();
    initFloatingParticles();
    initScrollAnimations();
    initTimelineProgress();
    initProgressMeter();
});

// ============ BLUEPRINT BACKGROUND ============
function initBlueprintBackground() {
    const canvas = document.getElementById('blueprint-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Dark gradient background
        const grad = ctx.createRadialGradient(
            canvas.width / 2, canvas.height / 2, 0,
            canvas.width / 2, canvas.height / 2, canvas.width * 0.7
        );
        grad.addColorStop(0, '#0d1525');
        grad.addColorStop(1, '#0a0e1a');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Blueprint grid - major lines
        ctx.strokeStyle = 'rgba(0, 180, 216, 0.04)';
        ctx.lineWidth = 1;
        const gridSize = 80;

        for (let x = 0; x < canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }

        // Minor grid
        ctx.strokeStyle = 'rgba(0, 180, 216, 0.02)';
        const minorGrid = 20;
        for (let x = 0; x < canvas.width; x += minorGrid) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += minorGrid) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }

        // Decorative circles (like CAD reference points)
        const scrollY = window.scrollY * 0.02;
        ctx.strokeStyle = 'rgba(0, 180, 216, 0.06)';
        ctx.lineWidth = 1;

        for (let i = 0; i < 5; i++) {
            const x = (canvas.width / 6) * (i + 1);
            const y = (canvas.height / 2) + Math.sin(Date.now() / 3000 + i) * 50;
            ctx.beginPath();
            ctx.arc(x, y + scrollY, 30 + i * 10, 0, Math.PI * 2);
            ctx.stroke();
        }

        requestAnimationFrame(draw);
    }
    draw();
}

// ============ FLOATING PARTICLES ============
function initFloatingParticles() {
    const layer = document.getElementById('particles-layer');
    if (!layer) return;

    const shapes = ['circle', 'square', 'triangle'];
    const count = 20;

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        if (shape !== 'triangle') {
            particle.classList.add(shape);
        } else {
            particle.classList.add('triangle');
        }

        const size = Math.random() * 15 + 8;
        if (shape !== 'triangle') {
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
        }

        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 20 + 15) + 's';
        particle.style.animationDelay = (Math.random() * 10) + 's';

        layer.appendChild(particle);
    }
}

// ============ SCROLL ANIMATIONS ============
function initScrollAnimations() {
    const cards = document.querySelectorAll('.f3d-day-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    cards.forEach(card => observer.observe(card));
}

// ============ TIMELINE PROGRESS ============
function initTimelineProgress() {
    const progress = document.getElementById('timeline-progress');
    const section = document.querySelector('.f3d-timeline-section');
    if (!progress || !section) return;

    function updateProgress() {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionHeight = section.offsetHeight;
        const scrolled = window.scrollY - sectionTop + window.innerHeight * 0.5;
        const percentage = Math.min(Math.max(scrolled / sectionHeight * 100, 0), 100);
        progress.style.height = percentage + '%';
    }

    window.addEventListener('scroll', updateProgress);
    updateProgress();
}

// ============ PROGRESS METER ============
function initProgressMeter() {
    const meter = document.getElementById('progress-value');
    if (!meter) return;

    function updateMeter() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const percentage = Math.round((scrollTop / docHeight) * 100);
        meter.textContent = percentage + '%';
    }

    window.addEventListener('scroll', updateMeter);
    updateMeter();
}