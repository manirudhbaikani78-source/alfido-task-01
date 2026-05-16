document.addEventListener('DOMContentLoaded', () => {
    // =========================================
    // 1. LOADING SCREEN
    // =========================================
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        document.body.style.overflowY = 'auto';
    }, 1500);

    // =========================================
    // 2. CUSTOM CURSOR
    // =========================================
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // =========================================
    // 3. THEME & COLOR SETTINGS
    // =========================================
    const settingsBtn = document.querySelector('.theme-settings-btn');
    const themeDropdown = document.querySelector('.theme-dropdown');
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const themeIcon = themeToggle.querySelector('i');
    const colorBtns = document.querySelectorAll('.color-btn');

    // Toggle dropdown
    settingsBtn.addEventListener('click', () => {
        themeDropdown.classList.toggle('active');
    });

    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.theme-selector-container')) {
            themeDropdown.classList.remove('active');
        }
    });

    // Load saved settings
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const savedColor = localStorage.getItem('color') || 'purple';
    html.setAttribute('data-theme', savedTheme);
    html.setAttribute('data-color', savedColor);
    updateThemeIcon(savedTheme);
    updateActiveColorBtn(savedColor);

    // Theme (Dark/Light) Toggle
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    // Color Pickers
    colorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const newColor = btn.getAttribute('data-color-val');
            html.setAttribute('data-color', newColor);
            localStorage.setItem('color', newColor);
            updateActiveColorBtn(newColor);
            updateParticlesColor(newColor); // Update canvas particles
        });
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }

    function updateActiveColorBtn(color) {
        colorBtns.forEach(b => b.classList.remove('active'));
        const activeBtn = document.querySelector(`.color-btn[data-color-val="${color}"]`);
        if(activeBtn) activeBtn.classList.add('active');
    }

    // =========================================
    // 4. MOBILE MENU & STICKY NAVBAR
    // =========================================
    const navbar = document.querySelector('.navbar');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });

    mobileBtn.addEventListener('click', () => {
        mobileBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // =========================================
    // 5. TYPING ANIMATION
    // =========================================
    const typedTextSpan = document.querySelector(".typing-text");
    const cursorSpan = document.querySelector(".cursor");
    const textArray = ["Full Stack Developer", "Frontend Developer", "UI/UX Enthusiast", "JavaScript Developer"];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;
    
    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            setTimeout(erase, newTextDelay);
        }
    }
    function erase() {
        if (charIndex > 0) {
            if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            textArrayIndex++;
            if(textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }
    setTimeout(type, 2000);

    // =========================================
    // 6. SCROLL REVEAL & SKILL PROGRESS
    // =========================================
    const revealElements = document.querySelectorAll('.reveal');
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    const revealCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (entry.target.classList.contains('skill-card')) {
                    const progressBar = entry.target.querySelector('.progress-bar');
                    const progress = entry.target.getAttribute('data-progress');
                    progressBar.style.width = `${progress}%`;
                }
            }
        });
    };
    const revealObserver = new IntersectionObserver(revealCallback, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
    revealElements.forEach(el => revealObserver.observe(el));

    // Active Navigation Links
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            if (scrollY >= (section.offsetTop - section.clientHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) link.classList.add('active');
        });
    });


    // =========================================
    // 8. BACK TO TOP BUTTON
    // =========================================
    const backToTopBtn = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) backToTopBtn.classList.add('active');
        else backToTopBtn.classList.remove('active');
    });
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // =========================================
    // 9. CONTACT FORM VALIDATION
    // =========================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            
            const inputs = contactForm.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                const group = input.parentElement;
                if (!input.value.trim()) {
                    group.classList.add('error');
                    isValid = false;
                } else if (input.type === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value)) {
                        group.classList.add('error');
                        isValid = false;
                    } else {
                        group.classList.remove('error');
                    }
                } else {
                    group.classList.remove('error');
                }
            });

            if (isValid) {
                const btn = contactForm.querySelector('.submit-btn');
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Transmitting...';
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    contactForm.reset();
                    const successMsg = document.querySelector('.form-success');
                    successMsg.classList.add('active');
                    setTimeout(() => successMsg.classList.remove('active'), 5000);
                }, 2000);
            }
        });

        // Add event listener to remove error state on input
        const allInputs = contactForm.querySelectorAll('input, textarea');
        allInputs.forEach(input => {
            input.addEventListener('input', () => {
                input.parentElement.classList.remove('error');
            });
        });
    }

    // =========================================
    // 10. DYNAMIC FOOTER YEAR
    // =========================================
    document.getElementById('year').textContent = new Date().getFullYear();

    // =========================================
    // 11. BACKGROUND PARTICLES (Canvas)
    // =========================================
    const canvas = document.getElementById('particles-bg');
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    
    // Color mapping
    const colorsMap = {
        'purple': 'rgba(127, 0, 255, 0.4)',
        'cyan': 'rgba(0, 212, 255, 0.4)',
        'red': 'rgba(255, 0, 76, 0.4)',
        'pink': 'rgba(255, 105, 180, 0.4)',
        'lightgreen': 'rgba(144, 238, 144, 0.4)',
        'gray': 'rgba(107, 114, 128, 0.4)'
    };
    
    let particleColor = colorsMap[savedColor] || colorsMap['purple'];

    function updateParticlesColor(colorKey) {
        particleColor = colorsMap[colorKey] || colorsMap['purple'];
        particlesArray.forEach(p => p.color = particleColor);
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });

    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x; this.y = y;
            this.directionX = directionX; this.directionY = directionY;
            this.size = size; this.color = color;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        update() {
            if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
            if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
            this.x += this.directionX; this.y += this.directionY;
            this.draw();
        }
    }

    function initParticles() {
        particlesArray = [];
        const numberOfParticles = (canvas.height * canvas.width) / 12000;
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 0.5;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 0.4) - 0.2;
            let directionY = (Math.random() * 0.4) - 0.2;
            particlesArray.push(new Particle(x, y, directionX, directionY, size, particleColor));
        }
    }

    function animateParticles() {
        requestAnimationFrame(animateParticles);
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
    }

    initParticles();
    animateParticles();
});
