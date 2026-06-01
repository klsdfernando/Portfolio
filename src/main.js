// ============================================
// MAIN JS — Navbar scroll, hamburger, parallax,
// typing effect, particle system
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

// --- Typing effect for role titles ---
const typedTextEl = document.getElementById('hero-typed-text');
const roles = [
  'Machine Learning Researcher.',
  'Cybersecurity Researcher.',
  'Full Stack Developer.',
  'IoT Enthusiast.'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 80;

function typeRole() {
  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    typedTextEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause at end
    } else {
      typingSpeed = 80 + Math.random() * 40; // Natural typing speed variation
    }
  } else {
    typedTextEl.textContent = currentRole.substring(0, charIndex - 1) || '\u00A0';
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Brief pause before next word
      typedTextEl.textContent = '\u00A0';
    } else {
      typingSpeed = 40;
    }
  }

  setTimeout(typeRole, typingSpeed);
}

// Start typing after a short delay
setTimeout(typeRole, 800);

// --- Subtle parallax on hero image area (mouse move) ---
const heroBlob = document.getElementById('hero-blob');
const heroImageWrapper = document.getElementById('hero-image-wrapper');
const badgeMl = document.getElementById('badge-ml');
const badgeCyber = document.getElementById('badge-cyber');
const badgeIot = document.getElementById('badge-iot');
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
  if (badgeMl) {
    badgeMl.style.transform = `translateY(${Math.sin(Date.now() / 500) * 4}px) translate(${x * -10}px, ${y * -10}px)`;
  }
  if (badgeCyber) {
    badgeCyber.style.transform = `translateY(${Math.sin(Date.now() / 500 + 1) * 4}px) translate(${x * -8}px, ${y * -8}px)`;
  }
  if (badgeIot) {
    badgeIot.style.transform = `translateY(${Math.sin(Date.now() / 500 + 2) * 4}px) translate(${x * -12}px, ${y * -12}px)`;
  }
  if (rotatingCircle) {
    rotatingCircle.style.marginLeft = `${x * 6}px`;
    rotatingCircle.style.marginTop = `${y * 6}px`;
  }
});

