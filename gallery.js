/* Motion Gallery: every exhibit's words and prompt live here, the demos below. */
gsap.registerPlugin(ScrollTrigger);

const HEAD = 56;
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

const GROUPS = [
  ["on-load", "A · On load"],
  ["on-scroll", "B · On scroll"],
  ["cursor", "C · Cursor"],
  ["always", "D · Always on"],
];

const EX = {
  "load-in": {
    title: "Staggered load-in", tech: "GSAP", replay: true,
    what: "The pieces of a hero fade up one after another instead of all at once.",
    use: "the first screen of any page.",
    prompt: "Add a load-in animation to my hero. When the page loads, the small label, headline, paragraph and buttons should fade up into place one after another, about 0.08 seconds apart. Use GSAP, keep the whole thing under a second, and skip it for people who turn on reduced motion.",
  },
  "split-text": {
    title: "Split-text reveal", tech: "GSAP", replay: true,
    what: "A headline rises in letter by letter from behind an invisible line.",
    use: "one big headline per page. More than that gets tiring.",
    prompt: "Animate my main headline in letter by letter. Each letter should rise up from behind an invisible line, one after another, when it first comes into view. Use GSAP, make sure screen readers still read the headline as normal text, and skip it for reduced motion.",
  },
  "wipe": {
    title: "Image wipe", tech: "GSAP · clip-path", replay: true,
    what: "An image is uncovered from left to right while it settles into place.",
    use: "hero images and big feature photos.",
    prompt: "Reveal my hero image with a wipe: uncover it from left to right while it zooms out slightly, the first time it comes into view. Animate a CSS clip-path with GSAP, and just show the image for people who turn on reduced motion.",
  },
  "count-up": {
    title: "Count-up numbers", tech: "GSAP ScrollTrigger", replay: true,
    what: "Stats count up from zero when they scroll into view.",
    use: "results, reviews, years in business.",
    prompt: "Make the numbers in my stats section count up from zero when they scroll into view. Keep the formatting (commas, %, decimals) while they count, play it once, and use GSAP ScrollTrigger. Show the final numbers right away for reduced motion.",
  },
  "reveal": {
    title: "Scroll reveal", tech: "GSAP ScrollTrigger", replay: true,
    what: "Cards fade in and slide up as they enter the screen, one after another.",
    use: "almost everything below the first screen. The most common effect on the web.",
    prompt: "As each card or section scrolls into view, have it fade in and slide up a little. Cards that arrive together should come in one after another. Use GSAP ScrollTrigger.batch, play it once, and skip it for reduced motion.",
  },
  "parallax": {
    title: "Parallax", tech: "GSAP ScrollTrigger · scrub",
    what: "Layers move at different speeds as you scroll, so the scene feels deep.",
    use: "hero scenes and big illustrated sections.",
    prompt: "Add parallax to my hero: split the background into layers and move each one at a different speed as I scroll, so it feels deep. Use GSAP ScrollTrigger with scrub. Keep the movement small on phones and turn it off for reduced motion.",
  },
  "zoom-out": {
    title: "Zoom-out hero", tech: "GSAP ScrollTrigger · sticky",
    what: "A full-screen image shrinks into a rounded card as you scroll down.",
    use: "opening a page with one big photo, then getting to the content.",
    prompt: "Make my hero image start full screen and shrink into a rounded card as I scroll down. Keep it in place while it shrinks, then let the page carry on. Use position: sticky and a GSAP ScrollTrigger scrub on clip-path.",
  },
  "sideways": {
    title: "Sideways scroll", tech: "GSAP ScrollTrigger · pin",
    what: "The section stays put while scrolling down slides the panels to the left.",
    use: "steps, timelines and galleries.",
    prompt: "Turn this section into a sideways scroll: pin it, and as I scroll down the panels slide left. When the last panel is in view, release the pin. Use GSAP ScrollTrigger. On phones, use a normal swipeable row instead.",
  },
  "read-along": {
    title: "Read-along text", tech: "GSAP ScrollTrigger · scrub",
    what: "Words start faint and light up as you scroll past them.",
    use: "one short statement, like a mission or a promise.",
    prompt: "Make this paragraph light up word by word as I scroll past it. Words start faint and turn fully dark as they reach the middle of the screen. Use GSAP ScrollTrigger with scrub, and show it fully dark for reduced motion.",
  },
  "frames": {
    title: "Scroll-scrubbed frames", tech: "Canvas · image sequence",
    what: "A flipbook of pictures plays forward and backward with your scroll, like Apple's product pages.",
    use: "one hero product moment.",
    prompt: "Turn this video into a scroll animation. Cut it into WebP frames with FFmpeg (quality 70, 1600 wide, every other frame, plus a 720-wide set for phones). Then draw the right frame on a canvas based on how far I've scrolled, keep the canvas in place while it plays, and preload the frames.",
  },
  "stack": {
    title: "Stacking cards", tech: "CSS sticky · GSAP",
    what: "Each card sticks near the top and the next one slides up over it.",
    use: "steps, services and feature lists.",
    prompt: "Make these cards stack: each one sticks near the top of the screen and the next one slides up over it, while the one underneath shrinks and darkens a little. Use CSS position: sticky and GSAP for the shrink.",
  },
  "progress": {
    title: "Progress bar", tech: "GSAP ScrollTrigger",
    what: "A thin bar at the top of the page fills as you read.",
    use: "long articles and guides.",
    prompt: "Add a thin reading progress bar at the very top of the page that fills from left to right as I scroll. Use my accent color and GSAP ScrollTrigger.",
  },
  "magnetic": {
    title: "Magnetic button", tech: "GSAP",
    what: "The button leans toward your cursor, then springs back when you leave.",
    use: "one main button. It makes it feel alive and clickable.",
    prompt: "Make my main button magnetic: when the cursor gets close, the button leans toward it, and it springs back with a little bounce when the cursor leaves. Use GSAP, and turn it off on touch screens.",
  },
  "tilt": {
    title: "3D tilt", tech: "GSAP · CSS perspective",
    what: "Cards tilt toward your cursor, with a soft shine that follows it.",
    use: "product cards and pricing tiers.",
    prompt: "Make these cards tilt in 3D toward the cursor, with a soft shine that follows it. Ease back to flat when the cursor leaves. Keep the tilt small, under 10 degrees, and turn it off on touch screens.",
  },
  "spotlight": {
    title: "Spotlight", tech: "CSS mask",
    what: "A circle of light follows your cursor and reveals what's hidden in the dark.",
    use: "dark sections, menus, and anything worth discovering.",
    prompt: "Add a spotlight that follows the cursor across this dark section and reveals the content underneath. Use a CSS radial-gradient mask driven by the pointer position, eased with GSAP. When the cursor isn't there, let the light drift slowly on its own.",
  },
  "hovers": {
    title: "Hover effects", tech: "CSS only",
    what: "Small touches when you point at a button or link.",
    use: "every button and link on the site.",
    prompt: "Give my buttons and links better hovers: buttons fill with color from left to right, links get an underline that grows from the left, arrows nudge forward, and cards lift with a soft shadow. CSS only, about 0.3 seconds each.",
  },
  "marquee": {
    title: "Marquee", tech: "GSAP ScrollTrigger",
    what: "A row of words scrolls sideways forever, and speeds up when you scroll.",
    use: "brand words, client logos, announcements.",
    prompt: "Add a marquee: a row of words that scrolls sideways forever with no gap. It should speed up when I scroll and flip direction when I scroll up. Use GSAP, and stop it for reduced motion.",
  },
  "smooth": {
    title: "Smooth scroll", tech: "Lenis",
    what: "The page glides when you scroll instead of jumping in steps.",
    use: "sites with lots of scroll effects. It makes them feel smoother.",
    prompt: "Add smooth scrolling with Lenis so the page glides instead of jumping. Connect it to GSAP ScrollTrigger so my scroll animations stay in sync, and turn it off for reduced motion.",
  },
};

