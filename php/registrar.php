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
    $res = 0;
    $conn = conectar();
    $call = "{call dbo.nuevoUsuario(?,?,?,?,?,?,?,?)}";
    $params = array (
        array(&$json["nom"], SQLSRV_PARAM_IN),
        array(&$json["name"], SQLSRV_PARAM_IN),
        array(&$json["app"], SQLSRV_PARAM_IN),
        array(&$json["apm"], SQLSRV_PARAM_IN),
        array(&$json["corr"], SQLSRV_PARAM_IN),
        array(&$json["cip"], SQLSRV_PARAM_IN),
        array(&$json["foto"], SQLSRV_PARAM_IN),
        array(&$res, SQLSRV_PARAM_OUT)
    );
    $stmt = sqlsrv_query($conn, $call, $params);
    sqlsrv_free_stmt($stmt);
    if ($stmt === false) {
        die( print_r( sqlsrv_errors(), true));
    }
    $return = array("res" => $res);
    sqlsrv_close($conn);
    echo json_encode($return);
?>