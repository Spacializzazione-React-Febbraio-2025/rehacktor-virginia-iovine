# progetto finale Gamers Society
## Tecnologie utilizzate:
React, Tailwind CSS, DaisyUI, Supabase, Zod, Rawg api, Github, Vercel.

1. Ho startato il progetto con React, Tailwind CSS, e la libreria DaisyUI installando i pacchetti necessari e occupandomi del set up e dello scaffolding iniziale del progetto (creando i componenti necessari, installando il React-router ed andando poi a gestire le varie rotte tramite il file Routing.jsx).
2. Per tutte le richieste che riguardavano il caricamento dei giochi all'interno del sito ci si è serviti della api: *https://rawg.io/*
3. Utilizzo di rotte dinamiche per gestire rendering e funzioni con le rispettive chiamate.
4. In useFetchSolution si è ricorso all'utilizzo di un custom hook per gestire più agilmente le chiamate asincrone e l'aggiornamento dello stato interno di diversi componenti (nello specifico, la homepage, genrepage, gamepage, genresdropdown).
5. Supabase per gestire il back end tramite l'utilizzo di tabelle create ad hoc.
6. Ho inserito una searchbar che permettesse all'utente tramite la sidebar di ricercare un gioco specifico, oltre che per categoria come si era fatto per GenresDropdown; ed inoltre, sempre tramite Supabase si è gestita tutta la parte relativa all'Autenticazione; inserendo un form per la registrazione ed un altro per l'accesso, una pagina profilo che ne consentisse le modifiche da parte dell'utente, ed una pagina di salvataggio dei preferiti che quest'ultimo avrebbe scelto tramite icone.
7. Come 'features' addizionali si è aggiunto l'infinite scroll per il caricamento dei giochi dall'api, che consente di scorrere all'infinito finché questi vengono caricati ed un Chat Box all'interno della pagina del gioco, che permette a chiunque la stia visualizzando in quel momento di poter chattare in tempo reale.
8. Per quanto riguarda il CSS (utilizzato sia in linea che nel file apposito), ho optato per un colore verde acido (green-lime) che ho ripreso per diversi elementi grafici all'interno del sito; dal logo ai pulsanti.
9. Infine, dopo aver caricato il progetto su Github, l'ho messo online tramite il servizio serverless offerto da Vercel.

