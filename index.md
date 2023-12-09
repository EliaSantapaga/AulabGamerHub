# Requisiti Progetto

Per questo progetto, utilizzerai tutto ciò che hai imparato in questo corso per creare una SPA React che:
* Ha almeno 4 pagine
* Si integra con una web API esterna
* Effettua richieste API in risposta alle interazioni dell'utente
* Condivide i dati all'interno dell'applicazione utilizzando l'API Context o ogni altra Global state management libraries a scelta
* Utilizza una soluzione di styling o una libreria di componenti a scelta
* Utilizza un Backend as a Service (BaaS) per autenticare utenti e salvare dati per gli utenti. 
* Viene distribuito sul Web

---

- [API](#api)
  - [Scelta di una API esistente](#scelta-di-una-api-esistente)
  - [Utilizza un backend come servizio (BaaS)](#utilizza-un-backend-come-servizio)
- [Proposta](#proposta)
- [Project Submission](#project-submission)s
- [FAQs](#faqs)

## API

### Scelta di una API esistente

* Ricerca una API esistente da questa lista [lista APIs](https://github.com/public-apis/public-apis)
* Utilizza l'API fornita durante le lezioni del corso [Rawg.io/docs](https://rawg.io/apidocs)
* Idealmente prova a trovare un'API che:
   * Gratuita
   * Supporta CORS
     * Se l'API che desideri utilizzare non supporta CORS, puoi provare a trovare un proxy CORS o crearne uno tuo
   * Richiede solo una chiave API e non richiede OAuth
     * Se l'API richiede OAuth, sarà molto più difficile da integrare e potrebbe richiedere un backend personalizzato

### Utilizza un backend come servizio (BaaS)

* Per utilizzare i dati di un'API esistente, puoi utilizzare un BaaS come supabase o firebase per autenticare gli utenti e archiviare i dati per i tuoi utenti

## Project Plan

Quando inizi a lavorare sul tuo progetto, sostituisci il contenuto di [project-plan.md](./project-plan.md) con il piano del tuo progetto.

## FAQs

* L'app memorizzerà i dati utente localmente?
  * No, verrá richiesta l'integrazione di un backend o BaaS come supabase.
* L'app memorizzerà i dati utente nel cloud?
  * Si, ciò perció richiede in genere un backend personalizzato o BaaS da intergrare al progetto React.
* L'app consentirà agli utenti di accedere?
  * Si, integrando il progetto React con una soluzione di autenticazione.
