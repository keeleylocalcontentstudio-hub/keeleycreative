const tabButtons = document.querySelectorAll('.tab-btn');
const panels = document.querySelectorAll('.tab-panel');
const sidebar = document.getElementById('sidebar');
const mobileMenu = document.getElementById('mobileMenu');

function openTab(tabName){
  tabButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tabName));
  panels.forEach(panel => panel.classList.toggle('active', panel.id === tabName));
  sidebar.classList.remove('open');
  window.scrollTo({top:0, behavior:'smooth'});
}

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => openTab(btn.dataset.tab));
});

document.querySelectorAll('.jump-work').forEach(btn => btn.addEventListener('click', () => openTab('work')));
document.querySelectorAll('.jump-contact').forEach(btn => btn.addEventListener('click', () => openTab('contact')));

mobileMenu.addEventListener('click', () => sidebar.classList.toggle('open'));

const filters = document.querySelectorAll('.work-filter');
const cards = document.querySelectorAll('.portfolio-card');

filters.forEach(filter => {
  filter.addEventListener('click', () => {
    const value = filter.dataset.filter;
    filters.forEach(btn => btn.classList.remove('active'));
    filter.classList.add('active');

    cards.forEach(card => {
      const show = value === 'all' || card.dataset.category === value;
      card.classList.toggle('hide', !show);
    });
  });
});

let countersStarted = false;
function startCounters(){
  if(countersStarted) return;
  countersStarted = true;
  document.querySelectorAll('[data-count]').forEach(counter => {
    const target = Number(counter.dataset.count);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 70));
    const timer = setInterval(() => {
      current += step;
      if(current >= target){
        current = target;
        clearInterval(timer);
      }
      counter.textContent = current.toLocaleString();
    }, 20);
  });
}

document.querySelector('[data-tab="results"]').addEventListener('click', startCounters);
