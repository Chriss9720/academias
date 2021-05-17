<?php
    
    require("conexcion.php");

    $json = json_decode(json_encode($_GET['obj']), true);

    $conn = conectar();
    $call = "{call dbo.sp_getPlanRutaXMLXID(?)}";
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

    $xml = simplexml_load_file($res[0]["RutaXml"]);

    echo json_encode($xml);
?>
