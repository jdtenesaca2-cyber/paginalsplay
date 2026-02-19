const videoElement = document.getElementById('video');
const canvasElement = document.getElementById('canvas');
const canvasCtx = canvasElement.getContext('2d');
const statusEl = document.getElementById('status');
const letterEl = document.getElementById('letter');

const letters = ['A', 'B', 'C'];
let current = 0;

const hands = new Hands({
  locateFile: (file) =>
    `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
});

hands.setOptions({
  maxNumHands: 1,
  modelComplexity: 1,
  minDetectionConfidence: 0.7,
  minTrackingConfidence: 0.7
});

hands.onResults(onResults);

function onResults(results) {
  canvasElement.width = videoElement.videoWidth;
  canvasElement.height = videoElement.videoHeight;

  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

  if (results.multiHandLandmarks) {
    for (const landmarks of results.multiHandLandmarks) {
      drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
        color: '#38bdf8',
        lineWidth: 4
      });
      drawLandmarks(canvasCtx, landmarks, {
        color: '#fff',
        lineWidth: 2
      });
    }

    statusEl.textContent = '✔ Mano detectada';
    nextLetter();
  } else {
    statusEl.textContent = '❌ No se detecta la mano';
  }
}

function nextLetter() {
  current = (current + 1) % letters.length;
  letterEl.textContent = letters[current];
}

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({ image: videoElement });
  },
  width: 640,
  height: 480
});

camera.start();
