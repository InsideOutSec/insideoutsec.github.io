
/* =========================================================
   Global JS – InsideOut Sec (Optimized)
   ========================================================= */


(function() {
  const userLang = navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language;
  if (userLang && userLang.toLowerCase().startsWith('it')) {
    const path = window.location.pathname;
    if (path === '/' || path === '/index.html') {
      window.location.replace('/it/');
    }
  }
})();

function reloadHCaptcha() {
  const container = document.getElementById('captcha-container');
  if (!container || typeof hcaptcha === 'undefined') return;
  const root = document.documentElement;
  const currentTheme = root.dataset.theme === 'light' ? 'light' : 'dark';
  const newNode = container.cloneNode(false);
  newNode.setAttribute('data-sitekey', 'aafc0478-921a-47dc-bd04-9ad671ea5224');
  newNode.setAttribute('data-theme', currentTheme);
  newNode.id = 'captcha-container';
  container.replaceWith(newNode);
  hcaptcha.render('captcha-container');
}

function initHCaptcha() { reloadHCaptcha(); }

   document.addEventListener("DOMContentLoaded", function () {
    /* Theme elements */
    const root   = document.documentElement;
    const toggle = document.getElementById("themeToggle");
  
    /* Restore and apply saved theme */
    const saved = localStorage.getItem('iosec-theme');
    if (saved === 'light') root.dataset.theme = 'light';
    window.dispatchEvent(new CustomEvent('themechange'));
  
    /* Theme toggle handler */
    toggle?.addEventListener('click', () => {
      const now = root.dataset.theme === 'light' ? 'dark' : 'light';
      root.dataset.theme = now;
      localStorage.setItem('iosec-theme', now);
      window.dispatchEvent(new CustomEvent('themechange'));
    });
  
    /* AOS Init */
    if (window.AOS) AOS.init();
  
    /* Vanilla Tilt */
    const cards = document.querySelectorAll('.service-box, .card');
    if (window.VanillaTilt && cards.length) {
      VanillaTilt.init(cards, { max: 8, speed: 400, glare: true, 'max-glare': 0.2 });
    }
  
    /* Navbar shrink effect */
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () =>
      navbar.classList.toggle('shrink', window.scrollY > 50)
    );
  
    /* Cursor spotlight */
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.addEventListener('pointermove', e => {
        root.style.setProperty('--x', `${e.clientX}px`);
        root.style.setProperty('--y', `${e.clientY}px`);
      });
    }
  
    /* Smooth scroll for in-page anchors with offset */
    document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const id = link.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (!target) return;
        const navH = navbar.offsetHeight;
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - navH,
          behavior: 'smooth'
        });
        history.pushState(null, '', `#${id}`);
      });
    });
  
    /* Auto-collapse nav on link click (mobile) */
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
    const navbarCollapse = document.querySelector(".navbar-collapse");
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        if (navbarCollapse.classList.contains("show")) {
          new bootstrap.Collapse(navbarCollapse).hide();
        }
      });
    });
  
    /* Reload hCaptcha on theme change + form check */
    window.addEventListener('themechange', reloadHCaptcha);
  
    const form = document.getElementById('contact-form');
    form?.addEventListener('submit', function (e) {
      const hCaptcha = form.querySelector('textarea[name="h-captcha-response"]')?.value;
      if (!hCaptcha) {
        e.preventDefault();
        alert("Please complete the CAPTCHA.");
      }
    });
  
    /* Particle background – theme aware */
    function loadParticles() {
      if (!window.particlesJS) return;
  
      if (window.pJSDom?.length) {
        window.pJSDom.forEach(p => p.pJS?.fn?.vendors?.destroypJS?.());
        window.pJSDom = [];
        document.getElementById('particles-js')?.replaceChildren();
      }
  
      const light   = root.dataset.theme === 'light';
      const nodeCol = '#7b61ff';
      const lineCol = light ? '#045d75' : '#66fcf1';
  
      particlesJS('particles-js', {
        particles: {
          number: { value: 55, density: { enable: true, value_area: 900 }},
          color: { value: nodeCol },
          shape: { type: 'circle' },
          opacity: { value: 0.6 },
          size: { value: 2.5, random: true },
          line_linked: {
            enable: true,
            distance: 120,
            color: lineCol,
            opacity: 0.40,
            width: 1
          },
          move: { enable: true, speed: 1 }
        }
      });
    }
  
    loadParticles();
    window.addEventListener('themechange', loadParticles);
  
    /* Lazy-load WebGL grid if present and pointer device is fine */
    if (matchMedia('(pointer:fine) and (min-width: 992px)').matches) {
      const canvas = document.getElementById('heroGrid');
      if (canvas) {
        import('./grid.js').then(mod => {
          const step = mod.initGrid(canvas);
          if (typeof step !== 'function') return;
  
          let id;
          function loop() { step(); id = requestAnimationFrame(loop); }
          loop();
  
          document.addEventListener('visibilitychange', () =>
            document.hidden ? cancelAnimationFrame(id) : loop()
          );
        });
      } else {
        console.debug('[grid] no canvas on this page – skipping WebGL grid');
      }
    }
  
    /* Disable motion if user prefers reduced motion */
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (window.VanillaTilt) window.VanillaTilt?.destroy?.();
      document.body.classList.add('no-motion');
    }

    // Scroll to top button
    const scrollBtn = document.getElementById("scrollTopBtn");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 150) {
        scrollBtn.removeAttribute("hidden");
      } else {
        scrollBtn.setAttribute("hidden", true);
      }
    });
    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Show brand label only after passing hero logo
    const heroTrigger = document.getElementById('hero-logo-marker');
    const brandLabel = document.getElementById('navbarBrandLabel');

    if (heroTrigger && brandLabel) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) {
            brandLabel.classList.remove('d-none'); // unhide
            brandLabel.classList.add('visible');
          } else {
            brandLabel.classList.remove('visible');
          }
        },
        { threshold: 0, rootMargin: "-80px 0px 0px 0px" }
      );
      observer.observe(heroTrigger);
    }
  });
  