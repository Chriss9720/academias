var entradas = [];

function cargarDatos() {
    crearLoad('rcornersVerificar');
    window.location.search.substr(1).split("&").forEach(item => {
        entradas.push(item.split("=")[1])
    });
    $.ajax({
        url: "php/getVista.php",
        type: "GET",
        data: { obj: entradas[1] },
        dataType: "json",
        success: function(r) {
            var arr = r["res"];
            console.log(arr);
            document.getElementById('fotoPerfil').src = arr[0]["Foto"];
            document.getElementById('matricula').innerText = arr[0]["nomina"];
            document.getElementById('nombre').innerText = arr[0]["ApellidoP"] + " " + arr[0]["ApellidoM"] + " " + arr[0]["Nombre"];
            var b = document.getElementById('academias');
            var academias = [{
                id: arr[0]["IDAcademia"],
                academia: arr[0]["Academia"],
                puesto: arr[0]["Puesto"]
            }];
            for (var i = 1; i < arr.length; i++) {
                var f = true;
                for (var j = 0; j < academias.length && f == true; j++) {
                    f = !(arr[i]["IDAcademia"] == academias[j].id)
                }
                if (f) {
                    academias.push({
                        id: arr[i]["IDAcademia"],
                        academia: arr[i]["Academia"],
                        puesto: arr[i]["Puesto"]
                    });
                }
            }
            for (var i = 0; i < academias.length; i++) {
                var tr = document.createElement('tr');
                tr.setAttribute('class', 'tr');
                var td = document.createElement('td');
                td.setAttribute('class', 'td');
                td.innerText = academias[i]["academia"];
                tr.appendChild(td);
                var td = document.createElement('td');
                td.setAttribute('class', 'td');
                td.innerText = academias[i]["puesto"];
                tr.appendChild(td);
                b.appendChild(tr);
            }

            var trr = document.getElementById('documentosRecientes');
            var trp = document.getElementById('documentosPendientes');
            for (var i = 0; i < arr.length; i++) {
                //tabla de documentos
                var f = 0;
                if (arr[i]["Responsable"] != null && arr[i]["Responsable"].includes(arr[i]["nomina"])) {
                    f++;
                }
                if (arr[i]["responsable2"] != null && arr[i]["responsable2"].includes(arr[i]["nomina"])) {
                    f++;
                }

                if (f > 0) {
                    var td = document.createElement('td');
                    var table = document.createElement('table');
                    table.setAttribute('cellspacing', '3');
                    table.setAttribute('cellpadding', '3');
                    table.setAttribute('class', 'tablaRecientes2');
                    var trimg = document.createElement('tr');
                    var tdimg = document.createElement('td');
                    var img = document.createElement('img');
                    img.setAttribute('class', 'imgDocumento');
                    img.src = "img/imgPDF.png";
                    img.alt = "Imagen no encontrada";
                    tdimg.appendChild(img);
                    trimg.appendChild(tdimg);
                    var trlabel = document.createElement('tr');
                    var tdlabel = document.createElement('td');
                    var label = document.createElement('label');
                    console.log(arr[i]["fecha"])
                    if (arr[i]["fecha"] == null) {
                        label.innerText = "Plan de trabajo-" + arr[i]["Academia"] + "-" + arr[i]["Semestre"];
                    } else {
                        label.innerText = "Acuerdo-" + arr[i]["Academia"] + "-" + arr[i]["Semestre"];
                    }
                    tdlabel.appendChild(label);
                    trlabel.appendChild(tdlabel);
                    table.appendChild(trimg);
                    table.appendChild(trlabel);
                    td.appendChild(table);
                    if (arr[i]["fecha"] == null) {
                        td.addEventListener('click', function() {
                            abrirDoc(arr[(i - 1)]["PlanTrabajo"]);
                        }, false);
                        trp.appendChild(td);
                    } else {
                        td.addEventListener('click', function() {
                            abrirDoc(arr[(i - 1)]["rutaResponsables"] + "Responsables");
                        }, false);
                        trr.appendChild(td);
                    }
                }
            }
        },
        error: function(err) {
            console.log(err);
        }
    });
    removerLoad();
}

function regresar() {
    window.location = entradas[2] + ".html?id=" + entradas[0];
}

function abrirDoc(path) {
    window.open("PDF.html?nombre=" + path);
}