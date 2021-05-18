<?php

    require("conexcion.php");

    $json = json_decode(json_encode($_GET['obj']), true);

    $conn = conectar();
    $call = "{call dbo.getPermisos(?)}";
    $params = array (
        array(&$json, SQLSRV_PARAM_IN)
    );
    $stmt = sqlsrv_query($conn, $call, $params);
    if ($stmt === false) {
        print_r(sqlsrv_errors());
        die( print_r( 'Se peto ', true));
    }

    $res = [];

    while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC) ) {
        array_push($res, array("1" => $row['NombrePermiso'], "2" => $row["Admin"]));
    }

    sqlsrv_free_stmt($stmt);

    $return = array("res" => $res);
    sqlsrv_close($conn);

    echo json_encode($return);
?>