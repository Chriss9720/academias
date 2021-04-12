var obj;
var id;

function cargarDatos() {
    crearLoad('rcornersEliminar');
    obj = [];
    window.location.search.substr(1).split("&").forEach(item => {
        id = item.split("=")[1];
    });
    $.ajax({
        url: "php/getPlanes.php",
        dataType: "JSON",
        success: function(r) {
            if (r.length > 0) {
                obj.push(r[0]);
                for (var i = 1; i < r.length; i++) {
                    if (r[i]["IDPlan"] != obj[obj.length - 1]["IDPlan"]) {
                        obj.push(r[i]);
                    }
                }
            }
            cargarCarreras();
            cargarAcademias();
            cargarSemestres();
            cargar(obj);
            removerLoad();
        },
        error: function(r) {
            console.log(r);
            removerLoad();
        }
    });
}

function cargarSemestres() {
    $.ajax({
        url: "php/getSemestres.php",
        type: "POST",
        dataType: "json",
        success: function(r) {
            var c = document.getElementById("busquedaXsemestre");
            for (var i = 0; i < r.length; i++) {
                var option = document.createElement("option");
                option.innerText = r[i]["Semestre"];
                c.appendChild(option);
            }
        },
        error: function(err) {
            console.log(err);
        }
    });
}

function cargarCarreras() {
    $.ajax({
        url: "php/getCarreras.php",
        type: "POST",
        dataType: "json",
        success: function(r) {
            var c = document.getElementById("carrera");
            for (var i = 0; i < r.length; i++) {
                var option = document.createElement("option");
                option.value = r[i]["carrera"];
                option.innerText = r[i]["carrera"];
                c.appendChild(option);
            }
        },
        error: function(err) {
            console.log(err);
        }
    });
}

function cargarAcademias() {
    $.ajax({
        url: "php/getAcademias.php",
        type: "POST",
        dataType: "json",
        success: function(r) {
            var c = document.getElementById('academia');
            for (var i = 0; i < r.length; i++) {
                var option = document.createElement("option");
                option.value = r[i]["Academia"];
                option.innerText = r[i]["Academia"];
                c.appendChild(option);
            }
        },
        error: function(err) {
            console.log(err);
        }
    });
}

function cargar(obj) {
    for (var i = 0; i < obj.length; i++) {
        construir(obj[i]);
    }
}

function construir(data) {
    var t = document.getElementById('tabla');
    var tbody = document.getElementById('bodytabla');

    var tr = document.createElement('tr');
    var td = document.createElement('td');
    var img = document.createElement('img');
    img.src = "img/imgPDF.png";
    img.setAttribute('class', 'imgRedonda')
    td.appendChild(img);
    tr.appendChild(td);
    tbody.appendChild(tr);

    var td = document.createElement('td');
    var table = document.createElement('table');
    table.setAttribute('cellspacing', '3');
    table.setAttribute('cellpadding', '3');
    var tbody2 = document.createElement('tbody');
    var tr2 = document.createElement('tr');
    var td21 = document.createElement('td');
    addLabel(td21, "Carrera:", "contenidoBusqueda");
    var td22 = document.createElement('td');
    addInput(td22, data["Carrera"], "contenidoBusqueda");
    var td23 = document.createElement('td');
    addLabel(td23, "Academia:", "contenidoBusqueda");
    var td24 = document.createElement('td');
    addInput(td24, data["Academia"], "contenidoBusqueda");
    tr2.appendChild(td21);
    tr2.appendChild(td22);
    tr2.appendChild(td23);
    tr2.appendChild(td24);
    tbody2.appendChild(tr2);


    var tr2 = document.createElement('tr');
    var td21 = document.createElement('td');
    addLabel(td21, "Autor:", "contenidoBusqueda");
    var td22 = document.createElement('td');
    addInput(td22, data["Autor"], "contenidoBusqueda");
    var td23 = document.createElement('td');
    addLabel(td23, "Nómina:", "contenidoBusqueda");
    var td24 = document.createElement('td');
    addInput(td24, data["Nomina"], "contenidoBusqueda");
    tr2.appendChild(td21);
    tr2.appendChild(td22);
    tr2.appendChild(td23);
    tr2.appendChild(td24);
    tbody2.appendChild(tr2);

    var tr2 = document.createElement('tr');
    var td21 = document.createElement('td');
    addLabel(td21, "Semestre:", "contenidoBusqueda");
    var td22 = document.createElement('td');
    addInput(td22, data["Semestre"], "contenidoBusqueda");
    tr2.appendChild(td21);
    tr2.appendChild(td22);
    tbody2.appendChild(tr2);

    table.appendChild(tbody2);
    td.appendChild(table);
    tr.appendChild(td);
    tbody.appendChild(tr);

    var tr = document.createElement('tr');
    var td = document.createElement('td');
    var inp = document.createElement('input');
    inp.setAttribute('class', 'button buttonModificar');
    inp.type = "Button";
    inp.value = "Modificar";
    inp.addEventListener('click', function() {
        mod(data["IDPlan"])
    }, false);
    td.appendChild(inp);
    tr.appendChild(td);
    tbody.appendChild(tr);
    t.appendChild(tbody);
}

