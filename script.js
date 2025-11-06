// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href = anchor.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== Expand/Collapse Service Details =====
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.service-card').forEach(c => {
      if (c !== card) c.classList.remove('active');
    });
    card.classList.toggle('active');
  });
});

// ===== Expand/Collapse Tech Cards (with animation) =====
document.querySelectorAll('.tech-card').forEach(card => {
  card.addEventListener('click', e => {
    // Ripple animation on click
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    ripple.style.left = `${e.offsetX}px`;
    ripple.style.top = `${e.offsetY}px`;
    card.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);

    // Expand / collapse logic
    document.querySelectorAll('.tech-card').forEach(c => {
      if (c !== card) c.classList.remove('active');
    });
    card.classList.toggle('active');
  });
});

// ===== Scroll Animation Observer =====
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('section').forEach(sec => observer.observe(sec));

// ===== Console Branding (Optional) =====
console.log(
  "%c🚀 XReach Website Initialized",
  "color: #00ffc6; font-weight: bold; font-size: 14px;"
);
