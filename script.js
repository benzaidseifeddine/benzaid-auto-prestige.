document.addEventListener('DOMContentLoaded', function() {
    // Loader
    setTimeout(function() {
        const loader = document.querySelector('.loader');
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
    }, 1500);

    // Navigation mobile
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarMenu = document.querySelector('.navbar-menu');
    
    navbarToggler.addEventListener('click', function() {
        navbarMenu.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Fermer le menu mobile quand on clique sur un lien
    document.querySelectorAll('.navbar-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navbarMenu.classList.remove('active');
            navbarToggler.classList.remove('active');
        });
    });

    // Mode sombre/clair
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Vérifier le mode système
    if (prefersDarkScheme.matches) {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            this.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            this.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
    });

    // Vérifier le thème sauvegardé
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else if (currentTheme === 'light') {
        document.body.classList.remove('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    // Galerie d'images pour chaque marque
    document.querySelectorAll('.gallery-thumbs img').forEach(thumb => {
        thumb.addEventListener('click', function() {
            const mainImg = this.closest('.brand-gallery').querySelector('.gallery-main img');
            const thumbs = this.closest('.gallery-thumbs').querySelectorAll('img');
            
            // Retirer la classe active de toutes les miniatures
            thumbs.forEach(img => img.classList.remove('active'));
            
            // Ajouter la classe active à la miniature cliquée
            this.classList.add('active');
            
            // Changer l'image principale
            mainImg.src = this.src;
            mainImg.alt = this.alt;
            
            // Animation de transition
            mainImg.style.opacity = '0';
            setTimeout(() => {
                mainImg.style.opacity = '1';
            }, 100);
        });
    });

    // Animation au défilement
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.brand-card, .gallery-item, .contact-content > div');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialiser les éléments animés
    document.querySelectorAll('.brand-card, .gallery-item, .contact-content > div').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Déclencher l'animation au chargement et au défilement
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    // Bouton Back to Top
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Effet de défilement fluide pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Formulaire de contact
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Ici vous pouvez ajouter le code pour envoyer le formulaire
            // Par exemple avec Fetch API ou AJAX
            
            // Message de succès
            const successMessage = document.createElement('div');
            successMessage.className = 'alert success';
            successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Votre message a été envoyé avec succès !';
            contactForm.prepend(successMessage);
            
            // Réinitialiser le formulaire
            contactForm.reset();
            
            // Supprimer le message après 5 secondes
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    }

    // Formulaire newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            
            // Validation simple
            if (!emailInput.value || !emailInput.value.includes('@')) {
                emailInput.style.borderColor = 'var(--primary)';
                return;
            }
            
            // Ici vous pouvez ajouter le code pour traiter l'abonnement
            
            // Message de succès
            const successMessage = document.createElement('div');
            successMessage.className = 'alert success';
            successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Merci pour votre abonnement !';
            this.parentNode.insertBefore(successMessage, this.nextSibling);
            
            // Réinitialiser le formulaire
            this.reset();
            
            // Supprimer le message après 5 secondes
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    }

    // Effet de survol pour les cartes de modèles
    document.querySelectorAll('.model-card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const x = e.pageX - this.offsetLeft;
            const y = e.pageY - this.offsetTop;
            
            const centerX = this.offsetWidth / 2;
            const centerY = this.offsetHeight / 2;
            
            const angleX = (y - centerY) / 1000;
            const angleY = (centerX - x) / 1000;
            
            this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.1)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
});

// Initialiser les animations GSAP (optionnel - si vous voulez des animations plus avancées)
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    
    // Animation du logo
    gsap.from('.logo', {
        duration: 1.5,
        opacity: 0,
        y: -50,
        ease: 'power3.out'
    });
    
    // Animation du sous-titre
    gsap.from('.hero-subtitle', {
        duration: 1.5,
        opacity: 0,
        y: 50,
        delay: 0.5,
        ease: 'power3.out'
    });
    
    // Animation des boutons
    gsap.from('.hero-cta', {
        duration: 1,
        opacity: 0,
        y: 20,
        delay: 1,
        ease: 'power3.out'
    });
    
    // Animation des sections au défilement
    gsap.utils.toArray('.brand-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out'
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.carousel-v3');
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  let currentIndex = 0;
  let autoScroll = true;
  let interval;

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Mettre à jour les slides actives
    slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === currentIndex);
    });
    
    // Mettre à jour les points
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  }

  // Navigation avec les flèches
  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    nextSlide();
    resetAutoScroll();
  });

  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    prevSlide();
    resetAutoScroll();
  });

  // Navigation avec les points
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIndex = parseInt(dot.dataset.index);
      updateCarousel();
      resetAutoScroll();
    });
  });

  // Défilement automatique
  function startAutoScroll() {
    interval = setInterval(() => {
      if (autoScroll) nextSlide();
    }, 5000);
  }

  function resetAutoScroll() {
    clearInterval(interval);
    startAutoScroll();
  }

  // Gestion du survol
  carousel.addEventListener('mouseenter', () => {
    autoScroll = false;
  });

  carousel.addEventListener('mouseleave', () => {
    autoScroll = true;
  });

  // Initialisation
  startAutoScroll();
  updateCarousel();
});