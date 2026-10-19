"use strict";

/* Progressive enhancements. No external API, cookies or chat tracking.
 * The existing site's script owns locale persistence; this follows html[lang].
 */
(() => {
  const localizations = {
    en: {
      recruiterButton: "For recruiters", recruiterBadge: "60-second overview",
      recruiterKicker: "Recruiter snapshot", recruiterHeading: "Lorenzo Cicogna, at a glance.",
      recruiterLead: "Economics and Business Administration student, with direct experience in customer-facing operations, hospitality, sales and technical environments. Interested in analysis, process improvement and international business.",
      recruiterBlocks: [
        ["Practical experience", "Tourism mobility and guest relations at Tuk Tuk Bergamo; rental operations and pricing at MUN Apartment; previous technical and logistics roles."],
        ["Core capabilities", "KPI reporting, Excel and data analysis; customer experience, operational coordination, sales channels and cross-functional problem solving."],
        ["Education & direction", "Currently studying at the University of Milano-Bicocca. Erasmus experience in Riga; seeking internship and entry-level opportunities in business analysis, operations and related functions, including Spain."]
      ],
      recruiterExplore: "Explore experience", recruiterCareer: "Career goals", recruiterContact: "Contact me",
      closeModal: "Close recruiter overview",
      filterGroup: "Filter competencies", filterNames: ["All", "Business Analysis", "Operations", "Customer Experience", "Digital", "Technical"],
      proofLabel: "Where this is applied", proofLink: "Explore example",
      proof: {
        all: ["Select a field to see how the competencies connect to real experience and projects.", "index.html#experience"],
        analysis: ["KPI monitoring and performance interpretation connect to the hospitality project and to the business-focused career direction.", "mun.html"],
        operations: ["MUN Apartment and tourism mobility provide hands-on examples of booking workflows, supplier coordination and operational priorities.", "mun.html"],
        customer: ["Tourism and hospitality roles involve guest communication, service quality, feedback and problem solving.", "index.html#experience"],
        digital: ["The HubSpot Digital Marketing certification covers SEO, content, social media and performance measurement.", "index.html#certifications"],
        technical: ["The portfolio includes CNC programming, CAD design and precision-production responsibilities from prior roles.", "index.html#experience"]
      },
      caseEyebrow: "A closer look", stages: ["Objective", "My contribution", "Applied skills", "Evidence and next steps"],
      cases: {
        mun: {
          heading: "MUN Apartment: hospitality as a hands-on business.",
          intro: "A practical case study of managing an accommodation project from daily operations to customer experience.",
          texts: [
            "Maintain a well-managed short-term rental and make the booking and guest experience clear and reliable.",
            "Coordinate guest communication, bookings, online platforms, supplier activities, pricing decisions and day-to-day operations.",
            "Operations management, sales channels, pricing, problem solving, customer experience and performance interpretation.",
            "Guest feedback presented on this page includes a 9.6/10 average across the reviews analysed. This is a review indicator, not a claim of revenue growth or causal improvement."
          ]
        },
        dj: {
          heading: "DJ Krios: turning an event brief into an experience.",
          intro: "A creative project that connects client requirements, preparation and live delivery.",
          texts: [
            "Prepare a music service suited to different audiences and occasions, from private parties to celebrations.",
            "Plan playlists, coordinate event needs and adapt the set to the desired atmosphere and audience response.",
            "Customer communication, creative planning, coordination, adaptability and delivery in a live environment.",
            "The portfolio documents DJ services and event formats, without claiming unverified attendance figures or results."
          ]
        },
        career: {
          heading: "Career direction: where practice meets analysis.",
          intro: "An overview of how existing experience supports the next professional step.",
          texts: [
            "Pursue internships and entry-level roles in business analysis, operations, airport operations and business development.",
            "Build on hospitality, tourism, sales, technical production and logistics experience, alongside academic training.",
            "Structured problem solving, customer-facing operations, KPI reporting, teamwork and international exposure.",
            "Currently studying Economics and Business Administration, with Erasmus experience in Riga. Open to conversations with teams, including opportunities in Spain."
          ]
        }
      }
    },
    it: {
      recruiterButton: "Per i recruiter", recruiterBadge: "Profilo in 60 secondi",
      recruiterKicker: "Profilo professionale", recruiterHeading: "Lorenzo Cicogna, in sintesi.",
      recruiterLead: "Studente di Economia e Amministrazione delle Imprese, con esperienza diretta in operations, ospitalità, vendite, servizio clienti e contesti tecnici. Interessato all'analisi, al miglioramento dei processi e al business internazionale.",
      recruiterBlocks: [
        ["Esperienza sul campo", "Mobilità turistica e rapporto con i clienti presso Tuk Tuk Bergamo; gestione della struttura e pricing per MUN Apartment; precedenti ruoli tecnici e logistici."],
        ["Competenze principali", "KPI e reporting, Excel e analisi dati; customer experience, coordinamento operativo, canali di vendita e problem solving."],
        ["Formazione e obiettivi", "Attualmente studente all'Università di Milano-Bicocca. Esperienza Erasmus a Riga; ricerca di stage e posizioni junior in business analysis, operations e aree affini, anche in Spagna."]
      ],
      recruiterExplore: "Esplora le esperienze", recruiterCareer: "Obiettivi di carriera", recruiterContact: "Contattami",
      closeModal: "Chiudi il profilo per recruiter",
      filterGroup: "Filtra le competenze", filterNames: ["Tutte", "Business Analysis", "Operations", "Customer Experience", "Digital", "Tecniche"],
      proofLabel: "Dove si applicano", proofLink: "Vedi l'esempio",
      proof: {
        all: ["Seleziona un ambito per scoprire come le competenze si collegano a esperienze e progetti concreti.", "index.html#experience"],
        analysis: ["Il monitoraggio KPI e l'interpretazione dei risultati si collegano alla gestione ricettiva e agli obiettivi professionali in ambito business.", "mun.html"],
        operations: ["MUN Apartment e le attività nella mobilità turistica mostrano gestione prenotazioni, coordinamento fornitori e priorità operative.", "mun.html"],
        customer: ["Le esperienze nel turismo e nell'ospitalità comprendono relazione con il cliente, qualità del servizio, feedback e risoluzione dei problemi.", "index.html#experience"],
        digital: ["La certificazione HubSpot Digital Marketing comprende SEO, contenuti, social media e misurazione delle performance.", "index.html#certifications"],
        technical: ["Il portfolio riporta attività di programmazione CNC, progettazione CAD e produzione meccanica di precisione.", "index.html#experience"]
      },
      caseEyebrow: "Approfondimento", stages: ["Obiettivo", "Il mio contributo", "Competenze applicate", "Evidenze e sviluppi"],
      cases: {
        mun: {
          heading: "MUN Apartment: ospitalità come progetto d'impresa.",
          intro: "Un caso concreto di gestione di una struttura ricettiva, dalle attività quotidiane alla customer experience.",
          texts: [
            "Gestire una locazione turistica con un'esperienza di prenotazione e soggiorno chiara e affidabile.",
            "Coordinare comunicazione con gli ospiti, prenotazioni, piattaforme, fornitori, decisioni sui prezzi e operazioni quotidiane.",
            "Operations management, canali di vendita, pricing, problem solving, customer experience e lettura delle performance.",
            "Le recensioni mostrate in questa pagina riportano una media di 9,6/10 sul campione analizzato. È un dato di feedback, non una dichiarazione di crescita dei ricavi o di miglioramenti causali."
          ]
        },
        dj: {
          heading: "DJ Krios: dall'idea di evento all'esperienza.",
          intro: "Un progetto creativo che unisce esigenze dei clienti, preparazione e performance dal vivo.",
          texts: [
            "Proporre un servizio musicale adatto a pubblici e occasioni differenti, dalle feste private alle celebrazioni.",
            "Preparare playlist, coordinare le esigenze dell'evento e adattare la selezione musicale all'atmosfera e al pubblico.",
            "Comunicazione con il cliente, pianificazione creativa, coordinamento, adattabilità ed esecuzione dal vivo.",
            "Il portfolio documenta servizi musicali e tipologie di eventi, senza attribuire numeri o risultati non verificati."
          ]
        },
        career: {
          heading: "Carriera: trasformare l'esperienza in direzione.",
          intro: "Come le competenze già maturate sostengono il prossimo passo professionale.",
          texts: [
            "Cercare stage e posizioni junior in business analysis, operations, attività aeroportuali e business development.",
            "Valorizzare esperienze in ospitalità, turismo, vendite, produzione tecnica e logistica insieme alla formazione universitaria.",
            "Problem solving strutturato, attività operative a contatto con clienti, reporting KPI, teamwork e apertura internazionale.",
            "Attualmente studente di Economia e Amministrazione delle Imprese, con esperienza Erasmus a Riga. Disponibile al confronto con aziende e team, anche per opportunità in Spagna."
          ]
        }
      }
    },
    es: {
      recruiterButton: "Para recruiters", recruiterBadge: "Perfil en 60 segundos",
      recruiterKicker: "Perfil profesional", recruiterHeading: "Lorenzo Cicogna, en resumen.",
      recruiterLead: "Estudiante de Economía y Administración de Empresas con experiencia práctica en operaciones, hostelería, ventas, atención al cliente y entornos técnicos. Interesado en análisis, mejora de procesos y negocios internacionales.",
      recruiterBlocks: [
        ["Experiencia práctica", "Movilidad turística y atención al cliente en Tuk Tuk Bergamo; gestión de alojamiento y precios en MUN Apartment; puestos técnicos y logísticos anteriores."],
        ["Competencias clave", "KPI y reporting, Excel y análisis de datos; experiencia de cliente, coordinación operativa, canales de venta y resolución de problemas."],
        ["Formación y objetivos", "Actualmente estudia en la Universidad de Milano-Bicocca. Experiencia Erasmus en Riga; busca prácticas y puestos junior en análisis empresarial, operaciones y áreas relacionadas, también en España."]
      ],
      recruiterExplore: "Ver experiencia", recruiterCareer: "Objetivos profesionales", recruiterContact: "Contactar",
      closeModal: "Cerrar resumen para recruiters",
      filterGroup: "Filtrar competencias", filterNames: ["Todas", "Business Analysis", "Operaciones", "Experiencia de cliente", "Digital", "Técnicas"],
      proofLabel: "Aplicación práctica", proofLink: "Ver ejemplo",
      proof: {
        all: ["Selecciona un área para ver cómo se relacionan las habilidades con experiencias y proyectos reales.", "index.html#experience"],
        analysis: ["Los KPI y el análisis de resultados se vinculan al alojamiento turístico y a los objetivos profesionales de negocio.", "mun.html"],
        operations: ["MUN Apartment y el trabajo en movilidad turística muestran gestión de reservas, proveedores y prioridades operativas.", "mun.html"],
        customer: ["Los puestos en turismo y hostelería implican comunicación con clientes, calidad del servicio, opiniones y resolución de problemas.", "index.html#experience"],
        digital: ["La certificación HubSpot Digital Marketing incluye SEO, contenido, redes sociales y medición del rendimiento.", "index.html#certifications"],
        technical: ["El portfolio incluye programación CNC, diseño CAD y producción mecánica de precisión en puestos anteriores.", "index.html#experience"]
      },
      caseEyebrow: "En detalle", stages: ["Objetivo", "Mi contribución", "Competencias aplicadas", "Evidencias y próximos pasos"],
      cases: {
        mun: {
          heading: "MUN Apartment: la hostelería como proyecto empresarial.",
          intro: "Un caso real de gestión de un alojamiento, desde las operaciones diarias hasta la experiencia del huésped.",
          texts: [
            "Gestionar un alquiler turístico con un proceso de reserva y una estancia claros y fiables.",
            "Coordinar comunicación con huéspedes, reservas, plataformas, proveedores, decisiones de precios y operaciones diarias.",
            "Gestión operativa, canales de venta, precios, resolución de problemas, experiencia de cliente y análisis del rendimiento.",
            "Las opiniones mostradas en esta página incluyen una media de 9,6/10 de las reseñas analizadas. Es un indicador de feedback, no una afirmación de crecimiento de ingresos."
          ]
        },
        dj: {
          heading: "DJ Krios: de la idea a la experiencia del evento.",
          intro: "Un proyecto creativo que conecta las necesidades del cliente, la preparación y la actuación en directo.",
          texts: [
            "Ofrecer un servicio musical adaptado a públicos y ocasiones diferentes, desde fiestas privadas hasta celebraciones.",
            "Preparar listas de reproducción, coordinar los requisitos del evento y adaptar la selección al ambiente y al público.",
            "Comunicación, planificación creativa, coordinación, adaptabilidad y actuaciones en directo.",
            "El portfolio describe servicios y tipos de eventos sin atribuir cifras o resultados no verificados."
          ]
        },
        career: {
          heading: "Carrera: convertir la experiencia en una dirección clara.",
          intro: "Cómo las experiencias anteriores apoyan el siguiente paso profesional.",
          texts: [
            "Buscar prácticas y puestos junior en análisis empresarial, operaciones, actividad aeroportuaria y desarrollo de negocio.",
            "Aprovechar la experiencia en hostelería, turismo, ventas, producción técnica y logística junto con la formación académica.",
            "Resolución estructurada de problemas, operaciones con clientes, reporting KPI, trabajo en equipo y perspectiva internacional.",
            "Actualmente estudia Economía y Administración de Empresas y realizó un Erasmus en Riga. Abierto a conversar con equipos y empresas, también en España."
          ]
        }
      }
    }
  };

  const categories = ["all","analysis","operations","customer","digital","technical"];
  const skillMap = {
    "KPI Reporting":["analysis"],
    "Data Analysis":["analysis"],
    "Microsoft Excel":["analysis","digital"],
    "Customer Experience":["customer"],
    "Operations":["operations"],
    "Sales Channels":["operations"],
    "Booking Management":["operations"],
    "Problem Solving":["operations","customer"],
    "Teamwork":["operations","customer"],
    "English":["customer"],
    "Spanish":["customer"],
    "CAD Design":["technical"],
    "CNC Programming":["technical"],
    "Digital Marketing":["digital"]
  };
  const page = document.body.dataset.page;
  const lang = () => {
    const code = document.documentElement.lang.slice(0,2);
    return localizations[code] ? code : "en";
  };
  let currentCategory = "all";

  // Modal: created only on home, so existing hero/navigation are untouched.
  let modal = null;
  let recruiterTrigger = null;
  let lastFocus = null;

  function setupRecruiter() {
    const heroActions = document.querySelector(".hero-content .hero-actions");
    if (!heroActions) return;

    recruiterTrigger = document.createElement("button");
    recruiterTrigger.type = "button";
    recruiterTrigger.className = "px-recruiter-trigger";
    recruiterTrigger.innerHTML = '<span class="px-recruiter-label"></span><span class="px-pill"></span><span aria-hidden="true">↗</span>';
    heroActions.insertAdjacentElement("afterend",recruiterTrigger);

    modal = document.createElement("div");
    modal.className = "px-modal";
    modal.hidden = true;
    modal.innerHTML =
      '<div class="px-modal-backdrop" data-px-close></div>' +
      '<section class="px-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="px-modal-title" tabindex="-1">' +
        '<button class="px-modal-close" type="button" data-px-close><span aria-hidden="true">×</span></button>' +
        '<p class="px-kicker" data-px-part="kicker"></p>' +
        '<h2 class="px-modal-heading" id="px-modal-title"></h2>' +
        '<p class="px-modal-lead" data-px-part="lead"></p>' +
        '<div class="px-modal-grid"></div>' +
        '<div class="px-modal-footer">' +
          '<a href="index.html#experience" data-px-part="explore"></a>' +
          '<a class="px-secondary" href="career.html" data-px-part="career"></a>' +
          '<a class="px-secondary" href="mailto:lorenzocicogna00@gmail.com" data-px-part="contact"></a>' +
        '</div>' +
      '</section>';
    document.body.appendChild(modal);
    const close = () => {
      if (modal.hidden) return;
      modal.hidden = true;
      document.body.classList.remove("px-modal-open");
      (lastFocus || recruiterTrigger)?.focus();
    };
    recruiterTrigger.addEventListener("click", () => {
      lastFocus = document.activeElement;
      modal.hidden = false;
      document.body.classList.add("px-modal-open");
      modal.querySelector(".px-modal-close").focus();
    });
    modal.querySelectorAll("[data-px-close]").forEach(button => {
      button.addEventListener("click", close);
    });
    modal.querySelectorAll("a").forEach(a => a.addEventListener("click", close));
    document.addEventListener("keydown", e => {
      if (modal.hidden) return;
      if (e.key === "Escape") { e.preventDefault(); close(); return; }
      if (e.key !== "Tab") return;
      const focusable = [...modal.querySelectorAll("button, a[href]")];
      const first = focusable[0], last = focusable[focusable.length-1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  const skillElements = [];
  let skillButtons = [];
  let proofBox = null;
  function setupSkills() {
    const region = document.querySelector("#skills .skills");
    if (!region) return;
    const chips = [...region.querySelectorAll("span")];
    chips.forEach(chip => {
      const tags = skillMap[chip.textContent.trim()] || [];
      skillElements.push({chip,tags});
    });
    const filters = document.createElement("div");
    filters.className = "px-skill-filters";
    filters.setAttribute("role","group");
    categories.forEach(category => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "px-skill-filter";
      b.dataset.category = category;
      b.setAttribute("aria-pressed",category==="all"?"true":"false");
      b.addEventListener("click",() => { currentCategory=category; renderSkills(); });
      filters.appendChild(b);
    });
    region.parentElement.insertBefore(filters,region);
    skillButtons = [...filters.querySelectorAll("button")];

    proofBox = document.createElement("div");
    proofBox.className = "px-evidence";
    proofBox.setAttribute("aria-live","polite");
    proofBox.innerHTML = '<div><span class="px-evidence-label"></span><p class="px-evidence-text"></p></div><a class="px-evidence-link"></a>';
    region.insertAdjacentElement("afterend",proofBox);
  }

  function renderSkills() {
    const t=localizations[lang()];
    const group=document.querySelector(".px-skill-filters");
    if (!group) return;
    group.setAttribute("aria-label",t.filterGroup);
    skillButtons.forEach((b,i) => {
      b.textContent=t.filterNames[i];
      b.setAttribute("aria-pressed",String(b.dataset.category===currentCategory));
    });
    skillElements.forEach(({chip,tags}) => chip.hidden =
      currentCategory!=="all"&&!tags.includes(currentCategory));
    const [message,href] = t.proof[currentCategory];
    proofBox.querySelector(".px-evidence-label").textContent=t.proofLabel;
    proofBox.querySelector(".px-evidence-text").textContent=message;
    const a=proofBox.querySelector(".px-evidence-link");
    a.textContent=t.proofLink;
    a.href=href;
  }

  let caseSection = null;
  function setupCase() {
    if (!["mun","dj","career"].includes(page)) return;
    const nextSection=document.querySelector(".ux-more-projects");
    if (!nextSection) return;
    caseSection=document.createElement("section");
    caseSection.className="px-case";
    caseSection.setAttribute("aria-labelledby","px-case-heading");
    caseSection.innerHTML =
      '<div class="container">' +
        '<div class="px-case-heading">' +
          '<p class="px-kicker px-case-kicker"></p>' +
          '<h2 id="px-case-heading"></h2>' +
          '<p class="px-case-intro"></p>' +
        '</div>' +
        '<div class="px-case-grid"></div>' +
      '</div>';
    nextSection.parentNode.insertBefore(caseSection,nextSection);
  }

  function renderRecruiter() {
    if (!modal) return;
    const t=localizations[lang()];
    recruiterTrigger.querySelector(".px-recruiter-label").textContent=t.recruiterButton;
    recruiterTrigger.querySelector(".px-pill").textContent=t.recruiterBadge;
    recruiterTrigger.setAttribute("aria-label",t.recruiterButton+" — "+t.recruiterBadge);
    modal.querySelector(".px-modal-close").setAttribute("aria-label",t.closeModal);
    modal.querySelector('[data-px-part="kicker"]').textContent=t.recruiterKicker;
    modal.querySelector("#px-modal-title").textContent=t.recruiterHeading;
    modal.querySelector('[data-px-part="lead"]').textContent=t.recruiterLead;
    const grid=modal.querySelector(".px-modal-grid");
    grid.replaceChildren();
    t.recruiterBlocks.forEach(([heading,body]) => {
      const card=document.createElement("article");
      const strong=document.createElement("strong");
      const paragraph=document.createElement("p");
      strong.textContent=heading;
      paragraph.textContent=body;
      card.append(strong,paragraph);
      grid.appendChild(card);
    });
    modal.querySelector('[data-px-part="explore"]').textContent=t.recruiterExplore;
    modal.querySelector('[data-px-part="career"]').textContent=t.recruiterCareer;
    modal.querySelector('[data-px-part="contact"]').textContent=t.recruiterContact;
  }

  function renderCase() {
    if (!caseSection) return;
    const t=localizations[lang()];
    const data=t.cases[page];
    caseSection.querySelector(".px-case-kicker").textContent=t.caseEyebrow;
    caseSection.querySelector("#px-case-heading").textContent=data.heading;
    caseSection.querySelector(".px-case-intro").textContent=data.intro;
    const grid=caseSection.querySelector(".px-case-grid");
    grid.replaceChildren();
    data.texts.forEach((body,i) => {
      const card=document.createElement("article");
      card.className="px-case-card";
      const number=document.createElement("span");
      number.className="px-card-number";
      number.textContent=String(i+1).padStart(2,"0");
      const heading=document.createElement("h3");
      heading.textContent=t.stages[i];
      const paragraph=document.createElement("p");
      paragraph.textContent=body;
      card.append(number,heading,paragraph);
      grid.appendChild(card);
    });
  }

  // Existing script changes <html lang> on a flag click; its handler precedes this.
  document.addEventListener("click",event => {
    if (event.target.closest(".flag[data-lang]")) {
      renderRecruiter();
      renderSkills();
      renderCase();
    }
  });

  setupRecruiter();
  setupSkills();
  setupCase();
  renderRecruiter();
  renderSkills();
  renderCase();
})();
