function crearPDF() {
    var fechas = document.getElementsByName("Reunion");
    var act1 = document.getElementsByName("act1");
    var act1C = document.getElementsByName("act1C");
    var obj1 = {
        Acciones: act1[0].value,
        Asignaturas: act1[1].value,
        Fecha: act1[2].value,
        Evidencia: act1[3].value
    };
    var obj = {
        Academia: document.getElementById("academia").value,
        Semestre: document.getElementById("semestre").value,
        Presidente: "Anabel Gutiérrez Espinoza",
        f1: fechas[0].value,
        f2: fechas[1].value,
        f3: fechas[2].value,
        f4: fechas[3].value,
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