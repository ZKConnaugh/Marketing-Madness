// ZKFM — "Tune In": a vertical scroll-journey through the 21-day Aztec campaign.
// Every video is a click-to-play thumbnail; days flow in 3D; frequencies fold in.
// Video IDs (for click-to-play) live in VIDEO_IDS, keyed "D{day}V{video}".
// Thumbnails: /assets/zkfm/thumbs/d{DD}v{N}.avif  ·  Posters: /assets/zkfm/posters/

const X_ACCOUNT = "https://x.com/ZKFMradio";

// YouTube video {id, title} per D{day}V{video} — from the channel scrape.
// Missing entries fall back to the frequency playlist.
const VIDEO_IDS = {
  D1V1: { id: "2Y_pZ86aaEQ", t: "Ethereum, but make it PRIVATE." },
  D1V2: { id: "l1idUdit-Vs", t: "A Private World Computer | Aztec Network" },
  D1V3: { id: "5V-rfP6ZHbo", t: "Privacy - what's the norm?" },
  D2V1: { id: "LVPoM7kT1_M", t: "Without privacy, Ethereum can't be everything." },
  D2V2: { id: "i4vilhJfGHQ", t: "Privacy is IN. \"I told you!\"" },
  D2V3: { id: "BCGJtUaVQ0k", t: "How did Aztec become a Privacy Project?" },
  D3V1: { id: "B7l4B1rEbX0", t: "Product FIRST always. | Aztec Network" },
  D3V2: { id: "wO15JlNrGgY", t: "Crypto is STUCK. Everything is the same!" },
  D3V3: { id: "GVtX-jcOVpc", t: "Aztec Network Blocktimes | Current & Future" },
  D4V1: { id: "d8vtkXItlUc", t: "Professional Finance NEEDS Privacy | Aztec Network" },
  D4V2: { id: "B2uzntKJqCA", t: "Public Trader LOSES $100M | We NEED Privacy!" },
  D4V3: { id: "dpzPWqGIvdQ", t: "L2's are CENTRALIZED! Run by sequencer fees." },
  D5V1: { id: "3HJlwDH56jg", t: "Private Identity REQUIRES Programmable Privacy!" },
  D5V2: { id: "4TPwM6-O1Vc", t: "Dear Regulators, ZK works. use it!" },
  D5V3: { id: "l1q-mmnIGcc", t: "How much are transactions on Aztec Protocol?" },
  D6V1: { id: "YLMdQb2mBsM", t: "Without Privacy Crypto is just a Surveillance Network!" },
  D6V2: { id: "cXAilrGO05E", t: "Explaining the Crypto Privacy HYPE" },
  D6V3: { id: "XqWL9nCsnGo", t: "Aztec Network has PUBLIC & PRIVATE functions." },
  D7V1: { id: "oezt49Ubfso", t: "Regulators Protect the ELITE!" },
  D7V2: { id: "lvgOZ5WrTsY", t: "A better way to MEET compliance!" },
  D7V3: { id: "utga5gUgHq4", t: "$AZTEC tokens distributed ON-CHAIN!" },
  D8V1: { id: "sGWO2UTIkD8", t: "Explaining ZKPassport | Just SCAN your Passport!" },
  D8V2: { id: "YhQJbSmV9ac", t: "How does IDENTITY work on Aztec Network?" },
  D8V3: { id: "_4WztJY3CBo", t: "Where can you verify @ZKPassport proofs?" },
  D9V1: { id: "x-3H1reTqMQ", t: "Ethereum Transactions, Airport Security!" },
  D9V2: { id: "OVdMRRU0x3g", t: "Swiss Regulators ACCEPT a ZKP for sanctions check." },
  D9V3: { id: "8OADwcDMr9I", t: "Protocol-Level Privacy COMPOUNDS!" },
  D10V1: { id: "CvzfVf0xTX0", t: "Thousands of Transactions - ONE PROOF!" },
  D10V2: { id: "gwY49QkAVQo", t: "Aztec's Architecture is so DIFFERENT!" },
  D10V3: { id: "3Hxt69rlTJ0", t: "Privacy mode activated. Proof required." },
  D11V1: { id: "6UEINUWqB1I", t: "Why is Aztec Network so SLOW?" },
  D11V2: { id: "K8Am-pXtbVM", t: "How's Aztec different from Zcash?" },
  D12V1: { id: "ZzGLYh5Fs5o", t: "Ethereum's EVM Wasn't Built for Privacy!" },
  D12V2: { id: "jM-XN7ZRVu4", t: "How does Noir create ZK circuits?" },
  D12V3: { id: "1U_ZOogi6_o", t: "You CAN'T retrofit Privacy!" },
  D13V1: { id: "J5OcR6FckpY", t: "Why did Aztec build Noir?" },
  D13V2: { id: "935KKhcAkcM", t: "Example: Private Compliant Trades on Aztec" },
  D13V3: { id: "07t9lMnIebQ", t: "Aztec Network's Fee Model" },
  D14V1: { id: "wUaUJJCH4Gs", t: "Aztec rewrote their protocol in Noir!" },
  D14V2: { id: "kSSMCY4dVFU", t: "Why did Aztec build an L2?" },
  D14V3: { id: "237SSXSK8s4", t: "Privacy: Aztec vs Kohaku" },
  D16V1: { id: "xsuwlq549As", t: "Holistic Identity is the FUTURE. What is it?" },
  D16V2: { id: "KzORwjYdGoU", t: "What is the $AZTEC token used for?" },
  D16V3: { id: "QQgSynHqUt8", t: "STAKING on Aztec" },
  D16V4: { id: "uI4hJzlWwHs", t: "Why NO $AZTEC Airdrop?" },
  D17V1: { id: "jjS_Sv8Zq8I", t: "Privacy & Pressure from Nation States" },
  D17V2: { id: "jw0CNXOUsSk", t: "A Privacy Layer for Ethereum" },
  D17V3: { id: "gmVPzKl_X2g", t: "Neutral Private Blockspace on Aztec" },
  D17V4: { id: "xxpziYaOgIA", t: "No backdoors in Aztec. EVER." },
  D18V1: { id: "kC4IUwYPYlU", t: "Explaining Aztec's Cross-Chain Interoperability" },
  D18V2: { id: "w3tU9gjgXjg", t: "Need Private Trades? Aztec Network" },
  D18V3: { id: "FgRBeWilKEI", t: "How would a Dbank work on Aztec?" },
  D18V4: { id: "DtHXuF2T2gE", t: "Aztec's short-term value prop" },
  D19V1: { id: "9cYl6qxqd8M", t: "Apps that CAN'T exist anywhere else. Aztec Network" },
  D19V2: { id: "BqfFi-_tXFw", t: "Blockchain Under-collateralized Lending" },
  D19V3: { id: "i0GcrCCLOwE", t: "Why did you build Aztec Network?" },
  D20V1: { id: "b5vfaAmBK-w", t: "Aztec Network's Goals" },
  D20V2: { id: "qbzEVNMBiLk", t: "What is Aztec's Zac Excited About?" },
  D20V3: { id: "6RVggazBWBY", t: "Are you bullish on zkGaming?" },
  D20V4: { id: "najVmP5aMkQ", t: "Aztec Network's Institutional Plan" },
  D21V1: { id: "QWOhal0XuoU", t: "Aztec Protocol - The First Stage 2 Rollup" },
  D21V2: { id: "1jwfbfQZ3JY", t: "ZKID - The Tech is Ready NOW!" },
  D21V3: { id: "7hChDUchSs8", t: "Privacy shouldn't be OWNED by anyone!" },
};

