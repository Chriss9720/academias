var acuerdoExtra = 0;
var arr = ["Hector Francisco Castro Morales", "Christian Emmanuel Yañez Gonzalez", "Sergio Antonio Guerra Castro", "Persona 1", "Persona 2", "1", "2", "3"];

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
    text.setAttribute('name', 'textReunion');
    td.appendChild(text);
    tr.appendChild(td);
    var td2 = document.createElement('td');
    td2.setAttribute('class', 'tdResponsable');
    var lab = document.createElement('label');
    lab.innerText = "Buscar:";
    td2.appendChild(lab);
    var inp = document.createElement('input');
    inp.type = "text";
    inp.setAttribute('onkeyup', "buscar('nueResp" + acuerdoExtra + "', this.value)");
    td2.appendChild(inp);
    var c = document.createElement('input');
    c.type = 'checkbox';
    c.setAttribute('onChange', "todos('nueResp" + acuerdoExtra + "')");
    td2.appendChild(c);
    var lab = document.createElement('label');
    lab.innerText = "Todos";
    td2.appendChild(lab);
    var sc = document.createElement('scroll-container');
    var sp = document.createElement('scroll-page');
    var tabla = document.createElement('table');
    tabla.setAttribute('id', 'tablaNuevos' + acuerdoExtra);
    tabla.setAttribute('class', 'alin');
    var tbo = document.createElement('tbody');
    nuevos(tbo, 'nueResp' + acuerdoExtra);
    tabla.appendChild(tbo);
    sp.appendChild(tabla);
    sc.appendChild(sp);
    td2.appendChild(sc);
    tr.appendChild(td2);
    var td3 = document.createElement('td');
    td3.setAttribute("class", "tdS");
    var inp = document.createElement('input');
    inp.setAttribute('name', 'fechaCump');
    inp.setAttribute('type', 'datetime-local');
    inp.setAttribute('class', 'contenidoReunion');
    td3.appendChild(inp);
    tr.appendChild(td3);
    bod.appendChild(tr);
    ++acuerdoExtra;
}

function nuevos(body, name) {
    for (var i = 0; i < arr.length; i++) {
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        var label = document.createElement('label');
        label.innerText = arr[i];
        label.setAttribute("name", name + "L");
        var inp = document.createElement('input');
        inp.type = 'checkbox';
        inp.name = name + "C";
        td.appendChild(inp);
        td.appendChild(label);
        tr.appendChild(td);
        body.appendChild(tr);
    }
}