var data;

function cargarDatos() {
    data = [];
    window.location.search.substr(1).split("&").forEach(item => {
        data.push(item.split("=")[1]);
    });
    cargarUsuarios();
    $.ajax({
        url: "documentos/leerPlan.php",
        Type: "GET",
        data: { obj: data[1] },
        dataType: "JSON",
        success: function(r) {
            var c = r["Cabecera"];
            document.getElementById('academia').value = (c["Academia"]);
            document.getElementById('semestre').value = (c["Semestre"]);
            var reuniones = document.getElementsByName('Reunion');
            var key = ["Primera", "Segunda", "Tercera", "Cuarta"];
            for (var i = 0; i < reuniones.length; i++) {
                reuniones[i].value = ajustarFecha(c[key[i]]);
            }
            for (var j = 1; j < 10; j++) {
                var act1 = document.getElementsByName('Act' + j);
                var act = r["Act" + j];
                var responsables = act["Responsable"].split("?");
                var names = document.getElementsByName('Act' + j + "L");
                for (var i = 0; i < names.length; i++) {
                    let band = true;
                    for (var k = 0; k < (responsables.length - 1) && band; k++) {
                        if (names[i].innerText.includes(responsables[k])) {
                            document.getElementsByName('Act' + j + 'C')[i].checked = true;
                            band = false;
                        }
                    }
                }
                key = ["Acciones", "Asignarutas", "Fecha", "Evidencia"];
                for (var i = 0; i < act1.length; i++) {
                    if (i == 2) {
                        act1[i].value = ajustarFecha(act[key[i]]);
                    } else {
                        act1[i].innerText = act[key[i]];
                    }
                }
            }
        },
        error: function(err) {
            console.log(err)
        }
    });
}

function ajustarFecha(fecha) {
    fecha = fecha.replace(" ", "T");
    return fecha;
}

function cargarUsuarios() {
    var obj = {
        aca: data[2],
        nom: 0
    }
    $.ajax({
        url: "php/getAllMiembros.php",
        type: "GET",
        data: { obj: obj },
        dataType: "json",
        success: function(r) {
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
        error: function(err) {
            console.log(err);
        }
    });
}

function regresar() {
    window.location = "OpcionesPlanTrabajo.html?id=" + data[0];
}

function actualizar() {
    var r = document.getElementsByName('Reunion');
    console.log(r[0].value);
}