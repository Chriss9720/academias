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
    $call = "{call dbo.rmUser(?)}";
    $params = array (
        array(&$json, SQLSRV_PARAM_IN),
    );
    $stmt = sqlsrv_query($conn, $call, $params);
    if ($stmt === false) {
        die( print_r( 'Se peto '.sqlsrv_errors(), true));
    }

    sqlsrv_free_stmt($stmt);

    sqlsrv_close($conn);

?>