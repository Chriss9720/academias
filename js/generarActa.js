var acuerdoExtra = 0,
    acuerdoAnt = 0;
var arr = [];
var id;
var nG;
var eG;
var aca;
var AvP = 0;

async function cargar() {
    crearLoad('rcornersProcCritico');
    await window.location.search.substr(1).split("&").forEach(item => {
        item = item.split("=");
        switch (item[0]) {
            case "id":
                id = item[1];
                break;
            case "nG":
                document.getElementById('No').value = 1;
                nG = item[1];
                break;
            case "eG":
                eG = item[1];
                break;
            case "aca":
                aca = item[1];
        }
    });
    leerUsuarios();
    if (eG)
        precargar();
    await $.ajax({
        url: "php/sp_AcademiasCrearActa.php",
        type: "POST",
        data: { obj: aca },
        dataType: "json",
        success: (r) => {
            document.getElementById('Academia').value = r[0].A;
        },
        error: (er) => {
            console.log(er);
        }
    });
    cargarPresidente();
    removerLoad();
}

async function precargar() {
    await $.ajax({
        url: "php/sp_getRutaXMLActa.php",
        type: "post",
        data: { obj: eG },
        dataType: "json",
        success: async(r) => {
            r = r[0];
            document.getElementById('No').value = r.C;
            await $.ajax({
                url: 'documentos/leerActa.php',
                type: 'POST',
                data: { obj: r.R },
                dataType: 'JSON',
                success: async(r) => {
                    await $.ajax({
                        url: "php/sp_getAvances.php",
                        type: "post",
                        data: { obj: eG },
                        dataType: "json",
                        success: (r2) => {
                            acuerdosAnt(r['Acuerdos'], r2);
                        },
                        error: (err) => {
                            console.log('sp_getAvances')
                            console.log(err);
                        }
                    })
                },
                error: (err) => {
                    console.log("leerActa");
                    console.log(err);
                }
            });
        },
        error: (err) => {
            console.log("sp_getRutaXMLActa");
            console.log(err);
        }
    })
}

async function cargarPresidente() {
    await $.ajax({
        url: "php/sp_getPresidenteXAca.php",
        type: "post",
        data: { obj: aca },
        dataType: "json",
        success: (r) => {
            document.getElementById('Presidente').value = r[0].Presidente;
        },
        error: (err) => {
            console.log(err);
        }
    });
    cargarSecretario();
}

