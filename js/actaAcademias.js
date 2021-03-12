function crearPDF() {
    var obj = {
        Academia: "ISC - Ingeniería en sistemas computacionales",
        Semestre: "Ene-Jun 2021",
        Presidente: "Anabel Gutiérrez Espinoza",
        f1: "11/03/21 10:45",
        f2: "12/03/21 10:00",
        f3: "15/03/21 22:45",
        f4: "28/03/21 22:45",
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