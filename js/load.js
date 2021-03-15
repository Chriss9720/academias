function crearLoad(cls) {
    var div = document.createElement("DIV");
    var clase = "loading show " + cls;
    div.setAttribute("class", clase);
    div.setAttribute("id", "divLoad")
    var s = document.createElement("DIV");
    s.setAttribute("class", "spin");
    div.appendChild(s);
    document.body.appendChild(div);
}

function removerLoad() {
    document.getElementById('divLoad').remove();
}