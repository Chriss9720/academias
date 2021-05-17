var acuerdoExtra = 0,
    acuerdoAnt = 0;
var arr = [];
var id;

async function cargar() {
    crearLoad('rcornersProcCritico');
    window.location.search.substr(1).split("&").forEach(item => {
        id = item.split("=")[1];
    });
    await $.ajax({
        url: "php/sp_AcademiasCrearActa.php",
        type: "POST",
        data: { obj: id },
        dataType: "json",
        success: (r) => {
            let academia = document.getElementById('Academia');
            for (let i = 0; i < r.length; i++) {
                let op = document.createElement('option');
                op.value = r[i].IDAcademia;
                op.innerText = r[i].Academia;
                academia.appendChild(op);
            }
        },
        error: (er) => {
            console.log(er);
        }
    });
    cargarPresidente();
    /*$.ajax({
        url: 'documentos/leerActa.php',
        type: 'GET',
        dataType: 'JSON',
        success: function(r) {
            acuerdosAnt(r['Acuerdos']);
        },
        error: function(err) {}
    });*/
    removerLoad();
}

async function cargarPresidente() {
    await $.ajax({
        url: "php/sp_getPresidenteXAca.php",
        type: "post",
        data: { obj: document.getElementById('Academia').value },
        dataType: "json",
        success: (r) => {
            document.getElementById('Presidente').value = r[0].Presidente;
        },
        error: (err) => {
            console.log(err);
        }
    });
    cargarSecretario();
    leerUsuarios();
}

async function leerUsuarios() {
    await $.ajax({
        url: "php/sp_getAllMiembrosDe.php",
        type: "POST",
        data: { obj: document.getElementById('Academia').value },
        dataType: "Json",
        success: (r) => {
            arr = r;
        },
        error: (err) => {
            console.log(err);
        }
    });
    cargarUsuarios();
}

async function cargarSecretario() {
    await $.ajax({
        url: "php/sp_getSecretarioXAca.php",
        type: "post",
        data: { obj: document.getElementById('Academia').value },
        dataType: "json",
        success: (r) => {
            if (r.length > 0)
                document.getElementById('Secretario').value = r[0].Secretario;
            else
                document.getElementById('Secretario').value = "NA";
        },
        error: (err) => {
            console.log(err);
        }
    });
}

