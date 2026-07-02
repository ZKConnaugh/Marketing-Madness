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
  card.id = `card-${item.ep}`;
  card.style.setProperty("--accent", item.accent);
  card.href = `episodes/${item.ep}.html`;
  card.setAttribute("aria-label", `Open ${item.ep}`);

  card.innerHTML = `
    <img class="card__cover" src="assets/covers/${item.ep}.avif"
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

/* ============================================================
   Immersive 3D cover ring — the camera sits inside a cylinder of
   all 49 covers. Drag to spin (with inertia), slow idle drift,
   click a cover for a fly-out preview with a Read link.
   Reuses the grid's cover URLs, so nothing downloads twice.
   ============================================================ */
function initCoverRing() {
  const hero = document.querySelector(".hero");
  const viewport = document.getElementById("ring-viewport");
  const ring = document.getElementById("cover-ring");
  if (!hero || !viewport || !ring) return;

  const N = EPISODES.length;
  const STEP = 360 / N;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----- build the covers ----- */
  const frag = document.createDocumentFragment();
  EPISODES.forEach((item, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "ring__cover";
    btn.tabIndex = -1; // the grid below is the keyboard/AT path
    btn.style.setProperty("--i", i);
    btn.style.setProperty("--po", (i % 2) * 12 + "px");
    btn.dataset.ep = item.ep;
    btn.dataset.accent = item.accent;
    const img = document.createElement("img");
    img.src = `assets/covers/${item.ep}.avif`;
    img.alt = "";
    img.decoding = "async";
    img.draggable = false;
    img.addEventListener("load", () => img.classList.add("is-loaded"), {
      once: true,
    });
    btn.appendChild(img);
    frag.appendChild(btn);
  });
  ring.appendChild(frag);
  const covers = ring.children;

  /* ----- geometry (kept in sync with the CSS vars) ----- */
  let P = 700; // camera distance (perspective)
  let R = 1250; // cylinder radius
  const readGeometry = () => {
    const cs = getComputedStyle(hero);
    R = parseFloat(cs.getPropertyValue("--ring-r")) || R;
    P = parseFloat(cs.getPropertyValue("--ring-persp")) || P;
  };
  readGeometry();
  window.addEventListener("resize", readGeometry);

  /* ----- fly-out preview ----- */
  const overlay = document.createElement("div");
  overlay.className = "ring-preview";
  overlay.hidden = true;
  overlay.innerHTML = `
    <div class="ring-preview__card">
      <button class="ring-preview__close" type="button" aria-label="Close preview">✕</button>
      <img class="ring-preview__img" alt="" decoding="async" />
      <span class="ring-preview__badge"></span>
      <a class="ring-preview__read">Read episode →</a>
    </div>`;
  document.body.appendChild(overlay);
  let previewOpen = false;
  let overlayTimer;

  function openPreview(ep, accent) {
    overlay.style.setProperty("--accent", accent);
    const img = overlay.querySelector(".ring-preview__img");
    img.src = `assets/covers/${ep}.avif`;
    img.alt = `Marketing Madness ${ep} cover`;
    overlay.querySelector(".ring-preview__badge").textContent = ep;
    overlay.querySelector(".ring-preview__read").href = `episodes/${ep}.html`;
    clearTimeout(overlayTimer);
    overlay.hidden = false;
    requestAnimationFrame(() => overlay.classList.add("is-open"));
    previewOpen = true;
  }

  function closePreview() {
    overlay.classList.remove("is-open");
    previewOpen = false;
    overlayTimer = setTimeout(() => {
      overlay.hidden = true;
    }, 320);
  }

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay || e.target.closest(".ring-preview__close")) {
      closePreview();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && previewOpen) closePreview();
  });

  /* ----- drag to spin, with inertia ----- */
  const SENS = 0.1; // degrees per pixel of drag
  let rot = 0;
  let vel = 0; // degrees per second
  let dragging = false;
  let lastX = 0;
  let lastMoveT = 0;
  let moved = 0;
  let lastInteract = 0;

  hero.addEventListener("pointerdown", (e) => {
    if (previewOpen || e.button !== 0) return;
    dragging = true;
    moved = 0;
    vel = 0;
    lastX = e.clientX;
    lastMoveT = performance.now();
    lastInteract = lastMoveT;
    hero.classList.add("is-dragging");
  });

  window.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const now = performance.now();
    const dx = e.clientX - lastX;
    const dt = Math.max(now - lastMoveT, 1) / 1000;
    lastX = e.clientX;
    lastMoveT = now;
    moved += Math.abs(dx);
    /* drag right pulls the wall in front of you to the right (panorama feel) */
    rot -= dx * SENS;
    vel = vel * 0.7 + (-dx * SENS / dt) * 0.3;
    lastInteract = now;
  });

  const endDrag = () => {
    if (!dragging) return;
    dragging = false;
    hero.classList.remove("is-dragging");
    lastInteract = performance.now();
  };
  window.addEventListener("pointerup", endDrag);
  window.addEventListener("pointercancel", endDrag);

  /* a real drag must not fire the click underneath it */
  hero.addEventListener(
    "click",
    (e) => {
      if (moved > 8) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      const btn = e.target.closest(".ring__cover");
      if (btn) openPreview(btn.dataset.ep, btn.dataset.accent);
    },
    true
  );

  /* ----- animation loop: one rotateY per frame + cull what's behind you ----- */
  const IDLE_SPEED = 2.2; // deg/sec drift when nobody is touching it
  const MAX_VEL = 480;
  let prevT = performance.now();
  let lastCullRot = -1e9;

  function frame(t) {
    const dt = Math.min((t - prevT) / 1000, 0.05);
    prevT = t;

    if (!dragging) {
      vel = Math.max(-MAX_VEL, Math.min(MAX_VEL, vel));
      rot += vel * dt;
      vel *= Math.pow(0.1, dt); // exponential friction
      if (Math.abs(vel) < 0.5) vel = 0;
      const idle = !reduce && !previewOpen && t - lastInteract > 2500;
      if (idle && vel === 0) rot += IDLE_SPEED * dt;
    }

    ring.style.transform = `rotateY(${rot}deg)`;

    /* covers behind the camera would project as mirrored smears — hide them.
       Also apply light depth fog so the far wall reads as far away. */
    if (Math.abs(rot - lastCullRot) > 0.15) {
      lastCullRot = rot;
      for (let i = 0; i < N; i++) {
        const a = (((i * STEP + rot) % 360) + 360) % 360;
        const z = -R * Math.cos((a * Math.PI) / 180); // + is toward the camera
        const el = covers[i];
        if (z > P - 80) {
          el.style.visibility = "hidden";
        } else {
          el.style.visibility = "visible";
          const depth = (z + R) / (P - 80 + R); // 0 = far wall, 1 = at camera
          el.style.opacity = (0.72 + 0.28 * depth).toFixed(3);
        }
      }
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
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

/* "Back to episode one" — smooth-scroll up to the start of the grid. */
function initBackToTop() {
  const btn = document.querySelector(".back-to-top");
  if (!btn) return;
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const ep = document.getElementById("episodes");
    if (ep) ep.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* When returning from an episode via "Go back to magazines", scroll the grid
   to the episode the visitor just read (set in sessionStorage by the episode). */
function initReturnToEpisode() {
  let ep = null;
  try {
    ep = sessionStorage.getItem("mm-return-ep");
    if (ep) sessionStorage.removeItem("mm-return-ep");
  } catch (e) {}
  if (!ep) return;
  const card = document.getElementById("card-" + ep);
  if (!card) return;
  requestAnimationFrame(() =>
    requestAnimationFrame(() => card.scrollIntoView({ block: "center" }))
  );
}

document.addEventListener("DOMContentLoaded", () => {
  renderGrid();
  setYear();
  initCoverRing();
  initScrollMemory();
  initBackToTop();
  initReturnToEpisode();
});
