/* ============================================
   ECOFLOW - script.js
   Interactive JavaScript
   AdiTech Solutions © 2025
============================================ */

// ============================================
// EmailJS Initialization
// ============================================
(function () {
    emailjs.init("VCxNKBBJQ-8WNgXQx"); 
})();

// ============================================
// Loading Screen
// ============================================
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    setTimeout(() => {
        loader.classList.add("hidden");
        document.body.style.overflow = "auto";
    }, 2200);
});

// Prevent scroll while loading
document.body.style.overflow = "hidden";

// ============================================
// Custom Cursor
// ============================================
const cursor = document.getElementById("cursor");
const cursorFollower = document.getElementById("cursorFollower");

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
});

// Smooth follower animation
function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    cursorFollower.style.left = followerX + "px";
    cursorFollower.style.top = followerY + "px";
    requestAnimationFrame(animateFollower);
}
animateFollower();

// Cursor scale on hover
document.querySelectorAll("a, button, .faq-question, .advantage-item, .feature-item, .pricing-item").forEach((el) => {
    el.addEventListener("mouseenter", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(2)";
        cursorFollower.style.width = "50px";
        cursorFollower.style.height = "50px";
        cursorFollower.style.borderColor = "rgba(0, 255, 136, 0.4)";
    });
    el.addEventListener("mouseleave", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(1)";
        cursorFollower.style.width = "30px";
        cursorFollower.style.height = "30px";
        cursorFollower.style.borderColor = "var(--green)";
    });
});

// ============================================
// Scroll Progress Bar
// ============================================
const scrollProgress = document.getElementById("scrollProgress");

window.addEventListener("scroll", () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    scrollProgress.style.width = progress + "%";
});

// ============================================
// Sticky Header on Scroll
// ============================================
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// ============================================
// Active Nav Link on Scroll
// ============================================
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav ul li a");

function updateActiveNav() {
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute("id");

        if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach((link) => {
                link.classList.remove("active");
                if (link.getAttribute("href") === "#" + id) {
                    link.classList.add("active");
                }
            });
        }
    });
}

window.addEventListener("scroll", updateActiveNav);

// ============================================
// Hamburger Menu
// ============================================
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    hamburger.classList.toggle("active");
    hamburger.setAttribute("aria-expanded", isOpen);
});

// Close menu when a link is clicked
navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        hamburger.classList.remove("active");
        hamburger.setAttribute("aria-expanded", false);
    });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove("open");
        hamburger.classList.remove("active");
        hamburger.setAttribute("aria-expanded", false);
    }
});

// ============================================
// Typing Effect (Hero)
// ============================================
const typingText = document.getElementById("typingText");
const text = "ECOFLOW";
let index = 0;
let typingStarted = false;

function typeText() {
    if (index < text.length) {
        typingText.innerHTML =
            text.substring(0, index + 1) +
            '<span class="cursor-blink" aria-hidden="true"></span>';
        index++;
        setTimeout(typeText, 150);
    } else {
        // Keep cursor blinking at the end for 2s then remove
        setTimeout(() => {
            typingText.innerHTML = text;
        }, 2000);
    }
}

// Start typing after loader delay
setTimeout(() => {
    typeText();
}, 2400);

