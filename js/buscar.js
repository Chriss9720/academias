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
    //boton mod
    var del = document.createElement("input");
    del.setAttribute("class", "button button2Eliminar");
    del.type = "button";
    del.value = "Modificar";
    del.addEventListener("click", function() {
        cambiar('modificar')
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
        cambiar('visualizar')
    }, false);
    trD.appendChild(del);
    tabla.appendChild(trD);
    tdI.appendChild(tabla);
    tr1.appendChild(tdI);
    t.appendChild(tr1);
}