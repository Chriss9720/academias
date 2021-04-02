<?php
    require('fpdf.php');

    class PDF extends FPDF
    {
        // Page header
        function Header()
        {
            // Logo
            $this->Cell(4.34, 1.35, "", 1);
            $this->Image('logo.png', 1.25, 1);
            // Arial bold 15
            $this->SetFont('Arial','B',14);
            // Title
            $this->Cell(0, 1.35, '', 1, 0, 'C');
            $this->Ln(.5);
            $this->Cell(4.34);
            $this->SetY(.85, false);
            $this->Cell(0, 1.35, 'PLAN DE TRABAJO DE ACADEMIAS', 0, 0, 'C');
            $this->Ln(.6);
            $this->Cell(4.34);
            $this->SetFont('Arial','',12);
            $this->Cell(0, 1.35,"F03PSA01.03", 0, 0, 'C');
            $this->Ln(2);
        }

        function TablaP($data) {
            $xml = new DomDocument('1.0', 'UTF-8');
            $raiz = $xml->createElement('PlanTrabajo');
            $raiz = $xml->appendChild($raiz);

            $this->SetFont('Arial', 'B', 10);
            $this->SetFillColor(217, 217, 217);
            $this->Cell(4.49, 0.7,'Nombre de la Academia:', 1, 0, 'R', true);
            $this->SetFont('Arial', '', 10);
            $this->Cell(8.52, 0.7,  utf8_decode($data['Academia']), 1, 0, 'C');
            $this->SetFont('Arial', 'B', 10);
            $this->Cell(2, 0.7, 'Semestre', 1, 0, 'C', true);
            $this->SetFont('Arial', '', 10);
            $this->Cell(0, 0.7, utf8_decode($data['Semestre']), 1, 0, 'C');
            $this->Ln(.7);
            $this->SetFont('Arial', 'B', 10);
            $this->Cell(4.49, 0.7,'Presidente:', 1, 0, 'R', true);
            $this->SetFont('Arial', '', 10);
            $this->Cell(0, 0.7, utf8_decode($data['Presidente']), 1, 0 , 'C');
            $this->Ln(.7);
            $this->SetFont('Arial', 'B', 10);
            $this->Cell(0, .7, "Fechas de reuniones", 1, 0, 'C', true);
            $this->Ln(.7);
            $this->Cell(4.48, .7, utf8_decode("1ra reunión:"), 1, 0, 'C', true);
            $this->SetFont('Arial', '', 10);
            $this->Cell(5.15, .7, utf8_decode($data['f1']), 1, 0, 'C');
            $this->SetFont('Arial', 'B', 10);
            $this->Cell(4.48, .7, utf8_decode("2da reunión:"), 1, 0, 'C', true);
            $this->SetFont('Arial', '', 10);
            $this->Cell(0, .7, utf8_decode($data['f2']), 1, 0, 'C');
            $this->Ln(.7);
            $this->SetFont('Arial', 'B', 10);
            $this->Cell(4.48, .7, utf8_decode("3ra reunión:"), 1, 0, 'C', true);
            $this->SetFont('Arial', '', 10);
            $this->Cell(5.15, .7, utf8_decode($data['f3']), 1, 0, 'C');
            $this->SetFont('Arial', 'B', 10);
            $this->Cell(4.48, .7, utf8_decode("4ta reunión:"), 1, 0, 'C', true);
            $this->SetFont('Arial', '', 10);
            $this->Cell(0, .7, utf8_decode($data['f4']), 1, 0, 'C');
            $this->Ln(.7);

            $nodo = $xml->createElement('Cabecera');
            $raiz->appendChild($nodo);
            nodos('Academia', $data['Academia'], $nodo, $xml);
            nodos('Semestre', $data['Semestre'], $nodo, $xml);
            nodos('Presidente', $data['Presidente'], $nodo, $xml);
            nodos('Primera', $data['f1'], $nodo, $xml);
            nodos('Segunda', utf8_decode($data['f2']), $nodo, $xml);
            nodos('Tercera', utf8_decode($data['f3']), $nodo, $xml);
            nodos('Cuarta', utf8_decode($data['f4']), $nodo, $xml);

            $comp = [[],[]];
            $comp[0][0] = "No.";
            $comp[0][1] = 3;
            $comp[1][0] = "Actividades";
            $comp[1][1] = 18;
            $comp[2][0] = "Acciones específicas para cada actividad";
            $comp[2][1] = 18;
            $comp[3][0] = "Asignaturas en las que impacta:";
            $comp[3][1] = 15;
            $comp[4][0] = "Responsable";
            $comp[4][1] = 12;
            $comp[5][0] = "Fecha de cumplimiento";
            $comp[5][1] = 12;
            $comp[6][0] = "Evidencia a entregar";
            $comp[6][1] = 11;
            $h = getH($comp);

            $this->SetFont('Arial', 'B', 10);
            $this->Cell(1, $h, utf8_decode($comp[0][0]), 1, 0, 'C', true);
            $this->Cell(4.1, $h, utf8_decode($comp[1][0]), 1, 0, 'C', true);

            $arr = filas($comp[2][0], 18);
            $posY = $this->GetY();
            $sig = lines($this, 6.1, $arr, $h, 3.30, true);

            $this->SetY($posY);
            $arr = filas($comp[3][0], 18);
            $sig = lines($this, $sig, $arr, $h, 3.2, true);
            
            $this->SetY($posY);
            $this->SetX($sig);
            $this->Cell(2.7, $h, utf8_decode($comp[4][0]), 1, 0, 'C', true);
            $sig = $this->GetX();

            $this->SetY($posY);
            $arr = filas($comp[5][0], 18);
            $sig = lines($this, $sig, $arr, $h, 2.7, true);

            $this->SetY($posY);
            $arr = filas($comp[6][0], 18);
            $sig = lines($this, $sig, $arr, $h, 2.6, true);

            $titulo = array("Mejoras e innovación de procesos de enseñanza y aprendizaje, incluye implementación de casos, semanas académicas, visitas industriales, proyectos de desarrollo comunitario, etc.",
            "Uniformizar actividades de formación práctica en asignaturas, talleres y laboratorios.",
            "Programación de viajes académicos y/o actividades de vinculación.",
            "Programa de seguimiento y solución estratégica de las materias (PSSEM).",
            "Integrar banco de proyectos integradores y de residencias profesionales.",
            "Revisión y actualización de requerimientos de bibliografía básica y de consulta de los programas de curso.",
            "Desarrollar proyectos de investigación. Publicación de artículos académicos.",
            "Diseño, rediseño o actualización y validación de instrumentaciones didácticas.",
            "Generar y validar instrumentos de evaluación (rubricas, listas de cotejo) y pruebas departamentales");
            $this->Ln(.24);
            for	($i = 0, $j = 1; $i < 9; $i++, $j++) {

                $nodo = $xml->createElement('Act'.$j);
                $raiz->appendChild($nodo);

                $act = json_decode(json_encode($data['Act'.$j]), true);

                $comp = [[],[]];
                $comp[0][0] = "".$j;
                $comp[0][1] = 1;
                $comp[1][0] = $titulo[$i];
                $comp[1][1] = 25;
                $comp[2][0] = $act['Acciones'];
                $comp[2][1] = 20;
                $comp[3][0] = $act['Asignaturas'];
                $comp[3][1] = 18;
                $comp[4][0] = str_replace("?", " ", $act['Responsables']);;
                $comp[4][1] = 15;
                $comp[5][0] = $act['Fecha'];
                $comp[5][1] = 10;
                $comp[6][0] = $act['Evidencia'];
                $comp[6][1] = 15;
                $h = getH($comp);

                nodos('Acciones', $act['Acciones'], $nodo, $xml);
                nodos('Asignarutas', $act['Asignaturas'], $nodo, $xml);
                nodos('Responsable', $act['Responsables'], $nodo, $xml);
                nodos('Fecha', $act['Fecha'], $nodo, $xml);
                nodos('Evidencia', $act['Evidencia'], $nodo, $xml);

                $this->SetFont("Arial", 'B', 10);
                $this->Cell(1, $h, $comp[0][0], 1, 0, 'C', true); 
                $this->SetFont("Arial", '', 10);
                
                $posY = $this->GetY();
                $this->SetY($posY);
                $arr = filas($comp[1][0], $comp[1][1]);
                $sig = lines($this, $this->GetX() + 1, $arr, $h, 4.1, false, 'L');
    
                $this->SetY($posY);
                $arr = filas($comp[2][0], $comp[2][1]);
                $sig = lines($this, 6.1, $arr, $h, 3.30, false, 'L');
    
                $this->SetY($posY);
                $arr = filas($comp[3][0], $comp[3][1]);
                $sig = lines($this, $sig, $arr, $h, 3.2, false, 'L');
    
                $this->SetY($posY);
                $arr = filas($comp[4][0], $comp[4][1]);
                $sig = lines($this, $sig, $arr, $h, 2.7, false, 'L');
    
                $this->SetY($posY);
                $arr = filas($comp[5][0], $comp[5][1]);
                $sig = lines($this, $sig, $arr, $h, 2.7, false, 'L');
    
                $this->SetY($posY);
                $arr = filas($comp[6][0], $comp[6][1]);
                $sig = lines($this, $sig, $arr, $h, 2.6, false, 'L');
                $this->SetY($posY + $h);
            }

            //firmas
            $this->Ln(5);
            $this->SetFont("Arial", "B", 10);
            $this->CELL(5.85, .55, utf8_decode("Elaboró"), 1, 0, 'C', true);

            $this->SetX($this->GetX() + 1);
            $this->CELL(5.45, .55, utf8_decode("Validó"), 1, 0, 'C', true);

            $this->SetX($this->GetX() + 1);
            $this->CELL(5.97, .55, utf8_decode("Supervisó"), 1, 0, 'C', true);

            $this->SetFont("Arial", "", 10);
            $this->Ln(.55);
            $posY = $this->GetY();
            $arr = filas($data['Presidente'], 15);
            $sig = lines($this, $this->GetX(), $arr, 1.36, 5.85, false);

            $this->SetY($posY);
            $this->SetX($this->GetX() + 1 + 5.85);
            $arr = filas('Aquí va el jefe de la academia', 15);
            $sig = lines($this, $this->GetX(), $arr, 1.36, 5.45, false);

            $this->SetY($posY);
            $arr = filas('Aquí va el coordinador de la academia', 15);
            $sig = lines($this, $this->GetX() + 2 + 5.45 + 5.85, $arr, 1.36, 5.97, false);

            $this->Ln(0);
            $this->SetFont("Arial", "B", 10);
            $this->Cell(5.85, .79, utf8_decode("Presidente de Academia"), 1, 0, 'C', true);

            $this->SetX($this->GetX() + 1);
            $posY = $this->GetY();
            $arr = filas("Jefe de División de Carrera y/o Coordinador de Extensión", 38);
            $sig = lines($this, $this->GetX(), $arr, .79, 5.45);
            
            $this->SetY($posY);
            $arr = filas("Coordinador de Presidentes de Academias", 30);
            $sig = lines($this, $this->GetX() + 2 + 5.45 + 5.85, $arr, .79, 5.97);

            $xml->formatOutput = true;
            $xml->saveXML();
            $xml->save('planTrabajo/archivo.xml');

        }
    }

    function lines($pdf, $x, $arr, $h, $w, $f = true, $t = 'C') {
        $pdf->SetX($x);
        $pdf->Cell($w, $h, "", 1, 0, "", $f);
        $sep = $h - (count($arr) * .48);
        $sep /= 2;
        $pdf->SetY($pdf->GetY() + $sep);
        foreach ($arr as $v) {
            $pdf->SetX($x);
            $pdf->Cell($w, 0.48, utf8_decode($v), 0, 0, $t, false);
            $pdf->SetY($pdf->GetY() + .48);
        }
        return $w + $x;
    }

    function getH($data) {
        $max = count(filas($data[0][0], $data[0][1]));
        for	($i = 1; $i < count($data); $i++) {
            $t = count(filas($data[$i][0], $data[$i][1]));
            if ($max < $t) {
                $max = $t;
            }
        }
        return .48 * $max;
    }

    function filas($txt, $max) {
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

    function nodos($key, $value, $nodo, $xml) {
        $subnodo = $xml->createElement($key, $value);
        $nodo->appendChild($subnodo);
    }

    $json = json_decode(json_encode($_GET['obj']), true);

    $pdf = new PDF('P', 'cm', array(21.59, 27.94));
    $pdf->AliasNbPages();
    $pdf->AddPage();
    $pdf->TablaP($json);
    $pdf->Output("F", "planTrabajo/plantrabajo.pdf", true);
    $return = array ("archivo" => "PDF.html?nombre=planTrabajo/plantrabajo.pdf");
    echo json_encode($return);
?>