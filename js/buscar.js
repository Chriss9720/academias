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
    var t = document.getElementById("tabla");
    //tr Principal
    var tr1 = document.createElement("tr");
    tr1.setAttribute("class", "trContentElimiar");
    //Td de la foto
    var tdF = document.createElement("td");
    tdF.setAttribute("class", "tdImgEliminar");
    var img = document.createElement("img");
    img.setAttribute("class", "imgEliminar");
    img.src = obj['foto'];
    tdF.appendChild(img);
    tr1.appendChild(tdF);
    //Td de la info
    var tdI = document.createElement("td");
    tdI.setAttribute("class", "tdContenidoEliminar");
    //contenedor de la info
    var tabla = document.createElement("table");
    var trI = document.createElement("tr");
    var tdI2 = document.createElement("td");
    //tabla final
    var tablaF = document.createElement("table");
    tablaF.setAttribute("class", "cuerpoEliminar");
    tablaF.setAttribute("cellspacing", "3");
    tablaF.setAttribute("cellpadding", "3");
    var key = ["Nómina:", "Nombre(s):", "Carrera:", "Academia:"];
    var value = [obj["nomina"], obj["nombres"], obj["carrera"], obj["academia"]];
    for (var i = 0; i < key.length; i++) {
        var trNomina = document.createElement("tr");
        var tdLabel = document.createElement("td");
        var labelNom = document.createElement("label");
        labelNom.setAttribute("class", "contenidoEliminar");
        labelNom.textContent = key[i];
        tdLabel.appendChild(labelNom);

        var tdInp = document.createElement("td");
        var inp = document.createElement("input");
        inp.disabled = true;
        inp.value = value[i];
        tdInp.appendChild(inp);

        trNomina.appendChild(tdLabel);
        trNomina.appendChild(tdInp);
        tablaF.appendChild(trNomina);
    }
    tdI2.appendChild(tablaF);
    trI.appendChild(tdI2);
    tabla.appendChild(trI);
    //elimiar
    var trD = document.createElement("tr");
    var tdD = document.createElement("td");
    tdD.setAttribute("class", "tdbtnEliminar");
    //boton mod
    var del = document.createElement("input");
    del.setAttribute("class", "button button2Eliminar");
    del.type = "button";
    del.value = "Modificar";
    del.addEventListener("click", function() {
        modificar(value[0]);
    }, false);
    trD.appendChild(del);
    var tdD = document.createElement("td");
    tdD.setAttribute("class", "tdbtnEliminar");
    //boton mod
    var del = document.createElement("input");
    del.setAttribute("class", "button button2Eliminar");
    del.type = "button";
    del.value = "Visualizar";
    del.addEventListener("click", function() {
        vis(value[0]);
    }, false);
    trD.appendChild(del);
    tabla.appendChild(trD);
    tdI.appendChild(tabla);
    tr1.appendChild(tdI);
    t.appendChild(tr1);
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
    t.setAttribute("id", "tabla");
    t.setAttribute("cellspacing", "3");
    t.setAttribute("cellpadding", "3");
    t.setAttribute("class", "tablaElimiar");
    page.appendChild(t);
}

function limpiar() {
    cambiar('eliminar');
}