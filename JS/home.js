const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");
  
  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
  
  // Body Scroll verhindern wenn Menü offen ist
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
  document.body.style.overflow = ''; // Scrollen dann wieder erlauben
});

// Menü schließen wenn außerhalb geklickt wird...
document.addEventListener('click', (e) => {
  if (!navLinks.contains(e.target) && !menuBtn.contains(e.target) && navLinks.classList.contains('open')) {
    navLinks.classList.remove("open");
    menuBtnIcon.setAttribute("class", "ri-menu-line");
    document.body.style.overflow = '';
  }
});

// Scroll Reveal Animationen
const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__video", {
  ...scrollRevealOption,
  origin: "right",
  delay: 1000
});

ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 500,
});

ScrollReveal().reveal(".header__content p", {
  ...scrollRevealOption,
  delay: 1000,
});

ScrollReveal().reveal(".header__content .bar", {
  ...scrollRevealOption,
  delay: 1500,
});

ScrollReveal().reveal(".cta-button-div", {
  ...scrollRevealOption,
  delay: 2000,
});

// Wenn das Video im Header vorhanden ist, automatisch abspielen
document.addEventListener('DOMContentLoaded', function() {
  const video = document.querySelector('.header__video video');
  if (video) {
    video.play().catch(error => {
      console.log('Video autoplay failed:', error);
    });
  }
});