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

    $return = "";

    if ($json["met"] == 1) {
        $conn = conectar();
        $call = "{call dbo.updateAdmin(?,?,?,?,?,?,?,?,?)}";
        $resp = 1;
        $params = array (
            array(&$json["ant"], SQLSRV_PARAM_IN),
            array(&$json["nom"], SQLSRV_PARAM_IN),
            array(&$json["name"], SQLSRV_PARAM_IN),
            array(&$json["app"], SQLSRV_PARAM_IN),
            array(&$json["apm"], SQLSRV_PARAM_IN),
            array(&$json["corr"], SQLSRV_PARAM_IN),
            array(&$json["cip"], SQLSRV_PARAM_IN),
            array(&$json["foto"], SQLSRV_PARAM_IN),
            array(&$resp, SQLSRV_PARAM_OUT)
        );
        $stmt = sqlsrv_query($conn, $call, $params);

        if ($stmt === false) {
            die( print_r( sqlsrv_errors(), true));
        }

        $return = array("res" => $resp);

        sqlsrv_free_stmt($stmt);

        sqlsrv_close($conn);
    }

    echo json_encode($return);

?>