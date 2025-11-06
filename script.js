document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({behavior: 'smooth'});
  });
});

const form = document.querySelector('form');
form.addEventListener('submit', () => {
  alert('Thank you for reaching out to XReach LLC! We will contact you soon.');
});
