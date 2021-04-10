var id;

function cargando() {
    crearLoad('rcorners1Menu');
    window.location.search.substr(1).split("&").forEach(item => {
        id = item.split("=")[1];
    })
    $.ajax({
        url: 'php/permisos.php',
        type: 'GET',
        data: { obj: id },
        dataType: 'JSON',
        success: function(r) {
            var arr = r["res"];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].includes("academias") || arr[i].includes("personal") || arr[i].includes("carrera")) {
                    hacerVisible('permisosAdmin', 1);
                    if (arr[i].includes("personal")) hacerVisible('personal', 1);
                    if (arr[i].includes("academias")) hacerVisible('academia', 0);
                    if (arr[i].includes("carrera")) hacerVisible('carrera', 0);
                }
                if (arr[i].includes("plan") || arr[i].includes("actas") || arr[i].includes("profesor") || arr[i].includes("presidente")) {
                    hacerVisible('permisosDoc', 1);
                    if (arr[i].includes("plan")) hacerVisible("plan", 1)
                    if (arr[i].includes("actas")) hacerVisible('acta', 1);
                    if (arr[i].includes("profesor")) hacerVisible('profesor', 1);
                    if (arr[i].includes("presidente")) hacerVisible('presidente', 1);
                }
            }
        },
        error: function(error) {
            console.log(error);
        }
    });
    removerLoad();
}

function hacerVisible(id, tipo) {
    if (tipo == 1) {
        var cont = document.getElementsByName(id);
        for (var i = 0; i < cont.length; i++) {
            cont[i].hidden = false;
        }
    } else {
        document.getElementById(id).hidden = false;
    }
}

function cambiar(ruta) {
    window.location.href = ruta + ".html?id=" + id;
}

function cerrarSesion() {
    window.location.href = "index.html";
}

function modificar(ant) {
    window.location.href = "modificar.html?id=" + id + "&mod=" + id + "&ant=" + ant;
}

function vis(ant) {
    window.location.href = "visualizar.html?id=" + id + "&vis=" + id + "&ant=" + ant;
}