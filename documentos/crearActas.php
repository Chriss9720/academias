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
            $this->Ln(2);
        }

        function Cuerpo($data) {

            $xml = new DomDocument('1.0', 'UTF-8');
            $raiz = $xml->createElement('Acta');
            $raiz = $xml->appendChild($raiz);

            $nodo = $xml->createElement('Cabecera');
            $raiz->appendChild($nodo);
            nodos('No', $data["no"], $nodo, $xml);
            nodos('HoraInicio', $data["inicio"], $nodo, $xml);
            nodos('dia', $data['dia'], $nodo, $xml);
            nodos('mes', $data['mes'], $nodo, $xml);
            nodos('year', $data['year'], $nodo, $xml);
            nodos('lugar', $data['lugar'], $nodo, $xml);
            nodos('academia', $data['academia'], $nodo, $xml);
            nodos('presidente', $data['presidente'], $nodo, $xml);
            nodos('Secretario', $data['secretario'], $nodo, $xml);
            nodos('horaFinal', $data['horaFinal'], $nodo, $xml);
            nodos('orden', $data['orden'], $nodo, $xml);
            nodos('jefe', $data['jefe'], $nodo, $xml);
            nodos('obs', $data['Obs'], $nodo, $xml);
//$data['']
            $this->SetFont('Arial','B',11);
            $this->Cell(0, 1, 'Acta No.'.$data["no"], 0, 0, 'R');
            $this->Ln(1.5);
            $this->SetFont('Arial','',11);
            $text = "En Ciudad Obregón, Sonora, siendo las ".$data["inicio"]." horas del día ".$data['dia']." de ".$data['mes']." del año ".$data['year']." reunidos en ".$data['lugar']." del Instituto Tecnológico Superior de Cajeme, los maestros miembros de la academia de ".$data['academia'].", cuya lista se anexa a la presente acta; se inicia la reunión, bajo la presidencia de ".$data['presidente'].", auxiliado en la secretaria por ".$data['secretario']." de acuerdo con el siguiente:";
            $arr = filas($text, 111);
            lines($this, $this->GetX(), $arr, count($arr) * .48, 0, false , "L", 0);

            $this->SetFont('Arial','B',11);
            $this->Cell(0, 1, utf8_decode("ORDEN DEL DÍA"), 0, 0, 'C');
            $this->Ln(1);

            $this->SetFont('Arial','',11);
            $arr = filas($data['orden'], 111);
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

            $this->SetFont('Arial','',11);
            if ( $data['anterioes'] != null) {
                $anteriores = $data['anterioes'];
                for ($i = 0; $i < count($anteriores); $i++) {

                    $aux = $anteriores[$i];

                    $nodo = $xml->createElement('Acuerdos');
                    $raiz->appendChild($nodo);

                    $comp = [[],[]];
                    $comp[0][0] = $aux["Acuerdo"];
                    $comp[0][1] = 35;
                    $comp[1][0] = $aux["personasAnt"];
                    $comp[1][1] = 30;
                    $comp[2][0] = $aux["Fecha"];
                    $comp[2][1] = 10;
                    $comp[3][0] = $aux["Avance"];
                    $comp[3][1] = 10;
                    $h = getH($comp);

                    nodos('Acuerdo', $comp[0][0], $nodo, $xml);
                    nodos('Responsable', $comp[1][0], $nodo, $xml);
                    nodos('Fecha', $comp[2][0], $nodo, $xml);
                    nodos('Avance', $comp[3][0], $nodo, $xml);

                    $this->Cell(0,1, '', 0, 0, '');

                    $posY = $this->GetY();
                    $this->SetY($posY);
                    $arr = filas($comp[0][0], $comp[0][1]);
                    $sig = lines($this, $this->GetX(), $arr, $h, 7, false , "L");

                    $comp[1][0] = str_replace("%", ", ", $comp[1][0]);
                    $this->SetY($posY);
                    $arr = filas($comp[1][0], $comp[1][1]);
                    $sig = lines($this, $sig, $arr, $h, 6.1, false , "L");
                    
                    $this->SetY($posY);
                    $arr = filas($comp[2][0], $comp[2][1]);
                    $sig = lines($this, $sig, $arr, $h, 4, false , "L");

                    $this->SetY($posY);
                    $arr = filas($comp[3][0], $comp[3][1]);
                    $sig = lines($this, $sig, $arr, $h, 2.5, false , "C");
                    $this->SetY($posY + $h);
                } 
            }
            $this->Ln(1);

            $this->SetFont('Arial','B',11);
            $this->Cell(0, 1, utf8_decode("ACUERDOS DE REUNIÓN"), 0, 0, 'C');
            $this->Ln(1);

            $this->Cell(8.5, 1.06, "ACUERDO", 1, 0, 'C', true);
            $this->Cell(5.87, 1.06, "RESPONSABLE", 1, 0, 'C', true);
            $text = "FECHA DE CUMPLIMIENTO";
            $arr = filas($text, 9);
            lines($this, $this->GetX(), $arr, 1.06, 0);

            $this->SetFont('Arial','',11);

            if ($data['extras'] != null) {
                $ext = $data['extras'];
                for ($i = 0; $i < count($ext); $i++) {

                    $aux = $ext[$i];

                    $nodo = $xml->createElement('Acuerdos');
                    $raiz->appendChild($nodo);

                    $comp = [[],[]];
                    $comp[0][0] = $aux['Acuerdo'];
                    $comp[0][1] = 35;
                    $comp[1][0] =$aux['Responsables'];
                    $comp[1][1] = 30;
                    $comp[2][0] = $aux['Fecha'];
                    $comp[2][1] = 10;
                    $h = getH($comp);

                    nodos('Acuerdo', $comp[0][0], $nodo, $xml);
                    nodos('Responsable', $comp[1][0], $nodo, $xml);
                    nodos('Fecha', $comp[2][0], $nodo, $xml);
                    nodos('Avance', '0%', $nodo, $xml);

                    $this->Cell(0,1, '', 0, 0, '');

                    $posY = $this->GetY();
                    $this->SetY($posY);
                    $arr = filas($comp[0][0], $comp[0][1]);
                    $sig = lines($this, $this->GetX(), $arr, $h, 8.5, false , "L");

                    $comp[1][0] = str_replace("%", ", ", $comp[1][0]);
                    $this->SetY($posY);
                    $arr = filas($comp[1][0], $comp[1][1]);
                    $sig = lines($this, $sig, $arr, $h, 5.87, false , "L");
                    
                    $this->SetY($posY);
                    $arr = filas($comp[2][0], $comp[2][1]);
                    $sig = lines($this, $sig, $arr, $h, 0, false , "L");
                    $this->SetY($posY + $h);
                } 
            }
            $this->Ln(2);

            $text = "El presidente pone a la consideración de los presentes el acta, quienes la aprueban en todas sus partes firman de conformidad al final de la misma.";
            $arr = filas($text, 111);
            lines($this, $this->GetX(), $arr, 1.06, 0, false, "L", 0);

            $text = "Sin otro asunto que tratar, el presidente da por terminada la reunión, siendo las ".$data['horaFinal']." horas del mismo día.";
            $arr = filas($text, 111);
            lines($this, $this->GetX(), $arr, 1.06, 0, false, "L", 0);

            $this->Ln(.5);

            $posY = $this->GetY();
            $this->SetFont('Arial','B',11);
            $this->Cell(8.81, .52, "PRESIDENTE", 1, 0, 'C', true);

            $this->SetY($posY);
            $this->SetX($this->GetX() + 10);
            $this->Cell(8.81, .52, "SECRETARIO", 1, 0, 'C', true);

            $this->SetFont('Arial','',11);
            $this->Ln(.5);
            $posY = $this->GetY();
            $this->Cell(8.81, 1.75, utf8_decode($data['presidente']), 1, 0, 'C');

            $this->SetY($posY);
            $this->SetX($this->GetX() + 10);
            $this->Cell(8.81, 1.75, utf8_decode($data['secretario']), 1, 0, 'C');

            $this->SetFont('Arial','B',11);
            $this->Ln(1.8);
            $posY = $this->GetY();
            $this->Cell(8.81, .52, "FIRMA", 1, 0, 'C', true);

            $this->SetY($posY);
            $this->SetX($this->GetX() + 10);
            $this->Cell(8.81, .52, "FIRMA", 1, 0, 'C', true);

            $this->Ln(2);
            $this->Cell(0, 1, utf8_decode("CONSTANCIA DE APROBACIÓN"), 0, 0, 'C');

            $this->Ln(.75);
            $this->SetFont('Arial','',11);
            $text = "Nombre y firma de los miembros de la academia que asistieron a la reunión y manifiestan su aprobación para la presente acta.";
            $arr = filas($text, 111);
            lines($this, $this->GetX(), $arr, 1.06, 0, false, "L", 0);

            $this->SetFont('Arial','B',11);
            $this->Ln(1);
            $this->Cell(8, .85, "PROFESOR", 1, 0, 'C', true);
            $this->Cell(6, .85, "MATERIA QUE IMPARTE", 1, 0, 'C', true);
            $this->Cell(0, .85, "FIRMA", 1, 0, 'C', true);

            $this->SetFont('Arial','',11);
            $this->Ln(.85);

            if ($data['docentes'] != null) {
                $pro = $data['docentes'];
                for ($i = 0; $i < count($pro); $i++) {

                    $aux = $pro[$i];

                    $nodo = $xml->createElement('Profesor');
                    $raiz->appendChild($nodo);

                    $comp = [[],[]];
                    $comp[0][0] = $aux['name'];
                    $comp[0][1] = 35;
                    $comp[1][0] = $aux['mat'];
                    $comp[1][1] = 30;
                    $comp[2][0] = "";
                    $comp[2][1] = 10;
                    $h = getH($comp);

                    nodos('Docente', $comp[0][0], $nodo, $xml);
                    nodos('Materias', $comp[1][0], $nodo, $xml);

                    $this->Cell(0,1, '', 0, 0, '');

                    $posY = $this->GetY();
                    $this->SetY($posY);

                    $arr = filas($comp[0][0], $comp[0][1]);
                    $sig = lines($this, $this->GetX(), $arr, $h, 8, false , "L");

                    $this->SetY($posY);
                    $arr = filas($comp[1][0], $comp[1][1]);
                    $sig = lines($this, $sig, $arr, $h, 6, false , "L");
                    
                    $this->SetY($posY);
                    $arr = filas($comp[2][0], $comp[2][1]);
                    $sig = lines($this, $sig, $arr, $h, 0, false , "L");

                    $this->SetY($posY + $h);
                } 

            }

            $this->Ln(1);
            $this->Cell(0, 1, utf8_decode("Revisión y Aprobación del Jefe de División"), 1, 0, 'C', true);
            $this->Ln(1);

            $text = $data['Obs'];
            $arr = filas($text, 100);

            $posX = $this->GetX();

            $this->Cell(0, count($arr) * .48 + 2 + 2 + .4, '', 1);

            $this->SetX($posX);
            $this->SetFont('Arial','B',11);
            $this->Cell(0, 1, utf8_decode("Observaciones: "), 0, 0);

            $this->SetFont('Arial','',11);
            $this->Ln(1);
            lines($this, $this->GetX(), $arr, count($arr) * .48, 0, false , "L", 0);

            $this->Ln(2);
            $this->SetX(10);
            $this->Cell(0, 0, utf8_decode($data['jefe']), 0, 0, 'C');
            $this->Ln(.15);
            $this->SetX(10);
            $this->Cell(0, 0, '', 1, 0);
            $this->SetX(10);
            $this->Cell(0, 1, utf8_decode('Jefe de División'), 0, 0, "C");
            $this->Ln(.4);
            $this->SetX(10);
            $this->Cell(0, 1, utf8_decode('Nombre y Firma'), 0, 0, "C");

            $xml->formatOutput = true;
            $xml->saveXML();
            $xml->save('actas/acta.xml');
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

    function nodos($key, $value, $nodo, $xml) {
        $subnodo = $xml->createElement($key, $value);
        $nodo->appendChild($subnodo);
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