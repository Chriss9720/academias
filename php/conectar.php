<?php
    function conectar() {
        try {
            $serverName = "Chriss";
            $connectionInfo = array( "Database"=>"AdmonAcademias", "UID"=>"Laithg", "PWD"=>"0279");
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
        $res = -1;
        $path = '';
        $conn = conectar();
        $call = "{call dbo.sp_iniciar(?,?,?,?)}";
        $params = array (
            array(&$nom, SQLSRV_PARAM_IN),
            array(&$pas, SQLSRV_PARAM_IN),
            array(&$res, SQLSRV_PARAM_OUT),
            array(&$path, SQLSRV_PARAM_OUT),
        );
        $stmt = sqlsrv_query($conn, $call, $params);
        if ($stmt === false) {
            die( print_r( sqlsrv_errors(), true));
        }
        sqlsrv_free_stmt($stmt);
        $return = array("res" => $res, "path" => $path);
        sqlsrv_close($conn);
        echo json_encode($return);
    }

    $json = json_decode(json_encode($_GET['obj']), true);
    switch ($json['funcion']) {
        case 'iniciar':
            inicar($json['nom'], $json['pass']);
            break;
    }
?>