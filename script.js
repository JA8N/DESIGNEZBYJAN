document.addEventListener('DOMContentLoaded', () => {

    // 1. Reveal Animation on Scroll
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));

    // 2. Mouse Glow Effect
    const glow = document.querySelector('.glow-point');
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        
        // Sanfte Verzögerung für den Apple-Look
        glow.animate({
            left: `${x}px`,
            top: `${y}px`
        }, { duration: 2000, fill: "forwards" });
    });

    // 3. Magnetic Button Effect (Optionaler Flex)
    const buttons = document.querySelectorAll('.btn-primary, .contact-card');
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.02)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0, 0) scale(1)`;
        });
    });

});
