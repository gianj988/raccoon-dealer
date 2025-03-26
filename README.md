# RaccoonDealer

POC for a Raccoon e-commerce with NodeJS+ExpressJS e ReactJS

Questo è un semplice progetto demo per un ecommerce con frontend in ReactJS/Redux
e backend in NodeJS con ODM Mongoose e MongoDB per la persistenza dei dati.

Tutto viene eseguito su container, uno per il backend che serve il sito e uno per il database.

La comunicazione viene impostata con uan network automaticamente creata attraverso
le impostazioni nel docker-compose file.

AAA: questo progetto è compatibile con Ubuntu e MacOS.
Gli unici requisiti per eseguire il file "setup.sh" sono:

- avere accesso di root
- poter eseguire i comandi dpkg e curl
- (MacOS only) installare brew se non è già installato
- poter eseguire files di script in bash
- avere git installato

1. clonare in una cartella questa repository pubblica su gitHub: [Raccoon Dealer Repository](https://github.com/gianj988/raccoon-dealer.git)
2. entrare nella cartella che si genererà (raccoon_dealer) e creare una cartella vuota chiamata: mdb_data
3. aprire un terminale all' interno della cartella della repository
4. eseguire il comando "sudo chmod 777 mdb_data" per assicurarsi che la cartella sia leggibile e scrivibile da tutti
5. eseguire il file di script bash: setup.sh

Il file, se i pre-requisiti sono stati soddisfatti dovrebbe

#### Su ubuntu

- verificare che docker e docker-compose siano installati correttamente e nel caso installarli
- avviare docker
- avviare il file docker-compose che farà partire i container

#### Su MacOS

- verificare che Colima, docker e docker-compose siano installati correttamente e nel caso installarli
- avviare Colima se già non lo è
- avviare docker
- avviare il file docker-compose che farà partire i container

Se il file parte regolarmente dovreste vedere che esegue una serie di operazioni. Al termine dei suoi check
e dell' avvio dei container dovreste vedere i logs di Mongo e del container di node.
A questo punto dovreste poter accedere al sito servito su: "localhost:3000"

per fermare il server usare la combinazione ctrl + c sul terminale da cui è stato eseguito.

dovreste accedere alla home page dell'ecommerce.

NB: IL FILE setup.sh E' STATO TESTATO SOLO SULLA MIA MACCHINA UBUNTU.
Non avendo un Mac, non ho potuto testare quella parte di script. Aprire delle issues nella repository github nel caso.
