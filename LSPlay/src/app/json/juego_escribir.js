const senas = [
    { letra: "F", imagen: "../images/F.jpg" },
    { letra: "B", imagen: "../images/B.jpg" },
    { letra: "J", imagen: "../images/J.jpg" }
];

let indiceActual = 0;

const imagen = document.getElementById("imagenSena");
const input = document.getElementById("respuestaUsuario");
const resultado = document.getElementById("resultado");

function cargarSena() {
    imagen.src = senas[indiceActual].imagen;
    input.value = "";
    resultado.textContent = "";
}

function verificarRespuesta() {
    const respuesta = input.value.toUpperCase();

    if (respuesta === "") {
        resultado.textContent = "✋ Escribe una letra";
        resultado.style.color = "#f44336";
        return;
    }

    if (respuesta === senas[indiceActual].letra) {
        resultado.textContent = "✅ ¡Correcto!";
        resultado.style.color = "#4caf50";

        setTimeout(() => {
            indiceActual = (indiceActual + 1) % senas.length;
            cargarSena();
        }, 1200);

    } else {
        resultado.textContent = "❌ Incorrecto, intenta otra vez";
        resultado.style.color = "#f44336";
    }
}

cargarSena();