// --- Particle system for hero background ---
const canvas = document.getElementById('hero-particles');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animId;

  function resizeCanvas() {
    const hero = document.getElementById('hero-section');
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  }

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.4 + 0.1;
      this.hue = Math.random() > 0.6 ? 220 : 42; // blue or warm gold
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue}, 80%, 65%, ${this.opacity})`;
      ctx.fill();
    }
  }

  function initParticles() {
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 80);
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          const opacity = (1 - dist / 120) * 0.12;
          ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    connectParticles();
    animId = requestAnimationFrame(animateParticles);
  }

  resizeCanvas();
  initParticles();
  animateParticles();

  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
  });
}

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
document.querySelectorAll('.hero-greeting, .hero-title, .hero-description, .hero-buttons, .hero-role-badge, .hero-stats, .tool-card-wrapper').forEach(el => {
  observer.observe(el);
});

// --- Animated stats counter ---
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNumbers = entry.target.querySelectorAll('.stat-number');
      statNumbers.forEach(num => {
        const target = parseInt(num.getAttribute('data-target'));
        const duration = 1500;
        const start = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - start;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          num.textContent = Math.floor(eased * target);

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            num.textContent = target;
          }
        }

        requestAnimationFrame(updateCounter);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.getElementById('hero-stats');
if (heroStats) {
  statsObserver.observe(heroStats);
}

// --- Services Slideshow ---
const servicesSlider = document.getElementById('services-slider');
const servicesDots = document.getElementById('services-dots');

if (servicesSlider) {
  const slides = servicesSlider.querySelectorAll('.service-slide');
  let currentService = 0;
  let serviceTimer = null;

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('services-dot');
    dot.setAttribute('aria-label', `Service ${i + 1}`);
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToService(i));
    servicesDots.appendChild(dot);
  });

  function goToService(index) {
    slides[currentService].classList.remove('active');
    currentService = index;
    slides[currentService].classList.add('active');
    const dots = servicesDots.querySelectorAll('.services-dot');
    dots.forEach((d, i) => d.classList.toggle('active', i === currentService));
  }

  function nextService() {
    goToService((currentService + 1) % slides.length);
  }

  function startServiceTimer() {
    serviceTimer = setInterval(nextService, 4000);
  }

  const servicesBox = document.getElementById('services-box');
  servicesBox.addEventListener('mouseenter', () => clearInterval(serviceTimer));
  servicesBox.addEventListener('mouseleave', () => startServiceTimer());

  startServiceTimer();
}

// --- Skills Slideshow (dynamic grouping) ---
const skillsSlider = document.getElementById('skills-slider');
const skillsDots = document.getElementById('skills-dots');

if (skillsSlider) {
  // Collect all raw skill items
  const allSkillItems = Array.from(skillsSlider.querySelectorAll('.skill-item[data-skill]'));
  // Store original HTML for rebuild
  const skillsHTML = allSkillItems.map(el => el.outerHTML);
  let currentSkill = 0;
  let skillTimer = null;
  let skillSlides = [];

  function buildSkillSlides() {
    clearInterval(skillTimer);
    currentSkill = 0;

    // Temporarily show all items to measure one item's height
    skillsSlider.innerHTML = skillsHTML[0];
    const tempItem = skillsSlider.querySelector('.skill-item');
    const itemStyle = getComputedStyle(tempItem);
    const itemHeight = tempItem.offsetHeight + parseInt(itemStyle.marginBottom || 0);
    const gap = 14; // gap between items
    const singleItemH = itemHeight + gap;

    // Get available height in the slider area
    const sliderHeight = skillsSlider.offsetHeight || 300;
    const perSlide = Math.max(1, Math.floor((sliderHeight + gap) / singleItemH));

    // Group items into slides
    const chunks = [];
    for (let i = 0; i < skillsHTML.length; i += perSlide) {
      chunks.push(skillsHTML.slice(i, i + perSlide));
    }

    // Build slide DOM
    skillsSlider.innerHTML = '';
    chunks.forEach((chunk, idx) => {
      const slide = document.createElement('div');
      slide.classList.add('skills-slide');
      if (idx === 0) slide.classList.add('active');
      slide.innerHTML = chunk.join('');
      skillsSlider.appendChild(slide);
    });

    skillSlides = skillsSlider.querySelectorAll('.skills-slide');

    // Rebuild dots
    skillsDots.innerHTML = '';
    if (skillSlides.length > 1) {
      skillSlides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.classList.add('skills-dot');
        dot.setAttribute('aria-label', `Skills ${i + 1}`);
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSkill(i));
        skillsDots.appendChild(dot);
      });
      startSkillTimer();
    }
  }

  function goToSkill(index) {
    if (!skillSlides.length) return;
    skillSlides[currentSkill].classList.remove('active');
    currentSkill = index % skillSlides.length;
    skillSlides[currentSkill].classList.add('active');
    const dots = skillsDots.querySelectorAll('.skills-dot');
    dots.forEach((d, i) => d.classList.toggle('active', i === currentSkill));
  }

  function nextSkill() {
    goToSkill((currentSkill + 1) % skillSlides.length);
  }

  function startSkillTimer() {
    clearInterval(skillTimer);
    if (skillSlides.length > 1) {
      skillTimer = setInterval(nextSkill, 4500);
    }
  }

  const skillsBox = document.getElementById('skills-box');
  skillsBox.addEventListener('mouseenter', () => clearInterval(skillTimer));
  skillsBox.addEventListener('mouseleave', () => startSkillTimer());

  // Build on load (after a tiny delay so layout is settled)
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      buildSkillSlides();
    });
  });

  // Rebuild on resize
  let skillsResizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(skillsResizeTimeout);
    skillsResizeTimeout = setTimeout(buildSkillSlides, 250);
  });
}

// --- Projects Carousel ---
const carouselTrack = document.getElementById('carousel-track');
const dotsContainer = document.getElementById('carousel-dots');
const prevBtn = document.getElementById('carousel-prev');
const nextBtn = document.getElementById('carousel-next');

if (carouselTrack) {
  const originalCards = Array.from(carouselTrack.querySelectorAll('.project-card'));
  const totalOriginal = originalCards.length;

  // Clone last card and prepend to start
  const prevClone = originalCards[totalOriginal - 1].cloneNode(true);
  carouselTrack.insertBefore(prevClone, originalCards[0]);

  // Clone first 3 cards and append to end (since max visible is 3)
  for (let i = 0; i < 3; i++) {
    const clone = originalCards[i % totalOriginal].cloneNode(true);
    carouselTrack.appendChild(clone);
  }

  let currentIndex = 1; // 1 is the first original card
  let autoSlideTimer = null;
  let isTransitioning = false;

  // Build dots (one for each original project)
  function buildDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalOriginal; i++) {
      const dot = document.createElement('button');
      dot.classList.add('carousel-dot');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        resetAutoSlide();
        goTo(i + 1);
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    let dotIndex = currentIndex - 1;
    if (dotIndex === totalOriginal) dotIndex = 0;
    if (dotIndex === -1) dotIndex = totalOriginal - 1;
    
    dots.forEach((d, i) => {
      if (i === dotIndex) {
        d.classList.remove('active');
        void d.offsetWidth; // trigger reflow to perfectly sync CSS animation
        d.classList.add('active');
      } else {
        d.classList.remove('active');
      }
    });
  }

  function getCardWidth() {
    const allCards = carouselTrack.querySelectorAll('.project-card');
    return allCards[0].getBoundingClientRect().width + 24; // width + margin (12*2)
  }

  function setTrackPosition() {
    carouselTrack.style.transform = `translateX(-${currentIndex * getCardWidth()}px)`;
  }

  function goTo(index) {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex = index;
    carouselTrack.style.transition = 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
    setTrackPosition();
    updateDots();
  }

  carouselTrack.addEventListener('transitionend', () => {
    isTransitioning = false;
    // Loop right
    if (currentIndex >= totalOriginal + 1) {
      carouselTrack.style.transition = 'none';
      currentIndex = 1;
      setTrackPosition();
      carouselTrack.offsetHeight; // force reflow
    }
    // Loop left
    if (currentIndex <= 0) {
      carouselTrack.style.transition = 'none';
      currentIndex = totalOriginal;
      setTrackPosition();
      carouselTrack.offsetHeight; // force reflow
    }
  });

  function next() {
    if (isTransitioning) return;
    goTo(currentIndex + 1);
  }

  function prev() {
    if (isTransitioning) return;
    goTo(currentIndex - 1);
  }

  prevBtn.addEventListener('click', () => { prev(); resetAutoSlide(); });
  nextBtn.addEventListener('click', () => { next(); resetAutoSlide(); });

  // Auto slide
  function startAutoSlide() {
    if (window.projectsCarouselTimer) clearInterval(window.projectsCarouselTimer);
    window.projectsCarouselTimer = setInterval(next, 5000);
  }

  function resetAutoSlide() {
    if (window.projectsCarouselTimer) clearInterval(window.projectsCarouselTimer);
    updateDots(); // Refresh dot animation from 0
    startAutoSlide();
  }

  // Pause on hover
  const wrapper = document.getElementById('projects-carousel');
  wrapper.addEventListener('mouseenter', () => {
    if (window.projectsCarouselTimer) clearInterval(window.projectsCarouselTimer);
    // Optional: Pause CSS animation visually on hover by applying a paused class to wrapper
    wrapper.classList.add('is-paused');
  });
  
  wrapper.addEventListener('mouseleave', () => {
    wrapper.classList.remove('is-paused');
    resetAutoSlide(); // restarts timer and dot animation perfectly
  });

  let touchStartX = 0;
  let touchEndX = 0;
  wrapper.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
  wrapper.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next(); else prev();
      resetAutoSlide();
    }
  }, { passive: true });

  // Initialize
  buildDots();
  
  // Set initial position without animation
  requestAnimationFrame(() => {
    carouselTrack.style.transition = 'none';
    setTrackPosition();
    carouselTrack.offsetHeight; // force reflow
    carouselTrack.style.transition = 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
    startAutoSlide();
  });

  // Handle window resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      carouselTrack.style.transition = 'none';
      setTrackPosition();
    }, 100);
  });
}

// ============================================
// GITHUB SECTION
// ============================================
const GITHUB_USERNAME = 'klsdfernando';

const LANGUAGE_COLORS = {
  Python: '#3572A5', JavaScript: '#f1e05a', TypeScript: '#3178c6',
  CSS: '#563d7c', HTML: '#e34c26', Java: '#b07219', 'C++': '#f34b7d',
  C: '#555555', Shell: '#89e051', Dart: '#00B4AB', Kotlin: '#A97BFF',
  Go: '#00ADD8', Rust: '#dea584', Ruby: '#701516', 'Jupyter Notebook': '#DA5B0B',
};

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays < 1) return 'Today';
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
  return `${Math.floor(diffDays / 365)}y ago`;
}

// --- Fetch Profile & Repos ---
async function fetchGitHubData() {
  try {
    const [profileRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`)
    ]);

    const profile = await profileRes.json();
    const repos = await reposRes.json();

    // Profile
    const avatar = document.getElementById('gh-avatar');
    const username = document.getElementById('gh-username');
    const bio = document.getElementById('gh-bio');
    const reposCount = document.getElementById('gh-repos-count');
    const followersCount = document.getElementById('gh-followers-count');
    const followingCount = document.getElementById('gh-following-count');

    if (avatar) avatar.src = profile.avatar_url;
    if (username) username.textContent = `@${profile.login}`;
    if (bio) bio.textContent = profile.bio || 'Full Stack Developer';
    if (reposCount) reposCount.textContent = profile.public_repos;
    if (followersCount) followersCount.textContent = profile.followers;
    if (followingCount) followingCount.textContent = profile.following;

    // Repos — filter forks, sort by stars
    const filtered = repos
      .filter(r => !r.fork && r.name !== GITHUB_USERNAME)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 4);

    renderRepos(filtered);
  } catch (err) {
    console.error('Failed to fetch GitHub data:', err);
  }
}

