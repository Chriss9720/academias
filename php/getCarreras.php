<?php

    require("conexcion.php");

    $conn = conectar();
    $call = "{call dbo.getCarreras}";
    $stmt = sqlsrv_query($conn, $call);

    if ($stmt === false) {
        die( print_r( sqlsrv_errors(), true));
    }

    $res = [];

    while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC) ) {
        $resp = array("ID" => $row["IDCarrera"], "carrera" => $row["Nombre"]);
        array_push($res, $resp);
    }

    sqlsrv_free_stmt($stmt);

    sqlsrv_close($conn);

    echo json_encode($res);

?>