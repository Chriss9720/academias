var id;

async function cargarDatos() {
    window.location.search.substr(1).split("&").forEach(item => {
        id = item.split("=")[1];
    });
    await $.ajax({
        url: "php/sp_getPendientes.php",
        type: "POST",
        data: { obj: id },
        dataType: "JSON",
        success: (r) => {
            for (let i = 0; i < r.length; i++)
                construir(r[i], i);
        },
        error: (r) => {
            console.log(r);
        }
    });
}

function construir(obj, p) {
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
    let table = document.createElement('table');
    let tbody = document.createElement('tbody');
    table.setAttribute('cellspacing', '3');
    table.setAttribute('cellpadding', '3');
    let text = ["Tipo:", "Academia:", "Semestre:", "Fecha de vigencia:"]
    let value = [obj.T, obj.A, obj.S, obj.F];
    for (let i = 0; i < text.length; i++) {
        let tr1 = document.createElement('tr');
        let td1 = document.createElement('td');
        let label = document.createElement('label');
        label.setAttribute('class', 'contenidoBusqueda');
        label.innerHTML = text[i];
        td1.appendChild(label);
        tr1.appendChild(td1);
        td1 = document.createElement('td');
        let inp = document.createElement('input');
        inp.setAttribute('class', 'contenidoBusqueda');
        if (i == 3) {
            if (value[i] == null)
                inp.value = "No aplica";
            else
                inp.value = value[i];
        } else
            inp.value = value[i];
        inp.disabled = true;
        td1.appendChild(inp);
        tr1.appendChild(td1);
        if (i == 3) {
            td1 = document.createElement('td');
            inp = document.createElement('input');
            inp.setAttribute('class', "button buttonDoc");
            inp.disabled = false;
            inp.type = "button";
            inp.value = "Ver Documento";
            inp.addEventListener('click', () => {
                window.open(`PDF.html?nombre=${obj.Ruta}`);
            }, false);
            td1.appendChild(inp);
            tr1.appendChild(td1);
            td1 = document.createElement('td');
            inp = document.createElement('input');
            inp.setAttribute('class', 'button buttonPDF');
            inp.type = "file";
            inp.accept = "application/pdf";
            inp.id = `file${p}`;
            inp.name = `file${p}`;
            td1.appendChild(inp);
            tr1.appendChild(td1);
            td1 = document.createElement('td');
            inp = document.createElement('input');
            inp.setAttribute('class', 'button buttonPDF subir');
            inp.type = "button";
            inp.value = "Subir";
            inp.addEventListener('click', () => {
                subir(obj, p);
            }, false);
            td1.appendChild(inp);
            tr1.appendChild(td1);
        }
        tbody.appendChild(tr1);
    }
    table.appendChild(tbody);
    td.appendChild(table);
    tr.appendChild(td);
    body.appendChild(tr);
}

async function subir(obj, p) {
    let files = document.getElementById(`file${p}`).files[0];
    if (files != null) {
        let date = new Date();
        let d = "Evidendia - " + date.getFullYear() + '-' + date.getMonth() + "-" + date.getDay() + '-' + date.getTime() + ".pdf";
        obj.path = `Extras/${d}`;
        let file = new File([], d);
        let formData = new FormData();
        formData.append('file', files);
        formData.append('name', file);
        await $.ajax({
            url: "documentos/Extras/subirPrueba.php",
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: async(r) => {
                switch (parseInt(r)) {
                    case 1:
                        await $.ajax({
                            url: "php/guardarPrueba.php",
                            type: "post",
                            data: { obj: obj },
                            success: (r) => {
                                window.location.reload();
                            },
                            error: (er) => {
                                console.log(er);
                            }
                        })
                        break;
                }
            },
            error: (err) => {
                console.log(err);
            }
        })
    }
}

function cambiar(ruta) {
    window.location.href = ruta + ".html?id=" + id;
}