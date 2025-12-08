// script.js

// Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const closeMenu = document.querySelector('.close-menu');
const navigation = document.querySelector('.navigation');

navToggle.addEventListener('click', () => {
    navigation.classList.add('active');
});

closeMenu.addEventListener('click', () => {
    navigation.classList.remove('active');
});

// Close menu when clicking outside or on links
document.addEventListener('click', (e) => {
    if (!navigation.contains(e.target) && !navToggle.contains(e.target)) {
        navigation.classList.remove('active');
    }
});

navigation.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navigation.classList.remove('active');
    });
});

// Skill Bars Animation
function animateSkills() {
    const skills = document.querySelectorAll('.skill-progress');
    skills.forEach(skill => {
        const width = skill.getAttribute('data-width');
        skill.style.width = `${width}%`;
    });
}

// Project Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = 1;
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = 0;
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Current Year
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.id === 'about') {
                animateSkills();
            }
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

// Add visible class for animations (add this to CSS if needed)
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = 0;
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
});

const visibleStyle = `
.visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
}
`;
const styleSheet = document.createElement("style");
styleSheet.textContent = visibleStyle;
document.head.appendChild(styleSheet);

// Form Submission (Basic Example, replace with actual backend)
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add form submission logic here (e.g., send to email or API)
    alert('Message sent successfully!');
    contactForm.reset();
});
