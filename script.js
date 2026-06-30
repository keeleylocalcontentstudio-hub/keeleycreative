const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

const counters = document.querySelectorAll('[data-count]');
let countersStarted = false;
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersStarted) {
      countersStarted = true;
      counters.forEach(counter => {
        const target = Number(counter.dataset.count);
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 70));
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          counter.textContent = current.toLocaleString();
        }, 20);
      });
    }
  });
});
const resultsGrid = document.querySelector('.results-grid');
if (resultsGrid) counterObserver.observe(resultsGrid);

const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', e => {
  if (glow) {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  }
});
