// Usa el video que ya prendió camara.js
const videoElement = document.getElementById("video");
const estado = document.getElementById("estado");

// Inicializar MediaPipe Hands
const hands = new Hands({
    locateFile: file =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
});

hands.setOptions({
    maxNumHands: 1,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.7
});

// Cuando hay resultados
hands.onResults(results => {
    if (results.multiHandLandmarks?.length > 0) {
        estado.textContent = "✋ Mano detectada";
    } else {
        estado.textContent = "👀 Coloca tu mano frente a la cámara";
    }
});

// Conectar MediaPipe a la cámara
const camera = new Camera(videoElement, {
    onFrame: async () => {
        await hands.send({ image: videoElement });
    },
    width: 640,
    height: 480
});

camera.start();
