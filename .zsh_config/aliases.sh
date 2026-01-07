# Fichier: aliases.sh
alias op='node ../srv.js'
alias diag='c-diag'
# Description: Alias pour le projet de suivi d'inventaire DevOps et les opérations de développement courantes.
alias start='cvnu /start'
alias help='cvnu /help'
alias gen='cvnu /dev generate'
alias test='cvnu /dev test'
alias list='cvnu /dev list'
alias map='cvnu /map'
alias cal='cvnu /cal'
alias host='cvnu /dev /host'
alias audit='cvnu /audit'
alias stats='cvnu /stats'
alias dev='cvnu /dev'
alias rup='cvnu /rup'
alias defi_28='cvnu /defi_28'
alias city='cvnu /city report'

# Gestion des tokens JWT de sauvegarde
alias save='cvnu /save'
alias load='cvnu /load'
alias analyze='c-analyze'
alias ask='c-ask'
alias call='sys-call'
alias warp='c-warp'
alias push='c-push'

# Analyse le code source du Kernel via l'IA et formate le résultat


# --- Aliases de Gestion du Projet (Make) ---
alias jc='node'
# Configuration initiale: build, permissions, install
alias devops:setup='make setup' 
# Nettoyage du projet (supprime node_modules, database.json, etc.)
alias devops:clean='make clean' 
# Mise à jour des dépendances ou du build
alias update='make update'
alias gbuild='make build'
# Redémarrage du système
alias reNew='sudo -i reboot'
alias sys='orla agent'
# --- Aliases du Backend et de l'Inventaire ---

# Démarre le serveur Node.js sur le port 3000
alias devops:start='make start' 
# Lance l'algorithme de scan du disque (/Volumes/devops)
alias devops:scan='make inventory' 
# Lance la vérification des métriques brutes pour le dossier 'projets' (Exemple pour cmd.sh)
# --- Aliases de Validation (GitHub et Docs) ---

# Lance la validation des dépôts sur GitHub
alias devops:gh-validate='make validate'
# Lance la validation de la documentation sur Google Drive
alias devops:doc-validate='make validate-doc'

# --- Alias d'Utilitaires ---

# Ouvre le tableau de bord dans le navigateur (nécessite le serveur démarré)
alias devops:ui='open http://localhost:3145'

# --- Alias de Navigation Rapide ---

# --- Alias pour les Opérations Git (Versionnement) ---

alias gss='git status -s'               # Statut court
alias gcs='git commit -a -m "SessionStart"' # Commit de début de session
alias gca='git commit -a -m "add"'      # Commit générique 'add'
alias gcf='git commit -a -m "SessionEnd"'   # Commit de fin de session
alias gls='git log --oneline'           # Log sur une seule ligne
alias auto='git clone https://github.com/universmc/auto' # Clone rapide

# --- Alias pour la Gestion des Fichiers et la Liste ---

alias new='mkdir'           # Création de répertoire
alias add='touch'           # Création de fichier
alias edit='vim'            # Édition avec Vim

# Alias pour les listes
alias ll='ls -lh'           # Liste longue avec taille lisible
alias lt='ls -lt'           # Trie par date de modification
alias lr='ls -lR'           # Liste récursive
alias ts='tree -C'          # Arborescence avec couleurs
alias tr='tree -Cd'         # Arborescence (répertoires seulement) avec couleurs 