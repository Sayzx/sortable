const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;

// sert les fichiers statiques du dossier web
app.use(express.static(path.join(__dirname, '..', 'web')));

// sert le fichier JSON qui contient les données
app.get('/data', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'data', 'all.json'));
});

// lance sur le port 8080
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
