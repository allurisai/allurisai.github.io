// ===========================
// LOADER
// ===========================
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    startTyping();
    initParticles();
  }, 2000);
});

// ===========================
// TYPING ANIMATION
// ===========================
function startTyping() {
  const name = "Sai Vignesh Alluri";
  const el = document.getElementById('typedName');
  let i = 0;
  el.textContent = '';
  const interval = setInterval(() => {
    el.textContent += name[i];
    i++;
    if (i >= name.length) clearInterval(interval);
  }, 80);
}

// ===========================
// SCROLL PROGRESS BAR
// ===========================
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  document.getElementById('scroll-progress').style.width = progress + '%';
  handleBackToTop(scrollTop);
});

// ===========================
// PAGE-BASED NAVIGATION
// ===========================
function showPage(id) {
  document.querySelectorAll('.section, .hero').forEach(sec => {
    sec.classList.remove('active-page');
  });

  const target = document.querySelector(id);
  if (target) {
    target.classList.add('active-page');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  document.querySelectorAll('.nav-link, .mob-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === id) {
      link.classList.add('active');
    }
  });

  document.getElementById('mobileMenu').classList.remove('open');
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const href = anchor.getAttribute('href');
    if (href && href.length > 1) {
      showPage(href);
    }
  });
});

showPage('#about');

// ===========================
// HAMBURGER MENU
// ===========================
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mobileMenu').classList.toggle('open');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.remove('open');
  });
});

// ===========================
// THEME SWITCHER
// ===========================
const themeToggle = document.getElementById('themeToggle');
let currentTheme = localStorage.getItem('portfolio-theme') || 'dark';
applyTheme(currentTheme);

themeToggle.addEventListener('click', () => {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(currentTheme);
  localStorage.setItem('portfolio-theme', currentTheme);
});

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeToggle.textContent = theme === 'dark' ? '🌙' : '☀️';
}

// ===========================
// MUSIC TOGGLE
// ===========================
const musicBtn   = document.getElementById('musicBtn');
const bgMusic    = document.getElementById('bgMusic');
const nowPlaying = document.getElementById('nowPlaying');
const volumeSlider = document.getElementById('volumeSlider');
let isPlaying = false;

bgMusic.volume = 0.5;

musicBtn.addEventListener('click', () => {
  if (isPlaying) {
    bgMusic.pause();
    musicBtn.innerHTML = '<i class="fas fa-music"></i><span class="music-label">Music</span>';
    musicBtn.classList.remove('playing');
    nowPlaying.classList.add('hidden');
    isPlaying = false;
  } else {
    bgMusic.play()
      .then(() => {
        musicBtn.innerHTML = '<i class="fas fa-pause"></i><span class="music-label">Pause</span>';
        musicBtn.classList.add('playing');
        nowPlaying.classList.remove('hidden');
        isPlaying = true;
      })
      .catch(() => {
        showToast('⚠️ Add music.mp3 to the assets/ folder!');
      });
  }
});

volumeSlider.addEventListener('input', () => {
  bgMusic.volume = volumeSlider.value;
});

// ===========================
// FADE-IN ON SCROLL
// ===========================
const fadeEls = document.querySelectorAll('.fade-up');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => fadeObserver.observe(el));

// ===========================
// SKILL BARS ANIMATION
// ===========================
const skillBars = document.querySelectorAll('.skill-bar-item');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const level = entry.target.getAttribute('data-level');
      const fill  = entry.target.querySelector('.bar-fill');
      setTimeout(() => {
        fill.style.width = level + '%';
      }, 200);
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillBars.forEach(bar => skillObserver.observe(bar));

// ===========================
// COPY EMAIL TO CLIPBOARD
// ===========================
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const text = btn.getAttribute('data-copy');
    navigator.clipboard.writeText(text)
      .then(() => showToast('✅ Email copied to clipboard!'))
      .catch(() => showToast('⚠️ Could not copy. Try manually.'));
  });
});

// ===========================
// TOAST NOTIFICATION
// ===========================
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 2800);
}

// ===========================
// BACK TO TOP BUTTON
// ===========================
function handleBackToTop(scrollY) {
  const btn = document.getElementById('backToTop');
  if (scrollY > 400) {
    btn.classList.add('visible');
  } else {
    btn.classList.remove('visible');
  }
}

document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===========================
// CONTACT FORM SUBMIT
// ===========================
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  showToast('✅ Message sent! (Connect a backend to enable real emails)');
  e.target.reset();
});

// ===========================
// PARTICLE / STAR BACKGROUND
// ===========================
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  const ctx    = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: null, y: null };

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();

  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });

  window.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  function getAccentColor() {
    return getComputedStyle(document.documentElement)
      .getPropertyValue('--accent').trim() || '#2a7fff';
  }

  class Particle {
    constructor() { this.reset(); }

    reset() {
      this.x       = Math.random() * canvas.width;
      this.y       = Math.random() * canvas.height;
      this.size    = Math.random() * 1.5 + 0.4;
      this.speedX  = (Math.random() - 0.5) * 0.35;
      this.speedY  = (Math.random() - 0.5) * 0.35;
      this.opacity = Math.random() * 0.5 + 0.1;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Mouse repel effect
      if (mouse.x !== null && mouse.y !== null) {
        const dx   = mouse.x - this.x;
        const dy   = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          this.x -= dx * 0.018;
          this.y -= dy * 0.018;
        }
      }

      // Bounce off walls
      if (this.x < 0 || this.x > canvas.width)  this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height)  this.speedY *= -1;
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle   = getAccentColor();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function createParticles() {
    particles = [];
    const count = Math.floor((canvas.width * canvas.height) / 12000);
    for (let i = 0; i < Math.min(count, 80); i++) {
      particles.push(new Particle());
    }
  }
  createParticles();

  function drawConnections() {
    const accent = getAccentColor();
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          ctx.save();
          ctx.globalAlpha = (1 - dist / 110) * 0.12;
          ctx.strokeStyle  = accent;
          ctx.lineWidth    = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(animate);
  }
  animate();
}

// ===========================
// NAVBAR SHADOW ON SCROLL
// ===========================
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 20) {
    nav.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)';
  } else {
    nav.style.boxShadow = 'none';
  }
});

