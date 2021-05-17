<?php

    require("conexcion.php");

    $json = json_decode(json_encode($_POST['obj']), true);

    $conn = conectar();
    $call = "{call dbo.sp_getResp(?)}";
    $params = array (
        array(&$json["id"], SQLSRV_PARAM_IN)
    );
    $stmt = sqlsrv_query($conn, $call, $params);

    if ($stmt === false) {
        die( print_r( sqlsrv_errors(), true));
    }

    $res = [];

    while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC) ) {
        array_push($res, $row);
    }

    sqlsrv_free_stmt($stmt);

    sqlsrv_close($conn);

    unlink("planTrabajo/".$json["path"].'.pdf');
    unlink("planTrabajo/".$json["path"].'.xml');

    for($i = 0; $i < count($res); $i++) {
        try {
            unlink($res[$i]["Ruta"]);
            unlink($res[$i]["RutaXML"]);
        } catch (Exception $e) {
            print_r("Doc NO EXISTE ".$i);
        }
    }

    $conn = conectar();
    $call = "{call dbo.sp_deletePlan(?)}";
    $params = array (
        array(&$json["id"], SQLSRV_PARAM_IN)
    );
    $stmt = sqlsrv_query($conn, $call, $params);

    if ($stmt === false) {
        die( print_r( sqlsrv_errors(), true));
    }

    sqlsrv_free_stmt($stmt);

    sqlsrv_close($conn);

?>