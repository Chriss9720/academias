<?php

    $json = json_decode(json_encode($_POST['obj']), true);

    $xml = simplexml_load_file($json.'.xml');
 
    $acuerdos = [];

    for ($i = 0; $i < count($xml->Acuerdos); $i++) {
        $obj = $xml->Acuerdos[$i];
        $acuerdos[$i] = array( "Acuerdo" => $obj->Acuerdo,
            "Responsable" => $obj->Responsable,
            "Fecha" => $obj->Fecha,
            "Avance" => $obj->Avance);
    }

    $return = array( "Acuerdos" => $acuerdos);
    echo json_encode($return);
?>
