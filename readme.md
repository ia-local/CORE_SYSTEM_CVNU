# 💠 CVNU CORE SYSTEM (v2.5.0)
> **Cadre de Valeur Numérique Universel** conforme DDHC Art.16.

Ce dépôt contient le noyau de simulation économique pour le pilotage du Revenu Universel Progressif (RUP).

## 🚀 Installation Racine (Terminal)
1. Clonez le dépôt.
2. Liez le bridge à votre terminal :
   `source .zsh_config/aliases.sh`
3. Lancez le système :
   `cvnu /start`

## 📡 Architecture
- **Kernel** : Logique métier et monétisation.
- **Bridge** : Couplage IA locale (Orla/Ollama).
- **Server** : API Gateway sur port 3145.