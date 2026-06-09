// THEME TOGGLE (Light / Dark) // 
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function applyTheme(theme) {
  if (theme === 'light') {
    body.classList.add('light-mode');
    themeToggle.textContent = '☾';
    themeToggle.title = 'Switch to Dark Mode';
  } else {
    body.classList.remove('light-mode');
    themeToggle.textContent = '☀';
    themeToggle.title = 'Switch to Light Mode';
  }
}

// Load saved theme
const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const isLight = body.classList.contains('light-mode');
  const newTheme = isLight ? 'dark' : 'light';
  applyTheme(newTheme);
  localStorage.setItem('portfolio-theme', newTheme);
});


// NAVIGATION — Scroll & Active State // 
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a, .nav-drawer a');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Sticky shadow
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active link highlight
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});


// HAMBURGER MENU (Mobile) //
const hamburger = document.querySelector('.hamburger');
const navDrawer = document.querySelector('.nav-drawer');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navDrawer.classList.toggle('open');
});

// Close drawer when a link is clicked
document.querySelectorAll('.nav-drawer a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navDrawer.classList.remove('open');
  });
});


// SMOOTH SCROLL // 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


// SCROLL ANIMATIONS (Intersection Observer) // 
const fadeEls = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

fadeEls.forEach(el => observer.observe(el));


// SKILL BARS — Animate on scroll //
const skillSection = document.getElementById('skills');
let skillsAnimated = false;

function animateSkills() {
  if (skillsAnimated) return;
  const skillFills = document.querySelectorAll('.skill-fill');
  skillFills.forEach(fill => {
    const target = fill.getAttribute('data-width');
    setTimeout(() => { fill.style.width = target + '%'; }, 100);
  });
  skillsAnimated = true;
}

const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) animateSkills();
  });
}, { threshold: 0.1 });

if (skillSection) skillsObserver.observe(skillSection);


// PORTFOLIO FILTER // 
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');

    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Filter cards
    projectCards.forEach(card => {
      const cats = card.getAttribute('data-category') || '';
      if (filter === 'all' || cats.includes(filter)) {
        card.style.display = '';
        card.style.opacity = '0';
        card.style.transform = 'translateY(16px)';
        setTimeout(() => {
          card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(-8px)';
        setTimeout(() => { card.style.display = 'none'; }, 350);
      }
    });
  });
});



// TYPED TAGLINE EFFECT // 
const taglineEl = document.getElementById('typed-tagline');
if (taglineEl) {
  const phrases = [
    'Mahasiswa Informatika', 'Web Developer',
  ];
  let pIdx = 0, cIdx = 0, deleting = false;

  function typeEffect() {
    const current = phrases[pIdx];
    if (!deleting) {
      taglineEl.textContent = current.substring(0, cIdx + 1);
      cIdx++;
      if (cIdx === current.length) {
        deleting = true;
        setTimeout(typeEffect, 1600);
        return;
      }
    } else {
      taglineEl.textContent = current.substring(0, cIdx - 1);
      cIdx--;
      if (cIdx === 0) {
        deleting = false;
        pIdx = (pIdx + 1) % phrases.length;
      }
    }
    setTimeout(typeEffect, deleting ? 60 : 90);
  }

  setTimeout(typeEffect, 1000);
}

// UPDATE FOOTER YEAR // 
const yearEl = document.getElementById('current-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();