function renderRepos(repos) {
  const grid = document.getElementById('gh-repos-grid');
  if (!grid) return;

  // Build repo cards HTML
  const repoCards = repos.map(repo => `
    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="gh-repo-card">
      <div class="gh-repo-header">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"/>
        </svg>
        <h4 class="gh-repo-name">${repo.name}</h4>
      </div>
      <p class="gh-repo-desc">${repo.description || 'No description provided.'}</p>
      ${repo.topics && repo.topics.length > 0 ? `
        <div class="gh-repo-topics">
          ${repo.topics.slice(0, 4).map(t => `<span class="gh-repo-topic">${t}</span>`).join('')}
          ${repo.topics.length > 4 ? `<span class="gh-repo-topic gh-repo-topic-more">+${repo.topics.length - 4}</span>` : ''}
        </div>
      ` : ''}
      <div class="gh-repo-footer">
        <div class="gh-repo-meta">
          ${repo.language ? `
            <span class="gh-repo-language">
              <span class="gh-repo-lang-dot" style="background: ${LANGUAGE_COLORS[repo.language] || '#8b8b8b'}"></span>
              ${repo.language}
            </span>
          ` : ''}
          ${repo.stargazers_count > 0 ? `
            <span class="gh-repo-stat">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/></svg>
              ${repo.stargazers_count}
            </span>
          ` : ''}
          ${repo.forks_count > 0 ? `
            <span class="gh-repo-stat">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"/></svg>
              ${repo.forks_count}
            </span>
          ` : ''}
        </div>
        <span class="gh-repo-updated">Updated ${formatDate(repo.updated_at)}</span>
      </div>
    </a>
  `).join('');

  // Contribution graph card (placed as last grid item, spans 2 columns)
  const contribCard = `
    <div class="gh-contributions-card gh-grid-contrib">
      <h3 class="gh-card-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        Contribution Activity
      </h3>
      <div class="isometric-container">
        <div class="isometric-grid" id="iso-grid"></div>
      </div>
      <div class="contrib-stats" id="contrib-stats">
        <span class="contrib-total" id="contrib-total">0 commits</span>
        <span>in last 42 days</span>
        <div class="contrib-legend">
          <span class="contrib-legend-label">Less</span>
          <div class="contrib-legend-box" style="background: var(--graph-empty)"></div>
          <div class="contrib-legend-box" style="background: var(--graph-q1)"></div>
          <div class="contrib-legend-box" style="background: var(--graph-q2)"></div>
          <div class="contrib-legend-box" style="background: var(--graph-q3)"></div>
          <div class="contrib-legend-box" style="background: var(--graph-q4)"></div>
          <span class="contrib-legend-label">More</span>
        </div>
      </div>
    </div>
  `;

  grid.innerHTML = repoCards + contribCard;

  // Fetch contributions after the grid is rendered
  fetchContributions();
}

