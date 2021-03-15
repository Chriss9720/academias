function cargar() {
    crearLoad('rcornersEliminar');
    var obj = [{
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
    for (var i = 0; i < obj.length; i++) {
        construir(obj[i]);
    }
    removerLoad();
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
    tabla.setAttribute("class", "tdValorEliminar");
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
        inp.setAttribute("class", "tdValorEliminar");
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
    //boton borrar
    var del = document.createElement("input");
    del.setAttribute("class", "button button2Eliminar");
    del.type = "button";
    del.value = "Eliminar";
    del.addEventListener("click", function() {
        crear(obj['nomina']);
    }, false);
    trD.appendChild(del);
    tabla.appendChild(trD);
    tdI.appendChild(tabla);
    tr1.appendChild(tdI);
    t.appendChild(tr1);
}

function crear(name) {
    var d = document.createElement("DIALOG");
    d.setAttribute("ID", "d1");
    var txt = document.createElement("label");
    var yes = document.createElement("button");
    var not = document.createElement("button");
    var img = document.createElement("img");

    txt.setAttribute("style", "position: absolute; top: 20%")

    txt.innerHTML = '¿Seguro que desea eliminar al usuario: ' + name + '?';
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
    cont.innerHTML = "Eliminar";
    cont.style.left = "50%";
    cont.style.top = "60%";
    not.style.top = "60%";
    d.appendChild(cont);
    cont.addEventListener("click", function() {
        if (psw.value.length === 0) {
            error(d, txt, cont, img, psw, name);
        } else {
            crearLoad('rcornersEliminar');
            document.getElementById("tabla").remove();
            var page = document.getElementById("page");
            var t = document.createElement("table");
            t.setAttribute("id", "tabla");
            t.setAttribute("cellspacing", "3");
            t.setAttribute("cellpadding", "3");
            t.setAttribute("class", "tablaElimiar");
            page.appendChild(t);
            var obj = [{
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
            var nuevo = [];
            for (var i = 0; i < obj.length; i++) {
                console.log(obj[i]['nomina'] + " vs " + name);
                if (obj[i]['nomina'] !== name) {
                    nuevo.push(obj[i])
                }
            }
            console.log(nuevo);
            for (var i = 0; i < nuevo.length; i++) {
                construir(nuevo[i]);
            }
            removerLoad();
            eliminado(d, txt, cont, img, psw, not);
        }
    }, false);
}

function error(d, txt, cont, img, psw, name) {
    d.removeChild(psw);
    d.removeChild(cont);
    img.style.width = "100px";
    img.style.height = "100px";
    txt.innerHTML = "Contrase&#241;a incorrecta";
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