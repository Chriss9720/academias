var obj;
var id;

function cargarDatos() {
    crearLoad('rcornersEliminar');
    obj = [{
        foto: "img/Hector.png",
        nomina: "12345678",
        nombres: "Hector Castro",
        carrera: "ISC",
        academia: "ISC"
    }, {
        foto: "img/imagen.png",
        nomina: "12345679",
        nombres: "Christian Yañez",
        carrera: "ISC",
        academia: "ISC"
    }, {
        foto: "img/imagen.png",
        nomina: "12345679",
        nombres: "Christian Yañez",
        carrera: "ISC",
        academia: "ISC"
    }, {
        foto: "img/imagen.png",
        nomina: "12345679",
        nombres: "Christian Yañez",
        carrera: "ISC",
        academia: "ISC"
    }];
    cargarCarreras();
    cargarAcademias();
    cargar(obj);
    removerLoad();
}

function cargarCarreras() {
    var c = document.getElementById('carrera');
    var carr = ['ISC', 'IGE'];
    for (var i = 0; i < carr.length; i++) {
        var op = document.createElement('option');
        op.value = carr[i];
        op.innerText = carr[i];
        c.appendChild(op);
    }
}

function cargarAcademias() {
    var c = document.getElementById('academia');
    var carr = ['ISC', 'LANI'];
    for (var i = 0; i < carr.length; i++) {
        var op = document.createElement('option');
        op.value = carr[i];
        op.innerText = carr[i];
        c.appendChild(op);
    }
}

function cargar(obj) {
    for (var i = 0; i < obj.length; i++) {
        construir(obj[i]);
    }
}

function construir(obj) {
    var t = document.getElementById('tabla');
    var tbody = document.getElementById('bodytabla');
    var tr1 = document.createElement('tr');
    tr1.setAttribute('class', 'trContentElimiar');
    var td1 = document.createElement('td');
    td1.setAttribute('class', 'tdImgEliminar');
    var img = document.createElement('img');
    img.setAttribute('class', 'imgEliminar');
    img.src = obj['foto'];
    td1.appendChild(img);
    tr1.appendChild(td1);
    var td2 = document.createElement('td');
    td2.setAttribute('class', 'tdContenidoEliminar');
    var tabla2 = document.createElement('table');
    var tb = document.createElement('tbody');
    var tr3 = document.createElement('tr');
    var td31 = document.createElement('td');
    var tablatd31 = document.createElement('table');
    tablatd31.setAttribute('class', 'cuerpoEliminar');
    tablatd31.setAttribute('cellspacing', '3');
    tablatd31.setAttribute('cellpadding', '3');
    var tbody31 = document.createElement('tbody');
    var key = ["Nómina:", "Nombre(s):", "Carrera:", "Academia:"];
    var value = [obj["nomina"], obj["nombres"], obj["carrera"], obj["academia"]];
    for (var i = 0; i < key.length; i++) {
        var trtbody31 = document.createElement('tr');
        var tdtbody31 = document.createElement('td');
        var label = document.createElement('label');
        label.setAttribute('class', 'contenidoEliminar');
        label.innerText = key[i];
        tdtbody31.appendChild(label);
        trtbody31.appendChild(tdtbody31);
        var td2tbody31 = document.createElement('td');
        var inp = document.createElement('input');
        inp.disabled = true;
        inp.value = value[i];
        td2tbody31.appendChild(inp);
        trtbody31.appendChild(td2tbody31);
        tbody31.appendChild(trtbody31);
    }
    tablatd31.appendChild(tbody31);
    td31.appendChild(tablatd31);
    tr3.appendChild(td31);
    tb.appendChild(tr3);

    var tr2 = document.createElement('tr');
    var td22 = document.createElement('td');
    var Vis = document.createElement('input')
    Vis.setAttribute('class', 'button button2Eliminar colorVis');
    Vis.type = 'button';
    Vis.value = 'Visualizar';
    td22.appendChild(Vis);
    tr2.appendChild(td22);
    tb.appendChild(tr2);
    tabla2.appendChild(tb);
    td2.appendChild(tabla2);
    tr1.appendChild(td2);
    tbody.appendChild(tr1);
    t.appendChild(tbody);
}

function buscar() {
    recrear();
    var aux = [];
    var nombre = document.getElementById('SearchName').value;
    var nomina = document.getElementById('sMat').value;
    var carrera = document.getElementById('carrera').value;
    var academia = document.getElementById('academia').value;
    aux = porNombre(nombre, obj, aux);
    aux = porNomina(nomina, obj, aux);
    aux = porCarrera(carrera, obj, aux);
    aux = porAcademia(academia, obj, aux);
    if (nombre.length < 1 && nomina.length < 1 && carrera.length < 1 && academia.length < 1)
        aux = obj;
    else
        aux = filtro(aux);
    cargar(aux);
}

function filtro(obj) {
    var aux = [];
    for (var i = 0; i < obj.length; i++) {
        var f = true;
        for (var k = 0; k < aux.length && f; k++) {
            if (obj[i]['nomina'].includes(aux[k]['nomina'])) {
                f = false;
            }
        }
        if (f)
            aux.push(obj[i]);
    }
    return aux;
}

function porNombre(valor, obj, aux) {
    if (valor.length > 0) {
        for (var i = 0; i < obj.length; i++) {
            if (obj[i]['nombres'].includes(valor)) {
                aux.push(obj[i]);
            }
        }
    }
    return aux;
}

function porNomina(valor, obj, aux) {
    if (valor.length > 0) {
        for (var i = 0; i < obj.length; i++) {
            if (obj[i]['nomina'].includes(valor)) {
                aux.push(obj[i]);
            }
        }
    }
    return aux;
}

function porCarrera(valor, obj, aux) {
    if (valor.length > 0) {
        for (var i = 0; i < obj.length; i++) {
            if (obj[i]['carrera'].includes(valor)) {
                aux.push(obj[i]);
            }
        }
    }
    return aux;
}

function porAcademia(valor, obj, aux) {
    if (valor.length > 0) {
        for (var i = 0; i < obj.length; i++) {
            if (obj[i]['academia'].includes(valor)) {
                aux.push(obj[i]);
            }
        }
    }
    return aux;
}

function recrear() {
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
}

function limpiar() {
    cambiar('eliminar');
}