// --- 3D Contribution Graph ---
async function fetchContributions() {
  const grid = document.getElementById('iso-grid');
  if (!grid) return;

  let commitData;
  try {
    const response = await fetch(`https://github-contributions-api.deno.dev/${GITHUB_USERNAME}.json`);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    const flatContributions = data.contributions.flat();
    commitData = flatContributions.slice(-42);
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error);
    const levels = ['NONE', 'FIRST_QUARTILE', 'SECOND_QUARTILE', 'THIRD_QUARTILE', 'FOURTH_QUARTILE'];
    commitData = Array.from({ length: 42 }).map(() => {
      const rand = Math.floor(Math.random() * 5);
      return {
        contributionLevel: levels[rand],
        contributionCount: rand * 3,
        date: new Date().toISOString().split('T')[0]
      };
    });
  }

  const totalCommits = commitData.reduce((sum, day) => sum + (day.contributionCount || 0), 0);
  const maxCommits = Math.max(...commitData.map(d => d.contributionCount || 0), 1);

  document.getElementById('contrib-total').textContent = `${totalCommits} commits`;

  grid.innerHTML = commitData.map((day, i) => {
    let colorTop = 'var(--graph-empty)';
    let colorLeft = 'var(--graph-base)';
    let colorRight = 'var(--graph-base)';
    let zHeight = 4;

    if (day?.contributionCount > 0) {
      const ratio = day.contributionCount / maxCommits;
      zHeight = 6 + (ratio * 45);

      if (day?.contributionLevel === 'FIRST_QUARTILE') {
        colorTop = 'var(--graph-q1)'; colorLeft = 'var(--graph-q1-left)'; colorRight = 'var(--graph-q1-right)';
      } else if (day?.contributionLevel === 'SECOND_QUARTILE') {
        colorTop = 'var(--graph-q2)'; colorLeft = 'var(--graph-q2-left)'; colorRight = 'var(--graph-q2-right)';
      } else if (day?.contributionLevel === 'THIRD_QUARTILE') {
        colorTop = 'var(--graph-q3)'; colorLeft = 'var(--graph-q3-left)'; colorRight = 'var(--graph-q3-right)';
      } else if (day?.contributionLevel === 'FOURTH_QUARTILE') {
        colorTop = 'var(--graph-q4)'; colorLeft = 'var(--graph-q4-left)'; colorRight = 'var(--graph-q4-right)';
      }
    }

    return `
      <div class="iso-cube" title="${day?.contributionCount || 0} commits on ${day?.date || 'Unknown'}"
           style="--z-height: ${zHeight}px; --color-top: ${colorTop}; --color-left: ${colorLeft}; --color-right: ${colorRight}; animation-delay: ${i * 15}ms;">
        <div class="iso-base"></div>
        <div class="iso-top"></div>
        <div class="iso-front"></div>
        <div class="iso-back"></div>
        <div class="iso-side"></div>
        <div class="iso-side-right"></div>
      </div>
    `;
  }).join('');
}

// Initialize GitHub section
fetchGitHubData();

console.log('🚀 Sushan Fernando — Portfolio loaded successfully!');
