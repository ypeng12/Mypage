document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // 2. Dark/Light Theme Controller
    const themeToggle = document.querySelector('.theme-toggle');
    const icon = themeToggle ? themeToggle.querySelector('i') : null;
    
    if (themeToggle && icon) {
        // Default to light mode if no saved preference exists
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        if (savedTheme === 'light') {
            icon.className = 'fas fa-moon';
        } else {
            icon.className = 'fas fa-sun';
        }

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            let newTheme = 'dark';
            
            if (currentTheme === 'dark') {
                newTheme = 'light';
                icon.className = 'fas fa-moon';
            } else {
                newTheme = 'dark';
                icon.className = 'fas fa-sun';
            }
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // 3. Smooth Scrolling with Fixed Header Offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 76; // Nav height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 4. collapsible Abstract Accordion for Research Paper
    const abstractToggle = document.querySelector('.abstract-toggle-btn');
    if (abstractToggle) {
        abstractToggle.addEventListener('click', () => {
            const isExpanded = abstractToggle.getAttribute('aria-expanded') === 'true';
            abstractToggle.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // 5. Scrollspy for Active Navbar State
    const sections = document.querySelectorAll('section[id]');
    const navLinksList = document.querySelectorAll('.nav-link');
    
    function scrollSpy() {
        let currentSection = 'about'; // Default fallback
        const scrollPos = window.scrollY + 100; // Account for header offset
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinksList.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentSection}` || (currentSection === 'about' && href === '#')) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', scrollSpy);
    scrollSpy(); // Initial call

    // 6. Intersection Observer for Smooth Section Entry Animations
    const observerOptions = {
        threshold: 0.05,
        rootMargin: "0px 0px -40px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeSections = document.querySelectorAll('.fade-in-section');
    fadeSections.forEach(section => {
        observer.observe(section);
    });

    // 7. Toggle show more/less minor engineering projects
    const toggleBtn = document.getElementById('toggle-more-projects');
    const toggleText = toggleBtn ? toggleBtn.querySelector('.toggle-btn-text') : null;
    
    if (toggleBtn && toggleText) {
        // Collect all mini project cards in the subgrid
        const allCards = Array.from(document.querySelectorAll('.project-card-mini'));
        
        toggleBtn.addEventListener('click', () => {
            const isExpanded = toggleBtn.classList.contains('expanded');
            
            if (!isExpanded) {
                // Expand: show cards 4 to 8 (index 3 and above)
                let visibleCount = 0;
                allCards.forEach((card, index) => {
                    if (index >= 3) {
                        card.classList.remove('hidden-card');
                        card.classList.add('fade-in-card');
                        // Staggered premium animation delay
                        card.style.animationDelay = `${visibleCount * 70}ms`;
                        visibleCount++;
                    }
                });
                toggleText.textContent = 'View Less Projects';
                toggleBtn.classList.add('expanded');
            } else {
                // Collapse: hide cards 4 to 8
                allCards.forEach((card, index) => {
                    if (index >= 3) {
                        card.classList.add('hidden-card');
                        card.classList.remove('fade-in-card');
                        card.style.animationDelay = '';
                    }
                });
                toggleText.textContent = 'View More Projects';
                toggleBtn.classList.remove('expanded');
                
                // Smooth scroll back to the header of the other engineering projects section
                const sectionHeader = document.querySelector('.projects-scroll-wrapper');
                if (sectionHeader) {
                    const headerOffset = 90; // account for fixed nav
                    const elementPosition = sectionHeader.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }

});
