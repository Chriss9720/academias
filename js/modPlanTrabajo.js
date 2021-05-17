var datos;
var data;

async function cargarDatos() {
    data = [];
    window.location.search.substr(1).split("&").forEach(item => {
        data.push(item.split("=")[1]);
    });
    cargarUsuarios();
    await $.ajax({
        url: "documentos/leerPlan.php",
        Type: "GET",
        data: { obj: data[1] },
        dataType: "JSON",
        success: async(r) => {
            let cabecera = r.Cabecera;
            datos = cabecera;
            document.getElementById('academia').value = cabecera.Academia;
            document.getElementById('semestre').value = cabecera.Semestre;
            let fechas = document.getElementsByName('Reunion');
            let dates = [cabecera.Primera, cabecera.Segunda, cabecera.Tercera, cabecera.Cuarta];
            for (let i = 0; i < fechas.length; i++) {
                if (dates[i].length > 0)
                    fechas[i].value = ajustarFecha(dates[i]);
            }
            let Acts = [r.Act1, r.Act2, r.Act3, r.Act4, r.Act5, r.Act6, r.Act7, r.Act8, r.Act9];
            let entradas = ["Acciones", "Asignarutas", "Responsable", "Fecha", "Evidencia"];
            for (let i = 1, j = 0; i < 10; i++, j++) {
                let act = document.getElementsByName(`Act${i}`);
                act[0].value = Acts[j][entradas[0]];
                act[1].value = Acts[j][entradas[1]];
                await revisarResp(Acts[j][entradas[2]], i);
                if (Acts[j][entradas[3]].length > 0)
                    act[2].value = ajustarFecha(Acts[j][entradas[3]]);
                act[3].value = Acts[j][entradas[4]];
            }
        },
        error: (err) => {
            console.log(err["responseText"]);
        }
    });
}

function revisarResp(resp, act) {
    let check = document.getElementsByName(`Act${act}C`);
    let label = document.getElementsByName(`Act${act}L`);
    if (resp == "TODOS") {
        document.getElementById('AAct1').checked = true;
        for (let i = 0; i < check.length; i++) {
            check[i].checked = true;
            console.log();
        }
    } else if (resp.length > 0) {
        resp = resp.split("?");
        for (let i = 0; i < resp.length - 1; i++) {
            for (let j = 0; j < label.length; j++) {
                if (label[j].innerText == resp[i])
                    check[j].checked = true;
            }
        }
    }
}

function ajustarFecha(fecha) {
    fecha = fecha.replace(" ", "T");
    return fecha;
}

async function cargarUsuarios() {
    var obj = {
        aca: data[2],
        nom: 0
    }
    await $.ajax({
        url: "php/getAllMiembros.php",
        type: "GET",
        data: { obj: obj },
        dataType: "json",
        success: (r) => {
            var arr = r["res"];
            for (var k = 1; k < 10; k++) {
                var t = document.getElementById("TBAct" + k + "L");
                for (var i = 0; i < arr.length; i++) {
                    var tr = document.createElement("tr");
                    var td = document.createElement("td");
                    var inp = document.createElement("input");
                    var lab = document.createElement("label");
                    inp.type = "checkbox";
                    inp.name = "Act" + k + "C";
                    inp.value = arr[i]["Nomina"];
                    lab.setAttribute("name", "Act" + k + "L");
                    lab.innerText = arr[i]["Nombre_s_"];
                    td.appendChild(inp);
                    td.appendChild(lab);
                    tr.appendChild(td);
                    t.appendChild(tr);
                }
            }
        },
        error: (err) => {
            console.log(err["responseText"]);
        }
    });
}

function regresar() {
    window.location = "OpcionesPlanTrabajo.html?id=" + data[0];
}

function Todos(num) {
    var c = document.getElementsByName("Act" + num + "C");
    for (var i = 0; i < c.length; i++) {
        c[i].checked = document.getElementById('AAct' + num).checked
    }
}

