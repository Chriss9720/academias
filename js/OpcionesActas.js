var id;

function cargarDatos() {
    window.location.search.substr(1).split("&").forEach(item => {
        id = item.split("=")[1];
    });
}

function regresar() {
    window.location = "Actas.html?id=" + id;
}

function limpiar() {
    window.location = "OpcionesActas.html?id=" + id;
}

function crear() {
    window.location = "agregarActa.html?id=" + id;
}