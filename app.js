const DATA_URL = "./data/hymns_final.json";
const METRICS_URL = "./data/hymn_day_metrics.json";
const LOGO_URL = "./assets/aladura-logo.png";
const STORAGE_KEYS = {
  state: "aladura:reading-state",
  recents: "aladura:recent-hymns",
  favourites: "aladura:favourites",
  prefs: "aladura:preferences"
};

const icons = {
  book: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V5a2 2 0 0 1 2-2h5a3 3 0 0 1 3 3 3 3 0 0 1 3-3h5a2 2 0 0 1 2 2v12a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></svg>',
  home: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m3 10.5 9-7 9 7"/><path d="M5 9.5V21h5v-6h4v6h5V9.5"/></svg>',
  headphones: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 14a9 9 0 0 1 18 0"/><path d="M3 14v5a2 2 0 0 0 2 2h2v-8H5a2 2 0 0 0-2 2"/><path d="M21 14v5a2 2 0 0 1-2 2h-2v-8h2a2 2 0 0 1 2 2"/></svg>',
  music: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
  play: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7Z"/></svg>',
  pause: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14"/><path d="M16 5v14"/></svg>',
  collapse: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 12h8"/></svg>',
  expand: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m8 15 4-4 4 4"/><path d="M8 19h8"/></svg>',
  settings: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V21a2 2 0 1 1-4 0v-.08A1.7 1.7 0 0 0 8.97 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.56-1.03H3a2 2 0 1 1 0-4h.08A1.7 1.7 0 0 0 4.6 8.97a1.7 1.7 0 0 0-.34-1.88l-.06-.06A2 2 0 1 1 7.03 4.2l.06.06A1.7 1.7 0 0 0 8.97 4.6 1.7 1.7 0 0 0 10 3.04V3a2 2 0 1 1 4 0v.08a1.7 1.7 0 0 0 1.03 1.52 1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.88A1.7 1.7 0 0 0 20.96 10H21a2 2 0 1 1 0 4h-.08A1.7 1.7 0 0 0 19.4 15Z"/></svg>',
  search: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>',
  back: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>',
  share: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4"/><path d="m15.4 6.5-6.8 4"/></svg>',
  heart: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/></svg>',
  more: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>',
  history: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/><path d="M12 7v5l3 2"/></svg>',
  type: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/></svg>',
  globe: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 0 20"/><path d="M12 2a15.3 15.3 0 0 0 0 20"/></svg>',
  languages: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>',
  chevronRight: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>',
  x: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>'
};

const app = document.querySelector("#app");
let hymns = [];
let hymnMetrics = null;
let state = {
  screen: "home",
  filter: "all",
  query: "",
  currentNumber: 433,
  language: "en",
  menuOpen: false,
  drawer: null,
  expandedChorus: new Set(),
  audioNumber: null,
  audioPlaying: false,
  audioPopup: false,
  audioCollapsed: false,
  audioDock: null
};

let user = {
  reading: readStorage(STORAGE_KEYS.state, null),
  recents: readStorage(STORAGE_KEYS.recents, []),
  favourites: new Set(readStorage(STORAGE_KEYS.favourites, [])),
  prefs: readStorage(STORAGE_KEYS.prefs, { textScale: 1, lineHeight: 1.48, theme: "light" })
};

boot();

async function boot() {
  try {
    const response = await fetch(DATA_URL);
    const payload = await response.json();
    hymns = Array.isArray(payload) ? payload : payload.hymns || [];
    if (!hymns.length) throw new Error("No hymns found");
    hymnMetrics = await loadHymnMetrics();
    const saved = user.reading || {};
    state.currentNumber = saved.hymnNumber || 433;
    state.language = saved.language || "en";
    applyPreferences();
    render();
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations()
        .then((registrations) => registrations.forEach((registration) => registration.unregister()))
        .catch(() => {});
    }
  } catch (error) {
    app.innerHTML = `<main class="loading">The local hymnal data could not be loaded.</main>`;
  }
}

async function loadHymnMetrics() {
  try {
    const response = await fetch(METRICS_URL);
    return await response.json();
  } catch {
    return {
      version: 1,
      generatedAt: new Date().toISOString(),
      dailySeed: 433,
      rotationNumbers: [433, 1, 2, 4, 73, 85, 199, 201, 204, 270],
      weights: { rotation: 0.7, localEngagement: 0.3 }
    };
  }
}

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function langKey(language) {
  return language === "yo" ? "yoruba" : "english";
}

function langCode(languageName) {
  return String(languageName || "").toLowerCase().startsWith("yoruba") ? "yo" : "en";
}

function contentFor(hymn, language = state.language) {
  return hymn?.[langKey(language)] || null;
}

function availableLanguages(hymn) {
  return ["en", "yo"].filter((language) => {
    const content = contentFor(hymn, language);
    return content && (content.title || content.verses?.length);
  });
}

function titleFor(hymn, language = state.language) {
  const content = contentFor(hymn, language) || contentFor(hymn, "en") || contentFor(hymn, "yo");
  return content?.title || `Hymn ${hymn.number}`;
}

function firstLyricLine(hymn, language = state.language) {
  const content = contentFor(hymn, language) || contentFor(hymn, "en") || contentFor(hymn, "yo");
  return lyricPreview(content);
}

function lyricPreview(content) {
  if (!content) return "";
  const title = normalizeSearch(content.title);
  const lines = (content.verses || []).flatMap((verse) => [...(verse.lines || []), ...(verse.chorus || [])]);
  return lines.find((line) => normalizeSearch(line) !== title) || lines[0] || "";
}

function fieldLines(value) {
  return (Array.isArray(value) ? value : [value]).filter(Boolean);
}

function semanticInfoRows(content) {
  if (!content) return [];
  return [
    ...fieldLines(content.scripture).map((line) => ({ label: "Scripture", value: line })),
    ...fieldLines(content.metre).map((line) => ({ label: "Metre", value: line })),
    ...fieldLines(content.info).map((line) => ({ label: "Info / notes", value: line }))
  ];
}

function searchableInfoLines(content) {
  return [
    ...fieldLines(content?.scripture),
    ...fieldLines(content?.metre),
    ...fieldLines(content?.info),
    ...fieldLines(content?.metadata)
  ];
}

function displayContentFor(hymn, language = state.language) {
  return contentFor(hymn, language);
}

