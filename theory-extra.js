/* theory-extra.js
   Enklere ("simple") og dypere ("deeper") teoriforklaringer per emne.
   topic.simple = en kort, vennlig versjon med bildet-i-hodet og enkle eksempler.
   topic.deeper = ekstra utfyllende stoff: hvorfor det fungerer, sammenhenger, vanlige feil. */

(function () {
  const F = (s) => `<span class="formula">${s}</span>`;
  const B = (s) => `<div class="block-formula">${s}</div>`;
  const V = (typeof window !== "undefined" && window.MathVisuals) || null;
  const clk = (h, m) => V ? `<span style="display:inline-block;margin:4px 6px;text-align:center;">${V.clockSVG(h, m, 110)}<br/><small style="font-size:11px;color:#555;">${V.formatTimeText(h, m)}</small></span>` : "";
  const frac = (n, d) => V ? `<span style="display:inline-block;margin:4px 8px;text-align:center;">${V.fractionCircleSVG(n, d, 80)}<br/><small style="font-size:11px;color:#555;">${n}/${d}</small></span>` : "";
  const shp = (name) => V ? `<span class="shape-label">${V.shapeSVG(name, 64)}<span>${name}</span></span>` : "";

  const THEORY = {
    /* === 1. trinn === */
    "g1-tall": {
      simple: `<p>Tall er ord vi bruker for å si <b>hvor mange</b>. Når du teller leker du, ser på en finger om gangen og sier ett nytt tall.</p>
        <p>Tegn en strek for hvert tall: |, ||, |||, |||| - sånn telte folk for veldig lenge siden.</p>
        <p>0 betyr <b>ingenting</b>. Etter 9 starter vi en ny rekke med ti-tall: 10, 11, 12, ... helt til 20.</p>`,
      deeper: `<p>Tallene vi bruker stammer fra det arabiske tallsystemet og bygger på <b>posisjon</b>: i 12 betyr 1-eren en tier og 2-eren to enere.</p>
        <p>Når vi sier at 7 er større enn 4, mener vi at hvis vi har 7 epler og du har 4, så har jeg flere. Denne ideen kalles <b>kardinalitet</b> (mengde) - i motsetning til <b>ordinalitet</b> (rekkefølge: 7. plass kommer etter 4. plass).</p>
        <p>Tipps for telling: telle ting du kan ta på (klosser, fingre) gir mest mening for hjernen.</p>`
    },
    "g1-addisjon": {
      simple: `<p>Pluss betyr å <b>legge til</b>. Hvis du har 3 godterier og får 2, har du nå 5. Vi skriver det 3 + 2 = 5.</p>
        <p>Tre triks:</p>
        <ul>
          <li><b>Tell videre</b>: Start på det største tallet. 6 + 3 → si "seks", så "syv, åtte, ni".</li>
          <li><b>Tiervennene</b>: 4 + 6 = 10. Lær disse, de er gull.</li>
          <li><b>Bytteregelen</b>: 2 + 7 er det samme som 7 + 2. Velg den letteste rekkefølgen.</li>
        </ul>`,
      deeper: `<p>Addisjon er den <b>kommutative</b> regneoperasjonen: a + b = b + a. Den er også <b>assosiativ</b>: (a + b) + c = a + (b + c).</p>
        <p>Når summen krysser 10 - som 8 + 5 - er en god teknikk å "fylle opp til 10": 8 + 2 = 10, og 10 + 3 = 13. Dette kalles <b>brovending</b> og er fundamentet for hoderegning resten av livet.</p>`
    },
    "g1-subtraksjon": {
      simple: `<p>Minus betyr å <b>ta bort</b>. Hadde du 7 kaker, spiste 3, så har du 4 igjen. 7 - 3 = 4.</p>
        <p>Tenk på det som å gå bakover på en tallrekke: start på 7, ta 3 steg tilbake → 6, 5, 4.</p>
        <p>Pluss og minus er som å spole frem og bakover på samme tape.</p>`,
      deeper: `<p>Subtraksjon kan tenkes på to måter:</p>
        <ul>
          <li><b>Ta bort</b>: jeg hadde 8, mistet 3, har 5.</li>
          <li><b>Avstand</b>: 5 og 8 - hvor langt er det imellom? 3.</li>
        </ul>
        <p>"Avstands"-tankegangen blir veldig viktig når vi senere møter negative tall: 5 - (-3) er avstanden fra -3 til 5 = 8.</p>
        <p>Subtraksjon er <b>ikke</b> kommutativ: 7 - 3 ≠ 3 - 7. Dette overrasker mange.</p>`
    },
    "g1-former": {
      simple: `<p>Former er hvordan ting <b>ser ut</b>. En pizza er rund (sirkel), et vindu er ofte firkantet, et taktilbygg har ofte tre kanter (trekant).</p>
        <p>Tell hjørnene: trekant har 3, firkant har 4. Tell sidene (de rette linjene): samme antall.</p>
        <p>En kule er som en ball - rund i alle retninger.</p>
        <div class="visual">${shp("sirkel")}${shp("trekant")}${shp("kvadrat")}${shp("rektangel")}${shp("femkant")}${shp("sekskant")}</div>`,
      deeper: `<p>Forskjellen på 2D og 3D: en sirkel er flat (du kan tegne den på et ark), en kule er romlig (har volum, kan rulle i alle retninger).</p>
        <p>Et <b>kvadrat</b> er en spesiell type rektangel der alle sidene er like lange. Alle kvadrater er rektangler, men ikke alle rektangler er kvadrater. Dette er et eksempel på et viktig prinsipp i matematikk: noen begreper er underkategorier av andre.</p>`
    },
    "g1-klokka": {
      simple: `<p>Klokka har to visere. Den korte sier <b>hvilken time</b>. Den lange sier <b>hvor langt inn i timen</b> vi er.</p>
        <p>Når den lange peker rett opp på 12, er klokka <b>hel</b>. Ser du den korte peker på 3? Da er klokka tre.</p>
        <div class="visual">${clk(3,0)}${clk(7,0)}${clk(10,0)}</div>
        <p>Eksempler over: klokka 3, klokka 7 og klokka 10.</p>`,
      deeper: `<p>Klokkesiden har 12 tall, men ett døgn har 24 timer. Derfor går klokka rundt to ganger på et døgn. Den korte viseren tar 12 timer på én runde, den lange tar 60 minutter (én time) på én runde.</p>
        <p>Sekundviseren (hvis klokka har en) tar 60 sekunder på én runde - altså ett minutt.</p>
        <div class="visual">${clk(12,0)}${clk(6,0)}</div>
        <p>Til venstre: klokka 12 (begge viserne peker opp). Til høyre: klokka 6 (kort peker ned, lang peker opp).</p>`
    },

    /* === 2. trinn === */
    "g2-tall100": {
      simple: `<p>Tall opp til 100 har <b>to siffer</b>. Det første sifferet er tiere, det andre er enere. I 47 er 4 tiere (det blir 40) og 7 er enere. Sammen blir det 40 + 7 = 47.</p>
        <p>Partall ender på 0, 2, 4, 6 eller 8. Oddetall ender på 1, 3, 5, 7 eller 9.</p>`,
      deeper: `<p>Posisjonssystemet er en av menneskehetens viktigste oppfinnelser. Tenk: med bare 10 sifre (0-9) kan vi skrive ethvert tall, bare ved at posisjonen bestemmer verdien.</p>
        <p>Det betyr at 47 og 74 ser like ut hvis vi roterer sifrene, men har helt ulike verdier. Romertall (XXIV osv.) hadde ikke dette - de er mye tyngre å regne med.</p>`
    },
    "g2-pluss100": {
      simple: `<p>For å plusse store tall, gjør én ting om gangen.</p>
        <p>23 + 14: ta tierne (20 + 10 = 30), ta enerne (3 + 4 = 7), legg sammen (30 + 7 = 37).</p>
        <p>Hvis enerne blir mer enn 10, må du "låne" en tier: 28 + 5 = 20 + 8 + 5 = 20 + 13 = 33.</p>`,
      deeper: `<p>Den klassiske oppstilte addisjonen (med siffer over hverandre) bygger på samme idé: vi summerer kolonne for kolonne, og hvis en kolonne gir mer enn 9, "henter" vi 1 inn i neste kolonne.</p>
        <p>Hoderegning er ofte raskere når vi tenker på hele tiere først: 47 + 35 = 47 + 30 + 5 = 77 + 5 = 82.</p>`
    },
    "g2-penger": {
      simple: `<p>Penger handler om å vite hvor mye du har og hvor mye du må betale. Mynter: 1, 5, 10, 20 kr. Sedler: 50, 100, 200, 500, 1000 kr.</p>
        <p>Hvis du betaler med mer enn varen koster, får du <b>vekslepenger</b> tilbake. Sjekk alltid at du får riktig tilbake.</p>`,
      deeper: `<p>Norge sluttet å bruke 50-øringen i 2012. Nå rundes summen av: 12,30 kr blir 12 kr, 12,80 kr blir 13 kr.</p>
        <p>Når du regner med penger og kommer i 0,5-tilfeller, runder norske butikker av til <b>nærmeste hele krone</b> ved kontant betaling. Ved kortbetaling brukes ofte den eksakte summen med øre.</p>`
    },
    "g2-halv": {
      simple: `<p>Lang viser på 6 = klokka er halv (halvveis gjennom timen). Lang på 3 = kvart over. Lang på 9 = kvart på.</p>
        <p>Husk: halv 3 betyr at det <b>mangler en halv time på 3</b>, altså klokka er 2:30 - ikke 3:30. Dette overrasker mange!</p>
        <div class="visual">${clk(2,30)}${clk(5,15)}${clk(8,45)}</div>
        <p>Eksempler: halv 3 (lang på 6, kort midt mellom 2 og 3), kvart over 5 (lang på 3), kvart på 9 (lang på 9).</p>`,
      deeper: `<p>"Halv tre" på norsk betyr 2:30, men på engelsk sier man "half past two" - også 2:30. Samme tid, ulike måter å snakke om den på.</p>
        <p>Hvert tall på klokkeskiven tilsvarer 5 minutter for minuttviseren. Lang viser på 4 = 4 · 5 = 20 minutter over. Lang viser på 8 = 8 · 5 = 40 minutter over (eller 20 på neste hele).</p>
        <div class="visual">${clk(3,20)}${clk(7,40)}${clk(11,55)}</div>
        <p>Eksempler: tjue over 3, tjue på 8, fem på 12.</p>`
    },

    /* === 3. trinn === */
    "g3-gange": {
      simple: `<p>Gange betyr <b>flere like grupper</b>. 3 · 4 betyr "3 grupper med 4 i hver", det vil si 4 + 4 + 4 = 12.</p>
        <p>Tegn rader: 3 rader med 4 prikker - tell prikkene. 12.</p>
        <p>Gange er bare en rask måte å plusse samme tall mange ganger.</p>`,
      deeper: `<p>Multiplikasjon er <b>gjentatt addisjon</b>, og den er kommutativ: 3 · 4 = 4 · 3. Dette ser man godt med rektangelet - om du roterer det, har det samme antall ruter.</p>
        <p>Forholdet mellom multiplikasjon og divisjon: hvis 3 · 4 = 12, så er 12 : 3 = 4 og 12 : 4 = 3. Disse tre tallene danner en <b>tallfamilie</b>.</p>
        <p>Tipp: 5-gangen er enkel fordi alle svar ender på 0 eller 5. 10-gangen er enklest av alle - bare sett en 0 bak.</p>`
    },
    "g3-divisjon": {
      simple: `<p>Divisjon betyr <b>å dele likt</b>. 12 : 3 spør: "Hvis vi deler 12 likt på 3, hvor mye får hver?" Svar: 4.</p>
        <p>Bruk gangetabellen baklengs: hvis 3 · 4 = 12, så er 12 : 3 = 4.</p>`,
      deeper: `<p>Det er to måter å tenke divisjon:</p>
        <ul>
          <li><b>Likedeling</b>: 12 deles på 3 personer. Hver får 4. (vi vet antall grupper)</li>
          <li><b>Måling</b>: 12 deles i grupper på 3. Det blir 4 grupper. (vi vet størrelsen på gruppen)</li>
        </ul>
        <p>Begge gir 12 : 3 = 4, men tankegangen er forskjellig. Forskjellen blir viktig i tekstoppgaver.</p>`
    },
    "g3-brok": {
      simple: `<p>En brøk er en <b>del</b> av noe helt. Skjær en pizza i 4 like biter. En bit er ¼ av pizzaen. To biter er ²⁄₄ (det er det samme som ½).</p>
        <p>Tallet under streken (nevneren) sier <b>i hvor mange biter</b>. Tallet over (telleren) sier <b>hvor mange biter du tar</b>.</p>
        <div class="visual">${frac(1,2)}${frac(1,3)}${frac(1,4)}${frac(3,4)}${frac(5,8)}</div>
        <p>Bildene over viser halvparten, en tredel, en fjerdedel, tre fjerdedeler og fem åttedeler.</p>`,
      deeper: `<p>Brøker er forholdstall. ¾ kan bety "tre av fire biter" (del av en hel), eller "3 delt på 4" (en divisjon). De er det samme: 3 : 4 = 0,75 = ¾.</p>
        <p>Viktig: når telleren er 1, blir brøken mindre jo større nevneren er. ⅒ er mindre enn ½, fordi å dele i 10 biter gir mindre biter enn å dele i 2.</p>`
    },
    "g3-maling": {
      simple: `<p>Vi måler for å vite "hvor stort", "hvor langt" eller "hvor tungt". Bruk riktig enhet:</p>
        <ul>
          <li>Korte ting: <b>centimeter (cm)</b> - omtrent bredden på en fingernegl.</li>
          <li>Lange ting: <b>meter (m)</b> - omtrent et langt skritt.</li>
          <li>Veldig lange: <b>kilometer (km)</b> - 1000 meter.</li>
          <li>Lette ting: <b>gram (g)</b>.</li>
          <li>Tunge ting: <b>kilogram (kg)</b> - 1000 gram.</li>
        </ul>`,
      deeper: `<p>Metersystemet er enkelt fordi alt går i tier-trinn: 1 km = 1000 m, 1 m = 100 cm, 1 cm = 10 mm. Det er derfor brukt i nesten alle land - med USA som hovedunntak.</p>
        <p>Skjønner du metersystemet, skjønner du også enheter for vekt (kg, g, mg) og volum (l, dl, cl, ml) - de bygger på samme idé.</p>`
    },

    /* === 4. trinn === */
    "g4-tabell": {
      simple: `<p>Gangetabellen er 100 svar du bør kunne raskt. Lær en rad om gangen - start med 2, 5 og 10 (de er lettest).</p>
        <p>Triks for 9-gangen: legg fingrene ned. For 9 · 4 - bøy ned 4. finger. Da har du 3 fingre til venstre (3 tiere) og 6 til høyre (6 enere) = 36.</p>`,
      deeper: `<p>Mange synes 6, 7 og 8-gangen er vanskeligst. Tipp: 6 · 8 er det samme som 8 · 6 - så bruk det du kan. 7 · 8 = 56 huskes lett som "5, 6, 7, 8".</p>
        <p>En annen huskeregel: <b>kvadrattallene</b> i diagonalen (1·1, 2·2, 3·3, ..., 10·10 = 1, 4, 9, 16, 25, 36, 49, 64, 81, 100) er ofte enklere å huske. Mellomliggende svar kan utledes: 7 · 8 = 7 · 7 + 7 = 49 + 7 = 56.</p>`
    },
    "g4-divisjon": {
      simple: `<p>Når 17 deles på 5: 5 · 3 = 15, og 17 - 15 = 2 blir til overs. Vi sier "17 : 5 = 3, rest 2".</p>
        <p>Hvis du har 23 kjeks til 4 venner, får alle 5 kjeks (5 · 4 = 20) og det er 3 igjen.</p>`,
      deeper: `<p>I divisjon med rest skriver vi: <b>dividend = divisor · kvotient + rest</b>. For 17 = 5 · 3 + 2.</p>
        <p>Senere lærer du å skrive resten som brøk eller desimaltall: 17 : 5 = 3 + 2/5 = 3,4. Da forsvinner "resten" og vi får et eksakt tall.</p>`
    },
    "g4-areal": {
      simple: `<p><b>Omkrets</b> = lengden hele veien rundt. Tenk på et gjerde rundt en hage.</p>
        <p><b>Areal</b> = hvor mye plass figuren tar. Tenk på antall ruter den dekker. For et rektangel: gang lengde med bredde.</p>`,
      deeper: `<p>Areal måles alltid i <b>kvadrate</b> enheter (cm², m², km²) fordi vi måler en flate. Når vi senere lærer volum, måler vi i <b>kubikk</b>-enheter (cm³, m³).</p>
        <p>Et viktig prinsipp: omkrets og areal henger ikke direkte sammen. To rektangler med samme omkrets kan ha veldig forskjellig areal. F.eks. 6×6 (omkrets 24, areal 36) og 1×11 (omkrets 24, areal 11).</p>`
    },
    "g4-desimal": {
      simple: `<p>Et desimaltall er et tall med <b>komma</b>. Tegnet sier "vent litt, nå kommer biter mindre enn 1".</p>
        <p>0,5 = 1/2 (en halv). 0,25 = 1/4 (en kvart). 0,1 = 1/10 (en tidel).</p>
        <p>Tenk på penger: 12,50 kr er 12 kroner og 50 øre.</p>`,
      deeper: `<p>Desimalsystemet utvider posisjonssystemet til høyre for kommaet. Der hver plass til venstre er 10 ganger mer (enere, tiere, hundrer, tusener), er hver plass til høyre 10 ganger mindre (tideler, hundredeler, tusendeler).</p>
        <p>Norsk bruker komma (3,14). Engelsk bruker punktum (3.14). Datamaskiner bruker oftest punktum. Pass på når du skifter mellom kalkulator og papir.</p>`
    },

    /* === 5. trinn === */
    "g5-brok": {
      simple: `<p>Du kan bare legge sammen brøker hvis nevnerne er like. 2/5 + 1/5 = 3/5 - bare tell tellerne.</p>
        <p>Hvis nevnerne er ulike, gjør dem like først. 1/2 + 1/4: gjør 1/2 om til 2/4, så blir det 2/4 + 1/4 = 3/4.</p>
        <p>Tenk pizza: du kan ikke addere fjerdedeler og åttedeler før de er samme bit-størrelse.</p>`,
      deeper: `<p>Å "utvide" en brøk betyr å gange teller og nevner med samme tall - verdien endres ikke. 1/2 = 2/4 = 3/6 = 50/100. Disse kalles <b>ekvivalente brøker</b>.</p>
        <p>For å finne <b>fellesnevner</b> kan du bruke produktet av nevnerne (alltid trygt), eller minste felles multippel (mer elegant). For 1/4 + 1/6 er minste felles multippel av 4 og 6 lik 12: 3/12 + 2/12 = 5/12.</p>`
    },
    "g5-prosent": {
      simple: `<p>Prosent betyr <b>per hundre</b>. 25 % = 25 av 100 = 1/4. 50 % = halvparten. 100 % = alt.</p>
        <p>For å finne 25 % av et tall: del på 4. For 50 %: del på 2. For 10 %: del på 10. For 1 %: del på 100.</p>`,
      deeper: `<p>Prosent er bare en annen måte å skrive en brøk med nevner 100. Det er praktisk fordi det er lett å sammenligne: 32 % er åpenbart større enn 28 %, mens 32/87 vs 28/75 er vanskeligere å se.</p>
        <p>I dagliglivet: prisendringer, renter, statistikk og sannsynlighet uttrykkes ofte i prosent. Det å være trygg på prosent er en av de mest praktiske matteferdighetene.</p>`
    },
    "g5-koord": {
      simple: `<p>Et koordinatsystem er som et rutenett. To linjer krysser hverandre i origo (0, 0). Den vannrette er <b>x-aksen</b>, den loddrette er <b>y-aksen</b>.</p>
        <p>Punktet (3, 5) ligger 3 til høyre, 5 opp. Alltid x først, så y - som å lese et kart.</p>`,
      deeper: `<p>René Descartes oppfant koordinatsystemet på 1600-tallet. Det er en av de viktigste oppfinnelsene i matematikk fordi det knytter sammen <b>algebra</b> (formler) og <b>geometri</b> (figurer).</p>
        <p>Når du senere tegner grafen til y = 2x + 1, plotter du bare en haug med (x, y)-punkter. Linjen oppstår fordi det er uendelig mange slike punkter.</p>`
    },
    "g5-tidsmal": {
      simple: `<p>Tidsenheter henger sammen: 60 sekunder = 1 minutt, 60 minutter = 1 time, 24 timer = 1 døgn, 7 døgn = 1 uke.</p>
        <p>For å gjøre om: gange hvis du går "ned" (timer → minutter: gang med 60), dele hvis du går "opp" (sekunder → minutter: del på 60).</p>`,
      deeper: `<p>I motsetning til lengde og vekt (som er i tier-trinn), bruker tid 60-systemet for sekunder/minutter og 24 for døgn. Dette stammer fra de gamle babylonerne, som likte tallet 60 fordi det er delelig med mange små tall (2, 3, 4, 5, 6).</p>
        <p>Det er derfor klokka går rundt 12, ikke 10 - en kulturarv som har vart i 4000 år.</p>`
    },

    /* === 6. trinn === */
    "g6-neg": {
      simple: `<p>Negative tall er tall under null. -5 betyr "fem under null". Tenk på et termometer om vinteren, eller en heis som går under første etasje.</p>
        <p>Pluss et negativt tall = trekk fra: 5 + (-3) = 5 - 3 = 2.</p>
        <p>Minus minus = pluss: 5 - (-3) = 5 + 3 = 8.</p>`,
      deeper: `<p>De negative tallene utvider tallinjen til venstre. Reglene følger av at vi vil at addisjon og subtraksjon skal være "konsistente" på begge sider av 0.</p>
        <p>Et nyttig bilde: kuldegrader. Det er -3 °C ute. Hvis det blir 5 grader varmere, er det -3 + 5 = 2 °C. Hvis det blir 5 grader kaldere, er det -3 - 5 = -8 °C.</p>
        <p>For gange og dele med negative tall: pluss · pluss = pluss, pluss · minus = minus, minus · minus = pluss. Hvorfor minus·minus blir pluss: det er <b>nødvendig</b> for at regnereglene skal henge sammen.</p>`
    },
    "g6-bdp": {
      simple: `<p>Brøk, desimaltall og prosent er <b>tre måter å skrive samme tall på</b>.</p>
        <ul>
          <li>1/2 = 0,5 = 50 %</li>
          <li>1/4 = 0,25 = 25 %</li>
          <li>3/4 = 0,75 = 75 %</li>
        </ul>
        <p>Fra brøk til desimaltall: del telleren på nevneren. Fra desimaltall til prosent: gang med 100.</p>`,
      deeper: `<p>Hver av de tre formene er nyttig i ulike situasjoner:</p>
        <ul>
          <li><b>Brøk</b>: når du deler ting eksakt (3/8 av kaken).</li>
          <li><b>Desimaltall</b>: når du regner med kalkulator eller bruker penger.</li>
          <li><b>Prosent</b>: når du skal sammenligne andeler.</li>
        </ul>
        <p>Trygghet på å gå mellom de tre er en stor frihet i regning.</p>`
    },
    "g6-geometri": {
      simple: `<p>Vinkler måles i <b>grader (°)</b>. En full omdreining er 360°. En kvart omdreining er 90° - en "rett vinkel" som hjørnet på et ark.</p>
        <p>Trekant: tre sider, tre vinkler. Summen av vinklene er alltid 180°.</p>`,
      deeper: `<p>At vinkelsummen i en trekant alltid er 180° er ikke tilfeldig. Riv av de tre hjørnene på en papirtrekant og legg dem sammen - de danner en rett linje (180°). Dette gjelder uansett hvilken form trekanten har.</p>
        <p>For mangekanter generelt: vinkelsummen er <b>(n-2) · 180°</b> der n er antall hjørner. Firkant: (4-2)·180 = 360°. Femkant: 540°. Sekskant: 720°.</p>`
    },
    "g6-sannsynlighet": {
      simple: `<p>Sannsynlighet sier <b>hvor sannsynlig</b> noe er, mellom 0 (umulig) og 1 (sikkert).</p>
        <p>P = antall måter det kan skje på / antall mulige utfall totalt.</p>
        <p>Terning - sjanse for 6: én av seks mulige tall, så P = 1/6.</p>`,
      deeper: `<p>Sannsynlighetsregning ble utviklet på 1600-tallet for å løse spørsmål om sjansespill. I dag brukes det i værmelding, medisin, forsikring, kvantefysikk og kunstig intelligens.</p>
        <p>To regneregler du møter snart:</p>
        <ul>
          <li><b>Komplement</b>: P(ikke A) = 1 - P(A). Sannsynligheten for å <i>ikke</i> få 6 er 1 - 1/6 = 5/6.</li>
          <li><b>Produkt</b>: For to uavhengige hendelser, P(A og B) = P(A) · P(B). To seksere på rad: 1/6 · 1/6 = 1/36.</li>
        </ul>`
    },

    /* === 7. trinn === */
    "g7-variabel": {
      simple: `<p>En variabel er en <b>bokstav som står for et tall vi ikke vet</b>. Ofte bruker vi x.</p>
        <p>2x betyr "to ganger x". Hvis x = 5, så er 2x = 10.</p>
        <p>3x + 4x = 7x (du kan trekke sammen like ledd). Men 3x + 2y kan ikke forenkles - de er ulike ting.</p>`,
      deeper: `<p>Algebra er som tallregning, men med <b>generelle regler</b>. Når du sier "x = uvitende alder", kan x stå for hva som helst - og uttrykkene du lager virker for ALLE verdier.</p>
        <p>Det er denne generelle kraften som gjør algebra så nyttig: én formel beskriver uendelig mange tilfeller.</p>
        <p>Vanlig forvirring: 2x betyr "2 · x", men 23 betyr "tjuetre", IKKE "2 · 3". Vi har en spesiell regel: når et tall står ved siden av en bokstav, betyr det multiplikasjon; når det står ved siden av et annet siffer, betyr det posisjonsverdi.</p>`
    },
    "g7-likning": {
      simple: `<p>En likning er som en <b>vekt</b>: venstresiden = høyresiden.</p>
        <p>Det du gjør med den ene siden, må du gjøre med den andre. Da forblir balansen.</p>
        <p>Eksempel: x + 5 = 12. Vi vil ha x alene. Trekk 5 fra begge sider: x = 7.</p>`,
      deeper: `<p>To grunnregler holder likningen i balanse:</p>
        <ul>
          <li>Plusse eller trekke fra samme tall på begge sider</li>
          <li>Gange eller dele begge sider med samme tall (men ikke 0)</li>
        </ul>
        <p>Strategi: prøv å isolere x. Først flytt alle x til én side (vanligvis venstre), så alle tall til den andre. Til slutt: del på koeffisienten foran x.</p>`
    },
    "g7-statistikk": {
      simple: `<p>Tre måter å beskrive "midten" av en gruppe tall:</p>
        <ul>
          <li><b>Gjennomsnitt</b>: legg sammen alle tall, del på hvor mange det er.</li>
          <li><b>Median</b>: tallet midt i når du sorterer alle.</li>
          <li><b>Typetall</b>: det tallet som forekommer flest ganger.</li>
        </ul>`,
      deeper: `<p>De tre kan gi <b>helt ulike</b> svar! For tallene 2, 3, 3, 4, 100:</p>
        <ul>
          <li>Gjennomsnitt: 112/5 = 22,4 (trekkes opp av "100")</li>
          <li>Median: 3 (midt i den sorterte rekken)</li>
          <li>Typetall: 3 (forekommer flest ganger)</li>
        </ul>
        <p>Når det er ekstreme verdier (uteliggere), gir median ofte et "sannere" bilde enn gjennomsnitt. Derfor rapporteres f.eks. <b>medianinntekt</b> i Norge, ikke gjennomsnittsinntekten - milliardærene ville forvrenge bildet.</p>`
    },
    "g7-volum": {
      simple: `<p>Volum sier <b>hvor mye plass</b> noe tar opp. For en eske: gang lengde · bredde · høyde.</p>
        <p>Måles i cm³ (kubikkcentimeter) eller liter. 1 liter = 1000 cm³ = en dm³-kube (10·10·10 cm).</p>`,
      deeper: `<p>Volumformelen V = l · b · h fungerer for alle rette prismer, ikke bare esker. Mer generelt: <b>V = grunnflate · høyde</b>. Det fungerer like godt for sylindere (sirkulær grunnflate) og trekantete prismer.</p>
        <p>Kobling til vekt: 1 liter vann veier 1 kg ved 4 °C. Dette er ingen tilfeldighet - det er hvordan kilogrammet opprinnelig ble definert.</p>`
    },

    /* === 8. trinn === */
    "g8-parentes": {
      simple: `<p>Tallet utenfor parentesen ganges med <b>alt</b> inni.</p>
        <p>3(x + 4) = 3·x + 3·4 = 3x + 12.</p>
        <p>Pass på fortegn: -2(x - 5) = -2·x + (-2)·(-5) = -2x + 10.</p>`,
      deeper: `<p>Den distributive loven a(b + c) = ab + ac er ikke en oppfinnelse - den er en konsekvens av hvordan multiplikasjon er definert som "gjentatt addisjon".</p>
        <p>Den motsatte operasjonen heter <b>faktorisering</b>: 6x + 9 = 3(2x + 3). Faktorisering blir veldig viktig senere når du skal løse andregradslikninger og forenkle brøker.</p>
        <p>Vanlig feil: 3(x + 4) blir ofte feil til 3x + 4. Husk: 3-eren skal gange alt!</p>`
    },
    "g8-likning": {
      simple: `<p>Strategien for en likning er alltid den samme:</p>
        <ol>
          <li>Multipliser ut parenteser.</li>
          <li>Flytt alle x til én side, alle tall til den andre.</li>
          <li>Del på det som står foran x.</li>
        </ol>`,
      deeper: `<p>Når x står på begge sider, samle dem først. 4x - 7 = 2x + 9 → trekk 2x fra begge sider: 2x - 7 = 9 → legg til 7: 2x = 16 → x = 8.</p>
        <p>Sjekk alltid svaret ved å sette inn: 4·8 - 7 = 25, og 2·8 + 9 = 25. ✓</p>
        <p>Hvis du ender med 0 = 0 har likningen uendelig mange løsninger. Hvis du ender med noe sånt som 2 = 5, finnes ingen løsning.</p>`
    },
    "g8-pyth": {
      simple: `<p>Pythagoras' setning gjelder bare <b>rettvinklete</b> trekanter (én vinkel på 90°).</p>
        <p>De to korte sidene (katetene) i kvadrat, lagt sammen, er lik den lange siden (hypotenusen) i kvadrat: a² + b² = c².</p>
        <p>Klassisk: katet 3, katet 4 → hypotenus 5 (3² + 4² = 9 + 16 = 25 = 5²).</p>`,
      deeper: `<p>Pythagoras' setning er kanskje den mest berømte formelen i geometri. Den ble kjent i Hellas for 2500 år siden, men babylonere og kinesere kjente til den enda tidligere.</p>
        <p>Anvendelser:</p>
        <ul>
          <li>Avstand mellom punkter: avstanden fra (1,2) til (4,6) er √((4-1)² + (6-2)²) = √(9 + 16) = 5.</li>
          <li>Bygg: stiger, trappetrinn, tomter - "er denne hjørnet rett?" sjekkes med 3-4-5-triks.</li>
          <li>Navigasjon, fysikk, datagrafikk - overalt der avstander betyr noe.</li>
        </ul>`
    },
    "g8-prosent": {
      simple: `<p>Tre prosenttyper du må kunne:</p>
        <ol>
          <li><b>Finn prosenten av et tall</b>: 25 % av 80 = 0,25 · 80 = 20.</li>
          <li><b>Hvor mange prosent er X av Y?</b>: 15 av 60 = 15/60 = 25 %.</li>
          <li><b>X er P % av hva?</b>: 24 er 20 % av 24/0,20 = 120.</li>
        </ol>`,
      deeper: `<p>Vekstfaktor er en superkraftig idé: <b>å øke med 20 % er å gange med 1,20</b>. Å redusere med 15 % er å gange med 0,85.</p>
        <p>Hvorfor er dette nyttig? Hvis du øker 100 kr med 20 %, og deretter reduserer med 20 %, ender du IKKE på 100. Du ender på 100 · 1,20 · 0,80 = 96 kr.</p>
        <p>Sammensatt vekst: 1000 kr med 5 % rente i 3 år = 1000 · 1,05³ = 1158 kr. Renters rente.</p>`
    },
    "g8-funksjon": {
      simple: `<p>En lineær funksjon ser slik ut: y = ax + b. Den lager en <b>rett linje</b> hvis du tegner den.</p>
        <ul>
          <li>a (stigningstallet) sier <b>hvor bratt</b> linja går - hvor mye y øker når x øker med 1.</li>
          <li>b sier <b>hvor linja krysser y-aksen</b>.</li>
        </ul>
        <p>Eksempel: taxi - 50 kr i startpris + 12 kr per km. y = 12x + 50.</p>`,
      deeper: `<p>Lineære sammenhenger er overalt i den virkelige verden: lønn (timelønn · timer + grunnlønn), strømregning, hastighet · tid = avstand.</p>
        <p>To viktige spesialtilfeller:</p>
        <ul>
          <li><b>Proporsjonal</b>: når b = 0. Da går linja gjennom origo. Dobler du x, dobler du y. Eksempel: pris = pris/kg · kg.</li>
          <li><b>Konstant</b>: når a = 0. Da er y alltid lik b uansett x. Vannrett linje.</li>
        </ul>`
    },

    /* === 9. trinn === */
    "g9-lin": {
      simple: `<p>Du kan lese eller lage en lineær funksjon fra:</p>
        <ul>
          <li><b>To punkter</b>: stigning a = (y₂-y₁)/(x₂-x₁), så finn b ved å sette inn ett punkt.</li>
          <li><b>Grafen</b>: les av hvor linja krysser y-aksen (= b), og se hvor mye den stiger per x.</li>
          <li><b>Sammenhengen</b>: f.eks. "100 kr fast pluss 20 kr per time" → y = 20x + 100.</li>
        </ul>`,
      deeper: `<p>Stigningstallet a forteller om <b>endringstakt</b>. I "100 kr + 20 kr/time" er a = 20 kr/time - prisen øker med 20 kr for hver ekstra time.</p>
        <p>To linjer er <b>parallelle</b> hvis de har samme stigningstall (de møtes aldri). De er <b>vinkelrette</b> hvis a₁ · a₂ = -1 (krysser hverandre i rett vinkel).</p>
        <p>Når du tegner en linje, holder det å plotte to punkter og trekke linja mellom dem. Velg ofte (0, b) og ett til.</p>`
    },
    "g9-ulikh": {
      simple: `<p>En ulikhet bruker > (større enn), < (mindre enn), ≥ eller ≤. Du løser den nesten som en likning.</p>
        <p><b>Viktig forskjell</b>: hvis du ganger eller deler med et negativt tall, må du <b>snu</b> ulikhetstegnet!</p>
        <p>Eks: -2x &lt; 10 → del på -2 og snu: x &gt; -5.</p>`,
      deeper: `<p>Hvorfor må vi snu? Tenk: 2 &lt; 4 er sant. Gang med -1: -2 og -4. Er -2 &lt; -4? Nei! -2 er <b>større</b> enn -4. Så ulikhetstegnet måtte snus for å forbli sant.</p>
        <p>Løsningen til en ulikhet er ikke et tall, men et <b>intervall</b>. x &gt; 3 betyr alle tall større enn 3: 3,01, 4, 100, ... Vi kan tegne dette på en tallinje med åpen sirkel ved 3.</p>`
    },
    "g9-formel": {
      simple: `<p>Lær disse formlene utenat:</p>
        <ul>
          <li>Rektangel-areal: l · b</li>
          <li>Trekant-areal: (grunnlinje · høyde) / 2</li>
          <li>Sirkel-areal: π · r²</li>
          <li>Sirkel-omkrets: 2π · r</li>
          <li>Prisme-volum: grunnflate · høyde</li>
          <li>Sylinder-volum: π · r² · h</li>
        </ul>
        <p>π (pi) ≈ 3,14.</p>`,
      deeper: `<p>π er forholdet mellom omkrets og diameter i en sirkel - det samme for alle sirkler, uansett størrelse. Det er et <b>irrasjonalt tall</b>, så det har uendelig mange desimaler uten mønster (3,14159265...).</p>
        <p>Hvorfor er trekant-arealet halvparten av rektangel-arealet? Tegn en rektangel og trekk en diagonal - du får to like trekanter. Hver er halvparten av rektangelet.</p>
        <p>Volum-formelen V = G · h fungerer for alle prismer, ikke bare rette - så lenge h er den vinkelrette høyden.</p>`
    },
    "g9-mlst": {
      simple: `<p>Målestokk er forholdet mellom <b>tegning</b> og <b>virkelighet</b>.</p>
        <p>1:100 betyr 1 cm på tegningen = 100 cm = 1 m i virkeligheten.</p>
        <p>For å finne virkelig lengde: gang lengden på tegningen med målestokken.</p>`,
      deeper: `<p>Norske topografiske kart bruker ofte målestokk 1:50 000 - så 1 cm på kartet er 500 m i virkeligheten. Et bykart kan være 1:10 000.</p>
        <p>Når du forstørrer en figur med faktor k, øker arealet med <b>k²</b> og volumet med <b>k³</b>. Doble lengdene på en eske, så blir den 8 ganger så stor i volum.</p>`
    },
    "g9-sannsynlig": {
      simple: `<p>For å finne sannsynligheten for at <b>to ting skjer etter hverandre</b> (uavhengig), gang sannsynlighetene.</p>
        <p>To kron på rad: 1/2 · 1/2 = 1/4. Tre seksere på rad: 1/6 · 1/6 · 1/6 = 1/216.</p>`,
      deeper: `<p><b>Avhengige hendelser</b> er litt vanskeligere: trekke to ess fra en kortstokk uten å legge tilbake. Først: 4/52. Andre: 3/51 (siden et ess og ett kort mindre). Total: 4/52 · 3/51 = 1/221.</p>
        <p>Mange overrasker seg over "<b>fødselsdagsparadokset</b>": i en gruppe på 23 personer er det over 50 % sjanse for at to har samme bursdag. Sannsynlighet kan oppføre seg uventet.</p>`
    },

    /* === 10. trinn === */
    "g10-kvadrat": {
      simple: `<p>Tre identiteter å huske:</p>
        <ul>
          <li>(a + b)² = a² + 2ab + b²</li>
          <li>(a - b)² = a² - 2ab + b²</li>
          <li>(a + b)(a - b) = a² - b²</li>
        </ul>
        <p>Eks: (x+3)² = x² + 6x + 9.</p>`,
      deeper: `<p>Den tredje identiteten - konjugatsetningen - er kanskje den mest brukte i algebra. Den brukes til å rasjonalisere brøker, faktorisere uttrykk og forenkle.</p>
        <p>Bevisene er enkle: bare gang ut parentesene og samle ledd. (a+b)(a+b) = a² + ab + ba + b² = a² + 2ab + b².</p>
        <p>Brukt baklengs gir det faktorisering: x² - 49 = x² - 7² = (x+7)(x-7).</p>`
    },
    "g10-andregrad": {
      simple: `<p>En andregradslikning har x² i seg. Tre metoder for å løse:</p>
        <ol>
          <li><b>Kvadratrot</b>: x² = 25 → x = ±5.</li>
          <li><b>Faktorisering</b>: x² - 5x = 0 → x(x-5) = 0 → x = 0 eller x = 5.</li>
          <li><b>Abc-formelen</b>: for ax² + bx + c = 0, x = (-b ± √(b²-4ac)) / 2a.</li>
        </ol>`,
      deeper: `<p>En andregradslikning har 0, 1 eller 2 løsninger - aldri flere. Antallet bestemmes av <b>diskriminanten</b> Δ = b² - 4ac:</p>
        <ul>
          <li>Δ &gt; 0: to løsninger</li>
          <li>Δ = 0: én løsning</li>
          <li>Δ &lt; 0: ingen reelle løsninger (parabelen krysser ikke x-aksen)</li>
        </ul>
        <p>Geometrisk er løsningene der parabelen y = ax² + bx + c krysser x-aksen.</p>`
    },
    "g10-likningssett": {
      simple: `<p>Et likningssett er to likninger med to ukjente (x og y). To metoder:</p>
        <ol>
          <li><b>Innsetting</b>: løs en likning for y, sett inn i den andre.</li>
          <li><b>Addisjon</b>: legg sammen eller trekk fra likningene slik at en variabel forsvinner.</li>
        </ol>`,
      deeper: `<p>Geometrisk: hver likning beskriver en linje. Løsningen til systemet er der linjene <b>krysser</b>.</p>
        <ul>
          <li>Én løsning: linjene krysser i ett punkt.</li>
          <li>Ingen løsning: linjene er parallelle.</li>
          <li>Uendelig mange: linjene er den samme.</li>
        </ul>
        <p>Likningssett er fundamentet for mye videregående og høyere matematikk - bl.a. lineær algebra, som driver mye av moderne dataverdens algoritmer.</p>`
    },
    "g10-trig": {
      simple: `<p>I en rettvinklet trekant kan vi koble vinkler til sidene:</p>
        <ul>
          <li><b>sin v</b> = motstående katet / hypotenus</li>
          <li><b>cos v</b> = hosliggende katet / hypotenus</li>
          <li><b>tan v</b> = motstående / hosliggende</li>
        </ul>
        <p>Huskeregel: <b>SOH-CAH-TOA</b>.</p>`,
      deeper: `<p>Trigonometri har sin opprinnelse i astronomi og navigasjon - hvordan måle avstander til steder du ikke kan gå til? Hvor høy er et fjell? Hvor langt unna er en stjerne?</p>
        <p>Sinus, cosinus og tangens er bare forhold som <b>kun avhenger av vinkelen</b>, ikke størrelsen på trekanten. Dette gjør dem ekstremt nyttige.</p>
        <p>Standardverdier å huske: sin 30° = 0,5; sin 45° = √2/2 ≈ 0,707; sin 60° = √3/2 ≈ 0,866; sin 90° = 1.</p>`
    },
    "g10-funksjon": {
      simple: `<p>En funksjon f(x) er en oppskrift: gi den en x, så får du en y.</p>
        <p>f(x) = 2x + 3 betyr "ta inntalls-x, gang med 2, legg til 3". f(4) = 11.</p>
        <p>Tre vanlige typer:</p>
        <ul>
          <li><b>Lineær</b>: ax + b. Rett linje.</li>
          <li><b>Andregrad</b>: ax² + bx + c. Parabel (åpner opp eller ned).</li>
          <li><b>Omvendt proporsjonal</b>: k/x. Hyperbel.</li>
        </ul>`,
      deeper: `<p>For en andregradsfunksjon f(x) = ax² + bx + c:</p>
        <ul>
          <li>Hvis a &gt; 0, åpner parabelen oppover - har bunnpunkt.</li>
          <li>Hvis a &lt; 0, åpner nedover - har toppunkt.</li>
          <li>x-koordinaten til topp-/bunnpunktet: x = -b/(2a).</li>
          <li>Symmetriaksen går vertikalt gjennom topp-/bunnpunktet.</li>
        </ul>
        <p>Funksjoner modellerer fysiske fenomener: kasteparabler, bevegelse, biologisk vekst.</p>`
    },
    "g10-stat": {
      simple: `<p>Variasjonsbredde = største - minste tall i datasettet. Forteller hvor spredt dataene er.</p>
        <p>Sammen med gjennomsnitt og median gir dette et godt bilde av et datasett.</p>`,
      deeper: `<p>For å si noe mer presist om spredning bruker vi <b>kvartiler</b>. Sorter dataene og del i fire like store grupper:</p>
        <ul>
          <li>Q1 = grensen mellom nedre 25 % og resten</li>
          <li>Q2 = medianen (50 %)</li>
          <li>Q3 = grensen mellom øvre 25 % og resten</li>
        </ul>
        <p><b>Kvartilbredden</b> Q3 - Q1 viser hvor de midterste 50 % ligger - et mer robust mål enn variasjonsbredden (som påvirkes av uteliggere).</p>
        <p>Disse begrepene møter du igjen i statistikk på videregående og i mer avansert dataanalyse.</p>`
    },
  };

  if (typeof CURRICULUM === "undefined") return;
  CURRICULUM.grades.forEach(g => g.topics.forEach(t => {
    const e = THEORY[t.id];
    if (!e) return;
    t.simpleHtml = e.simple || "";
    t.deeperHtml = e.deeper || "";
  }));
})();
