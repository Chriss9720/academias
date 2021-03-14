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

            $act1 = json_decode(json_encode($data['Act1']), true);

            $comp = [[],[]];
            $comp[0][0] = "1";
            $comp[0][1] = 1;
            $comp[1][0] = "Mejoras e innovación de procesos de enseñanza y aprendizaje, incluye implementación de casos, semanas académicas, visitas industriales, proyectos de desarrollo comunitario, etc.";
            $comp[1][1] = 25;
            $comp[2][0] = $act1['Acciones'];
            $comp[2][1] = 20;
            $comp[3][0] = $act1['Asignaturas'];
            $comp[3][1] = 18;
            $comp[4][0] = $act1['Responsables'];
            $comp[4][1] = 15;
            $comp[5][0] = $act1['Fecha'];
            $comp[5][1] = 10;
            $comp[6][0] = $act1['Evidencia'];
            $comp[6][1] = 15;
            $h = getH($comp);

            //Fila 1
            $this->Ln(.24);
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

            //Fila 2
            $this->SetY($posY + $h);
            $this->SetFont("Arial", 'B', 10);
            $this->Cell(1, $h, "2", 1, 0, 'C', true);
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

            //Fila 3
            $this->SetY($posY + $h);
            $this->SetFont("Arial", 'B', 10);
            $this->Cell(1, $h, "3", 1, 0, 'C', true); 
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

            //Fila 4
            $this->SetY($posY + $h);
            $this->SetFont("Arial", 'B', 10);
            $this->Cell(1, $h, "4", 1, 0, 'C', true); 
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


            //Fila 5
            $this->SetY($posY + $h);
            $this->SetFont("Arial", 'B', 10);
            $this->Cell(1, $h, "5", 1, 0, 'C', true); 
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

            //Fila 6
            $this->SetY($posY + $h);
            $this->SetFont("Arial", 'B', 10);
            $this->Cell(1, $h, "6", 1, 0, 'C', true); 
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

            //Fila 7
            $this->SetY($posY + $h);
            $this->SetFont("Arial", 'B', 10);
            $this->Cell(1, $h, "7", 1, 0, 'C', true); 
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

            //Fila 8
            $this->SetY($posY + $h);
            $this->SetFont("Arial", 'B', 10);
            $this->Cell(1, $h, "8", 1, 0, 'C', true); 
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

            //Fila 9
            $this->SetY($posY + $h);
            $this->SetFont("Arial", 'B', 10);
            $this->Cell(1, $h, "9", 1, 0, 'C', true); 
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

    $json = json_decode(json_encode($_GET['obj']), true);

    

    $pdf = new PDF('P', 'cm', array(21.59, 27.94));
    $pdf->AliasNbPages();
    $pdf->AddPage();
    $pdf->TablaP($json);
    $pdf->Output("F", "pdf.pdf", true);
    $return = array ("archivo" => "PDF.html?nombre=pdf.pdf");
    echo json_encode($return);
?>