#!/bin/bash

# Rileva il sistema operativo
SYSTEM=$(uname -s)

# Funzione per installare NVM
install_nvm() {
  echo "Installazione di NVM..."
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # Carica nvm
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # Carica il completamento bash
  echo "NVM installato con successo."
}

# Funzione per installare Node.js e npm
install_node_npm() {
  echo "Installazione di Node.js v22.14.0 e npm..."
  nvm install 22.14.0
  nvm use 22.14.0
  echo "Node.js v22.14.0 e npm installati con successo."
}

install_nvm
install_node_npm

echo "Installazione NVM, NodeJS e NPM completata."

cd /frontend

npm install

npm run build

