document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Barra de progreso de scroll ---------- */
  const scrollProgress = document.getElementById('scrollProgress');
  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = pct + '%';
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* ---------- Menú móvil ---------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Barra de crisis (cerrar) ---------- */
  const crisisBar = document.getElementById('crisisBar');
  const crisisClose = document.getElementById('crisisClose');
  crisisClose.addEventListener('click', () => {
    crisisBar.classList.add('is-hidden');
  });

  /* ---------- Resaltar sección activa al hacer scroll ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.main-nav a[data-nav]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('is-active', link.getAttribute('data-nav') === id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach(section => sectionObserver.observe(section));

  /* ---------- Acordeones (reutilizable) ---------- */
  document.querySelectorAll('.accordion').forEach(accordion => {
    const triggers = accordion.querySelectorAll('.accordion-trigger');

    triggers.forEach(trigger => {
      const panel = trigger.nextElementSibling;

      trigger.addEventListener('click', () => {
        const isOpen = trigger.classList.contains('is-open');

        triggers.forEach(otherTrigger => {
          otherTrigger.classList.remove('is-open');
          otherTrigger.nextElementSibling.style.maxHeight = null;
        });

        if (!isOpen) {
          trigger.classList.add('is-open');
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      });
    });
  });

  /* ---------- Pestañas (tabs) ---------- */
  document.querySelectorAll('.tab-group').forEach(group => {
    const buttons = group.querySelectorAll('.tab-btn');
    const panels = group.querySelectorAll('.tab-panel');

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const target = button.getAttribute('data-tab');
        buttons.forEach(b => b.classList.toggle('is-active', b === button));
        panels.forEach(p => p.classList.toggle('is-active', p.getAttribute('data-panel') === target));
      });
    });
  });

  /* ---------- Tarjetas mito/realidad (flip) ---------- */
  document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('is-flipped');
    });
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('is-flipped');
      }
    });
  });

  /* ---------- Stepper "Cuatro pasos" ---------- */
  document.querySelectorAll('.stepper').forEach(stepper => {
    const dots = stepper.querySelectorAll('.stepper-dot');
    const panels = stepper.querySelectorAll('.stepper-panel');
    const fill = stepper.querySelector('.stepper-line span');
    const total = dots.length;

    const goToStep = (stepNum) => {
      dots.forEach(dot => {
        dot.classList.toggle('is-active', dot.getAttribute('data-step') === String(stepNum));
      });
      panels.forEach(panel => {
        panel.classList.toggle('is-active', panel.getAttribute('data-panel') === String(stepNum));
      });
      if (fill) {
        fill.style.width = (stepNum / total) * 100 + '%';
      }
    };

    dots.forEach(dot => {
      dot.addEventListener('click', () => goToStep(dot.getAttribute('data-step')));
    });

    goToStep(1);
  });

  /* ---------- Gráficos de barras animados al entrar en pantalla ---------- */
  const barCharts = document.querySelectorAll('.bar-chart');
  const chartObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.bar-fill').forEach(bar => {
          const value = bar.getAttribute('data-value');
          bar.style.width = value + '%';
        });
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.35 });

  barCharts.forEach(chart => chartObserver.observe(chart));

  /* ---------- Carrusel ---------- */
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const dotsWrap = document.getElementById('carouselDots');

  if (track) {
    const slides = Array.from(track.children);

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', 'Ir a la diapositiva ' + (i + 1));
      if (i === 0) dot.classList.add('is-active');
      dot.addEventListener('click', () => scrollToSlide(i));
      dotsWrap.appendChild(dot);
    });

    const dots = Array.from(dotsWrap.children);

    function scrollToSlide(index) {
      const slide = slides[index];
      track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: 'smooth' });
    }

    function currentIndex() {
      const trackCenter = track.scrollLeft + track.clientWidth / 2;
      let closest = 0;
      let closestDist = Infinity;
      slides.forEach((slide, i) => {
        const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
        const dist = Math.abs(slideCenter - trackCenter);
        if (dist < closestDist) { closestDist = dist; closest = i; }
      });
      return closest;
    }

    function updateDots() {
      const idx = currentIndex();
      dots.forEach((d, i) => d.classList.toggle('is-active', i === idx));
    }

    prevBtn.addEventListener('click', () => scrollToSlide(Math.max(0, currentIndex() - 1)));
    nextBtn.addEventListener('click', () => scrollToSlide(Math.min(slides.length - 1, currentIndex() + 1)));

    track.addEventListener('scroll', () => {
      window.clearTimeout(track._scrollTimeout);
      track._scrollTimeout = window.setTimeout(updateDots, 80);
    }, { passive: true });

    /* Autoplay suave, se detiene si el usuario interactúa */
    let autoplay = window.setInterval(() => {
      const next = (currentIndex() + 1) % slides.length;
      scrollToSlide(next);
    }, 4500);

    const stopAutoplay = () => window.clearInterval(autoplay);
    track.addEventListener('pointerdown', stopAutoplay);
    prevBtn.addEventListener('click', stopAutoplay);
    nextBtn.addEventListener('click', stopAutoplay);
  }

  /* ---------- Volver arriba ---------- */
  const backToTop = document.getElementById('backToTop');
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

});
