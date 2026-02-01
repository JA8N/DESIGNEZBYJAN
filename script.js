:root {
    --primary: #FD1445;
    --secondary: #FD723A;
    --dark-bg: #0a0a0a;
    --text-color: #ffffff;
    --glass-bg: rgba(255, 255, 255, 0.05);
    --glass-border: rgba(255, 255, 255, 0.1);
    --glass-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    --font-main: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
}

body {
    font-family: var(--font-main);
    background-color: var(--dark-bg);
    color: var(--text-color);
    overflow-x: hidden;
    line-height: 1.6;
}

/* Animated Background Blobs */
.background-blobs {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    overflow: hidden;
}

.blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.6;
    animation: float 10s infinite ease-in-out;
}

.blob-1 {
    width: 400px;
    height: 400px;
    background: var(--primary);
    top: -100px;
    left: -100px;
    animation-delay: 0s;
}

.blob-2 {
    width: 500px;
    height: 500px;
    background: var(--secondary);
    bottom: -150px;
    right: -150px;
    animation-delay: 2s;
}

.blob-3 {
    width: 300px;
    height: 300px;
    background: linear-gradient(45deg, var(--primary), var(--secondary));
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: float 15s infinite ease-in-out reverse;
}

@keyframes float {
    0% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0, 0) scale(1); }
}

/* Glassmorphism Utility */
.glass-card, .glass-nav {
    background: var(--glass-bg);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid var(--glass-border);
    box-shadow: var(--glass-shadow);
    border-radius: 24px;
}

/* Navigation */
.glass-nav {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    max-width: 1200px;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1000;
    border-radius: 50px; /* More pill-shaped for iOS feel */
}

.logo {
    font-size: 1.5rem;
    font-weight: 700;
    background: linear-gradient(90deg, var(--primary), var(--secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: 1px;
}

.nav-links {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-links a {
    color: var(--text-color);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
    position: relative;
}

.nav-links a::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -5px;
    left: 0;
    background: linear-gradient(90deg, var(--primary), var(--secondary));
    transition: width 0.3s ease;
}

.nav-links a:hover::after {
    width: 100%;
}

.burger {
    display: none;
    cursor: pointer;
}

.burger div {
    width: 25px;
    height: 3px;
    background-color: var(--text-color);
    margin: 5px;
    transition: all 0.3s ease;
}

/* Hero Section */
.hero {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0 1rem;
}

.hero-content {
    padding: 3rem 4rem;
    max-width: 800px;
    animation: fadeInUp 1s ease-out;
}

.hero h1 {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    background: linear-gradient(to right, #fff, #ccc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.hero p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    color: rgba(255, 255, 255, 0.8);
}

.cta-button {
    display: inline-block;
    padding: 12px 30px;
    background: linear-gradient(90deg, var(--primary), var(--secondary));
    color: white;
    text-decoration: none;
    border-radius: 50px;
    font-weight: 600;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: none;
    cursor: pointer;
    font-size: 1rem;
}

.cta-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(253, 20, 69, 0.4);
}

/* Sections General */
.section {
    padding: 6rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.section-title {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 4rem;
    position: relative;
    display: inline-block;
    left: 50%;
    transform: translateX(-50%);
}

.section-title::after {
    content: '';
    position: absolute;
    width: 50%;
    height: 4px;
    bottom: -10px;
    left: 25%;
    background: linear-gradient(90deg, var(--primary), var(--secondary));
    border-radius: 2px;
}

/* Portfolio Grid */
.gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
}

.gallery-item {
    position: relative;
    overflow: hidden;
    height: 350px;
    transition: transform 0.4s ease;
}

.gallery-item:hover {
    transform: translateY(-10px);
}

.gallery-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.gallery-item:hover img {
    transform: scale(1.1);
}

.overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
    padding: 20px;
    transform: translateY(100%);
    transition: transform 0.3s ease;
}

.gallery-item:hover .overlay {
    transform: translateY(0);
}

/* Comparison */
.comparison-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.comparison-item {
    display: flex;
    align-items: center;
    gap: 2rem;
    padding: 2rem;
    flex-wrap: wrap;
    justify-content: center;
}

.img-wrapper {
    position: relative;
    width: 300px;
    height: 300px;
}

.img-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px;
}

.label {
    position: absolute;
    top: 10px;
    left: 10px;
    background: rgba(0,0,0,0.6);
    padding: 5px 10px;
    border-radius: 8px;
    font-size: 0.8rem;
    backdrop-filter: blur(4px);
}

.arrow {
    font-size: 2rem;
    color: var(--secondary);
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.2); opacity: 0.7; }
    100% { transform: scale(1); opacity: 1; }
}

/* Pricing */
.pricing-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.price-card {
    padding: 3rem 2rem;
    text-align: center;
    position: relative;
    transition: transform 0.3s ease;
}

.price-card:hover {
    transform: scale(1.05);
    background: rgba(255, 255, 255, 0.08);
}

.popular {
    border: 2px solid var(--primary);
    transform: scale(1.05);
}

.popular .badge {
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--primary);
    padding: 5px 15px;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: bold;
}

.price-card h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

.price {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 2rem;
    background: linear-gradient(90deg, var(--primary), var(--secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.price-card ul {
    list-style: none;
    margin-bottom: 2rem;
    text-align: left;
    padding-left: 1rem;
}

.price-card ul li {
    margin-bottom: 0.8rem;
}

.price-card ul li::before {
    content: '✓';
    color: var(--secondary);
    margin-right: 10px;
}

.cta-button.small {
    padding: 8px 20px;
    font-size: 0.9rem;
    width: 100%;
}

/* Contact Form */
.contact-form-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 3rem;
}

.input-group {
    position: relative;
    margin-bottom: 2rem;
}

.input-group input, .input-group textarea {
    width: 100%;
    padding: 10px 0;
    font-size: 1rem;
    color: #fff;
    background: transparent;
    border: none;
    border-bottom: 2px solid rgba(255,255,255,0.2);
    outline: none;
    transition: border-color 0.3s ease;
}

.input-group textarea {
    resize: vertical;
    min-height: 100px;
}

.input-group label {
    position: absolute;
    top: 10px;
    left: 0;
    color: rgba(255,255,255,0.5);
    pointer-events: none;
    transition: 0.3s ease all;
}

.input-group input:focus ~ label,
.input-group input:valid ~ label,
.input-group textarea:focus ~ label,
.input-group textarea:valid ~ label {
    top: -20px;
    font-size: 0.8rem;
    color: var(--secondary);
}

.input-group input:focus,
.input-group textarea:focus {
    border-bottom-color: var(--primary);
}

/* Footer */
footer {
    padding: 2rem;
    text-align: center;
    background: rgba(0,0,0,0.5);
    margin-top: 4rem;
}

.socials {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    gap: 1.5rem;
}

.socials a {
    color: white;
    font-size: 1.5rem;
    transition: color 0.3s ease;
}

.socials a:hover {
    color: var(--primary);
}

/* Animations */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Mobile Responsive */
@media screen and (max-width: 768px) {
    .nav-links {
        position: absolute;
        right: 0;
        height: 92vh;
        top: 8vh;
        background-color: #0a0a0a;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 50%;
        transform: translateX(100%);
        transition: transform 0.5s ease-in;
        border-left: 1px solid var(--glass-border);
    }

    .nav-links.nav-active {
        transform: translateX(0%);
    }

    .burger {
        display: block;
    }

    .hero h1 {
        font-size: 2.5rem;
    }
    
    .comparison-item {
        flex-direction: column;
    }
    
    .arrow {
        transform: rotate(90deg);
    }
}
