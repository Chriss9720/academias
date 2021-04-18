<?php

    require("conexcion.php");
    
    $json = json_decode(json_encode($_GET['obj']), true);

    $return = "";

    if ($json["met"] == 1) {
        $conn = conectar();
        $call = "{call dbo.updateDataAdmin(?,?,?,?,?,?,?,?)}";
        $resp = 1;
        $params = array (
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
    } else {
        $conn = conectar();
        $call = "{call dbo.updateDataUser(?,?,?,?,?,?,?,?,?)}";
        $resp = 1;
        $params = array (
            array(&$json["nom"], SQLSRV_PARAM_IN),
            array(&$json["name"], SQLSRV_PARAM_IN),
            array(&$json["app"], SQLSRV_PARAM_IN),
            array(&$json["apm"], SQLSRV_PARAM_IN),
            array(&$json["corr"], SQLSRV_PARAM_IN),
            array(&$json["cip"], SQLSRV_PARAM_IN),
            array(&$json["foto"], SQLSRV_PARAM_IN),
            array(&$json["carr"], SQLSRV_PARAM_IN),
            array(&$resp, SQLSRV_PARAM_OUT)
        );
        $stmt = sqlsrv_query($conn, $call, $params);

        if ($stmt === false) {
            die( print_r( sqlsrv_errors(), true));
        }

        $return = array("res" => $resp);

        sqlsrv_free_stmt($stmt);

        sqlsrv_close($conn);    

        $academias = $json["academias"];
        $puesto = $json["puestos"];

        if ($resp == 1) {
            for ($i = 0; $i < count($academias); $i++) {
                if ($i == 0) {
                    $conn = conectar();
                    $call = "{call dbo.updateAcademiaUser(?,?,?)}";
                    $params = array (
                        array(&$json["nom"], SQLSRV_PARAM_IN),
                        array(&$academias[$i], SQLSRV_PARAM_IN),
                        array(&$puesto[$i], SQLSRV_PARAM_IN)
                    );
                    $stmt = sqlsrv_query($conn, $call, $params);
                    sqlsrv_free_stmt($stmt);
                    if ($stmt === false) {
                        die( print_r( sqlsrv_errors(), true));
                    }
                    sqlsrv_close($conn);
                } else {
                    $conn = conectar();
                    $call = "{call dbo.setAcademia(?,?,?)}";
                    $params = array (
                        array(&$json["nom"], SQLSRV_PARAM_IN),
                        array(&$academias[$i], SQLSRV_PARAM_IN),
                        array(&$puesto[$i], SQLSRV_PARAM_IN)
                    );
                    $stmt = sqlsrv_query($conn, $call, $params);
                    sqlsrv_free_stmt($stmt);
                    if ($stmt === false) {
                        die( print_r( sqlsrv_errors(), true));
                    }
                    sqlsrv_close($conn);
                }
            }
        }
    }

    echo json_encode($return);

?>