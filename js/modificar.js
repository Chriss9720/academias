var entradas = [];
var foto = "";

function cargarDatos() {
    document.getElementById('inputMatricula').disabled = true
    crearLoad('rcorners1');
    window.location.search.substr(1).split("&").forEach(item => {
        entradas.push(item.split("=")[1])
    });
    $.ajax({
        url: "php/getDatosUser.php",
        type: "GET",
        data: { obj: entradas[1] },
        dataType: "JSON",
        success: function(r) {
            arr = r["res"];
            document.getElementById('inputMatricula').value = arr[0]["NOMINA"];
            document.getElementById('inputNombre').value = arr[0]["NOMBRES"];
            document.getElementById('inputApeP').value = arr[0]["APP"];
            document.getElementById('inputApM').value = arr[0]["APM"];
            document.getElementById('inputCorreo').value = arr[0]["CORREO"];
            document.getElementById('inputCip').value = arr[0]["CIP"];
            document.getElementById('fotoPerfil').src = arr[0]["FOTO"];
            foto = arr[0]["FOTO"];
            if (arr[0]["ADMIN"] === 0) {
                var or = document.getElementById('carreraOriginal');
                or.innerText = arr[0]["CARRERA"];
                or.value = arr[0]["IDCarrera"];
                var academias = document.getElementById('academia');
                var puesto = document.getElementById('puessto');
                for (var i = 0; i < academias.options.length; i++) {
                    academias.options[i].remove();
                    puesto.options[i].remove();
                }
                var op = document.createElement('option');
                op.innerText = arr[0]["ACADEMIA"];
                op.value = arr[0]["IDACADEMIA"];
                academias.append(op);
                var op = document.createElement('option');
                op.innerText = arr[0]["PUESTO"];
                op.value = arr[0]["PUESTO"];
                puesto.append(op);
                cargarSelect();
                if (arr.length > 1) {
                    for (var i = 1; i < arr.length; i++) {
                        addAcademia(arr[i]["ACADEMIA"], arr[i]["IDACADEMIA"], arr[i]["PUESTO"]);
                    }
                }
            } else {
                var or = document.getElementsByName('trCarreraOriginal');
                or[0].remove();
                or[0].remove();
                var orAca = document.getElementsByName('trAcademiaPuesto');
                for (var i = (orAca.length - 1); i > 0; i--) {
                    orAca[0].remove();
                }
            }
            entradas.push(arr[0]["ADMIN"]);
        },
        error: function(err) {
            console.log("error: " + err);
        }
    });
    removerLoad();
}

function crear(logo, color, msj, nom = "") {
    var d = document.createElement("DIALOG");
    d.setAttribute("ID", "d1");
    var txt = document.createElement("label");
    var conf = document.createElement("button");
    var img = document.createElement("img");
    img.src = logo;
    img.style.width = "100px";
    img.style.height = "100px";
    txt.innerHTML = msj;
    txt.setAttribute("style", "top: 30%; position: absolute;");
    conf.setAttribute("style", "top: 50%;position: absolute;left: 80%; background-color:" + color + ";");
    conf.setAttribute("class", "button");
    conf.innerHTML = "Cerrar";
    conf.style.left = "50%";
    conf.style.top = "60%";
    conf.innerHTML = "Aceptar";
    conf.addEventListener('click', function() {
        document.getElementById("d1").remove();
        if (msj === "??Registro exitoso!") {
            if (entradas[0] === entradas[1])
                window.location = "modificar.html?id=" + nom + "&mod=" + nom + "&ant=" + entradas[2];
            else
                window.location = "modificar.html?id=" + entradas[0] + "&mod=" + nom + "&ant=" + entradas[2];
        }
    }, false);
    d.appendChild(img);
    d.appendChild(txt);
    d.appendChild(conf);
    d.style.height = "150px";
    d.style.width = "350px";
    document.body.append(d);
    d.showModal();
}

function mostrar() {
    var archivo = document.getElementById("file").files[0];
    var reader = new FileReader();
    if (file) {
        reader.readAsDataURL(archivo);
        reader.onloadend = function() {
            document.getElementById("fotoPerfil").src = reader.result;
        }
    }
}

var extraH = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var au = 0;

