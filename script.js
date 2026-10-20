
/* ========================================
   KATRINAH W. M. TULAY'S PORTFOLIO
   Main JavaScript
======================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ------------------------------------
       1. MOBILE HAMBURGER NAVIGATION
    ------------------------------------ */

    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {

        function closeMenu() {
            navLinks.classList.remove("active");
            menuToggle.innerHTML = "☰";
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
        }

        function openMenu() {
            navLinks.classList.add("active");
            menuToggle.innerHTML = "✕";
            menuToggle.setAttribute("aria-expanded", "true");
            menuToggle.setAttribute("aria-label", "Close navigation menu");
        }

        menuToggle.addEventListener("click", function () {
            const isOpen = navLinks.classList.contains("active");

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close the menu after a navigation link is selected.
        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", closeMenu);
        });

        // Close the menu when clicking outside it.
        document.addEventListener("click", function (event) {
            const clickedInsideMenu = navLinks.contains(event.target);
            const clickedToggle = menuToggle.contains(event.target);

            if (!clickedInsideMenu && !clickedToggle) {
                closeMenu();
            }
        });

        // Allow visitors to close the menu using the Escape key.
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closeMenu();
                menuToggle.focus();
            }
        });

        // Reset the menu when returning to the desktop layout.
        window.addEventListener("resize", function () {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        });
    }


    /* ------------------------------------
       2. AUTOMATIC ACTIVE NAVIGATION LINK
    ------------------------------------ */

    const currentPage = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase() || "index.html";

    document.querySelectorAll(".nav-links a").forEach(function (link) {
        const linkPage = link.getAttribute("href");

        if (!linkPage) return;

        const normalizedLink = linkPage
            .split("/")
            .pop()
            .toLowerCase();

        if (normalizedLink === currentPage) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });


    /* ------------------------------------
       3. SMOOTH SCROLLING
    ------------------------------------ */

    document.documentElement.style.scrollBehavior = "smooth";


    /* ------------------------------------
       4. SCROLL REVEAL ANIMATIONS
    ------------------------------------ */

    // Add the animation styles through JavaScript.
    const animationStyles = document.createElement("style");

    animationStyles.textContent = `
        .js-reveal {
            opacity: 0;
            transform: translateY(22px);
            transition:
                opacity 0.7s ease,
                transform 0.7s ease;
        }

        .js-reveal.is-visible {
            opacity: 1;
            transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
            .js-reveal,
            .js-reveal.is-visible {
                opacity: 1;
                transform: none;
                transition: none;
            }
        }
    `;

    document.head.appendChild(animationStyles);

    // Select sections and cards that should appear while scrolling.
    const revealElements = document.querySelectorAll(
        ".home-hero, " +
        ".about-content, .about-visual, " +
        ".current-education, .previous-education, " +
        ".leadership-experience, .growth-section, " +
        ".skill, .professional-development, " +
        ".experience-card, .experience-reflection, " +
        ".experience-closing, .socials, " +
        ".contact-professional, .contact-thank-you"
    );

    // Avoid hiding content if the browser lacks animation support.
    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(function (element) {
            element.classList.add("js-reveal");
            revealObserver.observe(element);
        });

    } else {
        // Older browsers display everything without reveal animation.
        revealElements.forEach(function (element) {
            element.classList.add("is-visible");
        });
    }


    /* ------------------------------------
       5. BACK-TO-TOP BUTTONS
    ------------------------------------ */

    document.querySelectorAll(".back-to-top").forEach(function (button) {
        button.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    });


    /* ------------------------------------
       6. CONSOLE MESSAGE
    ------------------------------------ */

    console.log("Katrinah's portfolio JavaScript loaded successfully.");

});
