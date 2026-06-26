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

// Per-video headline as printed on each day's "On Air Today" lineup poster,
// keyed "D{day}V{video}" (video number = the "VIDEO N" label on the poster).
// Shown as a caption under each thumbnail so viewers know what they'll watch.
const POSTER_NAMES = {
  D1V1: `Privacy came to Ethereum. It took this long.`,
  D1V2: `One obsession. Nine years.`,
  D1V3: `Code; not companies. Cryptography; not trust.`,
  D2V1: `Ethereum is constrained. Privacy is the release valve.`,
  D2V2: `Seven years early. Right on time.`,
  D2V3: `We weren't chasing privacy. Institutions dragged us there.`,
  D3V1: `The real world demanded it. Blockchains finally listened.`,
  D3V2: `Everyone else hit the ceiling: Aztec removed it.`,
  D3V3: `Target: Four seconds. Current: 36.`,
  D4V1: `5 years. Still naked on the blockchain.`,
  D4V2: `He went from $4M to $100M. Then they hunted him.`,
  D4V3: `L2s don't want to decentralize. The money's too good.`,
  D5V1: `Privacy without identity is half a solution.`,
  D5V2: `AI will crack your compliance check. Now what?`,
  D5V3: `Privacy costs a little more. It's worth it.`,
  D6V1: `Without privacy, crypto isn't freedom. It's a better cage.`,
  D6V2: `The bandwagon found privacy. The builders had been there for years.`,
  D6V3: `One contract. Public where you want it. Private where it counts.`,
  D7V1: `Banks are terrified. They should be.`,
  D7V2: `Compliance built in. Not bolted on.`,
  D7V3: `First on-chain token launch with zero data leaked.`,
  D8V1: `Prove who you are. Reveal nothing else.`,
  D8V2: `Scan your passport. Match your face. Own your identity.`,
  D8V3: `Verify anywhere. Aztec, Ethereum or off-chain.`,
  D9V1: `Your passport chip is now a gateway to DeFi.`,
  D9V2: `Swiss regulators said yes. A historic first.`,
  D9V3: `App-level privacy fragments. Protocol level privacy compounds.`,
  D10V1: `One proof. Every transaction. Verified by Ethereum.`,
  D10V2: `Your device proves it. The network just checks.`,
  D10V3: `Privacy is light. Public is the same as Ethereum.`,
  D11V1: `Thousands of TPS on L2? Probably not. That's what L3s are for.`,
  D11V2: `Zcash does one thing. Aztec does everything.`,
  D12V1: `The EVM is brilliant. It just wasn't built for secrets.`,
  D12V2: `Noir writes code. ACIR turns it into a proof.`,
  D12V3: `Everyone built their own privacy tool. None of them talk to each other.`,
  D13V1: `We tried to extend Rust. It stopped being Rust. So we built Noir.`,
  D13V2: `One Transaction. Private swap. Identity check. Done.`,
  D13V3: `Same fee model. As Ethereum. Different value entirely.`,
  D14V1: `We rewrote Aztec in Noir. It took ten days.`,
  D14V2: `Aztec's advisors were like, "WTF?"`,
  D14V3: `For privacy, Aztec will always outrun Ethereum.`,
  D16V1: `Hundreds of attestations. One identity. Zero data exposed.`,
  D16V2: `Stake it. Use it. Shape it. The Aztec Token.`,
  D16V3: `200,000 tokens. One seat at the table.`,
  D16V4: `Airdrops print holders. They don't build believers.`,
  D17V1: `They fought the SSL wars so you could have privacy.`,
  D17V2: `You don't need to move to Aztec. Just route through Aztec.`,
  D17V3: `Other chains win when Aztec wins. That's the point.`,
  D17V4: `No backdoors. Over their dead bodies.`,
  D18V1: `Bridge chains. Leave no trace.`,
  D18V2: `Start from Aztec. End up anywhere. Arrive privately.`,
  D18V3: `Private trade. Verified identity. One atomic transaction.`,
  D18V4: `Aztec enforces the rules. The trade happens elsewhere.`,
  D19V1: `Apps that can't exist anywhere else.`,
  D19V2: `Your bank statement is your credit score. On-chain. Privately.`,
  D19V3: `Other L2s take liquidity. Aztec gives something back.`,
  D20V1: `Web3 first. Trad-fi next. Then the world.`,
  D20V2: `Private stablecoins. Wallets with secrets.`,
  D20V3: `Games without secrets are boring. Aztec brings the secrets.`,
  D20V4: `Institutions talk about it. Builders ship it.`,
  D21V1: `Stage 2. Ethereum grade. No training wheels.`,
  D21V2: `Private identity. No middlemen. No exceptions.`,
  D21V3: `Privacy shouldn't have an owner.`,
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
    n: "03", code: "ZKFM.128", name: "Witness This", range: "Days 16–21",
    playlist: "PLQsApsP5iZuQ",
    blurb: "Product and endgame. The first fully decentralised privacy L2 — the token, the apps, the world.",
    fold: "cube", vibe: "witness",
    days: [
      { day: 16, title: "Stake It. Use It. Shape It.", videos: [1, 2, 3, 4], x: "https://x.com/ZKFMradio/status/2061553373422461353" },
      { day: 17, title: "Over Their Dead Bodies", videos: [1, 2, 3, 4], x: "https://x.com/ZKFMradio/status/2062172457067299101" },
      { day: 18, title: "Route Through Aztec", videos: [1, 2, 3, 4], x: "https://x.com/ZKFMradio/status/2062263049634079049" },
      { day: 19, title: "Apps That Can't Exist", videos: [1, 2, 3], x: "https://x.com/ZKFMradio/status/2062972727036899775" },
      { day: 20, title: "Web3 First. Then the World.", videos: [1, 2, 3, 4], x: "https://x.com/ZKFMradio/status/2063335116051759122" },
      { day: 21, title: "Stage 2. No Training Wheels.", videos: [1, 2, 3], x: "https://x.com/ZKFMradio/status/2063622005002215836" },
    ],
  },
];

