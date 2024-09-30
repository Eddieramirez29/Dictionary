const input = document.getElementById('searchBar');
const wordDisplay = document.getElementById('word');
const spellingWord = document.getElementById('pronunciation');

function requesting() {
    const wordA = input.value.trim();  // Obtener el valor del input y eliminar espacios en blanco

    // Verificar que el input no esté vacío
    if (!wordA) {
        alert('Por favor, introduce una palabra.');
        return;
    }

    // Define la URL de la API
    const url = `https://od-api-sandbox.oxforddictionaries.com/api/v2/entries/en-gb/${wordA}`;

    // Define tus headers
    const headers = {
        'Accept': 'application/json',
        'app_id': '3e3bb53b',  // Tu app_id
        'app_key': '9be6420317b9a71a16a1e28346a7977f'  // Tu app_key
    };

    // Hacer la solicitud a la API usando fetch
    fetch(url, {
        method: 'GET',
        headers: headers
    })
    .then(response => {
        if (!response.ok) {  // Manejo de errores HTTP
            throw new Error('Error en la solicitud: ' + response.statusText);
        }
        return response.json();  // Parsear la respuesta JSON
    })
    .then(data => {
        // Log de toda la data
        console.log(data);

        // Extraer detalles de pronunciación (si están disponibles)
        const pronunciation = data.results[0].lexicalEntries[0].entries[0].pronunciations[0];
        
        // Mostrar la palabra y la pronunciación
        wordDisplay.textContent = input.value;
        spellingWord.textContent = pronunciation.phoneticSpelling;
        
        // Log de la URL del archivo de audio
        console.log(`Audio File URL: ${pronunciation.audioFile}`);
        
        // Reproducir el audio de la pronunciación (opcional)
        const audio = new Audio(pronunciation.audioFile);
        // audio.play();  // Descomenta esta línea si quieres reproducir automáticamente
    })
    .catch(error => {
        console.error('Error:', error);
        alert('No se pudo encontrar la palabra.'); // Mensaje de error para el usuario
    });
}

// Agregar el evento al input para detectar la tecla "Enter"
input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        requesting();  // Llama a la función requesting
    }
});

