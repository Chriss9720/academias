function buscar(name, valor) {
    var ckec = document.getElementsByName(name + "C");
    for (var i = 0; i < ckec.length; i++) {
        var la = document.getElementsByName(name + "L")[i];
        la.hidden = !(la.innerText.includes(valor));
        ckec[i].hidden = la.hidden;
    }
}

function todos(name) {
    var ckec = document.getElementsByName(name + "C");
    for (var i = 0; i < ckec.length; i++) {
        ckec[i].checked = !ckec[i].checked;
    }
}

function cargarUsuarios() {
    var arr = ["Hector Francisco Castro Morales", "Christian Emmanuel Yañez Gonzalez", "Sergio Antonio Guerra Castro", "Persona 1", "Persona 2", "1", "2", "3"];
    var t = document.getElementById('tablaResponsables');
    var ta = document.getElementById('tablaNuevos');
    var tf = document.getElementById('tablaProfesor');
    var bod = document.createElement('tbody');
    var boda = document.createElement('tbody');
    var bodp = document.createElement('tbody');
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

        var tr = document.createElement('tr');
        var td = document.createElement('td');
        var label = document.createElement('label');
        label.innerText = arr[i];
        label.setAttribute("name", "nueRespL");
        var inp = document.createElement('input');
        inp.type = 'checkbox';
        inp.name = "nueRespC";
        td.appendChild(inp);
        td.appendChild(label);
        tr.appendChild(td);
        boda.appendChild(tr);

        var tr = document.createElement('tr');
        var td = document.createElement('td');
        var label = document.createElement('label');
        label.innerText = arr[i];
        label.setAttribute("name", "profesorL");
        var inp = document.createElement('input');
        inp.type = 'checkbox';
        inp.name = "profesorC";
        td.appendChild(inp);
        td.appendChild(label);
        tr.appendChild(td);
        bodp.appendChild(tr);
    }
    tf.appendChild(bodp);
    ta.appendChild(boda);
    t.appendChild(bod);
}

function addAcuerdo() {
    var bod = document.getElementById('bodyAcuerdos');
    var tr = document.createElement('tr');
    tr.setAttribute('name', "acuerdoExtra");
    var td = document.createElement('td');
    td.setAttribute("class", 'tdS');
    var text = document.createElement('textarea');
    text.setAttribute('class', 'txtArea');
    td.appendChild(text);
    tr.appendChild(td);
    var td2 = document.createElement('td');
    td2.setAttribute('class', 'tdResponsable');
    var lab = document.createElement('label');
    lab.innerText = "Buscar:";
    td2.appendChild(lab);
    var inp = document.createElement('input');
    inp.type = "text";
    inp.onkeyup = ;
    bod.appendChild(tr);
}