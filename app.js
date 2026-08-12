/* Logan Voss — iPhone Portfolio */
(() => {
  "use strict";

  const $ = (s) => document.querySelector(s);
  const screen = $("#screen");
  const body = document.body;

  /* ————— Data ————— */
  const APP_STORE = "https://apps.apple.com/us/app/";
  const APPS = [
    { name: "Anima Camera",  icon: "anima.jpg",        url: APP_STORE + "anima-camera/id6751657083", pin: true },
    { name: "Bazoomba",      icon: "bazoomba.jpg",     url: APP_STORE + "bazoomba/id6759260189" },
    { name: "HyperVid",      icon: "hypervid.jpg",     url: APP_STORE + "hypervid/id6757205904" },
    { name: "Boltz",         icon: "boltz.jpg",        url: APP_STORE + "boltz-strobe-art/id6757131249" },
    { name: "Life Calculator", icon: "lifecalc.jpg",   url: APP_STORE + "life-calculator-self-improve/id6748923209" },
    { name: "Orbital Pursuit", icon: "orbital.jpg",    url: APP_STORE + "orbital-pursuit/id6748704830" },
    { name: "Library",       icon: "library.jpg",      url: APP_STORE + "library-calculator/id6746132040" },
    { name: "Fluorescent",   icon: "fluorescent.png",  url: APP_STORE + "fluorescent/id6781411670?mt=12" },
    { name: "Lyric Video",   icon: "lyricvideo.png",   url: APP_STORE + "lyric-video/id6761279213?mt=12" },
    { name: "Vibey",         icon: "vibey.png",        url: APP_STORE + "vibey-animated-desktop/id6757448418?mt=12" },
    { name: "EXIF Hunter",   icon: "exifhunter.png",   url: APP_STORE + "exif-hunter/id6747992699?mt=12" },
    { name: "Virtual Snow",  icon: "virtualsnow.png",  url: APP_STORE + "virtual-snow/id6747272596?mt=12" },
    { name: "GenIcon",       icon: "genicon.png",      url: APP_STORE + "genicon-asset-resizer/id6746290386?mt=12" },
    { name: "Pexels",        icon: "pexels.jpg",       url: "https://www.pexels.com/@logan/" },
    { name: "Pixabay",       icon: "pixabay.jpg",      url: "https://pixabay.com/users/deltax-music" },
    { name: "Unsplash",      icon: "unsplash.jpg",     url: "https://unsplash.com/@loganvoss" },
    { name: "GitHub",        icon: "github.jpg",       url: "https://github.com/LoganVoss" },
    { name: "X",             icon: "x.jpg",            url: "https://x.com/LoganxVoss" },
    { name: "Threads",       icon: "threads.jpg",      url: "https://www.threads.com/@loganxvoss" },
    { name: "YouTube",       icon: "youtube.jpg",      url: "https://www.youtube.com/@DeltaXMusic" },
    { name: "Spotify",       icon: "spotify.jpg",      url: "https://open.spotify.com/artist/6aVIyHMzSIIhYNStHu8fBF" },
    { name: "Instagram",     icon: "instagram.jpg",    url: "https://www.instagram.com/loganxvoss/" },
    { name: "Calendar",      icon: "calendar",         url: "#calendar" },
  ];

  const DEV_DAY = new Date(2026, 8, 29, 10, 0, 0); // Sep 29, 2026

  /* ————— Mobile detection ————— */
  const isMobile =
    (matchMedia("(pointer: coarse)").matches && innerWidth < 1024) ||
    innerWidth < 720;
  if (isMobile) body.classList.add("mobile");
  if (new URLSearchParams(location.search).get("frame") === "1") body.classList.remove("mobile");
  if (new URLSearchParams(location.search).get("frame") === "0") body.classList.add("mobile");

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
    // calendar icon + mini icon + widget
    document.querySelectorAll(".cal-live-day").forEach((el) => (el.textContent = d.getDate()));
    document.querySelectorAll(".cal-live-dow").forEach((el) => {
      el.textContent = d.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
    });
    const wd = $("#wgCalDow"); if (wd) wd.textContent = d.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase();
    const wday = $("#wgCalDay"); if (wday) wday.textContent = d.getDate();
    // countdowns
    const days = Math.ceil((DEV_DAY.setHours(0,0,0,0) - new Date(d).setHours(0,0,0,0)) / 864e5);
    const label = days > 0 ? "in " + days + "d" : days === 0 ? "today" : "Sep 29";
    const cn = $("#calCountNotif"); if (cn) cn.textContent = label;
    const cc = $("#ceCount"); if (cc) cc.textContent = days > 0 ? days + " days" : days === 0 ? "Today" : "Sep 29";
    const wp = $("#wgCalPill"); if (wp) wp.textContent = days > 0 ? days + " days away" : days === 0 ? "Today!" : "Sep 29, 2026";
  }

  /* ————— Build home pages ————— */
  const track = $("#pagesTrack");
  const dotsBox = $("#dots");
  let pageEls = [];
  let pageCount = 1;
  let curPage = 0;

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function appEl(app) {
    const a = document.createElement("a");
    a.className = "app";
    a.setAttribute("aria-label", app.name);
    if (app.url === "#calendar") {
      a.href = "#";
      a.addEventListener("click", (e) => { e.preventDefault(); if (!draggedOrJiggle()) openCalendar(); });
    } else {
      a.href = app.url;
      a.target = "_blank";
      a.rel = "noopener";
    }
    let icon;
    if (app.icon === "calendar") {
      icon = `<span class="app-icon cal-icon"><span class="cal-live-dow cal-icon-dow">WED</span><span class="cal-live-day cal-icon-day">12</span></span>`;
    } else {
      icon = `<span class="app-icon"><img src="assets/icons/${app.icon}" alt="" draggable="false"></span>`;
    }
    a.innerHTML = icon + `<span class="app-label">${app.name}</span>`;
    return a;
  }

  function widgetCalendar() {
    const b = document.createElement("button");
    b.className = "widget w4 wg-cal";
    b.setAttribute("aria-label", "Calendar — OpenAI Dev Day");
    b.innerHTML = `
      <span class="wg-cal-left">
        <span class="wg-cal-dow" id="wgCalDow">WEDNESDAY</span>
        <span class="wg-cal-day" id="wgCalDay">12</span>
      </span>
      <span class="wg-cal-sep"></span>
      <span class="wg-cal-right">
        <span class="wg-cal-kicker">Upcoming</span>
        <span class="wg-cal-name" style="display:block">OpenAI Dev Day</span>
        <span class="wg-cal-meta" style="display:block">Tue, Sep 29 &middot; San Francisco, CA</span>
        <span class="wg-cal-pill" id="wgCalPill">48 days away</span>
      </span>`;
    b.addEventListener("click", () => { if (!draggedOrJiggle()) openCalendar(); });
    return b;
  }

  function widgetMusic() {
    const a = document.createElement("a");
    a.className = "widget w2 wg-music";
    a.href = "https://music.apple.com/us/artist/deltax/1620112963";
    a.target = "_blank";
    a.rel = "noopener";
    a.setAttribute("aria-label", "DeltaX on Apple Music");
    a.innerHTML = `
      <svg viewBox="0 0 60 60"><use href="#i-note"/></svg>
      <span class="wg-m-label">Now Playing</span>
      <span class="wg-m-name">DeltaX</span>
      <span class="wg-m-sub">Apple Music</span>`;
    return a;
  }

  function buildHome() {
    const pool = shuffle(APPS.filter((a) => !a.pin));
    const anima = APPS.find((a) => a.pin);

    // Page 1: 16 apps (rows 1–4), Anima pinned top-right (slot 3), widget rows 5–6
    const p1 = document.createElement("div");
    p1.className = "page";
    const first16 = [...pool.slice(0, 3), anima, ...pool.slice(3, 15)];
    first16.forEach((a) => p1.appendChild(appEl(a)));
    p1.appendChild(widgetCalendar());

    // Page 2: music widget (2x2) + remaining apps
    const p2 = document.createElement("div");
    p2.className = "page";
    p2.appendChild(widgetMusic());
    pool.slice(15).forEach((a) => p2.appendChild(appEl(a)));

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

    // stagger delays + jiggle delays
    let i = 0;
    document.querySelectorAll(".home .app, .home .widget").forEach((el) => {
      el.style.setProperty("--d", 0.16 + i * 0.024 + "s");
      el.style.setProperty("--jd", (Math.random() * -0.26).toFixed(2) + "s");
      i++;
    });
  }

  /* ————— Paging ————— */
  const pages = $("#pages");
  let pageW = () => pages.clientWidth;
  let dragging = false, dragStartX = 0, dragBase = 0, dragDX = 0, dragT = 0, dragVX = 0, lastX = 0, lastT = 0;
  let suppressClick = false;

  function goToPage(i) {
    curPage = Math.max(0, Math.min(pageCount - 1, i));
    track.style.transform = `translateX(${-curPage * pageW()}px)`;
    dotsBox.querySelectorAll(".dot").forEach((d, k) => d.classList.toggle("active", k === curPage));
  }

  pages.addEventListener("pointerdown", (e) => {
    if (!home.classList.contains("unlocked") || jiggle) return;
    dragging = true;
    suppressClick = false;
    dragStartX = e.clientX;
    dragBase = -curPage * pageW();
    dragDX = 0; dragVX = 0;
    lastX = e.clientX; lastT = performance.now();
    track.classList.add("dragging");
    pages.setPointerCapture(e.pointerId);
  });
  pages.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    dragDX = e.clientX - dragStartX;
    const t = performance.now();
    dragVX = (e.clientX - lastX) / Math.max(1, t - lastT);
    lastX = e.clientX; lastT = t;
    // rubber-band at edges
    let x = dragBase + dragDX;
    const min = -(pageCount - 1) * pageW();
    if (x > 0) x = x * 0.35;
    if (x < min) x = min + (x - min) * 0.35;
    track.style.transform = `translateX(${x}px)`;
  });
  function endDrag() {
    if (!dragging) return;
    dragging = false;
    track.classList.remove("dragging");
    if (Math.abs(dragDX) > 8) suppressClick = true;
    const threshold = pageW() * 0.18;
    let target = curPage;
    if (dragDX < -threshold || dragVX < -0.45) target = curPage + 1;
    else if (dragDX > threshold || dragVX > 0.45) target = curPage - 1;
    goToPage(target);
    setTimeout(() => (suppressClick = false), 60);
  }
  pages.addEventListener("pointerup", endDrag);
  pages.addEventListener("pointercancel", endDrag);

  // block accidental navigation after a drag
  document.addEventListener("click", (e) => {
    if (suppressClick) { e.preventDefault(); e.stopPropagation(); }
  }, true);

  // desktop wheel paging
  let wheelLock = 0;
  addEventListener("wheel", (e) => {
    if (!home.classList.contains("unlocked") || calOpen) return;
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
    if (e.key === "Escape" && calOpen) closeCalendar();
  });

  /* ————— Jiggle mode ————— */
  const home = $("#home");
  let jiggle = false;
  let pressTimer = null;

  function draggedOrJiggle() { return suppressClick || jiggle; }

  home.addEventListener("pointerdown", (e) => {
    if (!home.classList.contains("unlocked")) return;
    clearTimeout(pressTimer);
    if (jiggle) {
      // tap anywhere exits jiggle
      jiggle = false;
      home.classList.remove("jiggle");
      return;
    }
    pressTimer = setTimeout(() => {
      jiggle = true;
      home.classList.add("jiggle");
      if (navigator.vibrate) navigator.vibrate(12);
    }, 620);
  });
  ["pointerup", "pointercancel", "pointermove"].forEach((ev) =>
    home.addEventListener(ev, (e) => {
      if (ev === "pointermove" && dragging) clearTimeout(pressTimer);
      if (ev !== "pointermove") clearTimeout(pressTimer);
    })
  );
  home.addEventListener("click", (e) => {
    if (jiggle) { e.preventDefault(); e.stopPropagation(); }
  }, true);

  /* ————— Boot sequence ————— */
  const boot = $("#boot");
  const bootFill = $("#bootFill");
  let booted = false;

  function runBoot() {
    screen.classList.add("locked");
    requestAnimationFrame(() => boot.classList.add("on"));
    // two-stage progress, like the real thing
    bootFill.style.transition = "none";
    bootFill.style.width = "0%";
    const t1 = setTimeout(() => {
      bootFill.style.transition = "width 1.05s cubic-bezier(.5,.05,.35,1)";
      bootFill.style.width = "58%";
    }, 750);
    const t2 = setTimeout(() => {
      bootFill.style.transition = "width .8s cubic-bezier(.3,.6,.3,1)";
      bootFill.style.width = "100%";
    }, 1950);
    const t3 = setTimeout(finishBoot, 3050);
    boot.dataset.timers = [t1, t2, t3].join(",");
    boot.addEventListener("pointerdown", () => {
      boot.dataset.timers.split(",").forEach((id) => clearTimeout(+id));
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

  /* ————— Lock screen gestures ————— */
  const lock = $("#lock");
  let unlocked = false;
  let lockDrag = false, lockStartY = 0, lockDY = 0, lockVY = 0, lockLastY = 0, lockLastT = 0;

  lock.addEventListener("pointerdown", (e) => {
    if (unlocked) return;
    lockDrag = true;
    lockDY = 0; lockVY = 0;
    lockStartY = e.clientY;
    lockLastY = e.clientY; lockLastT = performance.now();
    lock.classList.add("dragging");
    lock.setPointerCapture(e.pointerId);
  });
  lock.addEventListener("pointermove", (e) => {
    if (!lockDrag || unlocked) return;
    lockDY = e.clientY - lockStartY;
    const t = performance.now();
    lockVY = (e.clientY - lockLastY) / Math.max(1, t - lockLastT);
    lockLastY = e.clientY; lockLastT = t;
    if (lockDY < 0) {
      lock.style.transform = `translateY(${lockDY}px)`;
      lock.style.opacity = String(Math.max(0.25, 1 + lockDY / (innerHeight * 0.6)));
    } else {
      lock.style.transform = `translateY(${lockDY * 0.18}px)`;
    }
  });
  function lockRelease() {
    if (!lockDrag || unlocked) return;
    lockDrag = false;
    lock.classList.remove("dragging");
    lock.style.transform = "";
    lock.style.opacity = "";
    if (lockDY < -70 || lockVY < -0.5) unlock();
  }
  lock.addEventListener("pointerup", lockRelease);
  lock.addEventListener("pointercancel", lockRelease);

  $("#swipeHint").addEventListener("click", () => !unlocked && unlock());
  $("#notifMsg").addEventListener("click", () => !unlocked && unlock());
  $("#notifCal").addEventListener("click", () => { if (!unlocked) { unlock(); setTimeout(openCalendar, 650); } });

  function unlock() {
    if (unlocked) return;
    unlocked = true;
    screen.classList.remove("locked");
    screen.classList.add("unlocked");
    lock.classList.add("away");
    home.classList.add("unlocked");
    setTimeout(() => lock.classList.add("hidden"), 700);
  }

  /* ————— Flashlight + camera ————— */
  const flash = $("#flashOverlay");
  const torchBtn = $("#flashlight");
  torchBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const on = flash.classList.toggle("on");
    torchBtn.classList.toggle("lit", on);
    if (navigator.vibrate) navigator.vibrate(8);
  });
  $("#lockCamera").addEventListener("click", (e) => {
    e.stopPropagation();
    window.open(APP_STORE + "anima-camera/id6751657083", "_blank", "noopener");
  });

  /* ————— Calendar app ————— */
  const calApp = $("#calApp");
  let calOpen = false;
  let viewDate = new Date(now().getFullYear(), now().getMonth(), 1);

  function openCalendar() {
    calOpen = true;
    viewDate = new Date(now().getFullYear(), now().getMonth(), 1);
    renderCalendar();
    calApp.classList.add("open");
  }
  function closeCalendar() {
    calOpen = false;
    calApp.classList.remove("open");
  }
  $("#calClose").addEventListener("click", closeCalendar);

  // swipe down to close
  let calDrag = false, calStartY = 0;
  calApp.addEventListener("pointerdown", (e) => { calDrag = true; calStartY = e.clientY; });
  calApp.addEventListener("pointerup", (e) => {
    if (calDrag && e.clientY - calStartY > 90) closeCalendar();
    calDrag = false;
  });

  $("#calPrev").addEventListener("click", () => { viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1); renderCalendar(); });
  $("#calNext").addEventListener("click", () => { viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1); renderCalendar(); });

  function renderCalendar() {
    const y = viewDate.getFullYear(), m = viewDate.getMonth();
    $("#calMonth").textContent = viewDate.toLocaleDateString("en-US", { month: "long" });
    $("#calYear").textContent = y;
    const grid = $("#calGrid");
    grid.innerHTML = "";
    const first = new Date(y, m, 1).getDay();
    const daysIn = new Date(y, m + 1, 0).getDate();
    const daysPrev = new Date(y, m, 0).getDate();
    const today = now();
    const cells = [];
    for (let i = first - 1; i >= 0; i--) cells.push({ d: daysPrev - i, other: true });
    for (let d = 1; d <= daysIn; d++) cells.push({ d, other: false });
    while (cells.length % 7 !== 0) cells.push({ d: cells.length - (first + daysIn) + 1, other: true });

    cells.forEach((c) => {
      const el = document.createElement("div");
      el.className = "cal-cell" + (c.other ? " other" : "");
      el.textContent = c.d;
      if (!c.other) {
        if (y === today.getFullYear() && m === today.getMonth() && c.d === today.getDate()) el.classList.add("today");
        if (y === DEV_DAY.getFullYear() && m === DEV_DAY.getMonth() && c.d === DEV_DAY.getDate()) el.classList.add("event");
      }
      grid.appendChild(el);
    });
  }

  /* ————— Wallpaper parallax (desktop) ————— */
  if (!isMobile) {
    const wp = $("#wallpaper");
    let raf = null;
    $("#stage").addEventListener("pointermove", (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const nx = e.clientX / innerWidth - 0.5;
        const ny = e.clientY / innerHeight - 0.5;
        wp.style.translate = `${nx * -10}px ${ny * -8}px`;
      });
    });
  }

  /* ————— Context menu suppression (immersion) ————— */
  screen.addEventListener("contextmenu", (e) => e.preventDefault());

  /* ————— Init ————— */
  buildHome();
  tick();
  setInterval(tick, 5000);
  runBoot();
})();
