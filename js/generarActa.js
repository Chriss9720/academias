function buscar() {

}

function cargarUsuarios() {
    var arr = ["Hector Francisco Castro Morales", "Christian Emmanuel Yañez Gonzalez", "Sergio Antonio Guerra Castro", "Persona 1", "Persona 2", "1", "2", "3"];
    var t = document.getElementById('tablaResponsables');
    var bod = document.createElement('tbody');
    for (var i = 0; i < arr.length; i++) {
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        var label = document.createElement('label');
        label.innerText = arr[i];
        label.setAttribute("name", "antRespL");
        var inp = document.createElement('input');
        inp.type = 'checkbox';
        inp.name = "antRespC";
        td.appendChild(inp);
        td.appendChild(label);
        tr.appendChild(td);
        bod.appendChild(tr);
    }
    t.appendChild(bod);
}