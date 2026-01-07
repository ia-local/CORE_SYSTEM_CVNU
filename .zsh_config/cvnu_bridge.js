#!/usr/bin/env node
const cvnu = require('../core/CORE_SYSTEM_CVNU.js');
const fs = require('fs');

/**
 * CVNU BRIDGE INTERFACE
 * Gère les flux entrants (Pipe) et les commandes directes (CLI)
 */

if (!process.stdin.isTTY) {
    // --- CAS A : FLUX ENTRANTS (ex: cat file | cvnu) ---
    let inputData = '';
    process.stdin.on('data', data => { 
        inputData += data; 
    });
    
    process.stdin.on('end', () => {
        if (inputData.trim().length > 0) {
            // Détection dynamique du titre
            let title = "CVNU INBOUND STREAM";
            if (inputData.includes('/**') || inputData.includes('const ')) {
                title = "KERNEL SOURCE ANALYSIS";
            }
            
            console.log(cvnu.system.wrapASCII(title, inputData.trim()));
        }
    });

} else {
    // --- CAS B : COMMANDES MANUELLES (ex: cvnu /stats) ---
    const args = process.argv.slice(2);
    const cmd = args.join(' ');

    if (!cmd || cmd.trim() === "") {
        console.log(cvnu.system.wrapASCII("CVNU SHELL", "Usage: cvnu [commande] ou [flux] | cvnu"));
        process.exit(0);
    }

    // Exécution via le dispatcher du Kernel
    const output = cvnu.system.onCommandReceive(cmd);
    
    if (output) {
        console.log(output);
    }
}