const replayers = {};
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* ------------------------------------------------ page chrome: meta, contents, copy */
let n = 0;
for (const ex of $$(".ex")) {
  const d = EX[ex.id];
  const num = String(++n).padStart(2, "0");
  d.num = num;
  const meta = document.createElement("div");
  meta.className = "ex-meta";
  meta.innerHTML = `
    <div class="ex-title"><span class="ex-num mono">${num}</span><h3>${esc(d.title)}</h3></div>
    <p class="ex-what">${esc(d.what)}</p>
    <p class="ex-use"><span class="mono">Use it for</span>${esc(d.use)}</p>
    <div class="ex-actions">
      <span class="tag mono">${esc(d.tech)}</span>
      ${d.replay ? `<button class="btn" type="button" data-replay="${ex.id}">Replay</button>` : ""}
      ${ex.id === "smooth" ? `<button class="btn" type="button" data-smooth>Turn it off</button>` : ""}
      <button class="btn btn-ink" type="button" data-copy="${ex.id}">Copy prompt</button>
    </div>
    <details class="ex-prompt"><summary>See the prompt</summary><p>${esc(d.prompt)}</p></details>`;
  ex.prepend(meta);
}

$(".toc").innerHTML = GROUPS.map(([id, label]) => `
  <div><h3>${label}</h3><ol>${$$(`#${id} .ex`).map((ex) =>
    `<li><a href="#${ex.id}"><span class="n">${EX[ex.id].num}</span>${esc(EX[ex.id].title)}</a></li>`).join("")}</ol></div>`).join("");

async function copyText(text, btn) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = Object.assign(document.createElement("textarea"), { value: text });
    ta.style.cssText = "position:fixed;opacity:0";
    document.body.append(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }
  btn.textContent = "Copied";
  btn.classList.add("done");
  setTimeout(() => { btn.textContent = "Copy prompt"; btn.classList.remove("done"); }, 1600);
}

document.addEventListener("click", (e) => {
  const copy = e.target.closest("[data-copy]");
  if (copy) return copyText(EX[copy.dataset.copy].prompt, copy);
  const replay = e.target.closest("[data-replay]");
  if (replay) return replayers[replay.dataset.replay]?.();
  if (e.target.closest("[data-smooth], .smooth-toggle")) return setSmooth(!lenis);
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  e.preventDefault();
  if (a.closest(".hover-row")) return;
  const id = a.getAttribute("href");
  const el = id === "#top" ? 0 : $(id);
  if (el === null) return;
  const y = el === 0 ? 0 : el.getBoundingClientRect().top + scrollY - HEAD - 8;
  lenis ? lenis.scrollTo(y) : scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
});

/* ------------------------------------------------ smooth scroll (18) */
let lenis = null;
gsap.ticker.add((t) => lenis?.raf(t * 1000));
gsap.ticker.lagSmoothing(0);

function setSmooth(on) {
  if (on && !lenis) {
    lenis = new Lenis({ lerp: 0.1 });
    lenis.on("scroll", ScrollTrigger.update);
  } else if (!on && lenis) {
    lenis.destroy();
    lenis = null;
  }
  const t = $(".smooth-toggle");
  t.setAttribute("aria-pressed", String(on));
  t.textContent = `Smooth scroll: ${on ? "on" : "off"}`;
  $(".smooth-state").textContent = on ? "on" : "off";
  $("[data-smooth]").textContent = on ? "Turn it off" : "Turn it on";
}
setSmooth(!reduce);
if (reduce) $(".rm-note").hidden = false;

/* ------------------------------------------------ helpers */
function splitChars(el) {
  const text = el.textContent.trim();
  el.setAttribute("aria-label", text);
  el.innerHTML = text.split(" ").map((w) =>
    `<span class="w" aria-hidden="true">${[...w].map((c) => `<span class="c">${esc(c)}</span>`).join("")}</span>`).join(" ");
  return $$(".c", el);
}

function splitWords(el) {
  el.innerHTML = el.textContent.trim().split(/\s+/).map((w) => `<span class="rw">${esc(w)}</span>`).join(" ");
  return $$(".rw", el);
}

// Play a paused timeline the first time its stage comes into view, and let Replay restart it.
function onView(id, tl, start = "top 75%") {
  ScrollTrigger.create({ trigger: `#${id} .stage`, start, once: true, onEnter: () => tl.play(0) });
  replayers[id] = () => tl.play(0);
}

