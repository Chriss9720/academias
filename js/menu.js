var id;

async function cargando() {
    crearLoad('rcorners1');
    window.location.search.substr(1).split("&").forEach(item => {
        id = item.split("=")[1];
    })
    await $.ajax({
        url: 'php/permisos.php',
        type: 'GET',
        data: { obj: id },
        dataType: 'JSON',
        success: function(r) {
            let flag = true;
            var arr = r["res"];
            for (var i = 0; i < arr.length && flag; i++) {
                if (arr[i]["2"] === 1) {
                    hacerVisible('permisosAdmin', 1);
                    hacerVisible('personal', 1);
                    hacerVisible('academia', 0);
                    hacerVisible('carrera', 0);
                    hacerVisible('permisosDoc', 1);
                    hacerVisible("plan", 1)
                    hacerVisible('acta', 1);
                    hacerVisible('profesor', 1);
                    hacerVisible('presidente', 1);
                    flag = false;
                } else if (arr[i]["1"] != null) {
                    if (arr[i]["1"].includes("academias") || arr[i]["1"].includes("personal") || arr[i]["1"].includes("carrera")) {
                        hacerVisible('permisosAdmin', 1);
                        if (arr[i].includes("personal")) hacerVisible('personal', 1);
                        if (arr[i].includes("academias")) hacerVisible('academia', 0);
                        if (arr[i].includes("carrera")) hacerVisible('carrera', 0);
                    }
                    if (arr[i]["1"].includes("plan") || arr[i]["1"].includes("actas") || arr[i]["1"].includes("profesor") || arr[i]["1"].includes("presidente")) {
                        hacerVisible('permisosDoc', 1);
                        if (arr[i].includes("plan")) hacerVisible("plan", 1)
                        if (arr[i].includes("actas")) hacerVisible('acta', 1);
                        if (arr[i].includes("profesor")) hacerVisible('profesor', 1);
                        if (arr[i].includes("presidente")) hacerVisible('presidente', 1);
                    }
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