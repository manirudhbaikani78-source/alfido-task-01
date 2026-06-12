document.addEventListener('DOMContentLoaded', () => {
    // =========================================
    // 1. LOADING SCREEN
    // =========================================
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        document.body.style.overflowY = 'auto';
    }, 1200);

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
        }, { duration: 250, fill: "forwards" });
    });

    // Make cursor respond dynamically to interactive components
    function updateCursorListeners() {
        const interactives = document.querySelectorAll('a, button, .color-btn, .social-icon, .nav-link, [role="button"]');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.width = '45px';
                cursorOutline.style.height = '45px';
                cursorOutline.style.backgroundColor = 'rgba(var(--active-rgb), 0.08)';
                cursorOutline.style.borderColor = 'var(--active-color)';
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '30px';
                cursorOutline.style.height = '30px';
                cursorOutline.style.backgroundColor = 'transparent';
                cursorOutline.style.borderColor = 'var(--active-color)';
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });

        // Hide custom cursor over form text inputs for standard native precision
        const textControls = document.querySelectorAll('input, textarea, select');
        textControls.forEach(ctrl => {
            ctrl.addEventListener('mouseenter', () => {
                cursorDot.style.opacity = '0';
                cursorOutline.style.opacity = '0';
            });
            ctrl.addEventListener('mouseleave', () => {
                cursorDot.style.opacity = '1';
                cursorOutline.style.opacity = '1';
            });
        });
    }

    updateCursorListeners();

    // Hide custom cursor when mouse leaves viewport window
    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
    });

    // =========================================
    // 3. THEME & COLOR INITIALIZATION
    // =========================================
    const html = document.documentElement;
    html.setAttribute('data-theme', 'dark');
    html.setAttribute('data-color', 'emerald');

    // =========================================
    // 4. MOBILE MENU & FLOATING NAVBAR SCROLL STATE
    // =========================================
    const navbar = document.querySelector('.navbar');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) navbar.classList.add('scrolled');
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
    const textArray = ["Frontend Developer", "Web Designer", "Responsive Layout Specialist", "UI Developer"];
    const typingDelay = 80;
    const erasingDelay = 40;
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
            setTimeout(type, typingDelay + 1000);
        }
    }
    setTimeout(type, 1500);

    // =========================================
    // 6. SCROLL REVEAL & SKILL PROGRESS BARS
    // =========================================
    const revealElements = document.querySelectorAll('.reveal');
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    const revealCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (entry.target.classList.contains('skills-category-col')) {
                    const skillItems = entry.target.querySelectorAll('.skill-item');
                    skillItems.forEach(item => {
                        const progressBar = item.querySelector('.skill-bar-fill');
                        const progress = item.getAttribute('data-progress');
                        if (progressBar && progress) {
                            progressBar.style.width = `${progress}%`;
                        }
                    });
                }
            }
        });
    };
    const revealObserver = new IntersectionObserver(revealCallback, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    revealElements.forEach(el => revealObserver.observe(el));

    // Active Navigation scroll tracking
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        mobileLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // =========================================
    // 7. BACK TO TOP BUTTON
    // =========================================
    const backToTopBtn = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) backToTopBtn.classList.add('active');
        else backToTopBtn.classList.remove('active');
    });
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // =========================================
    // 8. CONTACT FORM VALIDATION
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
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending message...';
                btn.disabled = true;
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    contactForm.reset();
                    const successMsg = document.querySelector('.form-success');
                    successMsg.classList.add('active');
                    setTimeout(() => successMsg.classList.remove('active'), 5000);
                }, 1800);
            }
        });

        // Clear error indicators as the user types
        const allInputs = contactForm.querySelectorAll('input, textarea');
        allInputs.forEach(input => {
            input.addEventListener('input', () => {
                input.parentElement.classList.remove('error');
            });
        });
    }

    // =========================================
    // 9. DYNAMIC FOOTER YEAR
    // =========================================
    const footerYear = document.getElementById('year');
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }

    // =========================================
    // 10. BACKGROUND PARTICLES (Canvas)
    // =========================================
    const canvas = document.getElementById('particles-bg');
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    
    const particleColors = [
        'rgba(0, 214, 143, 0.25)',  // Emerald Green
        'rgba(245, 166, 35, 0.15)'   // Warm Amber
    ];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });

    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x; 
            this.y = y;
            this.directionX = directionX; 
            this.directionY = directionY;
            this.size = size; 
            this.color = color;
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
            this.x += this.directionX; 
            this.y += this.directionY;
            this.draw();
        }
    }

    function initParticles() {
        particlesArray = [];
        const numberOfParticles = (canvas.height * canvas.width) / 14000;
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 0.5;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 0.3) - 0.15;
            let directionY = (Math.random() * 0.3) - 0.15;
            let randomColor = particleColors[Math.floor(Math.random() * particleColors.length)];
            particlesArray.push(new Particle(x, y, directionX, directionY, size, randomColor));
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