/* ------------------------------------------------ intro */
gsap.from(splitChars($(".intro-title")), { yPercent: 115, duration: 1, ease: "power4.out", stagger: 0.035, delay: 0.15 });
gsap.from([".kicker", ".intro-sub", ".toc"], { y: 20, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.1, delay: 0.5 });

/* ------------------------------------------------ A · on load */
onView("load-in", gsap.timeline({ paused: true })
  .from("#load-in .li", { y: 28, opacity: 0, duration: 0.7, ease: "power3.out", stagger: 0.09 }));

onView("split-text", gsap.timeline({ paused: true })
  .from(splitChars($(".split-head")), { yPercent: 115, duration: 0.9, ease: "power4.out", stagger: 0.022 }));

onView("wipe", gsap.timeline({ paused: true })
  .fromTo(".wipe", { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "power3.inOut" })
  .fromTo(".wipe-inner", { scale: 1.25 }, { scale: 1, duration: 1.8, ease: "power3.out" }, 0));

{
  const tl = gsap.timeline({ paused: true });
  $$(".stat b").forEach((b, i) => {
    const to = Number(b.dataset.to), dec = Number(b.dataset.dec || 0), o = { v: 0 };
    const show = () => {
      const s = dec ? o.v.toFixed(dec) : String(Math.round(o.v));
      b.textContent = (b.hasAttribute("data-comma") ? Number(s).toLocaleString("en-US") : s) + (b.dataset.suffix || "");
    };
    show();
    tl.to(o, { v: to, duration: 1.8, ease: "power2.out", onUpdate: show }, i * 0.15);
  });
  onView("count-up", tl);
}

