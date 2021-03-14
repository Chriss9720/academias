function crearPDF() {
    var fechas = document.getElementsByName("Reunion");
    var act1 = document.getElementsByName("act1");
    var act1C = document.getElementsByName("act1C");
    var act1L = document.getElementsByName("act1L");
    var personas1 = "";
    for (var i = 0; i < act1C.length; i++) {
        if (act1C[i].checked)
            personas1 += act1L[i].innerText + " ";
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
    var arr = ["Hector Francisco Castro Morales", "Christian Emmanuel Yañez Gonzalez", "Sergio Antonio Guerra Castro", "Persona 1", "Persona 2"];
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