function realizarValidaciones(mat, nombre, app, apm, correo, cip) {
    if (mat.length > 0)
        validarMatricula(mat, 'errorMatricula', 'labelErrorerrorMatricula', 0);
    if (nombre.length > 0)
        contieneNumeros(nombre, 'errorNombre', 'labelErrorNombre', 0);
    if (app.length > 0)
        contieneNumeros(app, 'errorApellidoP', 'labelErrorApellidoP', 2);
    if (apm.length > 0)
        contieneNumeros(apm, 'errorApellidoM', 'labelErrorApellidoM', 3);
    if (correo.length > 0)
        validarCorreo(correo, 'errorCorreo', 'labelErrorCorreo');
    if (cip.length > 0)
        validarCIP(cip, 'errorCIP', 'labelErrorIP');
    ajustarSize('contenedor');
}

function contieneNumeros(palabra, id, label, pos) {
    var bol = !(palabra.length > 1);
    var carac = false;
    for (var i = 0; i < palabra.length && !bol; i++) {
        bol = ((palabra.charAt(i) >= '0' && palabra.charAt(i) <= '9'));
    }
    for (var i = 0; i < palabra.length && !carac; i++) {
        if (palabra.charAt(i) !== ' ' && palabra.charAt(i) !== '??' &&
            palabra.charAt(i) !== '??') {
            carac = ((palabra.charAt(i) < 'A' || palabra.charAt(i) > 'Z')) &&
                ((palabra.charAt(i) < 'a' || palabra.charAt(i) > 'z'));
        }
    }
    document.getElementById(id).hidden = !bol && !carac;
    if (palabra.length > 1)
        document.getElementById(label).innerHTML = "Por favor, <br/>introduzca solo letras";
    else
        document.getElementById(label).innerHTML = "Campo requerido";
    if (extraH[pos] === 0 && !(document.getElementById(id).hidden)) {
        extraH[pos] = document.getElementById(label).getBoundingClientRect().height;
    } else if (document.getElementById(id).hidden) {
        extraH[pos] = 0;
    }
    ajustarSize('contenedor');
}

function validarCorreo(correo, id, label) {
    var ext = "@itesca.edu.mx";
    var start = correo.length - ext.length;
    var ext0 = (correo.substring(start, (correo.length)));
    document.getElementById(id).hidden = (ext === ext0);
    document.getElementById(label).innerHTML = "Por favor ingrese un correo<br/> con extension: " + ext;
    if (extraH[4] === 0 && !(document.getElementById(id).hidden)) {
        extraH[4] = document.getElementById(label).getBoundingClientRect().height;
    } else if (document.getElementById(id).hidden) {
        extraH[4] = 0;
    }
    ajustarSize('contenedor');
}

function validarCIP(cip, id, label) {
    document.getElementById(id).hidden = !(cip.length !== 5);
    document.getElementById(label).innerHTML = "Min??mo 5";
    if (extraH[5] === 0 && !(document.getElementById(id).hidden)) {
        extraH[5] = document.getElementById(label).getBoundingClientRect().height;
    } else if (document.getElementById(id).hidden) {
        extraH[5] = 0;
    }
    ajustarSize('contenedor');
}

function validarSelect(select, id, label, pos) {
    document.getElementById(id).hidden = !(select === "0" || select.length === 0);
    document.getElementById(label).innerHTML = "Elija 1";
    if (extraH[pos] === 0 && !(document.getElementById(id).hidden)) {
        extraH[pos] = document.getElementById(label).getBoundingClientRect().height;
    } else if (document.getElementById(id).hidden) {
        extraH[pos] = 0;
    }
    ajustarSize('contenedor');
}

function ajustarSize(id) {
    var aumento = 0;
    for (var i = 0; i < extraH.length; i++) {
        aumento += extraH[i];
    }
    document.getElementById(id).style.height = 580 + aumento + (au * 25) + 50 + "px";
}

function validarMatricula(palabra, id, label) {
    var bol = true;
    for (var i = 0; i < palabra.length && bol; i++) {
        bol = ((palabra.charAt(i) >= '0' && palabra.charAt(i) <= '9'));
    }
    var msj = "";
    if (bol) {
        if (palabra.length !== 6) {
            bol = false;
            msj = "Por favor, <br/>introduzca 6 n??meros";
        }
    } else {
        msj = "Por favor, <br/>introduzca solo n??meros";
    }
    document.getElementById(id).hidden = bol;
    document.getElementById(label).innerHTML = msj;
    if (extraH[9] === 0 && !(document.getElementById(id).hidden)) {
        extraH[9] = document.getElementById(label).getBoundingClientRect().height;
    } else if (document.getElementById(id).hidden) {
        extraH[9] = 0;
    }
}