/* ------------------------------------------------ B · on scroll */
{
  const cards = $$(".rcard");
  gsap.set(cards, { opacity: 0, y: 50 });
  ScrollTrigger.batch(cards, {
    start: "top 88%", once: true,
    onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.12, overwrite: true }),
  });
  replayers.reveal = () => gsap.fromTo(cards, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.08, overwrite: true });
}

$$(".plx [data-y]").forEach((el) => {
  const [a, b] = el.dataset.y.split(",").map(Number);
  gsap.fromTo(el, { y: a }, { y: b, ease: "none", scrollTrigger: { trigger: ".plx", start: "top bottom", end: "bottom top", scrub: true } });
});

gsap.fromTo(".zoom-img", { clipPath: "inset(0% 0% 0% 0% round 0px)" }, {
  clipPath: "inset(16% 22% 16% 22% round 28px)", ease: "none",
  scrollTrigger: { trigger: ".zoom-wrap", start: `top ${HEAD}px`, end: "bottom bottom", scrub: true },
});

{
  const hs = $(".hs"), track = $(".hs-track");
  const dist = () => track.scrollWidth - hs.clientWidth;
  gsap.to(track, {
    x: () => -dist(), ease: "none",
    scrollTrigger: { trigger: hs, start: `top ${HEAD}px`, end: () => `+=${dist()}`, pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 },
  });
}

gsap.fromTo(splitWords($(".read")), { opacity: 0.12 }, {
  opacity: 1, stagger: 0.1, ease: "none",
  scrollTrigger: { trigger: ".read", start: "top 80%", end: "bottom 45%", scrub: true },
});

