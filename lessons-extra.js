/* lessons-extra.js
   Rik læringsstøtte per emne: symbolforklaringer, "Slik gjør du"-fremgangsmåter,
   og steg-for-steg-eksempler. Gjør at et barn kan jobbe seg gjennom emnet på egen hånd. */

(function () {
  const V = (typeof window !== "undefined" && window.MathVisuals) || null;

  // Hjelpere for å bygge eksempler
  const ex = (title, steps) => ({ title, steps });
  const stp = (text, work) => ({ text, work });
  const sym = (symbol, name, meaning, example) => ({ symbol, name, meaning, example });
  const proc = (name, steps, recipeExample) => ({ name, steps, recipeExample });

  const LESSONS = {
    /* ============================== 1. TRINN ============================== */
    "g1-tall": {
      symbols: [
        sym("0", "null", "Ingenting. Du har null bananer.", ""),
        sym("1, 2, 3", "tallene", "Brukes for å si hvor mange.", "tre epler = 3"),
        sym(">", "større enn", "Tallet til venstre er størst. Munnen åpner seg mot det største.", "7 > 4"),
        sym("<", "mindre enn", "Tallet til venstre er minst. Munnen åpner seg mot det største.", "3 < 9"),
        sym("=", "lik", "Det samme på begge sider.", "5 = 5"),
      ],
      procedures: [
        proc("Slik teller du", [
          "Si tallet 'én' når du peker på den første tingen.",
          "Si 'to' når du peker på den neste.",
          "Fortsett: tre, fire, fem ... helt til du har pekt på alle.",
          "Det siste tallet du sier, er hvor mange det er.",
        ], "5 epler: peker - én, to, tre, fire, fem. Svar: 5 epler."),
        proc("Slik finner du hvilket tall som er størst", [
          "Tenk på tallinjen: 0, 1, 2, 3 ...",
          "Tallet som kommer SIST når du teller, er størst.",
          "Tallet som kommer FØRST, er minst.",
        ], "Mellom 6 og 9: 9 kommer sist, så 9 er størst."),
      ],
      examples: [
        ex("Hvor mange stjerner: ⭐⭐⭐⭐", [
          stp("Pek på første stjerne. Si 'én'."),
          stp("Pek på neste. Si 'to'."),
          stp("Pek på neste. Si 'tre'."),
          stp("Pek på siste. Si 'fire'."),
          stp("Det er 4 stjerner.", "Svar: 4"),
        ]),
        ex("Hvilket tall kommer etter 8?", [
          stp("Tenk på rekkefølgen: 6, 7, 8, 9 ..."),
          stp("Etter 8 sier vi 9."),
          stp("Svar: 9", "Svar: 9"),
        ]),
        ex("Hvilket er størst: 5 eller 12?", [
          stp("Tell oppover: 5 ... 6, 7, 8, 9, 10, 11, 12."),
          stp("12 kom etter 5, så 12 er størst.", "12 > 5"),
        ]),
        ex("Tell bakover fra 15. Hvilket tall kommer etter 12?", [
          stp("Bakover: 15, 14, 13, 12 ..."),
          stp("Etter 12 (når vi går bakover) kommer 11.", "Svar: 11"),
        ]),
      ],
    },

    "g1-addisjon": {
      symbols: [
        sym("+", "pluss", "Legg sammen. Tegnet 'pluss' betyr at vi gjør det større.", "3 + 2 = 5"),
        sym("=", "lik", "Begge sider er like store.", "3 + 2 = 5"),
        sym("svaret", "summen", "Når du plusser, kaller vi resultatet for summen.", "Summen av 4 + 3 er 7"),
      ],
      procedures: [
        proc("Slik plusser du - 'tell videre'", [
          "Start på det største tallet.",
          "Tell så mange ganger videre som det andre tallet sier.",
          "Tallet du stopper på, er svaret.",
        ], "6 + 3: start på 6, tell tre: '7, 8, 9'. Svar: 9."),
        proc("Slik bruker du tiervennene", [
          "Hvis ett tall er nær 10, fyll opp til 10 først.",
          "Plusse det som er igjen.",
        ], "8 + 5: 8 + 2 = 10, så 10 + 3 = 13."),
      ],
      examples: [
        ex("4 + 3 = ?", [
          stp("Start på 4 (det største)."),
          stp("Tell tre videre: 5, 6, 7."),
          stp("Svaret er 7.", "4 + 3 = 7"),
        ]),
        ex("6 + 5 = ?", [
          stp("Start på 6."),
          stp("Tell fem videre: 7, 8, 9, 10, 11."),
          stp("Svaret er 11.", "6 + 5 = 11"),
        ]),
        ex("8 + 7 = ? (bruk tiervenn)", [
          stp("8 trenger 2 for å bli 10. Ta 2 fra 7."),
          stp("Nå har vi 8 + 2 = 10, og 5 igjen.", "10 + 5"),
          stp("10 + 5 = 15.", "8 + 7 = 15"),
        ]),
        ex("Lisa har 7 leker. Hun får 4 til. Hvor mange har hun nå?", [
          stp("Vi skal plusse: 7 + 4."),
          stp("Start på 7, tell fire videre: 8, 9, 10, 11."),
          stp("Lisa har 11 leker.", "Svar: 11"),
        ]),
        ex("9 + 9 = ?", [
          stp("9 trenger 1 for å bli 10."),
          stp("Ta 1 fra det andre 9: nå har vi 10 + 8."),
          stp("Svaret er 18.", "9 + 9 = 18"),
        ]),
      ],
    },

    "g1-subtraksjon": {
      symbols: [
        sym("−", "minus", "Ta bort. Tegnet 'minus' betyr at vi gjør det mindre.", "7 − 3 = 4"),
        sym("svaret", "differansen", "Når du trekker fra, kaller vi resultatet for differansen.", "Differansen mellom 7 og 3 er 4"),
      ],
      procedures: [
        proc("Slik trekker du fra - 'tell bakover'", [
          "Start på det største tallet (det du starter med).",
          "Tell så mange ganger BAKOVER som det andre tallet sier.",
          "Tallet du stopper på, er svaret.",
        ], "9 − 4: start på 9, tell fire bakover: '8, 7, 6, 5'. Svar: 5."),
        proc("Slik bruker du familien pluss/minus", [
          "Hvis du vet at 3 + 4 = 7, vet du også at 7 − 3 = 4 og 7 − 4 = 3.",
          "De tre tallene danner en 'familie'.",
        ], "Vet du 6 + 5 = 11? Da vet du 11 − 5 = 6 og 11 − 6 = 5."),
      ],
      examples: [
        ex("10 − 4 = ?", [
          stp("Start på 10."),
          stp("Tell fire bakover: 9, 8, 7, 6."),
          stp("Svaret er 6.", "10 − 4 = 6"),
        ]),
        ex("15 − 7 = ? (tankefulle steg)", [
          stp("Ta først bort 5: 15 − 5 = 10."),
          stp("Vi har trukket fra 5, men skal trekke fra 7. Igjen: 2 til."),
          stp("10 − 2 = 8.", "Svar: 8"),
        ]),
        ex("Per har 12 klinkekuler, mister 5. Hvor mange igjen?", [
          stp("Vi skal regne 12 − 5."),
          stp("12 − 2 = 10. Igjen å trekke fra: 3."),
          stp("10 − 3 = 7. Per har 7 kuler.", "Svar: 7"),
        ]),
        ex("Sjekk: hvis 4 + 6 = 10, hva er 10 − 6?", [
          stp("Familien er 4, 6, 10."),
          stp("Hvis vi tar 6 fra 10, sitter vi igjen med 4."),
          stp("10 − 6 = 4.", "Svar: 4"),
        ]),
      ],
    },

    "g1-former": {
      symbols: [
        sym("△", "trekant", "3 sider, 3 hjørner.", ""),
        sym("□", "kvadrat", "4 like lange sider, 4 like hjørner.", ""),
        sym("○", "sirkel", "Ingen hjørner, helt rund.", ""),
      ],
      procedures: [
        proc("Slik kjenner du igjen en form", [
          "Tell hjørnene (der to sider møtes).",
          "Tell sidene (de rette strekene).",
          "Hjørner og sider er alltid like mange.",
          "0 hjørner = sirkel. 3 = trekant. 4 = firkant. 5 = femkant.",
        ], "En form med 5 hjørner er en femkant."),
      ],
      examples: [
        ex("Hva slags form har et fotballmål?", [
          stp("Tell hjørnene: 4."),
          stp("Tell sidene: 4."),
          stp("Sidene er ikke alle like (to lange + to korte) - det er et rektangel.", "Svar: rektangel"),
        ]),
        ex("Hva slags form har en kake delt i 8 trekantede biter?", [
          stp("Selve kaken er rund."),
          stp("En rund form med ingen hjørner = sirkel.", "Svar: sirkel"),
        ]),
      ],
    },

    "g1-klokka": {
      symbols: [
        sym("⟶", "lang viser", "Sier hvor mange minutter inn i timen vi er. Når den peker på 12, er klokka 'hel'."),
        sym("→", "kort viser", "Sier hvilken time vi er i."),
      ],
      procedures: [
        proc("Slik leser du hele timer", [
          "Se på lang viser. Står den på 12? Da er klokka hel.",
          "Se så på kort viser. Hvilket tall peker den på?",
          "Det tallet er klokkeslettet.",
        ], "Kort viser peker på 7, lang på 12 → klokka er 7."),
      ],
      examples: [
        ex("Lang viser på 12, kort på 4. Hva er klokka?", [
          stp("Lang viser på 12 = klokka er hel."),
          stp("Kort viser på 4 = klokka er 4.", "Svar: 4"),
        ]),
        ex("Lang viser på 12, kort på 9. Hva er klokka?", [
          stp("Lang på 12 = hel time."),
          stp("Kort på 9 = klokka er 9.", "Svar: 9"),
        ]),
      ],
    },

    /* ============================== 2. TRINN ============================== */
    "g2-tall100": {
      symbols: [
        sym("T", "tiere", "Det første sifferet i et tosifret tall.", "I 47 er 4 tiere = 40"),
        sym("E", "enere", "Det siste sifferet i et tosifret tall.", "I 47 er 7 enere"),
      ],
      procedures: [
        proc("Slik finner du tiere og enere", [
          "Se på tallet. Det første sifferet er tiere.",
          "Tier-sifferet ganger 10 = hvor mye tieren er verdt.",
          "Det siste sifferet er enere - står for seg selv.",
          "Legg sammen tier-verdien og ener-verdien for å sjekke.",
        ], "63: 6 tiere = 60, 3 enere = 3. 60 + 3 = 63 ✓"),
        proc("Slik kjenner du igjen partall og oddetall", [
          "Se på det siste sifferet.",
          "Hvis det er 0, 2, 4, 6 eller 8: partall.",
          "Hvis det er 1, 3, 5, 7 eller 9: oddetall.",
        ], "48 ender på 8 → partall. 37 ender på 7 → oddetall."),
      ],
      examples: [
        ex("Hva er 5 tiere og 3 enere?", [
          stp("5 tiere = 5 · 10 = 50."),
          stp("3 enere = 3."),
          stp("50 + 3 = 53.", "Svar: 53"),
        ]),
        ex("Hvor mange tiere i 86?", [
          stp("Første siffer er 8."),
          stp("86 = 80 + 6 = 8 tiere + 6 enere.", "Svar: 8 tiere"),
        ]),
        ex("Tell i sprang av 5 fra 25. Si de fire neste.", [
          stp("Vi legger til 5 hver gang: 25 + 5 = 30."),
          stp("30 + 5 = 35."),
          stp("35 + 5 = 40."),
          stp("40 + 5 = 45.", "25, 30, 35, 40, 45"),
        ]),
      ],
    },

    "g2-pluss100": {
      symbols: [
        sym("+", "pluss", "Legge sammen."),
        sym("−", "minus", "Trekke fra."),
        sym("|", "skille tiere og enere", "Hjelpestrek i hoderegning."),
      ],
      procedures: [
        proc("Slik plusser du to tosifrede tall (uten veksling)", [
          "Plusse tierne for seg.",
          "Plusse enerne for seg.",
          "Legg sammen de to svarene.",
        ], "23 + 14: 20+10=30, 3+4=7, totalt 37."),
        proc("Slik plusser du med 'veksling' (enerne blir over 10)", [
          "Plusse tierne.",
          "Plusse enerne. Hvis enerne blir 10 eller mer, deler du i en tier og det som er igjen.",
          "Legg på den ekstra tieren.",
        ], "28 + 15: 20+10=30, 8+5=13 (1 tier + 3), totalt 30+10+3 = 43."),
        proc("Slik trekker du fra to tosifrede tall (uten veksling)", [
          "Trekk tier minus tier.",
          "Trekk ener minus ener.",
          "Legg sammen.",
        ], "56 − 23: 50−20=30, 6−3=3, totalt 33."),
      ],
      examples: [
        ex("24 + 33 = ?", [
          stp("Tiere: 20 + 30 = 50."),
          stp("Enere: 4 + 3 = 7."),
          stp("Sum: 50 + 7 = 57.", "Svar: 57"),
        ]),
        ex("45 + 28 = ? (veksling)", [
          stp("Tiere: 40 + 20 = 60."),
          stp("Enere: 5 + 8 = 13. 13 = 10 + 3."),
          stp("60 + 10 + 3 = 73.", "Svar: 73"),
        ]),
        ex("63 − 27 = ? (veksling)", [
          stp("Trekk først 20: 63 − 20 = 43."),
          stp("Så 7 til: 43 − 7. 43 − 3 = 40, 40 − 4 = 36."),
          stp("Svar: 36.", "Svar: 36"),
        ]),
      ],
    },

    "g2-penger": {
      symbols: [
        sym("kr", "kroner", "Den norske valutaenheten."),
        sym("øre", "ører", "Mindre enhet. 100 øre = 1 krone (i dag rundes ofte øre bort)."),
      ],
      procedures: [
        proc("Slik regner du ut totalpris", [
          "Plusse prisene på alle varene.",
          "Bruk vanlig pluss-teknikk.",
        ], "Bolle 18 kr + saft 12 kr = 30 kr."),
        proc("Slik finner du vekslepenger", [
          "Trekk varens pris fra det du betalte med.",
          "Det som er igjen, er det du får tilbake.",
        ], "Betaler 100 kr for vare på 65 kr: 100 − 65 = 35 kr tilbake."),
      ],
      examples: [
        ex("Brus 15 kr og sjokolade 22 kr. Total?", [
          stp("15 + 22 = ?"),
          stp("Tiere: 10 + 20 = 30. Enere: 5 + 2 = 7."),
          stp("30 + 7 = 37 kr.", "Svar: 37 kr"),
        ]),
        ex("Bok koster 48 kr. Du betaler med 100 kr. Hvor mye tilbake?", [
          stp("100 − 48 = ?"),
          stp("100 − 40 = 60. 60 − 8 = 52."),
          stp("Du får 52 kr tilbake.", "Svar: 52 kr"),
        ]),
      ],
    },

    "g2-halv": {
      symbols: [
        sym("halv X", "halv X", "Klokka er på vei mot X, halvveis fra forrige hele time."),
        sym("kvart over X", "kvart over X", "15 minutter etter X."),
        sym("kvart på X", "kvart på X", "15 minutter før X."),
      ],
      procedures: [
        proc("Slik leser du halve timer", [
          "Se på lang viser. Står den på 6? Da er klokka halv.",
          "Se på kort viser. Den står midt mellom to tall.",
          "Klokka heter 'halv [det neste tallet]'.",
        ], "Lang på 6, kort mellom 7 og 8 → klokka er halv 8."),
        proc("Slik leser du kvarter", [
          "Lang på 3 = kvart over. Klokka er 'kvart over [hvor kort viser er]'.",
          "Lang på 9 = kvart på. Klokka er 'kvart på [neste tall]'.",
        ], "Lang på 9, kort like før 5 → kvart på 5."),
      ],
      examples: [
        ex("Lang på 6, kort midt mellom 3 og 4. Klokka?", [
          stp("Lang på 6 = halv."),
          stp("Kort er på vei fra 3 til 4. Klokka går mot 4."),
          stp("Svar: halv 4 (det vil si 3:30).", "Svar: halv 4"),
        ]),
        ex("Lang på 3, kort like etter 7. Klokka?", [
          stp("Lang på 3 = kvart over."),
          stp("Kort har akkurat passert 7."),
          stp("Svar: kvart over 7 (det vil si 7:15).", "Svar: kvart over 7"),
        ]),
        ex("Lang på 9, kort like før 10. Klokka?", [
          stp("Lang på 9 = kvart på."),
          stp("Kort nesten på 10. Klokka er 15 minutter før 10."),
          stp("Svar: kvart på 10 (9:45).", "Svar: kvart på 10"),
        ]),
      ],
    },

    /* ============================== 3. TRINN ============================== */
    "g3-gange": {
      symbols: [
        sym("·", "gange", "Multiplikasjonstegn. Skrives også som × eller *.", "3 · 4 = 12"),
        sym("svaret", "produktet", "Resultatet av en multiplikasjon.", "Produktet av 3 og 4 er 12"),
      ],
      procedures: [
        proc("Slik tenker du på multiplikasjon", [
          "a · b betyr 'a grupper med b i hver'.",
          "Eller: b lagt sammen a ganger.",
          "Bytteregelen: a · b = b · a (samme svar uansett rekkefølge).",
        ], "3 · 4 = 4 + 4 + 4 = 12. Eller 3 + 3 + 3 + 3 = 12."),
        proc("Slik bruker du 5-gangen smart", [
          "Tallet du ganger med 5: tenk halvparten av tallet ganger 10.",
          "Hvis tallet er odde, blir svaret 'halvparten · 10 + 5'.",
        ], "8 · 5 = (8:2) · 10 = 40. Eller: 7 · 5 = 3,5 · 10 = 35."),
      ],
      examples: [
        ex("3 · 4 = ?", [
          stp("3 grupper med 4 i hver."),
          stp("4 + 4 + 4 = 12.", "Svar: 12"),
        ]),
        ex("5 · 6 = ?", [
          stp("5-gangen: 5, 10, 15, 20, 25, 30."),
          stp("Det sjette tallet er 30.", "Svar: 30"),
        ]),
        ex("4 poser med 5 kuler i hver. Hvor mange totalt?", [
          stp("4 · 5."),
          stp("Tell i sprang av 5: 5, 10, 15, 20.", "Svar: 20 kuler"),
        ]),
        ex("2 · 9 - bruk bytteregelen", [
          stp("2 · 9 = 9 · 2 (samme svar)."),
          stp("9 · 2 = 9 + 9 = 18.", "Svar: 18"),
        ]),
      ],
    },

    "g3-divisjon": {
      symbols: [
        sym(":", "delt på", "Divisjonstegn. Skrives også som ÷ eller /.", "12 : 3 = 4"),
        sym("svaret", "kvotienten", "Resultatet av en divisjon."),
      ],
      procedures: [
        proc("Slik finner du svaret på en divisjon", [
          "Tenk: hvor mange ganger går nederste tall opp i øverste?",
          "Eller: bruk gangetabellen baklengs. Hvis 3 · ? = 12, så er ? = 4.",
        ], "20 : 5: hvor mange 5-ere er det i 20? Fire. Svar: 4."),
        proc("Slik deler du likt mellom flere", [
          "Antall ting = øverste tall.",
          "Antall personer = nederste tall.",
          "Del antall ting på antall personer.",
        ], "18 godterier på 3 barn: 18 : 3 = 6 godterier per barn."),
      ],
      examples: [
        ex("15 : 5 = ?", [
          stp("Hvor mange 5-ere er det i 15?"),
          stp("5, 10, 15 - det er tre 5-ere."),
          stp("Sjekk: 5 · 3 = 15 ✓", "Svar: 3"),
        ]),
        ex("18 godterier deles likt på 2 barn", [
          stp("Vi deler: 18 : 2."),
          stp("Halvparten av 18 er 9."),
          stp("Hver får 9 godterier.", "Svar: 9"),
        ]),
        ex("24 : 4 = ?", [
          stp("Bruk gangetabellen: 4 · ? = 24."),
          stp("4 · 6 = 24, så ? = 6.", "Svar: 6"),
        ]),
      ],
    },

    "g3-brok": {
      symbols: [
        sym("a/b", "brøk", "a er telleren (hvor mange biter du tar), b er nevneren (hvor mange like deler det er totalt)."),
        sym("1/2", "halv", "En av to like deler."),
        sym("1/4", "fjerdedel/kvart", "En av fire like deler."),
        sym("3/4", "tre fjerdedeler", "Tre av fire like deler."),
      ],
      procedures: [
        proc("Slik finner du en brøkdel av et tall", [
          "Del tallet på nevneren (det nederste).",
          "Gang med telleren (det øverste).",
        ], "3/4 av 20: 20 : 4 = 5, så 5 · 3 = 15. Svar: 15."),
        proc("Slik leser du en brøk", [
          "Det nederste tallet sier hvor mange like deler det hele er delt i.",
          "Det øverste tallet sier hvor mange av delene du har tatt.",
        ], "5/8: en hel er delt i 8 like biter, og du har 5 av dem."),
      ],
      examples: [
        ex("Hva er 1/2 av 20?", [
          stp("Del på 2: 20 : 2 = 10."),
          stp("Halvparten av 20 er 10.", "Svar: 10"),
        ]),
        ex("Hva er 1/4 av 16?", [
          stp("Del på 4: 16 : 4 = 4."),
          stp("Fjerdedel av 16 er 4.", "Svar: 4"),
        ]),
        ex("Hva er 3/4 av 20?", [
          stp("Del på 4: 20 : 4 = 5."),
          stp("Gang med 3: 5 · 3 = 15.", "Svar: 15"),
        ]),
        ex("Hvilken er størst: 1/3 eller 1/4?", [
          stp("Tenk pizza: deler du i 3, blir bitene store. Deler du i 4, blir bitene mindre."),
          stp("1/3 er størst når begge har teller 1.", "1/3 > 1/4"),
        ]),
      ],
    },

    "g3-maling": {
      symbols: [
        sym("cm", "centimeter", "Kort enhet for lengde. 100 cm = 1 m."),
        sym("m", "meter", "Grunnenhet for lengde. 1 m = 100 cm."),
        sym("km", "kilometer", "Lang enhet. 1 km = 1000 m."),
        sym("g", "gram", "Liten enhet for vekt. 1000 g = 1 kg."),
        sym("kg", "kilogram", "Vanlig enhet for vekt."),
      ],
      procedures: [
        proc("Slik gjør du om mellom cm og m", [
          "Fra meter til centimeter: gang med 100.",
          "Fra centimeter til meter: del på 100.",
        ], "3 m = 3 · 100 = 300 cm. 500 cm = 500 : 100 = 5 m."),
        proc("Slik gjør du om mellom g og kg", [
          "Fra kg til g: gang med 1000.",
          "Fra g til kg: del på 1000.",
        ], "2 kg = 2 · 1000 = 2000 g. 4000 g = 4 kg."),
      ],
      examples: [
        ex("Hvor mange cm er 4 meter?", [
          stp("1 m = 100 cm."),
          stp("4 m = 4 · 100 = 400 cm.", "Svar: 400 cm"),
        ]),
        ex("Hvor mange kg er 3000 gram?", [
          stp("1000 g = 1 kg."),
          stp("3000 g = 3000 : 1000 = 3 kg.", "Svar: 3 kg"),
        ]),
      ],
    },

    /* ============================== 4. TRINN ============================== */
    "g4-tabell": {
      symbols: [
        sym("·", "gange", "Multiplikasjon."),
        sym("²", "kvadrat", "Tallet ganget med seg selv. 5² = 5 · 5 = 25."),
      ],
      procedures: [
        proc("Slik lærer du en ny rad i gangetabellen", [
          "Tell i sprang: for 6-gangen telle 6, 12, 18, 24, 30, 36, 42, 48, 54, 60.",
          "Si rekka høyt flere ganger.",
          "Test deg selv baklengs: 'hva er 6 · 7?'",
          "Bruk det du allerede kan: 6 · 7 = 6 · 6 + 6 = 36 + 6 = 42.",
        ], "8 · 9: vet du 8 · 10 = 80? Trekk 8: 80 - 8 = 72."),
        proc("9-gangen-fingertrikset", [
          "Hold opp ti fingre.",
          "For 9 · N, bøy ned den N-te fingeren fra venstre.",
          "Fingrene til venstre for den bøyde = tiere.",
          "Fingrene til høyre = enere.",
        ], "9 · 4: bøy 4. finger. Til venstre: 3 fingre (30). Til høyre: 6 fingre (6). Svar: 36."),
      ],
      examples: [
        ex("7 · 8 = ?", [
          stp("Hvis du ikke husker direkte: 7 · 8 = 7 · 7 + 7."),
          stp("7 · 7 = 49. 49 + 7 = 56.", "Svar: 56"),
        ]),
        ex("6 · 9 = ?", [
          stp("Bruk fingertrikset: bøy 6. finger fra venstre."),
          stp("Til venstre: 5 fingre = 50. Til høyre: 4 fingre = 4."),
          stp("Svar: 54.", "Svar: 54"),
        ]),
        ex("9 · 9 = ?", [
          stp("Bøy 9. finger fra venstre."),
          stp("Til venstre: 8 fingre = 80. Til høyre: 1 finger = 1."),
          stp("80 + 1 = 81.", "Svar: 81"),
        ]),
      ],
    },

    "g4-divisjon": {
      symbols: [
        sym("rest", "rest", "Det som blir til overs når divisjonen ikke 'går opp'."),
      ],
      procedures: [
        proc("Slik deler du med rest", [
          "Finn det største tallet fra gangetabellen som er mindre eller likt det du skal dele.",
          "Det tallet : divisor = kvotient.",
          "Trekk: opprinnelig tall - (kvotient · divisor) = rest.",
        ], "17 : 5. Største 5-er som er ≤17 er 15 (5·3). Rest: 17 − 15 = 2. Svar: 3, rest 2."),
      ],
      examples: [
        ex("23 : 4 = ?, rest = ?", [
          stp("Største 4-er som er ≤23: 4 · 5 = 20."),
          stp("23 − 20 = 3. Svar: 5, rest 3."),
        ]),
        ex("31 : 7 = ?, rest = ?", [
          stp("7 · 4 = 28, og 7 · 5 = 35 (for stort). Bruk 28."),
          stp("31 − 28 = 3. Svar: 4, rest 3."),
        ]),
        ex("56 : 8 = ?", [
          stp("8 · 7 = 56 - det går opp!"),
          stp("Svar: 7, rest 0."),
        ]),
      ],
    },

    "g4-areal": {
      symbols: [
        sym("cm²", "kvadratcentimeter", "Enhet for areal. En liten rute som er 1 cm × 1 cm."),
        sym("m²", "kvadratmeter", "Større areal-enhet."),
        sym("O", "omkrets", "Hele veien rundt en figur."),
        sym("A", "areal", "Hvor mye plass figuren dekker."),
      ],
      procedures: [
        proc("Slik finner du omkrets", [
          "Legg sammen alle sidene i figuren.",
          "Bruk samme måle-enhet for alle.",
        ], "Rektangel 5 cm + 3 cm + 5 cm + 3 cm = 16 cm."),
        proc("Slik finner du areal av et rektangel", [
          "Gang lengde · bredde.",
          "Husk: svaret er i kvadratenheter (cm², m², ...).",
        ], "5 cm · 3 cm = 15 cm²."),
      ],
      examples: [
        ex("Rektangel 6 cm langt, 4 cm bredt. Omkrets?", [
          stp("Sider: 6 + 4 + 6 + 4."),
          stp("Sum: 20 cm.", "Svar: 20 cm"),
        ]),
        ex("Samme rektangel: areal?", [
          stp("Areal = lengde · bredde."),
          stp("6 · 4 = 24 cm².", "Svar: 24 cm²"),
        ]),
        ex("Kvadrat med side 7 cm. Areal?", [
          stp("Kvadrat: alle sider like."),
          stp("7 · 7 = 49 cm².", "Svar: 49 cm²"),
        ]),
      ],
    },

    "g4-desimal": {
      symbols: [
        sym(",", "desimaltegn (komma)", "Skiller hele tall fra deler. 3,5 = 3 og en halv."),
        sym("0,1", "en tidel", "1/10. Ett av ti like deler."),
        sym("0,01", "en hundredel", "1/100. Ett av hundre like deler."),
      ],
      procedures: [
        proc("Slik leser du et desimaltall", [
          "Les hele tall til venstre for komma som vanlig.",
          "Si 'komma'.",
          "Les sifrene til høyre ett for ett.",
        ], "3,14 = 'tre komma en fire'."),
        proc("Slik plusser du desimaltall", [
          "Sett opp tallene over hverandre, slik at kommaene står rett under hverandre.",
          "Plusse som vanlig fra høyre mot venstre.",
          "Sett komma rett ned i svaret.",
        ], "2,5 + 1,3: 5+3=8 (etter komma), 2+1=3 (før komma). Svar: 3,8."),
      ],
      examples: [
        ex("Hva er 0,5 som brøk?", [
          stp("0,5 = 5 tideler."),
          stp("5/10 = 1/2 (halv).", "Svar: 1/2"),
        ]),
        ex("12,50 kr + 7,50 kr = ?", [
          stp("Kronene: 12 + 7 = 19."),
          stp("Ørene: 50 + 50 = 100 øre = 1 kr."),
          stp("19 + 1 = 20 kr.", "Svar: 20 kr"),
        ]),
        ex("Hva er størst: 0,5 eller 0,45?", [
          stp("0,5 = 0,50. Sammenlign 0,50 og 0,45."),
          stp("50 > 45, så 0,5 er størst.", "0,5 > 0,45"),
        ]),
      ],
    },

    /* ============================== 5. TRINN ============================== */
    "g5-brok": {
      symbols: [
        sym("a/b", "brøk", "Telleren over, nevneren under."),
        sym("teller", "teller", "Det øverste tallet i brøken."),
        sym("nevner", "nevner", "Det nederste tallet i brøken."),
      ],
      procedures: [
        proc("Slik plusser du brøker med samme nevner", [
          "Behold nevneren.",
          "Plusse tellerne.",
        ], "2/5 + 1/5 = 3/5."),
        proc("Slik plusser du brøker med ulike nevnere", [
          "Finn en fellesnevner (et tall begge nevnerne går opp i).",
          "Utvid hver brøk så de får denne nevneren (gang teller og nevner med samme tall).",
          "Plusse tellerne.",
        ], "1/2 + 1/4: gjør 1/2 om til 2/4. 2/4 + 1/4 = 3/4."),
      ],
      examples: [
        ex("3/8 + 2/8 = ?", [
          stp("Samme nevner (8). Behold den."),
          stp("Plusse tellere: 3 + 2 = 5.", "Svar: 5/8"),
        ]),
        ex("1/3 + 1/6 = ?", [
          stp("Fellesnevner: 6."),
          stp("1/3 = 2/6 (gang teller og nevner med 2)."),
          stp("2/6 + 1/6 = 3/6 = 1/2.", "Svar: 1/2"),
        ]),
        ex("Hvilken er størst: 1/2 eller 1/3?", [
          stp("Når telleren er 1, er den med MINST nevner størst."),
          stp("1/2 har nevner 2, 1/3 har nevner 3."),
          stp("1/2 er størst.", "1/2 > 1/3"),
        ]),
      ],
    },

    "g5-prosent": {
      symbols: [
        sym("%", "prosent", "Betyr 'per hundre'. 25 % = 25 av 100 = 25/100."),
      ],
      procedures: [
        proc("Slik finner du X % av et tall", [
          "Lett mengde: 10 % = del på 10. 25 % = del på 4. 50 % = halvparten. 1 % = del på 100.",
          "Generelt: gang tallet med X og del på 100.",
        ], "15 % av 80: (80 · 15)/100 = 1200/100 = 12."),
      ],
      examples: [
        ex("10 % av 200 = ?", [
          stp("10 % er en tidel."),
          stp("200 : 10 = 20.", "Svar: 20"),
        ]),
        ex("25 % av 120 = ?", [
          stp("25 % er en fjerdedel."),
          stp("120 : 4 = 30.", "Svar: 30"),
        ]),
        ex("50 % av 64 = ?", [
          stp("50 % er halvparten."),
          stp("64 : 2 = 32.", "Svar: 32"),
        ]),
        ex("15 % av 80 = ?", [
          stp("Bruk 10 % + 5 %."),
          stp("10 % av 80 = 8. 5 % er halvparten av det = 4."),
          stp("8 + 4 = 12.", "Svar: 12"),
        ]),
      ],
    },

    /* ============================== 6. TRINN ============================== */
    "g6-neg": {
      symbols: [
        sym("−5", "minus fem", "Et tall fem under null."),
        sym("−(−x)", "minus minus", "To minustegn rett etter hverandre blir pluss."),
      ],
      procedures: [
        proc("Slik plusser du med negative tall", [
          "Tenk på en tallinje: pluss = gå til høyre, minus = gå til venstre.",
          "−3 + 5: start på −3, gå 5 til høyre. Lander på 2.",
          "Pluss et negativt tall = trekk fra: 7 + (−3) = 7 − 3 = 4.",
        ], "−8 + 10: start på −8, gå 10 til høyre → 2."),
        proc("Slik trekker du fra et negativt tall", [
          "Minus minus = pluss.",
          "5 − (−3) = 5 + 3 = 8.",
        ], "10 − (−4) = 10 + 4 = 14."),
      ],
      examples: [
        ex("−3 + 7 = ?", [
          stp("Start på −3."),
          stp("Gå 7 til høyre: −2, −1, 0, 1, 2, 3, 4."),
          stp("Lander på 4.", "Svar: 4"),
        ]),
        ex("5 − 8 = ?", [
          stp("Start på 5."),
          stp("Gå 8 til venstre: 4, 3, 2, 1, 0, −1, −2, −3."),
          stp("Lander på −3.", "Svar: −3"),
        ]),
        ex("−8 + 12 (det er −8 °C, blir 12 grader varmere)", [
          stp("Start på −8. Plusse 12."),
          stp("−8 + 8 = 0, så 0 + 4 = 4."),
          stp("Ny temperatur: 4 °C.", "Svar: 4"),
        ]),
        ex("5 − (−3) = ?", [
          stp("Minus minus blir pluss: 5 + 3."),
          stp("Svar: 8.", "Svar: 8"),
        ]),
      ],
    },

    /* ============================== 7. TRINN ============================== */
    "g7-variabel": {
      symbols: [
        sym("x, a, t", "variabel", "Bokstav som står for et tall vi ikke vet enda, eller som kan variere."),
        sym("2x", "to ganger x", "Vi sløyfer gangetegnet mellom tall og bokstav."),
        sym("x²", "x i andre", "x ganger seg selv."),
        sym("ledd", "ledd", "Hver del i et uttrykk som er skilt med + eller −. I 3x + 5 er 3x og 5 ledd."),
        sym("koeffisient", "koeffisient", "Tallet foran en variabel. I 7x er 7 koeffisienten."),
      ],
      procedures: [
        proc("Slik setter du inn en verdi i et uttrykk", [
          "Erstatt variabelen med tallet i en parentes.",
          "Regn ut.",
        ], "Hvis x = 4 og uttrykket er 3x + 2: 3 · (4) + 2 = 12 + 2 = 14."),
        proc("Slik trekker du sammen like ledd", [
          "Like ledd har samme variabel-del (samme bokstav, samme grad).",
          "Plusse/trekke koeffisientene.",
          "Behold variabelen.",
        ], "3x + 5x = 8x. Men 3x + 5y kan ikke forenkles."),
      ],
      examples: [
        ex("Hvis x = 5, hva er 3x + 4?", [
          stp("Sett inn: 3 · 5 + 4."),
          stp("3 · 5 = 15."),
          stp("15 + 4 = 19.", "Svar: 19"),
        ]),
        ex("Trekk sammen: 4x + 7 − 2x − 3", [
          stp("Like ledd med x: 4x − 2x = 2x."),
          stp("Like ledd uten x: 7 − 3 = 4."),
          stp("Svar: 2x + 4.", "Svar: 2x + 4"),
        ]),
        ex("Hvis a = 3, b = 2: regn 4a + 5b", [
          stp("4 · 3 + 5 · 2."),
          stp("12 + 10 = 22.", "Svar: 22"),
        ]),
      ],
    },

    "g7-likning": {
      symbols: [
        sym("=", "lik", "Det som står på begge sider av likhetstegnet er det samme."),
        sym("x", "ukjent", "Tallet vi prøver å finne."),
      ],
      procedures: [
        proc("Slik løser du en likning steg for steg", [
          "Tenk på likningen som en vekt: høyre = venstre.",
          "Det du gjør på en side, må du gjøre på den andre.",
          "Mål: få x alene på en side.",
          "Plusse/trekke fra først, gang/dele til slutt.",
        ], "2x + 3 = 11. Trekk 3: 2x = 8. Del på 2: x = 4."),
      ],
      examples: [
        ex("Løs: x + 8 = 15", [
          stp("Trekk 8 fra begge sider."),
          stp("x + 8 − 8 = 15 − 8."),
          stp("x = 7.", "Svar: x = 7"),
        ]),
        ex("Løs: 4x = 32", [
          stp("Del begge sider på 4."),
          stp("4x : 4 = 32 : 4."),
          stp("x = 8.", "Svar: x = 8"),
        ]),
        ex("Løs: 2x + 3 = 17", [
          stp("Trekk 3 fra begge sider: 2x = 14."),
          stp("Del på 2: x = 7."),
          stp("Sjekk: 2 · 7 + 3 = 17 ✓", "Svar: x = 7"),
        ]),
        ex("Løs: 5x − 6 = 19", [
          stp("Legg til 6 på begge sider: 5x = 25."),
          stp("Del på 5: x = 5.", "Svar: x = 5"),
        ]),
      ],
    },

    /* ============================== 8. TRINN ============================== */
    "g8-parentes": {
      symbols: [
        sym("a(b+c)", "a ganget med parentesen", "a multipliseres med ALT inni."),
        sym("faktorisere", "sette utenfor", "Trekke ut en felles faktor.", "6x + 9 = 3(2x + 3)"),
      ],
      procedures: [
        proc("Slik multipliserer du ut en parentes", [
          "Gang tallet utenfor med hvert ledd inni.",
          "Pass på fortegn: minus utenfor snur fortegn på alle ledd inni.",
        ], "3(2x − 5) = 6x − 15. −2(x + 4) = −2x − 8."),
        proc("Slik faktoriserer du", [
          "Finn det største tallet som går opp i alle ledd.",
          "Sett det utenfor parentesen.",
          "Inni parentesen: del hvert ledd på det du satte utenfor.",
        ], "12x + 18 = 6(2x + 3) (6 er felles)."),
      ],
      examples: [
        ex("Multipliser ut: 4(x + 3)", [
          stp("4 · x = 4x."),
          stp("4 · 3 = 12."),
          stp("Svar: 4x + 12.", "Svar: 4x + 12"),
        ]),
        ex("Multipliser ut: −2(x − 5)", [
          stp("−2 · x = −2x."),
          stp("−2 · (−5) = +10 (minus·minus=pluss)."),
          stp("Svar: −2x + 10.", "Svar: −2x + 10"),
        ]),
        ex("Faktoriser: 8x + 12", [
          stp("Felles faktor i 8 og 12: 4."),
          stp("8x : 4 = 2x. 12 : 4 = 3."),
          stp("Svar: 4(2x + 3).", "Svar: 4(2x + 3)"),
        ]),
      ],
    },

    "g8-pyth": {
      symbols: [
        sym("a, b", "kateter", "De to korteste sidene i en rettvinklet trekant."),
        sym("c", "hypotenusen", "Den lengste siden, motsatt rett vinkel."),
        sym("²", "i andre", "Tallet ganget med seg selv. 5² = 25."),
        sym("√", "kvadratrot", "Det motsatte av '²'. √25 = 5."),
      ],
      procedures: [
        proc("Slik finner du hypotenusen", [
          "Skriv opp formelen: a² + b² = c².",
          "Sett inn katetene.",
          "Regn ut a² og b² hver for seg, legg sammen.",
          "Ta kvadratrota.",
        ], "a=3, b=4: 9 + 16 = 25. √25 = 5. Hypotenus = 5."),
        proc("Slik finner du en katet når hypotenusen er kjent", [
          "Bytt om formelen: a² = c² − b².",
          "Regn ut c² − b².",
          "Ta kvadratrota.",
        ], "c=13, b=5: a² = 169 − 25 = 144. √144 = 12."),
      ],
      examples: [
        ex("Katetene er 6 og 8. Hva er hypotenusen?", [
          stp("6² + 8² = c²."),
          stp("36 + 64 = 100."),
          stp("c = √100 = 10.", "Svar: 10"),
        ]),
        ex("Hypotenus 17, katet 8. Den andre kateten?", [
          stp("a² = 17² − 8² = 289 − 64."),
          stp("a² = 225."),
          stp("a = √225 = 15.", "Svar: 15"),
        ]),
        ex("Stige 5 m, foten 3 m fra veggen. Hvor høyt opp på veggen?", [
          stp("Stigen er hypotenus, foten er en katet."),
          stp("h² = 5² − 3² = 25 − 9 = 16."),
          stp("h = √16 = 4 m.", "Svar: 4 m"),
        ]),
      ],
    },

    "g8-prosent": {
      symbols: [
        sym("vekstfaktor", "vekstfaktor", "Tallet du ganger med for å øke/redusere. 20 % økning = gang med 1,20. 30 % nedgang = gang med 0,70."),
      ],
      procedures: [
        proc("Tre standard prosenttyper", [
          "Type 1 - finne X % av Y: regn (Y · X) / 100.",
          "Type 2 - hvor mange % er X av Y: regn (X / Y) · 100.",
          "Type 3 - X er P % av hva: regn X / (P/100).",
        ], "Type 1: 15 % av 240 = (240·15)/100 = 36."),
        proc("Slik bruker du vekstfaktor", [
          "Økning på P %: gang med (1 + P/100).",
          "Reduksjon på P %: gang med (1 − P/100).",
        ], "800 kr - 25 %: 800 · 0,75 = 600 kr."),
      ],
      examples: [
        ex("18 % av 250", [
          stp("(250 · 18) / 100 = 4500 / 100."),
          stp("Svar: 45.", "Svar: 45"),
        ]),
        ex("En vare på 1200 kr settes ned 25 %. Ny pris?", [
          stp("Vekstfaktor: 1 − 0,25 = 0,75."),
          stp("1200 · 0,75 = 900 kr.", "Svar: 900 kr"),
        ]),
        ex("Hvor mange % er 21 av 70?", [
          stp("21 / 70 = 0,30."),
          stp("0,30 · 100 = 30 %.", "Svar: 30 %"),
        ]),
        ex("45 er 15 % av et tall. Hvilket?", [
          stp("45 / (15/100) = 45 / 0,15 = 300.", "Svar: 300"),
        ]),
      ],
    },
  };

  if (typeof CURRICULUM === "undefined") return;
  CURRICULUM.grades.forEach(g => g.topics.forEach(t => {
    const e = LESSONS[t.id];
    if (!e) return;
    t.lessons = e;
  }));
})();