async function leerUsuarios() {
    await $.ajax({
        url: "php/sp_getAllMiembrosDe.php",
        type: "POST",
        data: { obj: aca },
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
        data: { obj: aca },
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

async function crearPDF() {
    var horaInicio = document.getElementById('inicio').value.replace("T", " ").split(" ");
    var fecha = horaInicio[0].split("-");
    var anteriores = document.getElementsByName('ant');
    var acuerdos = [];
    var textosAnt = document.getElementsByName('txtAnt');
    var fechasAnt = document.getElementsByName('fechaCumpAnt');
    var avance = document.getElementsByName('Avance');
    var personasAnt = [];
    for (let i = 0; i < anteriores.length; i++) {
        var inputs = document.getElementsByName('acuerdoAnt' + i + 'C');
        console.log(inputs.length);
        for (let j = 0; j < inputs.length; j++) {
            if (inputs[j].checked) {
                personasAnt[i] += document.getElementsByName('acuerdoAnt' + i + 'L')[j].innerText + "%";
            }
            if ((personasAnt[i].split("%").length - 1) == arr.length) {
                personasAnt[i] = "Todos los integrantes de la academia";
            }
        }
    }
    for (let i = 0; i < anteriores.length; i++) {
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
    let nominasExtras = [];
    let lim = document.getElementsByName('acuerdoExtra');
    for (let i = 0; i < lim.length; i++) {
        var inputs = document.getElementsByName('nueResp' + lim[i].id.substr(3) + 'C');
        personasExtras[i] = "";
        let aux = [];
        for (let j = 0; j < inputs.length; j++) {
            if (inputs[j].checked) {
                personasExtras[i] += document.getElementsByName('nueResp' + lim[i].id.substr(3) + 'L')[j].innerText + "%";
                aux.push({
                    n: document.getElementsByName(`nueResp${lim[i].id.substr(3)}C`)[j].value,
                    a: (i + 1 + AvP)
                });
                if ((personasExtras[i].split("%").length - 1) == arr.length)
                    personasExtras[i] = "Todos los integrantes de la academia";
            }
        }
        nominasExtras.push(aux);
    }
    for (let i = 0; i < extras.length; i++) {
        var obj = {
            Acuerdo: text[i].value,
            Responsables: personasExtras[i],
            Fecha: document.getElementsByName('fechaCump')[i].value.replace("T", " ")
        };
        acuerdosExtras.push(obj);
    }
    var profesoresTotal = document.getElementsByName('profesorC');
    var profesores = [];
    for (let i = 0; i < profesoresTotal.length; i++) {
        if (profesoresTotal[i].checked) {
            var obj = {
                name: document.getElementsByName('profesorL')[i].innerText,
                mat: document.getElementsByName('materias')[i].value,
                nom: document.getElementsByName('profesorC')[i].value
            };
            profesores.push(obj);
        }
    }
    let date = new Date();
    let d = date.getFullYear() + '-' + date.getMonth() + "-" + date.getDay() + '-' + date.getTime();
    let g;
    if (nG)
        g = nG;
    else
        g = eG;
    var obj = {
        aca: aca,
        autor: id,
        g: g,
        doc: d,
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
        nominasExtras: nominasExtras,
        horaFinal: document.getElementById('Final').value,
        Obs: document.getElementById('obs').value,
        docentes: profesores,
        jefe: "de la base de datos"
    };
    await $.ajax({
        url: "php/sp_getJefeDeDiv.php",
        type: "POST",
        data: { obj: id },
        dataType: "json",
        success: (r) => {
            obj.jefe = r[0].jefe;
        },
        error: (err) => {
            console.log(err);
        }
    });
    await $.ajax({
        url: 'documentos/crearActas.php',
        type: 'GET',
        data: { obj: obj },
        dataType: 'JSON',
        success: (r) => {
            window.open(r['archivo']);
            window.location = `Actas.html?id=${id}`
        },
        error: (error) => {
            console.log("erorr:");
            console.log(error['responseText']);
        }
    });
}

function buscar(name, valor) {
    var ckec = document.getElementsByName(name + "C");
    for (let i = 0; i < ckec.length; i++) {
        var la = document.getElementsByName(name + "L")[i];
        la.hidden = !(la.innerText.includes(valor));
        ckec[i].hidden = la.hidden;
    }
}

function acuerdosAnt(data, av) {
    var body = document.getElementById('bodyAnt');
    AvP = data.length;
    for (let i = 0; i < data.length; i++) {
        var tr = document.createElement('tr');
        tr.setAttribute("name", "ant")
        var td1 = document.createElement('td');
        td1.setAttribute('class', 'tdS');
        var text = document.createElement('textarea');
        text.setAttribute('class', 'txtArea txtArea2');
        text.setAttribute('name', 'txtAnt');
        text.disabled = true;
        if (data[i]["Acuerdo"][0])
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
        if (data[i]["Responsable"]) {
            var responsables = data[i]['Responsable'][0].split("%");
            for (let j = 0; j < arr.length; j++) {
                var trx = document.createElement('tr');
                var td = document.createElement('td');
                var label = document.createElement('label');
                label.innerText = arr[j].Nombre;
                var name = "acuerdoAnt" + acuerdoAnt;
                label.setAttribute("name", name + "L");
                var inp = document.createElement('input');
                inp.type = 'checkbox';
                inp.name = name + "C";
                inp.disabled = true;
                if (responsables[0].includes("Todos los integrantes de la academia")) {
                    inp.checked = true;
                } else {
                    for (var k = 0; k < responsables.length - 1 && !inp.checked; k++) {
                        if (arr[j].Nombre.includes(responsables[k]))
                            inp.checked = true;
                    }
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
        if (data[i]["Fecha"][0])
            inp.value = data[i]['Fecha'][0];
        td3.appendChild(inp);
        var td4 = document.createElement('td');
        td4.setAttribute('class', 'tdS');
        var text = document.createElement('textarea');
        text.setAttribute('class', 'txtArea txtArea2');
        text.setAttribute('name', 'Avance');
        text.innerText = `${av[i].AV}%`;
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
    for (let i = 0; i < ckec.length; i++) {
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
            inp.value = arr[i].N;
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
            inp.value = arr[i].N;
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
        inp.value = arr[i].N;
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
    for (let i = 0; i < arr.length; i++) {
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        var label = document.createElement('label');
        label.innerText = arr[i].Nombre;
        label.setAttribute("name", name + "L");
        var inp = document.createElement('input');
        inp.type = 'checkbox';
        inp.name = name + "C";
        inp.value = arr[i].N;
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
    if (eG)
        window.location = `OpcionesActas.html?id=${id}&eG=${eG}&aca=${aca}`;
    else
        window.location = `OpcionesActas.html?id=${id}&eG=${nG}&aca=${aca}`;
}