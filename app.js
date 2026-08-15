/* Logan Voss — iPhone Portfolio */
(() => {
  "use strict";

  const $ = (s) => document.querySelector(s);
  const screen = $("#screen");
  const body = document.body;

  /* ————— Data ————— */
  const APP_STORE = "https://apps.apple.com/us/app/";
  // Logan's own apps — page 2
  const MY_APPS = [
    { name: "Anima Camera",  icon: "anima.jpg",        url: APP_STORE + "anima-camera/id6751657083" },
    { name: "Bazoomba",      icon: "bazoomba.jpg",     url: APP_STORE + "bazoomba/id6759260189" },
    { name: "HyperVid",      icon: "hypervid.jpg",     url: APP_STORE + "hypervid/id6757205904" },
    { name: "Boltz",         icon: "boltz.jpg",        url: APP_STORE + "boltz-strobe-art/id6757131249" },
    { name: "Life",          icon: "lifecalc.jpg",      url: APP_STORE + "life-calculator-self-improve/id6748923209" },
    { name: "Orbital",       icon: "orbital.jpg",    url: APP_STORE + "orbital-pursuit/id6748704830" },
    { name: "Library",       icon: "library.jpg",      url: APP_STORE + "library-calculator/id6746132040" },
    { name: "Fluorescent",   icon: "fluorescent.png",  url: APP_STORE + "fluorescent/id6781411670?mt=12" },
    { name: "Lyric Video",   icon: "lyricvideo.png",   url: APP_STORE + "lyric-video/id6761279213?mt=12" },
    { name: "Vibey",         icon: "vibey.png",        url: APP_STORE + "vibey-animated-desktop/id6757448418?mt=12" },
    { name: "Exif Hunter",   icon: "exifhunter.png",   url: APP_STORE + "exif-hunter/id6747992699?mt=12" },
    { name: "Virtual Snow",  icon: "virtualsnow.png",  url: APP_STORE + "virtual-snow/id6747272596?mt=12" },
    { name: "Gen Icon",      icon: "genicon.png",      url: APP_STORE + "genicon-asset-resizer/id6746290386?mt=12" },
    { name: "Notch RGB",     icon: "vossy.png",        url: APP_STORE + "vossy/id6745646180?mt=12" },
    { name: "Jetz",          icon: "jetz.png",         url: APP_STORE + "jetz/id6745764555?mt=12" },
  ];
  // Social / profile apps — page 1
  const SOCIAL_APPS = [
    { name: "Pexels",        icon: "pexels.jpg",       url: "https://www.pexels.com/@logan/" },
    { name: "Pixabay",       icon: "pixabay.jpg",      url: "https://pixabay.com/users/deltax-music" },
    { name: "Unsplash",      icon: "unsplash.jpg",     url: "https://unsplash.com/@loganvoss" },
    { name: "GitHub",        icon: "github.jpg",       url: "https://github.com/LoganVoss" },
    { name: "X",             icon: "x.jpg",            url: "https://x.com/LoganxVoss" },
    { name: "Threads",       icon: "threads.jpg",      url: "https://www.threads.com/@loganxvoss" },
    { name: "YouTube",       icon: "youtube.jpg",      url: "https://www.youtube.com/@DeltaXMusic" },
    { name: "Spotify",       icon: "spotify.jpg",      url: "https://open.spotify.com/artist/6aVIyHMzSIIhYNStHu8fBF" },
    { name: "Instagram",     icon: "instagram.jpg",    url: "https://www.instagram.com/loganxvoss/" },
  ];

  const DEV_DAY = new Date(2026, 8, 29, 10, 0, 0); // Sep 29, 2026
  const DEV_DAY_URL = "https://devday.openai.com";

  /* ————— Mobile detection ————— */
  const isMobile =
    (matchMedia("(pointer: coarse)").matches && innerWidth < 1024) ||
    innerWidth < 720;
  const root = document.documentElement;
  if (isMobile) { body.classList.add("mobile"); root.classList.add("mobile"); }
  if (new URLSearchParams(location.search).get("frame") === "1") { body.classList.remove("mobile"); root.classList.remove("mobile"); }
  if (new URLSearchParams(location.search).get("frame") === "0") { body.classList.add("mobile"); root.classList.add("mobile"); }

  /* ————— Clock ————— */
  const now = () => new Date();
  function fmtTime(d) {
    let h = d.getHours() % 12; if (h === 0) h = 12;
    return h + ":" + String(d.getMinutes()).padStart(2, "0");
  }
  function fmtDate(d) {
    return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  }
  function tick() {
    const d = now();
    $("#sbTime").textContent = fmtTime(d);
    $("#lockTime").textContent = fmtTime(d);
    $("#lockDate").textContent = fmtDate(d);
    const eventDay = new Date(DEV_DAY.getFullYear(), DEV_DAY.getMonth(), DEV_DAY.getDate());
    const today = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const days = Math.ceil((eventDay - today) / 864e5);
    const label = days > 0 ? "in " + days + "d" : days === 0 ? "today" : "Sep 29";
    const cn = $("#calCountNotif"); if (cn) cn.textContent = label;
    const wp = $("#wgCalPill"); if (wp) wp.textContent = days > 0 ? days + " days away" : days === 0 ? "Today!" : "Sep 29, 2026";
  }

  /* ————— Build home pages ————— */
  const track = $("#pagesTrack");
  const dotsBox = $("#dots");
  const home = $("#home");
  let pageEls = [];
  let pageCount = 1;
  let curPage = 0;

  function appEl(app) {
    const a = document.createElement("a");
    a.className = "app";
    a.setAttribute("aria-label", app.name);
    a.href = app.url;
    a.target = "_blank";
    a.rel = "noopener";
    a.innerHTML = `<span class="app-icon"><img src="assets/icons/${app.icon}" alt="" draggable="false"></span><span class="app-label">${app.name}</span>`;
    return a;
  }

  function widgetCalendar() {
    const b = document.createElement("a");
    b.className = "widget w4 wg-cal";
    b.href = DEV_DAY_URL;
    b.target = "_blank";
    b.rel = "noopener";
    b.setAttribute("aria-label", "Reminder — OpenAI DevDay, September 29, San Francisco");
    b.innerHTML = `
      <span class="wg-cal-badge">
        <span class="wg-cal-badge-mon">SEP</span>
        <span class="wg-cal-badge-day">29</span>
      </span>
      <span class="wg-cal-right">
        <span class="wg-cal-kicker">Reminder</span>
        <span class="wg-cal-name" style="display:block">OpenAI DevDay</span>
        <span class="wg-cal-meta">Tuesday</span>
        <span class="wg-cal-meta">San Francisco, CA</span>
      </span>
      <span class="wg-cal-pill" id="wgCalPill">48 days away</span>`;
    return b;
  }

  function widgetMusic() {
    const a = document.createElement("a");
    a.className = "widget w2 wg-music";
    a.href = "https://music.apple.com/us/album/weightless/6799590827";
    a.target = "_blank";
    a.rel = "noopener";
    a.setAttribute("aria-label", "DeltaX on Apple Music");
    a.innerHTML = `
      <img class="wg-m-cover" src="assets/weightless.jpg" alt="" draggable="false">
      <span class="wg-m-shade"></span>
      <span class="wg-m-copy">
        <span class="wg-m-label">Now Playing</span>
        <span class="wg-m-name">Weightless</span>
        <span class="wg-m-sub">DeltaX</span>
      </span>`;
    return a;
  }

  function buildHome() {
    // Page 1: reminder, then Logan's requested social layout.
    const p1 = document.createElement("div");
    p1.className = "page";
    p1.appendChild(widgetCalendar());
    [
      "Pexels", "Unsplash", "Pixabay", "GitHub",
      "Instagram", "Threads", "X", "YouTube",
      "Spotify",
    ].forEach((name) => p1.appendChild(appEl(SOCIAL_APPS.find((app) => app.name === name))));

    // Page 2: square music widget top-left; Anima stays pinned top-right.
    // The rest are interleaved so no two white or dark icons sit side by side.
    const p2 = document.createElement("div");
    p2.className = "page";
    p2.appendChild(widgetMusic());
    [
      "HyperVid", "Anima Camera",
      "Gen Icon", "Life",
      "Boltz", "Orbital", "Library", "Fluorescent",
      "Bazoomba", "Virtual Snow", "Notch RGB", "Vibey",
      "Exif Hunter", "Jetz", "Lyric Video",
    ].forEach((name) => p2.appendChild(appEl(MY_APPS.find((app) => app.name === name))));

    track.append(p1, p2);
    pageEls = [p1, p2];
    pageCount = 2;

    for (let i = 0; i < pageCount; i++) {
      const d = document.createElement("button");
      d.className = "dot" + (i === 0 ? " active" : "");
      d.setAttribute("aria-label", "Page " + (i + 1));
      d.addEventListener("click", () => goToPage(i));
      dotsBox.appendChild(d);
    }

    // stagger delays
    let i = 0;
    document.querySelectorAll(".home .app, .home .widget").forEach((el) => {
      el.style.setProperty("--d", 0.16 + i * 0.024 + "s");
      i++;
    });
  }

  /* ————— Paging (lazy pointer capture so taps reach the anchors) ————— */
  const pages = $("#pages");
  let pageW = () => pages.clientWidth;
  let press = null; // {x, dx, vx, lastX, lastT, captured, base}
  let suppressClick = false;

  function goToPage(i) {
    curPage = Math.max(0, Math.min(pageCount - 1, i));
    track.style.transform = `translateX(${-curPage * pageW()}px)`;
    dotsBox.querySelectorAll(".dot").forEach((d, k) => d.classList.toggle("active", k === curPage));
  }

  pages.addEventListener("pointerdown", (e) => {
    if (!home.classList.contains("unlocked")) return;
    press = { x: e.clientX, dx: 0, vx: 0, lastX: e.clientX, lastT: performance.now(), captured: false, base: -curPage * pageW(), id: e.pointerId };
  });
  pages.addEventListener("pointermove", (e) => {
    if (!press) return;
    const dx = e.clientX - press.x;
    if (!press.captured) {
      if (Math.abs(dx) < 9) return;
      press.captured = true;
      try { pages.setPointerCapture(press.id); } catch (_) {}
      track.classList.add("dragging");
    }
    const t = performance.now();
    press.vx = (e.clientX - press.lastX) / Math.max(1, t - press.lastT);
    press.lastX = e.clientX; press.lastT = t;
    press.dx = dx;
    let x = press.base + dx;
    const min = -(pageCount - 1) * pageW();
    if (x > 0) x = x * 0.35;
    if (x < min) x = min + (x - min) * 0.35;
    track.style.transform = `translateX(${x}px)`;
  });
  function endPress() {
    if (!press) return;
    const p = press; press = null;
    if (!p.captured) return; // clean tap — let the native click through
    track.classList.remove("dragging");
    suppressClick = true;
    setTimeout(() => (suppressClick = false), 80);
    const threshold = pageW() * 0.18;
    let target = curPage;
    if (p.dx < -threshold || p.vx < -0.45) target = curPage + 1;
    else if (p.dx > threshold || p.vx > 0.45) target = curPage - 1;
    goToPage(target);
  }
  pages.addEventListener("pointerup", endPress);
  pages.addEventListener("pointercancel", endPress);

  // block accidental navigation after a drag
  document.addEventListener("click", (e) => {
    if (suppressClick) { e.preventDefault(); e.stopPropagation(); }
  }, true);

  // desktop wheel paging
  let wheelLock = 0;
  addEventListener("wheel", (e) => {
    if (!home.classList.contains("unlocked")) return;
    const t = Date.now();
    if (t - wheelLock < 650) return;
    const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(d) < 18) return;
    wheelLock = t;
    goToPage(curPage + (d > 0 ? 1 : -1));
  }, { passive: true });

  addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") goToPage(curPage + 1);
    if (e.key === "ArrowLeft") goToPage(curPage - 1);
    if (e.key === "ArrowUp" && !unlocked) unlock();
  });

  /* ————— Boot sequence (logo + bar animate via CSS so they paint instantly) ————— */
  const boot = $("#boot");
  let booted = false;

  function runBoot() {
    const t3 = setTimeout(finishBoot, 3150);
    boot.addEventListener("pointerdown", () => {
      clearTimeout(t3);
      finishBoot();
    }, { once: true });
  }

  function finishBoot() {
    if (booted) return;
    booted = true;
    boot.classList.add("done");
    const lock = $("#lock");
    lock.classList.add("show");
    setTimeout(() => $("#notifMsg").classList.add("in"), 850);
    setTimeout(() => $("#notifCal").classList.add("in"), 2100);
    setTimeout(() => boot.remove(), 900);
  }

  /* ————— Lock screen gestures (lazy capture) ————— */
  const lock = $("#lock");
  let unlocked = false;
  let lpress = null;

  lock.addEventListener("pointerdown", (e) => {
    if (unlocked) return;
    lpress = { y: e.clientY, dy: 0, vy: 0, lastY: e.clientY, lastT: performance.now(), captured: false, id: e.pointerId };
  });
  lock.addEventListener("pointermove", (e) => {
    if (!lpress || unlocked) return;
    const dy = e.clientY - lpress.y;
    if (!lpress.captured) {
      if (Math.abs(dy) < 9) return;
      lpress.captured = true;
      try { lock.setPointerCapture(lpress.id); } catch (_) {}
      lock.classList.add("dragging");
    }
    const t = performance.now();
    lpress.vy = (e.clientY - lpress.lastY) / Math.max(1, t - lpress.lastT);
    lpress.lastY = e.clientY; lpress.lastT = t;
    lpress.dy = dy;
    if (dy < 0) {
      lock.style.transform = `translateY(${dy}px)`;
      lock.style.opacity = String(Math.max(0.25, 1 + dy / (innerHeight * 0.6)));
    } else {
      lock.style.transform = `translateY(${dy * 0.18}px)`;
    }
  });
  function lockRelease() {
    if (!lpress || unlocked) return;
    const p = lpress; lpress = null;
    lock.classList.remove("dragging");
    lock.style.transform = "";
    lock.style.opacity = "";
    if (p.captured && (p.dy < -70 || p.vy < -0.5)) unlock();
  }
  lock.addEventListener("pointerup", lockRelease);
  lock.addEventListener("pointercancel", lockRelease);

  $("#swipeHint").addEventListener("click", () => !unlocked && unlock());
  $("#notifMsg").addEventListener("click", () => !unlocked && unlock());
  $("#notifCal").addEventListener("click", () => {
    window.open(DEV_DAY_URL, "_blank", "noopener");
    if (!unlocked) unlock();
  });

  function unlock() {
    if (unlocked) return;
    unlocked = true;
    screen.classList.add("unlocked");
    lock.classList.add("away");
    home.classList.add("unlocked");
    setTimeout(() => lock.classList.add("hidden"), 700);
  }

  /* ————— Lock camera + flashlight buttons ————— */
  $("#lockCamera").addEventListener("click", (e) => {
    e.stopPropagation();
    window.open(APP_STORE + "anima-camera/id6751657083", "_blank", "noopener");
  });
  const torch = $("#lockTorch");
  const flash = $("#flashOverlay");
  torch.addEventListener("click", (e) => {
    e.stopPropagation();
    const on = torch.classList.toggle("on");
    flash.classList.toggle("on", on);
  });

  /* ————— Context menu suppression (immersion) ————— */
  screen.addEventListener("contextmenu", (e) => e.preventDefault());

  /* ————— Init ————— */
  buildHome();
  tick();
  setInterval(tick, 5000);
  runBoot();
})();
