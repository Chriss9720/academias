var datos = [];
var id;

function cargarDatos() {
    crearLoad('rcornersEliminarAcademia');
    window.location.search.substr(1).split("&").forEach(item => {
        id = item.split("=")[1];
    });
    $.ajax({
        url: "php/getAllAcademias.php",
        type: "GET",
        dataType: 'json',
        success: function(r) {
            for (var i = 0; i < r.length; i++) {
                datos.push(r[i]);
                construir(r[i]);
            }
        },
        error: function(err) {
            console.log(err);
        }
    });
    $.ajax({
        url: "php/getCarreras.php",
        type: "POST",
        dataType: "json",
        success: function(r) {
            var c = document.getElementById("nuevaCarrera");
            for (var i = 0; i < r.length; i++) {
                var option = document.createElement("option");
                option.value = r[i]["ID"];
                option.innerText = r[i]["carrera"];
                c.appendChild(option);
            }
        },
        error: function(err) {
            console.log(err);
        }
    });
    $.ajax({
        url: "php/paraAcademia.php",
        dataType: "JSON",
        success: function(r) {
            var c = document.getElementById("nuevoEncargado");
            for (var i = 0; i < r.length; i++) {
                var option = document.createElement("option");
                option.value = r[i]["Nomina"];
                option.innerText = r[i]["Nombre"];
                c.appendChild(option);
            }
        },
        error: function(err) {
            console.log(err);
        }
    });
    removerLoad();
}

function cargar(obj) {
    for (var i = 0; i < obj.length; i++) {
        construir(obj[i]);
    }
}

