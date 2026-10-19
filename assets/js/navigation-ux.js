"use strict";

/*
 * Portfolio navigation enhancements: static, free, no network calls,
 * no tracking, no storage. The original site's language and menu scripts
 * remain responsible for their existing functions.
 */
(() => {
  const translations = {
    en: {
      uxNavSkills: "Skills", uxNavCareer: "Career",
      uxQuickEyebrow: "Find your way",
      uxQuickTitle: "Explore what matters to you.",
      uxQuickIntro: "A quick route through my experience, capabilities and projects.",
      uxExperience: "Experience",
      uxExperienceText: "Roles, responsibilities and hands-on operational work.",
      uxSkills: "Skills",
      uxSkillsText: "Data, operations, digital tools and business knowledge.",
      uxProjects: "Projects",
      uxProjectsText: "Explore real projects and the work behind them.",
      uxCareer: "Career direction",
      uxCareerText: "Roles I am looking for and the next step I want to take.",
      uxExplore: "Discover more",
      uxPortfolio: "Portfolio",
      uxCareerCrumb: "Career direction",
      uxMunCrumb: "MUN Apartment",
      uxDjCrumb: "DJ Krios",
      uxMoreEyebrow: "Explore further",
      uxMoreTitle: "See another side of my work.",
      uxMoreIntro: "My experiences connect business, hospitality and creative projects.",
      uxMunMini: "Hospitality operations, pricing and guest experience.",
      uxDjMini: "Music, live events and creative production.",
      uxCareerMini: "Target roles and professional ambitions.",
      uxBackToTop: "Back to top",
      uxOpenMenu: "Open navigation menu",
      uxCloseMenu: "Close navigation menu"
    },
    it: {
      uxNavSkills: "Competenze", uxNavCareer: "Carriera",
      uxQuickEyebrow: "Esplora il portfolio",
      uxQuickTitle: "Parti da ciò che ti interessa.",
      uxQuickIntro: "Percorsi rapidi tra esperienze, competenze e progetti.",
      uxExperience: "Esperienze",
      uxExperienceText: "Ruoli, responsabilità ed esperienza operativa sul campo.",
      uxSkills: "Competenze",
      uxSkillsText: "Dati, operations, strumenti digitali e conoscenze aziendali.",
      uxProjects: "Progetti",
      uxProjectsText: "Scopri progetti concreti e il lavoro che c'è dietro.",
      uxCareer: "Percorso professionale",
      uxCareerText: "I ruoli che cerco e la direzione in cui voglio crescere.",
      uxExplore: "Scopri di più",
      uxPortfolio: "Portfolio",
      uxCareerCrumb: "Percorso professionale",
      uxMunCrumb: "MUN Apartment",
      uxDjCrumb: "DJ Krios",
      uxMoreEyebrow: "Continua a esplorare",
      uxMoreTitle: "Scopri un altro lato del mio percorso.",
      uxMoreIntro: "Esperienze che uniscono business, ospitalità e creatività.",
      uxMunMini: "Operations, pricing e customer experience nell'ospitalità.",
      uxDjMini: "Musica, eventi dal vivo e progettualità creativa.",
      uxCareerMini: "Obiettivi professionali e ruoli di interesse.",
      uxBackToTop: "Torna all'inizio",
      uxOpenMenu: "Apri il menu di navigazione",
      uxCloseMenu: "Chiudi il menu di navigazione"
    },
    es: {
      uxNavSkills: "Habilidades", uxNavCareer: "Carrera",
      uxQuickEyebrow: "Explora el portfolio",
      uxQuickTitle: "Empieza por lo que te interesa.",
      uxQuickIntro: "Accesos rápidos a experiencias, competencias y proyectos.",
      uxExperience: "Experiencia",
      uxExperienceText: "Funciones, responsabilidades y experiencia operativa real.",
      uxSkills: "Habilidades",
      uxSkillsText: "Datos, operaciones, herramientas digitales y conocimientos empresariales.",
      uxProjects: "Proyectos",
      uxProjectsText: "Descubre proyectos reales y el trabajo que hay detrás.",
      uxCareer: "Trayectoria profesional",
      uxCareerText: "Los puestos que busco y mis próximos objetivos.",
      uxExplore: "Descubrir más",
      uxPortfolio: "Portfolio",
      uxCareerCrumb: "Trayectoria profesional",
      uxMunCrumb: "MUN Apartment",
      uxDjCrumb: "DJ Krios",
      uxMoreEyebrow: "Sigue explorando",
      uxMoreTitle: "Conoce otra faceta de mi trabajo.",
      uxMoreIntro: "Experiencias que combinan negocio, hospitalidad y creatividad.",
      uxMunMini: "Operaciones, precios y experiencia del huésped.",
      uxDjMini: "Música, eventos en vivo y proyectos creativos.",
      uxCareerMini: "Objetivos profesionales y puestos de interés.",
      uxBackToTop: "Volver arriba",
      uxOpenMenu: "Abrir menú de navegación",
      uxCloseMenu: "Cerrar menú de navegación"
    }
  };

  const header = document.querySelector(".site-header");
  const menu = document.querySelector(".nav-menu");
  const menuToggle = document.querySelector(".menu-toggle");
  const progress = document.querySelector(".ux-progress-fill");
  const navLinks = [...document.querySelectorAll(".nav-menu a[data-ux-section]")];
  const page = document.body.dataset.page;
  const backTop = document.createElement("button");
  backTop.type = "button";
  backTop.className = "ux-back-to-top";
  backTop.hidden = true;
  backTop.innerHTML = '<span aria-hidden="true">↑</span>';
  document.body.appendChild(backTop);

  let activeKey = "";
  let queued = false;

  function language() {
    const value = document.documentElement.lang.split("-")[0];
    return translations[value] ? value : "en";
  }

  function translate() {
    const dict = translations[language()];
    document.querySelectorAll("[data-ux-key]").forEach(el => {
      const label = dict[el.dataset.uxKey];
      if (label) el.textContent = label;
    });
    backTop.setAttribute("aria-label", dict.uxBackToTop);
    backTop.title = dict.uxBackToTop;
    if (menuToggle) {
      const expanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-label", expanded ? dict.uxCloseMenu : dict.uxOpenMenu);
    }
  }

  function showActive(key) {
    if (activeKey === key) return;
    activeKey = key;
    navLinks.forEach(link => {
      const current = link.dataset.uxSection === key;
      link.classList.toggle("ux-is-current", current);
      if (current) link.setAttribute("aria-current", page === "home" ? "location" : "page");
      else link.removeAttribute("aria-current");
    });
  }

  const sectionIds = [
    ["about", "about"], ["experience", "experience"],
    ["education", "skills"], ["certifications", "skills"],
    ["skills", "skills"], ["projects", "projects"], ["contact", "contact"]
  ];

  function updateScrollUI() {
    queued = false;
    const doc = document.documentElement;
    const possibleScroll = Math.max(0, doc.scrollHeight - window.innerHeight);
    const ratio = possibleScroll ? Math.min(1, Math.max(0, window.scrollY / possibleScroll)) : 0;
    if (progress) progress.style.transform = "scaleX(" + ratio + ")";
    backTop.hidden = window.scrollY < 530;

    if (page === "career") { showActive("career"); return; }
    if (page === "mun" || page === "dj") { showActive("projects"); return; }
    if (page !== "home") return;

    const reference = window.scrollY + (header?.offsetHeight || 78) + 95;
    let key = "";
    for (const [id, mapped] of sectionIds) {
      const section = document.getElementById(id);
      if (section && section.offsetTop <= reference) key = mapped;
    }
    showActive(key);
  }

  function onScroll() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(updateScrollUI);
  }

  backTop.addEventListener("click", () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({top: 0, behavior: reduced ? "auto" : "smooth"});
  });

  // The site's main script handles click-based language selection.
  // Its flag handler runs before this document-level listener.
  document.addEventListener("click", event => {
    if (!event.target.closest(".flag[data-lang]")) return;
    translate();
    if (menu?.classList.contains("open") && menuToggle) menuToggle.click();
  });

  menuToggle?.addEventListener("click", () => {
    // Run after the site's existing menu toggle handler.
    translate();
  });

  document.addEventListener("keydown", event => {
    if (event.key !== "Escape" || !menu?.classList.contains("open")) return;
    menuToggle?.click();
    menuToggle?.focus();
  });

  window.addEventListener("scroll", onScroll, {passive: true});
  window.addEventListener("resize", onScroll, {passive: true});
  window.addEventListener("hashchange", onScroll);

  translate();
  updateScrollUI();
})();
