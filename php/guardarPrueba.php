<?php
    require("conexcion.php");
    $json = json_decode(json_encode($_POST['obj']), true);

    $conn = conectar();

    if($json["TI"] == "Acuerdo") {
        $call = "{call dbo.sp_subirAcuerdo(?,?)}";
        $params = array (
            array(&$json["path"], SQLSRV_PARAM_IN),
            array(&$json["ID"], SQLSRV_PARAM_IN)  
        );
    } else {
        print_r(2);
    }
    
    $stmt = sqlsrv_query($conn, $call, $params);

    if ($stmt === false) {
        die( print_r( 'Se peto '.sqlsrv_errors(), true));
    }

    sqlsrv_free_stmt($stmt);

    sqlsrv_close($conn);

    echo json_encode($res);
?>