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

    function inicar($nom, $pas) {
        $res = -4;
        $nom2 = "";
        $conn = conectar();
        $call = "{call dbo.iniciar(?,?,?,?)}";
        $params = array (
            array(&$nom, SQLSRV_PARAM_IN),
            array(&$pas, SQLSRV_PARAM_IN),
            array(&$res, SQLSRV_PARAM_OUT),
            array(&$nom2, SQLSRV_PARAM_OUT)
        );
        $stmt = sqlsrv_query($conn, $call, $params);
        sqlsrv_free_stmt($stmt);
        if ($stmt === false) {
            die( print_r( sqlsrv_errors(), true));
        }
        $return = array("res" => $res, "nom" => $nom2);
        sqlsrv_close($conn);
        echo json_encode($return);
    }

    $json = json_decode(json_encode($_GET['obj']), true);
    inicar($json['nom'], $json['pass']);
    
?>