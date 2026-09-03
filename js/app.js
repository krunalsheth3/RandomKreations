/* ===== Random Kreations - Main JavaScript ===== */

(function() {
  'use strict';

  // ===== DOM Elements =====
  const header = document.querySelector('.header');
  const hamburger = document.querySelector('.nav__hamburger');
  const navMenu = document.querySelector('.nav__menu');
  const navLinks = document.querySelectorAll('.nav__link');
  const faqItems = document.querySelectorAll('.faq-item');

  // ===== Sticky Header =====
  function handleScroll() {
    if (!header) return;
    if (window.scrollY > 50) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Run on load

  // ===== Mobile Menu Toggle =====
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close menu on click outside
    document.addEventListener('click', function(e) {
      if (navMenu.classList.contains('active') &&
          !navMenu.contains(e.target) &&
          !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ===== Smooth Scroll =====
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var headerHeight = header ? header.offsetHeight : 0;
        var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== Intersection Observer - Fade In Animations =====
  var observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  var fadeObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(function(el) {
    fadeObserver.observe(el);
  });

  // ===== Counter Animation =====
  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 2000;
    var start = 0;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
      var current = Math.floor(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  var counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(function(el) {
    counterObserver.observe(el);
  });

  // ===== FAQ Accordion =====
  faqItems.forEach(function(item) {
    var question = item.querySelector('.faq-item__question');
    if (question) {
      question.addEventListener('click', function() {
        var isActive = item.classList.contains('active');

        // Close all items
        faqItems.forEach(function(faq) {
          faq.classList.remove('active');
        });

        // Open clicked item if it was closed
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // ===== Gallery Lightbox =====
  var lightbox = document.querySelector('.lightbox');
  var lightboxImg = document.querySelector('.lightbox__img');
  var lightboxClose = document.querySelector('.lightbox__close');
  var lightboxPrev = document.querySelector('.lightbox__nav--prev');
  var lightboxNext = document.querySelector('.lightbox__nav--next');
  var galleryItems = [];
  var currentIndex = 0;

  function openLightbox(index) {
    if (!lightbox || !lightboxImg) return;
    currentIndex = index;
    lightboxImg.src = galleryItems[currentIndex].src;
    lightboxImg.alt = galleryItems[currentIndex].alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    lightboxImg.src = galleryItems[currentIndex].src;
    lightboxImg.alt = galleryItems[currentIndex].alt;
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    lightboxImg.src = galleryItems[currentIndex].src;
    lightboxImg.alt = galleryItems[currentIndex].alt;
  }

  function initLightbox() {
    var items = document.querySelectorAll('.gallery-item');
    galleryItems = [];

    items.forEach(function(item, index) {
      if (item.offsetParent !== null || !item.classList.contains('hidden')) {
        var img = item.querySelector('img');
        if (img) {
          galleryItems.push({ src: img.src, alt: img.alt || '' });
        }

        item.addEventListener('click', function() {
          // Recalculate visible items for lightbox
          var visibleItems = [];
          var clickedVisibleIndex = 0;
          document.querySelectorAll('.gallery-item').forEach(function(gi) {
            if (!gi.classList.contains('hidden')) {
              var gImg = gi.querySelector('img');
              if (gImg) {
                if (gi === item) clickedVisibleIndex = visibleItems.length;
                visibleItems.push({ src: gImg.src, alt: gImg.alt || '' });
              }
            }
          });
          galleryItems = visibleItems;
          openLightbox(clickedVisibleIndex);
        });
      }
    });
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }
  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', prevImage);
  }
  if (lightboxNext) {
    lightboxNext.addEventListener('click', nextImage);
  }
  if (lightbox) {
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // Keyboard navigation for lightbox
  document.addEventListener('keydown', function(e) {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });

  initLightbox();

  // ===== Gallery Filter (Gallery Page) =====
  var filterBtns = document.querySelectorAll('.gallery-filter-btn');
  if (filterBtns.length > 0) {
    filterBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var filter = this.getAttribute('data-filter');

        // Update active button
        filterBtns.forEach(function(b) { b.classList.remove('active'); });
        this.classList.add('active');

        // Filter items
        document.querySelectorAll('.gallery-full-grid .gallery-item').forEach(function(item) {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.classList.remove('hidden');
          } else {
            item.classList.add('hidden');
          }
        });

        // Reinitialize lightbox with visible items
        initLightbox();
      });
    });
  }

  // ===== Mobile overlay close =====
  var overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:999;display:none;';
  document.body.appendChild(overlay);

  if (hamburger) {
    var origClick = hamburger.onclick;
    hamburger.addEventListener('click', function() {
      overlay.style.display = navMenu.classList.contains('active') ? 'block' : 'none';
    });
  }

  overlay.addEventListener('click', function() {
    if (hamburger && navMenu) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
    overlay.style.display = 'none';
  });

})();