// Frequency playlists (fallback when a specific video ID isn't known yet).
const FREQUENCIES = [
  {
    n: "01", code: "ZKFM.254", name: "Ground Zero", range: "Days 1–7",
    playlist: "PLTHRlgUgnNloi1NROhgMJLjajD2kcrQgW",
    blurb: "Why privacy. Transparent chains didn't disrupt surveillance — they perfected it. Aztec is the off switch.",
    fold: "tune", vibe: "ground",
    days: [
      { day: 1, title: "Privacy Came to Ethereum", videos: [1, 2, 3], x: "https://x.com/ZKFMradio/status/2056404447811731512" },
      { day: 2, title: "Surveillance Machines", videos: [1, 2, 3], x: "https://x.com/ZKFMradio/status/2056812130452574327" },
      { day: 3, title: "Privacy as the Foundation", videos: [1, 2, 3], x: "https://x.com/ZKFMradio/status/2057174520805687672" },
      { day: 4, title: "Five Years Frozen", videos: [1, 2, 3], x: "https://x.com/ZKFMradio/status/2057552006626079138" },
      { day: 5, title: "One Toolkit, Three Problems", videos: [1, 2, 3], x: "https://x.com/ZKFMradio/status/2057914396853276821" },
      { day: 6, title: "The Off Switch", videos: [1, 2, 3], x: "https://x.com/ZKFMradio/status/2058276781669646621" },
      { day: 7, title: "ZkPassport", videos: [1, 2, 3], x: "https://x.com/ZKFMradio/status/2058639170340266479" },
    ],
  },
  {
    n: "02", code: "ZKFM.0", name: "Nullify", range: "Days 8–14",
    playlist: "PLXEFNhKobln4",
    blurb: "The tech. Identity without exposure, Noir, and composable privacy built in at the protocol level.",
    fold: "flip", vibe: "nullify",
    days: [
      { day: 8, title: "Prove Who You Are", videos: [1, 2, 3], x: "https://x.com/ZKFMradio/status/2058986457214140588" },
      { day: 9, title: "A Passport to DeFi", videos: [1, 2, 3], x: "https://x.com/ZKFMradio/status/2059363946490933673" },
      { day: 10, title: "Two Modes", videos: [1, 2, 3], x: "https://x.com/ZKFMradio/status/2059726335434444856" },
      { day: 11, title: "That's What L3s Are For", videos: [1, 2], briefing: false, x: "https://x.com/ZKFMradio/status/2060088725561131267" },
      { day: 12, title: "Composable Privacy", videos: [1, 2, 3], x: "https://x.com/ZKFMradio/status/2060451110306160732" },
      { day: 13, title: "One Transaction", videos: [1, 2, 3], x: "https://x.com/ZKFMradio/status/2060813496359825556" },
      { day: 14, title: "Dog Food or Don't Ship", videos: [1, 2, 3], x: "https://x.com/ZKFMradio/status/2061160785670214144" },
    ],
  },
  {
    n: "03", code: "ZKFM.128", name: "Witness This", range: "Days 15–21",
    playlist: "PLQsApsP5iZuQ",
    blurb: "Product and endgame. The first fully decentralised privacy L2 — the token, the apps, the world.",
    fold: "cube", vibe: "witness",
    days: [
      { day: 15, title: "CLAIRE", special: true, videos: [], x: "https://x.com/ZKFMradio/status/2061523549823602992",
        points: "A special celebrating crypto marketer Claire Kart (@clairekart) — the rebrand, marketing privacy for founders, and the CMO every builder needs." },
      { day: 16, title: "Stake It. Use It. Shape It.", videos: [1, 2, 3, 4], x: "https://x.com/ZKFMradio/status/2061553373422461353" },
      { day: 17, title: "Over Their Dead Bodies", videos: [1, 2, 3, 4], x: "https://x.com/ZKFMradio/status/2062172457067299101" },
      { day: 18, title: "Route Through Aztec", videos: [1, 2, 3, 4], x: "https://x.com/ZKFMradio/status/2062263049634079049" },
      { day: 19, title: "Apps That Can't Exist", videos: [1, 2, 3], x: "https://x.com/ZKFMradio/status/2062972727036899775" },
      { day: 20, title: "Web3 First. Then the World.", videos: [1, 2, 3, 4], x: "https://x.com/ZKFMradio/status/2063335116051759122" },
      { day: 21, title: "Stage 2. No Training Wheels.", videos: [1, 2, 3], x: "https://x.com/ZKFMradio/status/2063622005002215836" },
    ],
  },
];

