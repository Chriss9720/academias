var id;

$(document).ready(function() {
    crearLoad();
    window.location.search.substr(1).split("&").forEach(item => {
        id = item.split("=")[1];
    })
    removerLoad();
    console.log(id);
})

function crearLoad() {
    var div = document.createElement("DIV");
    div.setAttribute("class", "loading show rcorners1");
    div.setAttribute("id", "divLoad")
    var s = document.createElement("DIV");
    s.setAttribute("class", "spin");
    div.appendChild(s);
    document.body.appendChild(div);
}

function removerLoad() {
    document.getElementById('divLoad').remove();
}

function cambiar(ruta) {
    window.location.href = ruta + ".html?id=" + id;
}

function cerrarSesion() {
    window.location.href = "index.html";
}