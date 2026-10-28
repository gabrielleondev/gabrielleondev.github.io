/* Gabriel Leon — personal site
   Idioma (EN/ES), tema claro/oscuro, menú móvil, animaciones y el gráfico del encabezado. */
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
     Traducciones. El HTML ya trae el inglés; aquí va el español.
     ------------------------------------------------------------------ */
  var ES = {
    "skip": "Saltar al contenido",
    "nav.about": "Sobre mí",
    "nav.research": "Investigación",
    "nav.projects": "Proyectos",
    "nav.toolkit": "Herramientas",
    "nav.contact": "Contacto",

    "hero.eyebrow": "Microbiología y Bioanálisis · Bioinformática",
    "hero.lead": "Estudio microbiología en la Universidad de Antioquia y uso Python y R para leer lo que una infección deja escrito en la sangre.",
    "hero.cta": "Ver mi investigación",
    "hero.meta": "Medellín, Colombia · Español e inglés",

    "about.title": "Sobre mí",
    "about.p1": "Soy estudiante de Microbiología y Bioanálisis en la Universidad de Antioquia, en Medellín, Colombia. Me atrae el punto donde el laboratorio se encuentra con el computador: usar datos públicos y código reproducible para entender cómo responde el cuerpo a una infección.",
    "about.p2": "Mientras estudio he trabajado en calidad de datos y atención bilingüe, revisando cientos de casos al día contra reglas detalladas. Ese hábito de revisar cada registro con cuidado es el mismo que llevo al análisis.",
    "about.f1k": "Estudios",
    "about.f1v": "Microbiología y Bioanálisis, Universidad de Antioquia (en curso)",
    "about.f2k": "Ciudad",
    "about.f3k": "Idiomas",
    "about.f3v": "Español (nativo) · Inglés (C1)",
    "about.f4k": "Intereses",
    "about.f4v": "Transcriptómica huésped–patógeno, enfermedades infecciosas, IA en biología",

    "research.title": "Investigación",
    "research.status": "En curso",
    "research.where": "Proyecto independiente · 2026",
    "research.ptitle": "Interferón tipo I en tuberculosis y leishmaniasis cutánea",
    "research.p1": "Dos infecciones muy distintas comparten una misma célula hospedera: el macrófago. Este proyecto busca qué parte de la respuesta de interferón tipo I en sangre es común a la tuberculosis y a la leishmaniasis cutánea, qué parte es propia de cada enfermedad y si esa respuesta sigue el resultado del tratamiento.",
    "research.p2": "La primera fase reanaliza cohortes públicas de tuberculosis. Cada cohorte se analiza por separado, y cada hallazgo se vuelve a probar en estudios independientes antes de darlo por válido.",
    "research.s1t": "Cohortes públicas",
    "research.s1d": "Datos de RNA-seq y microarreglos de NCBI GEO",
    "research.s2t": "Puntajes por conjunto de genes",
    "research.s2d": "z-scores dentro de cada cohorte, sin mezclar estudios",
    "research.s3t": "Desempeño diagnóstico",
    "research.s3d": "Curvas ROC con intervalos de confianza por bootstrap",
    "research.s4t": "Validación independiente",
    "research.s4d": "Cada resultado se comprueba de nuevo en otras cohortes",
    "research.note": "Reproducible en Python y en R. Por ahora el repositorio es privado, hasta que se publiquen los resultados.",

    "projects.title": "Otros proyectos",
    "projects.ogl": "Un editor de escenas 3D escrito en Python con OpenGL. Carga modelos .obj con texturas y colores por vértice, los mueve con gizmos en pantalla, agrega luces de colores y permite recorrer la escena con una cámara tipo FPS. Las escenas se guardan en JSON para que otros programas las carguen.",
    "projects.tag3d": "Gráficos 3D",
    "projects.view": "Ver en GitHub",
    "projects.soonTitle": "Vienen más",
    "projects.soon": "Aquí irán apareciendo nuevos análisis y herramientas a medida que los publique en GitHub.",
    "projects.all": "Todos los repositorios",

    "toolkit.title": "Herramientas",
    "toolkit.g1": "Análisis de datos",
    "toolkit.g2": "Bioinformática",
    "toolkit.b1": "Datos públicos",
    "toolkit.b1v": "NCBI GEO · conjuntos de genes de MSigDB",
    "toolkit.b2": "Métodos",
    "toolkit.b2v": "Normalización de RNA-seq y microarreglos · puntajes por conjunto de genes · ROC / AUC",
    "toolkit.g3": "Flujo de trabajo",
    "toolkit.w1v": "ramas · pull requests · resultados versionados",
    "toolkit.w2": "Reproducibilidad",
    "toolkit.w2v": "el mismo análisis en Python y en R, comparados entre sí",
    "toolkit.g4": "Laboratorio",
    "toolkit.l1": "Formación",
    "toolkit.l1v": "microbiología y bioanálisis clínico",
    "toolkit.l2": "Calidad",
    "toolkit.l2v": "revisión de políticas y registros exactos a gran volumen",

    "exp.title": "Experiencia",
    "exp.w1": "2024 – hoy",
    "exp.r1": "Analista de calidad de contenido",
    "exp.t1": "Reviso más de 400 casos al día contra políticas detalladas del cliente y acompaño a analistas nuevos.",
    "exp.r2": "Asistente virtual bilingüe",
    "exp.o2": "Independiente · Remoto",
    "exp.t2": "Agendas, reportes y bases de datos para clientes internacionales.",
    "exp.r3": "Representante de servicio al cliente",
    "exp.t3": "Atención a pacientes de EE. UU. en un entorno de salud regulado por HIPAA.",

    "contact.title": "Hablemos de ciencia.",
    "contact.text": "Con gusto converso sobre bioinformática, biología de las infecciones o colaborar en análisis con datos abiertos. GitHub es el mejor lugar para encontrarme.",

    "footer.built": "HTML, CSS y JavaScript sin frameworks · Publicado en GitHub Pages",
    "footer.top": "Volver arriba ↑"
  };

  var META = {
    en: {
      title: "Gabriel Leon · Microbiology & Bioinformatics",
      langBtn: "ES", langAria: "Cambiar a español",
      themeAria: "Toggle dark mode", menuOpen: "Open menu", menuClose: "Close menu"
    },
    es: {
      title: "Gabriel Leon · Microbiología y Bioinformática",
      langBtn: "EN", langAria: "Switch to English",
      themeAria: "Cambiar modo oscuro", menuOpen: "Abrir menú", menuClose: "Cerrar menú"
    }
  };

  var nodes = Array.prototype.slice.call(document.querySelectorAll("[data-i18n]"));
  var EN = {};
  nodes.forEach(function (el) { EN[el.getAttribute("data-i18n")] = el.innerHTML; });

  var langBtn = document.getElementById("lang-toggle");
  var themeBtn = document.getElementById("theme-toggle");
  var menuBtn = document.getElementById("menu-toggle");
  var links = document.getElementById("nav-links");

  function setLang(lang) {
    var dict = lang === "es" ? ES : EN;
    nodes.forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      if (dict[k] != null) el.innerHTML = dict[k];
    });
    var m = META[lang];
    root.lang = lang;
    document.title = m.title;
    langBtn.querySelector("[data-lang-label]").textContent = m.langBtn;
    langBtn.setAttribute("aria-label", m.langAria);
    themeBtn.setAttribute("aria-label", m.themeAria);
    menuBtn.setAttribute("aria-label", links.classList.contains("is-open") ? m.menuClose : m.menuOpen);
  }

  setLang(root.lang === "es" ? "es" : "en");
  langBtn.addEventListener("click", function () {
    var next = root.lang === "es" ? "en" : "es";
    store.set("lang", next);
    setLang(next);
  });

  /* ------------------------------------------------------------------
     Tema
     ------------------------------------------------------------------ */
  // El <head> ya puso data-theme; aquí solo se cambia con el botón o con el sistema
  var darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  function applyTheme(theme) {
    root.dataset.theme = theme;
    if (embedding) embedding.recolor();
  }
  themeBtn.addEventListener("click", function () {
    var next = root.dataset.theme === "dark" ? "light" : "dark";
    store.set("theme", next);
    applyTheme(next);
  });
  // Si la persona nunca eligió, la página sigue al sistema cuando este cambia
  if (darkQuery.addEventListener) {
    darkQuery.addEventListener("change", function (e) {
      var saved = store.get("theme");
      if (saved !== "light" && saved !== "dark") applyTheme(e.matches ? "dark" : "light");
    });
  }

  /* ------------------------------------------------------------------
     Menú móvil y navegación
     ------------------------------------------------------------------ */
  function closeMenu() {
    links.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", META[root.lang === "es" ? "es" : "en"].menuOpen);
  }
  menuBtn.addEventListener("click", function () {
    var open = links.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", META[root.lang === "es" ? "es" : "en"][open ? "menuClose" : "menuOpen"]);
  });
  links.addEventListener("click", function (e) { if (e.target.closest("a")) closeMenu(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });

  var nav = document.querySelector(".nav");
  function onScroll() { nav.classList.toggle("is-scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Resalta en el menú la sección que se está viendo
  if ("IntersectionObserver" in window) {
    var navLinks = Array.prototype.slice.call(links.querySelectorAll("a"));
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.forEach(function (a) { a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    // el encabezado y "Experiencia" no tienen enlace: al verlos se apaga el resaltado
    ["about", "research", "projects", "toolkit", "experience", "contact"].forEach(function (id) {
      var s = document.getElementById(id);
      if (s) spy.observe(s);
    });
    spy.observe(document.querySelector(".hero"));

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
     Gráfico del encabezado: un "embedding" de células simulado.
     Grupos de puntos que respiran despacio y se apartan del cursor.
     ------------------------------------------------------------------ */
  var embedding = (function () {
    var canvas = document.getElementById("embedding");
    if (!canvas || !canvas.getContext) return null;
    var ctx = canvas.getContext("2d");
    var W = 0, H = 0, dpr = 1;
    var points = [], clusters = [], colors = [];
    var mouse = { x: -1e4, y: -1e4 };
    var running = false, visible = true, raf = 0, t0 = performance.now();

    // pseudoaleatorio con semilla, para que el dibujo sea el mismo en cada visita
    var seed = 20261028;
    function rand() { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; }
    function gauss() { var u = rand() || 1e-9, v = rand(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }

    function readColors() {
      var cs = getComputedStyle(root);
      colors = ["--c1", "--c2", "--c3", "--c4", "--c5"].map(function (v) { return cs.getPropertyValue(v).trim() || "#888"; });
    }

    function layout() {
      var rect = canvas.getBoundingClientRect();
      W = rect.width; H = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // En pantallas anchas los grupos ocupan la mitad derecha; en móvil, todo el ancho
      var wide = W > 760;
      var x0 = wide ? W * 0.5 : W * 0.08, x1 = wide ? W * 0.96 : W * 0.92;
      var spec = [
        { x: 0.30, y: 0.30, s: 0.075, n: 70 },
        { x: 0.72, y: 0.24, s: 0.060, n: 52 },
        { x: 0.58, y: 0.62, s: 0.090, n: 84 },
        { x: 0.20, y: 0.74, s: 0.055, n: 40 },
        { x: 0.88, y: 0.66, s: 0.050, n: 36 }
      ];
      var span = Math.min(x1 - x0, H);
      seed = 20261028;
      clusters = spec.map(function (c, i) {
        return { x: x0 + c.x * (x1 - x0), y: H * (0.08 + c.y * 0.84), s: c.s * span * (wide ? 1.6 : 1.3), n: c.n, ci: i, ph: rand() * 6.28 };
      });
      points = [];
      clusters.forEach(function (c) {
        for (var i = 0; i < c.n; i++) {
          // forma alargada y algo girada, como un cúmulo real
          var a = gauss() * 1.25, b = gauss() * 0.7, rot = c.ph;
          points.push({
            c: c,
            ox: (a * Math.cos(rot) - b * Math.sin(rot)) * c.s,
            oy: (a * Math.sin(rot) + b * Math.cos(rot)) * c.s,
            r: 1.6 + rand() * 2.2,
            ph: rand() * 6.28,
            sp: 0.25 + rand() * 0.5,
            dx: 0, dy: 0
          });
        }
      });
      // algunos puntos sueltos entre grupos
      for (var k = 0; k < 26; k++) {
        var cA = clusters[Math.floor(rand() * clusters.length)];
        points.push({ c: cA, ox: gauss() * span * 0.22, oy: gauss() * span * 0.18, r: 1.4 + rand() * 1.2, ph: rand() * 6.28, sp: 0.3 + rand() * 0.4, dx: 0, dy: 0, stray: true });
      }
    }

    function frame(now) {
      var t = (now - t0) / 1000;
      ctx.clearRect(0, 0, W, H);
      var R = 110, R2 = R * R;
      for (var i = 0; i < points.length; i++) {
        var p = points[i], c = p.c;
        var breathe = 1 + 0.035 * Math.sin(t * 0.5 + c.ph);
        var bx = c.x + p.ox * breathe + Math.sin(t * p.sp + p.ph) * 3.2;
        var by = c.y + p.oy * breathe + Math.cos(t * p.sp * 0.9 + p.ph) * 3.2;

        // se apartan suavemente del cursor
        var mx = bx - mouse.x, my = by - mouse.y, d2 = mx * mx + my * my;
        var tx = 0, ty = 0;
        if (d2 < R2) {
          var d = Math.sqrt(d2) || 1, f = (1 - d / R) * 26;
          tx = (mx / d) * f; ty = (my / d) * f;
        }
        p.dx += (tx - p.dx) * 0.08;
        p.dy += (ty - p.dy) * 0.08;

        ctx.globalAlpha = p.stray ? 0.35 : 0.78;
        ctx.fillStyle = colors[c.ci % colors.length];
        ctx.beginPath();
        ctx.arc(bx + p.dx, by + p.dy, p.r, 0, 6.2832);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (running) raf = requestAnimationFrame(frame);
    }

    function start() {
      if (running || reduceMotion.matches || !visible) return;
      running = true; raf = requestAnimationFrame(frame);
    }
    function stop() { running = false; cancelAnimationFrame(raf); }
    function still() { stop(); frame(t0 + 4000); }

    readColors();
    layout();
    if (reduceMotion.matches) still(); else start();

    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () { layout(); if (!running) frame(performance.now()); }, 120);
    });
    var hero = canvas.parentElement;
    hero.addEventListener("pointermove", function (e) {
      var r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    });
    hero.addEventListener("pointerleave", function () { mouse.x = mouse.y = -1e4; });

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        if (visible) start(); else stop();
      }).observe(canvas);
    }
    document.addEventListener("visibilitychange", function () { if (document.hidden) stop(); else start(); });
    if (reduceMotion.addEventListener) {
      reduceMotion.addEventListener("change", function () { if (reduceMotion.matches) still(); else start(); });
    }

    return {
      recolor: function () { readColors(); if (!running) frame(performance.now()); }
    };
  })();
})();
