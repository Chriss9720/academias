var id;

function cargarDatos() {
    window.location.search.substr(1).split("&").forEach(item => {
        id = item.split("=")[1];
    });
}

function regresar() {
    window.location = "menu.html?id=" + id;
}

function limpiar() {
    window.location.href = "OpcionesActas.html?id=" + id;
}

function crear() {
    window.location.href = "agregarActa.html?id=" + id;
}