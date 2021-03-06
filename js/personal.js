var obj = [];
var id;

function cambiar(ruta) {
    window.location.href = ruta + ".html?id=" + id;
}

function modificar(ant, idmod) {
    window.location.href = "modificar.html?id=" + id + "&mod=" + idmod + "&ant=" + ant;
}

function cargarDatos() {
    crearLoad('rcornersEliminar');
    obj = [];
    window.location.search.substr(1).split("&").forEach(item => {
        id = item.split("=")[1];
    });
    $.ajax({
        url: "php/getAllUser.php",
        type: 'POST',
        data: { obj: id },
        dataType: 'json',
        success: function(r) {
            obj.push({
                nom: r[0]["NOMINA"],
                nombres: r[0]["NOMBRES"],
                carrera: {
                    carr: r[0]["CARRERA"],
                    idcarr: r[0]["IDCarrera"]
                },
                academia: {
                    nombre: r[0]["ACADEMIA"],
                    id: r[0]["IDACADEMIA"],
                    puesto: r[0]["PUESTO"],
                    permiso: [{
                        nombre: r[0]["NombrePermiso"],
                        idP: r[0]["IDPer"]
                    }]
                },
                foto: r[0]["FOTO"],
                baja: r[0]["Baja"]
            });
            for (let i = 1; i < r.length; i++) {
                let e = existe(r[i]["NOMINA"], r[i]["IDACADEMIA"]);
                if (e > -1) {
                    obj[e].academia.permiso.push({
                        nombre: r[i]["NombrePermiso"],
                        idP: r[i]["IDPer"]
                    });
                } else {
                    obj.push({
                        nom: r[i]["NOMINA"],
                        nombres: r[i]["NOMBRES"],
                        carrera: {
                            carr: r[i]["CARRERA"],
                            idcarr: r[i]["IDCarrera"]
                        },
                        academia: {
                            nombre: r[i]["ACADEMIA"],
                            id: r[i]["IDACADEMIA"],
                            puesto: r[i]["PUESTO"],
                            permiso: [{
                                nombre: r[i]["NombrePermiso"],
                                idP: r[i]["IDPer"]
                            }]
                        },
                        foto: r[i]["FOTO"],
                        baja: r[i]["Baja"]
                    });
                }
            }
            cargar(obj);
        },
        error: function(err) {
            console.log(err);
        }
    });
    cargarCarreras();
    cargarAcademias();
    removerLoad();
}