function construir(data) {
    var tabla = document.getElementById("cuerpo");
    var tr = document.createElement('tr');
    tr.setAttribute('class', 'trContentElimiarAcademia');
    var td = document.createElement('td');
    td.setAttribute('class', 'tdContenidoEliminarAcademia');
    var tabla2 = document.createElement('table');
    var tbody2 = document.createElement('tbody');
    var tr12 = document.createElement('tr');
    var td12 = document.createElement('td');
    var table12 = document.createElement('table');
    table12.setAttribute('class', 'cuerpoEliminarAcademia');
    table12.setAttribute('cellspacing', '3');
    table12.setAttribute('cellpadding', '3');
    //ID
    var tbody12 = document.createElement('tbody');
    var tr13 = document.createElement('tr');
    var td131 = document.createElement('td');
    var label = document.createElement('label');
    label.setAttribute('class', 'contenidoEliminarAcademia');
    label.innerText = "ID de la Academia:";
    td131.appendChild(label);
    tr13.appendChild(td131);
    var td131 = document.createElement('td');
    var inp = document.createElement('input');
    inp.disabled = true;
    inp.setAttribute('name', data["IDAcademia"]);
    inp.value = data["IDAcademia"];
    td131.appendChild(inp);
    tr13.appendChild(td131);
    tbody12.appendChild(tr13);
    //Nombre
    var tr13 = document.createElement('tr');
    var td131 = document.createElement('td');
    var label = document.createElement('label');
    label.setAttribute('class', 'contenidoEliminarAcademia');
    label.innerText = "Nombre de la Academia:";
    td131.appendChild(label);
    tr13.appendChild(td131);
    var td131 = document.createElement('td');
    var inp = document.createElement('input');
    inp.disabled = true;
    inp.setAttribute('name', data["IDAcademia"]);
    inp.value = data["Academia"];
    td131.appendChild(inp);
    tr13.appendChild(td131);
    tbody12.appendChild(tr13);
    //GetAllMiembros
    var tr13 = document.createElement('tr');
    var td131 = document.createElement('td');
    var label = document.createElement('label');
    label.setAttribute('class', 'contenidoEliminarAcademia');
    label.innerText = "Encargado(a) de la Academia:";
    td131.appendChild(label);
    tr13.appendChild(td131);
    var td131 = document.createElement('td');
    var selector = document.createElement('select');
    selector.setAttribute('style', 'width: 100%;');
    selector.setAttribute('name', data["IDAcademia"]);
    var obj = {
        aca: data["IDAcademia"],
        nom: data["Nomina"]
    };
    var option = document.createElement('option');
    if (data["Nombre_s_"] != null) {
        option.value = obj.nom;
        option.innerText = data["Nombre_s_"];
    } else {
        option.value = -1;
        option.innerText = "No especificado";
    }
    selector.disabled = true;
    selector.appendChild(option);
    getMienbros(selector, obj);
    td131.appendChild(selector);
    tr13.appendChild(td131);
    tbody12.appendChild(tr13);
    //getAllCarreraAsociada
    var tr13 = document.createElement('tr');
    var td131 = document.createElement('td');
    var label = document.createElement('label');
    label.setAttribute('class', 'contenidoEliminarAcademia');
    label.innerText = "Carrera Asociada:";
    td131.appendChild(label);
    tr13.appendChild(td131);
    var td131 = document.createElement('td');
    var selector = document.createElement('select');
    selector.setAttribute('style', 'width: 100%;');
    selector.setAttribute('name', data["IDAcademia"]);
    var option = document.createElement('option');
    if (data["Nombre"] != null) {
        option.value = data["IDCarrera"];
        option.innerText = data["Nombre"];
    } else {
        option.value = -1;
        option.innerText = "No especificado";
    }
    selector.disabled = true;
    selector.appendChild(option);
    getAllCarreraAsociada(selector, data["IDCarrera"]);
    td131.appendChild(selector);
    tr13.appendChild(td131);
    tbody12.appendChild(tr13);
    //Alta
    var tr13 = document.createElement('tr');
    var td131 = document.createElement('td');
    var label = document.createElement('label');
    label.setAttribute('class', 'contenidoEliminarAcademia');
    label.innerText = "Alta Academia:";
    td131.appendChild(label);
    tr13.appendChild(td131);
    var td131 = document.createElement('td');
    var inp = document.createElement('input');
    inp.disabled = true;
    inp.setAttribute('name', data["IDAcademia"]);
    inp.value = data["AltaAcademia"].date.split(" ")[0];
    td131.appendChild(inp);
    tr13.appendChild(td131);
    tbody12.appendChild(tr13);
    //Baja
    var tr13 = document.createElement('tr');
    var td131 = document.createElement('td');
    var label = document.createElement('label');
    label.setAttribute('class', 'contenidoEliminarAcademia');
    label.innerText = "Baja Academia:";
    td131.appendChild(label);
    tr13.appendChild(td131);
    var td131 = document.createElement('td');
    var inp = document.createElement('input');
    inp.disabled = true;
    inp.setAttribute('name', data["IDAcademia"]);
    if (data["BajaAcademia"] != null)
        inp.value = data["BajaAcademia"].date.split(" ")[0];
    else
        inp.value = "No esta dada de baja";
    td131.appendChild(inp);
    tr13.appendChild(td131);
    tbody12.appendChild(tr13);
    table12.appendChild(tbody12);
    td12.appendChild(table12);
    tr12.appendChild(td12);
    //Botones
    var tr13 = document.createElement('tr');
    var td131 = document.createElement('td');
    var eliminar = document.createElement('input');
    eliminar.type = "button";
    eliminar.setAttribute('class', 'button buttonEliminar');
    eliminar.value = "Eliminar";
    eliminar.setAttribute('onclick', 'eliminarAcademia("' + data["IDAcademia"] + '")')
    td131.appendChild(eliminar);
    var mod = document.createElement('input');
    mod.type = "button";
    mod.setAttribute('class', 'button buttonEliminar mod');
    mod.value = "Modificar";
    mod.setAttribute('onclick', 'modificarAcademia("' + data["IDAcademia"] + '")');
    td131.appendChild(mod);
    var guar = document.createElement('input');
    guar.type = "button";
    guar.setAttribute('name', data["IDAcademia"]);
    guar.setAttribute('class', 'button buttonEliminar desac');
    guar.value = "Guardar";
    guar.setAttribute('onclick', 'guardar("' + data["IDAcademia"] + '")');
    guar.disabled = true;
    td131.appendChild(guar);
    tr13.appendChild(td131);
    tbody2.appendChild(tr12);
    tbody2.appendChild(tr13);
    tabla2.appendChild(tbody2);
    td.appendChild(tabla2);
    tr.appendChild(td);
    tabla.appendChild(tr);
}

