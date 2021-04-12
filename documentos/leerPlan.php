<?php
    $json = json_decode(json_encode($_GET['obj']), true);
    $xml = simplexml_load_file('planTrabajo/plantrabajo-'.$json.'.xml');
    echo json_encode($xml);
?>
