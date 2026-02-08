const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

const counters = document.querySelectorAll(".counter");
const runCounters = () => {
  counters.forEach((counter) => {
    const target = Number(counter.dataset.target);
    let current = 0;
    const increment = Math.max(1, Math.floor(target / 60));

    const tick = () => {
      current += increment;
      if (current >= target) {
        counter.textContent = target;
        return;
      }
      counter.textContent = current;
      requestAnimationFrame(tick);
    };
    tick();
  });
};

let countersStarted = false;
window.addEventListener("scroll", () => {
  if (countersStarted) return;
  const metrics = document.getElementById("metrics");
  if (metrics && metrics.getBoundingClientRect().top < window.innerHeight) {
    countersStarted = true;
    runCounters();
  }
});

window.addEventListener("load", () => {
  runCounters();
  document.querySelectorAll(".fade-in").forEach((el) => el.classList.add("show"));
});
