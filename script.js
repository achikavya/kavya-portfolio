/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    const navLinks = navMenu.querySelectorAll("a");

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
        });
    });
}


/* =========================================
   SCROLL REVEAL ANIMATION
========================================= */

const revealElements = document.querySelectorAll(
    ".section-heading, .about-content, .skill-card, .project-card, .achievement-card, .timeline-item, .experience-card, .certificate-card, .why-card, .contact-container"
);

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                revealObserver.unobserve(entry.target);
            }

        });

    },
    {
        threshold: 0.12
    }
);

revealElements.forEach(element => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});


/* =========================================
   LOAD EMAILJS
========================================= */

const emailJSscript = document.createElement("script");

emailJSscript.src =
    "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";

emailJSscript.onload = () => {

    emailjs.init({
        publicKey: "Yj9X7J_7DM7UsIGRM"
    });

};

document.head.appendChild(emailJSscript);


/* =========================================
   CONTACT FORM - EMAILJS
========================================= */

const contactForm = document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const status = document.getElementById("form-status");
        const submitButton = contactForm.querySelector(
            "button[type='submit']"
        );

        if (status) {
            status.textContent = "Sending message...";
        }

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Sending...";
        }

        try {

            const formData = new FormData(contactForm);

            const templateParams = {
                name: formData.get("from_name"),
                email: formData.get("from_email"),
                title: formData.get("subject"),
                message: formData.get("message")
            };

            await emailjs.send(
                "service_7mtueai",
                "template_7jrfit3",
                templateParams
            );

            if (status) {
                status.textContent =
                    "Message sent successfully! Thank you for contacting me.";
            }

            contactForm.reset();

        } catch (error) {

            console.error("EmailJS Error:", error);

            if (status) {
                status.textContent =
                    "Unable to send the message. Please try again.";
            }

        }

        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = "Send Message";
        }

    });

}