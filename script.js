// ===========================
// LOADER
// ===========================
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    startTyping();
  }, 60);
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
// SMOOTH SECTION NAVIGATION
// ===========================
const sectionLinks = document.querySelectorAll('a[href^="#"]');
const navTargets = document.querySelectorAll('.hero, .section');
const navItems = document.querySelectorAll('.nav-link, .mob-link');

sectionLinks.forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href = anchor.getAttribute('href');
    if (!href || href.length <= 1) return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.getElementById('mobileMenu').classList.remove('open');
  });
});

function updateActiveNav() {
  const scrollPosition = window.scrollY + 140;
  let activeId = '#about';

  navTargets.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;

    if (scrollPosition >= top && scrollPosition < bottom) {
      activeId = `#${section.id}`;
    }
  });

  navItems.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === activeId);
  });
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);
updateActiveNav();

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
if (!['dark', 'light'].includes(currentTheme)) {
  currentTheme = 'dark';
}
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
  if (canvas) {
    canvas.style.display = 'none';
  }
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