function crearPDF() {
    var horaInicio = document.getElementById('inicio').value.replace("T", " ").split(" ");
    var fecha = horaInicio[0].split("-");
    var anteriores = document.getElementsByName('ant');
    var acuerdos = [];
    var textosAnt = document.getElementsByName('txtAnt');
    var fechasAnt = document.getElementsByName('fechaCumpAnt');
    var avance = document.getElementsByName('Avance');
    var personasAnt = [];
    for (var i = 0; i < anteriores.length; i++) {
        var inputs = document.getElementsByName('acuerdoAnt' + i + 'C');
        personasAnt[i] = "";
        for (var j = 0; j < inputs.length; j++) {
            if (inputs[j].checked)
                personasAnt[i] = document.getElementsByName('acuerdoAnt' + i + 'L')[j].innerText + "%";
        }
    }
    for (var i = 0; i < anteriores.length; i++) {
        var obj = {
            Acuerdo: textosAnt[i].value,
            Avance: avance[i].value,
            personasAnt: personasAnt[i],
            Fecha: fechasAnt[i].value
        };
        acuerdos.push(obj);
    }
    var extras = document.getElementsByName('acuerdoExtra');
    var text = document.getElementsByName('textReunion');
    var acuerdosExtras = [];
    var personasExtras = [];
    for (var i = 0; i < extras.length; i++) {
        var inputs = document.getElementsByName('nueResp' + i + 'C');
        personasExtras[i] = "";
        for (var j = 0; j < inputs.length; j++) {
            if (inputs[j].checked)
                personasExtras[i] += document.getElementsByName('nueResp' + i + 'L')[j].innerText + "%";
        }
    }
    for (var i = 0; i < extras.length; i++) {
        var obj = {
            Acuerdo: text[i].value,
            Responsables: personasExtras[i],
            Fecha: document.getElementsByName('fechaCump')[i].value.replace("T", " ")
        };
        acuerdosExtras.push(obj);
    }
    var profesoresTotal = document.getElementsByName('profesorC');
    var profesores = [];
    for (var i = 0; i < profesoresTotal.length; i++) {
        if (profesoresTotal[i].checked) {
            var obj = {
                name: document.getElementsByName('profesorL')[i].innerText,
                mat: document.getElementsByName('materias')[i].value
            };
            profesores.push(obj);
        }
    }
    var obj = {
        no: document.getElementById('No').value,
        dia: fecha[2],
        mes: fecha[1],
        year: fecha[0],
        inicio: horaInicio[1],
        lugar: document.getElementById('Lugar').value,
        academia: document.getElementById('Academia').value,
        presidente: document.getElementById('Presidente').value,
        secretario: document.getElementById('Secretario').value,
        orden: document.getElementById('Orden').value,
        anterioes: acuerdos,
        extras: acuerdosExtras,
        horaFinal: document.getElementById('Final').value,
        Obs: document.getElementById('obs').value,
        docentes: profesores,
        jefe: "de la base de datos"
    };
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

function acuerdosAnt(data) {
    var body = document.getElementById('bodyAnt');
    for (var i = 0; i < data.length; i++) {
        var tr = document.createElement('tr');
        tr.setAttribute("name", "ant")
        var td1 = document.createElement('td');
        td1.setAttribute('class', 'tdS');
        var text = document.createElement('textarea');
        text.setAttribute('class', 'txtArea txtArea2');
        text.setAttribute('name', 'txtAnt');
        text.disabled = true;
        text.innerText = data[i]['Acuerdo'][0];
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
        if (data[i]["Responsable"].length > 0) {
            var responsables = data[i]['Responsable'][0].split("%");
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
                for (var k = 0; k < responsables.length - 1 && !inp.checked; k++) {
                    if (arr[j].includes(responsables[k]))
                        inp.checked = true;
                }
                if (inp.checked) {
                    td.appendChild(inp);
                    td.appendChild(label);
                    trx.appendChild(td);
                    tbody.appendChild(trx);
                }
            }
        }
        tabla.appendChild(tbody);
        sp.appendChild(tabla);
        sc.appendChild(sp);
        td2.appendChild(sc);
        var td3 = document.createElement('td');
        td3.setAttribute('class', 'tdS');
        var inp = document.createElement('input');
        inp.setAttribute('name', 'fechaCumpAnt');
        inp.setAttribute('class', 'contenidoReunion');
        inp.disabled = true;
        inp.value = data[i]['Fecha'][0];
        td3.appendChild(inp);
        var td4 = document.createElement('td');
        td4.setAttribute('class', 'tdS');
        var text = document.createElement('textarea');
        text.setAttribute('class', 'txtArea txtArea2');
        text.setAttribute('name', 'Avance');
        text.innerText = data[i]['Avance'][0];
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
    var t = document.getElementById('tablaResponsables');
    var ta = document.getElementById('tablaNuevos');
    var bod = document.createElement('tbody');
    var boda = document.createElement('tbody');
    var profesor = document.getElementById('bodyProfesor');
    for (let i = 0; i < arr.length; i++) {
        if (t != null) {
            var tr = document.createElement('tr');
            var td = document.createElement('td');
            var label = document.createElement('label');
            label.innerText = arr[i].Nombre;
            label.setAttribute("name", "antRespL");
            var inp = document.createElement('input');
            inp.type = 'checkbox';
            inp.name = "antRespC";
            td.appendChild(inp);
            td.appendChild(label);
            tr.appendChild(td);
            bod.appendChild(tr);
        }
        if (ta != null) {
            var tr = document.createElement('tr');
            var td = document.createElement('td');
            var label = document.createElement('label');
            label.innerText = arr[i].Nombre;
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
        td.setAttribute('class', 'tdResponsable')
        var label = document.createElement('label');
        label.innerText = arr[i].Nombre;
        label.setAttribute("name", "profesorL");
        var inp = document.createElement('input');
        inp.type = 'checkbox';
        inp.name = "profesorC";
        td.appendChild(inp);
        td.appendChild(label);
        tr.appendChild(td);
        var td4 = document.createElement('td');
        td4.setAttribute('class', 'tdS');
        var text = document.createElement('textarea');
        text.setAttribute('class', 'txtArea txtArea2');
        text.setAttribute('name', 'materias')
        td4.appendChild(text);
        tr.appendChild(td4);
        profesor.appendChild(tr);
    }
    if (ta != null)
        ta.appendChild(boda);
    if (t != null)
        t.appendChild(bod);
}

function addAcuerdo() {
    let bod = document.getElementById('bodyAcuerdos');
    let tr = document.createElement('tr');
    tr.id = `EXT${acuerdoExtra}`;
    tr.setAttribute('name', "acuerdoExtra");
    let td = document.createElement('td');
    td.setAttribute("class", 'tdS');
    let text = document.createElement('textarea');
    text.setAttribute('class', 'txtArea txtArea2');
    text.setAttribute('name', 'textReunion');
    td.appendChild(text);
    tr.appendChild(td);
    let td2 = document.createElement('td');
    td2.setAttribute('class', 'tdResponsable');
    let lab = document.createElement('label');
    lab.innerText = "Buscar:";
    td2.appendChild(lab);
    let inp = document.createElement('input');
    inp.type = "text";
    inp.setAttribute('onkeyup', "buscar('nueResp" + acuerdoExtra + "', this.value)");
    td2.appendChild(inp);
    let c = document.createElement('input');
    c.type = 'checkbox';
    c.setAttribute('onChange', "todos('nueResp" + acuerdoExtra + "')");
    td2.appendChild(c);
    lab = document.createElement('label');
    lab.innerText = "Todos";
    td2.appendChild(lab);
    let sc = document.createElement('scroll-container');
    let sp = document.createElement('scroll-page');
    let tabla = document.createElement('table');
    tabla.setAttribute('id', 'tablaNuevos' + acuerdoExtra);
    tabla.setAttribute('class', 'alin');
    let tbo = document.createElement('tbody');
    nuevos(tbo, 'nueResp' + acuerdoExtra);
    tabla.appendChild(tbo);
    sp.appendChild(tabla);
    sc.appendChild(sp);
    td2.appendChild(sc);
    tr.appendChild(td2);
    let td3 = document.createElement('td');
    td3.setAttribute("class", "tdS");
    inp = document.createElement('input');
    inp.setAttribute('name', 'fechaCump');
    inp.setAttribute('type', 'datetime-local');
    inp.setAttribute('class', 'contenidoReunion');
    td3.appendChild(inp);
    tr.appendChild(td3);
    let td4 = document.createElement('td');
    td4.setAttribute("class", "tdS");
    inp = document.createElement('input');
    inp.setAttribute('class', 'button2 buttonAgregar remover');
    inp.type = "button";
    inp.value = "Remover";
    inp.addEventListener('click', () => { remov(tr); }, false);
    td4.appendChild(inp);
    tr.appendChild(td4);
    bod.appendChild(tr);
    ++acuerdoExtra;
}

function nuevos(body, name) {
    for (var i = 0; i < arr.length; i++) {
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        var label = document.createElement('label');
        label.innerText = arr[i].Nombre;
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

function remov(e) {
    e.remove();
}

function regresar() {
    window.location = "OpcionesActas.html?id=" + id;
}