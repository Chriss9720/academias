<?php

    require("conexcion.php");

    $json = json_decode(json_encode($_POST['obj']), true);

    $conn = conectar();
    $call = "{call dbo.getSemestres(?)}";
    $params = array (
        array(&$json, SQLSRV_PARAM_IN)
    );
    $stmt = sqlsrv_query($conn, $call, $params);

    if ($stmt === false) {
        print_r($json);
        die( print_r( sqlsrv_errors(), true));
    }

    $res = [];

    while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC) ) {
        array_push($res, $row);
    }

    sqlsrv_free_stmt($stmt);

    sqlsrv_close($conn);

    echo json_encode($res);

?>