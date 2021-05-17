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
        success: (r) => {
            let cabecera = r.Cabecera;
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
            for (let i = 0; i < 1 /*Acts.length*/ ; i++) {
                let Act = Acts[i];
                for (let j = 0; j < entradas.length; j++) {

                    console.log(`Act ${i+1} ${entradas[j]} => ${Act[entradas[j]]}`)
                }
            }
        },
        error: (err) => {
            console.log(err["responseText"]);
        }
    });
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

function actualizar() {

}