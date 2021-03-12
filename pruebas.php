<?php
function arreglado($txt, $max) {
    $txt = explode(" ", $txt);
    $arr = array();
    $i = 0;
    do {
        $palabra = $txt[$i];
        $f = true;
        do {
            $j = $i + 1;
            if (count(str_split($palabra)) + 1 + count(str_split($txt[$j])) < $max) {
                $palabra = $palabra. " " .$txt[$j];
            } else {
                array_push($arr, $palabra);
                $f = false;
            }
            $i = $j;
        } while ($f);
    } while ($i < count($txt));
    return $arr;
}
$comp = [[],[]];
$comp[0][0] = "1";
$comp[0][1] = 1;
$comp[1][0] = "Mejoras e innovación de procesos de enseñanza y aprendizaje, incluye implementación de casos, semanas académicas, visitas industriales, proyectos de desarrollo comunitario, etc.";
$comp[1][1] = 26;
$arr = arreglado($comp[1][0], $comp[1][1]);
print_r($arr);
?>