var id;
var ext;

function cargarDatos() {
    window.location.search.substr(1).split("&").forEach(item => {
        item = item.split("=");
        switch (item[0]) {
            case "id":
                id = item[1];
                break;
            case "nG":
                ext = `nG=${item[1]}`;
                break;
            case "eG":
                ext = `eG=${item[1]}`;
                getDatos(item[1]);
                break;
            case "aca":
                ext += `&aca=${item[1]}`;
        }
    });
}

async function getDatos(g) {
    await $.ajax({
        url: "php/sp_getGrupoActas.php",
        type: "POST",
        data: { obj: g },
        dataType: "json",
        success: (r) => {
            for (let i = 0; i < r.length; i++) {
                construir(r[i]);
            }
        },
        error: (er) => {
            console.log('sp_getGrupoActas');
            console.log(er["responseText"]);
        }
    });
}

function construir(obj) {
    let body = document.getElementById('bodytabla');
    let tr = document.createElement('tr');
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
    let text = ["Autor:", "Semestre:", "Fecha:"];
    let value = [obj.C, obj.S, obj.Fecha.date];
    for (let i = 0; i < text.length; i++) {
        let tr1 = document.createElement('tr');
        let td1 = document.createElement('td');
        let label = document.createElement('label');
        label.setAttribute('class', 'contenidoBusqueda');
        label.innerText = text[i];
        let td2 = document.createElement('td');
        let inp = document.createElement('input');
        inp.disabled = true;
        inp.setAttribute('class', 'contenidoBusqueda');
        inp.value = value[i];
        td1.appendChild(label);
        td2.appendChild(inp);
        tr1.appendChild(td1);
        tr1.appendChild(td2);
        tbody.appendChild(tr1);
    }
    let tr1 = document.createElement('tr');
    let td1 = document.createElement('td');
    let inp = document.createElement('input');
    inp.type = "button";
    inp.setAttribute('class', 'button buttonModificar');
    inp.value = "Ver";
    inp.addEventListener('click', () => {
        window.open(`PDF.html?nombre=${obj.Ruta}`);
    }, false);
    td1.appendChild(inp);
    tr1.appendChild(td1);
    tbody.appendChild(tr1);
    tabla.appendChild(tbody);
    td.appendChild(tabla);
    tr.appendChild(td);
    body.appendChild(tr);
}

function regresar() {
    window.location = "Actas.html?id=" + id;
}

function limpiar() {
    window.location = `OpcionesActas.html?id=${id}&${ext}`
}

function crear() {
    window.location = `agregarActa.html?id=${id}&${ext}`
}