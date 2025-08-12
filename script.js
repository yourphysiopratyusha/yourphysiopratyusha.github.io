document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu elements
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuClose = document.getElementById('mobile-menu-close');

    // Toggle mobile menu
    function toggleMobileMenu(show) {
        if (show) {
            mobileMenu.classList.remove('translate-x-full');
            mobileMenuOverlay.classList.remove('hidden');
            document.body.classList.add('overflow-hidden');
        } else {
            mobileMenu.classList.add('translate-x-full');
            mobileMenuOverlay.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
    }

    // Event listeners for mobile menu
    mobileMenuButton.addEventListener('click', () => toggleMobileMenu(true));
    mobileMenuClose.addEventListener('click', () => toggleMobileMenu(false));
    mobileMenuOverlay.addEventListener('click', () => toggleMobileMenu(false));

    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => toggleMobileMenu(false));
    });

    // Enhanced smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to navigation links based on scroll position
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link, #mobile-menu a[href^="#"]');

    // Parallax effect for hero section
    const heroSection = document.querySelector('/');
    const heroImage = heroSection.querySelector('img');
    const heroContent = heroSection.querySelector('div:first-child');

    // Intersection Observer for parallax and animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);

    // Observe all sections for fade-in animation
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('opacity-0', 'transition-opacity', 'duration-1000');
        observer.observe(section);
    });

    // Parallax scroll effect
    window.addEventListener('scroll', () => {
        // Update active navigation
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('text-primary');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('text-primary');
            }
        });

        // Parallax effect for hero section
        if (heroImage && heroContent) {
            const scrolled = window.pageYOffset;
            heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
            heroContent.style.transform = `translateY(${scrolled * 0.05}px)`;
        }
    });
}); 