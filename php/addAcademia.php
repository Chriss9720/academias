<?php

    require("conexcion.php");

    $json = json_decode(json_encode($_GET['obj']), true);
  
    $conn = conectar();
    $call = "{call dbo.addAcademia(?,?,?)}";
    $params = array (
        array(&$json["Academia"], SQLSRV_PARAM_IN),
        array(&$json["carrera"], SQLSRV_PARAM_IN),
        array(&$json["encargado"], SQLSRV_PARAM_IN) 
    );
    $stmt = sqlsrv_query($conn, $call, $params);
    sqlsrv_free_stmt($stmt);
    if ($stmt === false) {
        die( print_r( sqlsrv_errors(), true));
    }
    sqlsrv_close($conn);
    
?>