// Day 15 — a standalone special feature (Claire), shown between Frequency 02 and 03.
const CLAIRE = {
  x: "https://x.com/ZKFMradio/status/2061523549823602992",
  points: "A special celebrating crypto marketer Claire Kart (@clairekart) — the rebrand, marketing privacy for founders, and the CMO every builder needs.",
};

const pad = (n) => String(n).padStart(2, "0");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
// <picture> with AVIF + WebP fallback (Safari < 16.4 lacks AVIF). imgAttrs is a raw attribute string.
const pic = (avif, imgAttrs) =>
  `<picture><source type="image/avif" srcset="${avif}" /><img src="${avif.replace(/\.avif$/, ".webp")}" ${imgAttrs} /></picture>`;

// ---- Build the DOM ---------------------------------------------------------

// Snappy titles on at most TWO lines, never breaking mid-sentence: split into
// sentences, then group them into 2 lines at the boundary that balances length.
// (No regex lookbehind — it SyntaxErrors on Safari < 16.4 and would kill the file.)
function twoLineTitle(name) {
  const parts = name.replace(/([.?!])\s+/g, "$1\n").split("\n").map((s) => s.trim()).filter(Boolean);
  if (parts.length <= 1) return esc(name);
  let best = 1, bestMax = Infinity;
  for (let k = 1; k < parts.length; k++) {
    const m = Math.max(parts.slice(0, k).join(" ").length, parts.slice(k).join(" ").length);
    if (m < bestMax) { bestMax = m; best = k; }
  }
  return `${esc(parts.slice(0, best).join(" "))}<br />${esc(parts.slice(best).join(" "))}`;
}

function videoCard(day, v) {
  const dd = pad(day);
  const key = `D${day}V${v}`;
  const meta = VIDEO_IDS[key] || {};
  const id = meta.id || "";
  const name = POSTER_NAMES[key] || meta.t || `Day ${day} · Video ${v}`;
  return `
    <button class="vid" data-vid="${id}" data-key="${key}" aria-label="Play: ${esc(name)}">
      <span class="vid__name">${twoLineTitle(name)}</span>
      <span class="vid__media">
        ${pic(`/assets/zkfm/thumbs/d${dd}v${v}.avif`, `class="vid__thumb" alt="ZKFM Day ${day} Video ${v}" loading="lazy"`)}
        <span class="vid__play" aria-hidden="true"></span>
        <span class="vid__tag">D${day} · V${v}</span>
      </span>
    </button>`;
}

