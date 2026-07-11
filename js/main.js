/**
 * New Look Beauty Parlour — Main JavaScript
 * Features: Loading screen, sticky nav, mobile menu,
 *           scroll animations, testimonials carousel,
 *           gallery filter, booking form (API), floating buttons
 */

(function () {
  'use strict';

  /* ============================================================
     0. LOADING SCREEN
     ============================================================ */
  function initLoadingScreen() {
    // Inject loading screen HTML
    const loader = document.createElement('div');
    loader.id = 'loadingScreen';
    loader.innerHTML = `
      <div class="loader-brand">✦ New Look ✦</div>
      <div class="loader-bar"><div class="loader-bar-fill"></div></div>
    `;
    document.body.prepend(loader);

    window.addEventListener('load', function () {
      setTimeout(function () {
        loader.classList.add('fade-out');
        setTimeout(function () {
          loader.remove();
        }, 500);
      }, 1000);
    });
  }

  /* ============================================================
     1. SCROLL-TO-TOP BUTTON
     ============================================================ */
  function initScrollToTop() {
    const btn = document.createElement('button');
    btn.id = 'scrollToTop';
    btn.setAttribute('aria-label', 'Scroll to top');
    btn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(btn);

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });
  }

  /* ============================================================
     2. STICKY NAVBAR — scrolled state
     ============================================================ */
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    function onScroll() {
      if (window.pageYOffset > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run on load

    // Highlight active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    function updateActiveLink() {
      const scrollPos = window.pageYOffset + 100;
      sections.forEach(function (section) {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            }
          });
        }
      });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });
  }

  /* ============================================================
     3. MOBILE MENU TOGGLE
     ============================================================ */
  function initMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('mobileMenu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', function () {
      const isOpen = menu.classList.contains('open');
      menu.classList.toggle('open', !isOpen);
      toggle.classList.toggle('open', !isOpen);
      toggle.setAttribute('aria-expanded', String(!isOpen));
    });

    // Close menu on link click
    menu.querySelectorAll('.mobile-link').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navbar.contains(e.target)) {
        menu.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ============================================================
     4. SCROLL ANIMATIONS (Intersection Observer)
     ============================================================ */
  function initScrollAnimations() {
    const elements = document.querySelectorAll('[data-animate]');
    if (!elements.length) return;

    // Respect reduced motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      elements.forEach(function (el) { el.classList.add('animated'); });
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.delay) || 0;
          setTimeout(function () {
            entry.target.classList.add('animated');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ============================================================
     5. TESTIMONIALS CAROUSEL (auto + manual)
     ============================================================ */
  function initTestimonialsCarousel() {
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    if (!cards.length) return;

    let current = 0;
    let autoTimer = null;

    function showCard(index) {
      cards.forEach(function (card, i) {
        card.classList.toggle('active', i === index);
      });
      dots.forEach(function (dot, i) {
        dot.classList.toggle('active', i === index);
      });
      current = index;
    }

    function nextCard() {
      showCard((current + 1) % cards.length);
    }

    function startAuto() {
      autoTimer = setInterval(nextCard, 4500);
    }

    function stopAuto() {
      clearInterval(autoTimer);
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        stopAuto();
        showCard(i);
        startAuto();
      });
    });

    // Touch/swipe support
    const carousel = document.getElementById('testimonialsCarousel');
    if (carousel) {
      let touchStartX = 0;
      carousel.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].clientX;
      }, { passive: true });
      carousel.addEventListener('touchend', function (e) {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
          stopAuto();
          if (diff > 0) {
            showCard((current + 1) % cards.length);
          } else {
            showCard((current - 1 + cards.length) % cards.length);
          }
          startAuto();
        }
      }, { passive: true });
    }

    startAuto();
  }

  /* ============================================================
     6. GALLERY FILTER
     ============================================================ */
  function initGalleryFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (!filterBtns.length) return;

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const filter = btn.dataset.filter;

        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        galleryItems.forEach(function (item) {
          if (filter === 'all' || item.dataset.category === filter) {
            item.classList.remove('hidden');
            item.style.animation = 'fadeIn 0.4s ease forwards';
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });
  }

  /* ============================================================
     7. BOOKING FORM — Save to API + WhatsApp redirect
     ============================================================ */
  function initBookingForm() {
    const form = document.getElementById('bookingForm');
    const successMsg = document.getElementById('formSuccess');
    const submitBtn = document.getElementById('bookingSubmitBtn');
    if (!form) return;

    // Set minimum date to today
    const dateInput = document.getElementById('preferredDate');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
    }

    function validateForm() {
      let valid = true;
      const required = form.querySelectorAll('[required]');
      required.forEach(function (field) {
        field.classList.remove('error');
        if (!field.value.trim()) {
          field.classList.add('error');
          valid = false;
        }
      });

      // Phone validation (basic)
      const phone = document.getElementById('clientPhone');
      if (phone && phone.value.trim()) {
        const cleaned = phone.value.replace(/\D/g, '');
        if (cleaned.length < 10) {
          phone.classList.add('error');
          valid = false;
        }
      }

      return valid;
    }

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      if (!validateForm()) {
        // Shake form
        form.style.animation = 'none';
        void form.offsetWidth;
        form.style.animation = 'shake 0.4s ease';
        return;
      }

      // Disable button
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Booking...';

      const name = document.getElementById('clientName').value.trim();
      const phone = document.getElementById('clientPhone').value.trim();
      const service = document.getElementById('serviceType').value;
      const date = document.getElementById('preferredDate').value;
      const message = document.getElementById('clientMessage').value.trim();

      const bookingData = {
        name: name,
        phone: phone,
        service: service,
        preferred_date: date,
        message: message || 'No additional message',
        status: 'pending',
        created_at_label: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      };

      try {
        const response = await fetch('tables/appointments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bookingData)
        });

        if (response.ok || response.status === 201) {
          // Show success
          form.style.display = 'none';
          successMsg.style.display = 'block';

          // Send WhatsApp confirmation
          const waMessage = encodeURIComponent(
            `Hello! I would like to book an appointment at New Look Beauty Parlour.\n\n` +
            `📛 Name: ${name}\n` +
            `📞 Phone: ${phone}\n` +
            `💅 Service: ${service}\n` +
            `📅 Preferred Date: ${date}\n` +
            `💬 Message: ${message || 'No message'}\n\n` +
            `Please confirm my appointment. Thank you! 🙏`
          );

          setTimeout(function () {
            window.open(
              `https://wa.me/918409403370?text=${waMessage}`,
              '_blank',
              'noopener,noreferrer'
            );
          }, 1200);

        } else {
          throw new Error('Server error');
        }

      } catch (err) {
        console.error('Booking error:', err);
        // Still show success and WhatsApp (graceful degradation)
        form.style.display = 'none';
        successMsg.style.display = 'block';

        const waMessage = encodeURIComponent(
          `Hello! I want to book an appointment at New Look Beauty Parlour.\n\n` +
          `📛 Name: ${name}\n` +
          `📞 Phone: ${phone}\n` +
          `💅 Service: ${service}\n` +
          `📅 Preferred Date: ${date}\n\n` +
          `Please confirm. Thank you! 🙏`
        );

        setTimeout(function () {
          window.open(
            `https://wa.me/918409403370?text=${waMessage}`,
            '_blank',
            'noopener,noreferrer'
          );
        }, 1200);
      }
    });

    // Clear error on input
    form.querySelectorAll('input, select, textarea').forEach(function (field) {
      field.addEventListener('input', function () {
        field.classList.remove('error');
      });
    });
  }

  /* ============================================================
     8. SMOOTH SCROLL for all anchor links
     ============================================================ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        const targetId = link.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (!target) return;
        e.preventDefault();
        const navHeight = parseInt(getComputedStyle(document.documentElement)
          .getPropertyValue('--nav-height')) || 72;
        const top = target.offsetTop - navHeight;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  }

  /* ============================================================
     9. LAZY LOADING — images
     ============================================================ */
  function initLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) return; // native support

    const images = document.querySelectorAll('img[loading="lazy"]');
    const imgObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
          }
          imgObserver.unobserve(img);
        }
      });
    });

    images.forEach(function (img) {
      imgObserver.observe(img);
    });
  }

  /* ============================================================
     10. HERO PARALLAX (subtle)
     ============================================================ */
  function initHeroParallax() {
    const hero = document.querySelector('.hero-pattern');
    if (!hero) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    window.addEventListener('scroll', function () {
      const scrolled = window.pageYOffset;
      if (scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    }, { passive: true });
  }

  /* ============================================================
     11. NAVBAR CSS active link injection
     ============================================================ */
  function injectNavActiveStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .nav-links a.active {
        background: var(--pink);
        color: var(--dark);
      }
    `;
    document.head.appendChild(style);
  }

  /* ============================================================
     12. SHAKE ANIMATION (form validation)
     ============================================================ */
  function injectShakeAnimation() {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20% { transform: translateX(-8px); }
        40% { transform: translateX(8px); }
        60% { transform: translateX(-4px); }
        80% { transform: translateX(4px); }
      }
    `;
    document.head.appendChild(style);
  }

  /* ============================================================
     13. COUNTER ANIMATION for hero stats
     ============================================================ */
  function initCounterAnimation() {
    const stats = document.querySelectorAll('.stat-number');
    if (!stats.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const targets = [500, 5, 10];
    const suffixes = ['+', '★', '+'];
    let animated = false;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !animated) {
          animated = true;
          stats.forEach(function (stat, i) {
            animateCount(stat, targets[i], suffixes[i]);
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) observer.observe(heroStats);

    function animateCount(el, target, suffix) {
      let start = 0;
      const duration = 1800;
      const step = Math.ceil(target / (duration / 16));
      const timer = setInterval(function () {
        start += step;
        if (start >= target) {
          start = target;
          clearInterval(timer);
        }
        el.textContent = start + suffix;
      }, 16);
    }
  }

  /* ============================================================
     14. FLOATING BUTTONS — pulse animation
     ============================================================ */
  function initFloatingButtonPulse() {
    const style = document.createElement('style');
    style.textContent = `
      .float-whatsapp {
        animation: pulse-wa 3s ease-in-out infinite;
      }
      @keyframes pulse-wa {
        0%, 100% { box-shadow: 0 4px 20px rgba(37,211,102,0.35); }
        50% { box-shadow: 0 4px 32px rgba(37,211,102,0.65), 0 0 0 8px rgba(37,211,102,0.1); }
      }
      .mob-whatsapp {
        animation: pulse-wa-mob 3s ease-in-out infinite;
      }
      @keyframes pulse-wa-mob {
        0%, 100% { box-shadow: inset 0 0 0 0 rgba(37,211,102,0.2); }
        50% { box-shadow: inset 0 0 0 4px rgba(255,255,255,0.15); }
      }
    `;
    document.head.appendChild(style);
  }

  /* ============================================================
     INIT ALL
     ============================================================ */
  function init() {
    initLoadingScreen();
    injectNavActiveStyles();
    injectShakeAnimation();
    initFloatingButtonPulse();

    // DOM ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', onDOMReady);
    } else {
      onDOMReady();
    }
  }

  function onDOMReady() {
    initScrollToTop();
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initTestimonialsCarousel();
    initGalleryFilter();
    initBookingForm();
    initSmoothScroll();
    initLazyLoading();
    initHeroParallax();
    initCounterAnimation();
  }

  init();

})();
