document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const resultsDiv = document.getElementById('results');
    const resultsSection = document.getElementById('resultsSection');
    const mapDiv = document.getElementById('map');
    const toggleHistoryButton = document.getElementById('toggleHistoryButton');
    const historyList = document.getElementById('history');
    const paginationContainer = document.createElement('div');
    paginationContainer.id = 'pagination';
    let currentPage = 1;
    let map; // Variable para el mapa

    toggleHistoryButton.addEventListener('click', () => {
        if (historyList.classList.contains('hidden')) {
            cargarHistorial(currentPage);
            historyList.classList.remove('hidden');
            toggleHistoryButton.textContent = 'Ocultar';
        } else {
            historyList.classList.add('hidden');
            toggleHistoryButton.textContent = 'Ver';
        }
    });

    searchButton.addEventListener('click', () => {
        const termino = searchInput.value.trim();

        if (!termino) {
            resultsDiv.textContent = 'Por favor, ingresa una ciudad.';
            resultsSection.classList.remove('hidden');
            resultsSection.classList.add('visible');
            return;
        }

        fetch('/buscar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    termino
                })
            })
            .then(res => res.json())
            .then(data => {
                resultsDiv.innerHTML = '';
                if (data.lugares.length === 0) {
                    resultsDiv.textContent = 'No se encontraron resultados.';
                } else {
                    data.lugares.forEach(lugar => {
                        const button = document.createElement('button');
                        button.textContent = lugar.nombre;
                        button.addEventListener('click', () => {
                            mostrarClima(lugar);
                        });
                        resultsDiv.appendChild(button);
                    });
                }
                resultsSection.classList.remove('hidden');
                resultsSection.classList.add('visible');
            });
    });

    const mostrarClima = (lugar) => {
        fetch('/clima', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    lat: lugar.lat,
                    lng: lugar.lng
                })
            })
            .then(res => res.json())
            .then(climaData => {
                const iconCode = climaData.clima.icon;
                const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    
                resultsDiv.innerHTML = `
                <div class="result-card">
                    <h3 class="result-title">${lugar.nombre}</h3>
                    <div class="weather-info">
                        <div class="weather-icon">
                            <img src="${iconUrl}" alt="Icono de clima" />
                        </div>
                        <div class="weather-details">
                            <p class="temperature"><strong>Temperatura:</strong> ${climaData.clima.temp}°C</p>
                            <p class="description"><strong>Descripción:</strong> ${climaData.clima.desc}</p>
                            <p><strong>Mínima:</strong> ${climaData.clima.min}°C</p>
                            <p><strong>Máxima:</strong> ${climaData.clima.max}°C</p>
                        </div>
                    </div>
                    <div id="map"></div>
                    <button id="backButton">🔙 Volver al menú</button>
                </div>
            `;
    
                // Mostrar el mapa
                mostrarMapa(lugar.lat, lugar.lng, lugar.nombre);
    
                // Configurar botón "Volver"
                const backButton = document.getElementById('backButton');
                backButton.addEventListener('click', limpiarResultados);
    
                // Animación para los resultados
                document.getElementById('resultsSection').classList.remove('hidden');
                document.getElementById('resultsSection').classList.add('visible');
            });
    };
    



    const mostrarMapa = (lat, lng, nombre) => {
        const mapContainer = document.getElementById('map');
        mapContainer.classList.add('visible'); // Mostrar el mapa
        mapContainer.innerHTML = ''; // Limpiar cualquier contenido previo

        const map = L.map(mapContainer).setView([lat, lng], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

        L.marker([lat, lng]).addTo(map)
            .bindPopup(`<b>${nombre}</b>`)
            .openPopup();
    };


    const limpiarResultados = () => {
        resultsDiv.innerHTML = '';
        resultsSection.classList.remove('visible');
        resultsSection.classList.add('hidden');
        searchInput.value = '';
        mapDiv.classList.add('hidden');
        if (map) map.remove(); // Elimina el mapa para evitar duplicados
        map = null;
    };

    const cargarHistorial = (page) => {
        fetch(`/historial?page=${page}&limit=10`)
            .then(res => res.json())
            .then(data => {
                historyList.innerHTML = '';
                paginationContainer.innerHTML = '';

                if (data.historial.length === 0) {
                    historyList.innerHTML = '<li>No hay historial disponible.</li>';
                } else {
                    data.historial.forEach((item, index) => {
                        const li = document.createElement('li');
                        li.textContent = `${index + 1 + (page - 1) * 10}. ${item}`;
                        historyList.appendChild(li);
                    });

                    for (let i = 1; i <= data.totalPages; i++) {
                        const button = document.createElement('button');
                        button.textContent = i;
                        button.classList.add('pagination-button');
                        if (i === data.currentPage) {
                            button.classList.add('active');
                        }
                        button.addEventListener('click', () => {
                            currentPage = i;
                            cargarHistorial(i);
                        });
                        paginationContainer.appendChild(button);
                    }
                    historyList.appendChild(paginationContainer);
                }
            });
    };

    cargarHistorial();
});