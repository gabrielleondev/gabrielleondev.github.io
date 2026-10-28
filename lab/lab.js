/* Gabriel Leon — versión "lab"
   Idioma, tema, menú y cinco animaciones: hélice de ADN, cinta de secuencia,
   mapa de calor que se agrupa solo, red neuronal y bacterias que se dividen. */
(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* modo privado */ } }
  };
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ------------------------------------------------------------------
     Textos en español (el HTML trae el inglés)
     ------------------------------------------------------------------ */
  var ES = {
    "skip": "Saltar al contenido",
    "nav.about": "Sobre mí", "nav.research": "Investigación", "nav.ai": "IA × Bio",
    "nav.toolkit": "Herramientas", "nav.contact": "Contacto", "nav.status": "pipeline en marcha",

    "hero.eyebrow": "biología computacional · IA · infección",
    "hero.lead": "Estudiante de microbiología en la Universidad de Antioquia. Escribo Python y R para leer la respuesta del huésped a la infección en datos transcriptómicos públicos, y voy rumbo a la IA aplicada a la biología.",
    "hero.cta": "Abrir el cuaderno de laboratorio",
    "hero.hint": "pasa el cursor para separar las hebras",
    "hud.pos": "pos", "hud.pair": "par",

    "about.title": "Sobre mí",
    "about.p1": "Soy estudiante de Microbiología y Bioanálisis en la Universidad de Antioquia, en Medellín, Colombia. Me atrae el punto donde el laboratorio se encuentra con el computador: usar datos públicos y código reproducible para entender cómo responde el cuerpo a una infección.",
    "about.p2": "Mientras estudio he trabajado en calidad de datos y atención bilingüe, revisando cientos de casos al día contra reglas detalladas. Ese hábito de revisar cada registro con cuidado es el mismo que llevo al análisis.",
    "about.sample": "MUESTRA",
    "about.f1k": "Estudios", "about.f1v": "Microbiología y Bioanálisis, Universidad de Antioquia (en curso)",
    "about.f2k": "Ciudad", "about.f3k": "Idiomas", "about.f3v": "Español (nativo) · Inglés (C1)",
    "about.f4k": "Intereses", "about.f4v": "Transcriptómica huésped–patógeno, enfermedades infecciosas, IA en biología",

    "research.title": "Investigación", "research.status": "En curso",
    "research.ptitle": "Interferón tipo I en tuberculosis y leishmaniasis cutánea",
    "research.p1": "Dos infecciones muy distintas comparten una misma célula hospedera: el macrófago. Este proyecto busca qué parte de la respuesta de interferón tipo I en sangre es común a la tuberculosis y a la leishmaniasis cutánea, qué parte es propia de cada enfermedad y si esa respuesta sigue el resultado del tratamiento.",
    "research.p2": "La primera fase reanaliza cohortes públicas de tuberculosis. Cada cohorte se analiza por separado, y cada hallazgo se vuelve a probar en estudios independientes antes de darlo por válido.",
    "research.s1t": "Cohortes públicas", "research.s1d": "Datos de RNA-seq y microarreglos de NCBI GEO",
    "research.s2t": "Puntajes por conjunto de genes", "research.s2d": "z-scores dentro de cada cohorte, sin mezclar estudios",
    "research.s3t": "Desempeño diagnóstico", "research.s3d": "Curvas ROC con intervalos de confianza por bootstrap",
    "research.s4t": "Validación independiente", "research.s4d": "Cada resultado se comprueba de nuevo en otras cohortes",
    "research.note": "Reproducible en Python y en R. Por ahora el repositorio es privado, hasta que se publiquen los resultados.",
    "research.hmShuffled": "muestras desordenadas", "research.hmClustering": "agrupando…",
    "research.hmClustered": "agrupadas · k = 3", "research.hmAxis": "genes × muestras",

    "ai.title": "IA × Biología",
    "ai.p1": "Hacia dónde voy: aprendizaje automático sobre datos biológicos. Un perfil de expresión son miles de medidas por paciente, justo el tipo de señal en que los modelos son buenos, siempre que cada resultado se valide con el mismo cuidado que en el laboratorio.",
    "ai.l1": "Clasificadores construidos sobre firmas génicas",
    "ai.l2": "Validación honesta en cohortes independientes",
    "ai.l3": "Modelos que un biólogo pueda leer y cuestionar",
    "ai.in": "genes", "ai.hidden": "capas ocultas", "ai.out": "fenotipo",

    "projects.title": "Otros proyectos",
    "projects.ogl": "Un editor de escenas 3D escrito en Python con OpenGL. Carga modelos .obj con texturas y colores por vértice, los mueve con gizmos en pantalla, agrega luces de colores y permite recorrer la escena con una cámara tipo FPS. Las escenas se guardan en JSON para que otros programas las carguen.",
    "projects.tag3d": "Gráficos 3D", "projects.view": "Ver en GitHub",
    "projects.soonTitle": "Vienen más", "projects.soon": "Aquí irán apareciendo nuevos análisis y herramientas a medida que los publique en GitHub.",
    "projects.all": "Todos los repositorios",

    "toolkit.title": "Tabla periódica de mis herramientas",

    "exp.title": "Experiencia", "exp.w1": "2024 – hoy",
    "exp.r1": "Analista de calidad de contenido", "exp.t1": "Reviso más de 400 casos al día contra políticas detalladas del cliente y acompaño a analistas nuevos.",
    "exp.r2": "Asistente virtual bilingüe", "exp.o2": "Independiente · Remoto", "exp.t2": "Agendas, reportes y bases de datos para clientes internacionales.",
    "exp.r3": "Representante de servicio al cliente", "exp.t3": "Atención a pacientes de EE. UU. en un entorno de salud regulado por HIPAA.",

    "contact.title": "Hagamos crecer algo juntos.",
    "contact.text": "Con gusto converso sobre bioinformática, biología de las infecciones o colaborar en análisis con datos abiertos. GitHub es el mejor lugar para encontrarme.",
    "footer.built": "HTML, CSS y JS escritos a mano · GitHub Pages",
    "footer.top": "Volver arriba ↑"
  };
  // textos que solo pone el JavaScript
  var EN_EXTRA = { "research.hmClustering": "clustering…", "research.hmClustered": "clustered · k = 3" };

  var META = {
    en: { title: "Gabriel Leon · Computational Biology Lab", langBtn: "ES", langAria: "Cambiar a español", themeAria: "Toggle dark mode", menuOpen: "Open menu", menuClose: "Close menu" },
    es: { title: "Gabriel Leon · Laboratorio de Biología Computacional", langBtn: "EN", langAria: "Switch to English", themeAria: "Cambiar modo oscuro", menuOpen: "Abrir menú", menuClose: "Cerrar menú" }
  };

  var nodes = Array.prototype.slice.call(document.querySelectorAll("[data-i18n]"));
  var EN = {};
  nodes.forEach(function (el) { EN[el.getAttribute("data-i18n")] = el.innerHTML; });
  Object.keys(EN_EXTRA).forEach(function (k) { EN[k] = EN_EXTRA[k]; });

  function lang() { return root.lang === "es" ? "es" : "en"; }
  function t(key) { var d = lang() === "es" ? ES : EN; return d[key] != null ? d[key] : EN[key]; }

  var langBtn = document.getElementById("lang-toggle");
  var themeBtn = document.getElementById("theme-toggle");
  var menuBtn = document.getElementById("menu-toggle");
  var links = document.getElementById("nav-links");
  var langListeners = [];

  function setLang(l) {
    root.lang = l;
    nodes.forEach(function (el) { el.innerHTML = t(el.getAttribute("data-i18n")); });
    var m = META[l];
    document.title = m.title;
    langBtn.querySelector("[data-lang-label]").textContent = m.langBtn;
    langBtn.setAttribute("aria-label", m.langAria);
    themeBtn.setAttribute("aria-label", m.themeAria);
    menuBtn.setAttribute("aria-label", links.classList.contains("is-open") ? m.menuClose : m.menuOpen);
    langListeners.forEach(function (fn) { fn(l); });
  }
  langBtn.addEventListener("click", function () {
    var next = lang() === "es" ? "en" : "es";
    store.set("lang", next);
    setLang(next);
  });

  /* ------------------------------------------------------------------
     Tema (claro por defecto) y colores que leen los dibujos
     ------------------------------------------------------------------ */
  var palette = {};
  var themeListeners = [];
  function readPalette() {
    var cs = getComputedStyle(root);
    ["--bg", "--bg-2", "--surface", "--ink", "--ink-2", "--muted", "--line", "--accent",
     "--base-a", "--base-t", "--base-c", "--base-g", "--violet", "--heat-lo", "--heat-mid", "--heat-hi"].forEach(function (v) {
      palette[v.slice(2)] = cs.getPropertyValue(v).trim();
    });
  }
  var themeMeta = document.querySelector('meta[name="theme-color"]');
  function applyTheme(theme) {
    root.dataset.theme = theme;
    if (themeMeta) themeMeta.setAttribute("content", theme === "dark" ? "#0a0e13" : "#f7f7f3");
    readPalette();
    themeListeners.forEach(function (fn) { fn(); });
  }
  themeBtn.addEventListener("click", function () {
    var next = root.dataset.theme === "dark" ? "light" : "dark";
    store.set("theme", next);
    applyTheme(next);
  });
  readPalette();

  /* ------------------------------------------------------------------
     Menú, barra de progreso, sección activa y aparición al hacer scroll
     ------------------------------------------------------------------ */
  function closeMenu() {
    links.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", META[lang()].menuOpen);
  }
  menuBtn.addEventListener("click", function () {
    var open = links.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", META[lang()][open ? "menuClose" : "menuOpen"]);
  });
  links.addEventListener("click", function (e) { if (e.target.closest("a")) closeMenu(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });

  var nav = document.querySelector(".nav");
  var bar = document.getElementById("progress-bar");
  function onScroll() {
    nav.classList.toggle("is-scrolled", window.scrollY > 8);
    var max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = "scaleX(" + (max > 0 ? Math.min(window.scrollY / max, 1) : 0) + ")";
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var hasIO = "IntersectionObserver" in window;
  if (hasIO) {
    var navLinks = Array.prototype.slice.call(links.querySelectorAll("a"));
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.forEach(function (a) { a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("main > section").forEach(function (s) { spy.observe(s); });

    var reveal = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); reveal.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".reveal").forEach(function (el) { reveal.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
  }

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* ------------------------------------------------------------------
     Utilidades
     ------------------------------------------------------------------ */
  function seeded(seed) {
    var s = seed >>> 0;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  var BASES = ["A", "C", "G", "T"];
  var PAIR = { A: "T", T: "A", C: "G", G: "C" };
  function baseColor(b) { return palette["base-" + b.toLowerCase()]; }
  function hexToRgb(h) {
    h = h.replace("#", "");
    if (h.length === 3) h = h.replace(/./g, "$&$&");
    var n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function rgba(hex, a) { var c = hexToRgb(hex); return "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + a + ")"; }
  function mix(h1, h2, k) {
    var a = hexToRgb(h1), b = hexToRgb(h2);
    return "rgb(" + Math.round(a[0] + (b[0] - a[0]) * k) + "," + Math.round(a[1] + (b[1] - a[1]) * k) + "," + Math.round(a[2] + (b[2] - a[2]) * k) + ")";
  }
  function ease(x) { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }

  /* Escena de canvas: ajusta el tamaño, anima solo cuando se ve y respeta "reducir movimiento" */
  function scene(canvas, api) {
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    var s = { ctx: ctx, W: 0, H: 0, running: false, visible: false, raf: 0, t0: performance.now(), last: 0 };
    function size() {
      var r = canvas.getBoundingClientRect();
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      s.W = r.width; s.H = r.height;
      canvas.width = Math.max(1, Math.round(r.width * dpr));
      canvas.height = Math.max(1, Math.round(r.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (api.resize) api.resize(s);
    }
    function frame(now) {
      var dt = s.last ? Math.min((now - s.last) / 1000, 0.1) : 0.016;
      s.last = now;
      api.draw(s, (now - s.t0) / 1000, dt);
      if (s.running) s.raf = requestAnimationFrame(frame);
    }
    function start() {
      if (s.running || !s.visible || reduceMotion.matches || document.hidden) return;
      s.running = true; s.last = 0; s.raf = requestAnimationFrame(frame);
    }
    function stop() { s.running = false; cancelAnimationFrame(s.raf); }
    function still() { api.draw(s, api.stillTime || 3, 0.016); }

    size();
    if (api.init) api.init(s);
    still();
    if (hasIO) {
      new IntersectionObserver(function (en) { s.visible = en[0].isIntersecting; if (s.visible) start(); else stop(); }).observe(canvas);
    } else { s.visible = true; start(); }
    var timer;
    window.addEventListener("resize", function () { clearTimeout(timer); timer = setTimeout(function () { size(); if (!s.running) still(); }, 120); });
    document.addEventListener("visibilitychange", function () { if (document.hidden) stop(); else start(); });
    if (reduceMotion.addEventListener) reduceMotion.addEventListener("change", function () { if (reduceMotion.matches) { stop(); still(); } else start(); });
    themeListeners.push(function () { if (!s.running) still(); });
    s.canvas = canvas;
    return s;
  }

  /* ------------------------------------------------------------------
     1. Texto que se escribe solo
     ------------------------------------------------------------------ */
  (function () {
    var el = document.getElementById("typed");
    if (!el) return;
    var PHRASES = {
      en: ["reading host transcriptomes", "scoring interferon signatures", "validating across independent cohorts", "teaching models some biology"],
      es: ["leyendo transcriptomas del huésped", "puntuando firmas de interferón", "validando en cohortes independientes", "enseñándoles biología a los modelos"]
    };
    var i = 0, pos = 0, deleting = false, timer;
    function tick() {
      var list = PHRASES[lang()], word = list[i % list.length];
      if (!deleting) {
        pos++;
        el.textContent = word.slice(0, pos);
        if (pos >= word.length) { deleting = true; timer = setTimeout(tick, 1700); return; }
        timer = setTimeout(tick, 42 + Math.random() * 40);
      } else {
        pos--;
        el.textContent = word.slice(0, pos);
        if (pos <= 0) { deleting = false; i++; timer = setTimeout(tick, 350); return; }
        timer = setTimeout(tick, 22);
      }
    }
    function restart() {
      clearTimeout(timer);
      if (reduceMotion.matches) { el.textContent = PHRASES[lang()][0]; return; }
      i = 0; pos = 0; deleting = false; tick();
    }
    langListeners.push(restart);
    restart();
  })();

  /* ------------------------------------------------------------------
     2. Cinta de secuencia y código de barras
     ------------------------------------------------------------------ */
  (function () {
    var track = document.getElementById("ribbon");
    if (track) {
      var r = seeded(1977), html = "";
      for (var i = 0; i < 140; i++) { var b = BASES[Math.floor(r() * 4)]; html += '<span class="b-' + b + '">' + b + "</span>"; }
      track.innerHTML = html + html; // dos copias para que el bucle no tenga corte
    }
    var bc = document.getElementById("barcode");
    if (bc) {
      var rr = seeded(98986400), x = 0, out = "";
      while (x < 296) {
        var w = 1 + Math.floor(rr() * 3), gap = 1 + Math.floor(rr() * 3);
        out += '<rect x="' + x + '" y="0" width="' + w + '" height="40"/>';
        x += w + gap;
      }
      bc.innerHTML = out;
    }
  })();

  /* ------------------------------------------------------------------
     3. Tabla periódica de herramientas
     ------------------------------------------------------------------ */
  (function () {
    var table = document.getElementById("ptable"), legend = document.getElementById("plegend");
    if (!table) return;
    var GROUPS = {
      lang: { c: "--base-c", en: "Languages", es: "Lenguajes" },
      data: { c: "--base-a", en: "Data science", es: "Ciencia de datos" },
      bio: { c: "--base-t", en: "Biological data", es: "Datos biológicos" },
      tools: { c: "--base-g", en: "Dev tools", es: "Herramientas" },
      lab: { c: "--violet", en: "Laboratory", es: "Laboratorio" }
    };
    var ELEMENTS = [
      ["Py", "Python", "Python", "lang"], ["R", "R", "R", "lang"],
      ["Pd", "pandas", "pandas", "data"], ["Np", "NumPy", "NumPy", "data"], ["Sp", "SciPy", "SciPy", "data"],
      ["Sk", "scikit-learn", "scikit-learn", "data"], ["Gg", "ggplot2", "ggplot2", "data"], ["Roc", "pROC", "pROC", "data"],
      ["Geo", "NCBI GEO", "NCBI GEO", "bio"], ["Msg", "MSigDB", "MSigDB", "bio"], ["Seq", "RNA-seq", "RNA-seq", "bio"],
      ["Ma", "Microarrays", "Microarreglos", "bio"], ["Git", "Git", "Git", "tools"], ["Gh", "GitHub", "GitHub", "tools"],
      ["Mi", "Microbiology", "Microbiología", "lab"], ["Ba", "Bioanalysis", "Bioanálisis", "lab"]
    ];
    function render() {
      var l = lang();
      table.innerHTML = ELEMENTS.map(function (e, i) {
        return '<div class="el" role="listitem" style="--c: var(' + GROUPS[e[3]].c + ')" title="' + (l === "es" ? e[2] : e[1]) + '">' +
          '<span class="el__n">' + (i + 1) + "</span>" +
          '<span class="el__sym">' + e[0] + "</span>" +
          '<span class="el__name">' + (l === "es" ? e[2] : e[1]) + "</span></div>";
      }).join("");
      legend.innerHTML = Object.keys(GROUPS).map(function (k) {
        return '<li style="--c: var(' + GROUPS[k].c + ')"><i></i>' + GROUPS[k][l] + "</li>";
      }).join("");
      var els = table.querySelectorAll(".el");
      if (!hasIO || reduceMotion.matches) { els.forEach(function (el) { el.classList.add("is-in"); }); return; }
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          els.forEach(function (el, i) { setTimeout(function () { el.classList.add("is-in"); }, i * 45); });
          io.disconnect();
        });
      }, { rootMargin: "0px 0px -10% 0px" });
      io.observe(table);
    }
    langListeners.push(render);
    render();
  })();

  /* ------------------------------------------------------------------
     4. Hélice de ADN que gira, avanza y se "abre" bajo el cursor
     ------------------------------------------------------------------ */
  (function () {
    var canvas = document.getElementById("helix");
    var hudPos = document.getElementById("hud-pos"), hudPair = document.getElementById("hud-pair"), hudGc = document.getElementById("hud-gc");
    var mouse = { y: -1e4, k: 0, inside: false };
    // secuencia infinita y determinista: la base i siempre es la misma
    function baseAt(i) {
      var x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
      return BASES[Math.floor((x - Math.floor(x)) * 4)];
    }
    var lastHud = "";

    scene(canvas, {
      stillTime: 2.2,
      draw: function (s, time, dt) {
        var ctx = s.ctx, W = s.W, H = s.H;
        ctx.clearRect(0, 0, W, H);
        var padTop = 58, padBot = 54;
        var spacing = 21, N = Math.ceil((H - padTop - padBot) / spacing) + 2;
        var R = Math.min(W * 0.27, 118), cx = W / 2;
        var scroll = time * 1.15, first = Math.floor(scroll), frac = scroll - first;

        // el cursor abre la hélice suavemente
        mouse.k += ((mouse.inside ? 1 : 0) - mouse.k) * Math.min(dt * 6, 1);

        var rungs = [];
        for (var k = 0; k < N; k++) {
          var idx = first + k;
          var y = padTop + (k - frac) * spacing;
          if (y < padTop - spacing || y > H - padBot + spacing) continue;
          var ang = idx * 0.6 + time * 0.9;
          var u = mouse.k * Math.exp(-Math.pow((y - mouse.y) / 52, 2));
          var r = R * (1 + 0.85 * u);
          var sn = Math.sin(ang), cs = Math.cos(ang);
          // los extremos se desvanecen
          var edge = Math.min(1, (y - padTop + spacing) / 60, (H - padBot + spacing - y) / 60);
          rungs.push({ idx: idx, y: y, x1: cx + r * sn, x2: cx - r * sn, z: cs, u: u, b: baseAt(idx), fade: Math.max(0, edge) });
        }

        // lectura: línea horizontal en el centro
        var readY = H / 2;
        ctx.save();
        ctx.setLineDash([4, 6]);
        ctx.strokeStyle = rgba(palette.accent, 0.55);
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(26, readY); ctx.lineTo(W - 26, readY); ctx.stroke();
        ctx.restore();
        ctx.fillStyle = palette.accent;
        ctx.beginPath(); ctx.moveTo(18, readY - 5); ctx.lineTo(26, readY); ctx.lineTo(18, readY + 5); ctx.fill();
        ctx.beginPath(); ctx.moveTo(W - 18, readY - 5); ctx.lineTo(W - 26, readY); ctx.lineTo(W - 18, readY + 5); ctx.fill();

        // escalones (pares de bases): primero los de atrás
        var order = rungs.slice().sort(function (a, b) { return Math.abs(a.z) - Math.abs(b.z); });
        order.forEach(function (p) {
          var a = (0.35 + 0.45 * (1 - Math.abs(p.z))) * p.fade;
          var mid = (p.x1 + p.x2) / 2;
          var gap = p.u > 0.25 ? (p.u - 0.25) * Math.abs(p.x1 - p.x2) * 0.55 : 0;
          var dir = p.x1 < p.x2 ? 1 : -1;
          ctx.lineWidth = 3;
          ctx.lineCap = "round";
          ctx.strokeStyle = rgba(baseColor(p.b), a);
          ctx.beginPath(); ctx.moveTo(p.x1, p.y); ctx.lineTo(mid - dir * gap, p.y); ctx.stroke();
          ctx.strokeStyle = rgba(baseColor(PAIR[p.b]), a);
          ctx.beginPath(); ctx.moveTo(mid + dir * gap, p.y); ctx.lineTo(p.x2, p.y); ctx.stroke();
        });

        // las dos hebras (columna de azúcar-fosfato)
        function strand(which) {
          for (var i = 1; i < rungs.length; i++) {
            var p0 = rungs[i - 1], p1 = rungs[i];
            var x0 = which ? p0.x1 : p0.x2, x1 = which ? p1.x1 : p1.x2;
            var z = which ? (p0.z + p1.z) / 2 : -(p0.z + p1.z) / 2;
            var depth = (z + 1) / 2;
            ctx.strokeStyle = rgba(palette.ink, (0.18 + 0.62 * depth) * Math.min(p0.fade, p1.fade));
            ctx.lineWidth = 1.6 + 2.2 * depth;
            ctx.beginPath(); ctx.moveTo(x0, p0.y); ctx.lineTo(x1, p1.y); ctx.stroke();
          }
          rungs.forEach(function (p) {
            var z = which ? p.z : -p.z, depth = (z + 1) / 2;
            ctx.fillStyle = rgba(baseColor(which ? p.b : PAIR[p.b]), (0.35 + 0.65 * depth) * p.fade);
            ctx.beginPath(); ctx.arc(which ? p.x1 : p.x2, p.y, 2.6 + 2.6 * depth, 0, 6.2832); ctx.fill();
          });
        }
        strand(false); strand(true);

        // letras junto a la línea de lectura
        ctx.font = "600 12px 'JetBrains Mono', monospace";
        ctx.textBaseline = "middle";
        var nearest = null;
        rungs.forEach(function (p) {
          var d = Math.abs(p.y - readY);
          if (!nearest || d < Math.abs(nearest.y - readY)) nearest = p;
          if (d < spacing * 2.6) {
            var a = (1 - d / (spacing * 2.6)) * p.fade;
            var left = Math.min(p.x1, p.x2), right = Math.max(p.x1, p.x2);
            var bl = p.x1 <= p.x2 ? p.b : PAIR[p.b], br = p.x1 <= p.x2 ? PAIR[p.b] : p.b;
            ctx.textAlign = "right"; ctx.fillStyle = rgba(baseColor(bl), a); ctx.fillText(bl, left - 12, p.y);
            ctx.textAlign = "left"; ctx.fillStyle = rgba(baseColor(br), a); ctx.fillText(br, right + 12, p.y);
          }
        });

        // lecturas del panel
        if (nearest) {
          var gc = 0;
          rungs.forEach(function (p) { if (p.b === "G" || p.b === "C") gc++; });
          var hud = String(nearest.idx + 1).padStart(4, "0") + "|" + nearest.b + "–" + PAIR[nearest.b] + "|" + Math.round(100 * gc / rungs.length) + "%";
          if (hud !== lastHud) {
            var parts = hud.split("|");
            hudPos.textContent = parts[0]; hudPair.textContent = parts[1]; hudGc.textContent = parts[2];
            lastHud = hud;
          }
        }
      }
    });

    if (canvas) {
      canvas.addEventListener("pointermove", function (e) {
        var r = canvas.getBoundingClientRect();
        mouse.y = e.clientY - r.top; mouse.inside = true;
      });
      canvas.addEventListener("pointerleave", function () { mouse.inside = false; });
      canvas.addEventListener("pointerup", function (e) { if (e.pointerType !== "mouse") mouse.inside = false; });
    }
  })();

  /* ------------------------------------------------------------------
     5. Mapa de calor que se agrupa solo (como un clustering jerárquico)
     ------------------------------------------------------------------ */
  (function () {
    var canvas = document.getElementById("heatmap");
    var label = document.getElementById("heatmap-state");
    var G = 16, S = 20;
    var rnd = seeded(4242);
    function gauss() { var u = rnd() || 1e-9, v = rnd(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
    // grupos ocultos: 3 grupos de muestras y 2 módulos de genes (datos inventados para el dibujo)
    var sGroup = [], gModule = [];
    for (var j = 0; j < S; j++) sGroup.push(j < 6 ? 0 : j < 13 ? 1 : 2);
    for (var i = 0; i < G; i++) gModule.push(i < 8 ? 0 : 1);
    var effect = [[-1.1, 0.2, 1.4], [0.9, -1.2, 0.3]];
    var val = [];
    for (i = 0; i < G; i++) { val.push([]); for (j = 0; j < S; j++) val[i].push(effect[gModule[i]][sGroup[j]] + gauss() * 0.45); }

    function shuffled(n) { var a = []; for (var k = 0; k < n; k++) a.push(k); for (k = n - 1; k > 0; k--) { var r = Math.floor(rnd() * (k + 1)); var t = a[k]; a[k] = a[r]; a[r] = t; } return a; }
    function clusteredRows() { var a = []; for (var k = 0; k < G; k++) a.push(k); return a.sort(function (x, y) { return gModule[x] - gModule[y] || x - y; }); }
    function clusteredCols() { var a = []; for (var k = 0; k < S; k++) a.push(k); return a.sort(function (x, y) { return sGroup[x] - sGroup[y] || x - y; }); }
    function positions(order) { var p = []; order.forEach(function (item, slot) { p[item] = slot; }); return p; }

    var rowFrom = positions(shuffled(G)), colFrom = positions(shuffled(S));
    var rowTo = rowFrom, colTo = colFrom;
    var CYCLE = { hold: 2.6, move: 1.6, show: 3.4 };
    var period = CYCLE.hold + CYCLE.move + CYCLE.show + CYCLE.move;
    var lastCycle = -1, state = "";

    function setState(key) {
      if (state === key) return;
      state = key;
      if (label) label.textContent = t(key);
    }
    langListeners.push(function () { var k = state; state = ""; setState(k || "research.hmShuffled"); });

    scene(canvas, {
      stillTime: CYCLE.hold + CYCLE.move + 1,
      draw: function (s, time) {
        var ctx = s.ctx, W = s.W, H = s.H;
        var cyc = Math.floor(time / period), ph = time - cyc * period;
        if (cyc !== lastCycle) {
          // cada ciclo: de un desorden nuevo → agrupado → otro desorden
          lastCycle = cyc;
          rowFrom = positions(shuffled(G)); colFrom = positions(shuffled(S));
        }
        var rowC = positions(clusteredRows()), colC = positions(clusteredCols());
        var k, dendro = 0;
        if (ph < CYCLE.hold) { k = 0; setState("research.hmShuffled"); }
        else if (ph < CYCLE.hold + CYCLE.move) { k = ease((ph - CYCLE.hold) / CYCLE.move); setState("research.hmClustering"); }
        else if (ph < CYCLE.hold + CYCLE.move + CYCLE.show) { k = 1; dendro = Math.min(1, (ph - CYCLE.hold - CYCLE.move) / 0.6); setState("research.hmClustered"); }
        else { k = 1 - ease((ph - CYCLE.hold - CYCLE.move - CYCLE.show) / CYCLE.move); setState("research.hmClustering"); }

        ctx.clearRect(0, 0, W, H);
        var ml = 30, mt = 30, mr = 4, mb = 4;
        var cw = (W - ml - mr) / S, ch = (H - mt - mb) / G;
        ctx.fillStyle = palette["bg-2"];
        ctx.fillRect(ml - 2, mt - 2, W - ml - mr + 4, H - mt - mb + 4);
        for (var gi = 0; gi < G; gi++) {
          var ry = mt + (rowFrom[gi] + (rowC[gi] - rowFrom[gi]) * k) * ch;
          for (var sj = 0; sj < S; sj++) {
            var cx = ml + (colFrom[sj] + (colC[sj] - colFrom[sj]) * k) * cw;
            var v = val[gi][sj] + 0.18 * Math.sin(time * 1.3 + gi * 0.7 + sj * 1.1);
            var x = Math.max(-2, Math.min(2, v)) / 2;
            ctx.fillStyle = x < 0 ? mix(palette["heat-mid"], palette["heat-lo"], -x) : mix(palette["heat-mid"], palette["heat-hi"], x);
            ctx.fillRect(cx + 0.6, ry + 0.6, cw - 1.2, ch - 1.2);
          }
        }

        // dendrogramas cuando ya está agrupado
        if (dendro > 0) {
          ctx.strokeStyle = rgba(palette["ink-2"], 0.75 * dendro);
          ctx.lineWidth = 1.2;
          var groupsS = [[0, 5], [6, 12], [13, 19]], tops = [];
          groupsS.forEach(function (g) {
            var x0 = ml + (g[0] + 0.5) * cw, x1 = ml + (g[1] + 0.5) * cw, yb = mt - 4, yt = mt - 14;
            ctx.beginPath();
            for (var c = g[0]; c <= g[1]; c++) { var xc = ml + (c + 0.5) * cw; ctx.moveTo(xc, yb); ctx.lineTo(xc, yt); }
            ctx.moveTo(x0, yt); ctx.lineTo(x1, yt); ctx.stroke();
            tops.push((x0 + x1) / 2);
          });
          ctx.beginPath();
          ctx.moveTo(tops[1], mt - 14); ctx.lineTo(tops[1], mt - 21); ctx.moveTo(tops[2], mt - 14); ctx.lineTo(tops[2], mt - 21);
          ctx.moveTo(tops[1], mt - 21); ctx.lineTo(tops[2], mt - 21);
          var m12 = (tops[1] + tops[2]) / 2;
          ctx.moveTo(m12, mt - 21); ctx.lineTo(m12, mt - 27); ctx.moveTo(tops[0], mt - 14); ctx.lineTo(tops[0], mt - 27);
          ctx.moveTo(tops[0], mt - 27); ctx.lineTo(m12, mt - 27);
          ctx.stroke();
          [[0, 7], [8, 15]].forEach(function (g) {
            var xr = ml - 4, xl = ml - 14;
            ctx.beginPath();
            for (var r = g[0]; r <= g[1]; r++) { var yc = mt + (r + 0.5) * ch; ctx.moveTo(xr, yc); ctx.lineTo(xl, yc); }
            ctx.moveTo(xl, mt + (g[0] + 0.5) * ch); ctx.lineTo(xl, mt + (g[1] + 0.5) * ch);
            ctx.stroke();
          });
          var y1 = mt + 4 * ch, y2 = mt + 12 * ch;
          ctx.beginPath(); ctx.moveTo(ml - 14, y1); ctx.lineTo(ml - 24, y1); ctx.moveTo(ml - 14, y2); ctx.lineTo(ml - 24, y2); ctx.moveTo(ml - 24, y1); ctx.lineTo(ml - 24, y2); ctx.stroke();
        }
      }
    });
  })();

  /* ------------------------------------------------------------------
     6. Red neuronal: señales que viajan de los genes al fenotipo
     ------------------------------------------------------------------ */
  (function () {
    var canvas = document.getElementById("network");
    var LAYERS = [6, 9, 9, 3];
    var nodesL = [], pulses = [], spawn = 0, rnd = seeded(7);

    scene(canvas, {
      stillTime: 4,
      resize: function (s) {
        nodesL = LAYERS.map(function (n, li) {
          var x = 26 + li * (s.W - 52) / (LAYERS.length - 1);
          var arr = [];
          for (var i = 0; i < n; i++) arr.push({ x: x, y: s.H * (0.5 + (i - (n - 1) / 2) * Math.min(0.1, 0.86 / n)), glow: 0 });
          return arr;
        });
      },
      init: function () {
        // unas cuantas señales ya en camino, para que el cuadro quieto no se vea vacío
        for (var k = 0; k < 6; k++) pulses.push(newPulse(rnd() * 2.5));
      },
      draw: function (s, time, dt) {
        var ctx = s.ctx, W = s.W, H = s.H;
        ctx.clearRect(0, 0, W, H);
        if (!nodesL.length) return;

        spawn -= dt;
        if (spawn <= 0 && dt > 0.001) { pulses.push(newPulse(0)); spawn = 0.22 + rnd() * 0.18; }

        // conexiones
        ctx.lineWidth = 1;
        ctx.strokeStyle = rgba(palette.muted, 0.16);
        ctx.beginPath();
        for (var li = 0; li < nodesL.length - 1; li++) {
          nodesL[li].forEach(function (a) { nodesL[li + 1].forEach(function (b) { ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); }); });
        }
        ctx.stroke();

        // señales
        pulses.forEach(function (p) { p.t += dt * 1.5; });
        pulses = pulses.filter(function (p) { return p.t < p.path.length - 1 + 0.3; });
        pulses.forEach(function (p) {
          var seg = Math.min(Math.floor(p.t), p.path.length - 2), f = Math.min(p.t - seg, 1);
          var a = nodesL[seg][p.path[seg]], b = nodesL[seg + 1][p.path[seg + 1]];
          var x = a.x + (b.x - a.x) * f, y = a.y + (b.y - a.y) * f;
          ctx.strokeStyle = rgba(p.color, 0.5);
          ctx.lineWidth = 1.6;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(x, y); ctx.stroke();
          ctx.fillStyle = rgba(p.color, 0.22);
          ctx.beginPath(); ctx.arc(x, y, 7, 0, 6.2832); ctx.fill();
          ctx.fillStyle = p.color;
          ctx.beginPath(); ctx.arc(x, y, 3, 0, 6.2832); ctx.fill();
          if (f >= 0.98 && !p.lit[seg + 1]) { p.lit[seg + 1] = true; b.glow = 1; }
        });

        // neuronas
        nodesL.forEach(function (layer, li) {
          layer.forEach(function (n, i) {
            n.glow = Math.max(0, n.glow - dt * 1.8);
            var col = li === 0 ? baseColor(BASES[i % 4]) : li === nodesL.length - 1 ? palette.accent : palette["ink-2"];
            if (n.glow > 0) { ctx.fillStyle = rgba(col, 0.25 * n.glow); ctx.beginPath(); ctx.arc(n.x, n.y, 13, 0, 6.2832); ctx.fill(); }
            ctx.fillStyle = palette.surface;
            ctx.strokeStyle = col;
            ctx.lineWidth = 2;
            ctx.beginPath(); ctx.arc(n.x, n.y, li === 0 || li === nodesL.length - 1 ? 7 : 5.5, 0, 6.2832); ctx.fill(); ctx.stroke();
            if (n.glow > 0.05) { ctx.fillStyle = rgba(col, n.glow); ctx.beginPath(); ctx.arc(n.x, n.y, 3.2, 0, 6.2832); ctx.fill(); }
          });
        });
      }
    });

    function newPulse(t0) {
      var path = LAYERS.map(function (n) { return Math.floor(rnd() * n); });
      return { path: path, t: t0, lit: {}, color: baseColor(BASES[path[0] % 4]) };
    }
  })();

  /* ------------------------------------------------------------------
     7. Placa de Petri: bacilos que crecen y se dividen (fisión binaria)
     ------------------------------------------------------------------ */
  (function () {
    var canvas = document.getElementById("petri");
    var cells = [], rnd = seeded(31);
    var MAX = 64;
    function make(x, y, ang, len) {
      return { x: x, y: y, a: ang, len: len, w: 6 + rnd() * 3, g: 6 + rnd() * 6, max: 30 + rnd() * 14,
        vx: (rnd() - 0.5) * 6, vy: (rnd() - 0.5) * 6, va: (rnd() - 0.5) * 0.25, ci: Math.floor(rnd() * 4), life: 1, dying: false };
    }
    scene(canvas, {
      stillTime: 6,
      init: function (s) {
        for (var i = 0; i < 26; i++) cells.push(make(rnd() * s.W, rnd() * s.H, rnd() * 6.28, 12 + rnd() * 22));
      },
      draw: function (s, time, dt) {
        var ctx = s.ctx, W = s.W, H = s.H;
        ctx.clearRect(0, 0, W, H);
        var born = [];
        cells.forEach(function (c) {
          c.len += c.g * dt;
          c.x += c.vx * dt; c.y += c.vy * dt; c.a += c.va * dt;
          c.vx *= 0.995; c.vy *= 0.995;
          if (c.x < -40) c.x = W + 40; if (c.x > W + 40) c.x = -40;
          if (c.y < -40) c.y = H + 40; if (c.y > H + 40) c.y = -40;
          if (c.dying) c.life -= dt * 0.5;
          if (!c.dying && c.len > c.max) {
            // se parte en dos a lo largo de su eje
            var half = c.len / 2, dx = Math.cos(c.a) * half / 2, dy = Math.sin(c.a) * half / 2;
            var d1 = make(c.x - dx, c.y - dy, c.a + (rnd() - 0.5) * 0.3, half - 2);
            var d2 = make(c.x + dx, c.y + dy, c.a + (rnd() - 0.5) * 0.3, half - 2);
            d1.ci = d2.ci = c.ci;
            d1.vx = -Math.cos(c.a) * 7 + c.vx; d1.vy = -Math.sin(c.a) * 7 + c.vy;
            d2.vx = Math.cos(c.a) * 7 + c.vx; d2.vy = Math.sin(c.a) * 7 + c.vy;
            born.push(d1, d2);
            c.life = 0;
          }
        });
        cells = cells.filter(function (c) { return c.life > 0; }).concat(born);
        // si hay demasiadas, las más viejas se desvanecen
        var alive = cells.filter(function (c) { return !c.dying; });
        for (var i = 0; i < alive.length - MAX; i++) alive[i].dying = true;

        ctx.lineCap = "round";
        cells.forEach(function (c) {
          var col = baseColor(BASES[c.ci]);
          var dx = Math.cos(c.a) * c.len / 2, dy = Math.sin(c.a) * c.len / 2;
          var a = 0.32 * Math.max(0, Math.min(1, c.life));
          ctx.strokeStyle = rgba(col, a);
          ctx.lineWidth = c.w;
          ctx.beginPath(); ctx.moveTo(c.x - dx, c.y - dy); ctx.lineTo(c.x + dx, c.y + dy); ctx.stroke();
          ctx.strokeStyle = rgba(col, a * 0.9);
          ctx.lineWidth = 1.2;
          ctx.beginPath(); ctx.moveTo(c.x - dx * 0.6, c.y - dy * 0.6); ctx.lineTo(c.x + dx * 0.6, c.y + dy * 0.6); ctx.stroke();
        });
      }
    });
  })();

  // idioma inicial (después de registrar a todos los que dependen de él)
  setLang(lang());
})();
