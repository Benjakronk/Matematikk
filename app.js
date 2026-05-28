/* Matematikkurs - app-logikk: navigasjon, quiz, lagring, backup. */

const STORAGE_KEY = "mattekurs.progress.v1";
const PASS_THRESHOLD = 0.8; // 80% riktige for å markere emnet som fullført

const state = {
  progress: loadProgress(),
  currentGrade: null,
  currentTopic: null,
};

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { topics: {} };
    const parsed = JSON.parse(raw);
    if (!parsed.topics) parsed.topics = {};
    return parsed;
  } catch (e) {
    return { topics: {} };
  }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
  renderSidebar();
}

function topicScore(topicId) {
  const t = state.progress.topics[topicId];
  if (!t) return { best: 0, completed: false };
  return { best: t.best || 0, completed: !!t.completed };
}

function totalQuestions() {
  let n = 0;
  CURRICULUM.grades.forEach(g => g.topics.forEach(t => { n += t.quiz.length; }));
  return n;
}

function gradeProgress(grade) {
  let totalQ = 0, scoreQ = 0;
  grade.topics.forEach(t => {
    const max = topicMaxPoints(t);
    totalQ += max;
    const ts = topicScore(t.id);
    scoreQ += Math.min(ts.best, max);
  });
  if (totalQ === 0) return 0;
  return Math.round((scoreQ / totalQ) * 100);
}

function overallProgress() {
  let totalQ = 0, scoreQ = 0;
  CURRICULUM.grades.forEach(g => g.topics.forEach(t => {
    const max = topicMaxPoints(t);
    totalQ += max;
    scoreQ += Math.min(topicScore(t.id).best, max);
  }));
  if (totalQ === 0) return 0;
  return Math.round((scoreQ / totalQ) * 100);
}

/* -------------------- Sidebar -------------------- */

function renderSidebar() {
  const nav = document.getElementById("grade-nav");
  nav.innerHTML = "";
  CURRICULUM.grades.forEach(grade => {
    const btn = document.createElement("button");
    btn.className = "grade-btn" + (state.currentGrade === grade.id ? " active" : "");
    const pct = gradeProgress(grade);
    btn.innerHTML = `<span>${grade.name}</span><span class="pct">${pct}%</span>`;
    btn.addEventListener("click", () => openGrade(grade.id));
    nav.appendChild(btn);
  });

  const pct = overallProgress();
  document.getElementById("overall-pct").textContent = pct + "%";
  const ring = document.getElementById("overall-ring");
  ring.style.background = `conic-gradient(var(--accent) ${pct * 3.6}deg, #cdd6ea 0deg)`;
}

/* -------------------- Trinn-side -------------------- */

function openGrade(gradeId) {
  state.currentGrade = gradeId;
  state.currentTopic = null;
  const grade = CURRICULUM.grades.find(g => g.id === gradeId);
  const root = document.getElementById("content");

  root.innerHTML = `
    <div class="grade-header">
      <div>
        <h2>${grade.name}</h2>
        <p>${grade.tagline}</p>
      </div>
      <div style="text-align:right;">
        <div style="font-size:24px;font-weight:700;">${gradeProgress(grade)}%</div>
        <div style="font-size:12px;color:var(--ink-soft)">fullført</div>
      </div>
    </div>
    <div id="topic-list" class="topic-list"></div>
  `;

  const list = document.getElementById("topic-list");
  grade.topics.forEach(t => {
    const ts = topicScore(t.id);
    const card = document.createElement("div");
    card.className = "topic-card";
    card.innerHTML = `
      <h3>${t.title}</h3>
      <p>${t.summary}</p>
      <div class="topic-meta">
        <span>${t.quiz.length} oppgaver</span>
        <span class="${ts.completed ? "done" : ""}">${ts.completed ? "✓ Fullført" : (ts.best > 0 ? `${ts.best}/${t.quiz.length} riktige` : "Ikke startet")}</span>
      </div>
    `;
    card.addEventListener("click", () => openTopic(grade.id, t.id));
    list.appendChild(card);
  });

  renderSidebar();
  window.scrollTo({ top: 0 });
}

/* -------------------- Emne-side -------------------- */

function openTopic(gradeId, topicId) {
  state.currentGrade = gradeId;
  state.currentTopic = topicId;
  const grade = CURRICULUM.grades.find(g => g.id === gradeId);
  const topic = grade.topics.find(t => t.id === topicId);
  const root = document.getElementById("content");

  const ts = topicScore(topic.id);
  const topRefs = buildTopReferences(topic);
  const bottomRefs = buildBottomReferences(topic);
  const flowHtml = buildInterleavedFlow(topic);

  root.innerHTML = `
    <button class="nav-back">← Tilbake til ${grade.name}</button>
    <div class="topic-page">
      <h2>${topic.title}</h2>
      <p style="color:var(--ink-soft)">${topic.summary}</p>

      ${topRefs}

      <p style="color:var(--ink-soft);font-size:13px;margin:18px 0 0;">📚 Les teksten i hver del og prøv oppgavene under før du går videre. Trykk <b>Sjekk svar</b> for å se om du har gjort det riktig.</p>

      <form id="quiz-form">${flowHtml}</form>

      ${bottomRefs}

      <div class="quiz-actions">
        <button class="btn primary" id="btn-check-all">Sjekk alle ubesvarte</button>
        <button class="btn ghost" id="btn-clear">Tøm og start på nytt</button>
        <span class="quiz-score ${ts.completed ? "passed" : ""}" id="quiz-score">${ts.best > 0 ? `Beste: ${ts.best}/${topicMaxPoints(topic)} poeng` : ""}</span>
      </div>

      <div class="topic-nav">
        ${prevTopicButton(gradeId, topicId)}
        ${nextTopicButton(gradeId, topicId)}
      </div>
    </div>
  `;

  root.querySelector(".nav-back").addEventListener("click", () => openGrade(gradeId));

  const sessionState = { byQuestion: new Map() };
  topic.quiz.forEach((q, idx) => {
    const btn = document.getElementById(`check-${idx}`);
    if (btn) btn.addEventListener("click", (e) => { e.preventDefault(); checkSingleQuestion(topic, idx, sessionState); });
  });
  document.getElementById("btn-check-all").addEventListener("click", (e) => { e.preventDefault(); checkAllQuestions(topic, sessionState); });
  document.getElementById("btn-clear").addEventListener("click", (e) => { e.preventDefault(); openTopic(gradeId, topicId); });
  wireNavButtons(gradeId, topicId);

  window.scrollTo({ top: 0 });
}

function numPlaceholder(q) {
  if (q && typeof q.answer === "number" && Number.isInteger(q.answer) && (q.tol == null || q.tol < 1)) {
    return "Hele tall";
  }
  return "Tall (komma for desimal)";
}

function renderInput(type, qattrs, options, q) {
  if (type === "mc") {
    return `<div class="quiz-options">` + options.map((opt, i) =>
      `<label data-idx="${i}"><input type="radio" ${qattrs} value="${i}" /> <span>${opt}</span></label>`
    ).join("") + `</div>`;
  } else if (type === "num") {
    const isInt = q && typeof q.answer === "number" && Number.isInteger(q.answer) && (q.tol == null || q.tol < 1);
    const inputMode = isInt ? "numeric" : "decimal";
    return `<input class="quiz-input" type="text" inputmode="${inputMode}" ${qattrs} placeholder="${numPlaceholder(q)}" />`;
  }
  return `<input class="quiz-input" type="text" ${qattrs} placeholder="Svar" style="width:240px" />`;
}

const subLabel = (i) => String.fromCharCode(97 + i); // a, b, c, d ...

