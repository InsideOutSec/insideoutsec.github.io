/* =========================================================
   Global JS – InsideOut Sec
   ========================================================= */

/* 1 ▸ AOS fade-ins */
AOS.init();

/* 2 ▸ Navbar shrink on scroll */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () =>
  navbar.classList.toggle('shrink', window.scrollY > 50)
);

/* 3 ▸ Dark / Light mode toggle --------------------------- */
const root   = document.documentElement;
const toggle = document.getElementById('themeToggle');

/* restore saved preference */
const saved  = localStorage.getItem('iosec-theme');
if (saved === 'light') root.dataset.theme = 'light';

/* emit event so grid.js can recolour on first load */
window.dispatchEvent(new CustomEvent('themechange'));
toggle.addEventListener('click', () => {
  const now = root.dataset.theme === 'light' ? 'dark' : 'light';
  root.dataset.theme = now;
  localStorage.setItem('iosec-theme', now);
  window.dispatchEvent(new CustomEvent('themechange'));
});

/* 4 ▸ Vanilla-Tilt init ---------------------------------- */
function mountTilt() {
  const cards = document.querySelectorAll('.service-box, .card');
  if (window.VanillaTilt && cards.length) {
    VanillaTilt.init(cards, { max: 8, speed: 400, glare: true, 'max-glare': 0.2 });
  }
}
/* run immediately if library is ready; otherwise after load */
if (window.VanillaTilt) mountTilt();
else window.addEventListener('load', mountTilt, { once: true });

/* 5 ▸ Particles background – theme aware -------------------- */
function loadParticles() {
  if (!window.particlesJS) return;

  /* -------- destroy any previous system -------- */
  if (window.pJSDom && window.pJSDom.length) {
    window.pJSDom.forEach(p => p.pJS?.fn?.vendors?.destroypJS?.());
    window.pJSDom = [];
    const holder = document.getElementById('particles-js');
    if (holder) holder.innerHTML = '';
  }

  /* -------- colour palette by theme -------- */
  const light   = root.dataset.theme === 'light';
  const nodeCol = light ? '#7b61ff' : '#7b61ff';
  const lineCol = light ? '#045d75' : '#66fcf1';

  particlesJS('particles-js', {
    particles: {
      number:{ value:55, density:{ enable:true, value_area:900 }},
      color:{ value: nodeCol },           /* node dots */
      shape:{ type:'circle' },
      opacity:{ value:0.6, random:false },
      size:{ value:2.5, random:true },
      line_linked:{
        enable:true,
        distance:120,
        color: lineCol,                   /* connecting lines */
        opacity:0.40, width:1
      },
      move:{ enable:true, speed:1 }
    }
  });
}
/* run once on DOM ready */
document.addEventListener('DOMContentLoaded', loadParticles);

/* re-run on theme toggle */
window.addEventListener('themechange', loadParticles);

function reloadHCaptcha() {
  const wrapper = document.querySelector('.h-captcha');
  if (!wrapper) return;

  const currentTheme = document.documentElement.dataset.theme;
  const newNode = wrapper.cloneNode(true);  // clone container
  newNode.setAttribute('data-theme', currentTheme === 'light' ? 'light' : 'dark');

  wrapper.replaceWith(newNode);  // replace old with new
  if (window.hcaptcha) hcaptcha.render(newNode);
}


/* 6 ▸ Cursor spotlight ----------------------------------- */
function spotlight(e) {
  root.style.setProperty('--x', `${e.clientX}px`);
  root.style.setProperty('--y', `${e.clientY}px`);
}
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.addEventListener('pointermove', spotlight);
}


/* 7 ▸ Lazy WebGL grid  (desktop, pointer=fine) ------------ */
/* ---------- lazy WebGL grid (desktop only) ---------- */
if (matchMedia('(pointer:fine) and (min-width: 992px)').matches) {
  const canvas = document.getElementById('heroGrid');
  if (!canvas) {            // page has no hero canvas → skip
    console.debug('[grid] no canvas on this page – skipping WebGL grid');
  } else {
    import('./grid.js').then(mod => {
      const step = mod.initGrid(canvas);     // may return undefined
      if (typeof step !== 'function') return;

      let id;
      function loop() { step(); id = requestAnimationFrame(loop); }
      loop();

      document.addEventListener('visibilitychange', () =>
        document.hidden ? cancelAnimationFrame(id) : loop()
      );
    });
  }
}

/* 8 ▸ Accessibility – disable motion effects ------------- */
if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener('load', () => {
    /* destroy Vanilla-Tilt if it initialised */
    if (window.VanillaTilt) VanillaTilt?.destroy?.();
    document.body.classList.add('no-motion');
  });
}

// grab all in-page nav links (only the ones that start with "#")
document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();                // stop native jump
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;

    // compute offset = current navbar height
    const navH = document.querySelector('.navbar').offsetHeight;

    // smooth scroll to target top minus navbar
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - navH,
      behavior: 'smooth'
    });

    // update URL hash without jumping
    history.pushState(null, '', `#${id}`);
  });
});

/* 9 ▸ hCaptcha form validation (only if contact form exists) --------- */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    const hCaptcha = form.querySelector('textarea[name="h-captcha-response"]')?.value;
    if (!hCaptcha) {
      e.preventDefault();
      alert("Please complete the CAPTCHA.");
    }
  });
});

/* 10 ▸ Reload hCaptcha on theme change */
function reloadHCaptcha() {
  const container = document.getElementById('captcha-container');
  if (!container || typeof hcaptcha === 'undefined') return;

  const currentTheme = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';

  const newNode = container.cloneNode(false);
  newNode.setAttribute('data-sitekey', 'aafc0478-921a-47dc-bd04-9ad671ea5224');  // 👈 make sure this is set
  newNode.setAttribute('data-theme', currentTheme);
  newNode.id = 'captcha-container';

  container.replaceWith(newNode);
  hcaptcha.render('captcha-container'); // reads from data- attributes
}

document.addEventListener('DOMContentLoaded', reloadHCaptcha);
window.addEventListener('themechange', reloadHCaptcha);

document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (navbarCollapse.classList.contains("show")) {
        // collapse navbar on mobile
        new bootstrap.Collapse(navbarCollapse).hide();
      }
    });
  });
});





