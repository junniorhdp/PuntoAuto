/* Mecánica & Frenos Punto Auto — renderiza la landing desde config/site.js y config/pricing.js */
(() => {
  'use strict';
  const S = window.SITE, P = window.PRICING;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  /* ---------- Utilidades ---------- */
  const waLink = (text) => `https://wa.me/${S.whatsapp}?text=${encodeURIComponent(text)}`;
  const money = (n) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: P.currency || 'COP', maximumFractionDigits: 0 }).format(n);
  const track = (name, params = {}) => {
    try {
      (window.dataLayer = window.dataLayer || []).push({ event: name, ...params });
      if (typeof window.gtag === 'function') window.gtag('event', name, params);
    } catch (_) { /* analítica opcional */ }
  };
  const to12h = (hhmm) => {
    const [h, m] = hhmm.split(':').map(Number);
    return `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
  };
  const toMin = (hhmm) => { const [h, m] = hhmm.split(':').map(Number); return h * 60 + m; };

  const ICONS = {
    check: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
    plus: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    pin: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    brake: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><circle cx="12" cy="6.5" r=".6"/><circle cx="17" cy="9" r=".6"/><circle cx="17" cy="15" r=".6"/><circle cx="12" cy="17.5" r=".6"/><circle cx="7" cy="15" r=".6"/><circle cx="7" cy="9" r=".6"/></svg>',
    suspension: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2v4M12 18v4M9 6h6M9 18h6M8 8.5l8 1.5-8 1.5 8 1.5-8 1.5 8 1.5"/></svg>',
    wrench: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.1L3.5 17.2a1.8 1.8 0 0 0 2.6 2.6l5.8-5.8a4 4 0 0 0 5.1-5.4l-2.6 2.6-2.3-.5-.5-2.3 2.6-2.6Z"/></svg>',
    scan: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M4 12h16"/></svg>'
  };

  /* ---------- Horario / estado "abierto ahora" ---------- */
  function bogotaNow() {
    const parts = new Intl.DateTimeFormat('en-US', { timeZone: S.timezone, weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
    const get = (t) => parts.find((p) => p.type === t).value;
    const wd = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
    return { day: wd, min: (Number(get('hour')) % 24) * 60 + Number(get('minute')) };
  }
  function openStatus() {
    const { day, min } = bogotaNow();
    const today = S.hours[day];
    if (today && min >= toMin(today.open) && min < toMin(today.close)) {
      return { open: true, text: `ABIERTO AHORA · CIERRA ${to12h(today.close)}` };
    }
    if (today && min < toMin(today.open)) return { open: false, text: `CERRADO · ABRE HOY ${to12h(today.open)}` };
    for (let i = 1; i <= 7; i++) {
      const d = (day + i) % 7;
      if (S.hours[d]) return { open: false, text: `CERRADO · ABRE ${i === 1 ? 'MAÑANA' : DAYS[d].toUpperCase()} ${to12h(S.hours[d].open)}` };
    }
    return { open: false, text: 'CERRADO' };
  }
  function hoursGroups() {
    const order = [1, 2, 3, 4, 5, 6, 0];
    const groups = [];
    order.forEach((d) => {
      const h = S.hours[d];
      const key = h ? `${h.open}-${h.close}` : 'x';
      const last = groups[groups.length - 1];
      if (last && last.key === key) last.days.push(d); else groups.push({ key, days: [d], h });
    });
    return groups.map((g) => {
      const label = g.days.length > 1 ? `${DAYS[g.days[0]]}–${DAYS[g.days[g.days.length - 1]]}` : DAYS[g.days[0]];
      return { label, text: g.h ? `${to12h(g.h.open)} – ${to12h(g.h.close)}` : 'Cerrado', h: g.h };
    });
  }
  const shortHours = () => {
    const g = hoursGroups().find((x) => x.h);
    return g ? `${g.label.toUpperCase()} ${g.h.open.replace(/^0/, '')}–${g.h.close}` : '';
  };
  const statusHTML = () => {
    const st = openStatus();
    return `<span class="dot ${st.open ? 'dot-metric' : ''}" aria-hidden="true"></span><span>${esc(st.text)}</span>`;
  };

  /* ---------- Texto base ---------- */
  const wa = (msg) => waLink(msg);
  const genericMsg = `Hola, quiero cotizar un servicio en ${S.name}.`;

  function renderStatic() {
    document.documentElement.lang = S.lang;
    $('#hero-eyebrow').textContent = `${S.hero.eyebrow} · ${S.city.toUpperCase()}`;
    $('#hero-title').textContent = S.hero.title;
    $('#hero-sub').textContent = S.hero.subtitle;
    $('#hero-wa').href = wa(genericMsg);
    $('#wa-float').href = wa(genericMsg);
    $('#f-wa').href = wa(genericMsg);

    $('#quick-line').innerHTML = `<span>${ICONS.pin}${esc(S.addressShort)}</span><span class="status-line" id="status-hero"></span><span>${esc(shortHours())}</span>`;
    $('#status-hero').innerHTML = statusHTML();

    $('#hero-visual').innerHTML = S.hero.image
      ? `<img src="${esc(S.hero.image)}" alt="${esc(S.hero.imageAlt)}" fetchpriority="high" width="1280" height="720">`
      : `<svg viewBox="0 0 400 400" role="img" aria-label="${esc(S.hero.imageAlt)}">
          <defs><g id="hole"><circle class="disc-hole" cx="200" cy="82" r="9"/></g></defs>
          <circle class="disc-rim" cx="200" cy="200" r="170"/>
          <circle class="disc-face" cx="200" cy="200" r="140"/>
          <circle class="disc-face" cx="200" cy="200" r="100"/>
          ${Array.from({ length: 12 }, (_, i) => `<use href="#hole" transform="rotate(${i * 30} 200 200)"/>`).join('')}
          ${Array.from({ length: 12 }, (_, i) => `<use href="#hole" transform="rotate(${i * 30 + 15} 200 200) translate(0 34)"/>`).join('')}
          <circle class="disc-hub" cx="200" cy="200" r="58"/>
          ${Array.from({ length: 5 }, (_, i) => `<circle class="disc-bolt" cx="200" cy="${200 - 36}" r="7" transform="rotate(${i * 72} 200 200)"/>`).join('')}
          <path class="disc-caliper" d="M318 118 A150 150 0 0 1 330 268"/>
          <text class="disc-note" x="200" y="392" text-anchor="middle">TODO: FOTO REAL</text>
        </svg>`;

    // Métricas (solo cifras reales)
    if (S.metrics.length) {
      $('#metrics-grid').innerHTML = S.metrics.map((m) => `<div class="metric"><p class="mono-label steel">${esc(m.label)}</p><p class="metric-value">${esc(m.value)}</p></div>`).join('');
      $('#metricas').hidden = false;
    }

    // Foto de taller
    if (S.workshop && S.workshop.image) {
      const w = $('#workshop');
      w.innerHTML = `<img src="${esc(S.workshop.image)}" alt="${esc(S.workshop.alt)}" loading="lazy" width="1920" height="800">`;
      w.hidden = false;
    }

    // Demo
    if (S.demo) {
      const m = document.createElement('meta'); m.name = 'robots'; m.content = 'noindex, nofollow'; document.head.appendChild(m);
      $('#reviews-demo').hidden = false;
    }

    // Proceso
    $('#process-list').innerHTML = S.process.map((p, i) => `<li class="card-taupe reveal"><span class="num mono-label">0${i + 1}</span><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p></li>`).join('');

    // Ubicación
    $('#ubi-title').textContent = `Estamos en ${S.neighborhood}, ${S.city}.`;
    $('#loc-address').innerHTML = `${esc(S.address)}<br><a class="link" href="tel:${esc(S.phoneHref)}" data-track="click_call">${esc(S.phone)}</a>`;
    $('#status-loc').innerHTML = statusHTML();
    $('#hours-list').innerHTML = hoursGroups().map((g) => `<div><dt>${esc(g.label)}</dt><dd>${esc(g.text)}</dd></div>`).join('');
    if (S.perks.length) { $('#perks').innerHTML = S.perks.map((p) => `<li>· ${esc(p)}</li>`).join(''); $('#perks').hidden = false; }
    $('#loc-dir').href = S.mapsLink;
    $('#loc-call').href = `tel:${S.phoneHref}`;
    $('#loc-call').textContent = `Llamar · ${S.phone}`;
    if (S.mapsEmbed) {
      const tile = $('#map-tile');
      new IntersectionObserver((e, o) => {
        if (e[0].isIntersecting) { tile.innerHTML = `<iframe src="${esc(S.mapsEmbed)}" title="Mapa de ${esc(S.name)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`; o.disconnect(); }
      }, { rootMargin: '300px' }).observe(tile);
    } else {
      $('#map-tile').innerHTML = '<div class="ph"><span class="mono-label">TODO: mapa de Google</span></div>';
    }

    // FAQ
    $('#faq-list').innerHTML = S.faq.map((f, i) => `
      <div class="acc-item reveal">
        <h3><button class="acc-btn" id="acc-b${i}" aria-expanded="false" aria-controls="acc-p${i}"><span class="acc-glyph">${ICONS.plus}</span>${esc(f.q)}</button></h3>
        <div class="acc-panel" id="acc-p${i}" role="region" aria-labelledby="acc-b${i}" hidden>${esc(f.a)}</div>
      </div>`).join('');
    $$('.acc-btn').forEach((b) => b.addEventListener('click', () => {
      const open = b.getAttribute('aria-expanded') === 'true';
      b.setAttribute('aria-expanded', String(!open));
      $('#' + b.getAttribute('aria-controls')).hidden = open;
    }));

    // Contacto
    $('#resp-time').textContent = `RESPONDEMOS EN MENOS DE ${S.responseTime}`;
    $('#guarantees').innerHTML = S.guarantees.map((g) => `<li>${ICONS.check}<span>${esc(g)}</span></li>`).join('');
    $('#contact-data').innerHTML = `${esc(S.address)} · <a class="link" href="tel:${esc(S.phoneHref)}">${esc(S.phone)}</a>`;
    $('#f-service').innerHTML = '<option value="">Selecciona un servicio</option>' + S.services.map((s) => `<option value="${esc(s.id)}">${esc(s.title)}</option>`).join('') + '<option value="otro">Otro / no estoy seguro</option>';

    // Footer
    $('#ft-name').textContent = S.name;
    $('#ft-blurb').textContent = `Frenos, suspensión y mecánica rápida en ${S.cityArea}.`;
    $('#ft-services').innerHTML = S.services.map((s) => `<li><a href="#servicios" data-svc="${esc(s.id)}">${esc(s.title)}</a></li>`).join('');
    $('#ft-packages').innerHTML = S.packages.map((p) => `<li><a href="#cotizador">${esc(p.name)}</a></li>`).join('');
    $('#ft-location').innerHTML = `<li><span>${esc(S.address)}</span></li><li><a href="tel:${esc(S.phoneHref)}">${esc(S.phone)}</a></li><li><a href="mailto:${esc(S.email)}">${esc(S.email)}</a></li>` +
      (S.social.instagram ? `<li><a href="${esc(S.social.instagram)}" target="_blank" rel="noopener">Instagram</a></li>` : '');
    $('#ft-copy').textContent = `© ${new Date().getFullYear()} ${S.legal.businessName} · NIT ${S.legal.nit} · ${S.name}${S.demo ? ' · Sitio de demostración: datos, cifras y opiniones son de ejemplo.' : ''}`;
  }

  /* ---------- Navegación ---------- */
  function renderNav() {
    const links = [['#servicios', 'Servicios'], ['#cotizador', 'Paquetes']];
    if (S.beforeAfter.length) links.push(['#antes-despues', 'Antes y después']);
    if (S.reviews.length) links.push(['#opiniones', 'Opiniones']);
    links.push(['#ubicacion', 'Ubicación']);
    const html = links.map(([h, t]) => `<a href="${h}">${t}</a>`).join('');
    $('#nav-links').innerHTML = html;
    $('#mobile-links').innerHTML = html + '<a href="#contacto">Contacto</a>';

    const btn = $('#menu-btn'), menu = $('#mobile-menu');
    const setMenu = (open) => {
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      menu.hidden = !open;
      document.body.style.overflow = open ? 'hidden' : '';
    };
    btn.addEventListener('click', () => setMenu(menu.hidden));
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) { setMenu(false); btn.focus(); } });
    matchMedia('(min-width: 1024px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });

    const header = $('#site-header');
    const onScroll = () => header.classList.toggle('scrolled', scrollY > 8);
    onScroll(); addEventListener('scroll', onScroll, { passive: true });
    new IntersectionObserver((e) => header.classList.toggle('past-hero', !e[0].isIntersecting), { rootMargin: `-${44}px 0px 0px 0px` }).observe($('#inicio'));
  }

  /* ---------- Servicios (close-look) ---------- */
  function renderServices() {
    const tabs = $('#service-tabs'), panel = $('#service-panel');
    let active = S.services[0].id;
    const fromPrice = (id) => (P.publish && P.servicesFrom[id] ? `DESDE ${money(P.servicesFrom[id])} · ` : '');
    const body = (s) => `
      <div class="service-tile">${s.image ? `<img src="${esc(s.image)}" alt="${esc(s.imageAlt)}" loading="lazy" width="1200" height="900">` : `<div class="ph" role="img" aria-label="${esc(s.imageAlt)}">${ICONS[s.icon] || ''}<span class="mono-label">TODO: foto real</span></div>`}</div>
      <div class="service-body">
        <h3 class="service-title">${esc(s.title)}</h3>
        <p class="desc">${esc(s.description)}</p>
        <p class="mono-label">${esc(s.specs)}</p>
        <p class="mono-label">${fromPrice(s.id)}${esc(s.time)}</p>
        <a class="arrow" href="${wa(`Hola, quiero cotizar ${s.title.toLowerCase()}.`)}" target="_blank" rel="noopener" data-track="click_whatsapp">Cotizar este servicio →</a>
      </div>`;
    const paint = () => {
      $$('.chip-dark', tabs).forEach((b) => { b.setAttribute('aria-selected', String(b.dataset.id === active)); b.tabIndex = b.dataset.id === active ? 0 : -1; });
      panel.innerHTML = body(S.services.find((s) => s.id === active));
      panel.setAttribute('aria-labelledby', 'tab-' + active);
    };
    tabs.innerHTML = S.services.map((s) => `<button class="chip-dark" role="tab" id="tab-${esc(s.id)}" data-id="${esc(s.id)}" aria-selected="false"><span class="dot" aria-hidden="true"></span>${esc(s.name)}</button>`).join('');
    const select = (id) => {
      if (id === active) return;
      active = id;
      if (reduceMotion) { paint(); return; }
      panel.classList.add('fading');
      setTimeout(() => { paint(); panel.classList.remove('fading'); }, 300);
    };
    tabs.addEventListener('click', (e) => { const b = e.target.closest('.chip-dark'); if (b) select(b.dataset.id); });
    tabs.addEventListener('keydown', (e) => {
      const keys = ['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft'];
      if (!keys.includes(e.key)) return;
      e.preventDefault();
      const i = S.services.findIndex((s) => s.id === active);
      const n = (i + (e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : -1) + S.services.length) % S.services.length;
      select(S.services[n].id);
      setTimeout(() => $('#tab-' + S.services[n].id).focus(), reduceMotion ? 0 : 320);
    });
    $('#ft-services').addEventListener('click', (e) => { const a = e.target.closest('[data-svc]'); if (a) select(a.dataset.svc); });
    paint();
  }

  /* ---------- Antes / después ---------- */
  function renderBeforeAfter() {
    if (!S.beforeAfter.length) return;
    $('#antes-despues').hidden = false;
    $('#ba-grid').innerHTML = S.beforeAfter.map((b, i) => `
      <figure class="reveal">
        <div class="ba" style="--pos:50%">
          <img src="${esc(b.before)}" alt="Antes: ${esc(b.alt)}" loading="lazy">
          <img class="after" src="${esc(b.after)}" alt="Después: ${esc(b.alt)}" loading="lazy">
          <span class="ba-tag l">ANTES</span><span class="ba-tag r">DESPUÉS</span>
          <span class="ba-line"></span><span class="ba-handle" aria-hidden="true">↔</span>
          <input type="range" min="0" max="100" value="50" step="1" aria-label="Comparar antes y después ${i + 1}">
        </div>
        <figcaption class="mono-label ba-caption">${esc(b.caption)}</figcaption>
      </figure>`).join('');
    $$('.ba').forEach((box) => $('input', box).addEventListener('input', (e) => box.style.setProperty('--pos', e.target.value + '%')));
    if (S.social.instagram) {
      const m = $('#ba-more'); m.hidden = false;
      m.innerHTML = `<a href="${esc(S.social.instagram)}" target="_blank" rel="noopener">Ver más en Instagram →</a> <span class="mono-label steel">@${esc(S.social.instagramHandle)}</span>`;
    }
  }

  /* ---------- Opiniones ---------- */
  function renderReviews() {
    if (!S.reviews.length) return;
    $('#opiniones').hidden = false;
    if (S.rating) { const r = $('#rating-big'); r.hidden = false; r.textContent = `${S.rating.value}★ · ${S.rating.count} reseñas en Google`; }
    const car = $('#reviews-carousel');
    car.innerHTML = S.reviews.map((r) => `
      <blockquote class="card-taupe review" style="margin:0">
        <div class="stars" aria-label="${r.stars || 5} de 5 estrellas">${'★'.repeat(r.stars || 5)}</div>
        <p>${esc(r.text)}</p>
        <footer><strong>${esc(r.name)}</strong><br>${esc(r.vehicle)} · ${esc(r.service)}</footer>
      </blockquote>`).join('');
    const step = () => (car.firstElementChild?.getBoundingClientRect().width || 300) + 16;
    $('#rev-prev').addEventListener('click', () => car.scrollBy({ left: -step(), behavior: reduceMotion ? 'auto' : 'smooth' }));
    $('#rev-next').addEventListener('click', () => car.scrollBy({ left: step(), behavior: reduceMotion ? 'auto' : 'smooth' }));
  }

  /* ---------- Paquetes y cotizador ---------- */
  function renderQuote() {
    const priceText = (id) => (P.publish && P.packagesFrom[id] ? `DESDE ${money(P.packagesFrom[id])}` : 'COTIZACIÓN PERSONALIZADA');
    $('#packages').innerHTML = S.packages.map((p) => `
      <article class="pkg reveal ${p.recommended ? 'rec' : ''}">
        <div class="pkg-head"><span class="mono-label graphite">${esc(p.tier)}</span>${p.badge ? `<span class="badge">${esc(p.badge)}</span>` : ''}</div>
        <h3>${esc(p.name)}</h3>
        <p class="mono-label pkg-price">${esc(priceText(p.id))}</p>
        <ul>${p.includes.map((i) => `<li>${ICONS.check}<span>${esc(i)}</span></li>`).join('')}</ul>
        <a class="btn ${p.recommended ? 'btn-primary' : 'btn-secondary'}" href="${wa(`Hola, quiero cotizar el paquete ${p.name} (${p.tier}).`)}" target="_blank" rel="noopener" data-track="click_whatsapp">Cotizar este paquete</a>
      </article>`).join('');

    const state = { vehicle: S.quote.vehicles[0].id, services: new Set(), extras: new Set() };
    const vBox = $('#q-vehicles'), sBox = $('#q-services'), xBox = $('#q-extras');
    vBox.innerHTML = S.quote.vehicles.map((v) => `<button type="button" class="chip" data-id="${esc(v.id)}" aria-pressed="${v.id === state.vehicle}">${esc(v.label)}</button>`).join('');
    sBox.innerHTML = S.services.map((s) => `<button type="button" class="chip" data-id="${esc(s.id)}" aria-pressed="false">${esc(s.name)}</button>`).join('');
    xBox.innerHTML = S.quote.extras.map((x) => `<label class="check"><input type="checkbox" data-id="${esc(x.id)}">${esc(x.label)}</label>`).join('');

    let started = false;
    const markStarted = () => { if (!started) { started = true; track('quote_started'); } };

    const estimate = () => {
      if (!P.publish) return null;
      let min = 0, max = 0;
      const items = [...[...state.services].map((id) => P.services[id]), ...[...state.extras].map((id) => P.extras[id])];
      for (const it of items) { if (!it || it.min == null || it.max == null) return null; min += it.min; max += it.max; }
      const f = P.vehicleFactor[state.vehicle] ?? 1;
      const round = (n) => Math.round((n * f) / 1000) * 1000;
      return `${money(round(min))} – ${money(round(max))}`;
    };
    const update = () => {
      const has = state.services.size > 0;
      const est = has ? estimate() : null;
      const text = !has ? 'Elige un servicio' : est || 'Cotización personalizada';
      $('#q-estimate').textContent = text;
      $('#qb-estimate').textContent = text;
      $('#q-hint').hidden = has;
      const names = S.services.filter((s) => state.services.has(s.id)).map((s) => s.name.toLowerCase()).join(', ');
      const veh = S.quote.vehicles.find((v) => v.id === state.vehicle).label.toLowerCase();
      const ex = S.quote.extras.filter((x) => state.extras.has(x.id)).map((x) => x.label.toLowerCase()).join(', ') || 'ninguno';
      const msg = `Hola, quiero cotizar ${names} para un ${veh}. Extras: ${ex}. Estimado: ${est || 'por confirmar'}.`;
      ['#q-send', '#qb-send'].forEach((sel) => {
        const a = $(sel);
        a.setAttribute('aria-disabled', String(!has));
        a.href = has ? wa(msg) : '#';
        a.tabIndex = has ? 0 : -1;
      });
    };
    vBox.addEventListener('click', (e) => {
      const b = e.target.closest('.chip'); if (!b) return;
      state.vehicle = b.dataset.id; markStarted();
      $$('.chip', vBox).forEach((c) => c.setAttribute('aria-pressed', String(c === b))); update();
    });
    sBox.addEventListener('click', (e) => {
      const b = e.target.closest('.chip'); if (!b) return;
      const id = b.dataset.id; markStarted();
      state.services.has(id) ? state.services.delete(id) : state.services.add(id);
      b.setAttribute('aria-pressed', String(state.services.has(id))); update();
    });
    xBox.addEventListener('change', (e) => {
      const id = e.target.dataset.id; markStarted();
      e.target.checked ? state.extras.add(id) : state.extras.delete(id); update();
    });
    update();

    // Barra inferior (móvil) visible mientras el cotizador está en pantalla
    const bar = $('#quote-bar');
    new IntersectionObserver((e) => { bar.hidden = !e[0].isIntersecting; syncWa(); }, { threshold: 0.1 }).observe($('#quote-card'));
  }

  /* ---------- WhatsApp flotante ---------- */
  let formVisible = false;
  function syncWa() {
    const mobile = !matchMedia('(min-width: 768px)').matches;
    $('#wa-float').classList.toggle('suppress', mobile && (!$('#quote-bar').hidden || formVisible));
  }
  function initWaFloat() {
    const w = $('#wa-float');
    const show = () => w.classList.add('show');
    setTimeout(show, 3000);
    new IntersectionObserver((e) => { if (!e[0].isIntersecting) show(); }).observe($('#inicio'));
    new IntersectionObserver((e) => { formVisible = e[0].isIntersecting; syncWa(); }, { threshold: 0.1 }).observe($('#lead-form'));
    addEventListener('resize', syncWa);
  }

  /* ---------- Formulario ---------- */
  function initForm() {
    const form = $('#lead-form'), status = $('#form-status'), btn = $('#f-submit');
    const rules = {
      name: (v) => (v.trim().length < 2 ? 'Escribe tu nombre.' : ''),
      phone: (v) => (/^\+?[\d\s()-]{7,15}$/.test(v.trim()) && v.replace(/\D/g, '').length >= 7 ? '' : 'Escribe un número de WhatsApp válido.'),
      service: (v) => (v ? '' : 'Selecciona un servicio.'),
      consent: (_, el) => (el.checked ? '' : 'Debes autorizar el tratamiento de tus datos.')
    };
    const setErr = (name, msg) => {
      const el = form.elements[name], box = $('#e-' + name);
      el.setAttribute('aria-invalid', String(!!msg));
      if (msg) { el.setAttribute('aria-describedby', 'e-' + name); box.textContent = msg; box.hidden = false; } else { el.removeAttribute('aria-describedby'); box.hidden = true; }
      return !msg;
    };
    const validate = () => {
      let first = null;
      for (const n of Object.keys(rules)) {
        const el = form.elements[n];
        if (!setErr(n, rules[n](el.value, el)) && !first) first = el;
      }
      return first;
    };
    Object.keys(rules).forEach((n) => form.elements[n].addEventListener('blur', () => setErr(n, rules[n](form.elements[n].value, form.elements[n]))));
    const setStatus = (cls, html) => { status.className = 'form-status ' + cls; status.innerHTML = html; };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (form.elements.website.value) return;               // honeypot
      const bad = validate();
      if (bad) { bad.focus(); return; }
      const d = Object.fromEntries(new FormData(form));
      const svc = S.services.find((s) => s.id === d.service)?.title || 'otro servicio';
      const msg = `Hola, soy ${d.name}. Quiero cotizar: ${svc}.` + (d.vehicle ? ` Vehículo: ${d.vehicle}.` : '') + (d.date ? ` Fecha preferida: ${d.date}.` : '') + (d.message ? ` ${d.message}` : '') + ` Mi WhatsApp: ${d.phone}.`;
      const fallback = `<a class="link" href="${wa(msg)}" target="_blank" rel="noopener">Escríbenos por WhatsApp</a>`;
      if (!S.formEndpoint) {
        window.open(wa(msg), '_blank', 'noopener');
        setStatus('ok', 'Listo. Te abrimos WhatsApp con tu solicitud para enviarla.');
        form.reset();
        return;
      }
      btn.disabled = true; btn.textContent = 'Enviando…'; setStatus('', '');
      try {
        const res = await fetch(S.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ name: d.name, phone: d.phone, vehicle: d.vehicle, service: svc, date: d.date, message: d.message, consent: true, source: location.href }) });
        if (!res.ok) throw new Error(res.status);
        setStatus('ok', `Recibimos tu solicitud. Te respondemos en menos de ${S.responseTime.toLowerCase().replace('min', 'min')}.`);
        form.reset();
      } catch (_) {
        setStatus('bad', `No pudimos enviar el formulario. ${fallback}.`);
      } finally { btn.disabled = false; btn.textContent = 'Solicitar cotización'; }
    });
  }

  /* ---------- Reveal, analítica y SEO ---------- */
  function initReveal() {
    const items = $$('.reveal');
    if (reduceMotion || !('IntersectionObserver' in window)) { items.forEach((i) => i.classList.add('in')); return; }
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    }), { threshold: 0.12 });
    items.forEach((el) => {
      const sibs = el.parentElement ? [...el.parentElement.children].filter((c) => c.classList.contains('reveal')) : [];
      el.style.transitionDelay = `${Math.max(0, sibs.indexOf(el)) * 60}ms`;
      io.observe(el);
    });
  }
  function initTracking() {
    document.addEventListener('click', (e) => {
      const el = e.target.closest('[data-track]');
      if (el && el.getAttribute('aria-disabled') !== 'true') track(el.dataset.track);
    });
  }
  function injectJsonLd() {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const ld = {
      '@context': 'https://schema.org',
      '@type': ['AutoRepair', 'LocalBusiness'],
      name: S.name, url: S.url, telephone: S.phoneHref, email: S.email,
      address: { '@type': 'PostalAddress', streetAddress: S.address, addressLocality: S.city, addressCountry: 'CO' },
      areaServed: S.cityArea.split('/').map((c) => c.trim()),
      openingHoursSpecification: Object.entries(S.hours).filter(([, h]) => h).map(([d, h]) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: dayNames[d], opens: h.open, closes: h.close })),
      sameAs: [S.social.instagram, S.social.facebook].filter(Boolean),
      hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Servicios', itemListElement: S.services.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.title, description: s.description } })) }
    };
    if (S.geo.lat != null) ld.geo = { '@type': 'GeoCoordinates', latitude: S.geo.lat, longitude: S.geo.lng };
    if (S.rating && S.reviews.length) ld.aggregateRating = { '@type': 'AggregateRating', ratingValue: S.rating.value, reviewCount: S.rating.count };
    const faq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: S.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };
    [ld, faq].forEach((o) => { const s = document.createElement('script'); s.type = 'application/ld+json'; s.textContent = JSON.stringify(o); document.head.appendChild(s); });
  }

  /* ---------- Init ---------- */
  renderStatic(); renderNav(); renderServices(); renderBeforeAfter(); renderReviews(); renderQuote();
  initWaFloat(); initForm(); initTracking(); injectJsonLd(); initReveal();
  setInterval(() => { $$('#status-hero, #status-loc').forEach((el) => { el.innerHTML = statusHTML(); }); }, 60000);
})();