// The frequency's portrait "intro" poster — shown highlighted alongside Day 1's
// posters instead of as a full-screen banner (it's the wrong shape for that).
function introPoster(f) {
  return `
          <figure class="poster poster--intro">
            <figcaption>Freq ${f.n} · Intro</figcaption>
            <button class="poster__zoom" aria-label="Enlarge Frequency ${f.n} intro — ${esc(f.name)}">
              ${pic(`/assets/zkfm/posters/freq${f.n}.avif`, `alt="Frequency ${f.n} — ${esc(f.name)} intro poster (${esc(f.range)})" loading="lazy"`)}
            </button>
          </figure>`;
}

// One day = one carousel panel. The day number is surfaced by the persistent
// weekbar (built in frequencyAct). isFirst === Day 1 → carries the intro poster.
function dayScene(d, freq, isFirst) {
  const dd = pad(d.day);
  const xHref = d.x || X_ACCOUNT;
  const data = `data-day="${d.day}" data-num="DAY ${dd}"`;
  const intro = isFirst ? introPoster(freq) : "";
  const cards = d.videos.map((v) => videoCard(d.day, v)).join("");
  const briefing = d.briefing === false ? "" : `
          <figure class="poster poster--take">
            <figcaption>The Download</figcaption>
            <button class="poster__zoom" aria-label="Enlarge briefing — ${esc(d.title)}">
              ${pic(`/assets/zkfm/posters/day${dd}-info.avif`, `alt="ZKFM Day ${d.day} briefing — ${esc(d.title)}" loading="lazy"`)}
            </button>
          </figure>`;
  return `
    <section class="scene" ${data}>
      <div class="scene__inner">
        <div class="scene__posters${isFirst ? " scene__posters--intro" : ""}">
          ${intro}<figure class="poster poster--lineup">
            <figcaption>On Air Today</figcaption>
            <button class="poster__zoom" aria-label="Enlarge lineup — ${esc(d.title)}">
              ${pic(`/assets/zkfm/posters/day${dd}-lineup.avif`, `alt="ZKFM Day ${d.day} lineup — ${esc(d.title)}" loading="lazy"`)}
            </button>
          </figure>${briefing}
        </div>
        <div class="scene__videos" data-count="${d.videos.length}">${cards}</div>
        <a class="scene__x" href="${xHref}" target="_blank" rel="noopener noreferrer">Watch day ${dd} on X →</a>
      </div>
    </section>`;
}

function frequencyAct(f) {
  const first = f.days[0];
  const dots = f.days
    .map((d, i) => `<button class="day-dot" type="button" data-i="${i}" aria-label="Go to day ${pad(d.day)}">${pad(d.day)}</button>`)
    .join("");
  return `
    <section class="act" id="freq-${f.n}" data-vibe="${f.vibe}">
      <header class="act__head">
        <p class="act__station">FREQ ${f.n} · ${esc(f.code)}</p>
        <h2 class="act__name">${esc(f.name)}</h2>
        <p class="act__blurb">${esc(f.blurb)}</p>
      </header>
      <div class="act__week">
        <div class="act__weekbar">
          <button class="week__arrow week__arrow--prev" type="button" aria-label="Previous day">‹</button>
          <p class="week__now" aria-live="polite">
            <span class="week__num">DAY ${pad(first.day)}</span>
          </p>
          <button class="week__arrow week__arrow--next" type="button" aria-label="Next day">›</button>
        </div>
        <div class="act__scenes" role="region" aria-roledescription="carousel" aria-label="Frequency ${f.n} — ${esc(f.name)}, ${f.days.length} days" tabindex="0">
          ${f.days.map((d, i) => dayScene(d, f, i === 0)).join("")}
        </div>
        <div class="act__days" role="group" aria-label="Frequency ${f.n} day selector">${dots}</div>
      </div>
    </section>`;
}

// Day 15 — a standalone "special feature" card, plain so it reads as an interlude.
function claireFeature() {
  return `
    <section class="zk-claire" id="claire">
      <p class="zk-claire__eyebrow">◉ Special broadcast · Day 15</p>
      <h2 class="zk-claire__title">CLAIRE</h2>
      <p class="zk-claire__text">${esc(CLAIRE.points)}</p>
      <a class="zk-claire__x" href="${CLAIRE.x}" target="_blank" rel="noopener noreferrer">Watch on X →</a>
    </section>`;
}

// Assemble: Freq 01, Freq 02, the Claire special, then Freq 03 (days 16–21).
const acts = FREQUENCIES.map(frequencyAct);
acts.splice(2, 0, claireFeature());
document.getElementById("frequencies").innerHTML = acts.join("");
const yEl = document.getElementById("year");
if (yEl) yEl.textContent = new Date().getFullYear();