const pad = (n) => String(n).padStart(2, "0");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// ---- Build the DOM ---------------------------------------------------------

function videoCard(day, v) {
  const dd = pad(day);
  const key = `D${day}V${v}`;
  const meta = VIDEO_IDS[key] || {};
  const id = meta.id || "";
  const t = esc(meta.t || `Day ${day} · Video ${v}`);
  return `
    <button class="vid" data-vid="${id}" data-key="${key}" title="${t}" aria-label="Play: ${t}">
      <img class="vid__thumb" src="/assets/zkfm/thumbs/d${dd}v${v}.avif" alt="ZKFM Day ${day} Video ${v} — ${t}" loading="lazy" />
      <span class="vid__play" aria-hidden="true"></span>
      <span class="vid__tag">D${day} · V${v}</span>
    </button>`;
}

function dayScene(d, freq) {
  const dd = pad(d.day);
  if (d.special) {
    return `
      <section class="scene scene--special" data-day="${d.day}">
        <div class="scene__head">
          <span class="scene__num">DAY ${dd}</span>
          <span class="scene__special">◉ Special Broadcast</span>
          <h3 class="scene__title">${d.title}</h3>
        </div>
        <p class="scene__points">${d.points || ""}</p>
        <a class="scene__x" href="${d.x || X_ACCOUNT}" target="_blank" rel="noopener noreferrer">Watch on X →</a>
      </section>`;
  }
  const cards = d.videos.map((v) => videoCard(d.day, v)).join("");
  const briefing = d.briefing === false ? "" : `
        <figure class="poster poster--take">
          <figcaption>The Download</figcaption>
          <img src="/assets/zkfm/posters/day${dd}-info.avif" alt="ZKFM Day ${d.day} briefing — ${esc(d.title)}" loading="lazy" />
        </figure>`;
  return `
    <section class="scene" data-day="${d.day}">
      <div class="scene__head">
        <span class="scene__num">DAY ${dd}</span>
        <h3 class="scene__title">${d.title}</h3>
        <a class="scene__x" href="${d.x || X_ACCOUNT}" target="_blank" rel="noopener noreferrer">Watch on X →</a>
      </div>
      <div class="scene__posters">
        <figure class="poster poster--lineup">
          <figcaption>On Air Today</figcaption>
          <img src="/assets/zkfm/posters/day${dd}-lineup.avif" alt="ZKFM Day ${d.day} lineup — ${esc(d.title)}" loading="lazy" />
        </figure>${briefing}
      </div>
      <div class="scene__videos" data-count="${d.videos.length}">${cards}</div>
    </section>`;
}

