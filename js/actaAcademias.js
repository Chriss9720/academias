function crearPDF() {
    var fechas = document.getElementsByName("Reunion");
    var obj = {
        Academia: document.getElementById("academia").value,
        Semestre: document.getElementById("semestre").value,
        Presidente: "Anabel Gutiérrez Espinoza",
        f1: fechas[0].value,
        f2: fechas[1].value,
        f3: fechas[2].value,
        f4: fechas[3].value
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