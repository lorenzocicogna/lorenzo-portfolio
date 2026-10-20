# Public Job Pilot feed (solo annunci pubblici)

Questa cartella ospita **esclusivamente** annunci di lavoro pubblici raccolti tramite le API Greenhouse e Lever e una watchlist **manuale** di programmi graduate/istituzionali ufficiali.

- [latest-jobs.json](latest-jobs.json): annunci raccolti dalle bacheche aziendali.
- [programmes-watchlist.json](programmes-watchlist.json): Ryanair, Blue Book, EDA, BCE, EASA, ecc. Non implica che siano posizioni aperte in tempo reale.
- `src/`: lo scanner con parametri generali, nessuna credenziale, nessun CV e nessun dato sulle candidature.
- Workflow: [Job Pilot - public job feed](../../.github/workflows/jobpilot-public-feed.yml), schedulato ogni giorno e avviabile da GitHub Actions.

La dashboard privata JobPilot LC (aperta da `index.html` sul computer) scarica i due JSON tramite HTTPS e li **importa localmente**. Non carica note, stati, colloqui, rifiuti o email qui.

**Perché questa separazione:** GitHub Pages non può accedere senza autorizzazione a una repository privata. Il feed usa una repository già pubblica ma contiene solo informazioni pubblicamente reperibili sulle posizioni.

**Importante:** il pulsante della dashboard importa l'ultima ricerca *pubblicata*, non forza una nuova ricerca sulle aziende. Le nuove offerte possono apparire dopo la successiva esecuzione programmata e la pubblicazione di GitHub Pages. Il feed pubblico e lo scout nella repo privata sono indipendenti ma consultano le stesse fonti iniziali; i tempi e il numero di annunci potrebbero temporaneamente differire.