function actualizar() {
    var resp1 = [],
        resp2 = [],
        resp3 = [],
        resp4 = [],
        resp5 = [],
        resp6 = [],
        resp7 = [],
        resp8 = [],
        resp9 = [];
    var fechas = document.getElementsByName("Reunion");
    var act1 = document.getElementsByName("Act1");
    var act1C = document.getElementsByName("Act1C");
    var act1L = document.getElementsByName("Act1L");
    var act2 = document.getElementsByName('Act2')
    var act2C = document.getElementsByName('Act2C');
    var act3 = document.getElementsByName('Act3')
    var act3C = document.getElementsByName('Act3C');
    var act4 = document.getElementsByName('Act4')
    var act4C = document.getElementsByName('Act4C');
    var act5 = document.getElementsByName('Act5')
    var act5C = document.getElementsByName('Act5C');
    var act6 = document.getElementsByName('Act6')
    var act6C = document.getElementsByName('Act6C');
    var act7 = document.getElementsByName('Act7')
    var act7C = document.getElementsByName('Act7C');
    var act8 = document.getElementsByName('Act8')
    var act8C = document.getElementsByName('Act8C');
    var act9 = document.getElementsByName('Act9')
    var act9C = document.getElementsByName('Act9C');
    var personas1 = "",
        personas2 = "",
        personas3 = "",
        personas4 = "",
        personas5 = "",
        personas6 = "",
        personas7 = "",
        personas8 = "",
        personas9 = "";
    let max = act1C.length;
    for (var i = 0; i < act1C.length; i++) {
        if (act1C[i].checked) {
            personas1 += act1L[i].innerText + "?";
            resp1.push(act1C[i].value);
            if (resp1.length == max)
                personas1 = "TODOS";
        }
        if (act2C[i].checked) {
            personas2 += act1L[i].innerText + "?";
            resp2.push(act2C[i].value);
            if (resp2.length == max)
                personas2 = "TODOS";
        }
        if (act3C[i].checked) {
            personas3 += act1L[i].innerText + "?";
            resp3.push(act3C[i].value);
            if (resp3.length == max)
                personas3 = "TODOS";
        }
        if (act4C[i].checked) {
            personas4 += act1L[i].innerText + "?";
            resp4.push(act4C[i].value);
            if (resp4.length == max)
                personas4 = "TODOS";
        }
        if (act5C[i].checked) {
            personas5 += act1L[i].innerText + "?";
            resp5.push(act5C[i].value);
            if (resp5.length == max)
                personas5 = "TODOS";
        }
        if (act6C[i].checked) {
            personas6 += act1L[i].innerText + "?";
            resp6.push(act6C[i].value);
            if (resp6.length == max)
                personas6 = "TODOS";
        }
        if (act7C[i].checked) {
            personas7 += act1L[i].innerText + "?";
            resp7.push(act7C[i].value);
            if (resp7.length == max)
                personas7 = "TODOS";
        }
        if (act8C[i].checked) {
            personas8 += act1L[i].innerText + "?";
            resp8.push(act8C[i].value);
            if (resp8.length == max)
                personas8 = "TODOS";
        }
        if (act9C[i].checked) {
            personas9 += act1L[i].innerText + "?";
            resp9.push(act9C[i].value);
            if (resp9.length == max)
                personas9 = "TODOS";
        }
    }
    let date = new Date();
    let d = date.getFullYear() + '-' + date.getMonth() + "-" + date.getDay() + '-' + date.getTime();
    var obj = {
        doc: datos.name,
        presidente: datos.Presidente,
        jefe: datos.Jefe,
        coordinador: datos.Coordinador,
        autor: data[0],
        Academia: datos,
        IDAcademia: data[2],
        Semestre: document.getElementById("semestre").value,
        f1: fechas[0].value.replace("T", " "),
        f2: fechas[1].value.replace("T", " "),
        f3: fechas[2].value.replace("T", " "),
        f4: fechas[3].value.replace("T", " "),
        Act1: {
            Acciones: act1[0].value,
            Asignaturas: act1[1].value,
            Responsables: personas1,
            Fecha: act1[2].value.replace("T", " "),
            Evidencia: act1[3].value,
            resp: resp1
        },
        Act2: {
            Acciones: act2[0].value,
            Asignaturas: act2[1].value,
            Responsables: personas2,
            Fecha: act2[2].value.replace("T", " "),
            Evidencia: act2[3].value,
            resp: resp2
        },
        Act3: {
            Acciones: act3[0].value,
            Asignaturas: act3[1].value,
            Responsables: personas3,
            Fecha: act3[2].value.replace("T", " "),
            Evidencia: act3[3].value,
            resp: resp3
        },
        Act4: {
            Acciones: act4[0].value,
            Asignaturas: act4[1].value,
            Responsables: personas4,
            Fecha: act4[2].value.replace("T", " "),
            Evidencia: act4[3].value,
            resp: resp4
        },
        Act5: {
            Acciones: act5[0].value,
            Asignaturas: act5[1].value,
            Responsables: personas5,
            Fecha: act5[2].value.replace("T", " "),
            Evidencia: act5[3].value,
            resp: resp5
        },
        Act6: {
            Acciones: act6[0].value,
            Asignaturas: act6[1].value,
            Responsables: personas6,
            Fecha: act6[2].value.replace("T", " "),
            Evidencia: act6[3].value,
            resp: resp6
        },
        Act7: {
            Acciones: act7[0].value,
            Asignaturas: act7[1].value,
            Responsables: personas7,
            Fecha: act7[2].value.replace("T", " "),
            Evidencia: act7[3].value,
            resp: resp7
        },
        Act8: {
            Acciones: act8[0].value,
            Asignaturas: act8[1].value,
            Responsables: personas8,
            Fecha: act8[2].value.replace("T", " "),
            Evidencia: act8[3].value,
            resp: resp8
        },
        Act9: {
            Acciones: act9[0].value,
            Asignaturas: act9[1].value,
            Responsables: personas9,
            Fecha: act9[2].value.replace("T", " "),
            Evidencia: act9[3].value,
            resp: resp9
        }
    };
    crear(obj);
}

function crear(obj) {
    var d = document.createElement("DIALOG");
    d.setAttribute("ID", "d1");
    var txt = document.createElement("label");
    var yes = document.createElement("button");
    var not = document.createElement("button");
    var img = document.createElement("img");

    txt.setAttribute("style", "position: absolute; top: 20%")
    txt.innerHTML = 'Al actualizar se perderán los documentos ligados a esta acta<br>¿Seguro que desea continuar?';
    yes.innerHTML = "Si";
    not.innerHTML = "No";

    img.src = "img/advertencia.png";
    img.setAttribute("width", "50px")
    img.setAttribute("height", "50px")
    d.appendChild(img);

    yes.setAttribute("id", "si");
    yes.setAttribute("style", "top: 50%;position: absolute;left: 80%; background-color: #08c211;");
    yes.setAttribute("class", "button");
    yes.addEventListener("click", () => {
        aplicarCambios(obj);
    }, false);

    not.setAttribute("id", "no");
    not.setAttribute("style", "top: 50%;position: absolute;left: 5%; background-color: #cc1010;");
    not.setAttribute("class", "button");
    not.addEventListener("click", () => {
        document.getElementById("d1").remove();
    }, false);

    d.appendChild(txt);
    d.appendChild(yes);
    d.appendChild(not);

    d.style.height = "150px";
    d.style.width = "350px";
    document.body.append(d);
    d.showModal();
}

function aplicarCambios(obj) {
    document.getElementById("d1").remove();
}