function renderQuestion(q, idx) {
  const actions = `<div class="q-actions">
    <button class="btn btn-check-one" id="check-${idx}">Sjekk svar</button>
  </div>`;
  if (q.type === "multi") {
    const partsHtml = q.parts.map((p, pi) => {
      const qattrs = p.type === "mc"
        ? `name="q${idx}p${pi}"`
        : `data-q="${idx}" data-pi="${pi}"`;
      const input = renderInput(p.type, qattrs, p.options || [], p);
      return `<div class="subpart" data-pi="${pi}">
        <div class="sp-q"><span class="sp-label">${subLabel(pi)})</span>${p.q}</div>
        ${input}
        <div class="quiz-feedback" data-pfb="${pi}"></div>
      </div>`;
    }).join("");
    return `<div class="quiz-q" data-idx="${idx}" data-multi="1">
      <div class="qtext">${idx + 1}. ${q.q}</div>
      <div class="subparts">${partsHtml}</div>
      ${actions}
      <div class="quiz-feedback" id="fb-${idx}"></div>
    </div>`;
  }
  const qattrs = q.type === "mc" ? `name="q${idx}"` : `data-q="${idx}"`;
  const body = renderInput(q.type, qattrs, q.options || [], q);
  return `<div class="quiz-q" data-idx="${idx}">
    <div class="qtext">${idx + 1}. ${q.q}</div>
    ${body}
    ${actions}
    <div class="quiz-feedback" id="fb-${idx}"></div>
  </div>`;
}

function checkSinglePart(p, scope, nameAttr) {
  // returnerer { ok, correctText }
  let ok = false, correctText = "";
  if (p.type === "mc") {
    const sel = scope.querySelector(`input[${nameAttr}]:checked`);
    const ua = sel ? Number(sel.value) : null;
    ok = ua === p.answer;
    scope.querySelectorAll(".quiz-options label").forEach(l => {
      l.classList.remove("correct","wrong");
      const i = Number(l.dataset.idx);
      if (i === p.answer) l.classList.add("correct");
      if (ua === i && i !== p.answer) l.classList.add("wrong");
    });
    correctText = `Riktig: <b>${p.options[p.answer]}</b>.`;
  } else if (p.type === "num") {
    const inp = scope.querySelector("input.quiz-input");
    const val = parseNumberInput(inp.value);
    const tol = p.tol != null ? p.tol : 0.0001;
    ok = !isNaN(val) && Math.abs(val - p.answer) <= tol;
    inp.classList.remove("correct","wrong");
    inp.classList.add(ok ? "correct" : "wrong");
    correctText = `Riktig: <b>${p.answer}</b>.`;
  } else {
    const inp = scope.querySelector("input.quiz-input");
    const norm = normalizeText(inp.value);
    const accept = Array.isArray(p.answer) ? p.answer : [p.answer];
    ok = accept.some(a => normalizeText(a) === norm);
    inp.classList.remove("correct","wrong");
    inp.classList.add(ok ? "correct" : "wrong");
    correctText = `Riktig: <b>${Array.isArray(p.answer) ? p.answer[0] : p.answer}</b>.`;
  }
  return { ok, correctText };
}

function normalizeText(s) {
  return String(s).toLowerCase().replace(/\s+/g, "").replace(/\./g, ",");
}

function parseNumberInput(raw) {
  if (raw == null) return NaN;
  const s = String(raw).trim().replace(/\s/g, "").replace(",", ".");
  if (s === "") return NaN;
  return Number(s);
}

function gradeQuestion(q, card, idxPrefix) {
  // returnerer { isCorrect, ok: number, total: number }
  if (q.type === "multi") {
    let okCount = 0;
    q.parts.forEach((p, pi) => {
      const sub = card.querySelector(`.subpart[data-pi="${pi}"]`);
      const pfb = sub.querySelector(`[data-pfb="${pi}"]`);
      const nameAttr = p.type === "mc" ? `name="${idxPrefix}p${pi}"` : `data-pi="${pi}"`;
      const r = checkSinglePart(p, sub, nameAttr);
      if (r.ok) {
        okCount++;
        pfb.className = "quiz-feedback ok";
        pfb.innerHTML = `✓ ${p.explain || ""}`;
      } else {
        pfb.className = "quiz-feedback no";
        pfb.innerHTML = `✗ ${r.correctText} ${p.explain || ""}`;
      }
    });
    return { isCorrect: okCount === q.parts.length, ok: okCount, total: q.parts.length };
  }
  const nameAttr = q.type === "mc" ? `name="${idxPrefix}"` : `data-q`;
  const r = checkSinglePart(q, card, nameAttr);
  return { isCorrect: r.ok, ok: r.ok ? 1 : 0, total: 1, correctText: r.correctText };
}

function checkSingleQuestion(topic, idx, sessionState) {
  const q = topic.quiz[idx];
  const card = document.querySelector(`.quiz-q[data-idx="${idx}"]`);
  const fb = document.getElementById(`fb-${idx}`);
  const r = gradeQuestion(q, card, `q${idx}`);
  sessionState.byQuestion.set(idx, { points: r.ok, total: r.total });

  card.classList.remove("graded-ok","graded-no","graded-partial");
  card.classList.add("graded");
  if (r.isCorrect) card.classList.add("graded-ok");
  else if (r.ok > 0) card.classList.add("graded-partial");
  else card.classList.add("graded-no");

  if (q.type === "multi") {
    fb.className = r.isCorrect ? "quiz-feedback ok" : "quiz-feedback no";
    fb.innerHTML = r.isCorrect
      ? `✓ Alle ${r.total} deloppgaver riktige.`
      : `${r.ok} av ${r.total} deloppgaver riktige.`;
  } else if (r.isCorrect) {
    fb.className = "quiz-feedback ok";
    fb.innerHTML = `✓ Riktig. ${q.explain || ""}`;
  } else {
    fb.className = "quiz-feedback no";
    fb.innerHTML = `✗ ${r.correctText} ${q.explain || ""}`;
  }
  updateSessionProgress(topic, sessionState);
}

function updateSessionProgress(topic, sessionState) {
  let pts = 0, total = 0;
  sessionState.byQuestion.forEach(v => { pts += v.points; total += v.total; });
  const maxPts = topicMaxPoints(topic);
  const prev = state.progress.topics[topic.id] || { best: 0, completed: false };
  const best = Math.max(prev.best || 0, pts);
  const completed = prev.completed || (maxPts > 0 && pts / maxPts >= PASS_THRESHOLD);
  state.progress.topics[topic.id] = {
    best, completed,
    lastScore: pts, total: maxPts,
    updated: Date.now()
  };
  saveProgress();

  const scoreEl = document.getElementById("quiz-score");
  if (scoreEl) {
    const checked = sessionState.byQuestion.size;
    scoreEl.textContent = `Resultat: ${pts}/${maxPts} poeng · ${checked}/${topic.quiz.length} oppgaver sjekket${completed ? " · (fullført!)" : ""}`;
    scoreEl.className = "quiz-score" + (completed ? " passed" : "");
  }
}

function checkAllQuestions(topic, sessionState) {
  topic.quiz.forEach((q, idx) => {
    // Sjekk bare hvis det er svart noe (eller multi der noe er besvart)
    const card = document.querySelector(`.quiz-q[data-idx="${idx}"]`);
    const hasInput = card.querySelector("input:checked, input.quiz-input:not([value=''])");
    const hasValue = Array.from(card.querySelectorAll("input.quiz-input")).some(i => i.value.trim() !== "");
    const hasChecked = card.querySelector("input[type=radio]:checked");
    if (hasValue || hasChecked || q.type === "multi") {
      checkSingleQuestion(topic, idx, sessionState);
    }
  });
}

function topicMaxPoints(topic) {
  return topic.quiz.reduce((s, q) => s + (q.type === "multi" ? q.parts.length : 1), 0);
}

function renderWorkedExample(e) {
  const steps = e.steps.map((s, i) => {
    const work = s.work ? `<div class="we-work">${s.work}</div>` : "";
    return `<div class="we-step"><span class="we-num">${i + 1}</span><div class="we-text">${s.text}${work}</div></div>`;
  }).join("");
  return `<div class="worked-example">
    <div class="we-title">🧮 ${e.title}</div>
    <div class="we-steps">${steps}</div>
  </div>`;
}

