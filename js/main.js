// Initialize AOS (Animate on Scroll)
AOS.init({
  duration: 1000,
  easing: "ease-out-cubic",
  once: true,
  offset: 50,
});

// Theme Toggle Functionality
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector("i");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

// Check for saved theme preference or use system preference
const getSavedTheme = () => localStorage.getItem("theme");
const saveTheme = (theme) => localStorage.setItem("theme", theme);

const applyTheme = (theme) => {
  document.body.className = theme;
  updateThemeIcon(theme === "dark-theme");
};

const updateThemeIcon = (isDark) => {
  themeIcon.className = isDark ? "fas fa-sun" : "fas fa-moon";
};

// Initialize theme
const savedTheme = getSavedTheme();
if (savedTheme) {
  applyTheme(savedTheme);
} else {
  applyTheme(prefersDarkScheme.matches ? "dark-theme" : "light-theme");
}

// Theme toggle click handler
themeToggle.addEventListener("click", () => {
  const newTheme = document.body.classList.contains("dark-theme")
    ? "light-theme"
    : "dark-theme";
  applyTheme(newTheme);
  saveTheme(newTheme);
});

// Navbar Scroll Effect
const navbar = document.getElementById("mainNav");
const handleScroll = () => {
  if (window.scrollY > 50) {
    navbar.classList.add("navbar-scrolled");
  } else {
    navbar.classList.remove("navbar-scrolled");
  }
};

window.addEventListener("scroll", handleScroll);

// Project Card Hover Effects
const projectImages = document.querySelectorAll(".project-image");
projectImages.forEach((image) => {
  let timeout;

  const handleMouseMove = (e) => {
    const rect = image.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(image, {
      rotationY: x * 10,
      rotationX: -y * 10,
      transformPerspective: 1000,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(image, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  image.addEventListener("mousemove", handleMouseMove);
  image.addEventListener("mouseleave", handleMouseLeave);
});

// Smooth Scroll
const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 800,
  speedAsDuration: true,
  easing: "easeInOutQuart",
  offset: 50,
});

// Contact Form Handling
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };

    try {
      const response = await fetch("YOUR_FORM_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        showNotification("Message sent successfully!", "success");
        contactForm.reset();
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      showNotification("Failed to send message. Please try again.", "error");
    }
  });
}

// Notification System
const showNotification = (message, type = "success") => {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Animate in
  gsap.fromTo(
    notification,
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.3 }
  );

  // Remove after delay
  setTimeout(() => {
    gsap.to(notification, {
      y: 50,
      opacity: 0,
      duration: 0.3,
      onComplete: () => notification.remove(),
    });
  }, 3000);
};

// Mobile Menu
const navbarToggler = document.querySelector(".navbar-toggler");
const navbarCollapse = document.querySelector(".navbar-collapse");

const closeNavbar = () => {
  navbarCollapse.classList.remove("show");
};

// Close navbar on link click
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", closeNavbar);
});

// Close navbar when clicking outside
document.addEventListener("click", (e) => {
  if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
    closeNavbar();
  }
});

// Page Load Animations
document.addEventListener("DOMContentLoaded", () => {
  gsap.from(".hero-section h1", {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  gsap.from(".hero-text", {
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 0.2,
    ease: "power3.out",
  });

  gsap.from(".hero-buttons", {
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 0.4,
    ease: "power3.out",
  });
});

// Resize Handler
const handleResize = () => {
  // Update AOS
  AOS.refresh();
};

document.querySelectorAll(".info-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    card.style.setProperty("--mouse-x", `${x}%`);
    card.style.setProperty("--mouse-y", `${y}%`);
  });
});

window.addEventListener("resize", handleResize);