function normalizeSearch(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

function searchHymns(query, filter = "all", limit = 8) {
  const clean = normalizeSearch(query.trim());
  if (!clean) return [];
  const numeric = /^\d+$/.test(clean);
  return hymns
    .map((hymn) => scoreHymn(hymn, clean, numeric, filter))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.hymn.number - b.hymn.number)
    .slice(0, limit);
}

function scoreHymn(hymn, query, numeric, filter) {
  let best = { score: 0, language: "en", excerpt: "" };
  if (numeric && String(hymn.number) === query) {
    best = { score: 1000, language: availableLanguages(hymn)[0] || "en", excerpt: firstLyricLine(hymn) };
  }
  for (const language of ["en", "yo"]) {
    if (filter !== "all" && filter !== language) continue;
    const content = contentFor(hymn, language);
    if (!content) continue;
    const title = normalizeSearch(content.title);
    const lyricLines = (content.verses || []).flatMap((verse) => [...(verse.lines || []), ...(verse.chorus || [])]);
    const raw = normalizeSearch([content.title, ...searchableInfoLines(content), ...lyricLines].join(" "));
    let score = 0;
    if (title === query) score += 300;
    if (title.startsWith(query)) score += 180;
    if (title.includes(query)) score += 120;
    if (raw.includes(query)) score += 50;
    if (numeric && String(hymn.number).startsWith(query)) score += 40;
    if (score > best.score) {
      best = {
        score,
        language,
        excerpt: matchingExcerpt(content, query) || firstLyricLine(hymn, language)
      };
    }
  }
  return { hymn, ...best };
}

function matchingExcerpt(content, query) {
  const title = normalizeSearch(content.title);
  const lyricLines = (content.verses || []).flatMap((verse) => [...(verse.lines || []), ...(verse.chorus || [])]);
  return lyricLines.find((line) => normalizeSearch(line).includes(query) && normalizeSearch(line) !== title)
    || searchableInfoLines(content).find((line) => normalizeSearch(line).includes(query))
    || lyricLines.find((line) => normalizeSearch(line).includes(query))
    || "";
}

function findHymn(number) {
  return hymns.find((hymn) => hymn.number === Number(number)) || hymns[0];
}

function hymnOfTheDay() {
  const rotation = (hymnMetrics?.rotationNumbers || []).filter((number) => findHymn(number));
  if (!rotation.length) return findHymn(433);
  const dayIndex = Math.floor(Date.now() / 86400000);
  const seed = Number(hymnMetrics?.dailySeed || 0);
  const local = readStorage("aladura:hymn-metrics", {});
  const preferred = rotation
    .map((number, index) => ({
      number,
      score: ((dayIndex + seed + index) % rotation.length === 0 ? 100 : 0) + Number(local[number]?.opens || 0) * 0.15
    }))
    .sort((a, b) => b.score - a.score || a.number - b.number)[0];
  return findHymn(preferred?.number || 433);
}

function languageForHymn(hymn, fallback = state.language) {
  const languages = availableLanguages(hymn);
  if (state.filter !== "all" && languages.includes(state.filter)) return state.filter;
  if (languages.includes(fallback)) return fallback;
  if (languages.includes("en")) return "en";
  return languages[0] || "en";
}