function existe(nom, aca) {
    let r = -1;
    for (let i = 0; i < obj.length && r == -1; i++) {
        if (obj[i].nom == nom && obj[i].academia.id == aca)
            r = i;
    }
    return r;
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
                option.value = r[i]["ID"];
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
                option.value = r[i]["ID"];
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
    var key = ["N??mina:", "Nombre(s):", "Carrera:", "Puesto:", "Academia:", "Baja"];
    var value = [obj["nom"], obj["nombres"], obj["carrera"].carr, obj["academia"]["puesto"], obj["academia"]["nombre"], obj["baja"]];
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
        if (key[i].includes("Baja")) {
            inp.type = "checkbox";
            if (value[i] == 1)
                inp.checked = true;
        } else {
            inp.value = value[i];
        }
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
    var permisos = obj["academia"].permiso;
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
        inpPermisos.setAttribute('name', 'c' + obj['nom']);
        inpPermisos.setAttribute('value', i + 1);
        for (var j = 0; j < permisos.length; j++) {
            if ((i + 1) === permisos[j].idP)
                inpPermisos.checked = true;
        }

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
    var permisosGen = ['Actas (crear y modificar)', 'Evaluar Profesor (crear y modificar)', 'Evaluar Presidente(crear y modificar)'];
    for (var i = 0; i < permisosGen.length; i++) {
        var trPermisos = document.createElement('tr');
        var tdPermisos = document.createElement('td');
        var inpPermisos = document.createElement('input');
        inpPermisos.setAttribute('type', 'checkbox');
        inpPermisos.setAttribute('name', 'c' + obj['nom']);
        inpPermisos.setAttribute('value', i + 5);
        for (var j = 0; j < permisos.length; j++) {
            if ((i + 5) === permisos[j].idP)
                inpPermisos.checked = true;
        }

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
    AplicarPermisos.addEventListener('click', () => {
        crear(obj['nom'], 0, undefined, undefined, value[3], obj["academia"]["id"]);
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
    Mod.setAttribute('class', 'button button2Eliminar colorMod');
    Mod.addEventListener('click', () => {
        modificar('personal', obj["nom"]);
    }, false)
    Mod.type = 'button';
    Mod.value = 'Modificar';
    var Vis = document.createElement('input')
    Vis.setAttribute('class', 'button button2Eliminar colorVis');
    Vis.addEventListener('click', () => {
        visualizar('personal', obj["nom"]);
    }, false)
    Vis.type = 'button';
    Vis.value = 'Visualizar';
    var Del = document.createElement('input')
    Del.setAttribute('class', 'button button2Eliminar');
    Del.type = 'button';
    if (obj["baja"] == 0)
        Del.value = 'Dar de baja';
    else
        Del.value = 'Dar de alta';
    Del.addEventListener('click', () => {
        crear(obj['nom'], 1, obj["baja"], obj["academia"]["id"]);
    }, false)
    td22.appendChild(Del);
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

function crear(name, tipo, baja = undefined, idAcademia = undefined, puesto, academia) {
    var d = document.createElement("DIALOG");
    d.setAttribute("ID", "d1");
    var txt = document.createElement("label");
    var yes = document.createElement("button");
    var not = document.createElement("button");
    var img = document.createElement("img");

    txt.setAttribute("style", "position: absolute; top: 20%")

    if (tipo == 1) {
        if (baja == 0)
            txt.innerHTML = '??Seguro que desea eliminar al usuario: ' + name + '?';
        else
            txt.innerHTML = '??Seguro que desea reactivar al usuario: ' + name + '?';
    } else
        txt.innerHTML = '??Seguro que desea aplicar los nuevos permisos a: ' + name + '?';
    yes.innerHTML = "Si";
    not.innerHTML = "No";

    img.src = "img/advertencia.png";
    img.setAttribute("width", "50px")
    img.setAttribute("height", "50px")
    d.appendChild(img);

    yes.setAttribute("id", "si");
    yes.setAttribute("style", "top: 50%;position: absolute;left: 80%; background-color: #08c211;");
    yes.setAttribute("class", "button");
    yes.addEventListener("click", () => {
        confirmar(d, txt, yes, not, img, name, tipo, baja, idAcademia, puesto, academia);
    }, false);

    not.setAttribute("id", "no");
    not.setAttribute("style", "top: 50%;position: absolute;left: 5%; background-color: #cc1010;");
    not.setAttribute("class", "button");
    not.addEventListener("click", () => {
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

async function confirmar(d, txt, yes, not, img, name, tipo, baja = undefined, idAcademia = undefined, puesto, academia) {
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
    if (tipo == 1) {
        if (baja == 0)
            cont.innerHTML = "Eliminar";
        else
            cont.innerHTML = "Activar";
    } else
        cont.innerHTML = "Actualizar";
    cont.style.left = "50%";
    cont.style.top = "60%";
    not.style.top = "60%";
    d.appendChild(cont);
    cont.addEventListener("click", async() => {
        if (psw.value.length === 0) {
            error(d, txt, cont, img, psw, name);
        } else {
            crearLoad('rcornersEliminar');
            var check = document.getElementsByName('c' + name);
            var permisos = [];
            for (var i = 0; i < check.length; i++) {
                if (check[i].checked)
                    permisos.push(check[i].value);
            }
            var obj = {
                nom: id,
                clave: psw.value
            }
            await $.ajax({
                url: "php/validarClave.php",
                type: "GET",
                data: { obj: obj },
                dataType: "JSON",
                success: async(r) => {
                    if (r["res"].length > 0) {
                        if (tipo == 0) {
                            obj = {
                                puesto: puesto,
                                nomina: name,
                                permisos: permisos,
                                academia: academia
                            };
                            await $.ajax({
                                url: "php/actualizarPermisos.php",
                                type: "GET",
                                data: { obj: obj },
                                success: function(r) {
                                    eliminado(d, txt, cont, img, psw, not, tipo);
                                },
                                error: function(err) {
                                    console.log(err);
                                }
                            });
                        } else {
                            let obj = { name: name, aca: idAcademia };
                            if (baja == 0) {
                                await $.ajax({
                                    url: "php/rmUser.php",
                                    type: "GET",
                                    data: { obj: obj },
                                    success: function(r) {
                                        eliminado(d, txt, cont, img, psw, not, tipo, baja);
                                        recrear(1);
                                    },
                                    error: function(err) {
                                        console.log(err);
                                    }
                                });
                            } else {
                                $.ajax({
                                    url: "php/activar.php",
                                    type: "GET",
                                    data: { obj: obj },
                                    success: function(r) {
                                        eliminado(d, txt, cont, img, psw, not, tipo, baja);
                                        recrear(1);
                                    },
                                    error: function(e) {
                                        console.log(e);
                                    }
                                })
                            }
                        }
                    } else {
                        error(d, txt, cont, img, psw, name, tipo, baja, idAcademia);
                    }
                    removerLoad();
                },
                error: (err) => {
                    console.log(err);
                }
            });
        }
    }, false);
}

function error(d, txt, cont, img, psw, name, tipo, baja = undefined, idAcademia = undefined) {
    d.removeChild(psw);
    d.removeChild(cont);
    img.style.width = "100px";
    img.style.height = "100px";
    txt.innerHTML = "Contrase??a incorrecta";
    txt.style.top = "30%";
    var cont = document.createElement("button");
    cont.setAttribute("style", "top: 50%;position: absolute;left: 80%; background-color: #08c211;");
    cont.setAttribute("class", "button");
    cont.innerHTML = "Reeintentar";
    cont.style.left = "50%";
    cont.style.top = "60%";
    d.appendChild(cont);
    cont.addEventListener("click", () => {
        d.remove();
        crear(name, tipo, baja, idAcademia);
    })
}

function eliminado(d, txt, cont, img, psw, not, tipo, baja = undefined) {
    d.removeChild(psw);
    d.removeChild(cont);
    d.removeChild(not);
    img.src = "img/sucess.png";
    img.style.width = "100px";
    img.style.height = "100px";
    if (tipo == 0) {
        txt.innerHTML = "Actualizado";
    } else {
        if (baja == 0)
            txt.innerHTML = "Baja exitosa";
        else
            txt.innerHTML = "Activado exitoso";
    }
    txt.style.top = "30%";
    var cont = document.createElement("button");
    cont.setAttribute("style", "top: 50%;position: absolute;left: 80%; background-color: #08c211;");
    cont.setAttribute("class", "button");
    cont.innerHTML = "Cerrar";
    cont.style.left = "50%";
    cont.style.top = "60%";
    d.appendChild(cont);
    cont.addEventListener("click", () => {
        d.remove();
    })
}

function buscar() {
    recrear(0);
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
            if (obj[i]['nom'] == (aux[k]['nom']) && obj[i].academia.id == (aux[k].academia.id)) {
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
            if (obj[i].nom.includes(valor)) {
                aux.push(obj[i]);
            }
        }
    }
    return aux;
}

function porCarrera(valor, obj, aux) {
    if (valor.length > 0) {
        for (var i = 0; i < obj.length; i++) {
            if (obj[i].carrera.idcarr == valor) {
                aux.push(obj[i]);
            }
        }
    }
    return aux;
}

function porAcademia(valor, obj, aux) {
    if (valor.length > 0) {
        for (var i = 0; i < obj.length; i++) {
            if (obj[i].academia.id == valor) {
                aux.push(obj[i]);
            }
        }
    }
    return aux;
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

function limpiar() {
    cambiar('eliminar');
}

function visualizar(ant, idvis) {
    window.location.href = "visualizar.html?id=" + id + "&vis=" + idvis + "&ant=" + ant;
}