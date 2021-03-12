$(document).ready(function() {
    $(".subirImg").on('click', function() {
        crearLoad();
        var formData = new FormData();
        var files = $('#file')[0].files[0];
        formData.append('file', files);
        $.ajax({
            url: 'img/subirImg.php',
            type: 'post',
            data: formData,
            contentType: false,
            processData: false,
            success: function(response) {
                removerLoad();
                if (response != 0) {
                    alert("Imagen subida exitosamente!!!");
                } else {
                    alert("Error al subier la imagen");
                }
            },
            error: function(error) {
                alert(error);
            }
        });
    });
});

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

function crearLoad() {
    var div = document.createElement("DIV");
    div.setAttribute("class", "loading show rcorners1");
    div.setAttribute("id", "divLoad")
    var s = document.createElement("DIV");
    s.setAttribute("class", "spin");
    div.appendChild(s);
    document.body.appendChild(div);
}

function removerLoad() {
    document.getElementById('divLoad').remove();
}