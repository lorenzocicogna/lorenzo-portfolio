"use strict";

/*
 * Lorenzo Cicogna — local portfolio guide.
 * No external API, message transmission, chat storage or generative AI.
 * Uses only the published portfolio content. The existing site language
 * selector continues to own language persistence.
 */
(() => {
  const config = {
    en: {
      title: "Explore my portfolio", open: "Ask about Lorenzo", close: "Close guide",
      intro: "I'm an automated portfolio guide, not a live AI agent. I can help you explore Lorenzo's experience, projects, skills and career goals.",
      prompt: "Or ask a general question", placeholder: "E.g. what roles interest Lorenzo?", send: "Ask",
      note: "Answers are based on this portfolio. Do not enter personal information. Questions stay in your browser and are not stored or sent.",
      unknown: "I can answer general questions about Lorenzo's experience, education, projects, skills and contact details. Select a topic above to explore.",
      unknownLink: "Get in touch",
      topics: [
        { id:"profile", label:"Who is Lorenzo Cicogna?", keys:["who is","about lorenzo","profile","background","introduction","tell me about","who are"],
          answer:"Lorenzo is an Economics and Business Administration student with practical experience in operations, customer service, tourism, sales and technical production. His focus is on analysis, business processes and data-informed decisions.",
          link:"About Lorenzo", href:"index.html#about" },
        { id:"experience", label:"What work experience does he have?", keys:["experience","worked","work history","career history","jobs","navy","tuk tuk","stema","machin","cad designer"],
          answer:"His portfolio lists roles at Tuk Tuk Bergamo, MUN Apartment, STEMA TECH, the Italian Navy and PM Impianti Technomac, spanning tourism, customer experience, hospitality operations, CNC programming, logistics and CAD design.",
          link:"Professional experience", href:"index.html#experience" },
        { id:"roles", label:"What opportunities is he looking for?", keys:["career","internship","job","hiring","opportunit","roles","spain","madrid","business analyst","recruit"],
          answer:"Lorenzo is interested in internships and entry-level opportunities in business analysis, operations, airport operations, business development, sales operations and strategy. His career page also highlights an interest in opportunities in Spain.",
          link:"Career direction", href:"career.html" },
        { id:"mun", label:"What is MUN Apartment?", keys:["mun","apartment","hospitality","rental","tourism project","booking platform","host"],
          answer:"MUN Apartment is a hands-on short-term rental project. Lorenzo manages guest communication, bookings, pricing, suppliers, daily operations and customer experience, using feedback and performance information to improve service.",
          link:"Explore MUN project", href:"mun.html" },
        { id:"skills", label:"What are his main skills?", keys:["skill","kpi","excel","analysis","competenc","operations","sales","crm","digital","problem solving"],
          answer:"His listed skills include KPI reporting, data analysis, Excel, customer experience, operations, sales channels, booking management, problem solving, teamwork, CAD design, CNC programming and digital marketing.",
          link:"View competencies", href:"index.html#skills" },
        { id:"education", label:"What did he study?", keys:["education","study","studies","degree","university","bicocca","erasmus","riga","diploma","graduat"],
          answer:"Lorenzo is studying Economics and Business Administration at the University of Milano-Bicocca. His portfolio also lists an Erasmus experience in Riga at EKA University of Applied Sciences and a technical diploma in industrial mechatronics. A completed university degree is not claimed here.",
          link:"Education and training", href:"index.html#education" },
        { id:"certification", label:"Which certifications does he have?", keys:["certificate","certification","hubspot","marketing course","digital marketing certified","credential"],
          answer:"The portfolio features the HubSpot Academy Digital Marketing certification, covering content, SEO, social media, email marketing, strategy and performance measurement.",
          link:"View certification", href:"index.html#certifications" },
        { id:"dj", label:"What is DJ Krios?", keys:["dj","krios","music","event","party","wedding","reggaeton"],
          answer:"DJ Krios is Lorenzo's creative music and events project, offering DJ sets for private parties, birthdays, graduation celebrations and weddings.",
          link:"Explore DJ Krios", href:"djkrios.html" },
        { id:"contact", label:"How can I contact Lorenzo?", keys:["contact","email","linkedin","phone","telephone","reach","message","collaborat","hire","interview"],
          answer:"You can reach Lorenzo via his portfolio contact section, by email at lorenzocicogna00@gmail.com, or through the LinkedIn profile linked on the site.",
          link:"Contact Lorenzo", href:"index.html#contact" }
      ]
    },
    it: {
      title: "Esplora il mio portfolio", open: "Chiedi di Lorenzo", close: "Chiudi la guida",
      intro: "Sono una guida automatica al portfolio, non un agente AI. Posso aiutarti a conoscere esperienze, progetti, competenze e obiettivi professionali di Lorenzo.",
      prompt: "Oppure scrivi una domanda generale", placeholder: "Es. che lavoro cerca Lorenzo?", send: "Invia",
      note: "Le risposte provengono dai contenuti del portfolio. Non inserire dati personali: le domande restano nel browser, senza essere inviate o salvate.",
      unknown: "Posso orientarti tra esperienze, formazione, progetti, competenze e contatti di Lorenzo. Seleziona un argomento qui sopra.",
      unknownLink: "Vai ai contatti",
      topics: [
        { id:"profile", label:"Chi è Lorenzo Cicogna?", keys:["chi e","chi sei","profilo","presentaz","background","informazioni su"],
          answer:"Lorenzo è uno studente di Economia e Amministrazione delle Imprese con esperienza pratica in operations, servizio clienti, turismo, vendite e produzione tecnica. I suoi interessi principali sono analisi, processi aziendali e decisioni basate sui dati.",
          link:"Conosci Lorenzo", href:"index.html#about" },
        { id:"experience", label:"Quali esperienze lavorative ha?", keys:["esperienz","lavorato","lavori","che lavoro","dove lavora","marina","tuk tuk","stema","cnc","cad","impiego"],
          answer:"Il portfolio presenta esperienze presso Tuk Tuk Bergamo, MUN Apartment, STEMA TECH, Marina Militare e PM Impianti Technomac: turismo, customer experience, gestione ricettiva, programmazione CNC, logistica e progettazione CAD.",
          link:"Esperienze professionali", href:"index.html#experience" },
        { id:"roles", label:"Quali opportunità cerca?", keys:["carriera","stage","tirocin","opportunit","ruoli","lavoro cerca","cerca lavoro","spagna","madrid","analyst","assunz"],
          answer:"Lorenzo è interessato a stage e posizioni junior in business analysis, operations, attività aeroportuali, business development, sales operations e strategia. Nel percorso professionale evidenzia anche interesse per opportunità in Spagna.",
          link:"Obiettivi professionali", href:"career.html" },
        { id:"mun", label:"Che cos'è MUN Apartment?", keys:["mun","apartment","appartamento","turistic","host","ospitalit","prenotaz","affitti"],
          answer:"MUN Apartment è un progetto reale di locazione turistica nel quale Lorenzo gestisce comunicazione con gli ospiti, prenotazioni, prezzi, fornitori, operazioni quotidiane e qualità del servizio.",
          link:"Scopri il progetto MUN", href:"mun.html" },
        { id:"skills", label:"Quali sono le sue competenze?", keys:["competenz","skill","kpi","excel","analisi dati","operations","crm","problem solving","digital"],
          answer:"Tra le competenze indicate: KPI e reporting, analisi dati, Excel, customer experience, operations, gestione dei canali di vendita e prenotazione, problem solving, lavoro in team, CAD, CNC e digital marketing.",
          link:"Esplora le competenze", href:"index.html#skills" },
        { id:"education", label:"Qual è la sua formazione?", keys:["formazion","stud","universit","bicocca","laurea","erasmus","riga","diplom","titolo"],
          answer:"Lorenzo studia Economia e Amministrazione delle Imprese all'Università di Milano-Bicocca. Il portfolio include un'esperienza Erasmus a Riga presso EKA University of Applied Sciences e un diploma tecnico in meccatronica industriale. La laurea universitaria non viene indicata come già conseguita.",
          link:"Formazione", href:"index.html#education" },
        { id:"certification", label:"Quali certificazioni ha ottenuto?", keys:["certificaz","hubspot","marketing","attestat","corso"],
          answer:"Nel portfolio è presente la certificazione HubSpot Academy Digital Marketing, dedicata a contenuti, SEO, social media, email marketing, strategia e misurazione delle performance.",
          link:"Vedi la certificazione", href:"index.html#certifications" },
        { id:"dj", label:"Che cos'è DJ Krios?", keys:["dj","krios","music","evento","festa","matrimonio","reggaeton"],
          answer:"DJ Krios è il progetto creativo di Lorenzo nel mondo della musica e degli eventi, con DJ set per feste private, compleanni, lauree e matrimoni.",
          link:"Scopri DJ Krios", href:"djkrios.html" },
        { id:"contact", label:"Come posso contattarlo?", keys:["contatt","email","mail","linkedin","telefon","scriv","colloquio","assum","collaboraz"],
          answer:"Puoi contattare Lorenzo dalla sezione Contatti del portfolio, tramite email a lorenzocicogna00@gmail.com oppure attraverso il suo profilo LinkedIn collegato sul sito.",
          link:"Contatta Lorenzo", href:"index.html#contact" }
      ]
    },
    es: {
      title: "Explora mi portfolio", open: "Pregunta por Lorenzo", close: "Cerrar la guía",
      intro: "Soy una guía automática del portfolio, no un agente de IA. Puedo ayudarte a conocer la experiencia, los proyectos, las habilidades y los objetivos profesionales de Lorenzo.",
      prompt: "O escribe una pregunta general", placeholder: "Ej. ¿qué puestos busca?", send: "Enviar",
      note: "Las respuestas se basan en el portfolio. No introduzcas datos personales: las preguntas permanecen en el navegador y no se envían ni guardan.",
      unknown: "Puedo ayudarte con experiencia, formación, proyectos, competencias y contacto. Elige un tema de la lista.",
      unknownLink: "Ir a contacto",
      topics: [
        { id:"profile", label:"¿Quién es Lorenzo Cicogna?", keys:["quien es","quien eres","perfil","presentacion","trayectoria"],
          answer:"Lorenzo es estudiante de Economía y Administración de Empresas, con experiencia práctica en operaciones, atención al cliente, turismo, ventas y producción técnica. Le interesan el análisis, los procesos empresariales y las decisiones basadas en datos.",
          link:"Sobre Lorenzo", href:"index.html#about" },
        { id:"experience", label:"¿Qué experiencia profesional tiene?", keys:["experienc","trabaj","empleo","marina","tuk tuk","stema","cnc","cad"],
          answer:"El portfolio incluye experiencia en Tuk Tuk Bergamo, MUN Apartment, STEMA TECH, la Marina italiana y PM Impianti Technomac: turismo, atención al cliente, alojamiento turístico, CNC, logística y diseño CAD.",
          link:"Experiencia profesional", href:"index.html#experience" },
        { id:"roles", label:"¿Qué oportunidades busca?", keys:["practic","beca","empleo busca","buscar trabajo","oportunidad","puesto","carrera","espana","madrid","analista"],
          answer:"Lorenzo está interesado en prácticas y puestos junior de análisis empresarial, operaciones, operaciones aeroportuarias, desarrollo de negocio, ventas y estrategia. También muestra interés por oportunidades en España.",
          link:"Objetivos profesionales", href:"career.html" },
        { id:"mun", label:"¿Qué es MUN Apartment?", keys:["mun","apartamento","alojamiento","hospedaj","turismo","reserva","anfitrion"],
          answer:"MUN Apartment es un proyecto real de alquiler turístico. Lorenzo gestiona la comunicación con huéspedes, reservas, precios, proveedores, operaciones diarias y experiencia del cliente.",
          link:"Explorar MUN", href:"mun.html" },
        { id:"skills", label:"¿Cuáles son sus habilidades?", keys:["habilidad","competenc","kpi","excel","datos","operaciones","crm","digital","skills"],
          answer:"Sus habilidades incluyen reporting de KPI, análisis de datos, Excel, atención al cliente, operaciones, canales de venta, gestión de reservas, resolución de problemas, trabajo en equipo, CAD, CNC y marketing digital.",
          link:"Ver habilidades", href:"index.html#skills" },
        { id:"education", label:"¿Cuál es su formación?", keys:["formacion","estudi","universidad","bicocca","erasmus","riga","titulo","graduado"],
          answer:"Lorenzo estudia Economía y Administración de Empresas en la Universidad de Milano-Bicocca. El portfolio menciona un Erasmus en Riga, en EKA University of Applied Sciences, y un diploma técnico en mecatrónica industrial. No se presenta la carrera universitaria como terminada.",
          link:"Formación", href:"index.html#education" },
        { id:"certification", label:"¿Qué certificaciones tiene?", keys:["certific","hubspot","marketing","curso","credencial"],
          answer:"El portfolio incluye la certificación HubSpot Academy Digital Marketing, sobre contenido, SEO, redes sociales, email marketing, estrategia y medición de resultados.",
          link:"Ver certificación", href:"index.html#certifications" },
        { id:"dj", label:"¿Qué es DJ Krios?", keys:["dj","krios","musica","evento","fiesta","boda"],
          answer:"DJ Krios es el proyecto creativo de música y eventos de Lorenzo, con sesiones para fiestas privadas, cumpleaños, graduaciones y bodas.",
          link:"Explorar DJ Krios", href:"djkrios.html" },
        { id:"contact", label:"¿Cómo puedo contactar con Lorenzo?", keys:["contact","correo","email","linkedin","telefono","entrevista","colaborar","contratar"],
          answer:"Puedes contactar con Lorenzo desde la sección de contacto del portfolio, por email a lorenzocicogna00@gmail.com o mediante su perfil de LinkedIn enlazado en el sitio.",
          link:"Contactar con Lorenzo", href:"index.html#contact" }
      ]
    }
  };

  const normalize = (value) => value.toLowerCase().normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "").trim();

  const root = document.createElement("div");
  root.className = "lc-guide";
  root.innerHTML =
    '<section class="lc-guide__panel" id="lc-guide-panel" hidden>' +
      '<div class="lc-guide__header">' +
        '<div><span class="lc-guide__eyebrow">Lorenzo Cicogna</span><strong class="lc-guide__title"></strong></div>' +
        '<button class="lc-guide__close" type="button"></button>' +
      '</div>' +
      '<div class="lc-guide__body">' +
        '<p class="lc-guide__intro"></p>' +
        '<div class="lc-guide__choices"></div>' +
        '<div class="lc-guide__answer" aria-live="polite" aria-atomic="true" hidden></div>' +
        '<form class="lc-guide__form" autocomplete="off">' +
          '<label for="lc-guide-question"></label>' +
          '<div class="lc-guide__form-row"><input id="lc-guide-question" type="text" maxlength="160" autocomplete="off" required /><button type="submit"></button></div>' +
        '</form>' +
        '<p class="lc-guide__note"></p>' +
      '</div>' +
    '</section>' +
    '<button class="lc-guide__toggle" type="button" aria-controls="lc-guide-panel" aria-expanded="false">' +
      '<span class="lc-guide__symbol" aria-hidden="true">LC</span><span class="lc-guide__toggle-label"></span>' +
    '</button>';

  document.body.appendChild(root);

  const panel = root.querySelector(".lc-guide__panel");
  const toggle = root.querySelector(".lc-guide__toggle");
  const close = root.querySelector(".lc-guide__close");
  const title = root.querySelector(".lc-guide__title");
  const intro = root.querySelector(".lc-guide__intro");
  const choices = root.querySelector(".lc-guide__choices");
  const answer = root.querySelector(".lc-guide__answer");
  const form = root.querySelector(".lc-guide__form");
  const input = root.querySelector("#lc-guide-question");
  const note = root.querySelector(".lc-guide__note");

  let language = "en";
  let currentTopic = null;

  function show(text, linkText, href) {
    answer.replaceChildren();
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    answer.appendChild(paragraph);
    if (href && linkText) {
      const link = document.createElement("a");
      link.href = href;
      link.textContent = linkText;
      answer.appendChild(link);
    }
    answer.hidden = false;
  }

  function selectTopic(id) {
    const topic = config[language].topics.find(item => item.id === id);
    if (!topic) return;
    currentTopic = id;
    show(topic.answer, topic.link, topic.href);
  }

  function render(newLang) {
    language = config[newLang] ? newLang : "en";
    const t = config[language];
    title.textContent = t.title;
    intro.textContent = t.intro;
    note.textContent = t.note;
    root.querySelector(".lc-guide__form label").textContent = t.prompt;
    root.querySelector(".lc-guide__form-row button").textContent = t.send;
    root.querySelector(".lc-guide__toggle-label").textContent = t.open;
    input.placeholder = t.placeholder;
    panel.setAttribute("aria-label", t.title);
    close.setAttribute("aria-label", t.close);
    toggle.setAttribute("aria-label", panel.hidden ? t.open : t.close);

    choices.replaceChildren();
    t.topics.forEach(topic => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = topic.label;
      button.addEventListener("click", () => selectTopic(topic.id));
      choices.appendChild(button);
    });
    if (currentTopic) selectTopic(currentTopic);
    else if (!answer.hidden) show(t.unknown, t.unknownLink, "index.html#contact");
  }

  function respond(question) {
    const text = normalize(question);
    const t = config[language];
    const match = t.topics.find(topic => topic.keys.some(key => text.includes(normalize(key))));
    if (match) selectTopic(match.id);
    else {
      currentTopic = null;
      show(t.unknown, t.unknownLink, "index.html#contact");
    }
  }

  function setOpen(open) {
    panel.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? config[language].close : config[language].open);
    if (open) close.focus();
    else {
      answer.hidden = true;
      answer.replaceChildren();
      currentTopic = null;
      input.value = "";
      toggle.focus();
    }
  }

  toggle.addEventListener("click", () => setOpen(panel.hidden));
  close.addEventListener("click", () => setOpen(false));
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const question = input.value.trim();
    input.value = "";
    if (question) respond(question);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !panel.hidden) setOpen(false);
  });

  /* The existing language script updates <html lang> on flag clicks. This
     listener runs afterwards and follows its setting without altering it. */
  document.addEventListener("click", (event) => {
    if (event.target.closest(".flag[data-lang]")) {
      render(document.documentElement.lang);
    }
  });

  root.addEventListener("click", (event) => {
    const link = event.target.closest(".lc-guide__answer a");
    if (link?.getAttribute("href")?.includes("#")) setOpen(false);
  });

  render(document.documentElement.lang);
})();
