function accion(mat, psw, cont, err) {
    mat = document.getElementById(mat).value;
    psw = document.getElementById(psw).value;
    if (mat.length < 1 && psw.length < 1) {
        document.getElementById(cont).hidden = false;
        document.getElementById(err).textContent = "Ingrese sus credenciales";
    } else if (mat.length < 1) {
        document.getElementById(cont).hidden = false;
        document.getElementById(err).textContent = "Ingrese su nomina";
    } else if (psw.length < 1) {
        document.getElementById(cont).hidden = false;
        document.getElementById(err).textContent = "Ingrese su clave";
    } else {
        document.getElementById(cont).hidden = true;
        var obj = { nom: mat, pass: psw, funcion: "iniciar" };
        $.ajax({
            url: 'php/conectar.php',
            type: 'GET',
            data: { obj: obj },
            dataType: 'JSON',
            success: function(r) {
                crearLoad();
                let result = r["res"];
                if (result > 1) {

                }
                //window.location = "menu.html?id=" + result;
                else {
                    document.getElementById(err).textContent = "Usuario y/o clave inválida";
                    document.getElementById(cont).hidden = false;
                    removerLoad();
                }
            },
            error: function(error) {
                console.log(error);
            }
        });
    }
}

function visible() {
    var x = document.getElementById("psw");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}