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
            $this->Cell(0, 1.35,"F01PSA01.02.03", 0, 0, 'C');
            $this->Ln(2);
        }
    }

    $json = json_decode(json_encode($_GET['obj']), true);

    $pdf = new PDF('P', 'cm', array(21.59, 27.94));
    $pdf->AliasNbPages();
    $pdf->AddPage();
    //$pdf->TablaP($json);
    $pdf->Output("F", "actas/acta.pdf", true);
    $return = array ("archivo" => "PDF.html?nombre=actas/acta.pdf");
    echo json_encode($return);
?>