/* 10 · scroll-scrubbed frames: 90 WebP pictures made when the page loads, then picked by scroll position */
{
  const N = 90, FW = 960, FH = 600;
  const canvas = $(".fr-canvas"), ctx = canvas.getContext("2d"), count = $(".fr-count");
  const frames = [];
  let current = 0;

  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const PARTS = [["shell", "#1A1916"], ["cushion", "#E8E0D1"], ["driver", "#C15F3C"], ["grille", "#7A3522"]];

  function drawHeadphones(c, W, H, t) {
    const s = Math.min(W / 960, H / 600), e = ease(t);
    const cx = W / 2, cy = H * 0.56, r = 170 * s + e * 30 * s, lift = e * 70 * s;
    c.clearRect(0, 0, W, H);
    c.lineCap = "round";
    // headband
    c.strokeStyle = "#1A1916"; c.lineWidth = 22 * s;
    c.beginPath(); c.arc(cx, cy - lift, r, Math.PI * 1.05, Math.PI * 1.95); c.stroke();
    c.strokeStyle = "#C15F3C"; c.lineWidth = 6 * s;
    c.beginPath(); c.arc(cx, cy - lift, r - 14 * s, Math.PI * 1.12, Math.PI * 1.88); c.stroke();
    for (const side of [-1, 1]) {
      const bx = cx + side * (r * 0.985 + e * 90 * s);
      // yoke from band end down to the cup
      c.strokeStyle = "#5B564D"; c.lineWidth = 6 * s;
      c.beginPath(); c.moveTo(cx + side * r * 0.95, cy - lift - r * 0.16); c.lineTo(bx, cy - 40 * s); c.stroke();
      if (e > 0.05) { // exploded-view axis
        c.save(); c.globalAlpha = Math.min(1, e * 2); c.setLineDash([5 * s, 7 * s]); c.lineWidth = 1.5 * s;
        c.beginPath(); c.moveTo(bx + side * 50 * s, cy + 40 * s); c.lineTo(bx - side * (4 * (14 + e * 70)) * s, cy + 40 * s); c.stroke(); c.restore();
      }
      PARTS.forEach(([name, fill], i) => {
        const x = bx - side * i * (14 + e * 70) * s;
        const rx = (34 - i * 4) * s, ry = (92 - i * 12) * s;
        c.fillStyle = fill; c.strokeStyle = "#1A1916"; c.lineWidth = 3 * s;
        c.beginPath(); c.ellipse(x, cy + 40 * s, rx, ry, 0, 0, Math.PI * 2); c.fill(); c.stroke();
        if (name === "grille") {
          c.fillStyle = "#E9A07C";
          for (let k = -2; k <= 2; k++) { c.beginPath(); c.arc(x, cy + 40 * s + k * 14 * s, 3 * s, 0, Math.PI * 2); c.fill(); }
        }
        if (side === 1 && e > 0.55) { // part labels once it's apart
          c.save(); c.globalAlpha = (e - 0.55) / 0.45;
          c.fillStyle = "#1A1916"; c.font = `${Math.max(11, 15 * s)}px "JetBrains Mono", monospace`; c.textAlign = "center";
          const ly = cy + 40 * s + 92 * s + (34 + (i % 2) * 24) * s; // below the cups, alternating rows
          c.fillText(name, x, ly + 12 * s);
          c.strokeStyle = "#5B564D"; c.lineWidth = 1 * s;
          c.beginPath(); c.moveTo(x, cy + 40 * s + ry + 6 * s); c.lineTo(x, ly - 2 * s); c.stroke();
          c.restore();
        }
      });
    }
  }

  function size() {
    const r = canvas.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(r.width * dpr);
    canvas.height = Math.round(r.height * dpr);
    show(current, true);
  }

  function show(i, force) {
    if (i === current && !force) return;
    current = i;
    const img = frames[i], W = canvas.width, H = canvas.height;
    if (img && img.complete && img.naturalWidth) {
      const k = Math.min(W / FW, H / FH), w = FW * k, h = FH * k;
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(img, (W - w) / 2, (H - h) / 2, w, h);
    } else {
      drawHeadphones(ctx, W, H, i / (N - 1)); // until the frames are ready
    }
    count.textContent = `frame ${String(i + 1).padStart(2, "0")} / ${N}${frames.length === N ? " · WebP" : ""}`;
  }

  async function makeFrames() {
    const off = Object.assign(document.createElement("canvas"), { width: FW, height: FH });
    const octx = off.getContext("2d");
    for (let i = 0; i < N; i++) {
      drawHeadphones(octx, FW, FH, i / (N - 1));
      const blob = await new Promise((res) => off.toBlob(res, "image/webp", 0.8));
      const img = new Image();
      img.src = URL.createObjectURL(blob);
      frames.push(img);
    }
    await Promise.all(frames.map((img) => img.decode().catch(() => {})));
    show(current, true);
  }

  addEventListener("resize", size);
  size();
  document.fonts.ready.then(makeFrames);
  ScrollTrigger.create({
    trigger: ".fr-wrap", start: `top ${HEAD}px`, end: "bottom bottom",
    onUpdate: (self) => show(Math.round(self.progress * (N - 1))),
  });
}

{
  const cards = $$(".scard");
  cards.slice(0, -1).forEach((card, i) => {
    gsap.fromTo(card, { scale: 1, filter: "brightness(1)" }, {
      scale: 0.92, filter: "brightness(0.8)", ease: "none",
      scrollTrigger: { trigger: cards[i + 1], start: "top bottom", end: `top ${HEAD + 30 + 18 * (i + 1)}px`, scrub: true },
    });
  });
}

{
  const fg = $(".ring-fg"), num = $(".ring-num"), C = 2 * Math.PI * 52;
  gsap.to(".progress span", {
    scaleX: 1, ease: "none",
    scrollTrigger: {
      start: 0, end: "max", scrub: 0.2,
      onUpdate: (self) => { fg.style.strokeDashoffset = C * (1 - self.progress); num.textContent = Math.round(self.progress * 100); },
    },
  });
}

