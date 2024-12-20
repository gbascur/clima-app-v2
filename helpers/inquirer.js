// const express = require('express');
// const path = require('path');
// const bodyParser = require('body-parser');

// const app = express();
// const PORT = 3000;

// // Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

// // Routes
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// app.post('/action', (req, res) => {
//     const { opcion } = req.body;
//     switch (opcion) {
//         case '1':
//             res.json({ message: 'Buscar ciudad seleccionado.' });
//             break;
//         case '2':
//             res.json({ message: 'Historial seleccionado.' });
//             break;
//         case '0':
//             res.json({ message: 'Saliendo del programa.' });
//             break;
//         default:
//             res.status(400).json({ message: 'Opción no válida.' });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Servidor corriendo en http://localhost:${PORT}`);
// });

// // Public/index.html
// /*
// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Menú Interactivo</title>
//     <link rel="stylesheet" href="styles.css">
// </head>
// <body>
//     <div class="menu-container">
//         <h1>¿Qué te gustaría hacer hoy?</h1>
//         <form id="menuForm">
//             <button type="button" class="menu-option" data-option="1">Buscar una ciudad</button>
//             <button type="button" class="menu-option" data-option="2">Ver historial</button>
//             <button type="button" class="menu-option" data-option="0">Salir</button>
//         </form>
//         <p id="response"></p>
//     </div>
//     <script src="script.js"></script>
// </body>
// </html>
// */

// // Public/styles.css
// /*
// body {
//     font-family: Arial, sans-serif;
//     background-color: #f4f4f9;
//     color: #333;
//     text-align: center;
//     padding: 20px;
// }
// .menu-container {
//     max-width: 400px;
//     margin: 0 auto;
//     padding: 20px;
//     background: #fff;
//     border-radius: 8px;
//     box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
// }
// .menu-option {
//     display: block;
//     width: 100%;
//     padding: 10px;
//     margin: 10px 0;
//     background: #007bff;
//     color: #fff;
//     border: none;
//     border-radius: 4px;
//     cursor: pointer;
//     font-size: 16px;
// }
// .menu-option:hover {
//     background: #0056b3;
// }
// #response {
//     margin-top: 20px;
//     font-weight: bold;
// }
// */

// // Public/script.js
// /*
// document.addEventListener('DOMContentLoaded', () => {
//     const form = document.getElementById('menuForm');
//     const response = document.getElementById('response');

//     form.addEventListener('click', (e) => {
//         if (e.target.classList.contains('menu-option')) {
//             const opcion = e.target.getAttribute('data-option');

//             fetch('/action', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ opcion })
//             })
//                 .then(res => res.json())
//                 .then(data => {
//                     response.textContent = data.message;
//                 })
//                 .catch(err => {
//                     response.textContent = 'Error: ' + err.message;
//                 });
//         }
//     });
// });
// */