function mensajeErrorLogin(mensaje) {
    if (mensaje !== "null") {
        document.getElementById("errores").hidden = false;
        document.getElementById("labelerrores").innerHTML = mensaje;
    } else {
        document.getElementById("errores").hidden = true;
        document.getElementById("labelerrores").innerHTML = "";
    }
}

function regresar() {
    confirmar('??Seguro que desea salir?', 3);
}

function cancelarRegistro() {
    confirmar('??Seguro que desea cancelar el registro?', 2);
}

function vacio(id, num) {
    return value(id).length < num;
}

function value(id) {
    return document.getElementById(id).value;
}

function validarRegistro() {
    crearLoad('rcorners1');
    var datos = [];
    if (entradas[3] === 1) {
        datos.push(false);
        datos.push(false);
        datos.push(false);
    } else {
        datos.push(!document.getElementById("errorSelectCarrera").hidden);
        datos.push(!document.getElementById("labelErrorAcademia").hidden);
        datos.push(!document.getElementById("labelErrorPuesto").hidden);
    }
    if (!document.getElementById("errorMatricula").hidden || !document.getElementById("errorNombre").hidden ||
        !document.getElementById("errorApellidoP").hidden || !document.getElementById("errorApellidoM").hidden ||
        !document.getElementById("errorCorreo").hidden || !document.getElementById("errorCIP").hidden ||
        datos[0] || datos[1] || datos[2]) {
        crear("img/error.png", "#cc1010", "Rellene todos los campos");
    } else if (vacio("inputMatricula", 6) || vacio('inputNombre', 1) ||
        vacio('inputApeP', 1) || vacio('inputApM', 1) ||
        vacio('inputCorreo', 1) || vacio('inputCip', 5)) {
        validarMatricula(value('inputMatricula'), 'errorMatricula', 'labelErrorerrorMatricula', 0);
        contieneNumeros(value('inputNombre'), 'errorNombre', 'labelErrorNombre', 1);
        contieneNumeros(value('inputApeP'), 'errorApellidoP', 'labelErrorApellidoP', 2);
        contieneNumeros(value('inputApM'), 'errorApellidoM', 'labelErrorApellidoM', 3);
        validarCorreo(value('inputCorreo'), 'errorCorreo', 'labelErrorCorreo');
        validarCIP(value('inputCip'), 'errorCIP', 'labelErrorIP');
        if (!validarSeleccion()) {
            validarSelect(value('SelectCarrera'), 'errorSelectCarrera', 'labelErrorSelectCarrera', 6);
            validarSelect(value("academia"), 'labelErrorAcademia', 'labelErrorAcademia', 7);
            validarSelect(value('puessto'), 'labelErrorPuesto', 'labelErrorPuesto', 8);
        }
        crear("img/error.png", "#cc1010", "Rellene todos los campos 1");
    } else if (!validarSeleccion()) {
        validarSelect(value('SelectCarrera'), 'errorSelectCarrera', 'labelErrorSelectCarrera', 6);
        validarSelect(value("academia"), 'labelErrorAcademia', 'labelErrorAcademia', 7);
        validarSelect(value('puessto'), 'labelErrorPuesto', 'labelErrorPuesto', 8);
        crear("img/error.png", "#cc1010", "Rellene todos los campos 2");
    } else {
        var f = true;
        if (entradas[3] === 0) {
            var academias = [];
            academias.push(document.getElementById("academia").value);
            var aca = document.getElementsByName("academia");
            for (var i = 0; i < aca.length; i++) {
                academias.push(aca[i].value);
            }
            for (var i = 0; i < academias.length && f; i++) {
                for (var j = (i + 1); j < academias.length && f; j++) {
                    f = !(academias[i] === academias[j]);
                }
            }
        }
        if (f) {
            if (document.getElementById("fotoPerfil").src.toString().includes("img/perfilazul.png")) {
                confirmar('??Desea guardar sin foto?', 1);
            } else {
                guardar();
            }
        } else {
            crear("img/error.png", "#cc1010", "Academias duplicadas");
        }
    }
    removerLoad();
}