function frequencyAct(f) {
  return `
    <section class="act" id="freq-${f.n}" data-fold="${f.fold}" data-vibe="${f.vibe}">
      <div class="act__intro">
        <div class="act__card">
          <span class="act__label">FREQUENCY ${f.n} · ${f.code}</span>
          <h2 class="act__name">${f.name}</h2>
          <span class="act__range">${f.range}</span>
          <p class="act__blurb">${f.blurb}</p>
          <span class="act__cue">tune in ↓</span>
        </div>
      </div>
      <div class="act__scenes">${f.days.map((d) => dayScene(d, f)).join("")}</div>
    </section>`;
}

document.getElementById("frequencies").innerHTML = FREQUENCIES.map(frequencyAct).join("");
const yEl = document.getElementById("year");
if (yEl) yEl.textContent = new Date().getFullYear();

// ---- Hero 3D collage — continuous fly-through of every asset ----------------

(function buildCollage() {
  const host = document.getElementById("collage");
  if (!host) return;

  const pool = [];
  Object.keys(VIDEO_IDS).forEach((k) => {
    const m = k.match(/D(\d+)V(\d+)/);
    pool.push({ src: `/assets/zkfm/thumbs/d${pad(+m[1])}v${m[2]}.avif`, w: 240 });
  });
  FREQUENCIES.forEach((f) => f.days.forEach((d) => {
    if (!d.special) pool.push({ src: `/assets/zkfm/posters/day${pad(d.day)}-lineup.avif`, w: 156 });
  }));
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  const field = document.createElement("div");
  field.className = "collage__field";
  host.appendChild(field);

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const gsap = window.gsap;
  const N = Math.min(reduce ? 16 : 36, pool.length);
  const tiles = [];
  for (let i = 0; i < N; i++) {
    const a = pool[i % pool.length];
    const el = document.createElement("div");
    el.className = "ctile";
    el.style.width = a.w + "px";
    el.style.opacity = "0";
    el.innerHTML = `<img src="${a.src}" alt="" loading="lazy" decoding="async" />`;
    field.appendChild(el);
    tiles.push(el);
  }

  const spread = () => ({
    x: (Math.random() * 1.7 - 0.85) * window.innerWidth,
    y: (Math.random() * 1.6 - 0.8) * window.innerHeight,
    rot: Math.random() * 22 - 11,
  });

  // Reduced motion / no GSAP: a still 3D scatter.
  if (!gsap || reduce) {
    tiles.forEach((el) => {
      const s = spread();
      const z = -300 + Math.random() * 360;
      const depth = (z + 300) / 660;
      el.style.transform =
        `translate(-50%,-50%) translate3d(${s.x * 0.45}px,${s.y * 0.45}px,${z}px) rotateY(${s.rot}deg)`;
      el.style.opacity = (0.3 + depth * 0.5).toFixed(2);
      el.style.filter = `blur(${((1 - depth) * 1.6).toFixed(1)}px)`;
    });
    return;
  }

  // Continuous fly-through: each tile travels from deep back toward the camera,
  // fades in far, fades out as it passes, then recycles to a new spot. Seeded at
  // a random progress so the field is full immediately.
  gsap.set(tiles, { xPercent: -50, yPercent: -50, force3D: true });
  tiles.forEach((el) => {
    (function loop(seed) {
      const s = spread();
      const dur = 18 + Math.random() * 16;
      gsap.set(el, { x: s.x, y: s.y, rotateY: s.rot });
      const tl = gsap.timeline({ onComplete: () => loop(false) });
      tl.fromTo(el, { z: -1600, opacity: 0 }, { z: -760, opacity: 0.92, duration: dur * 0.34, ease: "none" })
        .to(el, { z: 180, opacity: 0.92, duration: dur * 0.46, ease: "none" })
        .to(el, { z: 540, opacity: 0, duration: dur * 0.2, ease: "none" });
      if (seed) tl.progress(Math.random());
    })(true);
  });
})();

