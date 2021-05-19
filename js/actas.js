var id;

async function cargarDatos() {
    window.location.search.substr(1).split("&").forEach(item => {
        id = item.split("=")[1];
    });
    await $.ajax({
        url: "php/sp_getAcademiasParaActas.php",
        type: "POST",
        data: { obj: id },
        dataType: "json",
        success: (r) => {
            let academia = document.getElementById('academia');
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
    await $.ajax({
        url: "php/sp_getGruposDeActas.php",
        type: "POST",
        dataType: "json",
        success: (r) => {
            for (let i = 0; i < r.length; i++)
                construir(r[i].grupo);
        },
        error: (err) => {
            console.log(err);
        }
    });
}

async function construir(obj) {
    await $.ajax({
        url: "php/sp_getInfoGruposDeActas.php",
        type: "POST",
        data: { obj: obj },
        dataType: "json",
        success: (r) => {
            r = r[0];
            let body = document.getElementById('bodytabla');
            let tr = document.createElement('tr');
            tr.setAttribute('class', 'trContent');
            let td = document.createElement('td');
            let img = document.createElement('img');
            img.src = "img/imgPDF.png";
            img.alt = "not found";
            img.setAttribute('class', 'imgRedonda');
            td.appendChild(img);
            tr.appendChild(td);
            td = document.createElement('td');
            let tabla = document.createElement('table');
            tabla.setAttribute('cellspacing', '3');
            tabla.setAttribute('cellpadding', '3');
            let tbody = document.createElement('tbody');
            let text = ["Academia:", "Semestre:", "Cantidad de Actas:"];
            let value = [r["A"], r["S"], r["C"]];
            for (let i = 0; i < text.length; i++) {
                let tr1 = document.createElement('tr');
                let td1 = document.createElement('td');
                let label = document.createElement('label');
                label.setAttribute('class', 'contenidoBusqueda');
                label.innerText = text[i];
                td1.appendChild(label);
                tr1.appendChild(td1);
                td1 = document.createElement('td');
                let inp = document.createElement('input');
                inp.disabled = true;
                inp.value = value[i];
                inp.setAttribute('class', 'contenidoBusqueda');
                td1.appendChild(inp);
                tr1.appendChild(td1);
                if (i == 2) {
                    td1 = document.createElement('td');
                    td1.setAttribute('class', 'tdFinalizar');
                    inp = document.createElement('input');
                    inp.setAttribute('class', 'button buttonContinuar');
                    inp.type = "button";
                    inp.value = "Continuar";
                    inp.addEventListener('click', () => {
                        window.location = `OpcionesActas.html?id=${id}&eG=${obj}&aca=${r["ID"]}`;
                    }, false)
                    td1.appendChild(inp);
                    tr1.appendChild(td1);
                    td1 = document.createElement('td');
                    td1.setAttribute('class', 'tdFinalizar');
                    inp = document.createElement('input');
                    inp.setAttribute('class', 'button buttonFinalizar');
                    inp.type = "button";
                    inp.value = "Finalizar";
                    td1.appendChild(inp);
                    tr1.appendChild(td1);
                }
                tbody.appendChild(tr1);
            }
            tabla.appendChild(tbody);
            td.appendChild(tabla);
            tr.appendChild(td);
            body.appendChild(tr);
        },
        error: (err) => {
            console.log(err);
        }
    });
}

function regresar() {
    window.location = "menu.html?id=" + id;
}

async function crear() {
    let nG;
    await $.ajax({
        url: "php/sp_nuevoGrupo.php",
        type: "POST",
        dataType: "JSON",
        success: (r) => {
            nG = r[0].G;
        },
        error: (err) => {
            console.log(err["responseText"]);
        }
    });
    window.location = `OpcionesActas.html?id=${id}&nG=${nG}&aca=${document.getElementById('academia').value}`;
}