// ---- Day carousel: flip horizontally through a frequency's week --------------
// Each .scene is a full-width snap panel. The weekbar (DAY NN · Title) and the
// bottom day-number strip both reflect and control the active day.

(function initWeekCarousels() {
  const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll(".act__week").forEach((week) => {
    const track = week.querySelector(".act__scenes");
    const panels = Array.from(track.querySelectorAll(".scene"));
    const dots = Array.from(week.querySelectorAll(".day-dot"));
    const prev = week.querySelector(".week__arrow--prev");
    const next = week.querySelector(".week__arrow--next");
    const numEl = week.querySelector(".week__num");
    if (!panels.length) return;
    let cur = -1;

    function setActive(i) {
      i = Math.max(0, Math.min(panels.length - 1, i));
      if (i === cur) return;
      cur = i;
      const p = panels[i];
      numEl.textContent = p.dataset.num;
      dots.forEach((d, j) => {
        d.classList.toggle("is-active", j === i);
        if (j === i) d.setAttribute("aria-current", "true");
        else d.removeAttribute("aria-current");
      });
      panels.forEach((pa, j) => pa.classList.toggle("is-active", j === i));
      prev.disabled = i === 0;
      next.disabled = i === panels.length - 1;
    }

    const goto = (i) =>
      track.scrollTo({ left: Math.max(0, Math.min(panels.length - 1, i)) * track.clientWidth, behavior: smooth ? "smooth" : "auto" });

    // Active day follows the scroll position (rAF-throttled).
    let raf = 0;
    track.addEventListener("scroll", () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setActive(Math.round(track.scrollLeft / track.clientWidth));
      });
    }, { passive: true });

    dots.forEach((d) => d.addEventListener("click", () => goto(+d.dataset.i)));
    prev.addEventListener("click", () => goto(cur - 1));
    next.addEventListener("click", () => goto(cur + 1));
    track.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); goto(cur + 1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); goto(cur - 1); }
    });

    // Keep the current panel aligned when the viewport width changes.
    let rrf = 0;
    window.addEventListener("resize", () => {
      if (rrf) return;
      rrf = requestAnimationFrame(() => { rrf = 0; track.scrollLeft = cur * track.clientWidth; });
    }, { passive: true });

    setActive(0);
  });
})();

// ---- 3D collages: a dense sharp hero + a blurred page-wide backdrop ----------
// Both draw from one shuffled pool of tiny (~200px) tiles. The backdrop reuses
// images already cached by the hero, so it adds ~no download. The hero plays
// while it's on screen; the backdrop plays only once you've scrolled past it —
// so just one field animates at a time.

