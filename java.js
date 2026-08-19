// ==================== UNDERWATER BACKGROUND CANVAS ====================
const canvas = document.getElementById('underwater-bg');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let w, h, time = 0;

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function drawBackground() {
        ctx.clearRect(0, 0, w, h);
        time += 0.003;

        // Deep ocean gradient
        const grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, '#050d1a');
        grad.addColorStop(0.3, '#071428');
        grad.addColorStop(0.6, '#0a1e3d');
        grad.addColorStop(1, '#050d1a');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        // Flowing light caustics
        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 247, 255, ${0.04 + Math.sin(time + i * 0.8) * 0.02})`;
            ctx.lineWidth = 1;
            for (let x = 0; x < w; x += 4) {
                const y = h * (0.15 + i * 0.18) +
                    Math.sin(x * 0.004 + time * 1.2 + i * 1.5) * 60 +
                    Math.cos(x * 0.006 + time * 0.8 + i) * 35;
                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
        }

        // Light particles
        for (let i = 0; i < 15; i++) {
            const px = (Math.sin(time * 0.5 + i * 2.1) * 0.5 + 0.5) * w;
            const py = (Math.cos(time * 0.3 + i * 1.7) * 0.5 + 0.5) * h;
            const size = 1.5 + Math.sin(time + i) * 1;
            const alpha = 0.15 + Math.sin(time * 2 + i) * 0.1;

            ctx.beginPath();
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 247, 255, ${alpha})`;
            ctx.fill();
        }

        requestAnimationFrame(drawBackground);
    }
    drawBackground();
}

// ==================== DYNAMIC BUBBLES ====================
const bubblesLayer = document.getElementById('bubbles-layer');
if (bubblesLayer) {
    for (let i = 0; i < 18; i++) {
        const b = document.createElement('div');
        b.classList.add('bubble');
        const size = 4 + Math.random() * 14;
        b.style.width = size + 'px';
        b.style.height = size + 'px';
        b.style.left = Math.random() * 100 + '%';
        b.style.setProperty('--dur', (6 + Math.random() * 10) + 's');
        b.style.setProperty('--del', (Math.random() * 10) + 's');
        b.style.setProperty('--drift', (Math.random() * 30 - 15) + 'px');
        bubblesLayer.appendChild(b);
    }
}

// ==================== NAVBAR SCROLL ====================
const nav = document.querySelector('.wd-nav');
const depthValue = document.getElementById('depth-value');
const timelineProgress = document.getElementById('timeline-progress');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.min(scrollY / docHeight, 1);

    // Nav scroll effect
    if (scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    // Depth meter
    const depth = Math.round(scrollPercent * 100);
    if (depthValue) depthValue.textContent = depth + 'm';

    // Timeline progress
    if (timelineProgress) {
        timelineProgress.style.height = (scrollPercent * 100) + '%';
    }
});

// ==================== CARD REVEAL ON SCROLL ====================
const dayCards = document.querySelectorAll('.wd-day-card');

// Add animate-in class then observe for visibility
setTimeout(() => {
    dayCards.forEach(card => {
        card.classList.add('animate-in');
    });

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    dayCards.forEach(card => cardObserver.observe(card));
}, 100);

// ==================== CARD GLOW FOLLOW ====================
document.querySelectorAll('.wd-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--gx', x + '%');
        card.style.setProperty('--gy', y + '%');
    });
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});