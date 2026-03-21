/* ============================================
   PRANAV KRISHNA DANDA — Portfolio JS
   ============================================ */

(function () {
    'use strict';

    // ---------- Typing Effect ----------
    const typingElement = document.getElementById('typingText');
    const phrases = [
        'AI Engineer',
        'Building Autonomous Agents',
        'Full-Stack Developer',
        'Shipping Production ML Systems',
        'Python | TypeScript | AWS'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 400; // Pause before new word
        }

        setTimeout(type, typingSpeed);
    }

    if (typingElement) {
        setTimeout(type, 1000);
    }

    // ---------- Navbar Scroll ----------
    const navbar = document.getElementById('navbar');

    function handleNavScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });

    // ---------- Mobile Menu ----------
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu on link click
        navMenu.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ---------- Active Nav Link ----------
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-link:not(.nav-link--cta):not(.nav-link--resume)');

    function updateActiveNav() {
        var scrollPos = window.scrollY + 200;

        sections.forEach(function (section) {
            var id = section.getAttribute('id');
            var top = section.offsetTop;
            var height = section.offsetHeight;

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

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // ---------- Scroll Reveal ----------
    var revealElements = document.querySelectorAll('.reveal');

    var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(function (el) {
        revealObserver.observe(el);
    });

    // ---------- Stats Counter ----------
    var statNumbers = document.querySelectorAll('.stat-number[data-target]');

    function formatNumber(num) {
        if (num >= 1000) {
            return num.toLocaleString();
        }
        return num.toString();
    }

    function animateCounter(el) {
        var target = parseInt(el.getAttribute('data-target'), 10);
        var duration = 2000;
        var startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);

            // Ease out cubic
            var eased = 1 - Math.pow(1 - progress, 3);
            var current = Math.floor(eased * target);

            el.textContent = formatNumber(current);

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = formatNumber(target);
            }
        }

        requestAnimationFrame(step);
    }

    var statsObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    statNumbers.forEach(function (el) {
        statsObserver.observe(el);
    });

    // ---------- Back to Top ----------
    var backToTop = document.getElementById('backToTop');

    function handleBackToTop() {
        if (window.scrollY > 600) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', handleBackToTop, { passive: true });

    if (backToTop) {
        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ---------- Smooth Scroll for Anchor Links ----------
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                var offset = navbar.offsetHeight + 20;
                var top = targetEl.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });

})();