function splitArr(arr, n) {
  if (n <= 0) return [arr];
  const out = [];
  const base = Math.floor(arr.length / n);
  let extra = arr.length - base * n;
  let i = 0;
  for (let k = 0; k < n; k++) {
    const size = base + (extra > 0 ? 1 : 0);
    if (extra > 0) extra--;
    out.push(arr.slice(i, i + size));
    i += size;
  }
  return out;
}

function buildTopReferences(topic) {
  // Symboler og fremgangsmåter vises som åpne reference-bokser ØVERST.
  // Enkel/dypere oppsummering blir collapsible.
  const L = topic.lessons;
  let html = "";

  if (topic.simpleHtml) {
    html += `<details class="lesson-block">
      <summary><span class="lesson-icon">🌟</span>Enkel oppsummering av hele emnet</summary>
      <div class="body"><div class="theory-simple">${topic.simpleHtml}</div></div>
    </details>`;
  }

  if (L && L.symbols && L.symbols.length) {
    const rows = L.symbols.map(s =>
      `<tr><td class="sym">${s.symbol}</td><td><b>${s.name}</b><br/><span style="color:var(--ink-soft)">${s.meaning}</span></td><td class="ex">${s.example || ""}</td></tr>`
    ).join("");
    html += `<details class="lesson-block" open>
      <summary><span class="lesson-icon">🔤</span>Symboler du møter her</summary>
      <div class="body"><table class="symbol-table">
        <thead><tr><th>Symbol</th><th>Hva det heter / betyr</th><th>Eksempel</th></tr></thead>
        <tbody>${rows}</tbody>
      </table></div>
    </details>`;
  }

  if (L && L.procedures && L.procedures.length) {
    const blocks = L.procedures.map(p => {
      const steps = p.steps.map(s => `<li>${s}</li>`).join("");
      const recipe = p.recipeExample ? `<div class="recipe-example"><b>Eksempel på oppskrift:</b> ${p.recipeExample}</div>` : "";
      return `<div class="procedure"><h4>📝 ${p.name}</h4><ol>${steps}</ol>${recipe}</div>`;
    }).join("");
    html += `<details class="lesson-block" open>
      <summary><span class="lesson-icon">📝</span>Slik gjør du - fremgangsmåte</summary>
      <div class="body">${blocks}</div>
    </details>`;
  }

  return html;
}

function buildBottomReferences(topic) {
  let html = "";
  if (topic.deeperHtml) {
    html += `<details class="lesson-block">
      <summary><span class="lesson-icon">✨</span>Ekstra detalj - dypere forklaring</summary>
      <div class="body"><div class="theory-deeper">${topic.deeperHtml}</div></div>
    </details>`;
  }
  return html;
}

function buildInterleavedFlow(topic) {
  const sections = topic.sections || [];
  const examples = (topic.lessons && topic.lessons.examples) || [];
  const N = Math.max(sections.length, 1);
  const exChunks = splitArr(examples, N);
  const qChunks = splitArr(topic.quiz, N);

  let html = "";
  let qIdx = 0;
  sections.forEach((s, i) => {
    const exHtml = (exChunks[i] || []).map(renderWorkedExample).join("");
    const chunk = qChunks[i] || [];
    let quizHtml = "";
    if (chunk.length > 0) {
      const startNum = qIdx + 1;
      const endNum = qIdx + chunk.length;
      const qsHtml = chunk.map(q => renderQuestion(q, qIdx++)).join("");
      quizHtml = `<div class="flow-quiz">
        <div class="flow-quiz-header">
          <h4>📝 Prøv selv</h4>
          <span class="quiz-count">Oppgave ${startNum}${startNum === endNum ? "" : `–${endNum}`}</span>
        </div>
        ${qsHtml}
      </div>`;
    }
    html += `<div class="flow-section">
      <span class="flow-num">${i + 1}</span>
      <h3>${s.heading}</h3>
      ${s.html}
      ${exHtml}
      ${quizHtml}
    </div>`;
  });

  // Hvis det er flere oppgaver enn vi har fordelt (skulle ikke skje pga splitArr), legg dem til som restbolk
  if (qIdx < topic.quiz.length) {
    const rest = topic.quiz.slice(qIdx).map(q => renderQuestion(q, qIdx++)).join("");
    html += `<div class="flow-section"><h3>Blandet repetisjon</h3>${rest}</div>`;
  }
  return html;
}

function prevTopicButton(gradeId, topicId) {
  const flat = flatTopics();
  const idx = flat.findIndex(x => x.topic.id === topicId);
  if (idx <= 0) return `<span></span>`;
  const p = flat[idx - 1];
  return `<button class="btn" data-prev="${p.grade.id}|${p.topic.id}">← ${p.topic.title}</button>`;
}
function nextTopicButton(gradeId, topicId) {
  const flat = flatTopics();
  const idx = flat.findIndex(x => x.topic.id === topicId);
  if (idx === -1 || idx >= flat.length - 1) return `<span></span>`;
  const n = flat[idx + 1];
  return `<button class="btn primary" data-next="${n.grade.id}|${n.topic.id}">${n.topic.title} →</button>`;
}
function flatTopics() {
  const out = [];
  CURRICULUM.grades.forEach(g => g.topics.forEach(t => out.push({ grade: g, topic: t })));
  return out;
}
function wireNavButtons(gradeId, topicId) {
  const prev = document.querySelector("[data-prev]");
  const next = document.querySelector("[data-next]");
  if (prev) prev.addEventListener("click", () => {
    const [g, t] = prev.dataset.prev.split("|"); openTopic(Number(g), t);
  });
  if (next) next.addEventListener("click", () => {
    const [g, t] = next.dataset.next.split("|"); openTopic(Number(g), t);
  });
}

/* -------------------- Backup -------------------- */

