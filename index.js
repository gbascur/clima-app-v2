require('dotenv').config();
const express = require('express');
const path = require('path');
const Busquedas = require('./models/busquedas');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const busquedas = new Busquedas();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/buscar', async (req, res) => {
    const { termino } = req.body;

    if (!termino) {
        return res.status(400).json({ error: 'El término de búsqueda es obligatorio.' });
    }
    const lugares = await busquedas.ciudad(termino);

    if (lugares.length > 0) {
        busquedas.agregarHistorial(lugares[0].nombre);
    }

    res.json({ lugares });
});

app.post('/clima', async (req, res) => {
    const { lat, lng } = req.body;

    if (!lat || !lng) {
        return res.status(400).json({ error: 'Latitud y longitud son obligatorias.' });
    }

    const clima = await busquedas.climaLugar(lat, lng);
    res.json({ clima });
});

// app.post('/historial', (req, res) => {
//     res.json({ historial: busquedas.historialCapitalizado });
// });

// app.get('/historial', (req, res) => {
//     res.json({ historial: busquedas.historialCapitalizado });
// });

app.get('/historial', (req, res) => {
    const { page = 1, limit = 10 } = req.query; 
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedHistorial = busquedas.historialCapitalizado.slice(startIndex, endIndex);
    const totalPages = Math.ceil(busquedas.historialCapitalizado.length / limit);

    res.json({
        historial: paginatedHistorial,
        totalPages,
        currentPage: Number(page),
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
