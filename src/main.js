// ============================================
// MAIN JS — Navbar scroll, hamburger, parallax
// ============================================

// --- Navbar scroll effect ---
const navbar = document.getElementById('main-navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// --- Mobile hamburger ---
const hamburger = document.getElementById('nav-hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// --- Subtle parallax on hero image area (mouse move) ---
const heroImageArea = document.getElementById('hero-image-area');
const heroBlob = document.getElementById('hero-blob');
const heroImageWrapper = document.getElementById('hero-image-wrapper');
const badgeUiux = document.getElementById('badge-uiux');
const badgeProduct = document.getElementById('badge-product');
const rotatingCircle = document.getElementById('rotating-circle');

document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
  const y = (e.clientY / window.innerHeight - 0.5) * 2;

  if (heroBlob) {
    heroBlob.style.transform = `translate(${x * 15}px, ${y * 15}px)`;
  }
  if (heroImageWrapper) {
    heroImageWrapper.style.transform = `translate(${x * 5}px, ${y * 5}px)`;
  }
  if (badgeUiux) {
    badgeUiux.style.transform = `translateY(${Math.sin(Date.now() / 500) * 4}px) translate(${x * -10}px, ${y * -10}px)`;
  }
  if (badgeProduct) {
    badgeProduct.style.transform = `translateY(${Math.sin(Date.now() / 500 + 1) * 4}px) translate(${x * -8}px, ${y * -8}px)`;
  }
  if (rotatingCircle) {
    rotatingCircle.style.marginLeft = `${x * 6}px`;
    rotatingCircle.style.marginTop = `${y * 6}px`;
  }
});

// --- Intersection Observer for fade-in animations ---
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements with animation
document.querySelectorAll('.hero-greeting, .hero-title, .hero-description, .hero-buttons').forEach(el => {
  observer.observe(el);
});

console.log('🚀 Portfolio Hero loaded successfully!');
