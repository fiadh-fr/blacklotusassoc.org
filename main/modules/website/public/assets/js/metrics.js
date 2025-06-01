document.addEventListener("DOMContentLoaded", () => {
  fetch('/api/endpoint')
    .then(response => response.json())
    .then(data => {
      const observer = new IntersectionObserver(handleIntersect, { threshold: 0.5 });

      const elements = document.querySelectorAll('.numbers-item .new-h2');

      elements.forEach(el => observer.observe(el));

      function handleIntersect(entries) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target;

            if (!element.classList.contains('animated')) {
              const endValue = parseInt(data[element.dataset.type], 10);
              const showPlus = element.dataset.type === 'allGuildsTotal'; // Ajoute un "+" seulement pour "allGuildsTotal"
              animateNumber(element, endValue, showPlus);
              element.classList.add('animated'); // Marquer comme animé
            }
          }
        });
      }
    })
    .catch(error => console.error('Erreur lors de la récupération des données:', error));
});

function animateNumber(element, endValue, showPlus = false) {
  const duration = 3500;
  const startValue = 0;
  let startTime = null;

  function animationStep(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const currentValue = Math.floor(progress * (endValue - startValue) + startValue);

    element.textContent = (showPlus ? '+' : '') + formatNumber(currentValue);

    if (progress < 1) {
      requestAnimationFrame(animationStep);
    }
  }

  requestAnimationFrame(animationStep);
}

function formatNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
}