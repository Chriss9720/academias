var datos = [];
var id;

function buscarEncargadoCarrera(value) {
    var op = document.getElementById('addEncargado').options;
    var f = true;
    for (var i = 1; i < op.length && f; i++) {
        if (op[i].value.includes(value) && value.length > 0) {
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

function add() {
    cerrar();
    var d = document.getElementById('add');
    d.showModal();
}

async function cargarDatos(op) {
    crearLoad('rcornersEliminarCarrera');
    window.location.search.substr(1).split("&").forEach(item => {
        id = item.split("=")[1];
    });
    datos = [];
    await $.ajax({
        url: "php/getInfoCarreras.php",
        type: "GET",
        dataType: "json",
        success: function(r) {
            for (var i = 0; i < r.length; i++) {
                datos.push(r[i]);
            }
            cargar(datos);
            removerLoad();
        },
        error: function(err) {
            console.log(err);
            removerLoad();
        }
    });
    if (op == 0) {
        await $.ajax({
            url: "php/paraAcademia.php",
            dataType: "JSON",
            success: function(r) {
                var c = document.getElementById("addEncargado");
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
    }
}

function cargar(obj) {
    for (var i = 0; i < obj.length; i++) {
        construir(obj[i]);
    }
}

function construir(data) {
    var tabla = document.getElementById('cuerpo');
    var tr = document.createElement('tr');
    tr.setAttribute('class', 'trContentElimiarCarrera');
    var td = document.createElement('td');
    td.setAttribute('class', 'tdContenidoEliminarCarrera')
    var tabla2 = document.createElement('table');
    var body = document.createElement('tbody');
    var tr2 = document.createElement('tr');
    var td2 = document.createElement('td');
    var tabla3 = document.createElement('table');
    tabla3.setAttribute('class', 'cuerpoEliminarCarrera');
    tabla3.setAttribute('cellspacing', '3');
    tabla3.setAttribute('cellpadding', '3');
    var tbody3 = document.createElement('tbody');
    var key = ["ID de la Carrera:", "Nombre de la Carrera:", "Clave de la Carrera:"];
    var value = [data["IDCarrera"], data["Carrera"], data["Clave"]];
    for (var i = 0; i < key.length; i++) {
        var tr31 = document.createElement('tr');
        var td31 = document.createElement('td');
        var label = document.createElement('label');
        label.setAttribute('class', 'contenidoEliminarCarrera');
        label.innerText = key[i];
        td31.appendChild(label);
        var td32 = document.createElement('td');
        var input = document.createElement('input');
        input.disabled = true;
        input.value = value[i];
        input.setAttribute('name', value[0])
        td32.appendChild(input);
        tr31.appendChild(td31);
        tr31.appendChild(td32);
        tbody3.appendChild(tr31);
        tabla3.appendChild(tbody3);
    }
    var tr31 = document.createElement('tr');
    var td31 = document.createElement('td');
    var label = document.createElement('label');
    label.setAttribute('class', 'contenidoEliminarCarrera');
    label.innerText = "Encargado(a) de la Carrera:";
    td31.appendChild(label);
    var td32 = document.createElement('td');
    var select = document.createElement('select');
    select.setAttribute('class', 'contenidoBusquedaEncargado')
    select.setAttribute('name', 'SeleccionEncargados');
    var op = document.createElement('option');
    if (data["jefe"] != null) {
        op.value = data["Nomina"];
        op.innerText = data["Nombre"];
    } else {
        op.value = -1;
        op.innerText = "No especificado";
    }
    select.appendChild(op);
    select.disabled = true;
    td32.appendChild(select);
    tr31.appendChild(td31);
    tr31.appendChild(td32);
    tbody3.appendChild(tr31);
    tabla3.appendChild(tbody3);

    var tr31 = document.createElement('tr');
    var td31 = document.createElement('td');
    var label = document.createElement('label');
    label.setAttribute('class', 'contenidoEliminarCarrera');
    label.innerText = "Baja:";
    td31.appendChild(label);
    var td32 = document.createElement('td');
    var baja = document.createElement('input');
    baja.disabled = true;
    baja.type = 'checkbox';
    baja.checked = (data["baja"] == 1);
    td32.appendChild(baja);
    tr31.appendChild(td31);
    tr31.appendChild(td32);
    tbody3.appendChild(tr31);
    tabla3.appendChild(tbody3);

    var tr3 = document.createElement('tr');
    var td3 = document.createElement('td');
    var inp1 = document.createElement('input');
    inp1.type = "Button";
    if (data["baja"] == 0) {
        inp1.setAttribute('class', 'button buttonEliminar');
        inp1.value = "Dar de baja";
    } else {
        inp1.setAttribute('class', 'button buttonEliminar alta');
        inp1.value = "Dar de alta";
    }
    inp1.addEventListener('click', function() {
        crear(data["IDCarrera"], data["baja"]);
    }, false);
    var inp2 = document.createElement('input');
    inp2.setAttribute('class', 'button buttonEliminar mod');
    inp2.type = "Button";
    inp2.value = "Modificar";
    var inp3 = document.createElement('input');
    inp3.setAttribute('class', 'button buttonEliminar desac');
    inp3.type = "Button";
    inp3.value = "Guardar";
    td3.appendChild(inp1);
    td3.appendChild(inp2);
    td3.appendChild(inp3);
    tr3.appendChild(td3);
    td2.appendChild(tabla3);
    tr2.appendChild(td2);
    body.appendChild(tr2);
    body.appendChild(tr3);
    tabla2.appendChild(body);
    td.appendChild(tabla2);
    tr.appendChild(td);
    tabla.appendChild(tr);
}

function crear(name, baja = undefined) {
    var d = document.createElement("DIALOG");
    d.setAttribute("ID", "d1");
    var txt = document.createElement("label");
    var yes = document.createElement("button");
    var not = document.createElement("button");
    var img = document.createElement("img");

    txt.setAttribute("style", "position: absolute; top: 20%")
    if (baja == 0)
        txt.innerHTML = '¿Seguro que desea dar de baja la carrera: ' + name + '?';
    else
        txt.innerHTML = '¿Seguro que desea reactivar la carrera: ' + name + '?';
    yes.innerHTML = "Si";
    not.innerHTML = "No";

    img.src = "img/advertencia.jpg";
    img.setAttribute("width", "50px")
    img.setAttribute("height", "50px")
    d.appendChild(img);

    yes.setAttribute("id", "si");
    yes.setAttribute("style", "top: 50%;position: absolute;left: 80%; background-color: #08c211;");
    yes.setAttribute("class", "button");
    yes.addEventListener("click", function() {
        confirmar(d, txt, yes, not, img, name, baja);
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

async function confirmar(d, txt, yes, not, img, name, baja = undefined) {
    d.removeChild(yes);
    txt.innerHTML = "Ingrese su contraseña para continuar";
    var psw = document.createElement("input");
    psw.setAttribute("type", "password");
    psw.setAttribute("class", "contenido")
    psw.setAttribute("style", "top: 35%;position: absolute;left: 15%");
    d.appendChild(psw);
    not.innerHTML = "Cancelar";
    var cont = document.createElement("button");
    cont.setAttribute("style", "top: 50%;position: absolute;left: 80%; background-color: #08c211;");
    cont.setAttribute("class", "button");
    cont.innerHTML = "Eliminar";
    cont.style.left = "50%";
    cont.style.top = "60%";
    not.style.top = "60%";
    d.appendChild(cont);
    cont.addEventListener("click", function() {
        accionDelBoton(psw, d, txt, cont, img, name, baja, not);
    }, false);
}

async function accionDelBoton(psw, d, txt, cont, img, name, baja, not) {
    if (psw.value.length === 0) {
        error(d, txt, cont, img, psw, name);
    } else {
        crearLoad('rcornersEliminarCarrera');
        var obj = {
            nom: id,
            clave: psw.value
        }
        $.ajax({
            url: "php/validarClave.php",
            type: "GET",
            data: { obj: obj },
            dataType: "JSON",
            success: function(r) {
                if (r["res"].length > 0) {
                    if (baja == 0) {
                        $.ajax({
                            url: "php/bajaCarrera.php",
                            type: "GET",
                            data: { obj: name },
                            success: function() {
                                recrear(1);
                                eliminado(d, txt, cont, img, psw, not, baja);
                            },
                            error: function() {
                                console.log("error: ");
                            }
                        });
                    } else {
                        $.ajax({
                            url: "php/reactivarCarrera.php",
                            type: "GET",
                            data: { obj: name },
                            success: function() {
                                recrear(1);
                                eliminado(d, txt, cont, img, psw, not, baja);
                            },
                            error: function() {
                                console.log("error: ");
                            }
                        });
                    }
                } else {
                    error(d, txt, cont, img, psw, name, baja);
                }
                removerLoad();
            },
            error: function(err) {
                console.log(err);
            }
        });
    }
}


function error(d, txt, cont, img, psw, name, baja = undefined) {
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
        crear(name, baja);
    })
}

function eliminado(d, txt, cont, img, psw, not, baja = undefined) {
    d.removeChild(psw);
    d.removeChild(cont);
    d.removeChild(not);
    img.src = "img/sucess.png";
    img.style.width = "100px";
    img.style.height = "100px";
    if (baja == 0)
        txt.innerHTML = "Baja exitosa";
    else
        txt.innerHTML = "Activado exitoso";
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

function cerrar() {
    document.getElementById('nombreCarrera').value = "";
    document.getElementById('claveCarrera').value = "";
    document.getElementById('buscarEncargado').value = "";
    var op = document.getElementById('addEncargado').options;
    op[0].value = 0;
    op[0].innerText = "No aplicable";
    document.getElementById('add').open = false;
}

function recrear(op) {
    document.getElementById("table").remove();
    var page = document.getElementById("page");
    var t = document.createElement("table");
    var tbody = document.createElement('tbody');
    tbody.setAttribute('id', 'cuerpo');
    t.setAttribute("id", "table");
    t.setAttribute("cellspacing", "3");
    t.setAttribute("cellpadding", "3");
    t.setAttribute("class", "tablaElimiarCarrera");
    t.appendChild(tbody);
    page.appendChild(t);
    if (op == 1)
        cargarDatos(1);
}

async function addCarrera() {
    crearLoad('rcornersEliminarCarrera');
    let datosCarrera = {
        nombre: document.getElementById('nombreCarrera').value,
        clave: document.getElementById('claveCarrera').value,
        encargado: document.getElementById('addEncargado').value
    };
    if (datosCarrera.nombre.length > 0 && datosCarrera.clave.length > 0) {
        await $.ajax({
            url: "php/addCarrera.php",
            type: "GET",
            data: { obj: datosCarrera },
            success: function() {
                cerrar();
                exito(1);
                recrear(1);
                removerLoad();
            },
            error: function() {
                removerLoad();
            }
        });
    } else {
        removerLoad();
        cerrar();
        errorB(1);
    }
}

function errorB(tipo) {
    var d = document.createElement("DIALOG");
    d.setAttribute("ID", "d1");
    var txt = document.createElement("label");
    var yes = document.createElement("button");
    var not = document.createElement("button");
    var img = document.createElement("img");

    txt.setAttribute("style", "position: absolute; top: 20%")

    if (tipo == 1)
        txt.innerHTML = 'Ingrese el nombre y su clave';
    else
        txt.innerHTML = 'Ocurrio un error inesperado';
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
        cerrar();
        add();
    }, false);
    if (tipo == 1) {
        not.setAttribute("style", "top: 50%;position: absolute;left: 5%; background-color: #cc1010;");
        not.setAttribute("class", "button");
        not.addEventListener("click", function() {
            document.getElementById("d1").remove();
        }, false);
    }

    d.appendChild(txt);
    d.appendChild(yes);
    if (tipo == 1)
        d.appendChild(not);

    d.style.height = "150px";
    d.style.width = "350px";
    document.body.append(d);
    d.showModal();
}

function exito(tipo) {
    var d = document.createElement("DIALOG");
    d.setAttribute("ID", "d1");
    var txt = document.createElement("label");
    var yes = document.createElement("button");
    var img = document.createElement("img");

    txt.setAttribute("style", "position: absolute; top: 20%")
    if (tipo == 1)
        txt.innerHTML = '¡Registro Exitoso!';
    else
        txt.innerHTML = '¡Actualización Exitosa!';
    yes.innerHTML = "Continuar";

    img.src = "img/sucess.png";
    img.style.width = "100px";
    img.style.height = "100px";
    d.appendChild(img);

    yes.setAttribute("style", "top: 50%;position: absolute;left: 70%; background-color: #08c211;");
    yes.setAttribute("class", "button");
    yes.addEventListener("click", function() {
        document.getElementById("d1").remove();
        if (tipo == 1) {
            add();
            cerrar();
        }
    }, false);

    d.appendChild(txt);
    d.appendChild(yes);

    d.style.height = "150px";
    d.style.width = "350px";
    document.body.append(d);
    d.showModal();
}

function buscar() {
    recrear(0);
    var aux = [];
    let nombre = document.getElementById('BuscarNombre').value;
    let clave = document.getElementById('BuscarClave').value;
    let enc = document.getElementById('BuscarEncargado').value;
    aux = porNombre(nombre, datos, aux);
    if (nombre.length < 1 && clave.length < 1 && enc.length < 1) {
        aux = datos;
    } else {
        aux = filtro(aux);
    }
    cargar(aux);
}

function filtro(data) {
    var aux = [];
    for (let i = 0; i < data.length; i++) {
        var f = true;
        for (let k = 0; k < aux.length && f; k++) {
            if (data[i]["IDCarrera"] == (aux[k]["IDCarrera"])) {
                f = false;
            }
        }
        if (f)
            aux.push(data[i]);
    }
    return aux;
}

function porNombre(valor, datos, aux) {
    if (valor.length > 0) {

    }
    return aux;
}