// ============================================
// Floating Particles (Hero)
// ============================================
function createParticles() {
    const particlesContainer = document.getElementById("particles");
    const count = 40;

    for (let i = 0; i < count; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");

        // Random properties
        const size = Math.random() * 4 + 2;
        const left = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 10;

        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            opacity: 0;
        `;

        particlesContainer.appendChild(particle);
    }
}

createParticles();

// ============================================
// Scroll Fade-In Animation
// ============================================
const fadeElements = document.querySelectorAll(".fade-in");

const fadeObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                fadeObserver.unobserve(entry.target); // Only animate once
            }
        });
    },
    { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
);

fadeElements.forEach((el) => fadeObserver.observe(el));

// ============================================
// Animated Counters (Stats Section)
// ============================================
const statNumbers = document.querySelectorAll(".stat-number");

const counterObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute("data-target"));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.5 }
);

statNumbers.forEach((el) => counterObserver.observe(el));

function animateCounter(el, target) {
    let current = 0;
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current);
    }, 16);
}

// ============================================
// FAQ Accordion
// ============================================
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");

        // Close all open FAQs
        faqItems.forEach((otherItem) => {
            otherItem.classList.remove("open");
            otherItem.querySelector(".faq-question").setAttribute("aria-expanded", false);
            otherItem.querySelector(".faq-answer").hidden = true;
        });

        // Toggle clicked FAQ
        if (!isOpen) {
            item.classList.add("open");
            question.setAttribute("aria-expanded", true);
            answer.hidden = false;
        }
    });

    // Keyboard support
    question.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            question.click();
        }
    });
});

// ============================================
// Back to Top Button
// ============================================
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        backToTop.classList.add("visible");
    } else {
        backToTop.classList.remove("visible");
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// ============================================
// Contact Form Validation & EmailJS Submission
// ============================================
const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const btnText = document.getElementById("btnText");
const btnLoader = document.getElementById("btnLoader");
const successMsg = document.getElementById("successMsg");
const errorMsg = document.getElementById("errorMsg");

function showError(fieldId, message) {
    const errorEl = document.getElementById(fieldId + "Error");
    if (errorEl) {
        errorEl.textContent = message;
    }
    const input = document.getElementById(fieldId);
    if (input) {
        input.style.borderColor = "#ff4444";
    }
}

function clearError(fieldId) {
    const errorEl = document.getElementById(fieldId + "Error");
    if (errorEl) {
        errorEl.textContent = "";
    }
    const input = document.getElementById(fieldId);
    if (input) {
        input.style.borderColor = "";
    }
}

function validateForm() {
    let valid = true;

    // Name validation
    const name = document.getElementById("name").value.trim();
    if (!name) {
        showError("name", "Please enter your name.");
        valid = false;
    } else if (name.length < 2) {
        showError("name", "Name must be at least 2 characters.");
        valid = false;
    } else {
        clearError("name");
    }

    // Email validation
    const email = document.getElementById("email").value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        showError("email", "Please enter your email.");
        valid = false;
    } else if (!emailRegex.test(email)) {
        showError("email", "Please enter a valid email address.");
        valid = false;
    } else {
        clearError("email");
    }

    // Enquiry validation
    const enquiry = document.getElementById("enquiry").value;
    if (!enquiry) {
        showError("enquiry", "Please select an enquiry type.");
        valid = false;
    } else {
        clearError("enquiry");
    }

    // Message validation
    const message = document.getElementById("message").value.trim();
    if (!message) {
        showError("message", "Please enter your message.");
        valid = false;
    } else if (message.length < 10) {
        showError("message", "Message must be at least 10 characters.");
        valid = false;
    } else {
        clearError("message");
    }

    return valid;
}

// Real-time validation on input
["name", "email", "enquiry", "message"].forEach((fieldId) => {
    const el = document.getElementById(fieldId);
    if (el) {
        el.addEventListener("input", () => clearError(fieldId));
        el.addEventListener("change", () => clearError(fieldId));
    }
});

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Show loading state
    btnText.hidden = true;
    btnLoader.hidden = false;
    submitBtn.disabled = true;
    successMsg.hidden = true;
    errorMsg.hidden = true;

    // EmailJS Template Parameters
    // Make sure your EmailJS template uses these variable names
    const templateParams = {
        from_name: document.getElementById("name").value.trim(),
        from_email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim() || "Not provided",
        enquiry_type: document.getElementById("enquiry").value,
        message: document.getElementById("message").value.trim(),
        to_email: "adithyaracharla1998@gmail.com",
    };

    emailjs
        .send(
            "service_2q24d7h",   // Replace with your EmailJS Service ID
            "template_aw45ali",  // Replace with your EmailJS Template ID
            templateParams
        )
        .then(() => {
            // Success
            successMsg.hidden = false;
            contactForm.reset();
        })
        .catch((error) => {
            // Error
            console.error("EmailJS Error:", error);
            errorMsg.hidden = false;
        })
        .finally(() => {
            btnText.hidden = false;
            btnLoader.hidden = true;
            submitBtn.disabled = false;
        });
});

// ============================================
// Smooth Scroll for anchor links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) {
            e.preventDefault();
            const offset = 80; // Header height
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: "smooth" });
        }
    });
});

// ============================================
// Button Ripple Effect
// ============================================
document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
        const ripple = document.createElement("span");
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            transform: scale(0);
            animation: rippleAnim 0.6s linear;
            pointer-events: none;
        `;

        this.style.position = "relative";
        this.style.overflow = "hidden";
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Ripple keyframe (inject once)
const rippleStyle = document.createElement("style");
rippleStyle.textContent = `
    @keyframes rippleAnim {
        to { transform: scale(4); opacity: 0; }
    }
`;
document.head.appendChild(rippleStyle);