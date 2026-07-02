// ═══════════════════ Initialize Lucide Icons ═══════════════════
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    // ═══════════════════ Navbar Scroll Effect ═══════════════════
    const navbar = document.getElementById('navbar');
    const handleScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ═══════════════════ Mobile Nav Toggle ═══════════════════
    const navToggle = document.getElementById('nav-toggle');
    const navMobileLinks = document.getElementById('nav-mobile-links');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMobileLinks.classList.toggle('open');
    });

    // Close mobile nav on link click
    navMobileLinks.querySelectorAll('.nav-mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMobileLinks.classList.remove('open');
        });
    });

    // ═══════════════════ Scroll Animations (Intersection Observer) ═══════════════════
    const observerOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animations for feature cards
                const parent = entry.target.closest('.features-grid');
                if (parent) {
                    const cards = Array.from(parent.querySelectorAll('.animate-on-scroll'));
                    const cardIndex = cards.indexOf(entry.target);
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, cardIndex * 100);
                } else {
                    entry.target.classList.add('visible');
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // ═══════════════════ Smooth scroll for anchor links ═══════════════════
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ═══════════════════ Parallax on Hero Orbs ═══════════════════
    const heroOrbs = document.querySelectorAll('.hero-orb');
    let ticking = false;

    window.addEventListener('mousemove', (e) => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const x = (e.clientX / window.innerWidth - 0.5) * 2;
                const y = (e.clientY / window.innerHeight - 0.5) * 2;
                heroOrbs.forEach((orb, i) => {
                    const factor = (i + 1) * 12;
                    orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
                });
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
});
