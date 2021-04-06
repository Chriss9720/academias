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

    $conn = conectar();
    $call = "{call dbo.getAcademia}";
    $stmt = sqlsrv_query($conn, $call);

    if ($stmt === false) {
        die( print_r( sqlsrv_errors(), true));
    }

    $res = [];

    while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC) ) {
        $resp = array("ID" => $row["IDAcademia"], "Academia" => $row["Academia"]);
        array_push($res, $resp);
    }

    sqlsrv_free_stmt($stmt);

    sqlsrv_close($conn);

    echo json_encode($res);

?>