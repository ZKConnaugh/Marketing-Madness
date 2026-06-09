/* ============================================================
   Marketing Madness — Portfolio
   Renders the episode grid and links each card to its viewer.
   Accents are auto-extracted from each episode's --green CSS var.
   ============================================================ */

const EPISODES = [
  { ep: "EP01", accent: "#8FE000" },
  { ep: "EP02", accent: "#FF1493" },
  { ep: "EP03", accent: "#7CFF00" },
  { ep: "EP04", accent: "#FF69B4" },
  { ep: "EP05", accent: "#E8001C" },
  { ep: "EP06", accent: "#D4A017" },
  { ep: "EP07", accent: "#FF1493" },
  { ep: "EP08", accent: "#FF4500" },
  { ep: "EP09", accent: "#FF3300" },
  { ep: "EP10", accent: "#5AC000" },
  { ep: "EP11", accent: "#FFB300" },
  { ep: "EP12", accent: "#BF00FF" },
  { ep: "EP13", accent: "#FF6600" },
  { ep: "EP14", accent: "#FF8C00" },
  { ep: "EP15", accent: "#00E5FF" },
  { ep: "EP16", accent: "#C41230" },
  { ep: "EP17", accent: "#00E5CC" },
  { ep: "EP18", accent: "#7B00FF" },
  { ep: "EP19", accent: "#E8003A" },
  { ep: "EP20", accent: "#FF7700" },
  { ep: "EP21", accent: "#F5C500" },
  { ep: "EP22", accent: "#00E676" },
  { ep: "EP23", accent: "#00E5CC" },
  { ep: "EP24", accent: "#FF2D8A" },
  { ep: "EP25", accent: "#7CFF00" },
  { ep: "EP26", accent: "#E8001C" },
  { ep: "EP27", accent: "#FF4500" },
  { ep: "EP28", accent: "#FF2D8A" },
  { ep: "EP29", accent: "#FFB300" },
  { ep: "EP30", accent: "#00C8A0" },
  { ep: "EP31", accent: "#FF2D8A" },
  { ep: "EP32", accent: "#00D4A0" },
  { ep: "EP33", accent: "#FF2D8A" },
  { ep: "EP34", accent: "#D4A017" },
  { ep: "EP35", accent: "#FFCC00" },
  { ep: "EP36", accent: "#FF6200" },
  { ep: "EP37", accent: "#00AAFF" },
  { ep: "EP38", accent: "#7FFF00" },
  { ep: "EP39", accent: "#FFE000" },
  { ep: "EP40", accent: "#E8651A" },
  { ep: "EP41", accent: "#00E5CC" },
  { ep: "EP42", accent: "#FF6200" },
  { ep: "EP43", accent: "#F5A623" },
  { ep: "EP44", accent: "#00C8FF" },
  { ep: "EP45", accent: "#FF2D8A" },
  { ep: "EP46", accent: "#FF6200" },
  { ep: "EP47", accent: "#E8001C" },
  { ep: "EP48", accent: "#FF4DA6" },
  { ep: "EP49", accent: "#00C8FF" },
];

function buildCard(item) {
  const card = document.createElement("a");
  card.className = "card";
  card.style.setProperty("--accent", item.accent);
  card.href = `episodes/${item.ep}.html`;
  card.setAttribute("aria-label", `Open ${item.ep}`);

  card.innerHTML = `
    <img class="card__cover" src="assets/covers/${item.ep}.jpg"
         alt="Marketing Madness ${item.ep} cover" loading="lazy" decoding="async" />
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

/* Parallax: the hero collage follows the scroll at a slower rate. */
function initHeroParallax() {
  const bg = document.querySelector(".hero__bg");
  const hero = document.querySelector(".hero");
  if (!bg || !hero) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let ticking = false;
  const update = () => {
    const y = window.scrollY;
    // only update while the hero is still on screen
    if (y <= hero.offsetHeight + 100) {
      bg.style.setProperty("--hero-shift", (y * 0.35).toFixed(1) + "px");
    }
    ticking = false;
  };
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );
  update();
}

/* Remember the grid scroll position so "Go back" from an episode returns
   the visitor to exactly where they were. The browser's back/forward cache
   handles this when available; this is the fallback when the page reloads. */
function initScrollMemory() {
  const KEY = "mm-grid-scroll";
  let t;
  window.addEventListener(
    "scroll",
    () => {
      clearTimeout(t);
      t = setTimeout(() => {
        try {
          sessionStorage.setItem(KEY, String(window.scrollY));
        } catch (e) {}
      }, 120);
    },
    { passive: true }
  );

  // Only restore on a back/forward navigation (not a fresh visit or logo-home).
  let navType = "navigate";
  try {
    const nav = performance.getEntriesByType("navigation")[0];
    if (nav) navType = nav.type;
  } catch (e) {}
  if (navType !== "back_forward") return;

  let saved = null;
  try {
    saved = sessionStorage.getItem(KEY);
  } catch (e) {}
  if (saved === null) return;
  const y = parseInt(saved, 10);
  if (!y) return;
  // wait for the grid to lay out before restoring
  requestAnimationFrame(() =>
    requestAnimationFrame(() => window.scrollTo(0, y))
  );
}

document.addEventListener("DOMContentLoaded", () => {
  renderGrid();
  setYear();
  initHeroParallax();
  initScrollMemory();
});
