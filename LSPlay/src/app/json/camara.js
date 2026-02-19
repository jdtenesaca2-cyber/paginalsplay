const video = document.getElementById("video");
const estado = document.getElementById("estado");
const resultadoEvaluacion = document.getElementById("resultadoEvaluacion");

let streamGlobal = null; // Para guardar el stream y poder apagarlo

async function iniciarCamara() {
    try {
        if (streamGlobal) {
            // Ya está encendida
            estado.textContent = "📷 Cámara ya está activa";
            estado.classList.add("activo");
            return;
        }
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        streamGlobal = stream;
        estado.textContent = "📷 Cámara activa";
        estado.classList.add("activo");
        resultadoEvaluacion.textContent = "Esperando evaluación...";
        resultadoEvaluacion.classList.remove("correcto", "incorrecto");
    } catch (error) {
        estado.textContent = "❌ Cámara no disponible";
        estado.classList.remove("activo");
        console.error(error);
    }
}

function apagarCamara() {
    if (streamGlobal) {
        streamGlobal.getTracks().forEach(track => track.stop());
        video.srcObject = null;
        streamGlobal = null;
        estado.textContent = "📷 Cámara apagada";
        estado.classList.remove("activo");
        resultadoEvaluacion.textContent = "Esperando evaluación...";
        resultadoEvaluacion.classList.remove("correcto", "incorrecto");
    }
}

function evaluarInterpretacion() {
    // Aquí simulo evaluación manual
    // Puedes cambiarlo para conectar con IA o detección real después

    // Por ejemplo: pregunta al usuario o genera aleatorio:
    const correcto = confirm("¿Interpretaste correctamente la seña?");

    if (correcto) {
        resultadoEvaluacion.textContent = "✔ Interpretación correcta";
        resultadoEvaluacion.classList.add("correcto");
        resultadoEvaluacion.classList.remove("incorrecto");
    } else {
        resultadoEvaluacion.textContent = "✖ Interpretación incorrecta";
        resultadoEvaluacion.classList.add("incorrecto");
        resultadoEvaluacion.classList.remove("correcto");
    }
}
