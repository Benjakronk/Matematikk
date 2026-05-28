/* quiz-extra.js
   Utvider hver topic.quiz til minst 20 oppgaver vha generatorer og håndskrevne tillegg.
   Pseudo-tilfeldig (seedet) slik at oppgavebanken er stabil mellom besøk. */

(function () {
  const TARGET = 20;

  /* ---------- Seedet PRNG ---------- */
  function mulberry32(seed) {
    return function () {
      seed |= 0; seed = seed + 0x6D2B79F5 | 0;
      let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function hashStr(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }

  /* ---------- Hjelpere ---------- */
  const qNum = (q, a, explain, tol) => ({ type: "num", q, answer: a, explain, ...(tol != null ? { tol } : {}) });
  const qMC = (q, options, ansIdx, explain) => ({ type: "mc", q, options, answer: ansIdx, explain });
  const qText = (q, ans, explain) => ({ type: "text", q, answer: ans, explain });

  function shuffleWith(rng, arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function distractors(rng, correct, range, count, intOnly = true) {
    const out = new Set();
    let safety = 0;
    while (out.size < count && safety++ < 200) {
      const delta = Math.floor(rng() * range * 2) - range;
      let v = correct + delta;
      if (intOnly) v = Math.round(v);
      if (v !== correct && v >= 0) out.add(v);
    }
    return Array.from(out).slice(0, count);
  }
  function pickInt(rng, min, max) { return min + Math.floor(rng() * (max - min + 1)); }

  /* ---------- Generatorer ---------- */
  function genAdd(rng, n, minA, maxA, minB, maxB) {
    const out = [];
    const seen = new Set();
    let safety = 0;
    while (out.length < n && safety++ < n * 20) {
      const a = pickInt(rng, minA, maxA), b = pickInt(rng, minB, maxB);
      const key = a + "+" + b; if (seen.has(key)) continue; seen.add(key);
      out.push(qNum(`Regn ut: ${a} + ${b}`, a + b, `${a} + ${b} = ${a + b}.`));
    }
    return out;
  }
  function genSub(rng, n, minA, maxA, minB, maxB, allowNeg = false) {
    const out = []; const seen = new Set(); let safety = 0;
    while (out.length < n && safety++ < n * 20) {
      let a = pickInt(rng, minA, maxA), b = pickInt(rng, minB, maxB);
      if (!allowNeg && b > a) [a, b] = [b, a];
      const key = a + "-" + b; if (seen.has(key)) continue; seen.add(key);
      out.push(qNum(`Regn ut: ${a} - ${b}`, a - b, `${a} - ${b} = ${a - b}.`));
    }
    return out;
  }
  function genMul(rng, n, minA, maxA, minB, maxB) {
    const out = []; const seen = new Set(); let safety = 0;
    while (out.length < n && safety++ < n * 20) {
      const a = pickInt(rng, minA, maxA), b = pickInt(rng, minB, maxB);
      const key = a + "x" + b; if (seen.has(key)) continue; seen.add(key);
      out.push(qNum(`Regn ut: ${a} · ${b}`, a * b, `${a} · ${b} = ${a * b}.`));
    }
    return out;
  }
  function genDiv(rng, n, divMin, divMax, qMin, qMax) {
    const out = []; const seen = new Set(); let safety = 0;
    while (out.length < n && safety++ < n * 20) {
      const d = pickInt(rng, divMin, divMax), q = pickInt(rng, qMin, qMax);
      const dividend = d * q;
      const key = dividend + ":" + d; if (seen.has(key)) continue; seen.add(key);
      out.push(qNum(`Regn ut: ${dividend} : ${d}`, q, `${d} · ${q} = ${dividend}.`));
    }
    return out;
  }

  /* ---------- Per-topic ekstraoppgaver ---------- */
  const EXTRA = {

    /* === 1. trinn === */
    "g1-tall": (rng) => {
      const out = [];
      // "Hva kommer etter X" / "før X"
      for (let i = 0; i < 8; i++) {
        const n = pickInt(rng, 0, 19);
        out.push(qNum(`Hvilket tall kommer etter ${n}?`, n + 1, `Etter ${n} kommer ${n + 1}.`));
      }
      for (let i = 0; i < 6; i++) {
        const n = pickInt(rng, 1, 20);
        out.push(qNum(`Hvilket tall kommer rett før ${n}?`, n - 1, `Før ${n} kommer ${n - 1}.`));
      }
      // Størst/minst
      for (let i = 0; i < 6; i++) {
        const a = pickInt(rng, 0, 20), b = pickInt(rng, 0, 20);
        if (a === b) continue;
        const big = Math.max(a, b);
        out.push(qMC(`Hvilket tall er størst: ${a} eller ${b}?`, [String(a), String(b)], a > b ? 0 : 1, `${big} er størst.`));
      }
      return out;
    },

    "g1-addisjon": (rng) => [
      ...genAdd(rng, 12, 0, 10, 0, 10),
      ...genAdd(rng, 6, 5, 15, 1, 5),
    ],

    "g1-subtraksjon": (rng) => [
      ...genSub(rng, 14, 0, 20, 0, 10),
    ],

    "g1-former": (rng) => [
      qMC("Hvor mange sider har et kvadrat?", ["2","3","4","8"], 2, "Kvadrat = firkant med 4 like sider."),
      qMC("Hva slags form er en pizza (hel)?", ["sirkel","trekant","firkant","kjegle"], 0, "Sirkel."),
      qMC("Hvilken form ruller best?", ["terning","kule","kvadrat","trekant"], 1, "Kula er rund i alle retninger."),
      qNum("Hvor mange sider har en sekskant?", 6, "Sek = 6."),
      qNum("Hvor mange sider har en trekant?", 3, "Tre."),
      qMC("En koppform med rund bunn og rette sider er en ...", ["kjegle","sylinder","kule","terning"], 1, "Sylinder."),
      qMC("Et iskremkrull-toppstykke har form av en ...", ["sylinder","kjegle","kule","terning"], 1, "Kjegle."),
      qMC("En spilleterning er en ...", ["kule","kvadrat","terning","sylinder"], 2, "Terning."),
      qMC("Hvilken form har INGEN hjørner?", ["trekant","kvadrat","sirkel","femkant"], 2, "Sirkel."),
      qMC("Et rektangel har alltid ...", ["3 sider","4 hjørner","5 hjørner","ingen sider"], 1, "Fire hjørner."),
      qMC("Forskjellen på kvadrat og rektangel?", ["kvadrat har 3 sider","alle sider like i kvadrat","rektangel er rundt","ingen forskjell"], 1, "I et kvadrat er alle sider like lange."),
      qNum("Hvor mange flater har en terning?", 6, "Seks flater."),
      qMC("En femkant har ...", ["3 sider","4 sider","5 sider","6 sider"], 2, "Femkant = 5 sider."),
      qNum("Hvor mange sider har en åttekant?", 8, "Åtte sider."),
      qMC("En jordklode har form av en ...", ["sirkel","kule","sylinder","trekant"], 1, "Kule i 3D."),
      qMC("Hvor mange like sider har en likesidet trekant?", ["1","2","3","4"], 2, "Alle tre."),
      qNum("Hvor mange hjørner har en firkant?", 4, "Fire."),
    ],

    "g1-klokka": (rng) => {
      const ord = ["ett","to","tre","fire","fem","seks","sju","åtte","ni","ti","elleve","tolv"];
      const out = [];
      for (let i = 0; i < 12; i++) {
        const h = pickInt(rng, 1, 12);
        const opts = shuffleWith(rng, [ord[h - 1], ord[(h) % 12], ord[(h - 2 + 12) % 12], "halv " + ord[h - 1]]);
        out.push(qMC(`Lang viser på 12, kort på ${h}. Klokka er ...?`, opts, opts.indexOf(ord[h - 1]), `Når lang viser er på 12 er klokka hel.`));
      }
      out.push(qMC("Lang viser peker på 12. Hva betyr det?", ["klokka er halv","klokka er kvart over","klokka er hel","klokka er kvart på"], 2, "Lang på 12 = hel."));
      out.push(qMC("Hvilken viser er kortest?", ["minuttviseren","timeviseren","sekundviseren","alle like"], 1, "Timeviseren er kortest."));
      out.push(qMC("Hvor mange tall står det på en klokke?", ["10","11","12","24"], 2, "12 tall."));
      out.push(qNum("Hvor mange timer er det i et halvt døgn?", 12, "12 timer."));
      out.push(qNum("Hvor mange minutter er en hel time?", 60, "60 minutter."));
      out.push(qNum("Hvor mange minutter er en halvtime?", 30, "Halvparten av 60."));
      out.push(qNum("Hvor mange minutter er en kvart?", 15, "Fjerdedel av 60."));
      return out;
    },

    /* === 2. trinn === */
    "g2-tall100": (rng) => {
      const out = [];
      for (let i = 0; i < 8; i++) {
        const t = pickInt(rng, 1, 9), e = pickInt(rng, 0, 9);
        const n = t * 10 + e;
        out.push(qNum(`Hvor mange enere er det i ${n}?`, e, `${n} = ${t} tiere + ${e} enere.`));
      }
      for (let i = 0; i < 6; i++) {
        const n = pickInt(rng, 1, 99);
        out.push(qNum(`Hvilket tall kommer rett etter ${n}?`, n + 1, `Etter ${n} kommer ${n + 1}.`));
      }
      for (let i = 0; i < 6; i++) {
        const n = pickInt(rng, 10, 99);
        const isPar = n % 2 === 0;
        out.push(qMC(`Er ${n} et partall eller oddetall?`, ["partall","oddetall"], isPar ? 0 : 1, `${n} ender på ${n % 10}.`));
      }
      return out;
    },

    "g2-pluss100": (rng) => [
      ...genAdd(rng, 6, 10, 50, 10, 50),
      ...genAdd(rng, 6, 20, 60, 10, 30),
      ...genSub(rng, 6, 30, 99, 10, 40),
      ...genSub(rng, 4, 50, 99, 20, 49),
    ],

    "g2-penger": (rng) => {
      const out = [];
      for (let i = 0; i < 10; i++) {
        const a = pickInt(rng, 5, 50), b = pickInt(rng, 5, 49);
        const sum = a + b;
        out.push(qNum(`En leke koster ${a} kr og en annen ${b} kr. Hva blir totalprisen i kroner?`, sum, `${a} + ${b} = ${sum}.`));
      }
      for (let i = 0; i < 10; i++) {
        const paid = pickInt(rng, 50, 200), price = pickInt(rng, 10, paid - 1);
        out.push(qNum(`En vare koster ${price} kr. Du betaler med ${paid} kr. Hvor mange kr får du igjen?`, paid - price, `${paid} - ${price} = ${paid - price}.`));
      }
      return out;
    },

    "g2-halv": (rng) => [
      qMC("Lang viser på 6, kort mellom 4 og 5. Klokka er ...?", ["halv 4","halv 5","halv 6","kvart over 4"], 1, "Halv fem."),
      qMC("Lang på 3, kort like etter 10. Klokka er?", ["kvart over 10","kvart på 11","halv 10","ti"], 0, "Kvart over 10."),
      qMC("Lang på 9, kort like før 6. Klokka er?", ["kvart over 5","kvart på 6","halv 6","seks"], 1, "Kvart på 6."),
      qMC("Lang på 6, kort mellom 8 og 9. Klokka er?", ["halv 8","halv 9","kvart over 8","ni"], 1, "Halv ni."),
      qMC("Lang på 3 betyr ...?", ["kvart over","kvart på","halv","hel"], 0, "Kvart over."),
      qMC("Lang på 9 betyr ...?", ["kvart over","kvart på","halv","hel"], 1, "Kvart på."),
      qMC("Lang på 6 betyr ...?", ["kvart over","kvart på","halv","hel"], 2, "Halv."),
      qMC("Lang på 12 betyr ...?", ["kvart over","kvart på","halv","hel"], 3, "Hel time."),
      qNum("Hvor mange minutter er det fra hel time til kvart over?", 15, "15 minutter."),
      qNum("Hvor mange minutter er det fra hel time til halv?", 30, "30 minutter."),
      qNum("Hvor mange minutter er det fra kvart over til halv?", 15, "15 minutter."),
      qNum("Hvor mange minutter er det fra halv til kvart på neste time?", 15, "15 minutter."),
      qNum("Hvor mange minutter er det fra kvart på til hel time?", 15, "15 minutter."),
      qNum("Hvor mange minutter er det fra hel time til neste hele time?", 60, "60 minutter."),
      qMC("Lang viser flytter seg ett tall hvor mange minutter?", ["3","5","10","15"], 1, "5 minutter per tall."),
      qMC("Lang viser peker på 4. Hvor mange minutter etter hel time?", ["15","20","25","40"], 1, "4 · 5 = 20 minutter."),
      qMC("Lang viser peker på 7. Hvor mange minutter over?", ["25","30","35","40"], 2, "7 · 5 = 35 minutter."),
      qMC("Lang viser på 10. Hvor mange minutter på neste hele?", ["10","15","20","50"], 0, "60 - 50 = 10."),
    ],

    /* === 3. trinn === */
    "g3-gange": (rng) => [
      ...genMul(rng, 12, 1, 5, 2, 10),
      ...genMul(rng, 6, 2, 10, 2, 5),
    ],

    "g3-divisjon": (rng) => [
      ...genDiv(rng, 18, 2, 5, 2, 10),
    ],

    "g3-brok": (rng) => {
      const out = [];
      for (let i = 0; i < 6; i++) {
        const nev = [2, 3, 4, 5, 6, 8, 10][pickInt(rng, 0, 6)];
        const whole = nev * pickInt(rng, 1, 10);
        out.push(qNum(`Hva er 1/${nev} av ${whole}?`, whole / nev, `${whole} : ${nev} = ${whole / nev}.`));
      }
      out.push(qNum("Hva er halvparten av 30?", 15, "1/2 av 30."));
      out.push(qNum("Hva er halvparten av 50?", 25, "25."));
      out.push(qNum("Hva er 1/3 av 12?", 4, "12:3."));
      out.push(qNum("Hva er 1/4 av 20?", 5, "20:4."));
      out.push(qNum("Hva er 1/5 av 35?", 7, "35:5."));
      out.push(qNum("Hva er 1/10 av 80?", 8, "80:10."));
      out.push(qMC("Hvilken brøk er størst?", ["1/2","1/3","1/4","1/6"], 0, "Størst nevner gir minst brøk når telleren er 1."));
      out.push(qMC("Hvor mange åttedeler er det i en hel?", ["4","6","8","10"], 2, "8/8 = 1."));
      out.push(qMC("Hva betyr 2/3?", ["2 deler av 3 like deler","3 deler av 2","2 hele","3 hele"], 0, "Telleren 2 av nevner 3."));
      out.push(qMC("Hvilken brøk er lik 1?", ["3/4","5/5","2/3","7/8"], 1, "Når teller = nevner."));
      out.push(qMC("Hva er det samme som 1/2?", ["2/4","1/3","1/5","3/4"], 0, "Halvparten = 2 av 4."));
      out.push(qMC("Hva er størst: 3/4 eller 1/2?", ["3/4","1/2","like store","kan ikke vite"], 0, "3/4 = 0,75 > 0,5."));
      return out;
    },

    "g3-maling": (rng) => {
      const out = [];
      for (let i = 0; i < 5; i++) { const m = pickInt(rng, 1, 9); out.push(qNum(`Hvor mange cm er ${m} meter?`, m * 100, `1m = 100cm.`)); }
      for (let i = 0; i < 5; i++) { const cm = pickInt(rng, 1, 10) * 100; out.push(qNum(`Hvor mange meter er ${cm} cm?`, cm / 100, `${cm}:100.`)); }
      for (let i = 0; i < 4; i++) { const kg = pickInt(rng, 1, 9); out.push(qNum(`Hvor mange gram er ${kg} kg?`, kg * 1000, `1kg = 1000g.`)); }
      for (let i = 0; i < 3; i++) { const g = pickInt(rng, 1, 9) * 1000; out.push(qNum(`Hvor mange kg er ${g} gram?`, g / 1000, `${g}:1000.`)); }
      out.push(qMC("Hvilken enhet passer for å måle melk?", ["mm","liter","tonn","km"], 1, "Liter er volum for væske."));
      out.push(qMC("Hva er 1 km i meter?", ["10","100","1000","10000"], 2, "1000."));
      out.push(qMC("Hva er en passende enhet for høyden på et fjell?", ["mm","cm","m","g"], 2, "Meter."));
      out.push(qMC("Hvilken er tyngst?", ["1 kg","100 g","999 g","500 g"], 0, "1 kg = 1000 g."));
      return out;
    },

    /* === 4. trinn === */
    "g4-tabell": (rng) => [
      ...genMul(rng, 18, 2, 10, 2, 10),
    ],

    "g4-divisjon": (rng) => {
      const out = [];
      for (let i = 0; i < 10; i++) {
        const d = pickInt(rng, 2, 9), q = pickInt(rng, 3, 12), r = pickInt(rng, 1, d - 1);
        const N = d * q + r;
        out.push(qNum(`Hva er heltallsdelen når ${N} deles på ${d}?`, q, `${d}·${q}=${d*q}, så rest ${r}.`));
        out.push(qNum(`Hva er resten når ${N} deles på ${d}?`, r, `${N} - ${d*q} = ${r}.`));
      }
      return out;
    },

    "g4-areal": (rng) => {
      const out = [];
      for (let i = 0; i < 8; i++) {
        const l = pickInt(rng, 2, 12), b = pickInt(rng, 2, 12);
        out.push(qNum(`Areal av rektangel ${l} cm · ${b} cm? (cm²)`, l * b, `${l}·${b}=${l*b}.`));
      }
      for (let i = 0; i < 8; i++) {
        const l = pickInt(rng, 2, 15), b = pickInt(rng, 2, 15);
        out.push(qNum(`Omkrets av rektangel ${l} cm · ${b} cm? (cm)`, 2 * (l + b), `2·(${l}+${b}) = ${2*(l+b)}.`));
      }
      for (let i = 0; i < 4; i++) {
        const s = pickInt(rng, 2, 12);
        out.push(qNum(`Areal av kvadrat med side ${s} cm? (cm²)`, s * s, `${s}·${s}=${s*s}.`));
      }
      return out;
    },

    "g4-desimal": (rng) => {
      const out = [];
      out.push(qText("Skriv 1/2 som desimaltall (med komma)", "0,5", "1/2 = 0,5."));
      out.push(qText("Skriv 1/4 som desimaltall", "0,25", "1/4 = 0,25."));
      out.push(qText("Skriv 3/4 som desimaltall", "0,75", "3/4 = 0,75."));
      out.push(qText("Skriv 1/10 som desimaltall", "0,1", "1/10 = 0,1."));
      out.push(qText("Skriv 7/10 som desimaltall", "0,7", "7/10 = 0,7."));
      out.push(qNum("Hvor mange tideler er det i 4,2?", 42, "4,2 = 42 tideler."));
      out.push(qNum("Hvor mange hundredeler er det i 0,03?", 3, "0,03 = 3 hundredeler."));
      out.push(qMC("Hvilket tall er størst?", ["0,5","0,45","0,49","0,499"], 0, "0,5 = 0,500 er størst."));
      out.push(qMC("Hvilket tall er minst?", ["0,2","0,02","0,12","0,21"], 1, "0,02 < 0,12 < 0,2 < 0,21."));
      for (let i = 0; i < 6; i++) {
        const a = pickInt(rng, 5, 30), b = pickInt(rng, 5, 30);
        const A = a / 10, B = b / 10; const sum = (a + b) / 10;
        out.push(qText(`Regn ut: ${A.toString().replace(".",",")} + ${B.toString().replace(".",",")} (svar med komma)`, sum.toString().replace(".",","), `${A} + ${B} = ${sum}.`));
      }
      out.push(qNum("12,50 kr + 17,50 kr = ? kr", 30, "30 kr."));
      out.push(qNum("5,5 + 4,5 = ?", 10, "Sum 10."));
      out.push(qNum("Hvor mange ører er en halv krone?", 50, "0,5 kr = 50 øre."));
      out.push(qText("Hva er det samme som 0,9? (skriv som x/10)", "9/10", "0,9 = 9/10."));
      return out;
    },

    /* === 5. trinn === */
    "g5-brok": (rng) => {
      const out = [];
      for (let i = 0; i < 6; i++) {
        const n = pickInt(rng, 4, 12), a = pickInt(rng, 1, n - 2), b = pickInt(rng, 1, n - a - 1);
        out.push(qText(`${a}/${n} + ${b}/${n} = ?/${n} (svar telleren)`, String(a + b), `${a}+${b}=${a+b}.`));
      }
      for (let i = 0; i < 6; i++) {
        const n = pickInt(rng, 5, 12), a = pickInt(rng, 3, n - 1), b = pickInt(rng, 1, a - 1);
        out.push(qText(`${a}/${n} - ${b}/${n} = ?/${n} (svar telleren)`, String(a - b), `${a}-${b}=${a-b}.`));
      }
      out.push(qMC("Hvilken brøk er størst?", ["3/4","2/3","5/8","1/2"], 0, "3/4=0,75."));
      out.push(qMC("Hvilken er minst?", ["1/3","1/4","1/5","1/2"], 2, "1/5 = 0,2."));
      out.push(qText("Skriv 4/8 i enklere form (a/b)", ["1/2"], "Del begge med 4."));
      out.push(qText("Skriv 6/9 forenklet", ["2/3"], "Del med 3."));
      out.push(qText("Skriv 1 hel som brøk med nevner 5 (a/b)", ["5/5"], "5/5 = 1."));
      out.push(qText("1/3 + 1/6 = ? (svar a/b)", ["3/6","1/2"], "1/3=2/6, 2/6+1/6=3/6=1/2."));
      out.push(qText("1/2 + 1/3 = ? (svar a/b)", ["5/6"], "3/6+2/6=5/6."));
      out.push(qText("3/4 - 1/2 = ? (svar a/b)", ["1/4"], "3/4-2/4=1/4."));
      out.push(qNum("Hvor mange åttedeler i 1 hel?", 8, "8/8."));
      out.push(qMC("Hvilken brøk er lik 1?", ["3/4","4/4","2/3","5/6"], 1, "Teller=nevner."));
      return out;
    },

    "g5-prosent": (rng) => {
      const out = [];
      for (let i = 0; i < 6; i++) { const n = pickInt(rng, 5, 50) * 10; out.push(qNum(`10% av ${n}?`, n / 10, `${n}:10.`)); }
      for (let i = 0; i < 4; i++) { const n = pickInt(rng, 4, 30) * 4; out.push(qNum(`25% av ${n}?`, n / 4, `${n}:4.`)); }
      for (let i = 0; i < 4; i++) { const n = pickInt(rng, 4, 30) * 2; out.push(qNum(`50% av ${n}?`, n / 2, `${n}:2.`)); }
      out.push(qNum("75% av 80?", 60, "3/4 · 80 = 60."));
      out.push(qNum("100% av 47?", 47, "100% = hele."));
      out.push(qNum("20% av 50?", 10, "1/5 av 50."));
      out.push(qNum("5% av 200?", 10, "5/100 · 200 = 10."));
      out.push(qMC("25% er det samme som ...?", ["1/2","1/3","1/4","1/5"], 2, "25/100=1/4."));
      out.push(qMC("50% av 100 er ...?", ["10","25","50","100"], 2, "50."));
      return out;
    },

    "g5-koord": (rng) => {
      const out = [];
      for (let i = 0; i < 6; i++) {
        const x = pickInt(rng, 0, 8), y = pickInt(rng, 0, 8);
        out.push(qText(`Et punkt ligger ${x} til høyre og ${y} opp fra origo. Koordinater? Skriv (x,y).`, `(${x},${y})`, `Først x, så y.`));
      }
      out.push(qNum("(3,5): hvor langt opp fra x-aksen?", 5, "y=5."));
      out.push(qNum("(7,2): hvor langt fra y-aksen?", 7, "x=7."));
      out.push(qMC("Hvor ligger punktet (0,4)?", ["i origo","på x-aksen","på y-aksen","i 1. kvadrant"], 2, "x=0."));
      out.push(qMC("Hvor ligger (6,0)?", ["i origo","på x-aksen","på y-aksen","ikke definert"], 1, "y=0."));
      out.push(qMC("Punkt A=(2,3) og B=(2,7). Hva er likt?", ["x","y","ingen","begge"], 0, "Begge har x=2."));
      out.push(qMC("(3,4) og (3,4): hva er sant?", ["samme punkt","ulike punkter","på x-aksen","på y-aksen"], 0, "Samme koordinater = samme punkt."));
      out.push(qMC("Hva er origo?", ["(1,1)","(0,1)","(0,0)","(10,10)"], 2, "Origo = nullpunktet."));
      out.push(qText("Punktet 5 til høyre, 0 opp. Koordinater? (x,y)", "(5,0)", "y=0 på x-aksen."));
      out.push(qText("Punktet 0 til høyre, 3 opp. (x,y)", "(0,3)", "x=0 på y-aksen."));
      out.push(qNum("Avstanden fra (2,0) til origo?", 2, "Bare langs x-aksen."));
      out.push(qNum("Avstanden fra (0,7) til origo?", 7, "Langs y-aksen."));
      out.push(qText("Punktene (1,2), (4,2), (4,6), (1,6) danner en ... (rektangel/trekant/sirkel)", "rektangel", "4 punkter i firkant."));
      out.push(qText("Hvor mange enheter høyt er rektangelet over?", ["4"], "Fra y=2 til y=6."));
      return out;
    },

    "g5-tidsmal": (rng) => {
      const out = [];
      for (let i = 0; i < 5; i++) { const t = pickInt(rng, 2, 12); out.push(qNum(`Hvor mange minutter i ${t} timer?`, t * 60, `${t}·60.`)); }
      for (let i = 0; i < 5; i++) { const min = pickInt(rng, 1, 10); out.push(qNum(`Hvor mange sekunder i ${min} minutter?`, min * 60, `${min}·60.`)); }
      for (let i = 0; i < 4; i++) { const d = pickInt(rng, 2, 7); out.push(qNum(`Hvor mange timer i ${d} døgn?`, d * 24, `${d}·24.`)); }
      out.push(qNum("Hvor mange døgn i 2 uker?", 14, "2·7."));
      out.push(qNum("Hvor mange minutter i en kvarter?", 15, "15."));
      out.push(qNum("Hvor mange sekunder i en kvarter?", 900, "15·60."));
      out.push(qNum("Hvor mange minutter i en halv time?", 30, "30."));
      out.push(qNum("Hvor mange timer i en uke?", 168, "7·24=168."));
      return out;
    },

    /* === 6. trinn === */
    "g6-neg": (rng) => {
      const out = [];
      for (let i = 0; i < 8; i++) {
        const a = pickInt(rng, -15, 15), b = pickInt(rng, -15, 15);
        out.push(qNum(`Regn ut: ${a} + ${b}`, a + b, `${a}+${b}=${a+b}.`));
      }
      for (let i = 0; i < 8; i++) {
        const a = pickInt(rng, -15, 15), b = pickInt(rng, -10, 15);
        out.push(qNum(`Regn ut: ${a} - ${b}`, a - b, `${a}-${b}=${a-b}.`));
      }
      out.push(qNum("Det er -10°C, stiger 6 grader. Ny temp?", -4, "-10+6=-4."));
      out.push(qNum("Det var 3°C, faller 8 grader. Ny temp?", -5, "3-8=-5."));
      out.push(qMC("Hvilket tall er størst?", ["-3","-7","0","-10"], 2, "0 er størst av disse."));
      out.push(qMC("Hvilket er minst?", ["-2","0","-9","3"], 2, "-9 er minst."));
      return out;
    },

    "g6-bdp": (rng) => {
      const out = [];
      const fbpc = [[1,2,0.5,50],[1,4,0.25,25],[3,4,0.75,75],[1,5,0.2,20],[2,5,0.4,40],[3,5,0.6,60],[4,5,0.8,80],[1,10,0.1,10],[1,8,0.125,12.5],[7,10,0.7,70],[9,10,0.9,90]];
      fbpc.forEach(([n,d,des,pc]) => {
        out.push(qText(`Skriv ${n}/${d} som desimaltall (komma)`, String(des).replace(".",","), `${n}/${d}=${des}.`));
        out.push(qText(`Skriv ${n}/${d} som prosent (bare tallet)`, String(pc), `${pc}%.`));
      });
      for (let i = 0; i < 6; i++) { const p = [10,20,25,30,40,50,60,75][pickInt(rng,0,7)]; const n = pickInt(rng,2,20)*10; out.push(qNum(`${p}% av ${n}?`, n*p/100, `${n}·${p}/100.`)); }
      return out;
    },

    "g6-geometri": (rng) => {
      const out = [];
      for (let i = 0; i < 8; i++) {
        const a = pickInt(rng, 20, 80), b = pickInt(rng, 20, 80);
        if (a + b >= 175) continue;
        out.push(qNum(`To vinkler i en trekant er ${a}° og ${b}°. Den tredje?`, 180 - a - b, `180-${a}-${b}=${180-a-b}.`));
      }
      out.push(qNum("Hver vinkel i en likesidet trekant?", 60, "180/3=60."));
      out.push(qMC("Vinkel på 130° kalles ...?", ["spiss","rett","stump","utstrakt"], 2, "Stump."));
      out.push(qMC("Vinkel på 45° er ...?", ["spiss","rett","stump","utstrakt"], 0, "Spiss."));
      out.push(qMC("Vinkel på 180° er ...?", ["spiss","rett","stump","utstrakt"], 3, "Utstrakt."));
      out.push(qMC("Trekant med 3 like vinkler kalles ...?", ["rettvinklet","likebeint","likesidet","stumpvinklet"], 2, "Likesidet."));
      out.push(qMC("Trekant med 90°-vinkel kalles ...?", ["rettvinklet","likebeint","likesidet","spissvinklet"], 0, "Rettvinklet."));
      out.push(qMC("Summen av vinklene i en firkant?", ["180°","270°","360°","720°"], 2, "360°."));
      for (let i = 0; i < 4; i++) {
        const a = pickInt(rng, 80, 100);
        const b = pickInt(rng, 30, 80);
        const c = 360 - a - b - pickInt(rng, 30, 100);
        const known1 = a, known2 = b, known3 = pickInt(rng, 50, 120);
        const third = 360 - known1 - known2 - known3;
        if (third > 10 && third < 200) {
          out.push(qNum(`Tre vinkler i en firkant er ${known1}°, ${known2}° og ${known3}°. Den fjerde?`, third, `360-sum.`));
        }
      }
      out.push(qNum("Vinkel utfyller 180°: 70° + ? = 180°", 110, "180-70."));
      out.push(qNum("Hva er den nabovinkelen til 75° (sum 180°)?", 105, "180-75."));
      return out;
    },

    "g6-sannsynlighet": (rng) => [
      qText("Sannsynlighet for å trekke et hjerter fra full kortstokk. Som a/b.", ["13/52","1/4"], "13 hjerter av 52."),
      qText("Sannsynlighet for 1 eller 2 på terning. a/b.", ["2/6","1/3"], "2 av 6."),
      qText("Sannsynlighet for kron på myntkast. a/b.", ["1/2"], "1 av 2."),
      qText("Sannsynlighet for ikke 6 på terning. a/b.", ["5/6"], "Komplement."),
      qText("Sannsynlighet for et tall større enn 4 på terning. a/b.", ["2/6","1/3"], "5 eller 6."),
      qText("Sannsynlighet for ess fra kortstokk. a/b.", ["4/52","1/13"], "4 av 52."),
      qText("Sannsynlighet for kløver konge. a/b.", ["1/52"], "Bare ett kort."),
      qText("Sannsynlighet for partall på terning. a/b.", ["3/6","1/2"], "2,4,6."),
      qNum("I en pose med 3 røde og 7 blå kuler: sannsynlighet for rød × 10?", 3, "3/10."),
      qNum("Sannsynlighet for å trekke kongen av spar i prosent (svar i %).", 0, "Bør være ~2, men avrundet til hel."),
      qText("Sannsynlighet (i %) for å trekke ett ess (avrund)", "8", "4/52≈0,077≈8%."),
      qMC("Et sikkert utfall har sannsynlighet ...?", ["0","0,5","1","2"], 2, "Sikkert = 1."),
      qMC("Et umulig utfall har sannsynlighet ...?", ["0","0,1","0,5","1"], 0, "Umulig = 0."),
      qMC("Hvilken er størst?", ["1/6","1/4","1/3","1/2"], 3, "1/2 størst."),
      qText("3 røde og 2 grønne kuler. Sannsynlighet for grønn? a/b.", ["2/5"], "2 av 5."),
      qText("5 svarte, 5 hvite kuler. Sannsynlighet for svart? a/b.", ["5/10","1/2"], "Halvparten."),
      qText("En terning kastes. P(odetall)? a/b.", ["3/6","1/2"], "1,3,5."),
    ],

    /* === 7. trinn === */
    "g7-variabel": (rng) => {
      const out = [];
      for (let i = 0; i < 8; i++) {
        const x = pickInt(rng, 2, 10), a = pickInt(rng, 2, 9), b = pickInt(rng, 1, 20);
        out.push(qNum(`Hvis x=${x}, hva er ${a}x + ${b}?`, a * x + b, `${a}·${x}+${b}.`));
      }
      for (let i = 0; i < 4; i++) {
        const a = pickInt(rng, 2, 8), b = pickInt(rng, 1, 7);
        out.push(qText(`Trekk sammen: ${a}x + ${b}x. Skriv f.eks 9x.`, [`${a+b}x`], `${a}+${b}=${a+b}.`));
      }
      for (let i = 0; i < 4; i++) {
        const a = pickInt(rng, 3, 9), b = pickInt(rng, 1, a - 1);
        out.push(qText(`Trekk sammen: ${a}y - ${b}y. F.eks 4y.`, [`${a-b}y`], `${a-b}y.`));
      }
      out.push(qText("Forenkle: 3x + 2x + x", ["6x"], "6x."));
      out.push(qText("Forenkle: 5a + 3b + 2a (form: 7a+3b)", ["7a+3b"], "Like ledd."));
      out.push(qNum("a=2, b=3. Regn 4a + 5b.", 23, "8+15."));
      out.push(qNum("x=10. Regn 2x + 3.", 23, "20+3."));
      out.push(qNum("x=7, y=2. Regn 3x - 2y.", 17, "21-4."));
      return out;
    },

    "g7-likning": (rng) => {
      const out = [];
      for (let i = 0; i < 6; i++) {
        const x = pickInt(rng, 2, 12), b = pickInt(rng, 1, 15);
        out.push(qNum(`Løs: x + ${b} = ${x + b}.`, x, `x=${x}.`));
      }
      for (let i = 0; i < 6; i++) {
        const x = pickInt(rng, 2, 12), a = pickInt(rng, 2, 9);
        out.push(qNum(`Løs: ${a}x = ${a * x}.`, x, `x=${x}.`));
      }
      for (let i = 0; i < 6; i++) {
        const x = pickInt(rng, 2, 10), a = pickInt(rng, 2, 8), b = pickInt(rng, 1, 15);
        out.push(qNum(`Løs: ${a}x + ${b} = ${a * x + b}`, x, `x=${x}.`));
      }
      return out;
    },

    "g7-statistikk": (rng) => {
      const out = [];
      function listMean(arr) { return arr.reduce((s, v) => s + v, 0) / arr.length; }
      function median(arr) { const s = arr.slice().sort((a,b)=>a-b); const n = s.length; return n%2 ? s[(n-1)/2] : (s[n/2-1]+s[n/2])/2; }
      for (let i = 0; i < 8; i++) {
        const n = 4;
        const arr = Array.from({length:n}, () => pickInt(rng, 1, 15));
        const m = listMean(arr);
        if (Number.isInteger(m)) out.push(qNum(`Gjennomsnittet av ${arr.join(", ")}?`, m, `Sum/${n}.`));
      }
      for (let i = 0; i < 6; i++) {
        const arr = Array.from({length:5}, () => pickInt(rng, 1, 20));
        out.push(qNum(`Median av ${arr.join(", ")}?`, median(arr), `Sortert: ${arr.slice().sort((a,b)=>a-b).join(", ")}.`));
      }
      for (let i = 0; i < 6; i++) {
        const mode = pickInt(rng, 1, 9);
        const arr = [mode, mode, mode, pickInt(rng, 10, 15), pickInt(rng, 10, 15)];
        out.push(qNum(`Typetall: ${arr.join(", ")}?`, mode, `${mode} forekommer flest ganger.`));
      }
      return out;
    },

    "g7-volum": (rng) => {
      const out = [];
      for (let i = 0; i < 12; i++) {
        const l = pickInt(rng, 2, 10), b = pickInt(rng, 2, 10), h = pickInt(rng, 2, 10);
        out.push(qNum(`Volum av en eske ${l} cm · ${b} cm · ${h} cm? (cm³)`, l * b * h, `${l}·${b}·${h}.`));
      }
      out.push(qNum("Volum av terning med side 5 cm? (cm³)", 125, "5³."));
      out.push(qNum("Volum av terning med side 3 cm? (cm³)", 27, "27."));
      out.push(qNum("Hvor mange cm³ er 1 liter?", 1000, "1 dm³ = 1000 cm³."));
      out.push(qNum("Hvor mange liter er 5000 cm³?", 5, "5000/1000."));
      out.push(qNum("Volum av kasse 2 dm · 5 dm · 1 dm i liter?", 10, "2·5·1=10 dm³."));
      out.push(qMC("Enhet for volum av et hus passer best ...?", ["cm³","dm³","m³","mm³"], 2, "m³."));
      return out;
    },

    /* === 8. trinn === */
    "g8-parentes": (rng) => {
      const out = [];
      for (let i = 0; i < 6; i++) {
        const a = pickInt(rng, 2, 9), b = pickInt(rng, 1, 9);
        out.push(qText(`Multipliser ut: ${a}(x + ${b}). Skriv f.eks ${a}x+${a*b}.`, [`${a}x+${a*b}`], `${a}·x+${a}·${b}.`));
      }
      for (let i = 0; i < 4; i++) {
        const a = pickInt(rng, 2, 9), b = pickInt(rng, 1, 9);
        out.push(qText(`Multipliser ut: ${a}(x - ${b}). Skriv f.eks ${a}x-${a*b}.`, [`${a}x-${a*b}`], `${a}·x-${a}·${b}.`));
      }
      for (let i = 0; i < 4; i++) {
        const a = pickInt(rng, 2, 6), b = pickInt(rng, 2, 6), c = pickInt(rng, 1, 8);
        out.push(qText(`Multipliser ut: ${a}(${b}x + ${c}). Skriv f.eks ${a*b}x+${a*c}.`, [`${a*b}x+${a*c}`], `${a}·${b}x + ${a}·${c}.`));
      }
      for (let i = 0; i < 4; i++) {
        const k = pickInt(rng, 2, 7), n1 = pickInt(rng, 2, 5), n2 = pickInt(rng, 1, 6);
        out.push(qText(`Faktoriser: ${k*n1}x + ${k*n2}. Som k(ax+b).`, [`${k}(${n1}x+${n2})`,`${k}·(${n1}x+${n2})`], `Felles faktor ${k}.`));
      }
      for (let i = 0; i < 4; i++) {
        const a = pickInt(rng, 2, 8), b = pickInt(rng, 1, 6), c = pickInt(rng, 2, 6), d = pickInt(rng, 1, 5);
        const sx = a - c, sk = b - d;
        if (sx > 0 && sk !== 0) {
          out.push(qText(`Trekk sammen: ${a}x + ${b} - ${c}x ${d >= 0 ? "- " + d : "+ " + (-d)}. Form ax±b.`,
            [`${sx}x${sk >= 0 ? "+" + sk : sk}`], `${a-c}x og ${b-d}.`));
        }
      }
      return out;
    },

    "g8-likning": (rng) => {
      const out = [];
      for (let i = 0; i < 8; i++) {
        const x = pickInt(rng, 2, 12), a = pickInt(rng, 2, 9), b = pickInt(rng, 1, 15);
        out.push(qNum(`Løs: ${a}x + ${b} = ${a * x + b}`, x, `x=${x}.`));
      }
      for (let i = 0; i < 6; i++) {
        const x = pickInt(rng, 2, 10), a = pickInt(rng, 3, 9), b = pickInt(rng, 1, 9);
        const c = pickInt(rng, 1, a - 1), d = pickInt(rng, 1, 9);
        const lhs = a * x + b, rhs = c * x + d;
        // a x + b = c x + d-2(x-...) keep simple
        out.push(qNum(`Løs: ${a}x + ${b} = ${c}x + ${lhs - c * x}`, x, `Flytt: ${a-c}x = ${lhs - c * x - b}, x=${x}.`));
      }
      for (let i = 0; i < 4; i++) {
        const x = pickInt(rng, 2, 8), a = pickInt(rng, 2, 6), b = pickInt(rng, 1, 7);
        const lhs = a * (x + b);
        out.push(qNum(`Løs: ${a}(x + ${b}) = ${lhs}`, x, `${a}x+${a*b}=${lhs}, x=${x}.`));
      }
      return out;
    },

    "g8-pyth": (rng) => {
      const triples = [[3,4,5],[6,8,10],[5,12,13],[8,15,17],[9,12,15],[7,24,25],[20,21,29],[9,40,41],[12,16,20],[15,20,25],[10,24,26]];
      const out = [];
      triples.forEach(([a,b,c]) => {
        out.push(qNum(`Katetene er ${a} og ${b}. Hypotenusen?`, c, `√(${a}²+${b}²)=${c}.`));
      });
      triples.forEach(([a,b,c]) => {
        out.push(qNum(`Hypotenus ${c}, katet ${a}. Den andre kateten?`, b, `√(${c}²-${a}²)=${b}.`));
      });
      return out;
    },

    "g8-prosent": (rng) => {
      const out = [];
      for (let i = 0; i < 6; i++) {
        const p = [5,10,15,20,25,30,40,50,75][pickInt(rng,0,8)];
        const n = pickInt(rng, 4, 40) * 10;
        out.push(qNum(`${p}% av ${n}?`, n * p / 100, `${n}·${p}/100.`));
      }
      for (let i = 0; i < 5; i++) {
        const p = [10,20,25,30,40,50][pickInt(rng,0,5)];
        const orig = pickInt(rng, 5, 40) * 100;
        const ny = orig * (100 - p) / 100;
        out.push(qNum(`En vare på ${orig} kr settes ned ${p}%. Ny pris?`, ny, `${orig}·${(100-p)/100}.`));
      }
      for (let i = 0; i < 4; i++) {
        const p = [10,20,25,50][pickInt(rng,0,3)];
        const orig = pickInt(rng, 4, 30) * 100;
        const ny = orig * (100 + p) / 100;
        out.push(qNum(`${orig} kr økes med ${p}%. Ny verdi?`, ny, `vekstfaktor ${(100+p)/100}.`));
      }
      out.push(qNum("Hvor mange % er 15 av 60?", 25, "15/60=0,25=25%."));
      out.push(qNum("Hvor mange % er 24 av 80?", 30, "24/80=0,3=30%."));
      out.push(qNum("36 er 30% av hva?", 120, "36/0,3=120."));
      out.push(qNum("Vekstfaktor for økning på 8% er ...?", 1.08, "1+0,08."));
      out.push(qNum("Vekstfaktor for reduksjon på 12% er ...? (desimal)", 0.88, "1-0,12.", 0.001));
      return out;
    },

    "g8-funksjon": (rng) => {
      const out = [];
      for (let i = 0; i < 8; i++) {
        const a = pickInt(rng, 1, 6), b = pickInt(rng, -10, 10), x = pickInt(rng, -5, 8);
        out.push(qNum(`y=${a}x${b>=0?"+"+b:b}. Hva er y når x=${x}?`, a*x+b, `${a}·${x}${b>=0?"+"+b:b}.`));
      }
      for (let i = 0; i < 4; i++) {
        const a = pickInt(rng, 2, 6), b = pickInt(rng, 1, 10);
        out.push(qNum(`Stigningstall i y=${a}x+${b}?`, a, `Koeff foran x.`));
      }
      for (let i = 0; i < 4; i++) {
        const a = pickInt(rng, 1, 6), b = pickInt(rng, -8, 8);
        out.push(qNum(`Konstantledd i y=${a}x${b>=0?"+"+b:b}?`, b, `Tallet uten x.`));
      }
      out.push(qText("Hva slags funksjon er y=3x+2? (lineær/andregrads)", "lineær", "Førstegrad."));
      out.push(qNum("Et taxi-selskap: 50 kr + 12 kr/km. Pris for 8 km?", 146, "50+12·8."));
      out.push(qNum("Et abonnement: 99 kr + 5 kr per film. 12 filmer?", 159, "99+60."));
      return out;
    },

    /* === 9. trinn === */
    "g9-lin": (rng) => {
      const out = [];
      for (let i = 0; i < 6; i++) {
        const a = pickInt(rng, 1, 5), b = pickInt(rng, -8, 8);
        const x1 = pickInt(rng, 0, 5); const x2 = x1 + pickInt(rng, 1, 4);
        const y1 = a*x1+b, y2 = a*x2+b;
        out.push(qNum(`Linja gjennom (${x1},${y1}) og (${x2},${y2}). Stigningstall?`, a, `(${y2}-${y1})/(${x2}-${x1})=${a}.`));
      }
      for (let i = 0; i < 4; i++) {
        const a = pickInt(rng, 2, 6), b = pickInt(rng, -12, -2);
        out.push(qNum(`y=${a}x${b}. Skjæring med x-aksen ved x=?`, -b/a, `0=${a}x${b} ⇒ x=${-b/a}.`));
      }
      for (let i = 0; i < 4; i++) {
        const a = pickInt(rng, 2, 5), b = pickInt(rng, -8, 8);
        out.push(qNum(`y=${a}x${b>=0?"+"+b:b}. y når x=0?`, b, `Konstantleddet.`));
      }
      for (let i = 0; i < 4; i++) {
        const a = pickInt(rng, 1, 4), b = pickInt(rng, 0, 8), x = pickInt(rng, -4, 6);
        out.push(qNum(`y=${a}x+${b}. y når x=${x}?`, a*x+b, `${a}·${x}+${b}.`));
      }
      out.push(qText("Linja har stigning 0. Det betyr ...?", ["vannrett"], "Horisontal linje."));
      out.push(qText("To linjer er parallelle dersom ...?", ["like stigningstall","samme stigningstall"], "Stigning lik."));
      return out;
    },

    "g9-ulikh": (rng) => {
      const out = [];
      for (let i = 0; i < 6; i++) {
        const a = pickInt(rng, 2, 6), b = pickInt(rng, 1, 10), x = pickInt(rng, 2, 8);
        const c = a * x - b;
        out.push(qText(`Løs: ${a}x - ${b} > ${c - 1}. Form x>?`, [`x>${(c-1+b)/a}`], `x>${x-((c-1)-c+1)/a}.`));
      }
      for (let i = 0; i < 6; i++) {
        const a = pickInt(rng, 2, 6), b = pickInt(rng, 1, 10), x = pickInt(rng, 2, 8);
        const c = a * x + b;
        out.push(qText(`Løs: ${a}x + ${b} ≤ ${c}. Form x≤?`, [`x≤${(c-b)/a}`, `x<=${(c-b)/a}`], `x≤${x}.`));
      }
      out.push(qText("Løs: -x > 5. Form x<?", ["x<-5"], "Snu tegnet."));
      out.push(qText("Løs: -2x ≥ 10. Form x≤?", ["x≤-5","x<=-5"], "Del på -2 og snu."));
      out.push(qText("Løs: 3x > 12. Form x>?", ["x>4"], "x>4."));
      out.push(qText("Løs: x + 7 < 15. Form x<?", ["x<8"], "x<8."));
      out.push(qText("Løs: 2x - 4 ≥ 0. Form x≥?", ["x≥2","x>=2"], "x≥2."));
      out.push(qText("Løs: 5 - x > 0. Form x<?", ["x<5"], "x<5."));
      return out;
    },

    "g9-formel": (rng) => {
      const out = [];
      for (let i = 0; i < 5; i++) { const g = pickInt(rng, 4, 20), h = pickInt(rng, 2, 12); out.push(qNum(`Trekant grunnlinje ${g}, høyde ${h}. Areal?`, g*h/2, `(${g}·${h})/2.`)); }
      for (let i = 0; i < 5; i++) { const r = pickInt(rng, 2, 12); const A = Math.round(3.14*r*r); out.push(qNum(`Areal av sirkel med r=${r}. (π≈3,14), avrund til hel.`, A, `3,14·${r}².`, 1)); }
      for (let i = 0; i < 5; i++) { const r = pickInt(rng, 2, 12); const O = Math.round(2*3.14*r); out.push(qNum(`Omkrets av sirkel med r=${r} (π≈3,14), avrund til hel.`, O, `2π·${r}.`, 1)); }
      for (let i = 0; i < 5; i++) { const r = pickInt(rng, 2, 8), h = pickInt(rng, 4, 15); const V = Math.round(3.14*r*r*h); out.push(qNum(`Sylinder r=${r}, h=${h}. Volum (π≈3,14), avrundet.`, V, `π·${r}²·${h}.`, 2)); }
      return out;
    },

    "g9-mlst": (rng) => {
      const out = [];
      const skalaer = [50, 100, 200, 500, 1000, 5000, 10000, 25000, 50000];
      for (let i = 0; i < 10; i++) {
        const s = skalaer[pickInt(rng, 0, skalaer.length - 1)];
        const cm = pickInt(rng, 2, 15);
        const realCm = cm * s;
        out.push(qNum(`Målestokk 1:${s}. ${cm} cm på kartet = ? cm i virkeligheten.`, realCm, `${cm}·${s}.`));
      }
      for (let i = 0; i < 6; i++) {
        const s = [100, 200, 500, 1000][pickInt(rng, 0, 3)];
        const realM = pickInt(rng, 5, 50);
        const cmKart = (realM * 100) / s;
        out.push(qText(`Målestokk 1:${s}. ${realM} m i virkeligheten = ? cm på kartet`, [String(cmKart)], `${realM*100}/${s}.`));
      }
      out.push(qMC("Målestokk 2:1 betyr at tegningen er ...?", ["like stor","mindre","større enn virkelig","ikke definert"], 2, "Forstørret."));
      out.push(qMC("Hvilken målestokk passer for et veikart?", ["1:10","1:100","1:1000","1:100000"], 3, "Stor nedskalering."));
      return out;
    },

    "g9-sannsynlig": (rng) => {
      const out = [];
      out.push(qText("Sannsynlighet for to mynt på rad. a/b.", ["1/4"], "1/2·1/2."));
      out.push(qText("Sannsynlighet for tre sekser på rad. a/b.", ["1/216"], "(1/6)³."));
      out.push(qText("P(rød, så grønn) fra pose 3R/2G med tilbakelegging. a/b.", ["6/25"], "(3/5)(2/5)=6/25."));
      out.push(qText("P(to ess på rad, med tilbakelegging, full stokk). a/b.", ["1/169","16/2704"], "(4/52)²."));
      out.push(qNum("Sannsynlighet for å få 6 minst en gang i to terningkast: nevn i prosent (avrund)", 31, "1-(5/6)²≈0,306.", 1));
      out.push(qText("P(2 partall etter hverandre på terning). a/b.", ["1/4","9/36"], "(1/2)²."));
      out.push(qText("P(mynt, så terning gir 1). a/b.", ["1/12"], "1/2·1/6."));
      out.push(qText("P(samme tall på to terninger). a/b.", ["1/6","6/36"], "6 gunstige av 36."));
      out.push(qText("P(sum 7 på to terninger). a/b.", ["6/36","1/6"], "(1,6)(2,5)(3,4)(4,3)(5,2)(6,1)."));
      out.push(qText("P(sum 12 på to terninger). a/b.", ["1/36"], "Bare (6,6)."));
      out.push(qText("P(ikke 1 på 4 terningkast). a/b uten å forenkle nevner.", ["625/1296"], "(5/6)⁴=625/1296."));
      out.push(qNum("P(sum 11 på to terninger): hvor mange gunstige utfall?", 2, "(5,6) og (6,5)."));
      out.push(qNum("Antall mulige utfall ved kast av tre mynter?", 8, "2³=8."));
      out.push(qNum("Antall mulige utfall ved kast av to terninger?", 36, "6·6."));
      return out;
    },

    /* === 10. trinn === */
    "g10-kvadrat": (rng) => {
      const out = [];
      for (let i = 0; i < 6; i++) {
        const b = pickInt(rng, 1, 12);
        out.push(qText(`(x + ${b})²? Form x²+ax+b.`, [`x²+${2*b}x+${b*b}`,`x^2+${2*b}x+${b*b}`], `a²+2ab+b².`));
      }
      for (let i = 0; i < 6; i++) {
        const b = pickInt(rng, 1, 12);
        out.push(qText(`(x - ${b})²? Form x²-ax+b.`, [`x²-${2*b}x+${b*b}`,`x^2-${2*b}x+${b*b}`], `a²-2ab+b².`));
      }
      for (let i = 0; i < 6; i++) {
        const b = pickInt(rng, 1, 12);
        out.push(qText(`(x + ${b})(x - ${b})? Form x²-b.`, [`x²-${b*b}`,`x^2-${b*b}`], `Konjugat.`));
      }
      for (let i = 0; i < 4; i++) {
        const b = pickInt(rng, 1, 10);
        out.push(qText(`Faktoriser x² - ${b*b}. Form (x+a)(x-a).`, [`(x+${b})(x-${b})`,`(x-${b})(x+${b})`], `Konjugat baklengs.`));
      }
      return out;
    },

    "g10-andregrad": (rng) => {
      const out = [];
      // x² = k²
      for (let i = 0; i < 4; i++) {
        const k = pickInt(rng, 2, 12);
        out.push(qText(`Løs x² = ${k*k}. Begge løsninger atskilt med komma.`, [`${k},-${k}`,`-${k},${k}`], `±${k}.`));
      }
      // x² - kx = 0 -> 0 og k
      for (let i = 0; i < 4; i++) {
        const k = pickInt(rng, 2, 9);
        out.push(qText(`Løs x² - ${k}x = 0. Begge løsninger, komma.`, [`0,${k}`,`${k},0`], `x(x-${k})=0.`));
      }
      // (x-r1)(x-r2)=0 expanded
      for (let i = 0; i < 8; i++) {
        const r1 = pickInt(rng, 1, 8), r2 = pickInt(rng, 1, 8);
        if (r1 === r2) continue;
        const b = -(r1 + r2), c = r1 * r2;
        const sb = b >= 0 ? "+" + b : "" + b;
        const sc = c >= 0 ? "+" + c : "" + c;
        const sorted = [r1, r2].sort((a,b)=>a-b);
        out.push(qText(`Løs x² ${sb}x ${sc} = 0. Begge løsninger, komma.`, [`${r1},${r2}`,`${r2},${r1}`,`${sorted[0]},${sorted[1]}`], `Faktorisering (x-${r1})(x-${r2}).`));
      }
      return out;
    },

    "g10-likningssett": (rng) => {
      const out = [];
      for (let i = 0; i < 12; i++) {
        const x = pickInt(rng, 1, 8), y = pickInt(rng, 1, 8);
        const a = pickInt(rng, 1, 5), b = pickInt(rng, 1, 5);
        const c = pickInt(rng, 1, 5), d = pickInt(rng, 1, 5);
        const e1 = a*x + b*y, e2 = c*x + d*y;
        if (a*d - b*c === 0) continue;
        out.push(qText(`Løs: ${a}x + ${b}y = ${e1}, ${c}x + ${d}y = ${e2}. Svar (x,y).`,
          [`(${x},${y})`], `x=${x}, y=${y}.`));
      }
      return out;
    },

    "g10-trig": (rng) => {
      const out = [];
      const trips = [[3,4,5],[6,8,10],[5,12,13],[8,15,17],[9,12,15],[7,24,25]];
      trips.forEach(([a,b,c]) => {
        out.push(qText(`Rettvinklet trekant: motstående ${a}, hosliggende ${b}. tan(v) som desimaltall (3 desimaler).`,
          [String(Math.round(a/b*1000)/1000).replace(".",","),
           String(Math.round(a/b*100)/100).replace(".",",")],
          `${a}/${b}.`));
        out.push(qText(`Hypotenus ${c}, motstående ${a}. sin(v) som desimaltall.`,
          [String(Math.round(a/c*1000)/1000).replace(".",","),
           String(Math.round(a/c*100)/100).replace(".",",")],
          `${a}/${c}.`));
        out.push(qText(`Hypotenus ${c}, hosliggende ${b}. cos(v).`,
          [String(Math.round(b/c*1000)/1000).replace(".",","),
           String(Math.round(b/c*100)/100).replace(".",",")],
          `${b}/${c}.`));
      });
      out.push(qNum("Hypotenus 10, v=30°. Motstående katet? (sin30=0,5)", 5, "10·0,5."));
      out.push(qNum("Hypotenus 8, v=60°. Hosliggende katet? (cos60=0,5)", 4, "8·0,5."));
      return out;
    },

    "g10-funksjon": (rng) => {
      const out = [];
      for (let i = 0; i < 5; i++) { const a = pickInt(rng, 1, 5), b = pickInt(rng, -8, 8), x = pickInt(rng, -3, 6); out.push(qNum(`f(x)=${a}x²${b>=0?"+"+b:b}. f(${x})=?`, a*x*x+b, `${a}·${x}²${b>=0?"+"+b:b}.`)); }
      for (let i = 0; i < 5; i++) { const a = pickInt(rng, 1, 4), b = pickInt(rng, -8, 8), c = pickInt(rng, -6, 6); const x = pickInt(rng, -3, 5); out.push(qNum(`f(x)=${a}x²${b>=0?"+"+b:b}x${c>=0?"+"+c:c}. f(${x})=?`, a*x*x+b*x+c, `Sett inn.`)); }
      for (let i = 0; i < 5; i++) { const a = pickInt(rng, 1, 4), b = pickInt(rng, -8, 8); const top = -b/(2*a); if (Number.isInteger(top)) out.push(qNum(`f(x)=${a}x²${b>=0?"+"+b:b}x+1. x-koordinat til topp-/bunnpunkt?`, top, `-b/(2a).`)); }
      for (let i = 0; i < 5; i++) { const k = pickInt(rng, 2, 9) * pickInt(rng, 2, 6); const div = pickInt(rng, 2, 6); if (k % div === 0) out.push(qNum(`f(x)=${k}/x. f(${div})=?`, k/div, `${k}/${div}.`)); }
      return out;
    },

    "g10-stat": (rng) => {
      const out = [];
      function mean(a) { return a.reduce((s,v)=>s+v,0)/a.length; }
      function median(a) { const s=a.slice().sort((x,y)=>x-y); const n=s.length; return n%2?s[(n-1)/2]:(s[n/2-1]+s[n/2])/2; }
      for (let i = 0; i < 6; i++) {
        const arr = Array.from({length:5}, () => pickInt(rng, 1, 30));
        out.push(qNum(`Variasjonsbredde av ${arr.join(", ")}?`, Math.max(...arr)-Math.min(...arr), `Maks-min.`));
      }
      for (let i = 0; i < 6; i++) {
        const arr = Array.from({length:5}, () => pickInt(rng, 1, 25));
        out.push(qNum(`Median av ${arr.join(", ")}?`, median(arr), `Sorter.`));
      }
      for (let i = 0; i < 6; i++) {
        const a = Array.from({length: 4}, () => pickInt(rng, 2, 20));
        const m = mean(a);
        if (Number.isInteger(m)) out.push(qNum(`Gjennomsnitt av ${a.join(", ")}?`, m, `Sum/4.`));
      }
      return out;
    },
  };

  /* ---------- Multi-oppgaver (deloppgaver med stigende vanskegrad) ---------- */
  const qMulti = (q, parts) => ({ type: "multi", q, parts });
  const pNum = (q, a, explain, tol) => ({ type: "num", q, answer: a, explain, ...(tol!=null?{tol}:{}) });
  const pText = (q, ans, explain) => ({ type: "text", q, answer: ans, explain });

  const MULTI = {
    "g1-addisjon": [
      qMulti("Øv på pluss - tellereise.", [
        pNum("2 + 1", 3),
        pNum("4 + 3", 7),
        pNum("7 + 5", 12),
        pNum("8 + 9", 17),
      ]),
    ],
    "g1-subtraksjon": [
      qMulti("Trekk fra trinn for trinn.", [
        pNum("5 - 2", 3),
        pNum("9 - 4", 5),
        pNum("13 - 6", 7),
        pNum("18 - 9", 9),
      ]),
    ],
    "g2-pluss100": [
      qMulti("Pluss med tiere - stigende.", [
        pNum("20 + 10", 30),
        pNum("34 + 25", 59),
        pNum("47 + 38", 85, "Veksling."),
        pNum("68 + 27", 95),
      ]),
      qMulti("Minus med veksling - stigende.", [
        pNum("50 - 20", 30),
        pNum("63 - 21", 42),
        pNum("72 - 38", 34, "Veksling."),
        pNum("91 - 47", 44),
      ]),
    ],
    "g3-gange": [
      qMulti("Bygg opp gangetabellen.", [
        pNum("2 · 3", 6),
        pNum("5 · 4", 20),
        pNum("3 · 7", 21),
        pNum("9 · 5", 45),
      ]),
    ],
    "g3-divisjon": [
      qMulti("Del likt - økende.", [
        pNum("10 : 2", 5),
        pNum("18 : 3", 6),
        pNum("32 : 4", 8),
        pNum("45 : 5", 9),
      ]),
    ],
    "g3-brok": [
      qMulti("Brøkdeler av et helt tall - økende.", [
        pNum("Hva er 1/2 av 8?", 4),
        pNum("Hva er 1/4 av 16?", 4),
        pNum("Hva er 1/3 av 21?", 7),
        pNum("Hva er 1/5 av 35?", 7),
      ]),
    ],
    "g4-tabell": [
      qMulti("Mestre gangetabellen.", [
        pNum("3 · 6", 18),
        pNum("7 · 4", 28),
        pNum("6 · 8", 48),
        pNum("9 · 7", 63),
      ]),
    ],
    "g4-areal": [
      qMulti("Areal - fra enkelt til sammensatt.", [
        pNum("Areal av rektangel 5 cm · 3 cm? (cm²)", 15),
        pNum("Areal av kvadrat med side 7 cm? (cm²)", 49),
        pNum("Areal av rektangel 12 m · 8 m? (m²)", 96),
        pNum("Et rektangel er 15 cm langt og dobbelt så langt som det er bredt. Areal? (cm²)", 112.5, "B=7,5 cm.", 0.01),
      ]),
    ],
    "g4-desimal": [
      qMulti("Desimaltall - sammenlikne, summere.", [
        pText("Skriv 1/2 som desimaltall", "0,5"),
        pText("Skriv 3/10 som desimaltall", "0,3"),
        pText("Regn ut: 0,7 + 0,2", "0,9"),
        pText("Regn ut: 1,5 + 0,75", "2,25"),
      ]),
    ],
    "g5-brok": [
      qMulti("Brøkregning - økende.", [
        pText("1/4 + 2/4 (a/b)", ["3/4"]),
        pText("2/5 + 1/5", ["3/5"]),
        pText("1/2 + 1/4", ["3/4"]),
        pText("2/3 + 1/6", ["5/6"]),
      ]),
    ],
    "g5-prosent": [
      qMulti("Prosent - bygger opp.", [
        pNum("10% av 80", 8),
        pNum("25% av 80", 20),
        pNum("75% av 80", 60),
        pNum("15% av 80", 12),
      ]),
    ],
    "g6-neg": [
      qMulti("Negative tall - stigende vanskegrad.", [
        pNum("3 - 5", -2),
        pNum("-4 + 7", 3),
        pNum("-6 - 3", -9),
        pNum("5 - (-4)", 9, "Minus-minus blir pluss."),
      ]),
    ],
    "g6-bdp": [
      qMulti("Brøk - desimal - prosent.", [
        pText("Skriv 1/2 som desimaltall", "0,5"),
        pText("Skriv 1/2 som prosent (tall)", "50"),
        pText("Skriv 0,2 som prosent", "20"),
        pText("Skriv 3/4 som prosent", "75"),
      ]),
    ],
    "g6-geometri": [
      qMulti("Finn ukjent vinkel.", [
        pNum("Trekant med 90° og 60° - tredje vinkel?", 30),
        pNum("Trekant med 45° og 45° - tredje?", 90),
        pNum("Likebeint trekant med toppvinkel 40° - hver basisvinkel?", 70),
        pNum("Firkant med 90°, 100°, 80° - fjerde vinkel?", 90, "360-sum."),
      ]),
    ],
    "g7-variabel": [
      qMulti("Sette inn og trekke sammen - i fire steg.", [
        pNum("Hvis x=5: regn 2x", 10),
        pNum("Hvis x=5: regn 2x + 3", 13),
        pNum("Hvis x=5: regn 3x - 2", 13),
        pText("Trekk sammen: 4x + 2x - x (form ax)", ["5x"]),
      ]),
    ],
    "g7-likning": [
      qMulti("Likninger - bygger opp.", [
        pNum("Løs: x + 4 = 10", 6),
        pNum("Løs: 3x = 21", 7),
        pNum("Løs: 2x + 5 = 17", 6),
        pNum("Løs: 4x - 3 = 25", 7),
      ]),
    ],
    "g7-volum": [
      qMulti("Volum - flere figurer.", [
        pNum("Eske 2 · 3 · 4 cm (cm³)", 24),
        pNum("Eske 5 · 5 · 5 cm (cm³)", 125),
        pNum("Eske 10 · 4 · 6 cm (cm³)", 240),
        pNum("Hvor mange liter er 8000 cm³?", 8),
      ]),
    ],
    "g8-parentes": [
      qMulti("Parentes-trening - fra enkelt til sammensatt.", [
        pText("Multipliser ut: 2(x + 3) (form ax+b)", ["2x+6"]),
        pText("Multipliser ut: 3(2x - 4)", ["6x-12"]),
        pText("Multipliser ut: -2(x + 5)", ["-2x-10"]),
        pText("Forenkle: 3(x + 2) + 4(x - 1)", ["7x+2"], "3x+6+4x-4=7x+2."),
      ]),
    ],
    "g8-likning": [
      qMulti("Likninger - fra grunnleggende til parentes.", [
        pNum("Løs: 2x = 14", 7),
        pNum("Løs: 3x + 1 = 16", 5),
        pNum("Løs: 2(x + 3) = 16", 5, "2x+6=16."),
        pNum("Løs: 3(x - 2) = 2x + 1", 7, "3x-6=2x+1, x=7."),
      ]),
    ],
    "g8-pyth": [
      qMulti("Pythagoras i fire steg.", [
        pNum("Katetene 3 og 4 - hypotenus?", 5),
        pNum("Katetene 6 og 8 - hypotenus?", 10),
        pNum("Hypotenus 13, katet 5 - andre katet?", 12),
        pNum("Stige 5 m, foten 3 m fra veggen. Hvor høyt rekker stigen? (m)", 4, "√(25-9)=4."),
      ]),
    ],
    "g8-prosent": [
      qMulti("Prosent og vekstfaktor - økende.", [
        pNum("10% av 250", 25),
        pNum("25% av 240", 60),
        pNum("En vare på 800 kr settes ned 25%. Ny pris?", 600),
        pNum("En vare øker fra 400 til 460 kr. Prisøkning i %?", 15, "60/400=0,15."),
      ]),
    ],
    "g8-funksjon": [
      qMulti("Bruke lineær funksjon - flere ledd.", [
        pNum("y = 2x + 3. y når x=4?", 11),
        pNum("y = 3x - 5. y når x=10?", 25),
        pNum("y = -x + 12. y når x=7?", 5),
        pNum("Pris(x) = 50 + 12x kr/km. Pris for 15 km?", 230),
      ]),
    ],
    "g9-lin": [
      qMulti("Lineær funksjon - punkter, stigning, skjæring.", [
        pNum("y=2x+1. y når x=3?", 7),
        pNum("Linja gjennom (1,3) og (4,12). Stigning?", 3, "(12-3)/(4-1)."),
        pNum("y=3x-9. x-skjæring?", 3, "0=3x-9."),
        pNum("y=4x-2. y-skjæring?", -2),
      ]),
    ],
    "g9-formel": [
      qMulti("Areal og volum av sirkel/sylinder. Bruk π≈3,14.", [
        pNum("Trekant g=10, h=6. Areal?", 30),
        pNum("Sirkel r=5. Areal? (avrund)", 79, "3,14·25=78,5.", 1),
        pNum("Sirkel r=5. Omkrets?", 31, "2π·5≈31,4.", 1),
        pNum("Sylinder r=4, h=10. Volum?", 502, "π·16·10≈502.", 3),
      ]),
    ],
    "g10-kvadrat": [
      qMulti("Kvadratsetningene - økende anvendelse.", [
        pText("(x + 2)² = ? (form x²+ax+b)", ["x²+4x+4","x^2+4x+4"]),
        pText("(x - 5)² = ?", ["x²-10x+25","x^2-10x+25"]),
        pText("(x + 6)(x - 6) = ?", ["x²-36","x^2-36"]),
        pText("Faktoriser x² - 81 (form (x+a)(x-a))", ["(x+9)(x-9)","(x-9)(x+9)"]),
      ]),
    ],
    "g10-andregrad": [
      qMulti("Andregradslikning - fire metoder.", [
        pText("Løs x² = 25 (begge løsninger, komma)", ["5,-5","-5,5"]),
        pText("Løs x² - 6x = 0 (begge, komma)", ["0,6","6,0"]),
        pText("Løs x² - 7x + 12 = 0 (begge, komma)", ["3,4","4,3"]),
        pText("Løs x² + 4x - 21 = 0 (begge, komma)", ["3,-7","-7,3"], "b²-4ac=16+84=100."),
      ]),
    ],
    "g10-trig": [
      qMulti("Trigonometri - kjente trekanter.", [
        pNum("sin v = 3/5. Hva er motstående hvis hypotenus=10?", 6),
        pNum("cos v = 4/5. Hosliggende når hypotenus=15?", 12),
        pNum("tan v = 3/4. Motstående når hosliggende=8?", 6),
        pNum("Hypotenus 10, v=30° (sin30=0,5). Motstående katet?", 5),
      ]),
    ],
    "g10-funksjon": [
      qMulti("Funksjoner - innsetting og toppunkt.", [
        pNum("f(x)=x². f(4)?", 16),
        pNum("f(x)=2x² - 3. f(3)?", 15),
        pNum("f(x)=x² - 6x + 5. f(2)?", -3),
        pNum("f(x)=x² - 6x + 5. Bunnpunkt x-koordinat?", 3),
      ]),
    ],
  };

  /* ---------- Påfyll ---------- */
  if (typeof CURRICULUM === "undefined") return;
  // Først: legg på multi-oppgaver
  CURRICULUM.grades.forEach(grade => {
    grade.topics.forEach(topic => {
      const m = MULTI[topic.id];
      if (m && m.length) topic.quiz = topic.quiz.concat(m);
    });
  });
  CURRICULUM.grades.forEach(grade => {
    grade.topics.forEach(topic => {
      if (topic.quiz.length >= TARGET) return;
      const gen = EXTRA[topic.id];
      if (!gen) return;
      const rng = mulberry32(hashStr(topic.id));
      const candidates = gen(rng);
      const need = TARGET - topic.quiz.length;
      // unngå duplikater på q-tekst
      const seen = new Set(topic.quiz.map(q => q.q));
      const picked = [];
      for (const c of candidates) {
        if (picked.length >= need + 5) break; // litt slingringsmonn
        if (seen.has(c.q)) continue;
        seen.add(c.q);
        picked.push(c);
      }
      topic.quiz = topic.quiz.concat(picked.slice(0, Math.max(need, picked.length)));
    });
  });
})();
