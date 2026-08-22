/* =========================================================
   ESI - EDUCACIÓN SEXUAL INTEGRAL
   JavaScript principal
   Compatible con GitHub Pages
   ========================================================= */

   document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. MENÚ MÓVIL
       ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");

            const expanded =
                menuToggle.getAttribute("aria-expanded") === "true";

            menuToggle.setAttribute(
                "aria-expanded",
                String(!expanded)
            );
        });

        // Cerrar menú al seleccionar una sección
        const navLinks = navMenu.querySelectorAll("a");

        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }


    /* =====================================================
       2. SCROLL SUAVE
       ===================================================== */

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    /* =====================================================
       3. BOTÓN "VOLVER ARRIBA"
       ===================================================== */

    const backToTop = document.querySelector("#backToTop");

    if (backToTop) {

        const checkScroll = () => {
            if (window.scrollY > 500) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }
        };

        window.addEventListener("scroll", checkScroll);

        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }


    /* =====================================================
       4. ANIMACIONES AL HACER SCROLL
       ===================================================== */

    const animatedElements = document.querySelectorAll(
        ".animate-on-scroll, .info-card, .pillar-card, .stat-card"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.15
            }
        );

        animatedElements.forEach(element => {
            observer.observe(element);
        });

    } else {

        animatedElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    /* =====================================================
       5. ACORDEÓN - PREGUNTAS FRECUENTES
       ===================================================== */

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        const question = item.querySelector(".faq-question");

        if (!question) {
            return;
        }

        question.addEventListener("click", () => {

            const isActive = item.classList.contains("active");

            // Cerrar los demás
            faqItems.forEach(otherItem => {
                otherItem.classList.remove("active");

                const otherButton =
                    otherItem.querySelector(".faq-question");

                if (otherButton) {
                    otherButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }
            });

            // Abrir el seleccionado
            if (!isActive) {
                item.classList.add("active");

                question.setAttribute(
                    "aria-expanded",
                    "true"
                );
            }

        });

    });


    /* =====================================================
       6. FILTRO DE TEMÁTICAS
       ===================================================== */

    const filterButtons =
        document.querySelectorAll("[data-filter]");

    const filterCards =
        document.querySelectorAll("[data-category]");

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const filter = button.dataset.filter;

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            filterCards.forEach(card => {

                const category = card.dataset.category;

                if (
                    filter === "all" ||
                    category === filter
                ) {
                    card.style.display = "";
                    card.classList.add("visible");
                } else {
                    card.style.display = "none";
                }

            });

        });

    });


    /* =====================================================
       7. MODALES INFORMATIVOS
       ===================================================== */

    const modalButtons =
        document.querySelectorAll("[data-modal]");

    const modals =
        document.querySelectorAll(".modal");

    const closeModal = modal => {

        modal.classList.remove("active");
        document.body.classList.remove("modal-open");

    };

    modalButtons.forEach(button => {

        button.addEventListener("click", () => {

            const modalId =
                button.getAttribute("data-modal");

            const modal =
                document.getElementById(modalId);

            if (modal) {
                modal.classList.add("active");
                document.body.classList.add("modal-open");
            }

        });

    });

    modals.forEach(modal => {

        const closeButtons =
            modal.querySelectorAll(".modal-close");

        closeButtons.forEach(button => {

            button.addEventListener("click", () => {
                closeModal(modal);
            });

        });

        modal.addEventListener("click", event => {

            if (event.target === modal) {
                closeModal(modal);
            }

        });

    });

    // Cerrar modal con ESC
    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            modals.forEach(modal => {

                if (modal.classList.contains("active")) {
                    closeModal(modal);
                }

            });

        }

    });


    /* =====================================================
       8. CONTADORES ANIMADOS
       ===================================================== */

    const counters =
        document.querySelectorAll("[data-counter]");

    const animateCounter = element => {

        const target =
            parseFloat(element.dataset.counter);

        const duration = 1800;
        const startTime = performance.now();

        const update = currentTime => {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(elapsed / duration, 1);

            // Efecto de desaceleración
            const ease =
                1 - Math.pow(1 - progress, 3);

            const currentValue =
                target * ease;

            if (Number.isInteger(target)) {

                element.textContent =
                    Math.floor(currentValue);

            } else {

                element.textContent =
                    currentValue.toFixed(1);

            }

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent =
                    Number.isInteger(target)
                        ? target
                        : target.toFixed(1);
            }

        };

        requestAnimationFrame(update);
    };


    if ("IntersectionObserver" in window) {

        const counterObserver =
            new IntersectionObserver(entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        animateCounter(entry.target);

                        counterObserver.unobserve(
                            entry.target
                        );

                    }

                });

            }, {
                threshold: 0.5
            });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });

    } else {

        counters.forEach(counter => {
            animateCounter(counter);
        });

    }


    /* =====================================================
       9. BARRAS DE PROGRESO
       ===================================================== */

    const progressBars =
        document.querySelectorAll(".progress-bar");

    if ("IntersectionObserver" in window) {

        const progressObserver =
            new IntersectionObserver(entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        const value =
                            entry.target.dataset.progress;

                        entry.target.style.width =
                            `${value}%`;

                        progressObserver.unobserve(
                            entry.target
                        );

                    }

                });

            }, {
                threshold: 0.3
            });

        progressBars.forEach(bar => {
            progressObserver.observe(bar);
        });

    }


    /* =====================================================
       10. SISTEMA DE TABS
       ===================================================== */

    const tabButtons =
        document.querySelectorAll("[data-tab]");

    const tabContents =
        document.querySelectorAll("[data-tab-content]");

    tabButtons.forEach(button => {

        button.addEventListener("click", () => {

            const target =
                button.dataset.tab;

            tabButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            tabContents.forEach(content => {
                content.classList.remove("active");
            });

            button.classList.add("active");

            const targetContent =
                document.querySelector(
                    `[data-tab-content="${target}"]`
                );

            if (targetContent) {
                targetContent.classList.add("active");
            }

        });

    });


    /* =====================================================
       11. BUSCADOR DE CONTENIDO
       ===================================================== */

    const searchInput =
        document.querySelector("#searchInput");

    const searchableElements =
        document.querySelectorAll(".searchable");

    if (searchInput) {

        searchInput.addEventListener("input", () => {

            const search =
                searchInput.value
                    .toLowerCase()
                    .trim();

            searchableElements.forEach(element => {

                const text =
                    element.textContent.toLowerCase();

                if (text.includes(search)) {
                    element.style.display = "";
                } else {
                    element.style.display = "none";
                }

            });

        });

    }


    /* =====================================================
       12. BOTÓN PARA COMPARTIR LA PÁGINA
       ===================================================== */

    const shareButton =
        document.querySelector("#shareButton");

    if (shareButton) {

        shareButton.addEventListener("click", async () => {

            const shareData = {
                title: document.title,
                text:
                    "Educación Sexual Integral, proyecto de vida, prevención de violencias y salud mental.",
                url: window.location.href
            };

            try {

                if (
                    navigator.share &&
                    typeof navigator.share === "function"
                ) {

                    await navigator.share(shareData);

                } else {

                    await navigator.clipboard.writeText(
                        window.location.href
                    );

                    showNotification(
                        "Enlace copiado al portapapeles."
                    );

                }

            } catch (error) {

                if (error.name !== "AbortError") {
                    showNotification(
                        "No se pudo compartir la página."
                    );
                }

            }

        });

    }


    /* =====================================================
       13. COPIAR ENLACES
       ===================================================== */

    const copyButtons =
        document.querySelectorAll("[data-copy]");

    copyButtons.forEach(button => {

        button.addEventListener("click", async () => {

            const text =
                button.dataset.copy;

            if (!text) {
                return;
            }

            try {

                await navigator.clipboard.writeText(text);

                showNotification(
                    "Información copiada correctamente."
                );

            } catch (error) {

                showNotification(
                    "No fue posible copiar la información."
                );

            }

        });

    });


    /* =====================================================
       14. NOTIFICACIONES
       ===================================================== */

    function showNotification(message) {

        let notification =
            document.querySelector(".site-notification");

        if (!notification) {

            notification =
                document.createElement("div");

            notification.className =
                "site-notification";

            document.body.appendChild(
                notification
            );

        }

        notification.textContent = message;
        notification.classList.add("show");

        setTimeout(() => {
            notification.classList.remove("show");
        }, 3000);

    }


    /* =====================================================
       15. RESALTAR SECCIÓN ACTIVA
       ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const sectionLinks =
        document.querySelectorAll(
            '.nav-menu a[href^="#"]'
        );

    if ("IntersectionObserver" in window) {

        const sectionObserver =
            new IntersectionObserver(entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        const id =
                            entry.target.getAttribute("id");

                        sectionLinks.forEach(link => {

                            link.classList.remove("active");

                            if (
                                link.getAttribute("href") ===
                                `#${id}`
                            ) {
                                link.classList.add("active");
                            }

                        });

                    }

                });

            }, {
                rootMargin: "-30% 0px -60% 0px"
            });

        sections.forEach(section => {
            sectionObserver.observe(section);
        });

    }


    /* =====================================================
       16. DETECCIÓN DEL AÑO ACTUAL
       ===================================================== */

    const yearElements =
        document.querySelectorAll("[data-year]");

    yearElements.forEach(element => {
        element.textContent =
            new Date().getFullYear();
    });


    /* =====================================================
       17. FORMULARIO DE CONTACTO
       ===================================================== */

    const contactForm =
        document.querySelector("#contactForm");

    if (contactForm) {

        contactForm.addEventListener("submit", event => {

            event.preventDefault();

            const name =
                contactForm.querySelector(
                    '[name="name"]'
                );

            const email =
                contactForm.querySelector(
                    '[name="email"]'
                );

            const message =
                contactForm.querySelector(
                    '[name="message"]'
                );

            if (
                !name ||
                !email ||
                !message
            ) {
                return;
            }

            if (
                name.value.trim() === "" ||
                email.value.trim() === "" ||
                message.value.trim() === ""
            ) {

                showNotification(
                    "Completa todos los campos."
                );

                return;
            }

            if (!isValidEmail(email.value)) {

                showNotification(
                    "Ingresa un correo electrónico válido."
                );

                return;
            }

            showNotification(
                "¡Gracias por comunicarte con nosotros!"
            );

            contactForm.reset();

        });

    }


    /* =====================================================
       18. VALIDACIÓN DE CORREO
       ===================================================== */

    function isValidEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            email
        );

    }


    /* =====================================================
       19. QUIZ EDUCATIVO
       ===================================================== */

    const quiz =
        document.querySelector("#esiQuiz");

    if (quiz) {

        const questions =
            quiz.querySelectorAll(".quiz-question");

        const result =
            quiz.querySelector(".quiz-result");

        const submitButton =
            quiz.querySelector(".quiz-submit");

        if (submitButton) {

            submitButton.addEventListener("click", () => {

                let score = 0;
                let answered = 0;

                questions.forEach(question => {

                    const selected =
                        question.querySelector(
                            'input[type="radio"]:checked'
                        );

                    if (!selected) {
                        return;
                    }

                    answered++;

                    if (
                        selected.dataset.correct === "true"
                    ) {
                        score++;
                    }

                });

                if (answered < questions.length) {

                    showNotification(
                        "Responde todas las preguntas antes de continuar."
                    );

                    return;
                }

                const percentage =
                    Math.round(
                        (score / questions.length) * 100
                    );

                if (result) {

                    result.innerHTML = `
                        <strong>Resultado: ${percentage}%</strong>
                        <p>
                            Respondiste correctamente
                            ${score} de
                            ${questions.length} preguntas.
                        </p>
                    `;

                    result.classList.add("visible");

                }

            });

        }

    }


    /* =====================================================
       20. BOTONES DE INFORMACIÓN
       ===================================================== */

    const infoButtons =
        document.querySelectorAll(".info-button");

    infoButtons.forEach(button => {

        button.addEventListener("click", () => {

            const card =
                button.closest(".info-card");

            if (!card) {
                return;
            }

            card.classList.toggle("expanded");

            const expanded =
                card.classList.contains("expanded");

            button.textContent =
                expanded
                    ? "Ver menos"
                    : "Ver más";

        });

    });


    /* =====================================================
       21. ACCESIBILIDAD
       ===================================================== */

    document.querySelectorAll("button").forEach(button => {

        if (!button.hasAttribute("type")) {
            button.setAttribute("type", "button");
        }

    });


    /* =====================================================
       22. PREVENIR ERRORES DE IMÁGENES
       ===================================================== */

    const images =
        document.querySelectorAll("img");

    images.forEach(image => {

        image.addEventListener("error", () => {

            image.classList.add("image-error");

            // Mantiene el diseño aunque una imagen
            // no exista o haya sido eliminada.
            image.alt =
                image.alt ||
                "Imagen informativa de Educación Sexual Integral";

        });

    });


    /* =====================================================
       23. EFECTO PARALLAX SUAVE
       ===================================================== */

    const hero =
        document.querySelector(".hero");

    if (hero && window.innerWidth > 768) {

        window.addEventListener("scroll", () => {

            const scroll =
                window.scrollY;

            if (scroll < 800) {

                hero.style.backgroundPosition =
                    `center ${scroll * 0.25}px`;

            }

        });

    }


    /* =====================================================
       24. INICIALIZACIÓN
       ===================================================== */

    document.body.classList.add("js-enabled");

});