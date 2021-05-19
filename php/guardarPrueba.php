<?php
    require("conexcion.php");
    $json = json_decode(json_encode($_POST['obj']), true);

    $conn = conectar();

    print_r($json);
    if($json["TI"] == "Acuerdo") {
        $call = "{call dbo.sp_subirAcuerdo(?,?,?)}";
        $params = array (
            array(&$json["path"], SQLSRV_PARAM_IN),
            array(&$json["ID"], SQLSRV_PARAM_IN),
            array(&$json["g"], SQLSRV_PARAM_IN)  
        );
    } else {
        $call = "{call dbo.sp_subirResponsable(?,?)}";
        $params = array (
            array(&$json["path"], SQLSRV_PARAM_IN),
            array(&$json["ID"], SQLSRV_PARAM_IN)  
        );
    }
    $stmt = sqlsrv_query($conn, $call, $params);

    if ($stmt === false) {
        die( print_r( 'Se peto '.sqlsrv_errors(), true));
    }

    sqlsrv_free_stmt($stmt);

    sqlsrv_close($conn);

    echo json_encode($res);
?>