function exportProgress() {
  const data = {
    app: "mattekurs",
    version: 1,
    exportedAt: new Date().toISOString(),
    progress: state.progress,
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const stamp = new Date().toISOString().slice(0, 10);
  a.download = `mattekurs-backup-${stamp}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function importProgress(file) {
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const data = JSON.parse(e.target.result);
      if (!data || !data.progress || !data.progress.topics) throw new Error("Ugyldig fil");
      if (!confirm("Dette overskriver gjeldende framgang. Fortsette?")) return;
      state.progress = data.progress;
      saveProgress();
      alert("Framgang importert.");
      if (state.currentTopic) openTopic(state.currentGrade, state.currentTopic);
      else if (state.currentGrade) openGrade(state.currentGrade);
    } catch (err) {
      alert("Kunne ikke lese filen: " + err.message);
    }
  };
  reader.readAsText(file);
}

function resetProgress() {
  if (!confirm("Slette all lagret framgang? Dette kan ikke angres (med mindre du har eksportert en sikkerhetskopi).")) return;
  state.progress = { topics: {} };
  saveProgress();
  if (state.currentGrade) openGrade(state.currentGrade);
}

/* -------------------- Repetisjon (retrieval) -------------------- */

const RETRIEVAL_KEY = "mattekurs.retrieval.v1";

function loadRetrievalSettings() {
  try {
    const raw = localStorage.getItem(RETRIEVAL_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) { return null; }
}
function saveRetrievalSettings(obj) {
  localStorage.setItem(RETRIEVAL_KEY, JSON.stringify(obj));
}

function openRetrieval() {
  state.currentGrade = null;
  state.currentTopic = null;
  renderSidebar();

  const root = document.getElementById("content");
  const saved = loadRetrievalSettings() || { selected: [], count: 15, mode: "any" };
  // Forhåndsvelg fullførte hvis ingenting lagret
  if (saved.selected.length === 0) {
    CURRICULUM.grades.forEach(g => g.topics.forEach(t => {
      if (topicScore(t.id).completed) saved.selected.push(t.id);
    }));
  }

  const pickerHtml = CURRICULUM.grades.map(grade => {
    const rows = grade.topics.map(t => {
      const ts = topicScore(t.id);
      const cls = ts.completed ? "completed" : (ts.best > 0 ? "" : "untouched");
      const tag = ts.completed ? "✓" : (ts.best > 0 ? "•" : "·");
      const checked = saved.selected.includes(t.id) ? "checked" : "";
      return `<label class="pickrow ${cls}">
        <input type="checkbox" data-topic="${t.id}" ${checked} />
        <span>${tag} ${t.title}</span>
      </label>`;
    }).join("");
    return `<div class="grade-block" data-grade="${grade.id}">
      <h4>${grade.name}
        <span>
          <button class="btn" data-action="all">Alle</button>
          <button class="btn" data-action="done">Fullførte</button>
          <button class="btn" data-action="none">Ingen</button>
        </span>
      </h4>
      ${rows}
    </div>`;
  }).join("");

  root.innerHTML = `
    <div class="retrieval-page">
      <h2>🧠 Repetisjon</h2>
      <p style="color:var(--ink-soft)">Velg emner du har gjennomgått og få et tilfeldig utvalg oppgaver. God repetisjon (retrieval practice) er en av de mest effektive måtene å feste konsepter på.</p>

      <div class="retrieval-config">
        <div class="field">
          <label>Antall oppgaver</label>
          <input type="number" id="rt-count" min="1" max="100" value="${saved.count}" />
        </div>
        <div class="field">
          <label>Filter</label>
          <select id="rt-mode">
            <option value="any" ${saved.mode==="any"?"selected":""}>Alle valgte emner</option>
            <option value="weak" ${saved.mode==="weak"?"selected":""}>Prioriter emner med svake resultater</option>
            <option value="new" ${saved.mode==="new"?"selected":""}>Prioriter emner du ikke har fullført</option>
          </select>
        </div>
      </div>

      <div class="field" style="margin-bottom:10px;">
        <label>Velg emner</label>
        <div class="topic-picker" id="topic-picker">${pickerHtml}</div>
      </div>

      <div class="retrieval-actions">
        <button class="btn primary" id="rt-start">Start repetisjon</button>
        <button class="btn" id="rt-select-completed">Velg alle fullførte</button>
        <button class="btn" id="rt-select-all">Velg alle emner</button>
        <button class="btn" id="rt-select-none">Fjern valg</button>
        <span class="retrieval-summary" id="rt-summary">0 emner valgt</span>
      </div>
      <p class="retrieval-meta">Oppgavene trekkes på nytt hver gang. Resultatet teller også mot framgangen din i hvert emne.</p>
    </div>
  `;

  const picker = document.getElementById("topic-picker");

  function updateSummary() {
    const n = picker.querySelectorAll("input[type=checkbox]:checked").length;
    document.getElementById("rt-summary").textContent = `${n} emne${n===1?"":"r"} valgt`;
  }
  updateSummary();

  picker.addEventListener("change", updateSummary);

  picker.querySelectorAll(".grade-block").forEach(gb => {
    gb.querySelectorAll("[data-action]").forEach(btn => {
      btn.addEventListener("click", e => {
        e.preventDefault();
        const act = btn.dataset.action;
        const boxes = gb.querySelectorAll("input[type=checkbox]");
        boxes.forEach(b => {
          const tid = b.dataset.topic;
          const ts = topicScore(tid);
          if (act === "all") b.checked = true;
          else if (act === "none") b.checked = false;
          else if (act === "done") b.checked = ts.completed;
        });
        updateSummary();
      });
    });
  });

  document.getElementById("rt-select-completed").addEventListener("click", () => {
    picker.querySelectorAll("input[type=checkbox]").forEach(b => {
      b.checked = topicScore(b.dataset.topic).completed;
    });
    updateSummary();
  });
  document.getElementById("rt-select-all").addEventListener("click", () => {
    picker.querySelectorAll("input[type=checkbox]").forEach(b => b.checked = true);
    updateSummary();
  });
  document.getElementById("rt-select-none").addEventListener("click", () => {
    picker.querySelectorAll("input[type=checkbox]").forEach(b => b.checked = false);
    updateSummary();
  });

  document.getElementById("rt-start").addEventListener("click", () => startRetrieval());

  function getSelected() {
    return Array.from(picker.querySelectorAll("input[type=checkbox]:checked")).map(b => b.dataset.topic);
  }
  function startRetrieval() {
    const selected = getSelected();
    const count = Math.max(1, parseInt(document.getElementById("rt-count").value) || 10);
    const mode = document.getElementById("rt-mode").value;
    saveRetrievalSettings({ selected, count, mode });
    if (selected.length === 0) { alert("Velg minst ett emne."); return; }
    runRetrieval(selected, count, mode);
  }

  window.scrollTo({ top: 0 });
}

function topicWeight(topicId, mode) {
  const ts = topicScore(topicId);
  const t = findTopic(topicId);
  const total = t ? t.quiz.length : 1;
  const ratio = total > 0 ? ts.best / total : 0;
  if (mode === "weak") return Math.max(0.2, 1.5 - ratio);
  if (mode === "new") return ts.completed ? 0.4 : 1.5;
  return 1;
}

function findTopic(topicId) {
  for (const g of CURRICULUM.grades) for (const t of g.topics) if (t.id === topicId) return t;
  return null;
}
function findGrade(topicId) {
  for (const g of CURRICULUM.grades) for (const t of g.topics) if (t.id === topicId) return g;
  return null;
}

function runRetrieval(selected, count, mode) {
  // bygg en pool av {topicId, qIndex}
  const pool = [];
  selected.forEach(tid => {
    const t = findTopic(tid);
    if (!t) return;
    t.quiz.forEach((_, i) => pool.push({ tid, i }));
  });

  // vekt utvalg basert på mode
  const weighted = [];
  selected.forEach(tid => {
    const w = topicWeight(tid, mode);
    const t = findTopic(tid);
    if (!t) return;
    t.quiz.forEach((_, i) => { weighted.push({ tid, i, w }); });
  });

  // Trekk uten tilbakelegging, vektet
  function weightedSampleNoReplace(items, n) {
    const arr = items.slice();
    const out = [];
    n = Math.min(n, arr.length);
    for (let k = 0; k < n; k++) {
      const totalW = arr.reduce((s, x) => s + x.w, 0);
      let r = Math.random() * totalW;
      let idx = 0;
      for (let i = 0; i < arr.length; i++) {
        r -= arr[i].w;
        if (r <= 0) { idx = i; break; }
      }
      out.push(arr[idx]);
      arr.splice(idx, 1);
    }
    return out;
  }

  const picks = weightedSampleNoReplace(weighted, count);

  renderRetrievalQuiz(picks, { selected, count, mode });
}

function renderRetrievalQuiz(picks, settings) {
  const root = document.getElementById("content");

  const items = picks.map(({ tid, i }) => {
    const t = findTopic(tid);
    const g = findGrade(tid);
    return { topic: t, grade: g, q: t.quiz[i], qIndex: i };
  });

  const blocks = items.map((it, idx) => {
    const q = it.q;
    let body;
    if (q.type === "multi") {
      const partsHtml = q.parts.map((p, pi) => {
        const qattrs = p.type === "mc" ? `name="rq${idx}p${pi}"` : `data-q="${idx}" data-pi="${pi}"`;
        const input = renderInput(p.type, qattrs, p.options || [], p);
        return `<div class="subpart" data-pi="${pi}">
          <div class="sp-q"><span class="sp-label">${subLabel(pi)})</span>${p.q}</div>
          ${input}
          <div class="quiz-feedback" data-pfb="${pi}"></div>
        </div>`;
      }).join("");
      body = `<div class="subparts">${partsHtml}</div>`;
    } else {
      const qattrs = q.type === "mc" ? `name="rq${idx}"` : `data-q="${idx}"`;
      body = renderInput(q.type, qattrs, q.options || [], q);
    }
    return `<div class="quiz-q" data-idx="${idx}" ${q.type==="multi"?'data-multi="1"':''}>
      <div class="qtext">${idx + 1}. ${q.q}</div>
      <div class="retrieval-meta">Fra: ${it.grade.name} - ${it.topic.title}</div>
      ${body}
      <div class="quiz-feedback" id="rfb-${idx}"></div>
    </div>`;
  }).join("");

  root.innerHTML = `
    <button class="nav-back" id="rt-back">← Tilbake til repetisjon</button>
    <div class="topic-page">
      <h2>🧠 Repetisjonsøkt - ${items.length} oppgaver</h2>
      <p style="color:var(--ink-soft);">Tilfeldig trekk fra ${settings.selected.length} valgte emner. Skriv svar og trykk <b>Sjekk</b>.</p>
      <form id="rq-form">${blocks}</form>
      <div class="quiz-actions">
        <button class="btn primary" id="rt-check">Sjekk svar</button>
        <button class="btn" id="rt-again">Trekk nye oppgaver</button>
        <span class="quiz-score" id="rt-score"></span>
      </div>
    </div>
  `;

  document.getElementById("rt-back").addEventListener("click", openRetrieval);
  document.getElementById("rt-again").addEventListener("click", () => runRetrieval(settings.selected, settings.count, settings.mode));
  document.getElementById("rt-check").addEventListener("click", e => {
    e.preventDefault();
    checkRetrieval(items);
  });

  window.scrollTo({ top: 0 });
}

function checkRetrieval(items) {
  const perTopic = {};
  let totalCorrect = 0, totalPts = 0;

  items.forEach((it, idx) => {
    const q = it.q;
    const fb = document.getElementById(`rfb-${idx}`);
    const card = document.querySelector(`.quiz-q[data-idx="${idx}"]`);
    const r = gradeQuestion(q, card, `rq${idx}`);
    totalCorrect += r.ok; totalPts += r.total;

    if (q.type === "multi") {
      if (r.isCorrect) { fb.className = "quiz-feedback ok"; fb.innerHTML = `✓ Alle ${r.total} deloppgaver riktige.`; }
      else { fb.className = "quiz-feedback no"; fb.innerHTML = `${r.ok} av ${r.total} deloppgaver riktige.`; }
    } else if (r.isCorrect) {
      fb.className = "quiz-feedback ok";
      fb.innerHTML = `✓ Riktig. ${q.explain || ""}`;
    } else {
      fb.className = "quiz-feedback no";
      fb.innerHTML = `✗ ${r.correctText} ${q.explain || ""}`;
    }

    perTopic[it.topic.id] = perTopic[it.topic.id] || { correct: 0, total: 0 };
    perTopic[it.topic.id].total += r.total;
    perTopic[it.topic.id].correct += r.ok;
  });

  // Logg historikken og oppdater "siste sett" for emnene
  Object.entries(perTopic).forEach(([tid, r]) => {
    const prev = state.progress.topics[tid] || { best: 0, completed: false };
    state.progress.topics[tid] = {
      ...prev,
      lastRetrieval: { correct: r.correct, total: r.total, when: Date.now() },
    };
  });

  // Logg samlet økt
  state.progress.retrievalLog = state.progress.retrievalLog || [];
  state.progress.retrievalLog.push({ when: Date.now(), correct: totalCorrect, total: items.length });
  if (state.progress.retrievalLog.length > 50) state.progress.retrievalLog.shift();

  saveProgress();

  const score = document.getElementById("rt-score");
  score.textContent = `Resultat: ${totalCorrect} / ${totalPts} poeng`;
  score.className = "quiz-score" + ((totalPts > 0 && totalCorrect/totalPts >= 0.8) ? " passed" : "");
}

/* -------------------- Utskrift med valg -------------------- */

function formatAnswer(q) {
  if (q.type === "multi") {
    return q.parts.map((p, i) => `${subLabel(i)}) ${formatAnswer(p)}`).join("  ·  ");
  }
  if (q.type === "mc") return q.options[q.answer];
  if (q.type === "num") return String(q.answer) + (q.tol ? ` (± ${q.tol})` : "");
  return Array.isArray(q.answer) ? q.answer[0] : String(q.answer);
}

const PRINT_CFG_KEY = "mattekurs.printcfg.v1";
function loadPrintCfg() {
  try { return JSON.parse(localStorage.getItem(PRINT_CFG_KEY)) || null; } catch (e) { return null; }
}
function savePrintCfg(c) { localStorage.setItem(PRINT_CFG_KEY, JSON.stringify(c)); }

function openPrintView() {
  state.currentGrade = null; state.currentTopic = null;
  renderSidebar();
  const root = document.getElementById("content");
  const saved = loadPrintCfg() || {
    selected: CURRICULUM.grades.flatMap(g => g.topics.map(t => t.id)),
    showTheory: true, showExamples: true, showExercises: true, showAnswers: true,
  };

  const pickerHtml = CURRICULUM.grades.map(grade => {
    const rows = grade.topics.map(t => {
      const checked = saved.selected.includes(t.id) ? "checked" : "";
      return `<label class="pickrow"><input type="checkbox" data-topic="${t.id}" ${checked}/> <span>${t.title} <span class="ws-fill-tag">(${t.quiz.length} oppg.)</span></span></label>`;
    }).join("");
    return `<div class="grade-block" data-grade="${grade.id}">
      <h4>${grade.name}
        <span>
          <button class="btn" data-action="all">Alle</button>
          <button class="btn" data-action="none">Ingen</button>
        </span>
      </h4>${rows}</div>`;
  }).join("");

  root.innerHTML = `
    <div class="config-page">
      <h2>🖨 Skriv ut leksjoner</h2>
      <p style="color:var(--ink-soft)">Velg hvilke trinn og emner du vil ha med, og hva som skal vises.</p>

      <div class="toggle-row">
        <label><input type="checkbox" id="pc-theory" ${saved.showTheory?"checked":""}/> Teori</label>
        <label><input type="checkbox" id="pc-examples" ${saved.showExamples?"checked":""}/> Eksempler</label>
        <label><input type="checkbox" id="pc-exercises" ${saved.showExercises?"checked":""}/> Oppgaver</label>
        <label><input type="checkbox" id="pc-answers" ${saved.showAnswers?"checked":""}/> Fasit</label>
      </div>

      <div class="field" style="margin:10px 0;">
        <label>Velg emner</label>
        <div class="topic-picker" id="pc-picker">${pickerHtml}</div>
      </div>

      <div class="retrieval-actions">
        <button class="btn primary" id="pc-build">Bygg utskrift</button>
        <button class="btn" id="pc-all">Velg alle</button>
        <button class="btn" id="pc-none">Fjern valg</button>
        <span class="retrieval-summary" id="pc-summary"></span>
      </div>
    </div>
  `;

  const picker = document.getElementById("pc-picker");
  const updateSummary = () => {
    const n = picker.querySelectorAll("input[type=checkbox]:checked").length;
    document.getElementById("pc-summary").textContent = `${n} emne${n===1?"":"r"} valgt`;
  };
  updateSummary();
  picker.addEventListener("change", updateSummary);
  picker.querySelectorAll(".grade-block").forEach(gb => {
    gb.querySelectorAll("[data-action]").forEach(btn => btn.addEventListener("click", e => {
      e.preventDefault();
      const act = btn.dataset.action;
      gb.querySelectorAll("input[type=checkbox]").forEach(b => { b.checked = (act === "all"); });
      updateSummary();
    }));
  });
  document.getElementById("pc-all").addEventListener("click", () => { picker.querySelectorAll("input[type=checkbox]").forEach(b => b.checked = true); updateSummary(); });
  document.getElementById("pc-none").addEventListener("click", () => { picker.querySelectorAll("input[type=checkbox]").forEach(b => b.checked = false); updateSummary(); });

  document.getElementById("pc-build").addEventListener("click", () => {
    const selected = Array.from(picker.querySelectorAll("input[type=checkbox]:checked")).map(b => b.dataset.topic);
    if (!selected.length) { alert("Velg minst ett emne."); return; }
    const cfg = {
      selected,
      showTheory: document.getElementById("pc-theory").checked,
      showExamples: document.getElementById("pc-examples").checked,
      showExercises: document.getElementById("pc-exercises").checked,
      showAnswers: document.getElementById("pc-answers").checked,
    };
    savePrintCfg(cfg);
    showPrintView(cfg);
  });

  window.scrollTo({ top: 0 });
}

function stripExamplesFromHtml(html) {
  // Fjern <div class="example">...</div>-blokker når brukeren ikke vil ha eksempler
  return html.replace(/<div class="example"[\s\S]*?<\/div>/g, "");
}

function buildPrintView(cfg) {
  const parts = [];
  parts.push(`<div class="print-toolbar">
    <h2>Utskrift</h2>
    <div style="display:flex;gap:8px;align-items:center;">
      <button class="btn primary" id="print-do">🖨 Skriv ut / lagre PDF</button>
      <button class="btn" id="print-back">← Endre valg</button>
      <button class="btn" id="print-close">Lukk</button>
    </div>
  </div>`);
  parts.push(`<div class="print-body">`);
  parts.push(`<div style="display:flex;gap:16px;align-items:center;margin-bottom:12px;">
    <img src="icon.svg" width="56" height="56" alt="" />
    <div>
      <h1 style="margin:0;">Matematikk - utvalgt innhold</h1>
      <p style="margin:2px 0 0;color:#555;">${cfg.selected.length} emner valgt</p>
    </div>
  </div>`);

  const sel = new Set(cfg.selected);
  CURRICULUM.grades.forEach(grade => {
    const topics = grade.topics.filter(t => sel.has(t.id));
    if (!topics.length) return;
    parts.push(`<h2 class="print-grade">${grade.name}</h2>`);
    parts.push(`<p style="color:#555;margin-top:4px;"><i>${grade.tagline}</i></p>`);
    topics.forEach(topic => {
      parts.push(`<h3 class="print-topic">${topic.title}</h3>`);
      parts.push(`<p style="color:#555;margin:2px 0 8px;">${topic.summary}</p>`);
      if (cfg.showTheory || cfg.showExamples) {
        topic.sections.forEach(s => {
          parts.push(`<h4 class="print-section">${s.heading}</h4>`);
          let h = s.html;
          if (!cfg.showExamples) h = stripExamplesFromHtml(h);
          if (!cfg.showTheory && cfg.showExamples) {
            // bare beholde example-bokser
            const matches = h.match(/<div class="example"[\s\S]*?<\/div>/g) || [];
            h = matches.join("");
          }
          if (h.trim()) parts.push(h);
        });
        if (topic.lessons) {
          const L = topic.lessons;
          if (cfg.showTheory && L.symbols && L.symbols.length) {
            parts.push(`<h4 class="print-section">Symboler</h4><table class="symbol-table">` +
              L.symbols.map(s => `<tr><td class="sym">${s.symbol}</td><td><b>${s.name}</b> - ${s.meaning} ${s.example ? `<i>(${s.example})</i>` : ""}</td></tr>`).join("") +
              `</table>`);
          }
          if (cfg.showTheory && L.procedures && L.procedures.length) {
            parts.push(`<h4 class="print-section">Slik gjør du</h4>` +
              L.procedures.map(p => `<div class="procedure"><b>${p.name}</b><ol>${p.steps.map(s => `<li>${s}</li>`).join("")}</ol>${p.recipeExample ? `<div><i>${p.recipeExample}</i></div>` : ""}</div>`).join(""));
          }
          if (cfg.showExamples && L.examples && L.examples.length) {
            parts.push(`<h4 class="print-section">Eksempler steg for steg</h4>` +
              L.examples.map(e => `<div class="worked-example"><b>${e.title}</b><ol>${e.steps.map(s => `<li>${s.text}${s.work ? ` <code>${s.work}</code>` : ""}</li>`).join("")}</ol></div>`).join(""));
          }
        }
      }
      if (cfg.showExercises) {
        parts.push(`<div class="print-quiz"><b>Oppgaver</b><ol>`);
        topic.quiz.forEach(q => {
          let qHtml = `<li>${q.q}`;
          if (q.type === "mc") {
            qHtml += `<ul style="list-style:none;padding-left:8px;margin:4px 0;">`;
            q.options.forEach((o, i) => { qHtml += `<li>${String.fromCharCode(65 + i)}) ${o}</li>`; });
            qHtml += `</ul>`;
          } else if (q.type === "multi") {
            qHtml += `<ol type="a" style="margin:6px 0 6px 18px;">`;
            q.parts.forEach(p => {
              qHtml += `<li>${p.q}`;
              if (p.type === "mc") {
                qHtml += `<ul style="list-style:none;padding-left:8px;margin:2px 0;">`;
                p.options.forEach((o, i) => { qHtml += `<li>${String.fromCharCode(65 + i)}) ${o}</li>`; });
                qHtml += `</ul>`;
              }
              if (cfg.showAnswers) qHtml += ` <span class="ans">[Svar: ${formatAnswer(p)}]</span>`;
              qHtml += `</li>`;
            });
            qHtml += `</ol>`;
          }
          if (cfg.showAnswers && q.type !== "multi") qHtml += `<div class="ans"><b>Svar:</b> ${formatAnswer(q)}${q.explain ? " - " + q.explain : ""}</div>`;
          qHtml += `</li>`;
          parts.push(qHtml);
        });
        parts.push(`</ol></div>`);
      }
    });
  });

  parts.push(`</div>`);
  return parts.join("");
}

function showPrintView(cfg) {
  let host = document.getElementById("print-view");
  if (!host) {
    host = document.createElement("div");
    host.id = "print-view";
    host.className = "print-view";
    host.style.cssText = "position:fixed;inset:0;background:#fff;z-index:1000;overflow:auto;display:block;";
    document.body.appendChild(host);
  } else {
    host.style.display = "block";
  }
  document.body.style.overflow = "hidden";
  host.innerHTML = buildPrintView(cfg);
  document.getElementById("print-do").addEventListener("click", () => window.print());
  document.getElementById("print-back").addEventListener("click", () => { closePrintView(); openPrintView(); });
  document.getElementById("print-close").addEventListener("click", closePrintView);
  window.scrollTo({ top: 0 });
}

function closePrintView() {
  const host = document.getElementById("print-view");
  if (host) host.style.display = "none";
  const ws = document.getElementById("worksheet-view");
  if (ws) ws.style.display = "none";
  document.body.classList.remove("printing-ws");
  document.body.style.overflow = "";
}

/* -------------------- Oppgavehefte-generator -------------------- */

const WS_CFG_KEY = "mattekurs.wscfg.v1";
function loadWsCfg() { try { return JSON.parse(localStorage.getItem(WS_CFG_KEY)) || null; } catch(e){ return null; } }
function saveWsCfg(c) { localStorage.setItem(WS_CFG_KEY, JSON.stringify(c)); }

function openWorksheet() {
  state.currentGrade = null; state.currentTopic = null;
  renderSidebar();
  const root = document.getElementById("content");
  const saved = loadWsCfg() || {
    title: "Oppgavehefte i matematikk",
    teacher: "",
    selected: [],
    perTopic: 5,
    total: 0,
    randomize: true,
    includeMC: true,
    includeNum: true,
    includeText: true,
    workSpace: "lines", // "lines" | "box" | "none"
    answerKey: true,
    twoColumns: false,
  };

  const pickerHtml = CURRICULUM.grades.map(grade => {
    const rows = grade.topics.map(t => {
      const checked = saved.selected.includes(t.id) ? "checked" : "";
      return `<label class="pickrow"><input type="checkbox" data-topic="${t.id}" ${checked}/> <span>${t.title} <span class="ws-fill-tag">(${t.quiz.length} oppg.)</span></span></label>`;
    }).join("");
    return `<div class="grade-block" data-grade="${grade.id}">
      <h4>${grade.name}
        <span>
          <button class="btn" data-action="all">Alle</button>
          <button class="btn" data-action="none">Ingen</button>
        </span>
      </h4>${rows}</div>`;
  }).join("");

  root.innerHTML = `
    <div class="config-page">
      <h2>📝 Oppgavehefte-generator</h2>
      <p style="color:var(--ink-soft)">Lag et utskriftsvennlig oppgavehefte. Velg emner, antall oppgaver og om fasit skal være med på siste side.</p>

      <div class="config-grid">
        <div class="field">
          <label>Tittel</label>
          <input type="text" id="ws-title" value="${saved.title.replace(/"/g,'&quot;')}" />
        </div>
        <div class="field">
          <label>Lærer / klasse (valgfritt, vises i topptekst)</label>
          <input type="text" id="ws-teacher" value="${saved.teacher.replace(/"/g,'&quot;')}" />
        </div>
        <div class="field">
          <label>Antall oppgaver per emne (0 = bruk totalt)</label>
          <input type="number" id="ws-perTopic" min="0" max="500" value="${saved.perTopic}" />
        </div>
        <div class="field">
          <label>Totalt antall oppgaver (0 = ignorer)</label>
          <input type="number" id="ws-total" min="0" max="2000" value="${saved.total}" />
        </div>
      </div>

      <div class="toggle-row">
        <label><input type="checkbox" id="ws-random" ${saved.randomize?"checked":""}/> Tilfeldig rekkefølge</label>
        <label><input type="checkbox" id="ws-mc" ${saved.includeMC?"checked":""}/> Inkluder flervalg</label>
        <label><input type="checkbox" id="ws-num" ${saved.includeNum?"checked":""}/> Inkluder tallsvar</label>
        <label><input type="checkbox" id="ws-text" ${saved.includeText?"checked":""}/> Inkluder tekst/uttrykk</label>
        <label><input type="checkbox" id="ws-key" ${saved.answerKey?"checked":""}/> Fasit på siste side</label>
        <label><input type="checkbox" id="ws-two" ${saved.twoColumns?"checked":""}/> To kolonner</label>
      </div>

      <div class="config-grid">
        <div class="field">
          <label>Arbeidsplass under hver oppgave</label>
          <select id="ws-work">
            <option value="lines" ${saved.workSpace==="lines"?"selected":""}>Linje for svar</option>
            <option value="box" ${saved.workSpace==="box"?"selected":""}>Arbeidsboks (utregning)</option>
            <option value="none" ${saved.workSpace==="none"?"selected":""}>Ingenting</option>
          </select>
        </div>
        <div class="field">
          <label>Random-seed (la stå tom for ny hver gang)</label>
          <input type="text" id="ws-seed" placeholder="f.eks 8a-uke12" />
        </div>
      </div>

      <div class="field" style="margin:10px 0;">
        <label>Velg emner å trekke fra</label>
        <div class="topic-picker" id="ws-picker">${pickerHtml}</div>
      </div>

      <div class="retrieval-actions">
        <button class="btn primary" id="ws-build">Generer hefte</button>
        <button class="btn" id="ws-all">Velg alle</button>
        <button class="btn" id="ws-none">Fjern valg</button>
        <button class="btn" id="ws-done">Velg fullførte</button>
        <span class="retrieval-summary" id="ws-summary"></span>
      </div>
      <p class="retrieval-meta">Tips: Bruk seed for å gjenskape samme hefte (f.eks for løsningsark som ble skrevet ut tidligere).</p>
    </div>
  `;

  const picker = document.getElementById("ws-picker");
  const updateSummary = () => {
    const n = picker.querySelectorAll("input[type=checkbox]:checked").length;
    document.getElementById("ws-summary").textContent = `${n} emne${n===1?"":"r"} valgt`;
  };
  updateSummary();
  picker.addEventListener("change", updateSummary);

  picker.querySelectorAll(".grade-block").forEach(gb => {
    gb.querySelectorAll("[data-action]").forEach(btn => btn.addEventListener("click", e => {
      e.preventDefault();
      const act = btn.dataset.action;
      gb.querySelectorAll("input[type=checkbox]").forEach(b => b.checked = (act === "all"));
      updateSummary();
    }));
  });
  document.getElementById("ws-all").addEventListener("click", () => { picker.querySelectorAll("input[type=checkbox]").forEach(b => b.checked = true); updateSummary(); });
  document.getElementById("ws-none").addEventListener("click", () => { picker.querySelectorAll("input[type=checkbox]").forEach(b => b.checked = false); updateSummary(); });
  document.getElementById("ws-done").addEventListener("click", () => {
    picker.querySelectorAll("input[type=checkbox]").forEach(b => b.checked = topicScore(b.dataset.topic).completed);
    updateSummary();
  });

  document.getElementById("ws-build").addEventListener("click", () => {
    const selected = Array.from(picker.querySelectorAll("input[type=checkbox]:checked")).map(b => b.dataset.topic);
    if (!selected.length) { alert("Velg minst ett emne."); return; }
    const cfg = {
      title: document.getElementById("ws-title").value || "Oppgavehefte i matematikk",
      teacher: document.getElementById("ws-teacher").value || "",
      selected,
      perTopic: parseInt(document.getElementById("ws-perTopic").value) || 0,
      total: parseInt(document.getElementById("ws-total").value) || 0,
      randomize: document.getElementById("ws-random").checked,
      includeMC: document.getElementById("ws-mc").checked,
      includeNum: document.getElementById("ws-num").checked,
      includeText: document.getElementById("ws-text").checked,
      workSpace: document.getElementById("ws-work").value,
      answerKey: document.getElementById("ws-key").checked,
      twoColumns: document.getElementById("ws-two").checked,
      seed: document.getElementById("ws-seed").value || "",
    };
    saveWsCfg(cfg);
    showWorksheet(cfg);
  });

  window.scrollTo({ top: 0 });
}

function wsPrng(seed) {
  if (!seed) return Math.random;
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) { h ^= seed.charCodeAt(i); h = Math.imul(h, 16777619); }
  let s = h >>> 0;
  return function () {
    s |= 0; s = s + 0x6D2B79F5 | 0;
    let t = Math.imul(s ^ s >>> 15, 1 | s);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function pickWorksheetQuestions(cfg) {
  const rng = wsPrng(cfg.seed);
  const sel = new Set(cfg.selected);
  const pool = [];
  CURRICULUM.grades.forEach(g => g.topics.forEach(t => {
    if (!sel.has(t.id)) return;
    t.quiz.forEach((q, qi) => {
      if (q.type === "mc" && !cfg.includeMC) return;
      if (q.type === "num" && !cfg.includeNum) return;
      if (q.type === "text" && !cfg.includeText) return;
      pool.push({ grade: g, topic: t, q, qi });
    });
  }));

  const shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  let chosen = [];

  if (cfg.perTopic > 0) {
    const byTopic = {};
    pool.forEach(p => { (byTopic[p.topic.id] = byTopic[p.topic.id] || []).push(p); });
    Object.values(byTopic).forEach(list => {
      const sh = shuffle(list).slice(0, cfg.perTopic);
      chosen = chosen.concat(sh);
    });
    if (cfg.total > 0 && chosen.length > cfg.total) chosen = shuffle(chosen).slice(0, cfg.total);
  } else if (cfg.total > 0) {
    chosen = shuffle(pool).slice(0, cfg.total);
  } else {
    chosen = pool.slice();
  }

  if (cfg.randomize) chosen = shuffle(chosen);
  else {
    // grupper etter trinn og emne i pensumrekkefølge
    chosen.sort((a, b) => {
      if (a.grade.id !== b.grade.id) return a.grade.id - b.grade.id;
      return a.topic.title.localeCompare(b.topic.title);
    });
  }
  return chosen;
}

function showWorksheet(cfg) {
  const items = pickWorksheetQuestions(cfg);
  if (items.length === 0) { alert("Ingen oppgaver matchet valgene."); return; }

  // Sjekk om utvalget ble mindre enn ønsket
  let notice = "";
  if (cfg.perTopic > 0) {
    const sel = new Set(cfg.selected);
    let availPerTopic = 0;
    CURRICULUM.grades.forEach(g => g.topics.forEach(t => {
      if (!sel.has(t.id)) return;
      const filtered = t.quiz.filter(q =>
        (q.type === "mc" && cfg.includeMC) ||
        (q.type === "num" && cfg.includeNum) ||
        (q.type === "text" && cfg.includeText) ||
        (q.type === "multi"));
      availPerTopic += Math.min(filtered.length, cfg.perTopic);
    }));
    const totalCap = cfg.total > 0 ? Math.min(availPerTopic, cfg.total) : availPerTopic;
    const requested = cfg.perTopic * cfg.selected.length;
    if (totalCap < requested) {
      notice = `Du ba om opptil ${cfg.perTopic} per emne (${requested} totalt), men oppgavebanken har bare ${totalCap} tilgjengelig for valgte emner og filtre. Velg flere emner eller skru på flere oppgavetyper for å få mer.`;
    }
  }

  let host = document.getElementById("worksheet-view");
  if (!host) {
    host = document.createElement("div");
    host.id = "worksheet-view";
    host.className = "worksheet-view";
    host.style.cssText = "position:fixed;inset:0;background:#f0f0f0;z-index:1000;overflow:auto;display:block;";
    document.body.appendChild(host);
  } else {
    host.style.display = "block";
  }
  document.body.style.overflow = "hidden";
  document.body.classList.add("printing-ws");

  const meta = [];
  meta.push(`<div class="meta">Navn: __________________________</div>`);
  meta.push(`<div class="meta">Dato: __________</div>`);
  meta.push(`<div class="meta">Klasse: __________</div>`);
  if (cfg.teacher) meta.push(`<div class="meta">Lærer: ${cfg.teacher}</div>`);

  const workSpace = () => {
    if (cfg.workSpace === "lines") return `<div class="answer-line"></div>`;
    if (cfg.workSpace === "box") return `<div class="work-box"></div>`;
    return "";
  };
  const renderOpts = (options) => `<div class="opts">` + options.map((o, i) => `<div>${String.fromCharCode(65 + i)}) ${o}</div>`).join("") + `</div>`;

  const qHtml = (it, num) => {
    const q = it.q;
    const tag = `<span class="ws-fill-tag">[${it.grade.name} - ${it.topic.title}]</span>`;
    if (q.type === "multi") {
      const partsHtml = q.parts.map((p, pi) => {
        const popts = p.type === "mc" ? renderOpts(p.options) : "";
        return `<div class="subpart"><span class="sp-label">${subLabel(pi)})</span> ${p.q}${popts}${workSpace()}</div>`;
      }).join("");
      return `<div class="ws-q"><span class="num">${num}.</span> <span class="qbody">${q.q} ${tag}</span><div class="subparts">${partsHtml}</div></div>`;
    }
    const opts = q.type === "mc" ? renderOpts(q.options) : "";
    return `<div class="ws-q"><span class="num">${num}.</span> <span class="qbody">${q.q} ${tag}</span>${opts}${workSpace()}</div>`;
  };

  const colStyle = cfg.twoColumns ? "column-count: 2; column-gap: 18mm; column-rule: 1px solid #ddd;" : "";

  let body = "";
  body += `<div class="ws-top">`;
  body += `<div class="ws-header">
    <div>
      <h1>${cfg.title}</h1>
      <div style="font-size:12px;color:#555;">${items.length} oppgaver · ${cfg.selected.length} emner${cfg.seed ? " · seed: "+cfg.seed : ""}</div>
    </div>
    <img src="icon.svg" width="48" height="48" alt="" />
  </div>`;
  body += `<div class="ws-meta-line">${meta.join("")}</div>`;
  body += `<div class="ws-section-title">Oppgaver</div>`;
  body += `</div>`;
  body += `<div style="${colStyle}">` + items.map((it, idx) => qHtml(it, idx + 1)).join("") + `</div>`;

  if (cfg.answerKey) {
    body += `<div class="ws-cut-line"><span>✂  Riv her - fasit under</span></div>`;
    body += `<div class="ws-answer-key">
      <div class="ak-header">
        <h2>Fasit - ${cfg.title}</h2>
        <small>${items.length} oppgaver${cfg.seed ? " · seed: " + cfg.seed : ""} · ${new Date().toLocaleDateString("no-NO")}</small>
      </div>
      <ol>`;
    items.forEach(it => {
      body += `<li>${formatAnswer(it.q)}${it.q.explain ? ` <span style="color:#666;">- ${it.q.explain}</span>` : ""}</li>`;
    });
    body += `</ol></div>`;
  }

  host.innerHTML = `
    <div class="ws-toolbar">
      <div>
        <h2 style="margin:0;font-size:16px;">Oppgavehefte (${items.length} oppgaver${cfg.answerKey?" + fasit":""})</h2>
        ${notice ? `<div style="font-size:12px;color:var(--warn);margin-top:2px;">⚠ ${notice}</div>` : ""}
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <button class="btn primary" id="ws-print">🖨 Alt</button>
        ${cfg.answerKey ? `<button class="btn" id="ws-print-q">🖨 Bare oppgaver</button>
        <button class="btn" id="ws-print-a">🖨 Bare fasit</button>` : ""}
        <button class="btn" id="ws-regen">🎲 Trekk på nytt</button>
        <button class="btn" id="ws-edit">← Endre valg</button>
        <button class="btn" id="ws-close">Lukk</button>
      </div>
    </div>
    <div class="ws-body">${body}</div>
  `;

  const printWith = (mode) => {
    document.body.classList.remove("ws-print-questions", "ws-print-answers");
    if (mode) document.body.classList.add(mode);
    window.print();
    setTimeout(() => document.body.classList.remove("ws-print-questions", "ws-print-answers"), 100);
  };
  document.getElementById("ws-print").addEventListener("click", () => printWith(null));
  const qBtn = document.getElementById("ws-print-q");
  const aBtn = document.getElementById("ws-print-a");
  if (qBtn) qBtn.addEventListener("click", () => printWith("ws-print-questions"));
  if (aBtn) aBtn.addEventListener("click", () => printWith("ws-print-answers"));
  document.getElementById("ws-regen").addEventListener("click", () => showWorksheet({ ...cfg, seed: "" }));
  document.getElementById("ws-edit").addEventListener("click", () => { closePrintView(); openWorksheet(); });
  document.getElementById("ws-close").addEventListener("click", closePrintView);

  window.scrollTo({ top: 0 });
}

/* -------------------- Init -------------------- */

document.addEventListener("DOMContentLoaded", () => {
  renderSidebar();
  document.getElementById("btn-print").addEventListener("click", openPrintView);
  document.getElementById("btn-worksheet").addEventListener("click", openWorksheet);
  document.getElementById("btn-retrieval").addEventListener("click", openRetrieval);
  document.getElementById("btn-export").addEventListener("click", exportProgress);
  document.getElementById("btn-reset").addEventListener("click", resetProgress);
  document.getElementById("file-import").addEventListener("change", e => {
    const f = e.target.files[0];
    if (f) importProgress(f);
    e.target.value = "";
  });
});
