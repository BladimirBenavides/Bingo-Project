// Referencias a elementos del DOM
const numeroActual = document.getElementById('numeroActual');
const contador = document.getElementById('contador');
const historial = document.getElementById('historial');
const btnSiguiente = document.getElementById('btnSiguiente');
const btnReiniciar = document.getElementById('btnReiniciar');
const mensaje = document.getElementById('mensaje');

// Función para obtener el siguiente número
async function obtenerSiguienteNumero() {
    try {
        const response = await fetch('/api/bingo/siguiente-numero');
        const data = await response.json();

        if (data.exito) {
            // Actualizar número actual con animación
            numeroActual.style.animation = 'none';
            setTimeout(() => {
                numeroActual.textContent = data.numero;
                numeroActual.style.animation = 'fadeIn 0.5s ease-in-out';
            }, 10);

            // Actualizar contador
            contador.textContent = data.cantidadNumeros;

            // Actualizar historial
            actualizarHistorial();

            // Limpiar mensaje
            mensaje.className = 'mensaje';
            mensaje.style.display = 'none';
        } else {
            // No hay más números
            mostrarMensaje(data.mensaje, 'error');
            btnSiguiente.disabled = true;
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al obtener el número', 'error');
    }
}

// Función para reiniciar el juego
async function reiniciarJuego() {
    try {
        const response = await fetch('/api/bingo/reiniciar', {
            method: 'POST'
        });
        const data = await response.json();

        if (data.exito) {
            // Resetear interfaz
            numeroActual.textContent = '-';
            contador.textContent = '0';
            historial.innerHTML = '';
            btnSiguiente.disabled = false;

            mostrarMensaje('Partida reiniciada...', 'exito');

            // Ocultar mensaje después de 2 segundos
            setTimeout(() => {
                mensaje.className = 'mensaje';
                mensaje.style.display = 'none';
            }, 2000);
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al reiniciar', 'error');
    }
}

// Función para actualizar el historial
async function actualizarHistorial() {
    try {
        const response = await fetch('/api/bingo/numeros-usados');
        const data = await response.json();

        historial.innerHTML = '';
        data.numeros.forEach(numero => {
            const div = document.createElement('div');
            div.className = 'numero-historial';
            div.textContent = numero;
            historial.appendChild(div);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

// Función para mostrar mensajes
function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.className = `mensaje ${tipo}`;
    mensaje.style.display = 'block';
}

// Event Listeners
btnSiguiente.addEventListener('click', obtenerSiguienteNumero);
btnReiniciar.addEventListener('click', reiniciarJuego);

// Atajos de teclado
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !btnSiguiente.disabled) {
        e.preventDefault();
        obtenerSiguienteNumero();
    }
    if (e.code === 'KeyR' && e.ctrlKey) {
        e.preventDefault();
        reiniciarJuego();
    }
});

// Cargar historial al iniciar (si existe)
window.addEventListener('load', actualizarHistorial);