function recentHymns() {
  const fallback = [433, 2, 1, 4].map((number, index) => {
    const hymn = findHymn(number);
    const mixedLanguage = index === 1 || index === 3 ? "yo" : "en";
    const language = state.filter === "all" && availableLanguages(hymn).includes(mixedLanguage)
      ? mixedLanguage
      : languageForHymn(hymn, mixedLanguage);
    return { hymnNumber: number, language, hymn };
  });
  const stored = (user.recents || [])
    .map((item) => ({ ...item, hymn: findHymn(item.hymnNumber) }))
    .filter((item) => item.hymn && availableLanguages(item.hymn).includes(item.language))
    .filter((item) => state.filter === "all" || item.language === state.filter);
  const seen = new Set();
  return [...stored, ...fallback].filter((item) => {
    const key = `${item.hymnNumber}:${item.language}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 4);
}

function continueReading() {
  const saved = user.reading;
  if (saved?.hymnNumber) {
    const hymn = findHymn(saved.hymnNumber);
    const languages = availableLanguages(hymn);
    if (state.filter === "all" || languages.includes(state.filter)) {
      return { hymn, language: state.filter === "all" && languages.includes(saved.language) ? saved.language : languageForHymn(hymn, saved.language) };
    }
  }
  const hymn = hymnOfTheDay();
  return { hymn, language: languageForHymn(hymn, "en") };
}

function render() {
  if (state.screen === "reader") app.innerHTML = renderReader();
  else if (state.screen === "lyrics") app.innerHTML = renderLyrics();
  else if (state.screen === "audio") app.innerHTML = renderAudio();
  else if (state.screen === "settings") app.innerHTML = renderSettingsScreen();
  else if (state.screen === "history") app.innerHTML = renderHistoryScreen();
  else app.innerHTML = renderHome();
  bindEvents();
}

function renderHome() {
  const day = hymnOfTheDay();
  const dayLanguage = languageForHymn(day, "en");
  const continued = continueReading();
  const results = searchHymns(state.query, state.filter);
  return `
    <main class="viewport">
      <section class="home-layout" aria-label="Home">
        <header class="brand-header">
          <img class="brand-logo" src="${LOGO_URL}" alt="Aladura Songbook logo">
          <div>
            <h1 class="brand-title">Aladura<br>Songbook</h1>
            <div class="brand-yoruba" lang="yo">Iwe Orin Aladura</div>
            <div class="brand-tagline">Hymns for Worship. A Heritage to Explore.</div>
          </div>
          <button class="icon-button settings-button" type="button" data-screen="settings" aria-label="Settings">${icons.settings}</button>
        </header>
        <div class="search-wrap">
          <label class="search-box">
            ${icons.search}
            <input id="search" type="search" autocomplete="off" placeholder="Search number, title, lyrics, or info" value="${escapeAttr(state.query)}">
          </label>
          ${state.query ? renderSearchResults(results) : ""}
        </div>
        <div class="filters" aria-label="Hymn filters">
          ${filterButton("all", icons.book, "All Hymns")}
          ${filterButton("en", icons.globe, "English")}
          ${filterButton("yo", icons.languages, "Yoruba")}
        </div>
        <div class="home-primary">
          ${renderHymnOfTheDay(day, dayLanguage)}
        </div>
        <div class="home-secondary">
          <div class="section-head">
            <h2>Continue Reading</h2>
            <button class="text-button" type="button" data-open="${continued.hymn.number}" data-lang="${continued.language}" aria-label="Open continue reading">${icons.chevronRight}</button>
          </div>
          ${renderContinue(continued.hymn, continued.language)}
          <div class="section-head">
            <h2>Most Recent Hymns</h2>
            <button class="text-button" type="button" data-screen="history">See All ${icons.chevronRight}</button>
          </div>
          <div class="recent-grid">${recentHymns().map((item) => renderRecent(item.hymn, item.language)).join("")}</div>
        </div>
      </section>
    </main>
    ${renderBottomNav("home")}
    ${renderDrawer()}
    ${renderToast()}
  `;
}

function renderLyrics() {
  const rows = hymnalRows();
  const activeFilter = state.filter === "yo" || state.filter === "en" ? state.filter : state.language;
  const label = activeFilter === "yo" ? "Yoruba" : "English";
  return `
    <main class="viewport lyrics-viewport">
      <section class="lyrics-browser" aria-label="Lyrics">
        <header class="browser-top">
          <button class="icon-button" type="button" data-home aria-label="Back">${icons.back}</button>
          <div>
            <h1>Lyrics</h1>
            <p>${rows.length} ${label.toLowerCase()} available</p>
          </div>
        </header>
        <div class="search-wrap">
          <label class="search-box">
            ${icons.search}
            <input id="search" type="search" autocomplete="off" placeholder="Search number, title, lyrics, or info" value="${escapeAttr(state.query)}">
          </label>
        </div>
        <div class="filters" aria-label="Lyrics filters">
          ${filterButton("en", icons.globe, "English")}
          ${filterButton("yo", icons.languages, "Yoruba")}
        </div>
        <div class="hymnal-list" role="list">
          ${rows.length ? rows.map((item) => renderHymnalRow(item.hymn, item.language, item.excerpt)).join("") : `<p class="empty-copy">No hymns match this search.</p>`}
        </div>
      </section>
    </main>
    ${renderBottomNav("lyrics")}
    ${renderDrawer()}
    ${renderToast()}
  `;
}

function renderAudio() {
  const current = findHymn(state.audioNumber || state.currentNumber);
  const language = languageForHymn(current, state.language);
  const audioRows = audioCatalogRows();
  const results = searchHymns(state.query, state.filter, 80).filter((item) => audioFileFor(item.hymn, item.language));
  const rows = state.query.trim() ? results : audioRows;
  return `
    <main class="viewport audio-viewport">
      <section class="audio-layout" aria-label="Audio">
        <header class="browser-top">
          <button class="icon-button" type="button" data-home aria-label="Back">${icons.back}</button>
          <div>
            <h1>Audio</h1>
            <p>${audioRows.length} hymns with audio references</p>
          </div>
          <button class="icon-button settings-button compact" type="button" data-screen="settings" aria-label="Settings">${icons.settings}</button>
        </header>
        ${renderAudioPlayer(current, language)}
        <div class="search-wrap">
          <label class="search-box">
            ${icons.search}
            <input id="search" type="search" autocomplete="off" placeholder="Search audio by number, title, or lyrics" value="${escapeAttr(state.query)}">
          </label>
        </div>
        <div class="filters" aria-label="Audio filters">
          ${filterButton("all", icons.headphones, "All Audio")}
          ${filterButton("en", icons.globe, "English")}
          ${filterButton("yo", icons.languages, "Yoruba")}
        </div>
        <div class="audio-list" role="list">
          ${rows.length ? rows.map((item) => renderAudioRow(item.hymn, item.language)).join("") : `<p class="empty-copy">No audio references match this search.</p>`}
        </div>
      </section>
    </main>
    ${renderBottomNav("audio")}
    ${renderDrawer()}
    ${renderToast()}
  `;
}

function renderSettingsScreen() {
  const favouritesCount = user.favourites.size;
  const recentsCount = user.recents.length;
  const languageLabel = state.language === "yo" ? "Yoruba" : "English";
  return `
    <main class="viewport screen-viewport">
      <section class="screen-layout" aria-label="Settings">
        <header class="browser-top">
          <button class="icon-button" type="button" data-home aria-label="Back">${icons.back}</button>
          <div>
            <h1>Settings</h1>
            <p>Profile, reading, library, and app details</p>
          </div>
        </header>
        <section class="profile-card">
          <div class="profile-mark"><img src="${LOGO_URL}" alt=""></div>
          <div>
            <h2>Aladura Reader</h2>
            <p>Local profile for reading preferences and hymn activity.</p>
          </div>
        </section>
        <div class="settings-list">
          <section class="settings-card">
            <h3>Default Language</h3>
            <div class="settings-segment" aria-label="Default language">
              <button type="button" data-setting-language="en" aria-pressed="${state.language === "en"}">English</button>
              <button type="button" data-setting-language="yo" aria-pressed="${state.language === "yo"}">Yoruba</button>
            </div>
            <p>Current reader language: ${languageLabel}</p>
          </section>
          <section class="settings-card">
            <h3>Reading</h3>
            <div class="pref-row compact">
              <label for="settingsTextScale">Text size</label>
              <input id="settingsTextScale" type="range" min="0.9" max="1.3" step="0.05" value="${user.prefs.textScale}" data-pref="textScale">
            </div>
            <div class="pref-row compact">
              <label for="settingsLineHeight">Line spacing</label>
              <input id="settingsLineHeight" type="range" min="1.35" max="1.75" step="0.05" value="${user.prefs.lineHeight}" data-pref="lineHeight">
            </div>
          </section>
          <section class="settings-card">
            <h3>Library</h3>
            <button class="settings-row-button" type="button" data-screen="history">
              <span>History</span>
              <strong>${recentsCount}</strong>
              ${icons.chevronRight}
            </button>
            <div class="settings-stat"><span>Favourites</span><strong>${favouritesCount}</strong></div>
            <button class="settings-action" type="button" data-clear-recents ${recentsCount ? "" : "disabled"}>Clear recent hymns</button>
          </section>
          <section class="settings-card">
            <h3>About</h3>
            <p>Aladura Songbook uses the bundled hymnal data in this prototype. Account sync, feedback, and theme decisions are left for product direction.</p>
          </section>
        </div>
      </section>
    </main>
    ${renderBottomNav("home")}
    ${renderDrawer()}
    ${renderToast()}
  `;
}

function renderHistoryScreen() {
  const rows = user.recents
    .map((item) => ({ ...item, hymn: findHymn(item.hymnNumber) }))
    .filter((item) => item.hymn && availableLanguages(item.hymn).includes(item.language));
  return `
    <main class="viewport screen-viewport">
      <section class="screen-layout" aria-label="History">
        <header class="browser-top">
          <button class="icon-button" type="button" data-home aria-label="Back">${icons.back}</button>
          <div>
            <h1>History</h1>
            <p>${rows.length} recently opened hymns</p>
          </div>
        </header>
        <div class="history-list full">
          ${rows.length ? rows.map((item) => renderContinue(item.hymn, item.language)).join("") : `<p class="empty-copy">History has not been added yet.</p>`}
        </div>
      </section>
    </main>
    ${renderBottomNav("home")}
    ${renderToast()}
  `;
}

function hymnalRows() {
  const activeFilter = state.screen === "lyrics" && state.filter === "all" ? state.language : state.filter;
  if (state.query.trim()) {
    return searchHymns(state.query, activeFilter, 200);
  }
  return hymns
    .map((hymn) => {
      const languages = availableLanguages(hymn);
      if (!languages.length) return null;
      const preferred = activeFilter === "all" ? (languages.includes(state.language) ? state.language : languages[0]) : activeFilter;
      if (!languages.includes(preferred)) return null;
      return { hymn, language: preferred, excerpt: firstLyricLine(hymn, preferred) };
    })
    .filter(Boolean);
}

function audioCatalogRows() {
  return hymns
    .flatMap((hymn) => availableLanguages(hymn).map((language) => ({ hymn, language })))
    .filter((item) => audioFileFor(item.hymn, item.language))
    .filter((item) => state.filter === "all" || item.language === state.filter)
    .slice(0, 80);
}

function audioFileFor(hymn, language) {
  const key = language === "yo" ? "yoruba" : "english";
  return hymn?.audio?.[key] || "";
}

function renderAudioPlayer(hymn, language) {
  const file = audioFileFor(hymn, language);
  return `
    <section class="audio-player" style="${hymnArtStyle(hymn)}">
      <div class="audio-cover" aria-hidden="true">
        <span>${hymn.number}</span>
      </div>
      <div class="audio-now">
        <span class="eyebrow">Now Selected</span>
        <h2>${escapeHtml(titleFor(hymn, language))}</h2>
        <p>${file ? escapeHtml(file) : "No audio reference for this language yet."}</p>
        <div class="audio-controls">
          <button class="audio-play" type="button" data-audio-toggle ${file ? "" : "disabled"} aria-label="${state.audioPlaying ? "Pause" : "Play"}">${state.audioPlaying ? icons.pause : icons.play}</button>
        <span class="audio-status">${file ? "File reference listed" : "Unavailable"}</span>
        </div>
      </div>
    </section>
  `;
}

function renderAudioRow(hymn, language) {
  return `
    <button class="audio-row" type="button" data-audio-select="${hymn.number}" data-lang="${language}" style="${hymnArtStyle(hymn)}" role="listitem">
      <span class="audio-thumb"><span>${hymn.number}</span></span>
      <span class="audio-copy">
        <span class="audio-title">${escapeHtml(titleFor(hymn, language))}</span>
        <span class="audio-file">${escapeHtml(audioFileFor(hymn, language))}</span>
      </span>
      ${state.filter === "all" ? `<span class="pill ${language === "yo" ? "yo" : ""}">${language === "yo" ? "Yoruba" : "English"}</span>` : ""}
      <span class="audio-row-play">${icons.play}</span>
    </button>
  `;
}

function renderHymnalRow(hymn, language, excerpt = "") {
  return `
    <button class="hymnal-row" type="button" data-open="${hymn.number}" data-lang="${language}" role="listitem" style="${hymnArtStyle(hymn)}">
      <span class="hymnal-number hymn-art-number">${hymn.number}</span>
      <span class="hymnal-copy">
        <span class="hymnal-title">${escapeHtml(titleFor(hymn, language))}</span>
        <span class="hymnal-excerpt">${escapeHtml(excerpt || firstLyricLine(hymn, language))}</span>
      </span>
      ${languagePill(language)}
    </button>
  `;
}

function shouldShowLanguagePill() {
  return state.filter === "all" && state.screen !== "lyrics";
}

function languagePill(language) {
  if (!shouldShowLanguagePill()) return "";
  return `<span class="pill ${language === "yo" ? "yo" : ""}">${language === "yo" ? "Yoruba" : "English"}</span>`;
}

function filterButton(filter, icon, label) {
  const pressed = state.filter === filter || (state.screen === "lyrics" && state.filter === "all" && state.language === filter);
  return `<button class="filter-button" type="button" data-filter="${filter}" aria-pressed="${pressed}">${icon}<span>${label}</span></button>`;
}

function renderSearchResults(results) {
  if (!results.length) {
    return `<div class="search-results"><div class="empty-copy" style="padding:16px">No hymns found. Try a hymn number, title, or lyric words.</div></div>`;
  }
  return `
    <div class="search-results" role="listbox" aria-label="Search results">
      ${results.map(({ hymn, language, excerpt }) => `
        <button class="result-row" type="button" data-open="${hymn.number}" data-lang="${language}">
          <span class="result-number hymn-art-number" style="${hymnArtStyle(hymn)}">${hymn.number}</span>
          <span>
            <span class="result-title">${escapeHtml(titleFor(hymn, language))}</span>
            <span class="result-excerpt">${escapeHtml(excerpt)}</span>
            ${languagePill(language)}
          </span>
        </button>
      `).join("")}
    </div>
  `;
}

function renderHymnOfTheDay(hymn, language = languageForHymn(hymn, "en")) {
  return `
    <button class="hymn-day" type="button" data-open="${hymn.number}" data-lang="${language}" style="${hymnArtStyle(hymn)}">
      <span class="hymn-day-copy">
        <span class="eyebrow">Hymn of the Day</span>
        <span class="day-number">${hymn.number}</span>
        <h2>${escapeHtml(titleFor(hymn, language))}</h2>
        <p>${escapeHtml(firstLyricLine(hymn, language))}</p>
      </span>
      <span class="open-hymn">${icons.chevronRight}</span>
    </button>
  `;
}

function renderContinue(hymn, language) {
  return `
    <button class="continue-card" type="button" data-open="${hymn.number}" data-lang="${language}" style="${hymnArtStyle(hymn)}">
      <span class="continue-number hymn-art-number">${hymn.number}</span>
      <span class="continue-body">
        <span class="continue-title">${escapeHtml(titleFor(hymn, language))}</span>
        <span class="continue-excerpt">${escapeHtml(firstLyricLine(hymn, language))}</span>
        ${languagePill(language)}
      </span>
      <span class="continue-arrow">${icons.chevronRight}</span>
    </button>
  `;
}

function renderRecent(hymn, language) {
  return `
    <button class="recent-card" type="button" data-open="${hymn.number}" data-lang="${language}" style="${hymnArtStyle(hymn)}">
      <span class="recent-art" aria-hidden="true"></span>
      <span class="recent-number">${hymn.number}</span>
      <span class="recent-body">
        <span class="recent-title">${escapeHtml(titleFor(hymn, language))}</span>
        ${languagePill(language)}
      </span>
    </button>
  `;
}

function renderReader() {
  const hymn = findHymn(state.currentNumber);
  const languages = availableLanguages(hymn);
  if (!languages.includes(state.language)) state.language = languages[0] || "en";
  const content = displayContentFor(hymn, state.language);
  const favourite = user.favourites.has(hymn.number);
  return `
    <main class="reader-viewport" style="--reader-scale:${user.prefs.textScale};--reader-leading:${user.prefs.lineHeight}">
      <header class="reader-top">
        <button class="icon-button" type="button" data-home aria-label="Back">${icons.back}</button>
        <h1>Hymn ${hymn.number}</h1>
        <button class="icon-button audio-header-button" type="button" data-reader-audio aria-label="Play hymn audio">${icons.music}</button>
        <button class="icon-button" type="button" data-share aria-label="Share Hymn">${icons.share}</button>
        <button class="icon-button danger ${favourite ? "active" : ""}" type="button" data-favourite aria-label="${favourite ? "Remove favourite" : "Favourite"}">${heartIcon(favourite)}</button>
        <button class="icon-button" type="button" data-menu aria-label="More">${icons.more}</button>
      </header>
      ${state.menuOpen ? renderReaderMenu() : ""}
      <div class="language-switch" aria-label="Language selector">
        ${languageButton("en", languages)}
        ${languageButton("yo", languages)}
      </div>
      <section class="hymn-identity" style="${hymnArtStyle(hymn)}">
        <button class="hymn-step hymn-step-prev" type="button" data-step-hymn="-1" aria-label="Previous hymn">${icons.back}</button>
        <button class="hymn-step hymn-step-next" type="button" data-step-hymn="1" aria-label="Next hymn">${icons.chevronRight}</button>
        <div class="hymn-number" data-number="${hymn.number}">${hymn.number}</div>
        <h2 class="hymn-title" lang="${state.language}">${escapeHtml(titleFor(hymn, state.language))}</h2>
        ${renderHymnInfo(content)}
      </section>
      <section class="lyrics" lang="${state.language}">
        ${content ? renderVerses(hymn, content) : `<p class="empty-copy">This language is not available for this hymn yet.</p>`}
      </section>
    </main>
    ${renderBottomNav("home")}
    ${renderDrawer()}
    ${state.audioPopup ? renderReaderAudioPopup(hymn, state.language) : ""}
    ${renderToast()}
  `;
}

function renderReaderAudioPopup(hymn, language) {
  const file = audioFileFor(hymn, language);
  const dockStyle = `${hymnArtStyle(hymn)}${state.audioDock ? `--audio-left:${state.audioDock.x}px;--audio-top:${state.audioDock.y}px;` : ""}`;
  if (state.audioCollapsed) {
    return `
      <aside class="audio-popover collapsed" style="${dockStyle}" aria-label="Collapsed hymn audio">
        <div class="audio-collapsed-card">
          <span class="audio-drag-grip" data-audio-drag aria-hidden="true"></span>
          <button class="audio-mini-action primary" type="button" data-audio-toggle ${file ? "" : "disabled"} aria-label="Play hymn audio">${state.audioPlaying ? icons.pause : icons.play}</button>
          <button class="audio-mini-action" type="button" data-audio-expand aria-label="Expand hymn audio">${icons.expand}</button>
        </div>
      </aside>
    `;
  }
  return `
    <aside class="audio-popover" style="${dockStyle}" aria-label="Hymn audio">
      <div class="audio-popover-card" data-audio-drag>
        <div class="audio-mini-cover"><span>${hymn.number}</span></div>
        <div class="audio-mini-copy">
          <h2>${escapeHtml(titleFor(hymn, language))}</h2>
        </div>
        <button class="audio-mini-action primary" type="button" data-audio-toggle ${file ? "" : "disabled"} aria-label="Play hymn audio">${state.audioPlaying ? icons.pause : icons.play}</button>
        <button class="audio-mini-action" type="button" data-audio-collapse aria-label="Collapse hymn audio">${icons.collapse}</button>
        <button class="audio-mini-action subtle" type="button" data-go-audio aria-label="Open Audio page">${icons.headphones}</button>
      </div>
    </aside>
  `;
}

function heartIcon(active) {
  return active
    ? '<svg class="icon icon-fill" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/></svg>'
    : icons.heart;
}

function languageButton(language, languages) {
  const label = language === "yo" ? "Yoruba" : "English";
  const available = languages.includes(language);
  return `<button class="language-button" type="button" data-language="${language}" aria-pressed="${state.language === language}" ${available ? "" : "disabled"}>${label}</button>`;
}

function renderReaderMenu() {
  return `
    <div class="reader-menu" role="menu">
      <button class="menu-item" type="button" data-drawer="preferences" role="menuitem">
        ${icons.type}
        <span><strong>Reading Preferences</strong><span>Text size, line spacing...</span></span>
      </button>
      <button class="menu-item" type="button" data-drawer="hymn-background" role="menuitem">
        ${icons.history}
        <span><strong>Hymn Background</strong><span>History, metre, notes...</span></span>
      </button>
      <button class="menu-item" type="button" data-share role="menuitem">
        ${icons.share}
        <span><strong>Share Hymn</strong></span>
      </button>
    </div>
  `;
}

function imageAssetForHymn(hymn) {
  const number = Number(hymn?.number || 0);
  if (number === 433) return "assets/hymn-hero-433.jpg";
  const pool = ["assets/hymn-thumb-1.jpg", "assets/hymn-thumb-2.jpg", "assets/hymn-thumb-4.jpg", "assets/hymn-thumb-433.jpg"];
  return pool[Math.abs(number) % pool.length];
}

function hymnArtStyle(hymn) {
  const number = Number(hymn?.number || 0);
  const hue = (number * 37) % 360;
  const positionX = 30 + (number * 17) % 55;
  const positionY = 22 + (number * 11) % 58;
  return `--hymn-image:url('${imageAssetForHymn(hymn)}');--hymn-hue:${hue}deg;--hymn-position:${positionX}% ${positionY}%;`;
}

function renderHymnInfo(content) {
  const rows = semanticInfoRows(content);
  if (!rows.length) return "";
  return `
    <div class="metadata" aria-label="Hymn information">
      ${rows.map((row) => `
        <div class="metadata-line">
          <span>${escapeHtml(row.label)}</span>
          <strong>${escapeHtml(row.value)}</strong>
        </div>
      `).join("")}
    </div>
  `;
}

function renderVerses(hymn, content) {
  const fullChorus = findFullChorus(content);
  return (content.verses || []).map((verse) => {
    const chorus = verse.chorus || [];
    const chorusMode = chorusModeFor(chorus, fullChorus);
    const verseId = `${hymn.number}-${state.language}-${verse.number}`;
    return `
      <article>
        <div class="verse">
          <div class="verse-number">${escapeHtml(String(verse.number))}.</div>
          <div class="verse-lines">${(verse.lines || []).map((line) => `<p>${escapeHtml(line)}</p>`).join("")}</div>
        </div>
        ${chorusMode === "full" ? renderFullChorus(chorus) : ""}
        ${chorusMode === "abbrev" ? renderAbbrevChorus(verseId, chorus, fullChorus) : ""}
      </article>
    `;
  }).join("");
}

function findFullChorus(content) {
  return (content.verses || []).map((verse) => verse.chorus || []).find((chorus) => chorus.length > 1 && !isAbbreviatedChorus(chorus)) || null;
}

function isAbbreviatedChorus(chorus) {
  return chorus.length === 1 && /\.{2,}|…/.test(chorus[0]);
}

function chorusModeFor(chorus, fullChorus) {
  if (!chorus.length) return "none";
  if (isAbbreviatedChorus(chorus) && fullChorus) return "abbrev";
  return "full";
}

function renderFullChorus(lines) {
  return `
    <div class="chorus-block">
      <div class="chorus-bar"></div>
      <div>
        <div class="chorus-label" aria-hidden="true">Chorus</div>
        <div class="chorus-lines">${lines.map((line) => `<p>${escapeHtml(line)}</p>`).join("")}</div>
      </div>
    </div>
  `;
}

function renderAbbrevChorus(verseId, sourceLines, resolvedLines) {
  const expanded = state.expandedChorus.has(verseId);
  const lines = expanded ? resolvedLines : sourceLines;
  return `
    <div class="chorus-block">
      <div class="chorus-bar"></div>
      <div>
        <button class="chorus-label" type="button" data-chorus="${escapeAttr(verseId)}" aria-expanded="${expanded}">
          Chorus ${icons.chevronRight}
        </button>
        <div class="chorus-lines">${lines.map((line) => `<p>${escapeHtml(line)}</p>`).join("")}</div>
      </div>
    </div>
  `;
}

function renderBottomNav(current) {
  return `
    <nav class="bottom-nav" aria-label="Primary">
      <button class="nav-button" type="button" data-nav="lyrics" aria-current="${current === "lyrics" ? "page" : "false"}">${icons.book}<span>Lyrics</span></button>
      <button class="nav-button" type="button" data-nav="home" aria-current="${current === "home" ? "page" : "false"}">${icons.home}<span>Home</span></button>
      <button class="nav-button" type="button" data-nav="audio" aria-current="${current === "audio" ? "page" : "false"}">${icons.headphones}<span>Audio</span></button>
    </nav>
  `;
}

function renderDrawer() {
  if (!state.drawer) return "";
  if (state.drawer === "preferences") return renderPreferencesDrawer();
  if (state.drawer === "history") return renderHistoryDrawer();
  if (state.drawer === "hymn-background") return renderHymnBackgroundDrawer();
  if (state.drawer === "settings") return renderSettingsDrawer();
  return "";
}

function renderPreferencesDrawer() {
  return `
    <aside class="drawer" role="dialog" aria-modal="true" aria-label="Reading Preferences">
      <div class="drawer-head">
        <h2>Reading Preferences</h2>
        <button class="icon-button" type="button" data-close-drawer aria-label="Close">${icons.x}</button>
      </div>
      <div class="pref-row">
        <label for="textScale">Text size</label>
        <input id="textScale" type="range" min="0.9" max="1.3" step="0.05" value="${user.prefs.textScale}" data-pref="textScale">
      </div>
      <div class="pref-row">
        <label for="lineHeight">Line spacing</label>
        <input id="lineHeight" type="range" min="1.35" max="1.75" step="0.05" value="${user.prefs.lineHeight}" data-pref="lineHeight">
      </div>
      <p class="empty-copy">The default light theme is active. Additional themes can be added when the product decision is made.</p>
    </aside>
  `;
}

function renderHistoryDrawer() {
  const rows = recentHymns();
  return `
    <aside class="drawer" role="dialog" aria-modal="true" aria-label="History">
      <div class="drawer-head">
        <h2>History</h2>
        <button class="icon-button" type="button" data-close-drawer aria-label="Close">${icons.x}</button>
      </div>
      <div class="history-list">
        ${rows.length ? rows.map((item) => renderContinue(item.hymn, item.language)).join("") : `<p class="empty-copy">History has not been added yet.</p>`}
      </div>
    </aside>
  `;
}

function renderHymnBackgroundDrawer() {
  const hymn = findHymn(state.currentNumber);
  const content = displayContentFor(hymn, state.language);
  const rows = semanticInfoRows(content);
  return `
    <aside class="drawer" role="dialog" aria-modal="true" aria-label="Hymn Background">
      <div class="drawer-head">
        <h2>Hymn ${hymn.number} Background</h2>
        <button class="icon-button" type="button" data-close-drawer aria-label="Close">${icons.x}</button>
      </div>
      <div class="history-list">
        ${rows.length ? rows.map((row) => `
          <div class="metadata-line">
            <span>${escapeHtml(row.label)}</span>
            <strong>${escapeHtml(row.value)}</strong>
          </div>
        `).join("") : `<p class="empty-copy">No background notes are available for this hymn yet.</p>`}
      </div>
    </aside>
  `;
}

function renderSettingsDrawer() {
  const favouritesCount = user.favourites.size;
  const recentsCount = user.recents.length;
  const languageLabel = state.language === "yo" ? "Yoruba" : "English";
  return `
    <aside class="drawer" role="dialog" aria-modal="true" aria-label="Settings">
      <div class="drawer-head">
        <h2>Settings</h2>
        <button class="icon-button" type="button" data-close-drawer aria-label="Close">${icons.x}</button>
      </div>
      <div class="settings-list">
        <section class="settings-card">
          <h3>Default Language</h3>
          <div class="settings-segment" aria-label="Default language">
            <button type="button" data-setting-language="en" aria-pressed="${state.language === "en"}">English</button>
            <button type="button" data-setting-language="yo" aria-pressed="${state.language === "yo"}">Yoruba</button>
          </div>
          <p>Current reader language: ${languageLabel}</p>
        </section>
        <section class="settings-card">
          <h3>Reading</h3>
          <div class="pref-row compact">
            <label for="settingsTextScale">Text size</label>
            <input id="settingsTextScale" type="range" min="0.9" max="1.3" step="0.05" value="${user.prefs.textScale}" data-pref="textScale">
          </div>
          <div class="pref-row compact">
            <label for="settingsLineHeight">Line spacing</label>
            <input id="settingsLineHeight" type="range" min="1.35" max="1.75" step="0.05" value="${user.prefs.lineHeight}" data-pref="lineHeight">
          </div>
        </section>
        <section class="settings-card">
          <h3>Library</h3>
          <div class="settings-stat"><span>Favourites</span><strong>${favouritesCount}</strong></div>
          <div class="settings-stat"><span>Recent hymns</span><strong>${recentsCount}</strong></div>
          <button class="settings-action" type="button" data-clear-recents ${recentsCount ? "" : "disabled"}>Clear recent hymns</button>
        </section>
        <section class="settings-card">
          <h3>About</h3>
          <p>Aladura Songbook uses the bundled hymnal data in this prototype. New account, feedback, and theme decisions are intentionally left out until the product direction is confirmed.</p>
        </section>
      </div>
    </aside>
  `;
}

function renderToast() {
  return state.toast ? `<div class="toast" role="status">${escapeHtml(state.toast)}</div>` : "";
}

function bindEvents() {
  document.querySelectorAll("[data-open]").forEach((button) => {
    button.addEventListener("click", () => openReader(Number(button.dataset.open), button.dataset.lang || state.language));
  });
  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.filter = button.dataset.filter;
      if (state.filter === "en" || state.filter === "yo") state.language = state.filter;
      render();
    });
  });
  document.querySelector("#search")?.addEventListener("input", (event) => {
    const caret = event.target.selectionStart || 0;
    state.query = event.target.value;
    render();
    const search = document.querySelector("#search");
    search?.focus();
    search?.setSelectionRange(caret, caret);
  });
  document.querySelector("[data-home]")?.addEventListener("click", () => {
    state.screen = "home";
    state.menuOpen = false;
    state.drawer = null;
    state.audioPopup = false;
    render();
  });
  document.querySelector("[data-menu]")?.addEventListener("click", () => {
    state.menuOpen = !state.menuOpen;
    render();
  });
  document.querySelector("[data-share]")?.addEventListener("click", shareHymn);
  document.querySelector("[data-favourite]")?.addEventListener("click", toggleFavourite);
  document.querySelector("[data-reader-audio]")?.addEventListener("click", () => {
    state.audioPopup = true;
    state.audioCollapsed = false;
    state.menuOpen = false;
    state.audioNumber = state.currentNumber;
    render();
  });
  document.querySelector("[data-close-audio-popup]")?.addEventListener("click", () => {
    state.audioPopup = false;
    render();
  });
  document.querySelector("[data-go-audio]")?.addEventListener("click", () => {
    state.screen = "audio";
    state.audioPopup = false;
    state.drawer = null;
    state.menuOpen = false;
    state.audioNumber = state.currentNumber;
    render();
  });
  document.querySelector("[data-audio-collapse]")?.addEventListener("click", () => {
    state.audioCollapsed = true;
    render();
  });
  document.querySelector("[data-audio-expand]")?.addEventListener("click", () => {
    state.audioCollapsed = false;
    render();
  });
  bindAudioDrag();
  document.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => {
      state.language = button.dataset.language;
      saveReadingState();
      render();
    });
  });
  document.querySelectorAll("[data-chorus]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.chorus;
      if (state.expandedChorus.has(id)) state.expandedChorus.delete(id);
      else state.expandedChorus.add(id);
      render();
    });
  });
  document.querySelectorAll("[data-step-hymn]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      stepReader(button.dataset.stepHymn);
    });
  });
  document.querySelectorAll("[data-drawer]").forEach((button) => {
    button.addEventListener("click", () => {
      state.drawer = button.dataset.drawer;
      state.menuOpen = false;
      render();
    });
  });
  document.querySelectorAll("[data-screen]").forEach((button) => {
    button.addEventListener("click", () => {
      state.screen = button.dataset.screen;
      state.drawer = null;
      state.menuOpen = false;
      state.audioPopup = false;
      render();
      window.scrollTo({ top: 0, behavior: "instant" });
    });
  });
  document.querySelectorAll("[data-close-drawer]").forEach((button) => {
    button.addEventListener("click", () => {
      state.drawer = null;
      render();
    });
  });
  document.querySelectorAll("[data-pref]").forEach((input) => {
    input.addEventListener("input", () => {
      user.prefs[input.dataset.pref] = Number(input.value);
      writeStorage(STORAGE_KEYS.prefs, user.prefs);
      applyPreferences();
      render();
    });
  });
  document.querySelectorAll("[data-setting-language]").forEach((button) => {
    button.addEventListener("click", () => {
      state.language = button.dataset.settingLanguage;
      if (state.filter === "en" || state.filter === "yo") state.filter = state.language;
      saveReadingState();
      render();
    });
  });
  document.querySelector("[data-clear-recents]")?.addEventListener("click", () => {
    user.recents = [];
    writeStorage(STORAGE_KEYS.recents, user.recents);
    showToast("Recent hymns cleared.");
  });
  document.querySelectorAll("[data-audio-select]").forEach((button) => {
    button.addEventListener("click", () => {
      state.audioNumber = Number(button.dataset.audioSelect);
      state.language = button.dataset.lang || state.language;
      state.audioPlaying = false;
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
  document.querySelector("[data-audio-toggle]")?.addEventListener("click", () => {
    state.audioPlaying = !state.audioPlaying;
    showToast(state.audioPlaying
      ? "Audio reference selected. Media assets are not bundled yet."
      : "Audio paused.");
  });
  document.querySelectorAll("[data-nav]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.nav === "home") {
        state.screen = "home";
        state.drawer = null;
        state.audioPopup = false;
        render();
      } else if (button.dataset.nav === "lyrics") {
        state.screen = "lyrics";
        state.drawer = null;
        state.menuOpen = false;
        state.audioPopup = false;
        render();
      } else {
        state.screen = "audio";
        state.drawer = null;
        state.menuOpen = false;
        state.audioPopup = false;
        state.audioNumber = state.audioNumber || state.currentNumber;
        render();
      }
    });
  });
}

function bindAudioDrag() {
  const dock = document.querySelector(".audio-popover");
  const handles = document.querySelectorAll("[data-audio-drag]");
  if (!handles.length || !dock) return;
  const startDrag = (event) => {
    if (event.target.closest("button")) return;
    event.preventDefault();
    const start = dock.getBoundingClientRect();
    const offsetX = event.clientX - start.left;
    const offsetY = event.clientY - start.top;
    if (event.pointerId !== undefined) event.currentTarget.setPointerCapture?.(event.pointerId);
    dock.classList.add("dragging");
    const move = (moveEvent) => {
      const width = dock.offsetWidth;
      const height = dock.offsetHeight;
      const x = Math.max(8, Math.min(window.innerWidth - width - 8, moveEvent.clientX - offsetX));
      const y = Math.max(8, Math.min(window.innerHeight - height - 64, moveEvent.clientY - offsetY));
      state.audioDock = { x: Math.round(x), y: Math.round(y) };
      dock.style.setProperty("--audio-left", `${state.audioDock.x}px`);
      dock.style.setProperty("--audio-top", `${state.audioDock.y}px`);
    };
    const up = () => {
      dock.classList.remove("dragging");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up, { once: true });
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up, { once: true });
  };
  handles.forEach((handle) => {
    handle.addEventListener("pointerdown", startDrag);
    handle.addEventListener("mousedown", startDrag);
  });
}

function openReader(number, language) {
  const hymn = findHymn(number);
  const languages = availableLanguages(hymn);
  state.currentNumber = hymn.number;
  state.language = languages.includes(language) ? language : languages[0] || "en";
  state.screen = "reader";
  state.query = "";
  state.drawer = null;
  state.menuOpen = false;
  state.audioPopup = false;
  saveReadingState();
  addRecent(hymn.number, state.language);
  recordHymnMetric(hymn.number, "opens");
  render();
  window.scrollTo({ top: 0, behavior: "instant" });
}

function stepReader(direction) {
  const currentIndex = hymns.findIndex((hymn) => hymn.number === Number(state.currentNumber));
  if (currentIndex < 0) return;
  const step = Number(direction) || 1;
  let index = currentIndex;
  for (let attempt = 0; attempt < hymns.length; attempt += 1) {
    index = (index + step + hymns.length) % hymns.length;
    const candidate = hymns[index];
    const languages = availableLanguages(candidate);
    if (languages.includes(state.language)) {
      openReader(candidate.number, state.language);
      return;
    }
    if (state.filter === "all" && languages.length) {
      openReader(candidate.number, languages[0]);
      return;
    }
  }
}

function recordHymnMetric(number, field) {
  const metrics = readStorage("aladura:hymn-metrics", {});
  const key = String(number);
  metrics[key] = metrics[key] || {};
  metrics[key][field] = Number(metrics[key][field] || 0) + 1;
  metrics[key].lastAt = new Date().toISOString();
  writeStorage("aladura:hymn-metrics", metrics);
}

function saveReadingState() {
  user.reading = {
    hymnNumber: state.currentNumber,
    language: state.language,
    updatedAt: new Date().toISOString()
  };
  writeStorage(STORAGE_KEYS.state, user.reading);
}

function addRecent(hymnNumber, language) {
  user.recents = [
    { hymnNumber, language, updatedAt: new Date().toISOString() },
    ...user.recents.filter((item) => item.hymnNumber !== hymnNumber || item.language !== language)
  ].slice(0, 12);
  writeStorage(STORAGE_KEYS.recents, user.recents);
}

function toggleFavourite() {
  const hymn = findHymn(state.currentNumber);
  if (user.favourites.has(hymn.number)) {
    user.favourites.delete(hymn.number);
    showToast("Removed from favourites.");
  } else {
    user.favourites.add(hymn.number);
    showToast("Added to favourites.");
  }
  writeStorage(STORAGE_KEYS.favourites, [...user.favourites]);
  render();
}

async function shareHymn() {
  const hymn = findHymn(state.currentNumber);
  const title = titleFor(hymn, state.language);
  const text = `Hymn ${hymn.number}: ${title}`;
  try {
    if (navigator.share) {
      await navigator.share({ title: "Aladura Songbook", text, url: location.href });
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(`${text} ${location.href}`);
      showToast("Hymn link copied.");
    } else {
      showToast(text);
    }
  } catch {
    showToast("Share was cancelled.");
  }
}

function showToast(message) {
  state.toast = message;
  render();
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    state.toast = "";
    render();
  }, 1900);
}

function applyPreferences() {
  document.documentElement.style.setProperty("--reader-scale", user.prefs.textScale);
  document.documentElement.style.setProperty("--reader-leading", user.prefs.lineHeight);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, "&#096;");
}