function getMienbros(selector, obj) {
    $.ajax({
        url: "php/getAllMiembros.php",
        type: "GET",
        data: { obj: obj },
        dataType: "json",
        success: function(r) {
            var arr = r["res"];
            for (var j = 0; j < arr.length; j++) {
                var option = document.createElement('option');
                option.value = arr[j]["Nomina"];
                option.innerText = arr[j]["Nombre_s_"];
                selector.appendChild(option);
            }
        },
        error: function(err) {
            console.log(err);
        }
    });
}

function getAllCarreraAsociada(selector, obj) {
    $.ajax({
        url: "php/getAllCarreraAsociada.php",
        type: "GET",
        data: { obj: obj },
        dataType: "json",
        success: function(r) {
            var arr = r["res"];
            for (var j = 0; j < arr.length; j++) {
                var option = document.createElement('option');
                option.value = arr[j]["CarreraAsociada"];
                option.innerText = arr[j]["Nombre"];
                selector.appendChild(option);
            }
        },
        error: function(err) {
            console.log(err);
        }
    });
}

function add() {
    var d = document.getElementById('add');
    d.showModal();
}

function eliminarAcademia(id) {
    crear(id);
}

function modificarAcademia(id) {
    var b = document.getElementsByName(id);
    b[b.length - 1].setAttribute('class', 'button buttonEliminar guardar');
    b[b.length - 1].disabled = false;
}

function guardar(id) {
    var b = document.getElementsByName(id);
    b[b.length - 1].setAttribute('class', 'button buttonEliminar desac');
    b[b.length - 1].disabled = true;
}

function crear(name) {
    var d = document.createElement("DIALOG");
    d.setAttribute("ID", "d1");
    var txt = document.createElement("label");
    var yes = document.createElement("button");
    var not = document.createElement("button");
    var img = document.createElement("img");

    txt.setAttribute("style", "position: absolute; top: 20%")

    txt.innerHTML = '¿Seguro que desea eliminar la academia: ' + name + '?';
    yes.innerHTML = "&#161;Si&#33;";
    not.innerHTML = "&#161;No&#33;";

    img.src = "img/advertencia.jpg";
    img.setAttribute("width", "50px")
    img.setAttribute("height", "50px")
    d.appendChild(img);

    yes.setAttribute("id", "si");
    yes.setAttribute("style", "top: 50%;position: absolute;left: 80%; background-color: #08c211;");
    yes.setAttribute("class", "button");
    yes.addEventListener("click", function() {
        confirmar(d, txt, yes, not, img, name);
    }, false);

    not.setAttribute("id", "no");
    not.setAttribute("style", "top: 50%;position: absolute;left: 5%; background-color: #cc1010;");
    not.setAttribute("class", "button");
    not.addEventListener("click", function() {
        document.getElementById("d1").remove();
    }, false);

    d.appendChild(txt);
    d.appendChild(yes);
    d.appendChild(not);

    d.style.height = "150px";
    d.style.width = "350px";
    document.body.append(d);
    d.showModal();
}

function confirmar(d, txt, yes, not, img, name) {
    d.removeChild(yes);
    txt.innerHTML = "Ingrese su contrase&#241;a para continuar";
    var psw = document.createElement("input");
    psw.setAttribute("type", "password");
    psw.setAttribute("class", "contenidoBusqueda")
    psw.setAttribute("style", "top: 35%;position: absolute;left: 15%");
    d.appendChild(psw);
    not.innerHTML = "Cancelar";
    var cont = document.createElement("button");
    cont.setAttribute("style", "top: 50%;position: absolute;left: 80%; background-color: #08c211;");
    cont.setAttribute("class", "button");
    cont.style.left = "50%";
    cont.style.top = "60%";
    cont.innerHTML = "Eliminar";
    not.style.top = "60%";
    d.appendChild(cont);
    cont.addEventListener("click", function() {
        if (psw.value.length === 0) {
            error(d, txt, cont, img, psw, name);
        } else {
            var obj = {
                nom: id,
                clave: psw.value
            }
            crearLoad('rcornersEliminarAcademia');
            $.ajax({
                url: "php/validarClave.php",
                type: "GET",
                data: { obj: obj },
                dataType: "JSON",
                success: function(r) {
                    if (r["res"].length > 0) {
                        eliminado(d, txt, cont, img, psw, not);
                        recrear(1);
                    } else {
                        error(d, txt, cont, img, psw, name);
                    }
                    removerLoad();
                },
                error: function(err) {
                    console.log(err);
                }
            });
        }
    }, false);
}

