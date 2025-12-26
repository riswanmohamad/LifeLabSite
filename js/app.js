/**
 * SkillsLab - Main Application JavaScript
 * =====================================
 * Handles: Slider, Navigation, Form, and Dynamic Content Rendering
 */

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    renderNavigation();
    renderHeroContent();
    initializeSlider();
    renderHighlights();
    renderTopics();
    renderFormOptions();
    renderFooter();
    initializeNavigation();
    initializeForm();
    initializeBackToTop();
    initializeSmoothScroll();
}

// ============================================
// NAVIGATION
// ============================================
function renderNavigation() {
    const navMenu = document.getElementById('navMenu');
    if (!navMenu) return;

    navMenu.innerHTML = LifeLabData.navigation.map(item => `
        <li><a href="#${item.id}">${item.label}</a></li>
    `).join('');
}

function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveNavLink();
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu on link click
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ============================================
// HERO SECTION
// ============================================
function renderHeroContent() {
    const { siteInfo } = LifeLabData;
    
    const heroTitle = document.getElementById('heroTitle');
    const heroTagline = document.getElementById('heroTagline');
    const heroCta = document.getElementById('heroCta');
    const ctaSubtext = document.getElementById('ctaSubtext');

    if (heroTitle) heroTitle.textContent = siteInfo.heroStatement;
    if (heroTagline) heroTagline.textContent = siteInfo.tagline;
    if (heroCta) heroCta.textContent = siteInfo.ctaText;
    if (ctaSubtext) ctaSubtext.textContent = siteInfo.ctaSubtext;
}

// ============================================
// IMAGE SLIDER
// ============================================
let currentSlide = 0;
let slideInterval;
const SLIDE_DURATION = 5000; // 5 seconds

function initializeSlider() {
    const sliderContainer = document.getElementById('sliderContainer');
    const sliderDots = document.getElementById('sliderDots');
    const { sliderImages } = LifeLabData;

    if (!sliderContainer || !sliderImages.length) return;

    // Render slides
    sliderContainer.innerHTML = sliderImages.map((img, index) => `
        <div class="slider-slide" style="background-image: url('${img.url}')" aria-label="${img.alt}"></div>
    `).join('');

    // Render dots
    sliderDots.innerHTML = sliderImages.map((_, index) => `
        <span class="slider-dot ${index === 0 ? 'active' : ''}" data-slide="${index}"></span>
    `).join('');

    // Add event listeners
    document.getElementById('sliderPrev').addEventListener('click', () => {
        changeSlide(currentSlide - 1);
        resetSlideInterval();
    });

    document.getElementById('sliderNext').addEventListener('click', () => {
        changeSlide(currentSlide + 1);
        resetSlideInterval();
    });

    // Dot navigation
    sliderDots.querySelectorAll('.slider-dot').forEach(dot => {
        dot.addEventListener('click', (e) => {
            changeSlide(parseInt(e.target.dataset.slide));
            resetSlideInterval();
        });
    });

    // Auto-play
    startSlideInterval();

    // Pause on hover (desktop)
    const slider = document.getElementById('heroSlider');
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', startSlideInterval);

    // Touch/Swipe support for mobile
    initializeTouchSwipe(slider);
}

// Touch swipe support for mobile slider
function initializeTouchSwipe(slider) {
    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 50;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(slideInterval);
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startSlideInterval();
    }, { passive: true });

    function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
                // Swiped right - previous slide
                changeSlide(currentSlide - 1);
            } else {
                // Swiped left - next slide
                changeSlide(currentSlide + 1);
            }
        }
    }
}