function validarSeleccion() {
    if (entradas[3] === 0) {
        if (value('SelectCarrera') === "0" || value('puessto') === 0)
            return false;
    }
    return true;
}

function cargarSelect() {
    crearLoad('rcorners1');
    $.ajax({
        url: "php/getCarreras.php",
        type: "POST",
        dataType: "json",
        success: function(r) {
            var c = document.getElementById("SelectCarrera");
            for (var i = 0; i < r.length; i++) {
                if (!r[i]["carrera"].includes(c.options[0].innerText)) {
                    var option = document.createElement("option");
                    option.value = r[i]["ID"];
                    option.innerText = r[i]["carrera"];
                    c.appendChild(option);
                }
            }
        },
        error: function(err) {
            console.log(err);
        }
    });
    var arr = ["Docente", "Secretario", "Presidente", "Coordinador"];
    var c = document.getElementById("puessto");
    for (var i = 0; i < arr.length; i++) {
        if (!c.options[0].innerText.includes(arr[i])) {
            var option = document.createElement("option");
            option.value = arr[i];
            option.innerText = arr[i];
            c.appendChild(option);
        }
    }
    $.ajax({
        url: "php/getAcademias.php",
        type: "POST",
        dataType: "json",
        success: function(r) {
            var c = document.getElementById("academia");
            for (var i = 0; i < r.length; i++) {
                if (!r[i]["Academia"].includes(c.options[0].innerText)) {
                    var option = document.createElement("option");
                    option.value = r[i]["ID"];
                    option.innerText = r[i]["Academia"];
                    c.appendChild(option);
                }
            }
        },
        error: function(err) {
            console.log(err);
        }
    });
    removerLoad();
}

function cargarPuestos(puesto) {
    var arr = ["Docente", "Secretario", "Presidente", "Coordinador"];
    var aca = document.getElementsByName("puesto");
    if (puesto != undefined) {
        var option = document.createElement("option");
        option.value = puesto;
        option.innerText = puesto;
        aca[0].appendChild(option);
    }
    for (var j = 0; j < aca.length; j++) {
        var c = aca[j];
        for (var i = 0; i < arr.length && c.options.length < arr.length + 1; i++) {
            if (puesto != undefined) {
                if (!aca[0].innerText.includes(arr[i])) {
                    var option = document.createElement("option");
                    option.value = arr[i];
                    option.innerText = arr[i];
                    c.appendChild(option);
                }
            } else {
                var option = document.createElement("option");
                option.value = arr[i];
                option.innerText = arr[i];
                c.appendChild(option);
            }
        }
    }
}

function cargarAcademias(academia, id, puesto) {
    $.ajax({
        url: "php/getAcademias.php",
        type: "POST",
        dataType: "json",
        success: function(r) {
            var aca = document.getElementsByName("academia");
            if (academia != undefined) {
                var option = document.createElement("option");
                option.value = id;
                option.innerText = academia;
                aca[0].appendChild(option);
            }
            for (var j = (au - 1); j < aca.length; j++) {
                var c = aca[j];
                for (var i = 0; i < r.length; i++) {
                    if (academia != undefined) {
                        if (!aca[0].innerText.includes(r[i]["Academia"])) {
                            var option = document.createElement("option");
                            option.value = r[i]["ID"];
                            option.innerText = r[i]["Academia"];
                            c.appendChild(option);
                        }
                    } else {
                        var option = document.createElement("option");
                        option.value = r[i]["ID"];
                        option.innerText = r[i]["Academia"];
                        c.appendChild(option);
                    }
                }
            }
        },
        error: function(err) {
            console.log(err);
        }
    });
    cargarPuestos(puesto);
}

