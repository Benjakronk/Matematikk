/* visuals.js
   SVG-genererte illustrasjoner brukt i teori og oppgaver. Eksporteres som global MathVisuals. */

(function () {
  function rad(deg) { return (deg - 90) * Math.PI / 180; }

  function clockSVG(hour, minute, size) {
    size = size || 130;
    const cx = size / 2, cy = size / 2;
    const r = size / 2 - 6;
    const minuteAngle = (minute / 60) * 360;
    const hourAngle = (((hour % 12) + minute / 60) / 12) * 360;

    // Tall 1-12
    let nums = "";
    for (let n = 1; n <= 12; n++) {
      const a = rad(n * 30);
      const x = cx + Math.cos(a) * (r - 14);
      const y = cy + Math.sin(a) * (r - 14) + 4;
      nums += `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="middle" font-size="${Math.round(size * 0.11)}" font-family="Segoe UI, Arial, sans-serif" font-weight="600" fill="#11203a">${n}</text>`;
    }
    // Minuttmerker
    let ticks = "";
    for (let i = 0; i < 60; i++) {
      const a = rad(i * 6);
      const r1 = r - (i % 5 === 0 ? 5 : 2);
      const r2 = r - 1;
      const x1 = cx + Math.cos(a) * r1, y1 = cy + Math.sin(a) * r1;
      const x2 = cx + Math.cos(a) * r2, y2 = cy + Math.sin(a) * r2;
      ticks += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#11203a" stroke-width="${i % 5 === 0 ? 1.2 : 0.5}"/>`;
    }

    const hourLen = r * 0.5, minLen = r * 0.78;
    const ha = rad(hourAngle), ma = rad(minuteAngle);
    const hx = cx + Math.cos(ha) * hourLen, hy = cy + Math.sin(ha) * hourLen;
    const mx = cx + Math.cos(ma) * minLen, my = cy + Math.sin(ma) * minLen;

    return `<svg class="clock-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" aria-label="Klokke som viser ${formatTimeText(hour, minute)}">
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff" stroke="#11203a" stroke-width="2"/>
      ${ticks}
      ${nums}
      <line x1="${cx}" y1="${cy}" x2="${hx.toFixed(1)}" y2="${hy.toFixed(1)}" stroke="#11203a" stroke-width="3.5" stroke-linecap="round"/>
      <line x1="${cx}" y1="${cy}" x2="${mx.toFixed(1)}" y2="${my.toFixed(1)}" stroke="#2d5bff" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="${cx}" cy="${cy}" r="${size*0.025}" fill="#11203a"/>
    </svg>`;
  }

  function formatTimeText(h, m) {
    h = ((h % 12) + 12) % 12; if (h === 0) h = 12;
    const hh = String(h);
    const mm = String(m).padStart(2, "0");
    return `${hh}:${mm}`;
  }

  function fractionCircleSVG(num, den, size) {
    size = size || 90;
    const cx = size / 2, cy = size / 2, r = size / 2 - 4;
    let slices = "";
    for (let i = 0; i < den; i++) {
      const a1 = rad((i / den) * 360);
      const a2 = rad(((i + 1) / den) * 360);
      const x1 = cx + Math.cos(a1) * r, y1 = cy + Math.sin(a1) * r;
      const x2 = cx + Math.cos(a2) * r, y2 = cy + Math.sin(a2) * r;
      const large = (1 / den) > 0.5 ? 1 : 0;
      const path = `M ${cx} ${cy} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`;
      const fill = i < num ? "#2d5bff" : "#e6edff";
      slices += `<path d="${path}" fill="${fill}" stroke="#11203a" stroke-width="1"/>`;
    }
    return `<svg class="frac-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" aria-label="Brøk ${num}/${den}">${slices}</svg>`;
  }

  function shapeSVG(name, size) {
    size = size || 70;
    const c = size / 2, r = size * 0.42;
    const stroke = `stroke="#11203a" stroke-width="2" fill="#e6edff"`;
    let body = "";
    switch (name) {
      case "sirkel": body = `<circle cx="${c}" cy="${c}" r="${r}" ${stroke}/>`; break;
      case "trekant": {
        const h = r * Math.sqrt(3);
        body = `<polygon points="${c},${c - h*0.6} ${c - r},${c + h*0.4} ${c + r},${c + h*0.4}" ${stroke}/>`;
        break;
      }
      case "kvadrat": body = `<rect x="${c - r*0.9}" y="${c - r*0.9}" width="${r*1.8}" height="${r*1.8}" ${stroke}/>`; break;
      case "rektangel": body = `<rect x="${c - r}" y="${c - r*0.55}" width="${r*2}" height="${r*1.1}" ${stroke}/>`; break;
      case "femkant": {
        let pts = [];
        for (let i = 0; i < 5; i++) {
          const a = rad(i * 72);
          pts.push(`${(c + Math.cos(a) * r).toFixed(1)},${(c + Math.sin(a) * r).toFixed(1)}`);
        }
        body = `<polygon points="${pts.join(" ")}" ${stroke}/>`;
        break;
      }
      case "sekskant": {
        let pts = [];
        for (let i = 0; i < 6; i++) {
          const a = rad(i * 60);
          pts.push(`${(c + Math.cos(a) * r).toFixed(1)},${(c + Math.sin(a) * r).toFixed(1)}`);
        }
        body = `<polygon points="${pts.join(" ")}" ${stroke}/>`;
        break;
      }
      default: body = `<circle cx="${c}" cy="${c}" r="${r}" ${stroke}/>`;
    }
    return `<svg class="shape-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" aria-label="${name}">${body}</svg>`;
  }

  function rightTriangleSVG(a, b, size) {
    size = size || 140;
    const pad = 18;
    const scale = Math.min((size - 2 * pad) / Math.max(a, b), 14);
    const ax = a * scale, by = b * scale;
    const x0 = pad, y0 = size - pad;
    const x1 = x0 + ax, y1 = y0;
    const x2 = x0, y2 = y0 - by;
    return `<svg class="tri-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
      <polygon points="${x0},${y0} ${x1},${y1} ${x2},${y2}" fill="#e6edff" stroke="#11203a" stroke-width="2"/>
      <rect x="${x0}" y="${y0-10}" width="10" height="10" fill="none" stroke="#11203a" stroke-width="1"/>
      <text x="${(x0+x1)/2}" y="${y0+14}" text-anchor="middle" font-size="12" font-family="Segoe UI, Arial">a = ${a}</text>
      <text x="${x0-6}" y="${(y0+y2)/2}" text-anchor="end" font-size="12" font-family="Segoe UI, Arial">b = ${b}</text>
      <text x="${(x1+x2)/2 + 8}" y="${(y1+y2)/2 - 4}" font-size="12" font-family="Segoe UI, Arial" fill="#2d5bff">c = ?</text>
    </svg>`;
  }

  window.MathVisuals = { clockSVG, fractionCircleSVG, shapeSVG, rightTriangleSVG, formatTimeText };
})();
