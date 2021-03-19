var id;

function cargando() {
    crearLoad('rcorners1Menu');
    window.location.search.substr(1).split("&").forEach(item => {
        id = item.split("=")[1];
    })
    removerLoad();
}

function cambiar(ruta) {
    window.location.href = ruta + ".html?id=" + id;
}

function cerrarSesion() {
    window.location.href = "index.html";
}

function modificar(mod = -1) {
    if (mod == -1)
        window.location.href = "modificar.html?id=" + id + "&mod=" + id;
    else
        window.location.href = "modificar.html?id=" + id + "&mod=" + mod;
}

function vis(vis = -1) {
    if (vis == -1)
        window.location.href = "visualizar.html?id=" + id + "&vis=" + id;
    else
        window.location.href = "visualizar.html?id=" + id + "&vis=" + vis;
}