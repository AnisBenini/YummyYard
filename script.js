// Add this to your existing script
document.addEventListener('DOMContentLoaded', function() {
    // Handle all internal links (including footer links)
    const allInternalLinks = document.querySelectorAll('a[href^="#"]');
    
    allInternalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Only handle actual section links, not empty "#" links
            if (targetId && targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Get the document height before scrolling
                    const docHeightBefore = document.body.scrollHeight;
                    
                    // Scroll to the element with offset for the header
                    const headerHeight = 80; // Your header height
                    const targetPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = targetPosition + window.pageYOffset - headerHeight;
                    
                    // Perform the scroll
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Force layout recalculation to prevent blank space
                    setTimeout(function() {
                        // If we're near the bottom of the page, make sure we stay there
                        if (window.innerHeight + window.pageYOffset >= docHeightBefore - 50) {
                            window.scrollTo(0, document.body.scrollHeight);
                        }
                    }, 100);
                }
            }
        });
    });
});








// Add this to your existing script at the bottom of index.html
document.addEventListener('DOMContentLoaded', function() {
   
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function highlightNavOnScroll() {
        let scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('nav-link-home');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('nav-link-home');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavOnScroll);
    
    // Smooth scroll to sections with offset for header
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId !== '#') {
                    const targetSection = document.querySelector(targetId);
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});