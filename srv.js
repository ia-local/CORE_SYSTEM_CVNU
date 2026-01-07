const express = require('express');
const http = require('http'); // Obligatoire pour Socket.io
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const socketio = require('socket.io');
const Groq = require('groq-sdk');
const app = express();
const { system, KERNEL } = require('./docs/core/CORE_SYSTEM_CVNU.js');
const server = http.createServer(app); // On crée le serveur HTTP
const io = socketio(server); // On lie Socket.io au serveur

const PORT = 3145;
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });


app.use(cors());
app.use(bodyParser.json());
// 1. Routage statique pour GitHub Pages (Dossier /docs)
app.use(express.static(path.join(__dirname, 'docs')));
app.use(cors({
    origin: '*', // Permet à n'importe quelle interface (GitHub Pages ou local) d'appeler l'API
    methods: ['POST', 'GET']
}));
// 2. Endpoint Unifié SYS / AI / AGI
app.post('/api/sys/exec', async (req, res) => {
    const { command, mode } = req.body;
    
    try {
        let output = "";

        // On vérifie que le Kernel est bien chargé
        if (!global.cvnu_system) {
            throw new Error("Kernel non initialisé sur le serveur");
        }

        if (mode === 'SYS') {
            // Utilisation de la méthode asynchrone pour éviter [object Promise]
            output = await global.cvnu_system.onCommandReceive(command);
        } 
        else if (mode === 'AI' || mode === 'AGI') {
            const systemPrompt = mode === 'AGI' 
                ? `Tu es l'AGI souveraine CVNU. Etat : ${JSON.stringify(global.KERNEL.STATE)}`
                : "Tu es un assistant technique.";

            const completion = await groq.chat.completions.create({
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: command }
                ],
                model: "llama-3.1-8b-instant",
            });
            output = completion.choices[0].message.content;
        }

        res.json({ success: true, data: output });
    } catch (error) {
        console.error("❌ Erreur API:", error.message);
        res.status(500).json({ success: false, data: "ERREUR KERNEL: " + error.message });
    }
});
// --- instance role:system / role:user / role:assistant ---

// 1. Route AI (Brut : Assistant rapide)
app.post('/api/ai', async (req, res) => {
    const { prompt } = req.body;
    const completion = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }], // User -> Assistant
        model: "llama-3.1-8b-instant",
    });
    res.json({ result: completion.choices[0].message.content });
});

// 2. Route AGI (Complexe : System context + User prompt)
app.post('/api/agi/unified-query', async (req, res) => {
    const { prompt, context } = req.body;
    const completion = await groq.chat.completions.create({
        messages: [
            { role: "system", content: `Tu es le Kernel AGI. Contexte : ${JSON.stringify(context)}` }, // Role: System
            { role: "user", content: prompt } // Role: User
        ],
        model: "llama-3.1-8b-instant",
        temperature: 0.2
    });
    res.json({ result: completion.choices[0].message.content });
});
// Pour être sûr que system est accessible dans vos routes :
global.cvnu_system = system; 
global.KERNEL = KERNEL;

// Utiliser server.listen au lieu de app.listen
server.listen(PORT, () => {
    console.log("✅ [BOOT] Kernel chargé et disponible pour les routes /api");
    console.log(`🚀 Serveur sur http://localhost:${PORT}`);
});