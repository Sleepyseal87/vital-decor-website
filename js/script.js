document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // Animate on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.category-section, .project-item, .product-item');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        elements.forEach(el => observer.observe(el));
    };
    animateOnScroll();
    
    // Contact button tracking
    const contactButtons = document.querySelectorAll('.btn-line, .btn-phone');
    contactButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const buttonType = this.classList.contains('btn-line') ? 'Line' : 'Phone';
            console.log(`Contact button clicked: ${buttonType}`);
        });
    });
    
    // Accessibility - keyboard navigation
    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach(item => {
        item.setAttribute('tabindex', '0');
        item.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');

    // Add click event to all project and product images
    const clickableImages = document.querySelectorAll('.project-item img, .product-item img');
    clickableImages.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            const src = this.getAttribute('src');
            const alt = this.getAttribute('alt');
            const caption = this.closest('.project-item, .product-item').querySelector('.project-caption, h3');

            lightboxImg.src = src;
            lightboxImg.alt = alt;
            lightboxCaption.textContent = caption ? caption.textContent : alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox when clicking outside image, close button, or pressing Escape
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    lightbox.addEventListener('click', closeLightbox);
    lightboxClose.addEventListener('click', closeLightbox);

    // Prevent closing when clicking on the image itself
    lightboxImg.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        console.log('%c🔆 Lighting Website Loaded', 'font-size: 16px; font-weight: bold; color: #c9a961;');
    });

});
