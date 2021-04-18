<?php

    require("conexcion.php");

    $json = json_decode(json_encode($_GET['obj']), true);

    $conn = conectar();
    $call = "{call dbo.rmUser(?,?)}";
    $params = array (
        array(&$json["name"], SQLSRV_PARAM_IN),
        array(&$json["aca"], SQLSRV_PARAM_IN)
    );
    $stmt = sqlsrv_query($conn, $call, $params);
    if ($stmt === false) {
        die( print_r( 'Se peto '.sqlsrv_errors(), true));
    }

    sqlsrv_free_stmt($stmt);

    sqlsrv_close($conn);

?>