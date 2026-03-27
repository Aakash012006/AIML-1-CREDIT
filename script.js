/* ═══════════════════════════════════════════════════════════════
   AAKASH S — PORTFOLIO SCRIPT
   Navbar · Typewriter · Scroll Reveal · Skill Bars · Form Validation
   ═══════════════════════════════════════════════════════════════ */

'use strict';

// ── DOM READY ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHamburger();
  initScrollProgress();
  initTypewriter();
  initRevealAnimations();
  initSkillBars();
  initSmoothScroll();
  initActiveNavLinks();
  initContactForm();
  initCustomCursor();
  initFooterYear();
});

// ── NAVBAR SCROLL EFFECT ─────────────────────────────────────────
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load
}

// ── HAMBURGER MENU ───────────────────────────────────────────────
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close when a link is clicked
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

// ── SCROLL PROGRESS BAR ──────────────────────────────────────────
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  const onScroll = () => {
    const scrollTop  = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width  = pct + '%';
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

// ── TYPEWRITER EFFECT ────────────────────────────────────────────
function initTypewriter() {
  const el = document.getElementById('typewriterText');
  if (!el) return;

  const words   = ['AI-Powered Systems', 'Full Stack Products', 'Supply Chain AI', 'Real-World Solutions'];
  const speed   = 75;  // ms per character
  const pause   = 2000; // ms between words
  const delPause = 40;  // ms per delete

  let wordIndex = 0;
  let charIndex = 0;
  let deleting  = false;

  function tick() {
    const word = words[wordIndex];

    if (!deleting) {
      el.textContent = word.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === word.length) {
        deleting = true;
        setTimeout(tick, pause);
        return;
      }
      setTimeout(tick, speed);
    } else {
      el.textContent = word.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting  = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
      setTimeout(tick, delPause);
    }
  }

  setTimeout(tick, 800);
}

// ── SCROLL REVEAL ANIMATIONS ─────────────────────────────────────
function initRevealAnimations() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  // Stagger reveal for grouped siblings
  const applyStagger = (entries) => {
    // Group by parent
    const groups = new Map();
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const parent = entry.target.parentElement;
      if (!groups.has(parent)) groups.set(parent, []);
      groups.get(parent).push(entry.target);
    });

    groups.forEach(siblings => {
      siblings.forEach((el, i) => {
        setTimeout(() => {
          el.classList.add('visible');
        }, i * 100);
      });
    });
  };

  const observer = new IntersectionObserver(
    (entries) => applyStagger(entries),
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

// ── SKILL BAR ANIMATIONS ─────────────────────────────────────────
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const bar   = entry.target;
        const width = bar.getAttribute('data-width') || '0';
        bar.style.width = width + '%';
        observer.unobserve(bar);
      });
    },
    { threshold: 0.5 }
  );

  bars.forEach(bar => observer.observe(bar));
}

// ── SMOOTH SCROLL ────────────────────────────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();

      const navHeight = document.getElementById('navbar')?.offsetHeight || 70;
      const top       = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

// ── ACTIVE NAV LINK HIGHLIGHT ────────────────────────────────────
function initActiveNavLinks() {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const onScroll = () => {
    let current = '';
    const offset = window.innerHeight * 0.4;

    sections.forEach(section => {
      const top = section.getBoundingClientRect().top;
      if (top < offset) current = section.id;
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href')?.replace('#', '');
      link.classList.toggle('active', href === current);
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ── CONTACT FORM VALIDATION ──────────────────────────────────────
function initContactForm() {
  const form        = document.getElementById('contactForm');
  if (!form) return;

  const nameInput   = document.getElementById('formName');
  const emailInput  = document.getElementById('formEmail');
  const msgInput    = document.getElementById('formMessage');
  const nameError   = document.getElementById('nameError');
  const emailError  = document.getElementById('emailError');
  const msgError    = document.getElementById('messageError');
  const successBox  = document.getElementById('formSuccess');
  const submitBtn   = document.getElementById('submitBtn');

  // Live validation helpers
  const clearError = (input, errorEl) => {
    input.classList.remove('error');
    errorEl.textContent = '';
  };

  const setError = (input, errorEl, msg) => {
    input.classList.add('error');
    errorEl.textContent = msg;
  };

  const isValidEmail = email =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  // Validate on blur
  nameInput.addEventListener('blur',  () => {
    if (nameInput.value.trim().length < 2) {
      setError(nameInput, nameError, 'Please enter your name.');
    } else {
      clearError(nameInput, nameError);
    }
  });

  emailInput.addEventListener('blur', () => {
    if (!isValidEmail(emailInput.value)) {
      setError(emailInput, emailError, 'Please enter a valid email address.');
    } else {
      clearError(emailInput, emailError);
    }
  });

  msgInput.addEventListener('blur',   () => {
    if (msgInput.value.trim().length < 10) {
      setError(msgInput, msgError, 'Message must be at least 10 characters.');
    } else {
      clearError(msgInput, msgError);
    }
  });

  // Clear error on input
  [nameInput, emailInput, msgInput].forEach(input => {
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        input.classList.remove('error');
      }
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();

    let valid = true;

    if (nameInput.value.trim().length < 2) {
      setError(nameInput, nameError, 'Please enter your name.');
      valid = false;
    } else {
      clearError(nameInput, nameError);
    }

    if (!isValidEmail(emailInput.value)) {
      setError(emailInput, emailError, 'Please enter a valid email address.');
      valid = false;
    } else {
      clearError(emailInput, emailError);
    }

    if (msgInput.value.trim().length < 10) {
      setError(msgInput, msgError, 'Message must be at least 10 characters.');
      valid = false;
    } else {
      clearError(msgInput, msgError);
    }

    if (!valid) return;

    // Simulate send
    submitBtn.disabled  = true;
    submitBtn.textContent = 'Sending…';

    setTimeout(() => {
      form.reset();
      submitBtn.disabled  = false;
      submitBtn.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="22" y1="2" x2="11" y2="13"/>
          <polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>
        Send Message
      `;
      successBox.classList.add('show');
      setTimeout(() => successBox.classList.remove('show'), 4000);
    }, 1200);
  });
}

// ── CUSTOM CURSOR ────────────────────────────────────────────────
function initCustomCursor() {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  // Only on pointer devices
  if (window.matchMedia('(hover: none)').matches) return;

  let mx = -100, my = -100;
  let rx = -100, ry = -100;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  // Ring follows with lerp
  const lerp = (a, b, t) => a + (b - a) * t;

  const animateRing = () => {
    rx = lerp(rx, mx, 0.12);
    ry = lerp(ry, my, 0.12);
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  };

  requestAnimationFrame(animateRing);

  // Expand on interactive elements
  const interactables = 'a, button, .btn, .project-card, .stat-card, .contact-link';

  document.querySelectorAll(interactables).forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('expanded'));
    el.addEventListener('mouseleave', () => ring.classList.remove('expanded'));
  });
}

// ── FOOTER YEAR ──────────────────────────────────────────────────
function initFooterYear() {
  const el = document.getElementById('footerYear');
  if (el) el.textContent = new Date().getFullYear();
}
