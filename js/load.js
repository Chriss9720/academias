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