const senas = [
    { letra: "A", imagen: "../images/A.png" },
    { letra: "B", imagen: "../images/B.png" },
    { letra: "C", imagen: "../images/C.png" }
];

let actual = 0;

const imagen = document.getElementById("imagenSena");
const respuesta = document.getElementById("respuesta");
const pantalla = document.getElementById("pantalla");

function cargar() {
    imagen.src = senas[actual].imagen;
    respuesta.value = "";
    pantalla.className = "pantalla";
    pantalla.textContent = "ESPERANDO RESPUESTA";
}

function verificar() {
    const valor = respuesta.value.toUpperCase();

    if (valor === senas[actual].letra) {
        pantalla.classList.add("correcto");
        pantalla.textContent = "✔ CORRECTO";

        setTimeout(() => {
            actual = (actual + 1) % senas.length;
            cargar();
        }, 1500);

    } else {
        pantalla.classList.add("incorrecto");
        pantalla.textContent = "✖ INCORRECTO";
    }
}

cargar();
