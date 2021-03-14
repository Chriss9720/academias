function crearPDF() {
    var fechas = document.getElementsByName("Reunion");
    var act1 = document.getElementsByName("act1");
    var act1C = document.getElementsByName("act1C");
    var act1L = document.getElementsByName("act1L");
    var personas = "";
    for (var i = 0; i < act1C.length; i++) {
        if (act1C[i].checked)
            personas += act1L[i].innerText + " ";
    }
    var obj1 = {
        Acciones: act1[0].value,
        Asignaturas: act1[1].value,
        Responsables: personas,
        Fecha: act1[2].value.replace("T", " "),
        Evidencia: act1[3].value
    };
    var obj = {
        Academia: document.getElementById("academia").value,
        Semestre: document.getElementById("semestre").value,
        Presidente: "Anabel Gutiérrez Espinoza",
        f1: fechas[0].value.replace("T", " "),
        f2: fechas[1].value.replace("T", " "),
        f3: fechas[2].value.replace("T", " "),
        f4: fechas[3].value.replace("T", " "),
        Act1: obj1
    };
    $.ajax({
        url: 'documentos/crear.php',
        type: 'GET',
        data: { obj: obj },
        dataType: 'JSON',
        success: function(r) {
            window.open(r['archivo']);
        },
        error: function(error) {
            console.log("erorr:");
            console.log(error['responseText']);
        }
    });
}