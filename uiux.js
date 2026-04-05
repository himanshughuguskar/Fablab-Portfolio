// ==================== BACKGROUND CANVAS ====================
const canvas = document.getElementById('ux-bg-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let w, h, time = 0;

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function draw() {
        ctx.clearRect(0, 0, w, h);
        time += 0.003;

        // Deep purple-pink gradient
        const grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, '#0a050f');
        grad.addColorStop(0.35, '#100515');
        grad.addColorStop(0.7, '#0d0818');
        grad.addColorStop(1, '#0a050f');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        // Flowing light waves
        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255,110,247,${0.03 + Math.sin(time + i * 0.9) * 0.015})`;
            ctx.lineWidth = 1;
            for (let x = 0; x < w; x += 4) {
                const y = h * (0.15 + i * 0.18) +
                    Math.sin(x * 0.004 + time * 1.1 + i * 1.5) * 55 +
                    Math.cos(x * 0.006 + time * 0.7 + i) * 30;
                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
        }

        // Floating particles
        for (let i = 0; i < 18; i++) {
            const px = (Math.sin(time * 0.45 + i * 2.1) * 0.5 + 0.5) * w;
            const py = (Math.cos(time * 0.3 + i * 1.7) * 0.5 + 0.5) * h;
            const size = 1.2 + Math.sin(time + i) * 0.9;
            const alpha = 0.12 + Math.sin(time * 2 + i) * 0.08;
            const col = i % 3 === 0
                ? `rgba(255,110,247,${alpha})`
                : i % 3 === 1
                ? `rgba(168,85,247,${alpha})`
                : `rgba(6,182,212,${alpha * 0.6})`;
            ctx.beginPath();
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fillStyle = col;
            ctx.fill();
        }

        requestAnimationFrame(draw);
    }
    draw();
}

// ==================== BUBBLES ====================
const bubblesLayer = document.getElementById('ux-bubbles-layer');
if (bubblesLayer) {
    for (let i = 0; i < 15; i++) {
        const b = document.createElement('div');
        b.classList.add('bubble');
        const size = 4 + Math.random() * 14;
        b.style.width = size + 'px';
        b.style.height = size + 'px';
        b.style.left = Math.random() * 100 + '%';
        b.style.setProperty('--dur', (7 + Math.random() * 10) + 's');
        b.style.setProperty('--del', (Math.random() * 10) + 's');
        b.style.setProperty('--drift', (Math.random() * 30 - 15) + 'px');
        bubblesLayer.appendChild(b);
    }
}

// ==================== NAVBAR SCROLL ====================
const nav = document.getElementById('ux-nav');
const meterVal = document.getElementById('ux-meter-value');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = Math.min(scrollY / docHeight, 1);

    if (scrollY > 50) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');

    if (meterVal) meterVal.textContent = Math.round(pct * 100) + '%';
});

// ==================== PROJECT CARD REVEAL ====================
const projects = document.querySelectorAll('.ux-project');

const projObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

projects.forEach(p => projObserver.observe(p));

// ==================== CARD GLOW FOLLOW ====================
document.querySelectorAll('.ux-project-info').forEach(info => {
    const proj = info.closest('.ux-project');
    proj.addEventListener('mousemove', (e) => {
        const rect = info.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        info.style.setProperty('--gx', x + '%');
        info.style.setProperty('--gy', y + '%');
    });
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});
