var entradas = [];

async function cargarDatos() {
    crearLoad('rcornersVerificar');
    window.location.search.substr(1).split("&").forEach(item => {
        entradas.push(item.split("=")[1])
    });
    //MISDATOS
    await $.ajax({
        url: "php/sp_getMisDatos.php",
        type: "POST",
        data: { obj: entradas[1] },
        dataType: "json",
        success: (r) => {
            document.getElementById('fotoPerfil').src = r[0]["foto"];
            document.getElementById('matricula').innerText = r[0]["Nomina"];
            document.getElementById('nombre').innerText = r[0]["Nombre"];
        },
        error: (r) => {
            console.log("in sp_getMisDatos");
            console.log(r["responseText"]);
        }
    });
    //MISACADEMIAS
    await $.ajax({
        url: "php/getMisAcademias.php",
        type: "POST",
        data: { obj: entradas[1] },
        dataType: "json",
        success: (r) => {
            var b = document.getElementById('academias');
            for (let i = 0; i < r.length; i++) {
                var tr = document.createElement('tr');
                tr.setAttribute('class', 'tr');
                var td = document.createElement('td');
                td.setAttribute('class', 'td');
                td.innerText = r[i]["Academia"];
                tr.appendChild(td);
                var td = document.createElement('td');
                td.setAttribute('class', 'td');
                td.innerText = r[i]["Puesto"];
                tr.appendChild(td);
                b.appendChild(tr);
            }
        },
        error: (er) => {
            console.log("in getMisAcademias");
            console.log(er["responseText"]);
        }
    });
    //MIS RECIENTES
    await $.ajax({
        url: "php/sp_misRecientes.php",
        type: "POST",
        data: { obj: entradas[1] },
        dataType: "json",
        success: (r) => {
            let trr = document.getElementById('documentosRecientes');
            for (let i = 0; i < r.length; i++) {
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
                label.innerText = r[i]["Tipo"];
                tdlabel.appendChild(label);
                trlabel.appendChild(tdlabel);
                table.appendChild(trimg);
                table.appendChild(trlabel);
                td.appendChild(table);
                td.addEventListener('click', function() {
                    abrirDoc(r[i]["Ruta"]);
                }, false);
                trr.appendChild(td);
            }
        },
        error: (r) => {
            console.log("in sp_misRecientes");
            console.log(r["responseText"]);
        }
    });
    //MIS PENDIENTES
    await $.ajax({
        url: "php/sp_misPendientes.php",
        type: "POST",
        data: { obj: entradas[1] },
        dataType: "json",
        success: (r) => {
            var trp = document.getElementById('documentosPendientes');
            for (let i = 0; i < r.length; i++) {
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
                label.innerText = r[i]["Tipo"];
                tdlabel.appendChild(label);
                trlabel.appendChild(tdlabel);
                table.appendChild(trimg);
                table.appendChild(trlabel);
                td.appendChild(table);
                td.addEventListener('click', function() {
                    abrirDoc(r[i]["Ruta"]);
                }, false);
                trp.appendChild(td);
            }
        },
        error: (r) => {
            console.log(r);
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