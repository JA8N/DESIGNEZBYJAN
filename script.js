// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ========================================
// LIGHTBOX FUNCTIONALITY
// ========================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
const lightboxInfo = lightbox.querySelector('.lightbox-info');
const lightboxClose = lightbox.querySelector('.lightbox-close');

// Open lightbox for floating reference cards
document.querySelectorAll('.float-card').forEach((card, index) => {
  card.addEventListener('click', function() {
    const img = this.querySelector('img');
    const title = `Reference Image ${index + 1}`;
    const description = "Original inspiration for design";
    
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxInfo.innerHTML = `
      <h3 style="color: var(--text-primary); font-size: 1.5rem; margin-bottom: 0.5rem;">${title}</h3>
      <p style="color: var(--text-secondary);">${description}</p>
    `;
    
    lightbox.classList.add('show');
    document.body.style.overflow = 'hidden';
  });
});

// Open lightbox for result cards
document.querySelectorAll('.result-card').forEach(card => {
  card.addEventListener('click', function() {
    const img = this.querySelector('.card-image img');
    const title = this.querySelector('.card-caption h4').textContent;
    const description = this.querySelector('.card-caption p').textContent;
    
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxInfo.innerHTML = `
      <h3 style="color: var(--text-primary); font-size: 1.5rem; margin-bottom: 0.5rem;">${title}</h3>
      <p style="color: var(--text-secondary);">${description}</p>
    `;
    
    lightbox.classList.add('show');
    document.body.style.overflow = 'hidden';
  });
});

// Close lightbox
function closeLightbox() {
  lightbox.classList.remove('show');
  document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', function(e) {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Close lightbox on ESC key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && lightbox.classList.contains('show')) {
    closeLightbox();
  }
});

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe glass boxes
document.querySelectorAll('.glass-box').forEach(box => {
  observer.observe(box);
});

// Observe result cards
document.querySelectorAll('.result-card').forEach(card => {
  observer.observe(card);
});

// Observe sections
document.querySelectorAll('.about, .contact').forEach(section => {
  observer.observe(section);
});

// ========================================
// SCROLL PROGRESS INDICATOR
// ========================================
function updateScrollProgress() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollProgress = (scrollTop / scrollHeight) * 100;
  
  // You can add a progress bar element if needed
  // progressBar.style.width = scrollProgress + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// ========================================
// PARALLAX EFFECT FOR HERO
// ========================================
window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero-content');
  
  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    hero.style.opacity = 1 - (scrolled / window.innerHeight);
  }
});

// ========================================
// ADD HOVER SOUND EFFECT (OPTIONAL)
// ========================================
// Uncomment to add subtle sound feedback on card hover
/*
const hoverSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBCeAxPLQhS0J');
hoverSound.volume = 0.1;

document.querySelectorAll('.card, .contact-card, .services-list li').forEach(element => {
  element.addEventListener('mouseenter', function() {
    hoverSound.currentTime = 0;
    hoverSound.play().catch(() => {});
  });
});
*/

// ========================================
// LAZY LOADING IMAGES
// ========================================
if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.src;
  });
} else {
  // Fallback for browsers that don't support lazy loading
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
}

// ========================================
// FILTER FUNCTIONALITY (OPTIONAL)
// ========================================
// Uncomment to add filter buttons for portfolio items
/*
function filterPortfolio(category) {
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = 'block';
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 10);
    } else {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(() => {
        card.style.display = 'none';
      }, 300);
    }
  });
}

// Add filter buttons to your HTML:
// <div class="filters">
//   <button onclick="filterPortfolio('all')">All</button>
//   <button onclick="filterPortfolio('reference')">References</button>
//   <button onclick="filterPortfolio('design')">Designs</button>
// </div>
*/

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================
// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll handler
const debouncedScroll = debounce(() => {
  updateScrollProgress();
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ========================================
// THEME TOGGLE (OPTIONAL)
// ========================================
// Uncomment to add light/dark mode toggle
/*
function toggleTheme() {
  document.body.classList.toggle('light-mode');
  const isDark = !document.body.classList.contains('light-mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Load saved theme preference
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
  }
});
*/

// ========================================
// INITIALIZE ON LOAD
// ========================================
window.addEventListener('DOMContentLoaded', () => {
  console.log('🎨 Roblox Design Studio Portfolio Loaded');
  
  // Add loading animation completion
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});

// ========================================
// EASTER EGG: KONAMI CODE
// ========================================
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);
  konamiCode = konamiCode.slice(-10);
  
  if (konamiCode.join('') === konamiPattern.join('')) {
    document.body.style.animation = 'rainbow 2s infinite';
    setTimeout(() => {
      document.body.style.animation = '';
    }, 5000);
  }
});

// Add rainbow animation to CSS if you want to use the easter egg
const style = document.createElement('style');
style.textContent = `
  @keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }
`;
document.head.appendChild(style);
