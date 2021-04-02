var acuerdoExtra = 0,
    acuerdoAnt = 0;
var arr = ["Hector Francisco Castro Morales", "Christian Emmanuel Yañez Gonzalez", "Sergio Antonio Guerra Castro", "Persona 1", "Persona 2", "1", "2", "3"];

function cargar() {
    crearLoad('rcornersProcCritico');
    $.ajax({
        url: 'documentos/leerActa.php',
        type: 'GET',
        dataType: 'JSON',
        success: function(r) {
            console.log(r);
        },
        error: function(err) {
            console.log('error ' + err);
        }
    });
    removerLoad();
}

function crearPDF() {
    var obj = {};
    $.ajax({
        url: 'documentos/crearActas.php',
        type: 'GET',
        data: { obj: obj },
        dataType: 'JSON',
        success: function(r) {
            window.open(r['archivo']);
        },
        error: function(error) {
            console.log("erorr:");
            console.log(error['responseText']);
        }
    });
}

function buscar(name, valor) {
    var ckec = document.getElementsByName(name + "C");
    for (var i = 0; i < ckec.length; i++) {
        var la = document.getElementsByName(name + "L")[i];
        la.hidden = !(la.innerText.includes(valor));
        ckec[i].hidden = la.hidden;
    }
}

function acuerdosAnt() {
    var body = document.getElementById('bodyAnt');
    for (var i = 0; i < 1; i++) {
        var tr = document.createElement('tr');
        tr.setAttribute("name", "ant")
        var td1 = document.createElement('td');
        td1.setAttribute('class', 'tdS');
        var text = document.createElement('textarea');
        text.setAttribute('class', 'txtArea txtArea2');
        text.disabled = true;
        td1.appendChild(text)
        var td2 = document.createElement('td');
        td2.setAttribute('class', 'tdResponsable');
        var label = document.createElement('label');
        label.innerText = "Buscar: ";
        td2.appendChild(label);
        var inp = document.createElement('input');
        inp.type = 'text';
        inp.setAttribute('onkeyup', "buscar('acuerdoAnt" + acuerdoAnt + "', this.value)");
        td2.appendChild(inp);
        var sc = document.createElement('scroll-container');
        var sp = document.createElement('scroll-page');
        var tabla = document.createElement('table');
        tabla.setAttribute('id', 'tablaResponsablesAnt')
        tabla.setAttribute('class', 'alin')
        var tbody = document.createElement('tbody');
        for (var j = 0; j < arr.length; j++) {
            var trx = document.createElement('tr');
            var td = document.createElement('td');
            var label = document.createElement('label');
            label.innerText = arr[j];
            var name = "acuerdoAnt" + acuerdoAnt;
            label.setAttribute("name", name + "L");
            var inp = document.createElement('input');
            inp.type = 'checkbox';
            inp.name = name + "C";
            inp.disabled = true;
            td.appendChild(inp);
            td.appendChild(label);
            trx.appendChild(td);
            tbody.appendChild(trx);
        }
        tabla.appendChild(tbody);
        sp.appendChild(tabla);
        sc.appendChild(sp);
        td2.appendChild(sc);
        var td3 = document.createElement('td');
        td3.setAttribute('class', 'tdS');
        var inp = document.createElement('input');
        inp.setAttribute('name', 'fechaCumpAnt');
        inp.setAttribute('type', 'datetime-local');
        inp.setAttribute('class', 'contenidoReunion');
        inp.disabled = true;
        td3.appendChild(inp);
        var td4 = document.createElement('td');
        td4.setAttribute('class', 'tdS');
        var text = document.createElement('textarea');
        text.setAttribute('class', 'txtArea txtArea2');
        td4.appendChild(text);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        body.appendChild(tr);
        acuerdoAnt++;
    }
}

function todos(name) {
    var ckec = document.getElementsByName(name + "C");
    for (var i = 0; i < ckec.length; i++) {
        ckec[i].checked = !ckec[i].checked;
    }
}

function cargarUsuarios() {
    acuerdosAnt();
    var ft = document.getElementById('tablaResponsables') != null;
    var fta = document.getElementById('tablaNuevos') != null;
    var t = document.getElementById('tablaResponsables');
    var ta = document.getElementById('tablaNuevos');
    var tf = document.getElementById('tablaProfesor');
    var bod = document.createElement('tbody');
    var boda = document.createElement('tbody');
    var bodp = document.createElement('tbody');
    for (var i = 0; i < arr.length; i++) {
        if (ft) {
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
        if (fta) {
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
        }
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
    if (fta)
        ta.appendChild(boda);
    if (ft)
        t.appendChild(bod);
}

function addAcuerdo() {
    var bod = document.getElementById('bodyAcuerdos');
    var tr = document.createElement('tr');
    tr.setAttribute('name', "acuerdoExtra");
    var td = document.createElement('td');
    td.setAttribute("class", 'tdS');
    var text = document.createElement('textarea');
    text.setAttribute('class', 'txtArea txtArea2');
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

function remov() {
    var ext = document.getElementsByName('acuerdoExtra');
    if (ext.length > 0)
        ext[ext.length - 1].remove();
}