/* ------------------------------------------------ C · cursor */
{
  const stage = $(".stage-magnet"), btn = $(".magnet"), label = $(".magnet span");
  let pulled = false;
  const release = () => {
    if (!pulled) return;
    pulled = false;
    gsap.to([btn, label], { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.35)", overwrite: true });
  };
  stage.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;
    const r = btn.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2 - gsap.getProperty(btn, "x"));
    const dy = e.clientY - (r.top + r.height / 2 - gsap.getProperty(btn, "y"));
    if (Math.hypot(dx, dy) > 220) return release();
    pulled = true;
    gsap.to(btn, { x: dx * 0.35, y: dy * 0.35, duration: 0.5, ease: "power3.out", overwrite: true });
    gsap.to(label, { x: dx * 0.15, y: dy * 0.15, duration: 0.5, ease: "power3.out", overwrite: true });
  });
  stage.addEventListener("pointerleave", release);
}

$$(".tilt").forEach((card) => {
  card.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;
    const r = card.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    gsap.to(card, { rotateY: (px - 0.5) * 16, rotateX: -(py - 0.5) * 16, transformPerspective: 900, duration: 0.4, ease: "power2.out" });
    card.style.setProperty("--gx", `${px * 100}%`);
    card.style.setProperty("--gy", `${py * 100}%`);
  });
  card.addEventListener("pointerleave", () => gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.9, ease: "elastic.out(1, 0.5)" }));
});

{
  const spot = $(".spot");
  const words = "Sourdough Rye Morning buns Focaccia Baguette Seeded loaf Brioche Croissant Rye crackers Olive loaf Cinnamon knots Country bread";
  const html = words.split(" ").map((w) => `<span>${w}</span>`).join("");
  $(".spot-dim").innerHTML = html;
  $(".spot-lit").innerHTML = html;
  $(".spot-lit").setAttribute("aria-hidden", "true");
  const pos = { x: 0, y: 0 };
  const apply = () => { spot.style.setProperty("--x", `${pos.x}px`); spot.style.setProperty("--y", `${pos.y}px`); };
  // Drift on its own until a cursor arrives, so the effect shows even untouched.
  let drift;
  const startDrift = () => {
    const w = spot.clientWidth, h = spot.clientHeight;
    drift = gsap.timeline({ repeat: -1, onUpdate: apply })
      .to(pos, { x: w * 0.8, y: h * 0.3, duration: 3, ease: "sine.inOut" })
      .to(pos, { x: w * 0.55, y: h * 0.75, duration: 3, ease: "sine.inOut" })
      .to(pos, { x: w * 0.2, y: h * 0.4, duration: 3, ease: "sine.inOut" });
  };
  Object.assign(pos, { x: spot.clientWidth * 0.2, y: spot.clientHeight * 0.4 });
  apply();
  startDrift();
  spot.addEventListener("pointerenter", () => drift?.kill());
  spot.addEventListener("pointermove", (e) => {
    const r = spot.getBoundingClientRect();
    gsap.to(pos, { x: e.clientX - r.left, y: e.clientY - r.top, duration: 0.35, ease: "power3.out", overwrite: true, onUpdate: apply });
  });
  spot.addEventListener("pointerleave", startDrift);
}

/* ------------------------------------------------ D · always on */
{
  const tweens = $$(".mq-row").map((row, i) => {
    row.append(row.firstElementChild.cloneNode(true));
    const tracks = row.children;
    const tw = i % 2
      ? gsap.fromTo(tracks, { xPercent: -100 }, { xPercent: 0, duration: 26, ease: "none", repeat: -1 })
      : gsap.to(tracks, { xPercent: -100, duration: 22, ease: "none", repeat: -1 });
    tw.totalTime(tw.duration() * 1000); // room to run backwards
    return tw;
  });
  ScrollTrigger.create({
    start: 0, end: "max",
    onUpdate: (self) => {
      const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 300, 5);
      tweens.forEach((tw) => {
        gsap.to(tw, { timeScale: self.direction * boost, duration: 0.2, overwrite: true });
        gsap.to(tw, { timeScale: self.direction, duration: 1.2, delay: 0.2 });
      });
    },
  });
}

document.fonts.ready.then(() => ScrollTrigger.refresh());
