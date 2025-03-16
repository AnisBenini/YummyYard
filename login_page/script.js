function goToMainPage() {
  // Navigate to the main page when logo is clicked
  window.location.href = '../index.html';
}


document.addEventListener('DOMContentLoaded', function() {
  /**
   * Carousel functionality
   */
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  let currentSlide = 0;
  const slideCount = slides.length;
  let slideInterval;
  
  // Show slide function
  function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => {
      slide.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    // Show the current slide and activate dot
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    
    currentSlide = index;
  }
  
  // Event for previous button
  prevBtn.addEventListener('click', function() {
    let newIndex = currentSlide - 1;
    if (newIndex < 0) {
      newIndex = slideCount - 1;
    }
    showSlide(newIndex);
  });
  
  // Event for next button
  nextBtn.addEventListener('click', function() {
    let newIndex = currentSlide + 1;
    if (newIndex >= slideCount) {
      newIndex = 0;
    }
    showSlide(newIndex);
  });
  
  // Event for dots
  dots.forEach(dot => {
    dot.addEventListener('click', function() {
      const slideIndex = parseInt(this.getAttribute('data-slide'));
      showSlide(slideIndex);
    });
  });
  
  // Auto slide change
  function autoSlide() {
    let newIndex = (currentSlide + 1) % slideCount;
    showSlide(newIndex);
  }
  
  // Start auto sliding
  function startAutoSlide() {
    // Clear any existing interval first
    clearInterval(slideInterval);
    // Set new interval
    slideInterval = setInterval(autoSlide, 5000);
  }
  
  // Stop auto sliding
  function stopAutoSlide() {
    clearInterval(slideInterval);
  }
  
  // Start auto sliding on page load
  startAutoSlide();
  
  // Stop auto sliding when interacting with the carousel
  document.querySelector('.carousel').addEventListener('mouseenter', stopAutoSlide);
  
  // Resume auto sliding when mouse leaves
  document.querySelector('.carousel').addEventListener('mouseleave', startAutoSlide);

  // Touch support for carousel
  let touchStartX = 0;
  let touchEndX = 0;
  
  const carousel = document.querySelector('.carousel');
  
  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
  
  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      // Swipe left
      nextBtn.click();
    } else if (touchEndX > touchStartX + 50) {
      // Swipe right
      prevBtn.click();
    }
  }
  
  /**
   * Login form functionality
   */
  const loginForm = document.getElementById('loginForm');
  const usernameField = document.getElementById('usernameField');
  const passwordField = document.getElementById('passwordField');
  const togglePassword = document.getElementById('togglePassword');
  const loginButton = document.querySelector('.login-button');
  const rememberMe = document.getElementById('rememberMe');
  const strengthBars = document.querySelectorAll('.strength-bar');
  
  // Password visibility toggle
  if (togglePassword) {
    togglePassword.addEventListener('click', function() {
      const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordField.setAttribute('type', type);
      
      // Toggle eye icon
      const icon = this.querySelector('i');
      if (type === 'text') {
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      } else {
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      }
    });
  }
  
  // Function to validate the username field
  function validateUsername() {
    const usernameParent = usernameField.parentElement;
    
    if (!usernameField.value.trim()) {
      usernameParent.classList.add('error');
      usernameParent.classList.add('empty');
      return false;
    } else {
      usernameParent.classList.remove('error');
      usernameParent.classList.remove('empty');
      return true;
    }
  }
  
  // Function to validate the password field
  function validatePassword() {
    const passwordParent = passwordField.parentElement;
    
    if (!passwordField.value.trim()) {
      passwordParent.classList.add('error');
      passwordParent.classList.add('empty');
      passwordParent.classList.remove('invalid');
      return false;
    } else if (passwordField.value.length < 8) {
      passwordParent.classList.add('error');
      passwordParent.classList.add('invalid');
      passwordParent.classList.remove('empty');
      return false;
    } else {
      passwordParent.classList.remove('error');
      passwordParent.classList.remove('empty');
      passwordParent.classList.remove('invalid');
      return true;
    }
  }
  
  // Add focus and blur event listeners for real-time validation
  usernameField.addEventListener('blur', validateUsername);
  passwordField.addEventListener('blur', validatePassword);
  
  // Remove error styling when user starts typing
  usernameField.addEventListener('input', function() {
    if (usernameField.value.trim()) {
      usernameField.parentElement.classList.remove('error');
      usernameField.parentElement.classList.remove('empty');
    }
  });
  
  // Password strength checker
  function checkPasswordStrength(password) {
    // Reset all strength bars
    strengthBars.forEach(bar => {
      bar.className = 'strength-bar';
    });
    
    if (!password) return;
    
    // Criteria
    const hasLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    
    let strength = 0;
    if (hasLength) strength++;
    if (hasUpperCase && hasLowerCase) strength++;
    if (hasNumbers) strength++;
    if (hasSpecialChars) strength++;
    
    // Update UI based on strength
    for (let i = 0; i < strength; i++) {
      if (i === 0) strengthBars[i].classList.add('weak');
      if (i === 1) strengthBars[i].classList.add('fair');
      if (i === 2) strengthBars[i].classList.add('good');
      if (i === 3) strengthBars[i].classList.add('strong');
    }
  }
  
  passwordField.addEventListener('input', function() {
    const passwordValue = passwordField.value.trim();
    const passwordParent = passwordField.parentElement;
    
    // Check password strength
    checkPasswordStrength(passwordValue);
    
    if (passwordValue) {
      passwordParent.classList.remove('empty');
      
      if (passwordValue.length >= 8) {
        passwordParent.classList.remove('error');
        passwordParent.classList.remove('invalid');
      } else {
        passwordParent.classList.add('error');
        passwordParent.classList.add('invalid');
      }
    } else {
      passwordParent.classList.remove('invalid');
    }
  });
  
  // Check for previously stored username if Remember Me was checked
  function loadSavedUsername() {
    const savedUsername = localStorage.getItem('savedUsername');
    const rememberChecked = localStorage.getItem('rememberMe') === 'true';
    
    if (savedUsername && rememberChecked) {
      usernameField.value = savedUsername;
      rememberMe.checked = true;
    }
  }
});