document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');

    navToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-xmark');
        });
    });

    // 2. Sticky Navbar Styling on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. View All Menu Functionality
    const viewAllBtn = document.getElementById('view-all-btn');
    const hiddenItems = document.querySelectorAll('.hidden-item');
    let isExpanded = false;

    viewAllBtn.addEventListener('click', () => {
        isExpanded = !isExpanded;
        hiddenItems.forEach(item => {
            if (isExpanded) {
                item.style.display = 'block';
                // Trigger reflow for animation
                setTimeout(() => item.style.opacity = '1', 50);
            } else {
                item.style.display = 'none';
            }
        });
        viewAllBtn.textContent = isExpanded ? 'Show Less' : 'View All Menu';
    });

    // 4. Lazy Loading Images Optimized
    const lazyImages = document.querySelectorAll('.lazy-img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, { rootMargin: '0px 0px 200px 0px' });

    lazyImages.forEach(image => imageObserver.observe(image));

    // 5. Scroll Reveal Animation
    const revealSections = document.querySelectorAll('.scroll-reveal');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    revealSections.forEach(section => sectionObserver.observe(section));

// 6. Form Submission Handle (AJAX Integration)
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'পাঠানো হচ্ছে...';
    submitBtn.disabled = true;

    const formData = new FormData(contactForm);

    try {
        const response = await fetch(contactForm.action, {
            method: contactForm.method,
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            alert('ধন্যবাদ! আপনার বার্তাটি সফলভাবে আমাদের ইমেইলে পাঠানো হয়েছে।');
            contactForm.reset();
        } else {
            alert('দুঃখিত, কোনো একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।');
        }
    } catch (error) {
        alert('নেটওয়ার্ক সমস্যা! দয়া করে ইন্টারনেট কানেকশন চেক করুন।');
    } finally {
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
    }
});

});