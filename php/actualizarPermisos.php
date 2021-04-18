<?php

    require("conexcion.php");

    $json = json_decode(json_encode($_GET['obj']), true);
    
    $conn = conectar();
    $call = "{call dbo.removerPermisos(?,?,?)}";
    $params = array (
        array(&$json["nomina"], SQLSRV_PARAM_IN),
        array(&$json["academia"], SQLSRV_PARAM_IN),
        array(&$json["puesto"], SQLSRV_PARAM_IN)
    );
    $stmt = sqlsrv_query($conn, $call, $params);
    sqlsrv_free_stmt($stmt);
    if ($stmt === false) {
        die( print_r( sqlsrv_errors(), true));
    }
    sqlsrv_close($conn);

    $permisos = $json["permisos"];
    if ($permisos != null) {
        for($i = 0; $i < count($permisos); $i++) {
            $conn = conectar();
            $call = "{call dbo.setPermisos(?,?,?,?)}";
            $params = array(
                array(&$json["nomina"], SQLSRV_PARAM_IN),
                array(&$json["academia"], SQLSRV_PARAM_IN),
                array(&$json["puesto"], SQLSRV_PARAM_IN),
                array(&$permisos[$i], SQLSRV_PARAM_IN)
            );
            $stmt = sqlsrv_query($conn, $call, $params);
            sqlsrv_free_stmt($stmt);
            if ($stmt === false) {
                die( print_r( sqlsrv_errors(), true));
            }
            sqlsrv_close($conn);
        }
    } else {
        $conn = conectar();
        $per = 8;
        $call = "{call dbo.setPermisos(?,?,?,?)}";
        $params = array(
            array(&$json["nomina"], SQLSRV_PARAM_IN),
            array(&$json["academia"], SQLSRV_PARAM_IN),
            array(&$json["puesto"], SQLSRV_PARAM_IN),
            array(&$per, SQLSRV_PARAM_IN)
        );
        $stmt = sqlsrv_query($conn, $call, $params);
        sqlsrv_free_stmt($stmt);
        if ($stmt === false) {
            die( print_r( sqlsrv_errors(), true));
        }
        sqlsrv_close($conn);
    }
    
?>