(function buildCollages() {
  const heroHost = document.getElementById("collage");
  const bgHost = document.getElementById("bg-collage");
  if (!heroHost && !bgHost) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const gsap = window.gsap;
  const small = window.innerWidth < 760;
  const sizeScale = small ? 0.62 : 1; // smaller tiles on phones (fill-rate + screen size)
  const W = () => window.innerWidth;
  const H = () => window.innerHeight;

  const pool = [];
  Object.keys(VIDEO_IDS).forEach((k) => {
    const m = k.match(/D(\d+)V(\d+)/);
    pool.push({ src: `/assets/zkfm/collage/d${pad(+m[1])}v${m[2]}.avif`, portrait: false });
  });
  FREQUENCIES.forEach((f) => f.days.forEach((d) => {
    if (!d.special) pool.push({ src: `/assets/zkfm/collage/p${pad(d.day)}.avif`, portrait: true });
  }));
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  const rpt = () => ({
    x: (Math.random() * 1.3 - 0.65) * W(), // concentrate within the viewport
    y: (Math.random() * 1.3 - 0.65) * H(),
    z: -700 + Math.random() * 950, // closer band: +250 = near camera, -700 = back
  });

  // Build one field. U unique images reused across N tiles (downloads bounded to U;
  // a shared front-of-pool slice means the backdrop's images are already cached).
  function build(host, cfg) {
    const peak = (z) => (0.55 + ((z + 700) / 1000) * 0.4) * cfg.peakMul;
    const field = document.createElement("div");
    field.className = "collage__field";
    const tiles = [];
    for (let i = 0; i < cfg.N; i++) {
      const a = pool[i % cfg.U];
      const w = (a.portrait ? 95 + Math.random() * 80 : 140 + Math.random() * 110) * sizeScale;
      const el = document.createElement("div");
      el.className = "ctile";
      el.style.width = w.toFixed(0) + "px";
      el.style.opacity = "0";
      el.innerHTML = pic(a.src, `alt="" loading="lazy" decoding="async" fetchpriority="low"`);
      field.appendChild(el);
      tiles.push(el);
    }
    host.appendChild(field);

    if (!gsap || reduce) {
      tiles.forEach((el) => {
        const p = rpt();
        el.style.transform =
          `translate(-50%,-50%) translate3d(${(p.x * 0.7).toFixed(0)}px,${(p.y * 0.7).toFixed(0)}px,${p.z.toFixed(0)}px) rotateY(${(Math.random() * 24 - 12).toFixed(1)}deg)`;
        el.style.opacity = peak(p.z).toFixed(2);
      });
      return { tiles, fly: null };
    }

    gsap.set(tiles, { xPercent: -50, yPercent: -50, force3D: true });
    // Each tile drifts between two random 3D points — every direction — then recycles.
    function fly(el, seed) {
      const a = rpt(), b = rpt();
      const dur = cfg.durBase + Math.random() * cfg.durRange;
      const pk = Math.min(peak(a.z), peak(b.z));
      const ease = Math.random() < 0.5 ? "none" : "sine.inOut";
      gsap.set(el, { x: a.x, y: a.y, z: a.z, rotateY: Math.random() * 44 - 22, rotateZ: Math.random() * 10 - 5, opacity: 0 });
      const tl = gsap.timeline({ onComplete: () => fly(el, false) });
      el._zkTl = tl; // live ref (reassigned each recycle) so pause/resume never goes stale
      tl.to(el, { x: b.x, y: b.y, z: b.z, rotateY: Math.random() * 44 - 22, rotateZ: Math.random() * 10 - 5, duration: dur, ease }, 0)
        .to(el, { opacity: pk, duration: dur * 0.22, ease: "sine.out" }, 0)
        .to(el, { opacity: 0, duration: dur * 0.24, ease: "sine.in" }, dur * 0.76);
      if (seed) tl.progress(Math.random());
    }
    return { tiles, fly };
  }

  const insts = [];
  if (heroHost) insts.push(Object.assign(
    build(heroHost, { U: Math.min(small ? 28 : 48, pool.length), N: small ? 32 : 48, peakMul: 1, durBase: 6, durRange: 8 }),
    { runsInHero: true, host: heroHost }
  ));
  if (bgHost) insts.push(Object.assign(
    build(bgHost, { U: Math.min(small ? 18 : 34, pool.length), N: small ? 18 : 40, peakMul: 0.82, durBase: 9, durRange: 11 }),
    { runsInHero: false, host: bgHost }
  ));

  if (!gsap || reduce) return; // static scatter, no timeline management needed

  // Without a hero observer to drive the handoff, the backdrop just runs on its own.
  const hasHandoff = heroHost && "IntersectionObserver" in window;
  let heroVisible = true, started = false;
  const applyAll = () => insts.forEach((inst) => {
    const play = !document.hidden && (inst.runsInHero ? heroVisible : (!hasHandoff || !heroVisible));
    // display:none the inactive field so its layers leave the render tree entirely
    // (the fixed blurred backdrop isn't occlusion-culled behind the hero otherwise).
    inst.host.style.display = play ? "" : "none";
    inst.tiles.forEach((el) => el._zkTl && (play ? el._zkTl.play() : el._zkTl.pause()));
  });

  // Defer the launch so the hero wordmark paints first (perceived load speed).
  const start = () => {
    if (started) return;
    started = true;
    insts.forEach((inst) => inst.fly && inst.tiles.forEach((el) => inst.fly(el, true)));
    applyAll();
  };
  (window.requestIdleCallback || ((cb) => setTimeout(cb, 200)))(start, { timeout: 400 });

  document.addEventListener("visibilitychange", applyAll);
  if (heroHost && "IntersectionObserver" in window) {
    // Hand off at the halfway mark: hero field runs while the hero owns the screen,
    // backdrop takes over once you're past it — so only one field animates at a time.
    new IntersectionObserver((e) => { heroVisible = e[0].intersectionRatio >= 0.5; applyAll(); }, { threshold: [0, 0.5, 1] }).observe(heroHost);
  }
})();

