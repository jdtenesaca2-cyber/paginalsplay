// Datos del juego
const juegoData = [
    {
        img: "../images/hola.png",
        correct: "Hola",
        options: ["Adiós","Comer","Gracias", "Hola"]
    },
    {
        img: "../images/gracias.png",
        correct: "Gracias",
        options: ["Gracias", "Hola", "Adiós", "Comer"]
    },
    {
        img: "../images/adios.png",
        correct: "Adiós",
        options: ["Comer","Hola", "Adiós", "Gracias"]
    },
    {
        img: "../images/comer.jpg",
        correct: "Comer",
        options: ["Hola", "Adiós", "Gracias","Comer"]
    }

];

let indexActual = 0;

const imagenSena = document.getElementById("imagenSena");
const resultado = document.getElementById("resultado");
const optionsContainer = document.getElementById("options-container");

// Función para cargar pregunta
function cargarPregunta() {
    const actual = juegoData[indexActual];
    
    // Animación fade solo de la imagen
    imagenSena.style.opacity = 0;

    setTimeout(() => {
        imagenSena.src = actual.img;

        // Limpiar botones
        optionsContainer.innerHTML = "";

        // Crear botones dinámicos
        actual.options.forEach(opcion => {
            const btn = document.createElement("button");
            btn.textContent = opcion;
            btn.onclick = () => verificarRespuesta(opcion, btn);
            optionsContainer.appendChild(btn);
        });

        // Fade in
        imagenSena.style.opacity = 1;
        resultado.textContent = ""; // limpiar mensaje
    }, 500);
}

// Función para verificar respuesta
function verificarRespuesta(seleccion, boton) {
    const actual = juegoData[indexActual];

    // Desactivar todos los botones mientras se muestra el mensaje
    Array.from(optionsContainer.children).forEach(b => b.disabled = true);

    if (seleccion === actual.correct) {
        boton.classList.add("correct");
        resultado.textContent = "¡Perfecto! 🎉";

        setTimeout(() => {
            indexActual++;
            if (indexActual < juegoData.length) {
                cargarPregunta();
            } else {
                resultado.textContent = "¡Juego terminado! 🏆 ";
                optionsContainer.innerHTML = ""; // quitar botones al final
            }
        }, 1000);
    } else {
        boton.classList.add("wrong");
        resultado.textContent = "Intenta de nuevo ❌";

        setTimeout(() => {
            boton.classList.remove("wrong");
            resultado.textContent = "";
            // Reactivar los botones
            Array.from(optionsContainer.children).forEach(b => b.disabled = false);
        }, 1000);
    }
}

// Iniciar juego
cargarPregunta();
