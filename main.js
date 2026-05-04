document.addEventListener('DOMContentLoaded', () => {
  
  // Custom Cursor Logic
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');

  window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Add a slight delay for the outline for a smooth follow effect
    cursorOutline.animate({
      left: `${posX}px`,
      top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
  });

  // Add hover effect to links and buttons for custom cursor
  const interactables = document.querySelectorAll('a, .btn, .hamburger');
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursorOutline.style.borderColor = 'var(--accent)';
    });
    el.addEventListener('mouseleave', () => {
      cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorOutline.style.borderColor = 'var(--accent-light)';
    });
  });

  // Scroll Reveal Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        entry.target.classList.remove('hidden');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  const hiddenElements = document.querySelectorAll('.hidden');
  hiddenElements.forEach(el => observer.observe(el));

  // Hamburger Menu (Mobile)
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  // We could implement a full mobile menu here, for now it just toggles a class
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active'); // Needs CSS if fully expanding menu is desired
    hamburger.classList.toggle('toggle');
  });

  // Smooth scroll for nav links (if any additional offset is needed)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for fixed navbar
          behavior: 'smooth'
        });
      }
    });
  });
});