function changeSlide(index) {
    const { sliderImages } = LifeLabData;
    const sliderContainer = document.getElementById('sliderContainer');
    const dots = document.querySelectorAll('.slider-dot');

    // Wrap around
    if (index < 0) index = sliderImages.length - 1;
    if (index >= sliderImages.length) index = 0;

    currentSlide = index;
    sliderContainer.style.transform = `translateX(-${currentSlide * 33.333}%)`;

    // Update dots
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

function startSlideInterval() {
    slideInterval = setInterval(() => {
        changeSlide(currentSlide + 1);
    }, SLIDE_DURATION);
}

function resetSlideInterval() {
    clearInterval(slideInterval);
    startSlideInterval();
}

// ============================================
// PROGRAM HIGHLIGHTS
// ============================================
function renderHighlights() {
    const highlightsGrid = document.getElementById('highlightsGrid');
    const { programHighlights } = LifeLabData;

    if (!highlightsGrid) return;

    highlightsGrid.innerHTML = programHighlights.map(highlight => `
        <div class="highlight-card${highlight.highlighted ? ' highlighted' : ''}">
            <span class="icon">${highlight.icon}</span>
            <h3>${highlight.title}</h3>
            <p>${highlight.description}</p>
        </div>
    `).join('');
}

// ============================================
// COURSE TOPICS
// ============================================
function renderTopics() {
    const topicsGrid = document.getElementById('topicsGrid');
    const { courseTopics } = LifeLabData;

    if (!topicsGrid) return;

    const topicsHtml = courseTopics.map(topic => `
        <div class="topic-card">
            <span class="icon">${topic.icon}</span>
            <h3>${topic.title}</h3>
            <p>${topic.description}</p>
        </div>
    `).join('');

    const moreTopicsCardHtml = `
        <div class="topic-card highlighted">
            <span class="icon">✨</span>
            <h3>More Topics</h3>
            <p>And many more topics will be covered during the course.</p>
        </div>
    `;

    topicsGrid.innerHTML = topicsHtml + moreTopicsCardHtml;

    // Add scroll animation
    observeElements('.topic-card');
}

// ============================================
// REGISTRATION FORM
// ============================================
function renderFormOptions() {
    const statusSelect = document.getElementById('status');
    const languageGroup = document.getElementById('languageGroup');
    const { formConfig } = LifeLabData;

    if (!statusSelect || !languageGroup) return;

    // Render status dropdown options
    statusSelect.innerHTML = formConfig.statusOptions.map(option => `
        <option value="${option.value}" ${option.disabled ? 'disabled selected' : ''}>${option.label}</option>
    `).join('');

    // Render language checkboxes
    languageGroup.innerHTML = formConfig.languageOptions.map(lang => `
        <div class="checkbox-item">
            <input type="checkbox" id="lang_${lang.value}" name="languages" value="${lang.value}">
            <label for="lang_${lang.value}">${lang.label}</label>
        </div>
    `).join('');
}

function initializeForm() {
    const form = document.getElementById('registerForm');
    if (!form) return;

    form.addEventListener('submit', handleFormSubmit);

    // Real-time validation
    const name = document.getElementById('name');
    const telephone = document.getElementById('telephone');
    const status = document.getElementById('status');

    name.addEventListener('blur', () => validateField('name', name.value));
    telephone.addEventListener('blur', () => validateField('telephone', telephone.value));
    status.addEventListener('change', () => validateField('status', status.value));
}

function validateField(fieldName, value) {
    let isValid = true;
    let message = '';

    switch (fieldName) {
        case 'name':
            if (!value.trim()) {
                isValid = false;
                message = 'Please enter your name';
            } else if (value.trim().length < 2) {
                isValid = false;
                message = 'Name must be at least 2 characters';
            }
            break;

        case 'telephone':
            const phoneRegex = /^[\d\s\-+()]{8,15}$/;
            if (!value.trim()) {
                isValid = false;
                message = 'Please enter your phone number';
            } else if (!phoneRegex.test(value.trim())) {
                isValid = false;
                message = 'Please enter a valid phone number';
            }
            break;

        case 'status':
            if (!value) {
                isValid = false;
                message = 'Please select your status';
            }
            break;

        case 'languages':
            const checkedLanguages = document.querySelectorAll('input[name="languages"]:checked');
            if (checkedLanguages.length === 0) {
                isValid = false;
                message = 'Please select at least one language';
            }
            break;
    }

    // Update UI
    const input = document.getElementById(fieldName === 'languages' ? 'languageGroup' : fieldName);
    const errorSpan = document.getElementById(`${fieldName}Error`);

    if (input && fieldName !== 'languages') {
        input.classList.toggle('error', !isValid);
    }
    if (errorSpan) {
        errorSpan.textContent = message;
    }

    return isValid;
}

function validateForm() {
    const name = document.getElementById('name').value;
    const telephone = document.getElementById('telephone').value;
    const status = document.getElementById('status').value;

    const isNameValid = validateField('name', name);
    const isTelephoneValid = validateField('telephone', telephone);
    const isStatusValid = validateField('status', status);
    const isLanguagesValid = validateField('languages', null);

    return isNameValid && isTelephoneValid && isStatusValid && isLanguagesValid;
}

async function handleFormSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const formMessage = document.getElementById('formMessage');

    // Get form data
    const formData = {
        name: document.getElementById('name').value.trim(),
        telephone: document.getElementById('telephone').value.trim(),
        status: document.getElementById('status').value,
        languages: Array.from(document.querySelectorAll('input[name="languages"]:checked'))
            .map(cb => cb.value)
            .join(', '),
        timestamp: new Date().toISOString()
    };

    // Check if Google Sheets is configured
    const { googleSheetConfig } = LifeLabData;
    
    if (!googleSheetConfig.isConfigured || 
        googleSheetConfig.webAppUrl === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE') {
        
        // Demo mode - show success without actually submitting
        console.log('Demo Mode - Form Data:', formData);
        
        formMessage.className = 'form-message success';
        formMessage.textContent = '✅ Demo Mode: Form validated successfully! Configure Google Sheets to enable actual submissions. Check console for form data.';
        formMessage.style.display = 'block';
        
        // Reset form after delay
        setTimeout(() => {
            document.getElementById('registerForm').reset();
            formMessage.style.display = 'none';
        }, 5000);
        
        return;
    }

    // Show loading state
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    submitBtn.disabled = true;
    formMessage.style.display = 'none';

    try {
        const response = await fetch(googleSheetConfig.webAppUrl, {
            method: 'POST',
            mode: 'no-cors', // Required for Google Apps Script
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        // Since we use no-cors, we can't read the response
        // We assume success if no error was thrown
        formMessage.className = 'form-message success';
        formMessage.textContent = '🎉 Registration successful! We will contact you soon with the course details.';
        formMessage.style.display = 'block';

        // Reset form
        document.getElementById('registerForm').reset();

    } catch (error) {
        console.error('Form submission error:', error);
        formMessage.className = 'form-message error';
        formMessage.textContent = '❌ Something went wrong. Please try again or contact us directly.';
        formMessage.style.display = 'block';
    } finally {
        // Reset button state
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
    }
}

// ============================================
// FOOTER
// ============================================
function renderFooter() {
    const { footer } = LifeLabData;
    
    const footerTagline = document.getElementById('footerTagline');
    const footerCopyright = document.getElementById('footerCopyright');

    if (footerTagline) footerTagline.textContent = footer.tagline;
    if (footerCopyright) footerCopyright.textContent = footer.copyright;
}

// ============================================
// BACK TO TOP BUTTON
// ============================================
function initializeBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// SCROLL ANIMATIONS (Intersection Observer)
// ============================================
function observeElements(selector) {
    const elements = document.querySelectorAll(selector);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}
