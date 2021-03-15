function crearLoad(cls) {
    var div = document.createElement("DIV");
    div.setAttribute("class", "loading show " + cls);
    div.setAttribute("id", "divLoad")
    var s = document.createElement("DIV");
    s.setAttribute("class", "spin");
    div.appendChild(s);
    document.body.appendChild(div);
}

function removerLoad() {
    document.getElementById('divLoad').remove();
}