function confirmar(msj, op) {
    var d = document.createElement("DIALOG");
    d.setAttribute("ID", "d1");
    var txt = document.createElement("label");
    var yes = document.createElement("button");
    var not = document.createElement("button");
    var img = document.createElement("img");
    img.src = "img/advertencia.png";
    img.style.width = "100px";
    img.style.height = "100px";
    d.appendChild(img);

    txt.setAttribute("style", "position: absolute; top: 30%")
    txt.innerHTML = msj;
    yes.innerHTML = "??Si!";
    not.innerHTML = "??No!";

    yes.setAttribute("id", "si");
    yes.setAttribute("style", "top: 70%;position: absolute;left: 80%; background-color: #08c211;");
    yes.setAttribute("class", "button");
    yes.addEventListener("click", function() {
        switch (op) {
            case 1:
                guardar();
                break;
            case 2:
                if (entradas[0] === entradas[1])
                    window.location = "modificar.html?id=" + nom + "&mod=" + nom + "&ant=" + entradas[2];
                else
                    window.location = "modificar.html?id=" + entradas[0] + "&mod=" + nom + "&ant=" + entradas[2];
                break;
            case 3:
                location.href = entradas[2] + ".html?id=" + entradas[0];
                break;
        }
    }, false);

    not.setAttribute("id", "no");
    not.setAttribute("style", "top: 70%;position: absolute;left: 5%; background-color: #cc1010;");
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

function guardar() {
    var files = document.getElementById("file").files[0];
    var academias = [];
    var puesto = [];
    var car = "";
    if (entradas[3] === 0) {
        academias.push(document.getElementById("academia").value);
        var aca = document.getElementsByName("academia");
        for (var i = 0; i < aca.length; i++) {
            academias.push(aca[i].value);
        }
        puesto.push(document.getElementById("puessto").value);
        var puestos = document.getElementsByName("puesto");
        for (var i = 0; i < puestos.length; i++) {
            puesto.push(puestos[i].value);
        }
        car = document.getElementById('SelectCarrera').value;
    }
    var obj = {
        met: entradas[3],
        nom: document.getElementById('inputMatricula').value,
        name: document.getElementById('inputNombre').value,
        app: document.getElementById('inputApeP').value,
        apm: document.getElementById('inputApM').value,
        corr: document.getElementById('inputCorreo').value,
        cip: document.getElementById('inputCip').value,
        carr: car,
        foto: foto,
        academias: academias,
        puestos: puesto
    };
    if (files != null) {
        var name = document.getElementById('inputMatricula').value + "." + files["name"].split(".")[files["name"].split(".").length - 1];
        var file = new File([], name);
        var formData = new FormData();
        formData.append('file', files);
        formData.append('name', file);
        $.ajax({
            url: 'img/subirImg.php',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function(response) {
                switch (response) {
                    case "ok":
                        foto = "img/" + file["name"];
                        obj.foto = foto;
                        break;
                    default:
                        crear("img/error.png", "#cc1010", "??Error al subir la imagen!<br/>" + response);
                }
                registro(obj);
            },
            error: function(error) {
                console.log(error);
                crear("img/error.png", "#cc1010", "??Error al subir la imagen!<br/>" + error);
                registro(obj);
            }
        });
    } else {
        registro(obj);
    }
}

function registro(obj) {
    $.ajax({
        url: 'php/setDatosUser.php',
        type: 'GET',
        data: { obj: obj },
        dataType: 'JSON',
        success: function(r) {
            if (r["res"] === 1)
                crear("img/sucess.png", "#08c211", "??Actualizac??n Exitosa!", obj.nom);
            else
                crear("img/error.png", "#cc1010", "??Error al modificar!<br/>La n??mina ya esta registrada");
        },
        error: function(err) {
            crear("img/error.png", "#cc1010", "??Error al modificar!<br/>" + err);
        }
    });
}

function addAcademia(academia, id, puesto) {
    var body = document.getElementById('tablacuerpo');
    var tr = document.createElement('tr');
    tr.setAttribute('name', 'extra')
    tr.setAttribute('class', 'centrar');
    var td = document.createElement('td');
    var select = document.createElement('select');
    select.setAttribute('name', 'academia');
    select.setAttribute('class', 'contenido')
    td.appendChild(select);
    tr.appendChild(td);
    var td = document.createElement('td');
    var select = document.createElement('select');
    select.setAttribute('name', 'puesto');
    select.setAttribute('class', 'contenido')
    td.appendChild(select);
    tr.appendChild(td);
    body.appendChild(tr);
    cargarAcademias(academia, id, puesto);
    ++au;
    ajustarSize('contenedor');
}

function remAcademia() {
    var aca = document.getElementsByName('extra');
    aca[aca.length - 1].remove();
    --au;
    ajustarSize('contenedor');
}