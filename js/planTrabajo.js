var id;

function cargarDatos() {
    window.location.search.substr(1).split("&").forEach(item => {
        id = item.split("=")[1];
    });
    cargarAcademias();
    var sem = document.getElementById('semestre');
    var mes = new Date();
    if (mes.getMonth() >= 1 && mes.getMonth() <= 6) {
        sem.innerText = "Ene-Jun" + mes.getFullYear();
    } else if (mes.getMonth() > 8 && mes.getMonth() <= 12) {
        sem.innerText = "Ago-Dic" + mes.getFullYear();
    }
}

async function cargarAcademias() {
    await $.ajax({
        url: "php/getAcademiaPlan.php",
        type: "POST",
        data: { obj: id },
        dataType: "json",
        success: (r) => {
            var c = document.getElementById('academia');
            for (var i = 0; i < r.length; i++) {
                var option = document.createElement("option");
                option.value = r[i]["IDAcademia"];
                option.innerText = r[i]["Academia"];
                c.appendChild(option);
            }
            cargarUsuarios();
        },
        error: (err) => {
            console.log(err);
        }
    });
}

async function crearPDF() {
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
    var act1 = document.getElementsByName("act1");
    var act1C = document.getElementsByName("Act1C");
    var act1L = document.getElementsByName("Act1L");
    var act2 = document.getElementsByName('act2')
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
    var IDAcademia = document.getElementById("academia").value;
    var Academia = document.getElementById("academia").options;
    var nombreAcademia = "";
    for (let i = 0; i < Academia.length; i++) {
        if (Academia[i].value == IDAcademia)
            nombreAcademia = Academia[i].innerText;
    }
    let date = new Date();
    let d = date.getFullYear() + '-' + date.getMonth() + "-" + date.getDay() + '-' + date.getTime();
    var obj = {
        doc: d,
        autor: id,
        Academia: nombreAcademia,
        IDAcademia: IDAcademia,
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
    await $.ajax({
        url: 'documentos/crearPlanTrabajo.php',
        type: 'GET',
        data: { obj: obj },
        dataType: 'JSON',
        success: (r) => {
            window.open(r['archivo']);
            regresar();
        },
        error: (error) => {
            console.log("erorr:");
            console.log(error['responseText']);
        }
    });
}

function buscar(id) {
    var b = document.getElementById(id);
    var act1C = document.getElementsByName(id.replace("B", "").replace("L", "C"));
    var act1L = document.getElementsByName(id.replace("B", ""));
    for (var i = 0; i < act1C.length; i++) {
        if (!act1L[i].innerText.includes(b.value)) {
            act1C[i].hidden = true;
            act1L[i].hidden = true;
        } else {
            act1C[i].hidden = false;
            act1L[i].hidden = false;
        }
    }
}

async function cargarUsuarios() {
    var obj = {
        aca: document.getElementById('academia').value,
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
            console.log(err);
        }
    });
}

function Todos(num) {
    var c = document.getElementsByName("Act" + num + "C");
    for (var i = 0; i < c.length; i++) {
        c[i].checked = document.getElementById('AAct' + num).checked
    }
}

function regresar() {
    window.location = "OpcionesPlanTrabajo.html?id=" + id;
}