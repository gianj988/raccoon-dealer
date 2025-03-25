#!/bin/bash

# Rileva il sistema operativo
SYSTEM=$(uname -s)

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

RACCOON_DEALER_IMAGE="raccoon-dealer"

check_directory_exists() {
  local directory_name="$1"

  if [[ -d "$directory_name" ]]; then
    return 1 # La cartella esiste
  else
    return 0 # La cartella non esiste
  fi
}

# Funzione per installare Docker Engine su Ubuntu
install_docker_ubuntu() {
  echo "Installazione di Docker Engine su Ubuntu..."
  sudo apt-get update
  sudo apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
  if [ -d "/etc/apt/keyrings" ]; then
    echo "Cartella apt/keyrings già esistente"
  else
    sudo mkdir -p /etc/apt/keyrings
  fi
  if [ -f "/etc/apt/keyrings/docker.gpg" ]; then
    echo "keyrings/docker.gpg già esistente"
  else
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
      $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
  fi
  sudo apt-get update
  sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
  echo "Docker Engine installato con successo su Ubuntu."
  sudo groupadd docker
  echo "Docker group aggiunto"
  sudo usermod -aG docker $USER
  echo "Utente corrente aggiunto al gruppo docker"
}

# Funzione per installare Docker Engine su macOS con Colima
install_docker_macos_colima() {
  echo "Installazione di Docker Engine su macOS con Colima..."

  # Installazione di Homebrew
  if ! command -v brew &> /dev/null; then
    echo "Homebrew non trovato. Installazione di Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  fi

  brew update
  brew install colima docker docker-compose

  # Avvia Colima con configurazione predefinita
  if ! colima ls | grep running &> /dev/null; then
        colima start
  fi

  echo "Docker Engine installato con successo su macOS usando Colima."
}

# avvio docker compose file da ubuntu

check_docker_and_run_compose() {

  if ! command -v docker &> /dev/null; then
    echo "Docker non è installato. Installa Docker e riprova."
    return 1
  fi

  if ! docker ps &> /dev/null; then
    echo "Docker sembra non essere in esecuzione o ci sono problemi con l'installazione."
    return 1
  fi

  if ! command -v docker compose &> /dev/null; then
    echo "Docker compose non è installato. Installa docker compose e riprova."
    return 1
  fi
  # Verifica se docker-compose.yml esiste nella directory corrente
  if [ ! -f "docker-compose.yml" ]; then
    echo "Il file docker-compose.yml non è stato trovato nella directory corrente."
    return 1
  fi
  # Esegui docker-compose up
  echo "Docker è in esecuzione. Avvio raccoon_dealer..."
  echo "Docker cleanup"
  if [ -z "$(docker images -q $RACCOON_DEALER_IMAGE &> /dev/null)" ]; then
    echo "Rimozione immagine precedente..."
    docker rmi $(docker images -q $RACCOON_DEALER_IMAGE)
  fi
  docker compose stop
  docker compose rm -sfv
  docker compose down -v --rmi
  docker compose up
  return 0
}

# avvio docker compose file da macOS

check_colima_and_run_compose() {
  if ! command -v colima &> /dev/null; then
    echo "Colima non è installato. Installa Colima e riprova."
    return 1
  fi

  if ! command -v docker compose &> /dev/null; then
      echo "Docker compose non è installato. Installa docker compose e riprova."
      return 1
  fi

  if [ ! -f "docker-compose.yml" ]; then
    echo "Il file docker-compose.yml non è stato trovato nella directory corrente."
    return 1
  fi

  colima status > /dev/null 2>&1
  if [ $? -ne 0 ]; then
    echo "Colima non è in esecuzione. Avvio colima."
    colima start
  fi

  echo "Colima è in esecuzione. Avvio raccoon_dealer..."
  echo "Docker cleanup"
  if [ -z "$(docker images -q $RACCOON_DEALER_IMAGE &> /dev/null)" ]; then
    echo "Rimozione immagine precedente..."
    docker rmi $(docker images -q $RACCOON_DEALER_IMAGE)
  fi
  docker compose stop
  docker compose rm -sfv
  docker compose down -v --rmi
  docker compose up
  return 0
}

verify_docker_installation_and_start() {
  cd $SCRIPT_DIR;
  case "$SYSTEM" in
    Linux)
      check_docker_and_run_compose
      ;;
    Darwin)
      check_colima_and_run_compose
      ;;
    *)
      echo "Sistema operativo non supportato."
      exit 1
      ;;
  esac
}

# Installazione basata sul sistema operativo
case "$SYSTEM" in
  Linux)
    install_docker_ubuntu
    ;;
  Darwin)
    install_docker_macos_colima
    ;;
  *)
    echo "Sistema operativo non supportato."
    exit 1
    ;;
esac

verify_docker_installation_and_start