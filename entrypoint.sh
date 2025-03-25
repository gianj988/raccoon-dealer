#!/bin/bash

check_directory_exists() {
  local directory_name="$1"

  if [[ -d "$directory_name" ]]; then
    return 1 # La cartella esiste
  else
    return 0 # La cartella non esiste
  fi
}

# Funzione per installare NVM
install_nvm() {
  echo "Installazione di NVM..."
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # Carica nvm
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # Carica il completamento bash
  echo "NVM installato con successo."
}

# Funzione per installare Node.js e npm, installa le dipendenze dei due progetti
# compila il frontend in react e avvia il server
setup_express_server_and_start() {
  echo "Preparazione server e frontend"
  cd /raccoon-dealer
  npm install
  echo "Modifica permessi di accesso ai file node_modules..."
  chmod 777 -R node_modules
  echo "Modifica permessi di accesso completata"
  exho "Build dell' applicazione frontend"
  npm run build
  echo "Modifica permessi di accesso ai file build..."
  chmod 777 -R build
  cd /server
  check_directory_exists "build"
  if [[ $? -eq 1 ]] then
    rm -rf build
  fi
  mv /raccoon-dealer/build ./build
  npm install
  chmod 777 -R node_modules
  echo "Avvio del server..."
  npm run start
}

# install_nvm
setup_express_server_and_start
