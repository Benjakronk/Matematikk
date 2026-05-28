/* Matematikk 1.-10. trinn - læreplaninnhold (LK20-baserte hovedområder).
   Hver topic har sections (teori+eksempler) og quiz (oppgaver).
   quiz-typer: "mc" (flervalg, answer=indeks), "num" (tallsvar, answer=tall, evt tol=toleranse), "text" (tekstsvar, answer=streng eller [strenger]). */

const F = (s) => `<span class="formula">${s}</span>`;
const B = (s) => `<div class="block-formula">${s}</div>`;

const CURRICULUM = {
  grades: [
    /* ============================== 1. TRINN ============================== */
    {
      id: 1, name: "1. trinn", tagline: "Telle, kjenne igjen tall, addere og subtrahere innen 20, former og klokka",
      topics: [
        {
          id: "g1-tall",
          title: "Tall og telling 0-20",
          summary: "Lære tallene, telle framover og bakover, og forstå hvor mye et tall er.",
          sections: [
            { heading: "Hva er et tall?",
              html: `<p>Et <b>tall</b> forteller hvor mange det er av noe. Når vi teller eplene i en kurv og finner ut at det er 5, er <i>5</i> tallet som beskriver mengden.</p>
                     <p>Tallsymbolene vi bruker er: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9. Med disse ti symbolene kan vi skrive alle tall.</p>` },
            { heading: "Telle framover",
              html: `<p>Når vi teller framover legger vi til 1 hver gang: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, <b>10</b>, 11, 12, 13, 14, 15, 16, 17, 18, 19, <b>20</b>.</p>
                     <p>Vi sier også 10 som <i>ti</i> og 20 som <i>tjue</i>. Tallene mellom 10 og 20 heter elleve, tolv, tretten, fjorten, femten, seksten, sytten, atten, nitten.</p>` },
            { heading: "Telle bakover",
              html: `<p>Vi kan telle bakover ved å trekke fra 1 hver gang: 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0.</p>
                     <p>Dette er nyttig for nedtelling, for eksempel før et rakettoppskytning: <i>tre, to, en, null - oppskyting!</i></p>` },
            { heading: "Sammenligne tall",
              html: `<p>Et tall er <b>større</b> enn et annet hvis det kommer senere når vi teller. Vi skriver <code>&gt;</code> for større enn og <code>&lt;</code> for mindre enn.</p>
                     <div class="example"><span class="label">Eksempel</span>
                       <p>7 er større enn 4 fordi 7 kommer etter 4 når vi teller. Vi skriver ${F("7 &gt; 4")}.</p>
                       <p>3 er mindre enn 9. Vi skriver ${F("3 &lt; 9")}.</p>
                     </div>` },
          ],
          quiz: [
            { type: "mc", q: "Hvilket tall kommer etter 7?", options: ["6","8","9","10"], answer: 1, explain: "Når vi teller: 5, 6, 7, 8 ... så kommer 8 rett etter 7." },
            { type: "mc", q: "Hvilket tall er størst?", options: ["12","9","15","11"], answer: 2, explain: "15 kommer sist når vi teller, og er derfor størst." },
            { type: "num", q: "Hvor mange er det: ⭐⭐⭐⭐⭐⭐ ?", answer: 6, explain: "Vi teller stjernene: 1, 2, 3, 4, 5, 6." },
            { type: "mc", q: "Hva kommer rett før 10?", options: ["11","8","9","12"], answer: 2, explain: "Vi teller bakover: 11, 10, 9. Så 9 kommer rett før 10." },
            { type: "num", q: "Telle bakover fra 20. Hvilket tall kommer etter 17?", answer: 16, explain: "Bakover: 20, 19, 18, 17, 16." },
          ]
        },
        {
          id: "g1-addisjon",
          title: "Pluss innen 20",
          summary: "Legge sammen tall ved hjelp av telling, fingre og tellestrek.",
          sections: [
            { heading: "Hva betyr +?",
              html: `<p>Tegnet <b>+</b> kalles <i>pluss</i> og betyr at vi legger sammen. ${F("3 + 2")} betyr at vi har 3 og legger til 2.</p>
                     <p>Svaret kalles <b>summen</b>. ${F("3 + 2 = 5")}.</p>` },
            { heading: "Legg sammen ved å telle videre",
              html: `<p>Når vi skal regne ${F("4 + 3")} kan vi starte på 4 og telle 3 ganger videre: 5, 6, 7. Svaret er 7.</p>
                     <div class="example"><span class="label">Eksempel</span>
                       <p>${F("6 + 5")}: start på 6, tell 5 hopp - 7, 8, 9, 10, 11. Svar: <b>11</b>.</p>
                     </div>` },
            { heading: "Tiervennene",
              html: `<p>Talparene som blir 10 til sammen er svært nyttige å huske:</p>
                     <ul><li>1 + 9 = 10</li><li>2 + 8 = 10</li><li>3 + 7 = 10</li><li>4 + 6 = 10</li><li>5 + 5 = 10</li></ul>
                     <p>Disse kalles <b>tiervennene</b>.</p>` },
            { heading: "Bytteregelen",
              html: `<p>Det spiller ingen rolle hvilken rekkefølge vi legger sammen tallene i. ${F("3 + 4 = 4 + 3 = 7")}. Det er ofte lettere å starte på det største tallet.</p>` },
          ],
          quiz: [
            { type: "num", q: "Regn ut: 5 + 4", answer: 9, explain: "Start på 5, tell 4 videre: 6, 7, 8, 9." },
            { type: "num", q: "Regn ut: 8 + 6", answer: 14, explain: "8 + 6. Vi kan dele 6 i 2 + 4: 8 + 2 = 10, 10 + 4 = 14." },
            { type: "mc", q: "Hva er tiervennen til 7?", options: ["2","3","4","5"], answer: 1, explain: "7 + 3 = 10, så tiervennen til 7 er 3." },
            { type: "num", q: "Lisa har 6 epler. Hun får 5 til. Hvor mange epler har hun nå?", answer: 11, explain: "6 + 5 = 11 epler." },
            { type: "num", q: "Regn ut: 9 + 9", answer: 18, explain: "9 + 9 = 18. Tips: 9 + 1 = 10, så 9 + 9 = 10 + 8 = 18." },
          ]
        },
        {
          id: "g1-subtraksjon",
          title: "Minus innen 20",
          summary: "Trekke fra ved å telle bakover eller bruke tiervenner.",
          sections: [
            { heading: "Hva betyr -?",
              html: `<p>Tegnet <b>-</b> kalles <i>minus</i> og betyr at vi tar bort. ${F("7 - 3")} betyr at vi starter med 7 og tar bort 3. Svaret kalles <b>differansen</b>.</p>` },
            { heading: "Tell bakover",
              html: `<p>Regn ${F("9 - 4")} ved å starte på 9 og telle 4 bakover: 8, 7, 6, 5. Svar: <b>5</b>.</p>` },
            { heading: "Pluss og minus hører sammen",
              html: `<p>Hvis ${F("3 + 4 = 7")}, så vet vi at ${F("7 - 4 = 3")} og ${F("7 - 3 = 4")}. Disse tre tallene danner en <b>tallfamilie</b>.</p>` },
          ],
          quiz: [
            { type: "num", q: "Regn ut: 10 - 4", answer: 6, explain: "10, 9, 8, 7, 6. Svar 6." },
            { type: "num", q: "Regn ut: 15 - 7", answer: 8, explain: "15 - 5 = 10, 10 - 2 = 8." },
            { type: "num", q: "Per har 12 klinkekuler. Han mister 5. Hvor mange har han igjen?", answer: 7, explain: "12 - 5 = 7." },
            { type: "mc", q: "Hvilket regnestykke hører til tallfamilien 4, 6, 10?", options: ["10 + 4 = 14", "6 - 4 = 2", "10 - 4 = 6", "10 - 5 = 5"], answer: 2, explain: "I familien 4+6=10 hører også 10-4=6 og 10-6=4." },
          ]
        },
        {
          id: "g1-former",
          title: "Geometriske former",
          summary: "Sirkel, trekant, firkant, kvadrat og rektangel.",
          sections: [
            { heading: "Vanlige flate former",
              html: `<ul>
                <li><b>Sirkel</b> - helt rund, som en mynt.</li>
                <li><b>Trekant</b> - tre sider og tre hjørner.</li>
                <li><b>Firkant</b> - fire sider og fire hjørner.</li>
                <li><b>Kvadrat</b> - en firkant der alle sider er like lange.</li>
                <li><b>Rektangel</b> - en firkant med to lange og to korte sider.</li>
              </ul>` },
            { heading: "Tredimensjonale former",
              html: `<p>I rommet finner vi <b>kule</b> (som en ball), <b>terning</b> (som en spilleterning), <b>sylinder</b> (som en hermetikkboks) og <b>kjegle</b> (som en kremkjeks).</p>` },
          ],
          quiz: [
            { type: "mc", q: "Hvor mange hjørner har en trekant?", options: ["2","3","4","6"], answer: 1, explain: "Tre - derfor heter den trekant." },
            { type: "mc", q: "En firkant der alle sidene er like lange, kaller vi ...", options: ["sirkel","rektangel","kvadrat","trekant"], answer: 2, explain: "Et kvadrat har fire like lange sider." },
            { type: "mc", q: "En ball har formen av ...", options: ["en terning","en kule","en kjegle","en sylinder"], answer: 1, explain: "Ballen er rund i alle retninger - en kule." },
          ]
        },
        {
          id: "g1-klokka",
          title: "Klokka - hele timer",
          summary: "Lese hele timer på en analog klokke.",
          sections: [
            { heading: "Visere på klokka",
              html: `<p>Den korte viseren peker på <b>timen</b>. Den lange viseren peker på <b>minuttet</b>. Når den lange peker rett opp på 12, er klokka hel.</p>` },
            { heading: "Hele timer",
              html: `<p>Når den lange peker på 12 og den korte peker på 3, er klokka <b>tre</b>. Når den korte peker på 7, er klokka <b>sju</b>.</p>
                     <div class="example"><span class="label">Eksempel</span>
                       <p>Lang viser på 12, kort viser på 9 = klokka er <b>ni</b>.</p>
                     </div>` },
          ],
          quiz: [
            { type: "mc", q: "Lang viser peker på 12, kort viser peker på 5. Hva er klokka?", options: ["kvart over 5","fem","tolv","halv 6"], answer: 1, explain: "Når lang viser er på 12 er klokka hel, og den korte peker på timen." },
            { type: "mc", q: "Hvor peker den lange viseren når klokka er hel?", options: ["på 1","på 6","på 9","på 12"], answer: 3, explain: "Rett opp på 12." },
          ]
        }
      ]
    },

    /* ============================== 2. TRINN ============================== */
    {
      id: 2, name: "2. trinn", tagline: "Tall til 100, pluss og minus til 20, posisjonssystem, kroner og ører, halve timer",
      topics: [
        {
          id: "g2-tall100",
          title: "Tall opp til 100",
          summary: "Tiere og enere, plassverdi, partall og oddetall.",
          sections: [
            { heading: "Tiere og enere",
              html: `<p>Et tosifret tall består av <b>tiere</b> (T) og <b>enere</b> (E). Tallet 47 har 4 tiere og 7 enere fordi ${F("47 = 40 + 7")}.</p>
                     <p>Tallet 60 har 6 tiere og 0 enere.</p>` },
            { heading: "Telling i sprang",
              html: `<p>Vi kan telle i sprang av 2: 2, 4, 6, 8, 10, 12, 14 ... Dette gir partall.</p>
                     <p>Eller i sprang av 5: 5, 10, 15, 20, 25, 30 ... Eller i sprang av 10: 10, 20, 30, 40, 50, 60.</p>` },
            { heading: "Partall og oddetall",
              html: `<p>Et <b>partall</b> ender på 0, 2, 4, 6 eller 8. Et <b>oddetall</b> ender på 1, 3, 5, 7 eller 9. 24 er partall, 37 er oddetall.</p>` },
          ],
          quiz: [
            { type: "num", q: "Hvor mange tiere er det i tallet 73?", answer: 7, explain: "73 = 7 tiere + 3 enere." },
            { type: "mc", q: "Hvilket tall er partall?", options: ["27","31","48","55"], answer: 2, explain: "48 ender på 8, som er partall." },
            { type: "num", q: "Hvilket tall kommer etter 89?", answer: 90, explain: "Etter 89 kommer 90." },
            { type: "num", q: "Tell i sprang av 5 fra 25. Hvilket er det tredje tallet du sier (etter 25)?", answer: 40, explain: "25, 30, 35, 40. Det tredje er 40." },
          ]
        },
        {
          id: "g2-pluss100",
          title: "Pluss og minus opp til 100",
          summary: "Regne med tiere og enere, både med og uten tieroverskridelse.",
          sections: [
            { heading: "Pluss med hele tiere",
              html: `<p>${F("30 + 40")} regnes som ${F("3 + 4 = 7")} tiere, altså 70.</p>` },
            { heading: "Pluss to-sifrede tall",
              html: `<p>${F("23 + 14")}: legg tiere for seg og enere for seg. 20 + 10 = 30, og 3 + 4 = 7. Til sammen 37.</p>
                     <div class="example"><span class="label">Eksempel med veksling</span>
                       <p>${F("28 + 15")}: 20 + 10 = 30. 8 + 5 = 13, som er 1 tier og 3 enere. Til sammen 30 + 13 = <b>43</b>.</p>
                     </div>` },
            { heading: "Minus",
              html: `<p>${F("56 - 23")}: 50 - 20 = 30 og 6 - 3 = 3, til sammen 33.</p>
                     <p>Med veksling: ${F("52 - 17")}. Vi kan tenke 52 - 10 = 42, så 42 - 7 = 35.</p>` },
          ],
          quiz: [
            { type: "num", q: "Regn ut: 30 + 50", answer: 80, explain: "3 tiere + 5 tiere = 8 tiere = 80." },
            { type: "num", q: "Regn ut: 24 + 33", answer: 57, explain: "20+30=50, 4+3=7. 50+7=57." },
            { type: "num", q: "Regn ut: 45 + 28", answer: 73, explain: "40+20=60, 5+8=13. 60+13=73." },
            { type: "num", q: "Regn ut: 80 - 30", answer: 50, explain: "8 tiere - 3 tiere = 5 tiere = 50." },
            { type: "num", q: "Regn ut: 63 - 27", answer: 36, explain: "63-20=43, 43-7=36." },
          ]
        },
        {
          id: "g2-penger",
          title: "Kroner og ører",
          summary: "Norske mynter og sedler, regne ut total og veksle.",
          sections: [
            { heading: "Mynter og sedler",
              html: `<p>I Norge har vi mynter på 1 kr, 5 kr, 10 kr og 20 kr. Sedlene er 50, 100, 200, 500 og 1000 kroner.</p>` },
            { heading: "Regne med penger",
              html: `<div class="example"><span class="label">Eksempel</span>
                       <p>En is koster 25 kr. Du betaler med en 50-krone. Hvor mye får du tilbake?</p>
                       <p>50 - 25 = 25 kr.</p>
                     </div>` },
          ],
          quiz: [
            { type: "num", q: "Du har én 20-krone og to 10-kroner. Hvor mange kroner har du?", answer: 40, explain: "20 + 10 + 10 = 40 kr." },
            { type: "num", q: "En bolle koster 18 kr. Du betaler med 50 kr. Hvor mye får du igjen?", answer: 32, explain: "50 - 18 = 32 kr." },
          ]
        },
        {
          id: "g2-halv",
          title: "Klokka - halve og kvarte",
          summary: "Halv, kvart over og kvart på.",
          sections: [
            { heading: "Halv",
              html: `<p>Når den lange viseren peker på 6, er klokka <b>halv</b>. Den korte er da midt mellom to tall. Når kort viser er mellom 2 og 3 og lang viser er på 6, er klokka <b>halv tre</b> (ikke halv to!).</p>` },
            { heading: "Kvart over og kvart på",
              html: `<p>Lang viser på 3 = <b>kvart over</b>. Lang viser på 9 = <b>kvart på</b>.</p>` },
          ],
          quiz: [
            { type: "mc", q: "Lang viser på 6, kort viser mellom 7 og 8. Hva er klokka?", options: ["halv 7","halv 8","kvart over 7","kvart på 8"], answer: 1, explain: "Halv åtte - klokka 'mangler' en halv time på 8." },
            { type: "mc", q: "Lang viser på 9, kort like før 4. Hva er klokka?", options: ["kvart over 3","kvart på 4","halv 4","tre"], answer: 1, explain: "Kvart på 4 - 15 minutter til 4." },
          ]
        }
      ]
    },

    /* ============================== 3. TRINN ============================== */
    {
      id: 3, name: "3. trinn", tagline: "Multiplikasjon og divisjon introduseres, gangetabell 1-5, brøk som del av en hel, måling",
      topics: [
        {
          id: "g3-gange",
          title: "Multiplikasjon - hva er gange?",
          summary: "Gange som gjentatt addisjon og som rader og kolonner.",
          sections: [
            { heading: "Gjentatt addisjon",
              html: `<p>${F("3 · 4")} (tre ganger fire) betyr <b>4 + 4 + 4</b> = 12. Tegnet <b>·</b> (eller ×) er gangetegnet.</p>` },
            { heading: "Rader og kolonner",
              html: `<p>Tenk på 3 rader med 4 epler i hver: ${F("3 · 4 = 12")}. Eller 4 rader med 3 epler: ${F("4 · 3 = 12")}. Svaret er det samme - bytteregelen gjelder også for gange.</p>` },
            { heading: "Gangetabell 1-5",
              html: `<p>1-gangen: 1, 2, 3, 4, 5 ... (uforandret).</p>
                     <p>2-gangen: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20.</p>
                     <p>5-gangen: 5, 10, 15, 20, 25, 30, 35, 40, 45, 50.</p>
                     <p>10-gangen: 10, 20, 30, 40, 50, 60, 70, 80, 90, 100.</p>` },
          ],
          quiz: [
            { type: "num", q: "Regn ut: 3 · 4", answer: 12, explain: "3 grupper med 4 = 12." },
            { type: "num", q: "Regn ut: 5 · 6", answer: 30, explain: "5-gangen: 5, 10, 15, 20, 25, 30." },
            { type: "num", q: "Lise har 4 poser med 5 kuler i hver. Hvor mange kuler totalt?", answer: 20, explain: "4 · 5 = 20." },
            { type: "num", q: "Regn ut: 2 · 9", answer: 18, explain: "2-gangen: 2, 4, 6, 8, 10, 12, 14, 16, 18." },
          ]
        },
        {
          id: "g3-divisjon",
          title: "Divisjon - dele likt",
          summary: "Divisjon som å dele i like store grupper.",
          sections: [
            { heading: "Hva betyr :?",
              html: `<p>${F("12 : 3")} betyr: hvor mange er 12 fordelt på 3 like store grupper? Svaret er 4 fordi ${F("3 · 4 = 12")}.</p>` },
            { heading: "Gange og dele hører sammen",
              html: `<p>Hvis ${F("4 · 5 = 20")}, så er ${F("20 : 4 = 5")} og ${F("20 : 5 = 4")}.</p>` },
          ],
          quiz: [
            { type: "num", q: "Regn ut: 15 : 5", answer: 3, explain: "5 · 3 = 15, altså 15 : 5 = 3." },
            { type: "num", q: "Du har 18 godterier og deler likt mellom 2 barn. Hvor mange får hver?", answer: 9, explain: "18 : 2 = 9." },
            { type: "num", q: "Regn ut: 24 : 4", answer: 6, explain: "4 · 6 = 24." },
          ]
        },
        {
          id: "g3-brok",
          title: "Brøk - del av en hel",
          summary: "Halve, tredjedeler og fjerdedeler.",
          sections: [
            { heading: "Hva er en brøk?",
              html: `<p>En <b>brøk</b> skrives med to tall over hverandre med en strek imellom. Eksempel: ${F("1/2")}. Tallet under (<b>nevneren</b>) sier hvor mange like deler vi har delt det hele i. Tallet over (<b>telleren</b>) sier hvor mange av delene vi har tatt.</p>` },
            { heading: "Halve, tredjedeler, fjerdedeler",
              html: `<p>${F("1/2")} = en av to like deler = halvparten.</p>
                     <p>${F("1/3")} = en av tre like deler = en tredjedel.</p>
                     <p>${F("1/4")} = en av fire like deler = en fjerdedel (en kvart).</p>
                     <p>${F("3/4")} = tre av fire like deler = tre fjerdedeler.</p>` },
          ],
          quiz: [
            { type: "mc", q: "Hvor mange like deler er en pizza delt i hvis hver bit er 1/4?", options: ["2","3","4","8"], answer: 2, explain: "Nevneren 4 betyr fire like deler." },
            { type: "num", q: "Hva er halvparten av 20?", answer: 10, explain: "1/2 av 20 er 10." },
            { type: "num", q: "Hva er 1/4 av 16?", answer: 4, explain: "16 : 4 = 4." },
          ]
        },
        {
          id: "g3-maling",
          title: "Måling - lengde og vekt",
          summary: "Centimeter, meter, gram, kilo.",
          sections: [
            { heading: "Lengde",
              html: `<p>Vi måler korte lengder i <b>centimeter</b> (cm) og lengre lengder i <b>meter</b> (m). 1 m = 100 cm.</p>
                     <p>Veldig lange avstander måles i <b>kilometer</b> (km). 1 km = 1000 m.</p>` },
            { heading: "Vekt (masse)",
              html: `<p>Lette ting veier vi i <b>gram</b> (g). Tyngre ting i <b>kilogram</b> (kg). 1 kg = 1000 g.</p>` },
          ],
          quiz: [
            { type: "num", q: "Hvor mange centimeter er 3 meter?", answer: 300, explain: "1 m = 100 cm, så 3 m = 300 cm." },
            { type: "num", q: "Hvor mange gram er 2 kg?", answer: 2000, explain: "1 kg = 1000 g, så 2 kg = 2000 g." },
            { type: "mc", q: "Hva er en passende enhet for å måle høyden til en dør?", options: ["mm","cm","km","tonn"], answer: 1, explain: "Centimeter er praktisk for ting i meterstørrelse." },
          ]
        }
      ]
    },

    /* ============================== 4. TRINN ============================== */
    {
      id: 4, name: "4. trinn", tagline: "Hele gangetabellen, divisjon, brøk, areal og omkrets, desimaltall introduseres",
      topics: [
        {
          id: "g4-tabell",
          title: "Den lille gangetabellen",
          summary: "Gangetabellen 1-10 og smarte huskeregler.",
          sections: [
            { heading: "Hele tabellen",
              html: `<p>Her er gangetabellen 1-10. Lær én rad om gangen.</p>
                     <p><b>2:</b> 2, 4, 6, 8, 10, 12, 14, 16, 18, 20<br/>
                     <b>3:</b> 3, 6, 9, 12, 15, 18, 21, 24, 27, 30<br/>
                     <b>4:</b> 4, 8, 12, 16, 20, 24, 28, 32, 36, 40<br/>
                     <b>5:</b> 5, 10, 15, 20, 25, 30, 35, 40, 45, 50<br/>
                     <b>6:</b> 6, 12, 18, 24, 30, 36, 42, 48, 54, 60<br/>
                     <b>7:</b> 7, 14, 21, 28, 35, 42, 49, 56, 63, 70<br/>
                     <b>8:</b> 8, 16, 24, 32, 40, 48, 56, 64, 72, 80<br/>
                     <b>9:</b> 9, 18, 27, 36, 45, 54, 63, 72, 81, 90<br/>
                     <b>10:</b> 10, 20, 30, 40, 50, 60, 70, 80, 90, 100</p>` },
            { heading: "9-gangen-trikset",
              html: `<p>Tverrsummen av tallene i 9-gangen blir alltid 9: 18 (1+8=9), 27 (2+7=9), 36 (3+6=9). Hvis du strekker ut ti fingre og bøyer fingeren som tilsvarer tallet du ganger med, viser fingrene til venstre tieren og til høyre eneren.</p>` },
          ],
          quiz: [
            { type: "num", q: "Regn ut: 7 · 8", answer: 56, explain: "7 · 8 = 56." },
            { type: "num", q: "Regn ut: 6 · 9", answer: 54, explain: "6 · 9 = 54." },
            { type: "num", q: "Regn ut: 8 · 4", answer: 32, explain: "8 · 4 = 32." },
            { type: "num", q: "Regn ut: 9 · 9", answer: 81, explain: "9 · 9 = 81." },
            { type: "num", q: "Regn ut: 7 · 6", answer: 42, explain: "7 · 6 = 42." },
          ]
        },
        {
          id: "g4-divisjon",
          title: "Divisjon med rest",
          summary: "Dele ujevnt og forstå rest.",
          sections: [
            { heading: "Hva er rest?",
              html: `<p>Når ${F("17 : 5")} ikke går opp, får vi en <b>rest</b>. 5 · 3 = 15, og det er 2 igjen. Vi sier <i>17 delt på 5 er 3, rest 2</i>.</p>` },
            { heading: "Tenkemodell",
              html: `<div class="example"><span class="label">Eksempel</span>
                       <p>23 kjeks fordeles på 4 barn. 4 · 5 = 20, så hver får 5 kjeks og 3 er igjen. Svar: 5 hver, 3 i rest.</p>
                     </div>` },
          ],
          quiz: [
            { type: "num", q: "Hva er svaret når 25 deles på 4? (heltallsdelen)", answer: 6, explain: "4 · 6 = 24, så svaret er 6 med 1 i rest." },
            { type: "num", q: "Hva er resten når 31 deles på 7?", answer: 3, explain: "7 · 4 = 28, 31 - 28 = 3. Rest 3." },
            { type: "num", q: "Regn ut: 56 : 8", answer: 7, explain: "8 · 7 = 56." },
          ]
        },
        {
          id: "g4-areal",
          title: "Omkrets og areal",
          summary: "Omkrets er lengden rundt, areal er hvor stor flate.",
          sections: [
            { heading: "Omkrets",
              html: `<p><b>Omkrets</b> er summen av alle sidene. Et rektangel med sidene 4 cm og 7 cm har omkrets ${F("4 + 7 + 4 + 7 = 22")} cm.</p>` },
            { heading: "Areal av rektangel",
              html: `<p><b>Areal</b> er hvor mye plass figuren dekker. Vi måler areal i <b>kvadratcentimeter</b> (cm²) eller <b>kvadratmeter</b> (m²).</p>
                     ${B("Areal av rektangel = lengde · bredde")}
                     <div class="example"><span class="label">Eksempel</span><p>Et rektangel som er 5 cm langt og 3 cm bredt har areal ${F("5 · 3 = 15")} cm².</p></div>` },
          ],
          quiz: [
            { type: "num", q: "Omkretsen av et rektangel med sider 6 cm og 4 cm? (i cm)", answer: 20, explain: "6 + 4 + 6 + 4 = 20 cm." },
            { type: "num", q: "Arealet av et kvadrat med side 5 cm? (i cm²)", answer: 25, explain: "5 · 5 = 25 cm²." },
            { type: "num", q: "Et rektangel er 8 m langt og 3 m bredt. Hva er arealet? (m²)", answer: 24, explain: "8 · 3 = 24 m²." },
          ]
        },
        {
          id: "g4-desimal",
          title: "Desimaltall - kommatall",
          summary: "Tideler og hundredeler, kobling til penger og brøk.",
          sections: [
            { heading: "Hva er et desimaltall?",
              html: `<p>Et <b>desimaltall</b> har et komma. Sifrene etter kommaet kalles desimaler. ${F("3,5")} betyr 3 hele og 5 tideler.</p>
                     <p>${F("0,1 = 1/10")} (en tidel), ${F("0,01 = 1/100")} (en hundredel).</p>` },
            { heading: "Penger som desimaltall",
              html: `<p>${F("12,50 kr")} betyr 12 kroner og 50 øre. 50 øre er en halv krone (${F("0,5")}). En 25-øring fins ikke lenger, men ${F("0,25")} betyr en kvart.</p>` },
          ],
          quiz: [
            { type: "mc", q: "Hvor mye er 0,5?", options: ["en halv","en tidel","fem","en femtidel"], answer: 0, explain: "0,5 er det samme som 1/2." },
            { type: "num", q: "Hvor mange tideler er i 2,3?", answer: 23, explain: "2,3 = 23 tideler." },
            { type: "num", q: "12,50 kr + 7,50 kr = ? kr", answer: 20, explain: "12,50 + 7,50 = 20 kr." },
          ]
        }
      ]
    },

    /* ============================== 5. TRINN ============================== */
    {
      id: 5, name: "5. trinn", tagline: "Brøkregning, desimaltall, prosent introduseres, koordinatsystem",
      topics: [
        {
          id: "g5-brok",
          title: "Brøk - addisjon og subtraksjon",
          summary: "Legge sammen brøker med samme nevner, sammenligne brøker.",
          sections: [
            { heading: "Like nevnere",
              html: `<p>Når nevnerne er like, legger vi sammen tellerne: ${F("2/5 + 1/5 = 3/5")}.</p>
                     <p>Tilsvarende ${F("4/7 - 2/7 = 2/7")}.</p>` },
            { heading: "Ulike nevnere - utvide",
              html: `<p>For å legge sammen ${F("1/2 + 1/4")} må vi gjøre nevnerne like. ${F("1/2 = 2/4")}, så ${F("2/4 + 1/4 = 3/4")}.</p>
                     <p>Vi <b>utvider</b> en brøk ved å gange teller og nevner med samme tall.</p>` },
            { heading: "Hele tall som brøk",
              html: `<p>${F("1 = 2/2 = 3/3 = 4/4")}. Hvis telleren er like stor som nevneren, er brøken lik 1.</p>` },
          ],
          quiz: [
            { type: "text", q: "Skriv svaret: 3/8 + 2/8 = ?/8 (skriv bare telleren)", answer: "5", explain: "3 + 2 = 5, så 5/8." },
            { type: "text", q: "1/2 + 1/4 = ?/4 (skriv telleren)", answer: "3", explain: "1/2 = 2/4. 2/4 + 1/4 = 3/4." },
            { type: "mc", q: "Hvilken brøk er størst?", options: ["1/2","1/3","1/4","1/5"], answer: 0, explain: "Når telleren er 1, er den med minst nevner størst." },
          ]
        },
        {
          id: "g5-prosent",
          title: "Prosent - hundredeler",
          summary: "Prosent som hundredel, vanlige prosentverdier.",
          sections: [
            { heading: "Hva betyr %?",
              html: `<p><b>Prosent</b> betyr <i>per hundre</i>. ${F("25%")} betyr 25 av 100, det vil si ${F("25/100 = 1/4")}.</p>` },
            { heading: "Nyttige prosenter",
              html: `<ul>
                <li>10 % = 1/10 - del på 10.</li>
                <li>25 % = 1/4 - del på 4.</li>
                <li>50 % = 1/2 - halvparten.</li>
                <li>75 % = 3/4 - tre fjerdedeler.</li>
                <li>100 % = alt.</li>
              </ul>
              <div class="example"><span class="label">Eksempel</span><p>Hva er 25 % av 80 kr? 80 : 4 = 20 kr.</p></div>` },
          ],
          quiz: [
            { type: "num", q: "Hva er 10% av 200?", answer: 20, explain: "10% er en tidel: 200 : 10 = 20." },
            { type: "num", q: "Hva er 50% av 64?", answer: 32, explain: "Halvparten av 64 er 32." },
            { type: "num", q: "Hva er 25% av 120?", answer: 30, explain: "25% er en fjerdedel: 120 : 4 = 30." },
          ]
        },
        {
          id: "g5-koord",
          title: "Koordinatsystem",
          summary: "Plassere punkter i 1. kvadrant.",
          sections: [
            { heading: "Akser og punkter",
              html: `<p>Et koordinatsystem har en vannrett <b>x-akse</b> og en loddrett <b>y-akse</b>. Et punkt skrives som ${F("(x, y)")}.</p>
                     <p>Punktet (3, 2) ligger 3 enheter til høyre og 2 enheter opp fra origo (0, 0).</p>` },
          ],
          quiz: [
            { type: "mc", q: "Punktet (4, 0) ligger ...", options: ["4 opp og 0 til høyre","på x-aksen 4 til høyre","på y-aksen 4 opp","i origo"], answer: 1, explain: "y = 0 betyr punktet ligger på x-aksen." },
            { type: "text", q: "Hva er koordinatene til origo? Skriv som (x,y) uten mellomrom.", answer: "(0,0)", explain: "Origo er der aksene krysser, (0,0)." },
          ]
        },
        {
          id: "g5-tidsmal",
          title: "Tid - minutter, sekunder, døgn",
          summary: "Omregning mellom enheter for tid.",
          sections: [
            { heading: "Enheter",
              html: `<ul><li>1 minutt = 60 sekunder</li><li>1 time = 60 minutter = 3600 sekunder</li><li>1 døgn = 24 timer</li><li>1 uke = 7 døgn</li><li>1 år ≈ 365 døgn</li></ul>` },
          ],
          quiz: [
            { type: "num", q: "Hvor mange minutter er det i 3 timer?", answer: 180, explain: "3 · 60 = 180." },
            { type: "num", q: "Hvor mange sekunder er det i en halvtime?", answer: 1800, explain: "30 · 60 = 1800." },
            { type: "num", q: "Hvor mange timer er det i 2 døgn?", answer: 48, explain: "2 · 24 = 48." },
          ]
        }
      ]
    },

    /* ============================== 6. TRINN ============================== */
    {
      id: 6, name: "6. trinn", tagline: "Negative tall, brøk-desimal-prosent, geometri, sannsynlighet introduseres",
      topics: [
        {
          id: "g6-neg",
          title: "Negative tall",
          summary: "Tall under null på tallinjen og enkel regning med negative tall.",
          sections: [
            { heading: "Tallinjen utvides",
              html: `<p>Til venstre for 0 ligger de <b>negative tallene</b>: -1, -2, -3, ... ${F("-5")} leses som <i>minus fem</i> og er mindre enn 0.</p>` },
            { heading: "Regne med negative tall",
              html: `<p>Pluss-minus: ${F("3 + (-2) = 3 - 2 = 1")}. Minus-minus: ${F("3 - (-2) = 3 + 2 = 5")}.</p>
                     <p>To minuser like inntil hverandre blir pluss: ${F("-(-4) = 4")}.</p>` },
            { heading: "Eksempel: temperatur",
              html: `<div class="example"><span class="label">Eksempel</span>
                       <p>Det er -3 °C ute, så stiger temperaturen 5 grader. Den nye temperaturen er ${F("-3 + 5 = 2")} °C.</p>
                       <p>Det var 4 °C, så faller temperaturen 9 grader: ${F("4 - 9 = -5")} °C.</p>
                     </div>` },
          ],
          quiz: [
            { type: "num", q: "Regn ut: -3 + 7", answer: 4, explain: "Start på -3, gå 7 til høyre. Lander på 4." },
            { type: "num", q: "Regn ut: 2 - 6", answer: -4, explain: "2 - 6 = -4." },
            { type: "num", q: "Regn ut: 5 - (-3)", answer: 8, explain: "Minus minus blir pluss: 5 + 3 = 8." },
            { type: "num", q: "Det er -8 °C. Temperaturen stiger 12 grader. Ny temperatur?", answer: 4, explain: "-8 + 12 = 4." },
          ]
        },
        {
          id: "g6-bdp",
          title: "Brøk, desimal og prosent",
          summary: "Veksle mellom de tre skrivemåtene.",
          sections: [
            { heading: "Sammenheng",
              html: `<p>Alle disse tre er måter å skrive en del av en hel:</p>
                     <ul><li>${F("1/2")} = ${F("0,5")} = ${F("50%")}</li>
                         <li>${F("1/4")} = ${F("0,25")} = ${F("25%")}</li>
                         <li>${F("3/4")} = ${F("0,75")} = ${F("75%")}</li>
                         <li>${F("1/10")} = ${F("0,1")} = ${F("10%")}</li>
                         <li>${F("1/5")} = ${F("0,2")} = ${F("20%")}</li></ul>` },
            { heading: "Fra brøk til desimaltall",
              html: `<p>Del telleren på nevneren: ${F("3/4 = 3 : 4 = 0,75")}.</p>` },
            { heading: "Fra desimaltall til prosent",
              html: `<p>Gang med 100: ${F("0,35 · 100 = 35")}, altså 35 %.</p>` },
          ],
          quiz: [
            { type: "text", q: "Skriv 0,5 som prosent (skriv tallet, uten %-tegn)", answer: "50", explain: "0,5 · 100 = 50%." },
            { type: "text", q: "Skriv 3/5 som desimaltall (bruk komma)", answer: "0,6", explain: "3 : 5 = 0,6." },
            { type: "num", q: "Hva er 30% av 60?", answer: 18, explain: "30/100 · 60 = 18." },
          ]
        },
        {
          id: "g6-geometri",
          title: "Vinkler og trekanter",
          summary: "Vinkeltyper og vinkelsummen i en trekant.",
          sections: [
            { heading: "Vinkeltyper",
              html: `<ul>
                <li><b>Spiss vinkel</b>: mindre enn 90°.</li>
                <li><b>Rett vinkel</b>: nøyaktig 90°.</li>
                <li><b>Stump vinkel</b>: mellom 90° og 180°.</li>
                <li><b>Rett (utstrakt) vinkel</b>: 180°.</li>
              </ul>` },
            { heading: "Vinkelsum i trekant",
              html: `<p>Summen av de tre vinklene i en trekant er alltid <b>180°</b>.</p>
                     <div class="example"><span class="label">Eksempel</span><p>To av vinklene i en trekant er 50° og 70°. Den tredje er ${F("180 - 50 - 70 = 60")} °.</p></div>` },
            { heading: "Typer trekanter",
              html: `<ul><li><b>Likesidet</b> - alle tre sider og vinkler er like (60° hver).</li>
                         <li><b>Likebeint</b> - to sider like, to vinkler like.</li>
                         <li><b>Rettvinklet</b> - har en 90°-vinkel.</li></ul>` },
          ],
          quiz: [
            { type: "num", q: "To vinkler i en trekant er 40° og 80°. Hva er den tredje? (grader)", answer: 60, explain: "180 - 40 - 80 = 60°." },
            { type: "mc", q: "Hva kalles en vinkel som er nøyaktig 90°?", options: ["spiss","stump","rett","utstrakt"], answer: 2, explain: "90° kalles en rett vinkel." },
            { type: "num", q: "Hver vinkel i en likesidet trekant er ... grader?", answer: 60, explain: "180/3 = 60°." },
          ]
        },
        {
          id: "g6-sannsynlighet",
          title: "Sannsynlighet - sjanse",
          summary: "Telle utfall og uttrykke sjanse som brøk eller prosent.",
          sections: [
            { heading: "Sannsynlighet",
              html: `<p>Sannsynlighet for en hendelse = antall gunstige utfall / antall mulige utfall.</p>
                     <div class="example"><span class="label">Eksempel</span>
                       <p>Vi kaster en terning. Sannsynligheten for å få 6 er ${F("1/6")} fordi det er 1 gunstig utfall (sekseren) og 6 mulige.</p>
                       <p>Sannsynligheten for et partall (2, 4 eller 6) er ${F("3/6 = 1/2")}.</p>
                     </div>` },
          ],
          quiz: [
            { type: "text", q: "Sannsynligheten for å trekke en ESS fra en kortstokk med 52 kort? Skriv som brøk a/b.", answer: ["4/52","1/13"], explain: "Det er 4 ess av 52 kort, altså 4/52 = 1/13." },
            { type: "text", q: "Sannsynligheten for å få oddetall (1, 3, 5) på terning, som brøk a/b.", answer: ["3/6","1/2"], explain: "3 av 6 utfall, dvs 3/6 = 1/2." },
          ]
        }
      ]
    },

    /* ============================== 7. TRINN ============================== */
    {
      id: 7, name: "7. trinn", tagline: "Variabler og enkle likninger, statistikk og diagrammer, volum",
      topics: [
        {
          id: "g7-variabel",
          title: "Bokstaver som tall - variabler",
          summary: "Bruke variabler til å beskrive sammenhenger.",
          sections: [
            { heading: "Hva er en variabel?",
              html: `<p>En <b>variabel</b> er en bokstav (ofte ${F("x")} eller ${F("a")}) som står for et tall vi ikke vet, eller som kan ha forskjellige verdier.</p>
                     <p>${F("2x")} betyr <i>to ganger x</i>. Vi skriver ikke gangetegnet mellom et tall og en bokstav.</p>` },
            { heading: "Sette inn verdier",
              html: `<p>Hvis ${F("x = 5")}, så er ${F("2x + 3 = 2·5 + 3 = 13")}.</p>` },
            { heading: "Trekke sammen ledd",
              html: `<p>${F("3x + 4x = 7x")}. Vi kan bare legge sammen <i>like ledd</i>: ${F("3x + 2y")} kan ikke forenkles.</p>` },
          ],
          quiz: [
            { type: "num", q: "Hvis x = 4, hva er 3x + 5?", answer: 17, explain: "3·4 + 5 = 12 + 5 = 17." },
            { type: "text", q: "Trekk sammen: 5a + 2a - a (skriv svaret slik: 6a)", answer: ["6a","6·a"], explain: "5 + 2 - 1 = 6, altså 6a." },
            { type: "num", q: "Hvis a = 3 og b = 2, hva er 2a + 4b?", answer: 14, explain: "2·3 + 4·2 = 6 + 8 = 14." },
          ]
        },
        {
          id: "g7-likning",
          title: "Enkle likninger",
          summary: "Finne det ukjente tallet x.",
          sections: [
            { heading: "Likhetstegnet er en vekt",
              html: `<p>En likning er en likhet med en ukjent. ${F("x + 5 = 12")} sier at <i>noe pluss 5 er 12</i>. Vi finner x ved å trekke 5 fra begge sider: ${F("x = 7")}.</p>` },
            { heading: "Hovedregel",
              html: `<p>Gjør samme regneoperasjon på begge sider av likhetstegnet.</p>
                     <div class="example"><span class="label">Eksempel</span>
                       <p>${F("3x = 21")}. Del begge sider på 3: ${F("x = 7")}.</p>
                       <p>${F("2x + 1 = 11")}. Trekk 1: ${F("2x = 10")}. Del på 2: ${F("x = 5")}.</p>
                     </div>` },
          ],
          quiz: [
            { type: "num", q: "Løs likningen: x + 8 = 15. Hva er x?", answer: 7, explain: "x = 15 - 8 = 7." },
            { type: "num", q: "Løs: 4x = 32. Hva er x?", answer: 8, explain: "x = 32 : 4 = 8." },
            { type: "num", q: "Løs: 2x + 3 = 17. Hva er x?", answer: 7, explain: "2x = 14, x = 7." },
            { type: "num", q: "Løs: 5x - 6 = 19. Hva er x?", answer: 5, explain: "5x = 25, x = 5." },
          ]
        },
        {
          id: "g7-statistikk",
          title: "Statistikk - gjennomsnitt, median, typetall",
          summary: "Sentralmål i et datasett.",
          sections: [
            { heading: "Gjennomsnitt",
              html: `<p><b>Gjennomsnitt</b> = summen av tallene delt på hvor mange tall det er.</p>
                     <div class="example"><span class="label">Eksempel</span><p>Tall: 3, 5, 7, 9. Sum = 24. Antall = 4. Gjennomsnitt = ${F("24/4 = 6")}.</p></div>` },
            { heading: "Median",
              html: `<p><b>Median</b> = midterste tall når tallene står i rekkefølge. Ved partall antall: gjennomsnitt av de to midterste.</p>
                     <div class="example"><span class="label">Eksempel</span><p>2, 4, 6, 8, 10 - medianen er 6.</p></div>` },
            { heading: "Typetall (modus)",
              html: `<p><b>Typetall</b> = det tallet som forekommer oftest. I 2, 3, 3, 5, 7 er typetallet 3.</p>` },
          ],
          quiz: [
            { type: "num", q: "Gjennomsnittet av 4, 6, 8, 10?", answer: 7, explain: "(4+6+8+10)/4 = 28/4 = 7." },
            { type: "num", q: "Median av 3, 5, 8, 11, 12?", answer: 8, explain: "Midterste tall er 8." },
            { type: "num", q: "Typetallet i 2, 4, 4, 5, 7, 4, 9?", answer: 4, explain: "4 forekommer tre ganger." },
          ]
        },
        {
          id: "g7-volum",
          title: "Volum - hvor mye plass",
          summary: "Volum av rektangulære prismer (esker).",
          sections: [
            { heading: "Volum av rett prisme",
              html: `${B("Volum = lengde · bredde · høyde")}
                     <p>Måles i kubikkcentimeter (cm³), kubikkmeter (m³) eller liter. 1 dm³ = 1 liter.</p>
                     <div class="example"><span class="label">Eksempel</span>
                       <p>En kasse er 4 dm lang, 3 dm bred og 2 dm høy. Volum = ${F("4·3·2 = 24")} dm³ = 24 liter.</p>
                     </div>` },
          ],
          quiz: [
            { type: "num", q: "Volum av en eske 5 cm · 4 cm · 3 cm? (cm³)", answer: 60, explain: "5 · 4 · 3 = 60 cm³." },
            { type: "num", q: "En terning har sider 10 cm. Volum i cm³?", answer: 1000, explain: "10·10·10 = 1000 cm³ = 1 liter." },
          ]
        }
      ]
    },

    /* ============================== 8. TRINN ============================== */
    {
      id: 8, name: "8. trinn", tagline: "Algebra med parenteser, lineære likninger, Pythagoras, prosentregning",
      topics: [
        {
          id: "g8-parentes",
          title: "Algebra med parenteser",
          summary: "Multiplisere inn i parentes, sette utenfor felles faktor.",
          sections: [
            { heading: "Distributiv lov",
              html: `${B("a(b + c) = ab + ac")}
                     <p>Vi multipliserer tallet utenfor med hvert ledd inne i parentesen.</p>
                     <div class="example"><span class="label">Eksempel</span>
                       <p>${F("3(x + 4) = 3x + 12")}</p>
                       <p>${F("-2(x - 5) = -2x + 10")} (husk fortegn!)</p>
                     </div>` },
            { heading: "Sette utenfor felles faktor",
              html: `<p>${F("6x + 9 = 3(2x + 3)")} fordi 3 er felles faktor.</p>` },
            { heading: "Trekke sammen ledd",
              html: `<p>${F("3x + 5 - x + 2 = 2x + 7")}</p>` },
          ],
          quiz: [
            { type: "text", q: "Multipliser ut: 4(x + 3). Skriv som ax+b, f.eks 4x+12.", answer: "4x+12", explain: "4·x + 4·3 = 4x + 12." },
            { type: "text", q: "Multipliser ut: 5(2x - 3). Skriv som ax-b.", answer: "10x-15", explain: "5·2x - 5·3 = 10x - 15." },
            { type: "text", q: "Trekk sammen: 4x + 7 - 2x - 3. Skriv som ax+b.", answer: "2x+4", explain: "(4-2)x + (7-3) = 2x + 4." },
            { type: "text", q: "Faktoriser: 8x + 12. Skriv som a(bx+c).", answer: ["4(2x+3)","4·(2x+3)"], explain: "Felles faktor 4: 4(2x + 3)." },
          ]
        },
        {
          id: "g8-likning",
          title: "Lineære likninger",
          summary: "Løse likninger med x på begge sider og parenteser.",
          sections: [
            { heading: "Standardstrategi",
              html: `<ol><li>Multipliser ut parenteser.</li><li>Saml alle x på én side, tall på den andre.</li><li>Forenkle og del.</li></ol>
                     <div class="example"><span class="label">Eksempel</span>
                       <p>${F("3(x - 2) = 2x + 4")}<br/>
                       Steg 1: ${F("3x - 6 = 2x + 4")}<br/>
                       Steg 2: Trekk 2x fra begge sider: ${F("x - 6 = 4")}<br/>
                       Steg 3: ${F("x = 10")}.</p>
                     </div>` },
          ],
          quiz: [
            { type: "num", q: "Løs: 3x - 5 = 16. Hva er x?", answer: 7, explain: "3x = 21, x = 7." },
            { type: "num", q: "Løs: 2(x + 3) = 14. Hva er x?", answer: 4, explain: "2x + 6 = 14, 2x = 8, x = 4." },
            { type: "num", q: "Løs: 4x - 7 = 2x + 9. Hva er x?", answer: 8, explain: "2x = 16, x = 8." },
            { type: "num", q: "Løs: 5(x - 1) = 3(x + 3). Hva er x?", answer: 7, explain: "5x - 5 = 3x + 9, 2x = 14, x = 7." },
          ]
        },
        {
          id: "g8-pyth",
          title: "Pythagoras setning",
          summary: "Sammenhengen i en rettvinklet trekant.",
          sections: [
            { heading: "Setningen",
              html: `<p>I en <b>rettvinklet</b> trekant er kvadratet av den lengste siden (hypotenusen) lik summen av kvadratene på de to andre sidene (katetene).</p>
                     ${B("a² + b² = c²")}
                     <p>Her er ${F("c")} hypotenusen.</p>` },
            { heading: "Eksempel",
              html: `<div class="example"><span class="label">Eksempel</span>
                       <p>Katetene er 3 og 4. Da er hypotenusen ${F("c² = 3² + 4² = 9 + 16 = 25")}, altså ${F("c = 5")}.</p>
                       <p>Hvis hypotenusen er 13 og en katet 5: ${F("b² = 13² - 5² = 169 - 25 = 144")}, så ${F("b = 12")}.</p>
                     </div>` },
          ],
          quiz: [
            { type: "num", q: "Katetene er 6 og 8. Hvor lang er hypotenusen?", answer: 10, explain: "6² + 8² = 36 + 64 = 100. √100 = 10." },
            { type: "num", q: "Hypotenus 17, katet 8. Hvor lang er den andre kateten?", answer: 15, explain: "17² - 8² = 289 - 64 = 225. √225 = 15." },
            { type: "num", q: "Katetene er 9 og 12. Hypotenusen?", answer: 15, explain: "9² + 12² = 81 + 144 = 225. √225 = 15." },
          ]
        },
        {
          id: "g8-prosent",
          title: "Prosentregning",
          summary: "Prosent av tall, vekstfaktor, finne prosent og helhet.",
          sections: [
            { heading: "Tre standard situasjoner",
              html: `<ul>
                <li><b>Finn prosenten:</b> ${F("15 % av 240 = 0,15 · 240 = 36")}.</li>
                <li><b>Finn prosenten:</b> Hvor mange prosent er 18 av 60? ${F("18/60 = 0,3 = 30 %")}.</li>
                <li><b>Finn helheten:</b> 24 er 20 % av hva? ${F("24 / 0,20 = 120")}.</li>
              </ul>` },
            { heading: "Vekstfaktor",
              html: `<p>Øke med 25 % = gange med vekstfaktoren ${F("1,25")}. Redusere med 30 % = gange med ${F("0,70")}.</p>
                     <div class="example"><span class="label">Eksempel</span>
                       <p>En jakke koster 800 kr og settes ned 30 %. Ny pris: ${F("800 · 0,70 = 560")} kr.</p>
                     </div>` },
          ],
          quiz: [
            { type: "num", q: "Hva er 18 % av 250?", answer: 45, explain: "0,18 · 250 = 45." },
            { type: "num", q: "En vare på 1200 kr settes ned 25 %. Ny pris?", answer: 900, explain: "1200 · 0,75 = 900." },
            { type: "num", q: "Hvor mange prosent er 21 av 70?", answer: 30, explain: "21/70 = 0,30 = 30 %." },
            { type: "num", q: "45 er 15 % av et tall. Hvilket tall?", answer: 300, explain: "45 / 0,15 = 300." },
          ]
        },
        {
          id: "g8-funksjon",
          title: "Lineære sammenhenger",
          summary: "Sammenhengen y = ax + b og graf.",
          sections: [
            { heading: "Lineær funksjon",
              html: `${B("y = ax + b")}
                     <p>Tallet ${F("a")} kalles <b>stigningstallet</b>: hvor mye y øker når x øker med 1. Tallet ${F("b")} kalles <b>konstantleddet</b>: y-verdien når x = 0.</p>` },
            { heading: "Eksempel",
              html: `<div class="example"><span class="label">Eksempel</span>
                       <p>Et taxi-selskap tar 50 kr i startpris og 12 kr per km. Da er ${F("y = 12x + 50")}, der y er totalprisen og x er antall km.</p>
                       <p>For 10 km: ${F("y = 12·10 + 50 = 170")} kr.</p>
                     </div>` },
          ],
          quiz: [
            { type: "num", q: "y = 3x + 4. Hva er y når x = 5?", answer: 19, explain: "3·5 + 4 = 19." },
            { type: "num", q: "y = 2x - 1. Hva er y når x = 10?", answer: 19, explain: "2·10 - 1 = 19." },
            { type: "num", q: "I y = 4x + 7, hva er stigningstallet?", answer: 4, explain: "Stigningstallet er koeffisienten foran x." },
          ]
        }
      ]
    },

    /* ============================== 9. TRINN ============================== */
    {
      id: 9, name: "9. trinn", tagline: "Lineære funksjoner, ulikheter, formellæren, geometri og målestokk",
      topics: [
        {
          id: "g9-lin",
          title: "Lineære funksjoner og grafer",
          summary: "Finne stigningstall, konstantledd og likning fra graf.",
          sections: [
            { heading: "Stigningstall fra to punkter",
              html: `${B("a = (y₂ − y₁) / (x₂ − x₁)")}
                     <div class="example"><span class="label">Eksempel</span>
                       <p>Punktene (1, 3) og (4, 12). ${F("a = (12-3)/(4-1) = 9/3 = 3")}. Innsetting i ${F("y = 3x + b")} med (1,3): ${F("3 = 3·1 + b")}, så ${F("b = 0")}. Linja er ${F("y = 3x")}.</p>
                     </div>` },
            { heading: "Skjæring med aksene",
              html: `<p>Skjæring med y-aksen: ${F("x = 0")}, da er ${F("y = b")}.</p>
                     <p>Skjæring med x-aksen: ${F("y = 0")}, løs for x.</p>` },
          ],
          quiz: [
            { type: "num", q: "Linja går gjennom (2, 5) og (4, 11). Hva er stigningstallet?", answer: 3, explain: "(11-5)/(4-2) = 6/2 = 3." },
            { type: "num", q: "y = 2x - 6. Skjæring med x-aksen ved x = ?", answer: 3, explain: "0 = 2x - 6 ⇒ x = 3." },
            { type: "num", q: "y = -x + 8. Hva er y når x = 3?", answer: 5, explain: "-3 + 8 = 5." },
          ]
        },
        {
          id: "g9-ulikh",
          title: "Ulikheter",
          summary: "Løse førstegradsulikheter.",
          sections: [
            { heading: "Regneregler",
              html: `<p>Samme regler som for likninger, MEN: hvis du ganger eller deler med et negativt tall, snur ulikhetstegnet.</p>
                     <div class="example"><span class="label">Eksempel</span>
                       <p>${F("2x + 3 &gt; 11")} ⇒ ${F("2x &gt; 8")} ⇒ ${F("x &gt; 4")}.</p>
                       <p>${F("-3x &lt; 12")} ⇒ del på -3 og snu: ${F("x &gt; -4")}.</p>
                     </div>` },
          ],
          quiz: [
            { type: "text", q: "Løs: 3x - 5 ≥ 7. Svar på form x≥? (f.eks x≥4)", answer: ["x≥4","x>=4"], explain: "3x ≥ 12, x ≥ 4." },
            { type: "text", q: "Løs: -2x > 10. Svar f.eks x<-5.", answer: ["x<-5"], explain: "Del på -2 og snu: x < -5." },
          ]
        },
        {
          id: "g9-formel",
          title: "Formler og enheter",
          summary: "Areal og volum av vanlige figurer.",
          sections: [
            { heading: "Areal",
              html: `<ul>
                <li>Rektangel: ${F("A = l · b")}</li>
                <li>Trekant: ${F("A = (g · h) / 2")}</li>
                <li>Parallellogram: ${F("A = g · h")}</li>
                <li>Sirkel: ${F("A = π r²")}, π ≈ 3,14</li>
                <li>Omkrets sirkel: ${F("O = 2π r")}</li>
              </ul>` },
            { heading: "Volum",
              html: `<ul>
                <li>Rett prisme: ${F("V = G · h")} (G = grunnflate)</li>
                <li>Sylinder: ${F("V = π r² · h")}</li>
              </ul>` },
            { heading: "Eksempel",
              html: `<div class="example"><span class="label">Eksempel</span>
                       <p>Sirkel med radius 5 cm. ${F("A = π · 5² ≈ 3,14 · 25 = 78,5")} cm². ${F("O = 2π·5 ≈ 31,4")} cm.</p>
                     </div>` },
          ],
          quiz: [
            { type: "num", q: "Areal av trekant med grunnlinje 10 og høyde 6?", answer: 30, explain: "(10·6)/2 = 30." },
            { type: "num", q: "Areal av sirkel med radius 4. Bruk π≈3,14. Svar avrundet til hel cm².", answer: 50, tol: 1, explain: "3,14 · 16 = 50,24 ≈ 50." },
            { type: "num", q: "Volum av sylinder med r=3 og h=10. Bruk π≈3,14. Avrundet til hel cm³.", answer: 283, tol: 2, explain: "π·9·10 ≈ 282,7." },
          ]
        },
        {
          id: "g9-mlst",
          title: "Målestokk",
          summary: "Forholdet mellom kart/tegning og virkelighet.",
          sections: [
            { heading: "Hva er målestokk?",
              html: `<p>Målestokk ${F("1 : 100")} betyr at 1 cm på kartet/tegningen tilsvarer 100 cm = 1 m i virkeligheten.</p>
                     <div class="example"><span class="label">Eksempel</span>
                       <p>Kart i målestokk 1 : 50 000. 4 cm på kartet = ${F("4 · 50 000 = 200 000")} cm = 2 km i virkeligheten.</p>
                     </div>` },
          ],
          quiz: [
            { type: "num", q: "Målestokk 1:200. En vegg på tegningen er 5 cm. Hvor mange cm i virkeligheten?", answer: 1000, explain: "5 · 200 = 1000 cm = 10 m." },
            { type: "num", q: "Målestokk 1:25000. 6 cm på kartet er ... meter?", answer: 1500, explain: "6 · 25000 = 150000 cm = 1500 m." },
          ]
        },
        {
          id: "g9-sannsynlig",
          title: "Sannsynlighet - kombinerte forsøk",
          summary: "Multiplisere sannsynligheter for uavhengige hendelser.",
          sections: [
            { heading: "Produktregelen",
              html: `<p>Sannsynligheten for at to uavhengige hendelser begge skal skje er produktet av sannsynlighetene.</p>
                     <div class="example"><span class="label">Eksempel</span>
                       <p>Sannsynligheten for to seksere på to terningkast: ${F("(1/6) · (1/6) = 1/36")}.</p>
                       <p>Sannsynligheten for å få mynt på to myntkast: ${F("(1/2) · (1/2) = 1/4")}.</p>
                     </div>` },
          ],
          quiz: [
            { type: "text", q: "Sannsynlighet for tre kron på rad? Svar som brøk a/b.", answer: ["1/8"], explain: "(1/2)³ = 1/8." },
            { type: "text", q: "Sannsynlighet for å trekke to ess på rad, med tilbakelegging, fra full kortstokk. Som brøk.", answer: ["1/169","16/2704"], explain: "(4/52)² = 1/169." },
          ]
        }
      ]
    },

    /* ============================== 10. TRINN ============================== */
    {
      id: 10, name: "10. trinn", tagline: "Andregradsuttrykk, kvadratsetningene, likningssett, trigonometri, funksjoner",
      topics: [
        {
          id: "g10-kvadrat",
          title: "Kvadratsetningene og konjugatsetningen",
          summary: "Tre viktige identiteter for andregradsuttrykk.",
          sections: [
            { heading: "Setningene",
              html: `${B("(a + b)² = a² + 2ab + b²")}
                     ${B("(a − b)² = a² − 2ab + b²")}
                     ${B("(a + b)(a − b) = a² − b²")}` },
            { heading: "Eksempler",
              html: `<div class="example"><span class="label">Eksempel</span>
                       <p>${F("(x + 3)² = x² + 6x + 9")}</p>
                       <p>${F("(2x - 5)² = 4x² - 20x + 25")}</p>
                       <p>${F("(x + 4)(x - 4) = x² - 16")}</p>
                     </div>` },
            { heading: "Faktorisering",
              html: `<p>Bruk setningene baklengs: ${F("x² - 25 = (x+5)(x-5)")}. ${F("x² + 10x + 25 = (x+5)²")}.</p>` },
          ],
          quiz: [
            { type: "text", q: "Regn ut: (x + 5)². Skriv på form x²+ax+b.", answer: ["x²+10x+25","x^2+10x+25"], explain: "x² + 2·5·x + 25." },
            { type: "text", q: "Regn ut: (x - 3)(x + 3). Skriv på form x²-b.", answer: ["x²-9","x^2-9"], explain: "Konjugatsetningen." },
            { type: "text", q: "Faktoriser: x² - 49. Skriv som (x+a)(x-a).", answer: ["(x+7)(x-7)","(x-7)(x+7)"], explain: "√49 = 7." },
          ]
        },
        {
          id: "g10-andregrad",
          title: "Andregradslikninger",
          summary: "Løse ved faktorisering, kvadratrot eller abc-formelen.",
          sections: [
            { heading: "Type 1: x² = k",
              html: `<p>${F("x² = 49")} ⇒ ${F("x = ±7")}.</p>` },
            { heading: "Type 2: Faktorisering",
              html: `<p>${F("x² - 5x = 0")} ⇒ ${F("x(x - 5) = 0")} ⇒ ${F("x = 0")} eller ${F("x = 5")}.</p>` },
            { heading: "abc-formelen",
              html: `<p>For ${F("ax² + bx + c = 0")}:</p>
                     ${B("x = (−b ± √(b² − 4ac)) / (2a)")}
                     <div class="example"><span class="label">Eksempel</span>
                       <p>${F("x² - 5x + 6 = 0")}: a=1, b=-5, c=6. ${F("b²-4ac = 25-24 = 1")}. ${F("x = (5 ± 1)/2")}, så ${F("x = 3")} eller ${F("x = 2")}.</p>
                     </div>` },
          ],
          quiz: [
            { type: "text", q: "Løs x² = 36. Skriv begge løsningene atskilt med komma (f.eks 6,-6).", answer: ["6,-6","-6,6"], explain: "x = ±6." },
            { type: "text", q: "Løs x² - 7x = 0. Begge løsninger, komma.", answer: ["0,7","7,0"], explain: "x(x-7)=0." },
            { type: "text", q: "Løs x² - 5x + 6 = 0. Begge løsninger, komma.", answer: ["2,3","3,2"], explain: "abc gir 2 og 3." },
            { type: "text", q: "Løs x² + 2x - 15 = 0. Begge løsninger, komma.", answer: ["3,-5","-5,3"], explain: "b²-4ac=4+60=64, √64=8, x=(-2±8)/2." },
          ]
        },
        {
          id: "g10-likningssett",
          title: "Likningssett med to ukjente",
          summary: "Innsettings- og addisjonsmetoden.",
          sections: [
            { heading: "Innsettingsmetoden",
              html: `<div class="example"><span class="label">Eksempel</span>
                       <p>${F("y = 2x + 1")} og ${F("3x + y = 11")}. Sett uttrykket for y inn: ${F("3x + 2x + 1 = 11")} ⇒ ${F("5x = 10")} ⇒ ${F("x = 2")}, og ${F("y = 5")}.</p>
                     </div>` },
            { heading: "Addisjonsmetoden",
              html: `<p>Multipliser likningene slik at en variabel forsvinner ved addisjon eller subtraksjon.</p>
                     <div class="example"><span class="label">Eksempel</span>
                       <p>${F("2x + 3y = 12")} og ${F("4x - 3y = 6")}. Legg sammen: ${F("6x = 18")} ⇒ ${F("x = 3")}, sett inn: ${F("y = 2")}.</p>
                     </div>` },
          ],
          quiz: [
            { type: "text", q: "Løs systemet x + y = 10, x - y = 4. Svar (x,y), f.eks (7,3).", answer: ["(7,3)"], explain: "Legg sammen: 2x=14, x=7, y=3." },
            { type: "text", q: "Løs 2x + y = 11, x - y = 1. Svar (x,y).", answer: ["(4,3)"], explain: "Legg sammen: 3x=12, x=4, y=3." },
          ]
        },
        {
          id: "g10-trig",
          title: "Trigonometri i rettvinklet trekant",
          summary: "Sinus, cosinus og tangens.",
          sections: [
            { heading: "Definisjoner (SOH-CAH-TOA)",
              html: `<p>I en rettvinklet trekant, med vinkel ${F("v")} (ikke den rette):</p>
                     ${B("sin v = motstående / hypotenus")}
                     ${B("cos v = hosliggende / hypotenus")}
                     ${B("tan v = motstående / hosliggende")}` },
            { heading: "Eksempel",
              html: `<div class="example"><span class="label">Eksempel</span>
                       <p>Vinkel v har motstående katet 3 og hypotenus 5. ${F("sin v = 3/5 = 0,6")}, og ${F("v ≈ 36,9°")}.</p>
                       <p>For å finne en kateten når vi vet vinkelen og hypotenusen: ${F("motstående = hyp · sin v")}.</p>
                     </div>` },
          ],
          quiz: [
            { type: "text", q: "Skriv tan(v) når motstående = 4 og hosliggende = 3. Som desimaltall med komma.", answer: ["1,333","1,33"], explain: "4/3 ≈ 1,33." },
            { type: "num", q: "Hypotenus = 10, vinkel v = 30°. Hva er motstående katet? (sin30=0,5)", answer: 5, explain: "10 · 0,5 = 5." },
            { type: "num", q: "Hypotenus = 20, vinkel = 60°. Motstående katet? (sin60≈0,866). Avrund til hel.", answer: 17, tol: 1, explain: "20·0,866 ≈ 17,3." },
          ]
        },
        {
          id: "g10-funksjon",
          title: "Funksjoner og grafer",
          summary: "Lineære, andregrads- og proporsjonale funksjoner.",
          sections: [
            { heading: "Funksjonsnotasjon",
              html: `<p>${F("f(x) = 2x + 3")} betyr at funksjonen f tar et tall x og gir 2x+3. ${F("f(4) = 11")}.</p>` },
            { heading: "Lineær",
              html: `<p>${F("f(x) = ax + b")} - rett linje, stigningstall a, skjærer y-aksen i b.</p>` },
            { heading: "Andregrads",
              html: `<p>${F("f(x) = ax² + bx + c")} - parabel. Hvis a>0 åpner den oppover, hvis a<0 nedover. Toppunkt/bunnpunkt der ${F("x = -b/(2a)")}.</p>` },
            { heading: "Omvendt proporsjonal",
              html: `<p>${F("f(x) = k/x")} - en hyperbel. Ettersom x dobles, halveres y.</p>` },
          ],
          quiz: [
            { type: "num", q: "f(x) = 3x² - 2. Hva er f(4)?", answer: 46, explain: "3·16 - 2 = 46." },
            { type: "num", q: "f(x) = x² - 4x + 5. Hva er x-koordinaten til bunnpunktet?", answer: 2, explain: "x = -b/(2a) = 4/2 = 2." },
            { type: "num", q: "f(x) = 12/x. Hva er f(3)?", answer: 4, explain: "12/3 = 4." },
          ]
        },
        {
          id: "g10-stat",
          title: "Statistikk - variasjon",
          summary: "Variasjonsbredde og hvordan tolke spredning.",
          sections: [
            { heading: "Variasjonsbredde",
              html: `<p><b>Variasjonsbredde</b> = største verdi − minste verdi.</p>
                     <div class="example"><span class="label">Eksempel</span><p>Data: 4, 7, 9, 12, 15. Variasjonsbredde = 15 − 4 = 11.</p></div>` },
            { heading: "Kvartiler (orientering)",
              html: `<p>Når data sorteres deles de i fjerdedeler. Q1 er medianen i nedre halvdel, Q3 i øvre halvdel. <i>Kvartilbredden</i> Q3 − Q1 sier hvor de midterste 50 % ligger.</p>` },
          ],
          quiz: [
            { type: "num", q: "Variasjonsbredde til 3, 8, 11, 14, 20?", answer: 17, explain: "20 - 3 = 17." },
            { type: "num", q: "Median av 5, 8, 10, 12, 15, 18, 20?", answer: 12, explain: "Midtelementet av 7 tall er det fjerde: 12." },
            { type: "num", q: "Gjennomsnitt av 6, 8, 10, 12?", answer: 9, explain: "36/4 = 9." },
          ]
        }
      ]
    },
  ]
};
