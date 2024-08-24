function showToast(message) {
    Toastify({
        text: message,
        duration: 3000, // Duración en milisegundos
        close: true,
        gravity: "bottom", // "top" or "bottom"
        position: "right", // "left" or "right"
        backgroundColor: "#4CAF50", // Color de fondo
        stopOnFocus: true // Evita que el toast se esconda si el usuario pasa el ratón por encima
    }).showToast();
}

// Función para verificar la validez del texto
function esTextoValido(texto) {
    // Verificar si contiene caracteres especiales o mayúsculas
    return /^[a-z\s]*$/.test(texto);
}

// Función para encriptar el texto
function encriptar(texto) {
    return texto
        .replace(/e/g, 'enter')
        .replace(/i/g, 'imes')
        .replace(/a/g, 'ai')
        .replace(/o/g, 'ober')
        .replace(/u/g, 'ufat');
}

// Función para desencriptar el texto
function desencriptar(texto) {
    return texto
        .replace(/enter/g, 'e')
        .replace(/imes/g, 'i')
        .replace(/ai/g, 'a')
        .replace(/ober/g, 'o')
        .replace(/ufat/g, 'u');
}

// Manejar el clic en el botón de encriptar
document.getElementById('encryptBtn').addEventListener('click', function() {
    const inputText = document.getElementById('inputText').value;
    
    if (esTextoValido(inputText)) {
        const outputText = encriptar(inputText);
        mostrarResultado(outputText);
    } else {
        showToast('Por favor, ingresa solo texto en minúsculas y sin caracteres especiales.');
    }
});

// Manejar el clic en el botón de desencriptar
document.getElementById('decryptBtn').addEventListener('click', function() {
    const inputText = document.getElementById('inputText').value;
    
    if (esTextoValido(inputText)) {
        const outputText = desencriptar(inputText);
        mostrarResultado(outputText);
    } else {
        showToast('Por favor, ingresa solo texto en minúsculas y sin caracteres especiales.');
    }
});

// Manejar el clic en el botón de copiar
document.getElementById('copyBtn').addEventListener('click', function() {
    const outputText = document.getElementById('outputText').textContent;
    
    if (outputText) {
        // Verificar si la API del portapapeles está disponible
        if (navigator.clipboard) {
            navigator.clipboard.writeText(outputText)
                .then(() => {
                    showToast('Texto copiado al portapapeles');
                    // Limpiar el campo de entrada después de copiar
                    document.getElementById('inputText').value = '';
                    // Limpiar el texto de salida
                    mostrarResultado('');
                })
                .catch(err => {
                    console.error('Error al copiar el texto: ', err);
                });
        } else {
            // Fallback si la API no está disponible
            fallbackCopyText(outputText);
        }
    } else {
        showToast('No hay texto para copiar');
    }
});

// Función para mostrar el resultado y ocultar el mensaje de marcador de posición
function mostrarResultado(texto) {
    const placeholderMessage = document.getElementById('placeholderMessage');
    const outputTextElement = document.getElementById('outputText');
    const copyButton = document.getElementById('copyBtn');
    const outputImage = document.getElementById('outputImage');
    
    if (texto) {
        placeholderMessage.style.display = 'none';
        outputTextElement.style.display = 'block';
        copyButton.style.display = 'inline-block';
        outputTextElement.textContent = texto;
        outputImage.style.display = 'none';
    } else {
        placeholderMessage.style.display = 'block';
        outputTextElement.style.display = 'none';
        copyButton.style.display = 'none';
        outputImage.style.display = 'block'; 
    }
}
