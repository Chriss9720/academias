<?php
   
    require("conexcion.php");

    $json = json_decode(json_encode($_GET['obj']), true);

    $conn = conectar();
    $call = "{call getAllMiembros(?,?)}";
    

    $params = array(
        array(&$json['aca'], SQLSRV_PARAM_IN),
        array(&$json['nom'], SQLSRV_PARAM_IN)
    );
    $stmt = sqlsrv_query($conn, $call, $params);

    if ($stmt === false) {
        print_r(sqlsrv_errors());
        print_r($json);
        die( print_r( 'Se peto de getAllMiembros.php', true) );
    }

    $res = [];

    while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC) ) {
        array_push($res, $row);
    }

    sqlsrv_free_stmt($stmt);

    $return = array("res" => $res);
    sqlsrv_close($conn);

    echo json_encode($return);
?>