document.addEventListener('DOMContentLoaded', () => {
    // --- Clipboard Functionality ---
    window.copyToClipboard = function(text, element) {
        navigator.clipboard.writeText(text).then(() => {
            // Visual Feedback
            element.classList.add('copied');
            const statusSpan = element.querySelector('.status');
            const originalText = statusSpan.textContent;
            statusSpan.textContent = "COPIED!";
            
            setTimeout(() => {
                element.classList.remove('copied');
                statusSpan.textContent = originalText;
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    }

    // --- Navigation Logic ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    function toggleNav() {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    }

    if(burger) {
        burger.addEventListener('click', toggleNav);
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                toggleNav();
            }
        });
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- Optimized Scroll Reveal Animation ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Use requestAnimationFrame for smoother class addition
                requestAnimationFrame(() => {
                    entry.target.classList.add('visible');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.glass-card, .section-title, .hero-content');
    animatedElements.forEach((el, index) => {
        // Initial State
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out'; // Simplified transition
        
        // Stagger effect
        if(el.parentElement.classList.contains('gallery-grid') || el.parentElement.classList.contains('pricing-grid')) {
             el.style.transitionDelay = `${(index % 3) * 0.1}s`; 
        }
        observer.observe(el);
    });

    // --- Optimized 3D Tilt Effect ---
    const cards = document.querySelectorAll('.glass-card');
    
    cards.forEach(card => {
        let ticking = false;

        card.addEventListener('mouseenter', () => {
            // Remove transition during interaction for instant response
            card.style.transition = 'none'; 
        });

        card.addEventListener('mousemove', (e) => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    // Slightly reduced rotation for smoother feel
                    const rotateX = ((y - centerY) / centerY) * -5; 
                    const rotateY = ((x - centerX) / centerX) * 5;
                    
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
                    
                    ticking = false;
                });
                ticking = true;
            }
        });

        card.addEventListener('mouseleave', () => {
            // Add transition back for smooth reset
            card.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // --- Optimized Parallax Background ---
    let blobTicking = false;
    const blobs = document.querySelectorAll('.blob');
    
    document.addEventListener('mousemove', (e) => {
        if (!blobTicking) {
            window.requestAnimationFrame(() => {
                const mouseX = e.clientX;
                const mouseY = e.clientY;

                blobs.forEach((blob, index) => {
                    const speed = (index + 1) * 15; // Adjusted speed
                    const x = (window.innerWidth - mouseX * speed) / 100;
                    const y = (window.innerHeight - mouseY * speed) / 100;
                    
                    blob.style.transform = `translate(${x}px, ${y}px)`;
                });
                blobTicking = false;
            });
            blobTicking = true;
        }
    });
});
