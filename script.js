document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const hamburger = document.querySelector('.md\\:hidden button');
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'fixed inset-0 bg-white z-40 transform translate-x-full transition-transform duration-300 ease-in-out';
    mobileMenu.innerHTML = `
        <div class="flex justify-end p-6">
            <button class="text-text focus:outline-none">
                <i class="fas fa-times text-2xl"></i>
            </button>
        </div>
        <div class="flex flex-col items-center space-y-8 p-6">
            <a href="#home" class="text-2xl hover:text-primary transition-colors">Home</a>
            <a href="#services" class="text-2xl hover:text-primary transition-colors">Services</a>
            <a href="#about" class="text-2xl hover:text-primary transition-colors">About</a>
            <a href="#contact" class="text-2xl hover:text-primary transition-colors">Contact</a>
            <a href="#book" class="bg-primary text-white px-6 py-2 rounded-full text-xl hover:bg-opacity-90 transition-all">Book Appointment</a>
        </div>
    `;
    document.body.appendChild(mobileMenu);

    hamburger.addEventListener('click', () => {
        mobileMenu.classList.remove('translate-x-full');
    });

    const closeButton = mobileMenu.querySelector('button');
    closeButton.addEventListener('click', () => {
        mobileMenu.classList.add('translate-x-full');
    });

    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add active class to navigation links based on scroll position
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.md\\:flex a, .fixed a');

    window.addEventListener('scroll', () => {
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
    });
}); 