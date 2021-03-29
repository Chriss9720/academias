var obj;

function cargarDatos() {
    crearLoad('rcornersEliminar');
    cargando();
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
    var td32 = document.createElement('td');
    var tablatd32 = document.createElement('table');
    tablatd32.setAttribute('class', 'cuerpoEliminar');
    tablatd32.setAttribute('cellspacing', '3');
    tablatd32.setAttribute('cellpadding', '3');
    tablatd32.setAttribute('name', 'ok');
    var tbody32 = document.createElement('tbody');
    var permisosAdmin = ['Plan de trabajo (crear, modificar)', 'Acciones al personal(alta, baja, modificar)',
        'Acciones a academias (alta, baja, modificar)', 'Acciones a carrera (alta, modificar)'
    ];
    var trPermisosTitlulo = document.createElement('tr');
    var th = document.createElement('th');
    th.innerText = 'Permisos de Admin:';
    trPermisosTitlulo.appendChild(th);
    tbody32.appendChild(trPermisosTitlulo);
    for (var i = 0; i < permisosAdmin.length; i++) {
        var trPermisos = document.createElement('tr');
        var tdPermisos = document.createElement('td');
        var inpPermisos = document.createElement('input');
        inpPermisos.setAttribute('type', 'checkbox');
        var labelPer = document.createElement('label');
        labelPer.setAttribute('class', 'contenidoEliminar');
        labelPer.innerText = permisosAdmin[i];
        tdPermisos.appendChild(inpPermisos);
        tdPermisos.appendChild(labelPer);
        trPermisos.appendChild(tdPermisos);
        tbody32.appendChild(trPermisos);
    }
    tablatd32.appendChild(tbody32);
    td32.appendChild(tablatd32);
    tr3.appendChild(td32);
    var td33 = document.createElement('td');
    var tablatd33 = document.createElement('table');
    tablatd33.setAttribute('class', 'cuerpoEliminar');
    tablatd33.setAttribute('cellspacing', '3');
    tablatd33.setAttribute('cellpadding', '3');
    var tbody33 = document.createElement('tbody');
    var trPermisosTitlulo = document.createElement('tr');
    var th = document.createElement('th');
    th.innerText = 'Permisos generales:';
    trPermisosTitlulo.appendChild(th);
    tbody33.appendChild(trPermisosTitlulo);
    var permisosGen = ['Actas (crear y modificar)', 'Evaluar Profesor (crear y modificar)',
        'Evaluar Presidente(crear y modificar)'
    ];
    for (var i = 0; i < permisosGen.length; i++) {
        var trPermisos = document.createElement('tr');
        var tdPermisos = document.createElement('td');
        var inpPermisos = document.createElement('input');
        inpPermisos.setAttribute('type', 'checkbox');
        var labelPer = document.createElement('label');
        labelPer.setAttribute('class', 'contenidoEliminar');
        labelPer.innerText = permisosGen[i];
        tdPermisos.appendChild(inpPermisos);
        tdPermisos.appendChild(labelPer);
        trPermisos.appendChild(tdPermisos);
        tbody33.appendChild(trPermisos);
    }
    var trBtnPermisos = document.createElement('tr');
    var tdBtnPermisos = document.createElement('td');
    var AplicarPermisos = document.createElement('input');
    AplicarPermisos.setAttribute('class', 'button buttonAplicarP');
    AplicarPermisos.type = 'button';
    AplicarPermisos.value = 'Aplicar Permisos';
    AplicarPermisos.addEventListener('click', function() {
        alert(obj["nomina"]);
    }, false)
    tdBtnPermisos.appendChild(AplicarPermisos);
    trBtnPermisos.appendChild(tdBtnPermisos);
    tbody33.appendChild(trBtnPermisos);
    tablatd33.appendChild(tbody33);
    td33.appendChild(tablatd33);
    tr3.appendChild(td33);
    tb.appendChild(tr3);

    var tr2 = document.createElement('tr');
    var td22 = document.createElement('td');
    var Mod = document.createElement('input')
    Mod.setAttribute('class', 'button button2Eliminar');
    Mod.type = 'button';
    Mod.value = 'Modificar';
    var Vis = document.createElement('input')
    Vis.setAttribute('class', 'button button2Eliminar');
    Vis.type = 'button';
    Vis.value = 'Visualizar';

    td22.appendChild(Mod);
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