// ---- Click-to-play modal ---------------------------------------------------

(function initPlayer() {
  const modal = document.createElement("div");
  modal.className = "player";
  modal.innerHTML = `<div class="player__frame"></div><button class="player__close" aria-label="Close">✕</button>`;
  document.body.appendChild(modal);
  const frame = modal.querySelector(".player__frame");

  function close() {
    modal.classList.remove("is-open");
    frame.innerHTML = "";
    document.body.style.overflow = "";
  }
  function openVideo(id, fallbackPlaylist) {
    const src = id
      ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`
      : `https://www.youtube-nocookie.com/embed/videoseries?list=${fallbackPlaylist}&autoplay=1`;
    frame.innerHTML = `<iframe src="${src}" title="ZKFM video" frameborder="0"
      allow="autoplay; encrypted-media; picture-in-picture; web-share" allowfullscreen></iframe>`;
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  modal.addEventListener("click", (e) => { if (e.target === modal || e.target.closest(".player__close")) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

  document.getElementById("frequencies").addEventListener("click", (e) => {
    const btn = e.target.closest(".vid");
    if (!btn) return;
    const act = btn.closest(".act");
    const playlist = act && FREQUENCIES.find((f) => `freq-${f.n}` === act.id)?.playlist;
    openVideo(btn.dataset.vid, playlist);
  });
})();

// ---- Poster lightbox (click to enlarge & read briefings) -------------------

(function initPosterZoom() {
  const box = document.createElement("div");
  box.className = "lightbox";
  box.innerHTML = `<img alt="" /><button class="lightbox__close" aria-label="Close">✕</button>`;
  document.body.appendChild(box);
  const img = box.querySelector("img");
  function close() { box.classList.remove("is-open"); img.src = ""; }
  box.addEventListener("click", close);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  document.getElementById("frequencies").addEventListener("click", (e) => {
    const t = e.target.closest(".poster img");
    if (!t) return;
    img.src = t.src;
    img.alt = t.alt;
    box.classList.add("is-open");
  });
})();

// ---- Cinematic choreography (GSAP) -----------------------------------------

(function initMotion() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !window.gsap || !window.ScrollTrigger) {
    document.querySelectorAll(".poster, .vid, .scene__head, .act__card").forEach((el) => el.classList.add("is-in"));
    return;
  }
  const { gsap } = window;
  gsap.registerPlugin(window.ScrollTrigger);

  // Day scenes: video thumbnails flow up out of 3D depth as the scene enters.
  gsap.utils.toArray(".scene").forEach((scene) => {
    const cards = scene.querySelectorAll(".poster, .vid");
    const head = scene.querySelector(".scene__head");
    gsap.from(head, {
      scrollTrigger: { trigger: scene, start: "top 80%", end: "top 45%", scrub: true },
      y: 40, opacity: 0,
    });
    if (cards.length) {
      gsap.from(cards, {
        scrollTrigger: { trigger: scene, start: "top 78%", end: "top 38%", scrub: true },
        y: 80, z: -320, rotateY: -22, opacity: 0, stagger: 0.08,
      });
    }
  });

  // Frequency intro cards: a distinct "fold" per frequency as you scroll in.
  gsap.utils.toArray(".act").forEach((act) => {
    const card = act.querySelector(".act__card");
    const st = { trigger: act, start: "top 80%", end: "top 34%", scrub: true };
    const fold = act.dataset.fold;
    if (fold === "flip") {            // Nullify — door folds open from the left
      gsap.from(card, { scrollTrigger: st, rotateY: 90, transformOrigin: "left center", opacity: 0, ease: "none" });
    } else if (fold === "cube") {     // Witness This — panel folds down from above
      gsap.from(card, { scrollTrigger: st, rotateX: -90, transformOrigin: "center top", opacity: 0, ease: "none" });
    } else {                          // Ground Zero — CRT/transmission power-on
      gsap.from(card, { scrollTrigger: st, scaleY: 0.03, scaleX: 1.25, filter: "brightness(2.4)", opacity: 0, ease: "none" });
    }
  });
})();