function error(d, txt, cont, img, psw, name) {
    d.removeChild(psw);
    d.removeChild(cont);
    img.style.width = "100px";
    img.style.height = "100px";
    txt.innerHTML = "Contraseña incorrecta";
    txt.style.top = "30%";
    var cont = document.createElement("button");
    cont.setAttribute("style", "top: 50%;position: absolute;left: 80%; background-color: #08c211;");
    cont.setAttribute("class", "button");
    cont.innerHTML = "Reeintentar";
    cont.style.left = "50%";
    cont.style.top = "60%";
    d.appendChild(cont);
    cont.addEventListener("click", function() {
        d.remove();
        crear(name);
    })
}

function eliminado(d, txt, cont, img, psw, not) {
    d.removeChild(psw);
    d.removeChild(cont);
    d.removeChild(not);
    img.src = "img/sucess.png";
    img.style.width = "100px";
    img.style.height = "100px";
    txt.innerHTML = "Eliminado";
    txt.style.top = "30%";
    var cont = document.createElement("button");
    cont.setAttribute("style", "top: 50%;position: absolute;left: 80%; background-color: #08c211;");
    cont.setAttribute("class", "button");
    cont.innerHTML = "Cerrar";
    cont.style.left = "50%";
    cont.style.top = "60%";
    d.appendChild(cont);
    cont.addEventListener("click", function() {
        d.remove();
    })
}

function buscar() {
    recrear(0);
    var aux = [];
    var nombre = document.getElementById('BuscarXNombre').value;
    var encargado = document.getElementById('BuscarXEncargado').value;
    var baja = document.getElementById('xBaja').checked;
    aux = porNombre(nombre, datos, aux);
    aux = porEncargado(encargado, datos, aux);
    aux = porBaja(baja, datos, aux);
    if (nombre.length < 1 && encargado.length < 1 && !baja) {
        aux = datos;
    } else {
        aux = filtro(aux);
    }
    cargar(aux);
}

function filtro(obj) {
    var aux = [];
    for (var i = 0; i < obj.length; i++) {
        var f = true;
        for (var k = 0; k < aux.length && f; k++) {
            if (obj[i]['IDAcademia'] == (aux[k]['IDAcademia'])) {
                f = false;
            }
        }
        if (f)
            aux.push(obj[i]);
    }
    return aux;
}

function porNombre(nombre, datos, aux) {
    if (nombre.length > 0) {
        for (var i = 0; i < datos.length; i++) {
            if (datos[i]["Academia"].includes(nombre))
                aux.push(datos[i]);
        }
    }
    return aux;
}

function porEncargado(encargado, datos, aux) {
    if (encargado.length > 0) {
        for (var i = 0; i < datos.length; i++) {
            if (datos[i]["Nombre_s_"] != null) {
                if (datos[i]["Nombre_s_"].includes(encargado))
                    aux.push(datos[i]);
            }
        }
    }
    return aux;
}

function porBaja(baja, datos, aux) {
    if (baja) {
        for (var i = 0; i < datos.length; i++) {
            if (datos[i]["BajaAcademia"] != null)
                aux.push(datos[i]);
        }
    }
    return aux;
}

function recrear(op) {
    document.getElementById("tabla").remove();
    var page = document.getElementById("page");
    var t = document.createElement("table");
    var tbody = document.createElement('tbody');
    tbody.setAttribute('id', 'cuerpo');
    t.setAttribute("id", "tabla");
    t.setAttribute("cellspacing", "3");
    t.setAttribute("cellpadding", "3");
    t.setAttribute("class", "tablaElimiarAcademia");
    t.appendChild(tbody);
    page.appendChild(t);
    if (op == 1)
        cargarDatos();
}

