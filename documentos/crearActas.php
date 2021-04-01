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
            $this->Cell(0, 1.35, 'ACTA DE JUNTA DE ACADEMIA', 0, 0, 'C');
            $this->Ln(.6);
            $this->Cell(4.34);
            $this->SetFont('Arial','',12);
            $this->Cell(0, 1.35,"F01PSA01.02", 0, 0, 'C');
            $this->Ln(1.5);
        }

        function Cuerpo($data) {
            $this->SetFont('Arial','B',11);
            $this->Cell(0, 1, 'Acta No.', 0, 0, 'R');
            $this->Ln(1.5);
            $this->SetFont('Arial','',11);
            $text = "En Ciudad Obregón, Sonora, siendo las 5:00 horas del día 08 de 03 del año 21 reunidos en Casa del Instituto Tecnológico Superior de Cajeme, los maestros miembros de la academia de ISC, cuya lista se anexa a la presente acta; se inicia la reunión, bajo la presidencia de Anabel, auxiliado en la secretaria por Sergio de acuerdo con el siguiente:";
            $arr = filas($text, 111);
            lines($this, $this->GetX(), $arr, count($arr) * .48, 0, false , "L", 0);

            $this->SetFont('Arial','B',11);
            $this->Cell(0, 1, utf8_decode("ORDEN DEL DÍA"), 0, 0, 'C');
            $this->Ln(1);

            $this->SetFont('Arial','',11);
            $text = "En Ciudad Obregón, Sonora, siendo las 5:00 horas del día 08 de 03 del año 21 reunidos en Casa del Instituto Tecnológico Superior de Cajeme, los maestros miembros de la academia de ISC, cuya lista se anexa a la presente acta; se inicia la reunión, bajo la presidencia de Anabel, auxiliado en la secretaria por Sergio de acuerdo con el siguiente: En Ciudad Obregón, Sonora, siendo las 5:00 horas del día 08 de 03 del año 21 reunidos en Casa del Instituto Tecnológico Superior de Cajeme, los maestros miembros de la academia de ISC, cuya lista se anexa a la presente acta; se inicia la reunión, bajo la presidencia de Anabel, auxiliado en la secretaria por Sergio de acuerdo con el siguiente: En Ciudad Obregón, Sonora, siendo las 5:00 horas del día 08 de 03 del año 21 reunidos en Casa del Instituto Tecnológico Superior de Cajeme, los maestros miembros de la academia de ISC, cuya lista se anexa a la presente acta; se inicia la reunión, bajo la presidencia de Anabel, auxiliado en la secretaria por Sergio de acuerdo con el siguiente: En Ciudad Obregón, Sonora, siendo las 5:00 horas del día 08 de 03 del año 21 reunidos en Casa del Instituto Tecnológico Superior de Cajeme, los maestros miembros de la academia de ISC, cuya lista se anexa a la presente acta; se inicia la reunión, bajo la presidencia de Anabel, auxiliado en la secretaria por Sergio de acuerdo con el siguiente: En Ciudad Obregón, Sonora, siendo las 5:00 horas del día 08 de 03 del año 21 reunidos en Casa del Instituto Tecnológico Superior de Cajeme, los maestros miembros de la academia de ISC, cuya lista se anexa a la presente acta; se inicia la reunión, bajo la presidencia de Anabel, auxiliado en la secretaria por Sergio de acuerdo con el siguiente:";
            $arr = filas($text, 111);
            lines($this, $this->GetX(), $arr, count($arr) * .48, 0, false , "L");

            $text = "Aprobado el Orden del Día, se procede a la revisión de acuerdos de la minuta anterior bajo el siguiente:";
            $this->Cell(0, 1, utf8_decode($text), 0, 0, 'L');
            $this->Ln(.7);

            $this->SetFont('Arial','B',11);
            $text = "SEGUIMIENTO DE ACUERDOS ANTERIORES";
            $this->Cell(0, 1, utf8_decode($text), 0, 0, 'C');
            $this->Ln(1);

            $this->SetFillColor(217, 217, 217);
            $this->Cell(7, .8, "ACUERDO", 1, 0, 'C', true);
            $this->Cell(6.1, .8, "RESPONSABLE", 1, 0, 'C', true);
            $text = "FECHA DE CUMPLIMIENTO";
            $arr = filas($text, 9);
            $posY = $this->GetY();
            $posX = $this->GetX();
            lines($this, $this->GetX(), $arr, .8, 4);
            $this->SetY($posY);
            $this->SetX($posX + 4);
            $this->Cell(2.5, .8, 'AVANCE', 1, 0, 'C', true);
            $this->Ln(.8);

            for ($i = 0; $i < 10; $i++) {
                $comp = [[],[]];
                $comp[0][0] = "Acuerdo No. Acuerdo No. Acuerdo No.";
                $comp[0][1] = 35;
                $comp[1][0] = "Responsable No. ";
                $comp[1][1] = 30;
                $comp[2][0] = "Fecha ";
                $comp[2][1] = 10;
                $comp[3][0] = "0%";
                $comp[3][1] = 10;
                $h = getH($comp);

                $posY = $this->GetY();
                $this->SetY($posY);

                $arr = filas($comp[0][0], $comp[0][1]);
                $sig = lines($this, $this->GetX(), $arr, $h, 7, false , "L");

                $this->SetY($posY);
                $arr = filas($comp[1][0], $comp[1][1]);
                $sig = lines($this, $sig, $arr, $h, 6.1, false , "L");
                
                $this->setY($posY);
                $arr = filas($comp[2][0], $comp[2][1]);
                $sig = lines($this, $sig, $arr, $h, 4, false , "L");

                $this->setY($posY);
                $arr = filas($comp[3][0], $comp[3][1]);
                $sig = lines($this, $sig, $arr, $h, 2.5, false , "C");

                $this->SetY($posY + $h);
            } 
        }
    }

    function lines($pdf, $x, $arr, $h, $w, $f = true, $t = 'C', $b = 1) {
        $pdf->SetX($x);
        $pdf->Cell($w, $h, "", $b, 0, "", $f);
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

    $json = json_decode(json_encode($_GET['obj']), true);

    $pdf = new PDF('P', 'cm', array(21.59, 27.94));
    $pdf->AliasNbPages();
    $pdf->AddPage();
    $pdf->Cuerpo($json);
    $pdf->Output("F", "actas/acta.pdf", true);
    $return = array ("archivo" => "PDF.html?nombre=actas/acta.pdf");
    echo json_encode($return);
?>