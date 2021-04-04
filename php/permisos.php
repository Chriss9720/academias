<?php

    function conectar() {
        try {
            $serverName = "Chriss";
            $connectionInfo = array( "Database"=>"Academia", "UID"=>"Laithg", "PWD"=>"9720");
            $conn = sqlsrv_connect( $serverName, $connectionInfo);
            if( $conn ) {
                return $conn;
            }else{
                return $conn;
            }
        } catch (Exception $e) {
            echo $e;
            return null;
        }
    }

    $json = json_decode(json_encode($_GET['obj']), true);

    $conn = conectar();
    $call = "{call dbo.getPermisos(?)}";
    $params = array (
        array(&$json, SQLSRV_PARAM_IN)
    );
    $stmt = sqlsrv_query($conn, $call, $params);

    if ($stmt === false) {
        die( print_r( sqlsrv_errors(), true));
    }

    $res = [];

    while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC) ) {
        array_push($res, str_replace(" ", "",$row['NombrePermiso']));
    }

    sqlsrv_free_stmt($stmt);

    $return = array("res" => $res);
    sqlsrv_close($conn);

    echo json_encode($return);
?>