// ---- Click-to-play modal ---------------------------------------------------

(function initPlayer() {
  const modal = document.createElement("div");
  modal.className = "player";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-label", "Video player");
  modal.innerHTML = `<div class="player__frame"></div><button class="player__close" aria-label="Close video">✕</button>`;
  document.body.appendChild(modal);
  const frame = modal.querySelector(".player__frame");
  const closeBtn = modal.querySelector(".player__close");
  let lastFocus = null;

  function close() {
    if (!modal.classList.contains("is-open")) return;
    modal.classList.remove("is-open");
    frame.innerHTML = "";
    document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function openVideo(id, fallbackPlaylist) {
    lastFocus = document.activeElement;
    const src = id
      ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`
      : `https://www.youtube-nocookie.com/embed/videoseries?list=${fallbackPlaylist}&autoplay=1`;
    frame.innerHTML = `<iframe src="${src}" title="ZKFM video" frameborder="0" referrerpolicy="strict-origin-when-cross-origin"
      allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  modal.addEventListener("click", (e) => { if (e.target === modal || e.target.closest(".player__close")) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  modal.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;
    const f = modal.querySelectorAll('button, iframe, [tabindex]:not([tabindex="-1"])');
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  document.getElementById("frequencies").addEventListener("click", (e) => {
    const btn = e.target.closest(".vid");
    if (!btn) return;
    const act = btn.closest(".act");
    const playlist = act && FREQUENCIES.find((f) => `freq-${f.n}` === act.id)?.playlist;
    openVideo(btn.dataset.vid, playlist);
  });

  // Featured launch broadcast (static block above the frequencies). The <a> falls
  // back to the YouTube watch page without JS; here we intercept to open the modal.
  const feat = document.querySelector(".zk-feature__btn");
  if (feat) feat.addEventListener("click", (e) => { e.preventDefault(); openVideo(feat.dataset.vid, null); });
})();

// ---- Poster lightbox (click to enlarge & read briefings) -------------------

(function initPosterZoom() {
  const box = document.createElement("div");
  box.className = "lightbox";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.setAttribute("aria-label", "Poster");
  box.innerHTML = `<img alt="" /><button class="lightbox__close" aria-label="Close poster">✕</button>`;
  document.body.appendChild(box);
  const img = box.querySelector("img");
  const closeBtn = box.querySelector(".lightbox__close");
  let lastFocus = null;
  function close() {
    if (!box.classList.contains("is-open")) return;
    box.classList.remove("is-open");
    img.src = "";
    document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  box.addEventListener("click", close);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  box.addEventListener("keydown", (e) => { if (e.key === "Tab") { e.preventDefault(); closeBtn.focus(); } });
  document.getElementById("frequencies").addEventListener("click", (e) => {
    const btn = e.target.closest(".poster__zoom");
    if (!btn) return;
    const src = btn.querySelector("img");
    if (!src) return;
    lastFocus = document.activeElement;
    img.src = src.src;
    img.alt = src.alt;
    box.classList.add("is-open");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  });
})();

// ---- Tuner: highlight the active frequency while scrolling -----------------

(function initTuner() {
  const links = {};
  document.querySelectorAll(".zk-tuner a[data-freq]").forEach((a) => (links[a.dataset.freq] = a));
  const acts = document.querySelectorAll(".act");
  if (!acts.length || !("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const n = e.target.id.replace("freq-", "");
        Object.values(links).forEach((a) => a.classList.remove("is-active"));
        if (links[n]) links[n].classList.add("is-active");
      });
    },
    { rootMargin: "-45% 0px -45% 0px" }
  );
  acts.forEach((a) => io.observe(a));
})();

// ---- Entrance reveals — IntersectionObserver + CSS (no ScrollTrigger) -------
// The launch feature rises in and each frequency header staggers up as it
// enters. Done with a CSS class so we don't ship the 44KB ScrollTrigger lib.
// The .reveal class is added by JS, so with no JS the content stays visible.

(function initReveals() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const targets = Array.from(document.querySelectorAll(".zk-feature, .act__head"));
  if (reduce || !("IntersectionObserver" in window) || !targets.length) return;
  targets.forEach((el) => el.classList.add("reveal"));
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    }),
    { rootMargin: "0px 0px -12% 0px", threshold: 0.15 }
  );
  targets.forEach((el) => io.observe(el));
})();
