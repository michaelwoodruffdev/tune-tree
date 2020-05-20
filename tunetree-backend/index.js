const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('TuneTree'));

app.listen(port, () => console.log(`TuneTree api being served at http://localhost:${port}`));
