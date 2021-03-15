var id;

$(document).ready(function() {
    crearLoad('rcorners1Menu');
    window.location.search.substr(1).split("&").forEach(item => {
        id = item.split("=")[1];
    })
    removerLoad();
})

function cambiar(ruta) {
    window.location.href = ruta + ".html?id=" + id;
}

function cerrarSesion() {
    window.location.href = "index.html";
}