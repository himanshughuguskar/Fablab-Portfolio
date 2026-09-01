// ==================== NETWORKING PAGE — NOTES TOGGLE ====================
// Base underwater effects (canvas, bubbles, depth meter, timeline progress,
// card reveal and glow) are handled by webdev.js, which is loaded first.

document.querySelectorAll('.net-notes-toggle').forEach((toggle) => {
    const card = toggle.closest('.wd-card');
    const panel = card ? card.querySelector('.net-notes') : null;
    if (!panel) return;

    const label = toggle.querySelector('span');
    const defaultLabel = label ? label.textContent : '';

    toggle.addEventListener('click', () => {
        const isOpen = toggle.getAttribute('aria-expanded') === 'true';

        toggle.setAttribute('aria-expanded', String(!isOpen));
        panel.hidden = isOpen;

        if (label) {
            label.textContent = isOpen ? defaultLabel : 'Hide notes';
        }
    });
});

// ==================== KEYBOARD SHORTCUT: EXPAND / COLLAPSE ALL ====================
document.addEventListener('keydown', (e) => {
    if (e.key !== 'e' && e.key !== 'E') return;
    if (e.target && /^(INPUT|TEXTAREA)$/.test(e.target.tagName)) return;

    const toggles = document.querySelectorAll('.net-notes-toggle');
    if (!toggles.length) return;

    const shouldOpen = ![...toggles].every((t) => t.getAttribute('aria-expanded') === 'true');

    toggles.forEach((t) => {
        const isOpen = t.getAttribute('aria-expanded') === 'true';
        if (isOpen !== shouldOpen) t.click();
    });
});