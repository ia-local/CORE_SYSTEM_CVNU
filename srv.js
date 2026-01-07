const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const Groq = require('groq-sdk');
const { system, KERNEL } = require('./core/CORE_SYSTEM_CVNU.js');

const app = express();
const PORT = 3145;
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.use(cors());
app.use(bodyParser.json());

// 1. Routage statique pour GitHub Pages (Dossier /docs)
app.use(express.static(path.join(__dirname, 'docs')));

// 2. Endpoint Unifié SYS / AI / AGI
app.post('/api/sys/exec', async (req, res) => {
    const { command, mode } = req.body;
    try {
        let output = "";

        if (mode === 'SYS') {
            // Exécution directe dans le Kernel CVNU
            output = system.onCommandReceive(command);
        } 
        else if (mode === 'AI' || mode === 'AGI') {
            // Construction du contexte pour l'AGI
            const systemPrompt = mode === 'AGI' 
                ? `Tu es l'AGI souveraine CVNU. Etat actuel : ${JSON.stringify(KERNEL.STATE.USER_CVNU)}`
                : "Tu es un assistant technique concis.";

            const completion = await groq.chat.completions.create({
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: command }
                ],
                model: "llama3-70b-8192",
            });
            output = completion.choices[0].message.content;
        }

        res.json({ status: 'success', data: output });
    } catch (error) {
        res.status(500).json({ status: 'error', data: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`\n🚀 CVNU Core Server actif sur http://localhost:${PORT}`);
    console.log(`📂 GitHub Pages local view: http://localhost:${PORT}/index.html`);
});