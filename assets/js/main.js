/* ============================================================
   Marketing Madness — Portfolio
   Renders the episode grid and links each card to its viewer.
   Episode data mirrors PORTFOLIO_HANDOFF.md.
   ============================================================ */

const EPISODES = [
  { ep: "EP01", animal: "Leopard",    accent: "#8FE000" },
  { ep: "EP03", animal: "Cow",        accent: "#7CFF00" },
  { ep: "EP04", animal: "Crocodile",  accent: "#FF69B4" },
  { ep: "EP05", animal: "T-Rex",      accent: "#E8001C" },
  { ep: "EP06", animal: "Rhino",      accent: "#D4A017" },
  { ep: "EP07", animal: "Gorilla",    accent: "#FF1493" },
  { ep: "EP08", animal: "Tiger",      accent: "#FF4500" },
  { ep: "EP09", animal: "Cat",        accent: "#FF3300" },
  { ep: "EP10", animal: "Panda",      accent: "#5AC000" },
  { ep: "EP11", animal: "Bengal Cat", accent: "#FFB300" },
  { ep: "EP12", animal: "Elephant",   accent: "#BF00FF" },
  { ep: "EP13", animal: "Dinosaur",   accent: "#FF6600" },
  { ep: "EP14", animal: "Penguin",    accent: "#FF8C00" },
  { ep: "EP16", animal: "Bulldog",    accent: "#C41230" },
  { ep: "EP17", animal: "Polar Bear", accent: "#00E5CC" },
  { ep: "EP18", animal: "Tiger",      accent: "#7B00FF" },
  { ep: "EP19", animal: "Giraffe",    accent: "#E8003A" },
  { ep: "EP20", animal: "Gorilla",    accent: "#FF7700" },
  { ep: "EP32", animal: "Polar Bear", accent: "#00D4A0" },
  { ep: "EP45", animal: "Kangaroo",   accent: "#FF2D8A" },
];

function buildCard(item) {
  const card = document.createElement("a");
  card.className = "card";
  card.style.setProperty("--accent", item.accent);
  card.href = `episodes/${item.ep}.html`;
  card.setAttribute("aria-label", `Open ${item.ep} — ${item.animal}`);

  card.innerHTML = `
    <img class="card__cover" src="assets/covers/${item.ep}.jpg"
         alt="${item.ep} cover — ${item.animal}" loading="lazy" decoding="async" />
    <div class="card__body">
      <span class="card__badge">${item.ep}</span>
      <span class="card__open">Read episode →</span>
    </div>
    <span class="card__rule" aria-hidden="true"></span>
  `;
  return card;
}

function renderGrid() {
  const grid = document.getElementById("episode-grid");
  if (!grid) return;

  const fragment = document.createDocumentFragment();
  EPISODES.forEach((item) => fragment.appendChild(buildCard(item)));
  grid.appendChild(fragment);

  const count = document.getElementById("episode-count");
  if (count) {
    count.textContent = `${EPISODES.length} episodes`;
  }

  revealOnScroll(grid.querySelectorAll(".card"));
}

/* Stagger cards into view as they enter the viewport. */
function revealOnScroll(cards) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) {
    cards.forEach((c) => c.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const delay = Math.min(el.dataset.index * 40, 320);
        el.style.transitionDelay = `${delay}ms`;
        el.classList.add("is-visible");
        obs.unobserve(el);
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
  );

  cards.forEach((card, i) => {
    card.dataset.index = i;
    observer.observe(card);
  });
}

function setYear() {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
  renderGrid();
  setYear();
});
