var id;
var ext;

function cargarDatos() {
    window.location.search.substr(1).split("&").forEach(item => {
        item = item.split("=");
        switch (item[0]) {
            case "id":
                id = item[1];
                break;
            case "nG":
                ext = `nG=${item[1]}`;
                break;
            case "eG":
                ext = `eG=${item[1]}`;
                break;
            case "aca":
                ext += `&aca=${item[1]}`;
        }
    });
}

function regresar() {
    window.location = "Actas.html?id=" + id;
}

function limpiar() {
    window.location = `OpcionesActas.html?id=${id}&${ext}`
}

function crear() {
    window.location = `agregarActa.html?id=${id}&${ext}`
}