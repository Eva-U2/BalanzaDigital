let gravity = 9.8;  // Constante gravitacional
let calibrationValue = 0;  // Valor de calibración para restar el peso del teléfono
let isCalibrated = false;

// Variables globales para almacenar aceleración
let accelerationX = 0;
let accelerationY = 0;
let accelerationZ = 0;
let totalAcceleration = 0;
let weightEstimate = 0;

// Función para calcular la aceleración total en función de los tres ejes
function calculateTotalAcceleration(x, y, z) {
    return Math.sqrt(x * x + y * y + z * z);
}

// Función que se ejecuta cuando hay movimiento
window.addEventListener('devicemotion', (event) => {
    // Captura la aceleración en los ejes X, Y, Z
    accelerationX = event.accelerationIncludingGravity.x;
    accelerationY = event.accelerationIncludingGravity.y;
    accelerationZ = event.accelerationIncludingGravity.z;

    // Calcula la aceleración total
    totalAcceleration = calculateTotalAcceleration(accelerationX, accelerationY, accelerationZ);

    // Si está calibrado, calcula el peso aproximado basado en la aceleración extra
    if (isCalibrated) {
        // Restamos el valor de calibración (peso del teléfono en reposo)
        let effectiveAcceleration = totalAcceleration - calibrationValue;

        // Si la aceleración efectiva es menor a 0, la ajustamos a 0
        if (effectiveAcceleration < 0) effectiveAcceleration = 0;

        // Calcula el peso en función de la aceleración (A = F/m, P = F/g => F = m * g)
        weightEstimate = (effectiveAcceleration / gravity); // Aproximación de masa en kg
    }

    // Actualiza los valores en el HTML
    document.getElementById('accelerationX').textContent = accelerationX.toFixed(2);
    document.getElementById('accelerationY').textContent = accelerationY.toFixed(2);
    document.getElementById('accelerationZ').textContent = accelerationZ.toFixed(2);
    document.getElementById('accelerationTotal').textContent = totalAcceleration.toFixed(2);
    document.getElementById('weight').textContent = weightEstimate.toFixed(2);
});

// Función para calibrar el dispositivo
document.getElementById('calibrateButton').addEventListener('click', () => {
    // Al presionar calibrar, capturamos la aceleración total actual
    calibrationValue = totalAcceleration;
    isCalibrated = true;
    alert('Calibración completada. Coloca el objeto sobre el dispositivo.');
});

// Reiniciar valores al hacer clic en el botón
document.getElementById('resetButton').addEventListener('click', () => {
    accelerationX = 0;
    accelerationY = 0;
    accelerationZ = 0;
    totalAcceleration = 0;
    weightEstimate = 0;
    calibrationValue = 0;
    isCalibrated = false;
    
    // Actualiza los valores en el HTML
    document.getElementById('accelerationX').textContent = accelerationX.toFixed(2);
    document.getElementById('accelerationY').textContent = accelerationY.toFixed(2);
    document.getElementById('accelerationZ').textContent = accelerationZ.toFixed(2);
    document.getElementById('accelerationTotal').textContent = totalAcceleration.toFixed(2);
    document.getElementById('weight').textContent = weightEstimate.toFixed(2);
});