function mod(mod) {
    window.location.href = "modificarPlanTrabajo.html?id=" + id + "&mod=" + mod;
}

function addLabel(node, text, clase) {
    var label = document.createElement('label');
    label.innerText = text;
    label.setAttribute('class', clase);
    node.appendChild(label);
}

function addInput(node, texto, clase) {
    var inp = document.createElement('input');
    inp.disabled = true;
    inp.value = texto;
    inp.setAttribute('class', clase);
    node.appendChild(inp);
}

function regresar() {
    window.location = "menu.html?id=" + id;
}

function buscar() {
    recrear(0);
    var aux = [];
    var nombre = document.getElementById('SearchName').value;
    var carrera = document.getElementById('carrera').value;
    var academia = document.getElementById('academia').value;
    var nomina = document.getElementById('sMat').value;
    var semestre = document.getElementById('busquedaXsemestre').value;
    aux = buscarX(nombre, obj, aux, "Autor");
    aux = buscarX(carrera, obj, aux, "Carrera");
    aux = buscarX(academia, obj, aux, "Academia");
    aux = buscarX(nomina, obj, aux, "Nomina");
    aux = buscarX(semestre, obj, aux, "Semestre");
    if (nombre.length < 1 && carrera == "Seleciona una" && academia == "Seleciona una" && nomina.length < 1 && semestre == "Seleciona una") {
        aux = obj;
    } else {
        aux = filtro(aux);
    }
    cargar(aux);
}

function recrear(op) {
    document.getElementById("tabla").remove();
    var page = document.getElementById("page");
    var t = document.createElement("table");
    var tbody = document.createElement('tbody');
    tbody.setAttribute('id', 'bodytabla');
    t.setAttribute("id", "tabla");
    t.setAttribute("cellspacing", "3");
    t.setAttribute("cellpadding", "3");
    t.setAttribute("class", "tablaElimiar");
    t.appendChild(tbody);
    page.appendChild(t);
    if (op == 1)
        cargarDatos();
}

function buscarX(nombre, obj, aux, param) {
    if (nombre.length > 0) {
        for (var i = 0; i < obj.length; i++) {
            if (obj[i][param].includes(nombre))
                aux.push(obj[i]);
        }
    }
    return aux;
}

function filtro(obj) {
    var aux = [];
    for (var i = 0; i < obj.length; i++) {
        var f = true;
        for (var k = 0; k < aux.length && f; k++) {
            if (obj[i]['IDPlan'] == aux[k]['IDPlan']) {
                f = false;
            }
        }
        if (f)
            aux.push(obj[i]);
    }
    return aux;
}

function limpiar() {
    window.location.href = "OpcionesPlanTrabajo.html?id=" + id;
}

function crear() {
    window.location.href = "planTrabajo.html?id=" + id;
}