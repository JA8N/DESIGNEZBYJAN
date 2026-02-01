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
    const isTouch = window.matchMedia('(pointer: coarse)').matches || ('ontouchstart' in window);
    
    if (!isTouch) {
        cards.forEach(card => {
            let ticking = false;
            card.addEventListener('mouseenter', () => {
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
                        const rotateX = ((y - centerY) / centerY) * -5; 
                        const rotateY = ((x - centerX) / centerX) * 5;
                        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
                        ticking = false;
                    });
                    ticking = true;
                }
            });
            card.addEventListener('mouseleave', () => {
                card.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });
    }

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

    const priceCards = document.querySelectorAll('.price-card');
    const addonCards = document.querySelectorAll('.addon-card');
    const state = { addonsTotal: 0 };
    const parseNum = (txt) => parseInt(String(txt).replace(/\D/g, ''), 10) || 0;
    const updateAllTotals = () => {
        priceCards.forEach(card => {
            const base = parseNum(card.dataset.base || card.querySelector('.price')?.textContent);
            const totalEl = card.querySelector('.total');
            if (totalEl) totalEl.textContent = `Total: ${base + state.addonsTotal} R$`;
        });
    };
    updateAllTotals();
    addonCards.forEach(addon => {
        const btn = addon.querySelector('.addon-toggle');
        const price = parseNum(addon.dataset.price);
        btn.setAttribute('aria-pressed', 'false');
        const setBtnText = (added) => {
            btn.textContent = added ? `Remove -${price} R$` : `Add +${price} R$`;
        };
        setBtnText(false);
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
            if (btn.classList.contains('active')) {
                state.addonsTotal += price;
                setBtnText(true);
                btn.setAttribute('aria-pressed', 'true');
            } else {
                state.addonsTotal -= price;
                setBtnText(false);
                btn.setAttribute('aria-pressed', 'false');
            }
            updateAllTotals();
        });
    });
    
    const audio = document.getElementById('bg-audio');
    const vol = document.getElementById('audio-volume');
    const toggle = document.getElementById('audio-toggle');
    if (audio && vol && toggle) {
        const savedVol = parseInt(localStorage.getItem('audio_volume') || '30', 10);
        vol.value = String(savedVol);
        audio.volume = Math.min(Math.max(savedVol, 0), 100) / 100;
        let playing = false;
        const setIcon = () => {
            toggle.innerHTML = playing ? '<i class="fa-solid fa-pause"></i>' : '<i class="fa-solid fa-play"></i>';
        };
        const tryPlay = () => {
            audio.play().then(() => {
                playing = true;
                setIcon();
            }).catch(() => {
                playing = false;
                setIcon();
            });
        };
        tryPlay();
        toggle.addEventListener('click', () => {
            if (playing) {
                audio.pause();
                playing = false;
                setIcon();
            } else {
                tryPlay();
            }
        });
        vol.addEventListener('input', () => {
            const v = Math.min(Math.max(parseInt(vol.value, 10), 0), 100) / 100;
            audio.volume = v;
            localStorage.setItem('audio_volume', String(parseInt(vol.value, 10)));
            if (!playing) {
                tryPlay();
            }
        });
        document.addEventListener('click', () => {
            if (!playing) tryPlay();
        }, { once: true });
    }
});
