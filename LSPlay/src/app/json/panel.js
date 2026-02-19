const abrir = document.getElementById('abrirLogin');
const panel = document.getElementById('panelLogin');
const cerrar = document.getElementById('cerrarLogin');

abrir.addEventListener('click', (e) => {
    e.preventDefault(); // ⛔ no navega
    panel.classList.add('activo');
});

cerrar.addEventListener('click', () => {
    panel.classList.remove('activo');
});
