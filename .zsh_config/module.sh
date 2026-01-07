# Pilotage du serveur distant (Port 3145)
# Usage: sys-call "AGI" "Analyse les revenus du jour"
sys-call() {
    local MODE=$1
    local CMD=$2
    
    echo "📡 Transmission au Serveur (Port 3145) | Mode: $MODE"
    
    curl -s -X POST http://localhost:3145/api/sys/exec \
        -H "Content-Type: application/json" \
        -d "{\"mode\": \"$MODE\", \"command\": \"$CMD\"}" \
        | jq -r '.data' | cvnu
}

c-ask() {
    if [ -z "$1" ]; then
        echo "❌ Usage: c-ask \"Votre question sur le code source\""
        return 1
    fi

    echo "🔍 Analyse du Kernel demandée : \"$*\""
    
    # Pipeline : Lecture -> IA (avec contexte complet) -> Bridge CVNU
    cat ../core/CORE_SYSTEM_CVNU.js | orla agent "$*" | cvnu
}
c-analyze() {
    echo "🧠 Analyse du Kernel en cours..."
    # 1. On lit le fichier
    # 2. On l'envoie à l'IA avec une instruction précise
    # 3. On pipe le résultat dans le bridge pour le Warp-ASCII
    cat ../core/CORE_SYSTEM_CVNU.js | orla agent "Analyse ce code source. Résume les 3 fonctions principales et vérifie la conformité DDHC Art 16. Réponds de manière concise." | cvnu
}
c-warp() {
    # On exécute l'agent avec l'argument $1, puis on pipe vers cvnu
    orla agent "$1" | cvnu
}
# Usage: c-push "Message de commit"
c-push() {
    git add .
    git commit -m "🚀 [CVNU-UPDATE] $1"
    git push origin main
    echo "✅ Kernel déployé sur https://github.com/ia-local/CORE_SYSTEM_CVNU" | cvnu
}
function c-diag() {
    # 1. Ressources Matérielles (macOS)
    local cpu_load=$(top -l 1 | grep "CPU usage" | awk '{print $3}')
    local ram_free=$(top -l 1 | grep "PhysMem" | awk '{print $6}')
    
    # 2. État du Kernel CVNU (Extraction simplifiée)
    # Note: On récupère les points et le niveau depuis le KERNEL.STATE
    local kernel_lvl=$(cvnu /stats | grep "Niveau" | awk '{print $NF}')
    
    # 3. Assemblage du Prompt (L'argument manquant)
    local final_prompt="Rapport de santé Sovereign Unit : 
    - CPU: ${cpu_load}
    - RAM Libre: ${ram_free}
    - Kernel Level: ${kernel_lvl}
    Analyse la stabilité système et réponds en format court."

    # 4. Exécution : On donne le prompt en ARGUMENT à orla, puis on pipe vers le warpASCII
    orla agent "$final_prompt" | cvnu
}
echo '\033[0m' &&
say HACK