function crearPDF() {
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
    for (var i = 0; i < act1C.length; i++) {
        if (act1C[i].checked)
            personas1 += act1L[i].innerText + " ";
        if (act2C[i].checked)
            personas2 += act1L[i].innerText + " ";
        if (act3C[i].checked)
            personas3 += act1L[i].innerText + " ";
        if (act4C[i].checked)
            personas4 += act1L[i].innerText + " ";
        if (act5C[i].checked)
            personas5 += act1L[i].innerText + " ";
        if (act6C[i].checked)
            personas6 += act1L[i].innerText + " ";
        if (act7C[i].checked)
            personas7 += act1L[i].innerText + " ";
        if (act8C[i].checked)
            personas8 += act1L[i].innerText + " ";
        if (act9C[i].checked)
            personas9 += act1L[i].innerText + " ";
    }
    var obj = {
        Academia: document.getElementById("academia").value,
        Semestre: document.getElementById("semestre").value,
        Presidente: "Anabel Gutiérrez Espinoza",
        f1: fechas[0].value.replace("T", " "),
        f2: fechas[1].value.replace("T", " "),
        f3: fechas[2].value.replace("T", " "),
        f4: fechas[3].value.replace("T", " "),
        Act1: {
            Acciones: act1[0].value,
            Asignaturas: act1[1].value,
            Responsables: personas1,
            Fecha: act1[2].value.replace("T", " "),
            Evidencia: act1[3].value
        },
        Act2: {
            Acciones: act2[0].value,
            Asignaturas: act2[1].value,
            Responsables: personas2,
            Fecha: act2[2].value.replace("T", " "),
            Evidencia: act2[3].value
        },
        Act3: {
            Acciones: act3[0].value,
            Asignaturas: act3[1].value,
            Responsables: personas3,
            Fecha: act3[2].value.replace("T", " "),
            Evidencia: act3[3].value
        },
        Act4: {
            Acciones: act4[0].value,
            Asignaturas: act4[1].value,
            Responsables: personas4,
            Fecha: act4[2].value.replace("T", " "),
            Evidencia: act4[3].value
        },
        Act5: {
            Acciones: act5[0].value,
            Asignaturas: act5[1].value,
            Responsables: personas5,
            Fecha: act5[2].value.replace("T", " "),
            Evidencia: act5[3].value
        },
        Act6: {
            Acciones: act6[0].value,
            Asignaturas: act6[1].value,
            Responsables: personas6,
            Fecha: act6[2].value.replace("T", " "),
            Evidencia: act6[3].value
        },
        Act7: {
            Acciones: act7[0].value,
            Asignaturas: act7[1].value,
            Responsables: personas7,
            Fecha: act7[2].value.replace("T", " "),
            Evidencia: act7[3].value
        },
        Act8: {
            Acciones: act8[0].value,
            Asignaturas: act8[1].value,
            Responsables: personas8,
            Fecha: act8[2].value.replace("T", " "),
            Evidencia: act8[3].value
        },
        Act9: {
            Acciones: act9[0].value,
            Asignaturas: act9[1].value,
            Responsables: personas9,
            Fecha: act9[2].value.replace("T", " "),
            Evidencia: act9[3].value
        }
    };
    $.ajax({
        url: 'documentos/crearPlanTrabajo.php',
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

function cargarUsuarios() {
    var arr = ["Hector Francisco Castro Morales", "Christian Emmanuel Yañez Gonzalez", "Sergio Antonio Guerra Castro", "Persona 1", "Persona 2", "1", "2", "3"];
    for (var k = 1; k < 10; k++) {
        var t = document.getElementById("TBAct" + k + "L");
        for (var i = 0; i < arr.length; i++) {
            var tr = document.createElement("tr");
            var td = document.createElement("td");
            var inp = document.createElement("input");
            var lab = document.createElement("label");
            inp.type = "checkbox";
            inp.name = "Act" + k + "C";
            lab.setAttribute("name", "Act" + k + "L");
            lab.innerText = arr[i];
            td.appendChild(inp);
            td.appendChild(lab);
            tr.appendChild(td);
            t.appendChild(tr);
        }
    }

}

function Todos(num) {
    var c = document.getElementsByName("Act" + num + "C");
    for (var i = 0; i < c.length; i++) {
        c[i].checked = document.getElementById('AAct' + num).checked
    }
}