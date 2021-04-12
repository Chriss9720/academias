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
    $call = "{call dbo.getAutor(?,?)}";
    $params = array (
        array(&$json[''], SQLSRV_PARAM_IN),
        array(&$json[''], SQLSRV_PARAM_IN)
    );
    $stmt = sqlsrv_query($conn, $call, $params);

    if ($stmt === false) {
        die( print_r( 'Se peto '.sqlsrv_errors(), true));
    }

    $res = [];

    while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC) ) {
        array_push($res, $row);
    }

    sqlsrv_free_stmt($stmt);

    sqlsrv_close($conn);

    echo json_encode($res);

?>