function buscarEncargado(value) {
    var op = document.getElementById('nuevoEncargado').options;
    var f = true;
    for (var i = 1; i < op.length && f; i++) {
        if (op[i].value.includes(value)) {
            op[0].value = op[i].value;
            op[0].innerText = op[i].innerText;
            f = false;
        }
    }
    if (f) {
        op[0].value = 0;
        op[0].innerText = "No aplicable";
    }
}

function registrar() {
    crearLoad('rcornersEliminarAcademia');
    var obj = {
        Academia: document.getElementById('addAcademia').value,
        encargado: document.getElementById('nuevoEncargado').value,
        carrera: document.getElementById('nuevaCarrera').value
    };
    if (obj.Academia.length > 0) {
        $.ajax({
            url: "php/addAcademia.php",
            type: "GET",
            data: { obj: obj },
            success: function(r) {
                removerLoad();
                cerrar();
                var d = document.createElement("DIALOG");
                d.setAttribute("ID", "d1");
                var txt = document.createElement("label");
                var yes = document.createElement("button");
                var not = document.createElement("button");
                var img = document.createElement("img");

                txt.setAttribute("style", "position: absolute; top: 20%")
                txt.innerHTML = '¡Registro Exitoso!';
                yes.innerHTML = "Continuar";

                img.src = "img/sucess.png";
                img.style.width = "100px";
                img.style.height = "100px";
                d.appendChild(img);

                yes.setAttribute("style", "top: 50%;position: absolute;left: 70%; background-color: #08c211;");
                yes.setAttribute("class", "button");
                yes.addEventListener("click", function() {
                    document.getElementById("d1").remove();
                    add();
                }, false);

                not.setAttribute("style", "top: 50%;position: absolute;left: 5%; background-color: #cc1010;");
                not.setAttribute("class", "button");
                not.addEventListener("click", function() {
                    document.getElementById("d1").remove();
                }, false);

                d.appendChild(txt);
                d.appendChild(yes);
                d.appendChild(not);

                d.style.height = "150px";
                d.style.width = "350px";
                document.body.append(d);
                d.showModal();
            },
            error: function(err) {
                console.log(err);
            }
        });
    } else {
        removerLoad();
        cerrar();
        var d = document.createElement("DIALOG");
        d.setAttribute("ID", "d1");
        var txt = document.createElement("label");
        var yes = document.createElement("button");
        var not = document.createElement("button");
        var img = document.createElement("img");

        txt.setAttribute("style", "position: absolute; top: 20%")

        txt.innerHTML = 'Ingrese el nombre';
        yes.innerHTML = "Reintentar";
        not.innerHTML = "Cancelar";

        img.src = "img/advertencia.jpg";
        img.setAttribute("width", "50px")
        img.setAttribute("height", "50px")
        d.appendChild(img);

        yes.setAttribute("style", "top: 50%;position: absolute;left: 70%; background-color: #08c211;");
        yes.setAttribute("class", "button");
        yes.addEventListener("click", function() {
            document.getElementById("d1").remove();
            add();
        }, false);

        not.setAttribute("style", "top: 50%;position: absolute;left: 5%; background-color: #cc1010;");
        not.setAttribute("class", "button");
        not.addEventListener("click", function() {
            document.getElementById("d1").remove();
        }, false);

        d.appendChild(txt);
        d.appendChild(yes);
        d.appendChild(not);

        d.style.height = "150px";
        d.style.width = "350px";
        document.body.append(d);
        d.showModal();
    }
}

function cerrar() {
    document.getElementById('addAcademia').value = "";
    document.getElementById('buscarEncargado').value = "";
    var op = document.getElementById('nuevoEncargado').options;
    op[0].value = 0;
    op[0].innerText = "No aplicable";
    var op = document.getElementById('nuevaCarrera').options;
    op[0].value = 0;
    op[0].innerText = "No aplicable";
    document.getElementById('add').open = false;
}