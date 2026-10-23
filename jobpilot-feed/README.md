# Public Job Pilot feed (solo annunci pubblici)

Questa cartella ospita **esclusivamente** annunci di lavoro pubblici raccolti tramite le API Greenhouse e Lever e una watchlist **manuale** di programmi graduate/istituzionali ufficiali.

- [latest-jobs.json](latest-jobs.json): annunci raccolti dalle bacheche aziendali.
- [programmes-watchlist.json](programmes-watchlist.json): Ryanair, Blue Book, EDA, BCE, EASA, ecc. Non implica che siano posizioni aperte in tempo reale.
- `src/`: lo scanner con parametri generali, nessuna credenziale, nessun CV e nessun dato sulle candidature.
- Workflow: [Job Pilot - public job feed](../../.github/workflows/jobpilot-public-feed.yml), schedulato ogni giorno e avviabile da GitHub Actions.

La dashboard privata JobPilot LC (aperta da `index.html` sul computer) scarica i due JSON tramite HTTPS e li **importa localmente**. Non carica note, stati, colloqui, rifiuti o email qui.

**Perché questa separazione:** GitHub Pages non può accedere senza autorizzazione a una repository privata. Il feed usa una repository già pubblica ma contiene solo informazioni pubblicamente reperibili sulle posizioni.

**Importante:** il pulsante della dashboard importa l'ultima ricerca *pubblicata*, non forza una nuova ricerca sulle aziende. Le nuove offerte possono apparire dopo la successiva esecuzione programmata e la pubblicazione di GitHub Pages. Il feed pubblico e lo scout nella repo privata sono indipendenti ma consultano le stesse fonti iniziali; i tempi e il numero di annunci potrebbero temporaneamente differire.

## Aggiornamento automatico con protezione di `main`

Il branch `main` è protetto: ogni modifica deve passare da una pull request. Il workflow ora:

1. Verifica i file pubblici e raccoglie i nuovi annunci.
2. Crea un branch temporaneo per i **soli due JSON** del feed.
3. Apre una pull request e la integra con squash merge (nessuna approvazione richiesta dalle regole attuali).
4. Richiede esplicitamente una nuova build di GitHub Pages: i push fatti da `GITHUB_TOKEN` non avviano da soli il deploy da branch.

**Una sola impostazione GitHub necessaria:** vai su [Settings → Actions → General](https://github.com/lorenzocicogna/lorenzo-portfolio/settings/actions), scorri a **Workflow permissions**, abilita **Allow GitHub Actions to create and approve pull requests** e salva. Non disabilitare la regola Protect main e non inserire token personali.

Se l'opzione è disabilitata, il workflow conserva il branch con le nuove offerte e termina con un errore esplicativo. Puoi aprire e integrare la PR manualmente; la dashboard continuerà comunque a usare l'ultimo feed pubblicato.

Per un test usa [Actions → Job Pilot - public job feed](https://github.com/lorenzocicogna/lorenzo-portfolio/actions/workflows/jobpilot-public-feed.yml), poi **Run workflow** sul branch `main` (non **Re-run** su un vecchio run). Conferma che gli step **Create PR, merge it and request Pages rebuild** e la build GitHub Pages siano verdi.

Ogni esecuzione utilizza solo il `GITHUB_TOKEN` temporaneo del repository. Le candidature personali non vengono trasferite online.
