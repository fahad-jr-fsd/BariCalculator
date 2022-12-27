<?php 
  if($_POST == []) {
      header('Location: ./index.html');
  }
?>

<?php
$WasteArray = [
    // Name, Id
    // ['Yarn', 'Yarn'],
    ['Dying Process', 'Dying'],
    ['Cutting / Stitching / B', 'B%'],
    ['Weaving / Knitting Yarn', 'Weaving'],
    ['Yarn Dying', 'Yarn_Dying'],
    ['Shairing', 'Shairing'],
];

$RowDetails_Operation = [
    ['3rd Party Inspection', 'Inspection', 3],
    ['3rd Party Testing', 'Testing', 3],
    ['ToP / PP Sample', 'Sample', 3],
    ['Factory Fix Over Head', 'Factory', 10],
    ['Sales / Marteking / Exhibition', 'Exhibition', 3],
    ['Dosmestic Post Handing', 'Dosmestic', 1.5],
    ['Export Tax', 'ExportTax', 1],
    ['Sales Commission', 'SalesCommission', $_POST['SalesCommission']],
];

$RowDetails_Factory = [
    ['Stitching', 'Stitching'],
    ['Stitching Thread', 'StitchingThread'],
    ['Lable', 'Lable'],
    ['Embriodery / Print', 'Embriodery'],
    ['Poly Bag', 'PolyBag'],
    ['TagPin', 'TagPin'],
    ['Hanger / J Hook', 'Hanger'],
    ['Bally Band', 'BallyBand'],
    ['Twill Tape', 'Twill'],
    ['Basic Carton', 'BasicCarton'],
    ['Fancy Carton', 'FancyCarton'],
    ["Elastic",                 "Elastic"], 
    ["Elastic Band",            "ElasticBand"], 
    ["Tag Card",                "TagCard"], 
    ["RFID Chip / tag",         "RFIDtag"], 
    ["Zipper",                  "Zipper"], 
    ["Velcru",                  "Velcru"], 
    ["Garment Wash",            "GarmentWash"], 
];

$RowDetails_Piece = [
    ['Per piece GSM & Spec Information', 'GSM'],
    ['Cut Width in cm', 'CutWidth'],
    ['Cut Lenght/Height in cm', 'CutLenght'],
];

$RowDetails_ApparelPiece = [
  ["Body / Chest",  "Body",   2,  2],
  ["Arm",           "Arm",    2,  2],
  ["Hood",          "Hood",   2,  1],
  ["Pocket",        "Pocket", 2,  1],
  ["RIB Percentage","RIB",    1,  .01]
];


if(isset($_POST["isCurrency"])){
  $_POST["isCurrency"] = "OFF";
}

function roundPost ($value){
    return round($_POST[$value], 2);
}

?>


<!-- Busain Logic -->
<?php
  $GLOBALS["d"] = $_POST;
  
  $BasicInfo = [
    'EName' => $d['Employee_Name'],
    'CName' => $d['Client_Name'],
    'PName' => $d['Product'],
    'NYarn' => $d['YarnMixture'],
    'SType' => $d["Stock"].($_POST["Stock"] == "Per Pack" ? " ( PackSize = ".$d["PackSize"]." )": ""),
    "isC" => $d["isCurrency"] == "on" ? ("<tr><td>6. </td><td>Currency Conversion(".$d["CurrencyName"].")</td><td>1 ".$d["CurrencyName"]." => ".$d["CurrencyRate"]." PKR </td></tr>"):"",
    "Date" => date('l jS \of F Y'),
  ];

  function ProductInfo($index){
    $temp = [
      "Template" => "",
      "Total" => 0
    ];
    
    $d = $GLOBALS["d"];
    $ind  = $index + 1;
    $YLbS   = $d['Rate(pound)'.$index];
    $YKG    = $YLbS * 2.2046;
    $PER    = $d['Percentage' . $index];
    $TPYC   = $YKG * ($PER / 100);

    $temp["Template"] = 
    "<tr class='tableData'><td>$ind. </td><td>".$d['Type'.$index]."</td>
      <td>".round($YLbS, 2)."</td>
      <td>".round($YKG, 2)."</td>
      <td>".round($PER, 2)." %</td>
      <td>".round($TPYC, 2)."</td>
    </tr>";
    $temp["Total"] = round($TPYC, 2);

    return $temp;
  }





?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>Calculator</title>
    <link rel="stylesheet" href="./assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="./assets/css/styles.css">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <style>
        

        .table td:nth-child(2){
            font-weight: bold;
        }
        .table td, .table th {
            text-align: start !important;
        }
    </style>
  </head>
  
<script src="assets/bootstrap/js/bootstrap.min.js"></script>
<script src="assets/js/lib/jspdf.umd.js"></script>
<script src="assets/js/lib/html2canvas.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js" integrity="sha512-GsLlZN/3F2ErC5ifS5QtgpiJtWd43JWSuIgh7mbzZ8zBps+dvLusV+eNQATqgA/HdeKFVgA5v3S/cIrLF7QnIg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

<script>

    function printDiv() {
      console.log("print");

      var element = document.getElementById('pdf-Body');

      var opt = {
        pagebreak: { mode: 'avoid-all', after: '' },
        
        margin:       [5, 0, 0, 0],
        filename:     'PCSC Report.pdf',
        image:        { type: 'jpeg', quality: 0.99,  },
        html2canvas:  { logging: true, dpi: 192, letterRendering: true,},
        jsPDF:        { unit: 'mm', format: 'A4', orientation: 'portrait', } //"mm", "cm", "in", "px", "pc", "em" or "ex"
      };

      html2pdf().set(opt).from(element).save();

    }


    function getPdf(vaklue, match){
        window.jsPDF = window.jspdf.jsPDF;
        var style = match ? 'portrait':'landscape';
        var doc = new jsPDF(style,'mm','a4');
        
        // Source HTMLElement or a string containing HTML.
        var elementHTML = document.getElementById("contnet");
        var options = {
            pagebreak: { mode: 'avoid-all', after: '.page' },
            pagesplit: false,
        };
        doc.html(elementHTML, {
            callback: function(doc) { 
                var pageCount = doc.internal.getNumberOfPages();
                var toPage = 2;
                for (let i = pageCount; i > toPage; --i)
                    doc.deletePage(i);
                
                doc.save('calculatedReport.pdf');
            },
            x: 5,
            y: 5,
            width: vaklue, //target width in the PDF document
        
            windowWidth: 1350, //window width in CSS pixels
        });

    }
</script>
<body>
    
    <div class="container" id="contnet">
      <!-- Header btn -->
      <div class="row head">
        <div class="col-md-12 d-flex justify-content-between">
          <div>
            <button class="btn btn-outline-danger" onclick="window.history.back();"><i class="fa-solid fa-arrow-left"></i> Back</button>
            <button class="btn btn-success" onclick="window.location.replace('index.html');">Add new Report</button>
          </div>
            

          <button class="btn btn-primary" onclick="printDiv()"><i class="fa-solid fa-file-pdf"></i> Save Pdf</button>
        </div>
      </div>
      
      <!-- Printer Body -->
      <div class="row">
        <div id="pdf-Body" class="col-md-12">
          <!-- Page 1 -->
          <div class="row page">
            
            <!-- Header -->
            <div class="row">
              
                <div class="col col-md-12 d-flex justify-content-end">
                  <div class="col col-md-2 d-flex justify-content-end">
                    <img class="logoImage" src="assets/img/logo.png" alt="CompanyLogo">
                  </div>
                </div>
            </div>
            
            <!-- Title -->
              <div class="row">
                <div id="title" class="col col-md-12 d-flex flex-column justify-content-center">
                  <h1>PPCC Report</h1>
                  <strong class="d-flex justify-content-center">Pre Product Cost Calculator</strong>
                </div>
              </div> 

              <!-- Normal Information -->
              <div class="row">
                <div class="col-md-12">
                  <table class="table" id="basicInfo">
                    <thead>
                      <tr>
                        <th colspan="6">Basic Information</th>
                      </tr>
                      <tr>
                        <th style="width: 5%;"></th>
                        <th>Title</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1.</td>
                        <td>Employee Name</td>
                        <td><?php echo $BasicInfo['EName'] ?></td>
                      </tr>
                      <tr>
                        <td>2.</td>
                        <td>Client Name</td>
                        <td><?php echo $BasicInfo['CName'] ?></td>
                      </tr>
                      <tr>
                        <td>3.</td>
                        <td>Product Type</td>
                        <td><?php echo $BasicInfo['PName'] ?></td>
                      </tr>
                      <tr>
                        <td>4.</td>
                        <td>No of Yarn</td>
                        <td><?php echo $BasicInfo['NYarn'] ?></td>
                      </tr>

                      <tr>
                        <td>5.</td>
                        <td>Stock Type</td>
                        <td><?php echo $BasicInfo['SType'] ?></td>
                      </tr>

                      <?php echo $BasicInfo['isC'];
                      
                      ?>
                      <tr>
                        <td><?php echo ($BasicInfo['isC'] != "" ? "7. ":"6. ")?></td>
                        <td>Date</td>
                        <td><?php echo $BasicInfo['Date'] ?></td>
                      </tr> 
                      
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Yearn Mixuter -->
              <div class="row">
                <div class="col col-md-12">
                  <table class="table" cellspacing="0">
                    <thead>
                      <tr >
                        <th colspan="6">Product Information(<?php echo $_POST['YarnMixture']; ?>)</th>
                      </tr>

                      <tr>
                        <th style="width: 5%;"></th>
                        <th>Yarn name</th>
                        <th>Yarn Rate(lbs)</th>
                        <th>Yarn Price(Kg)</th>
                        <th>Percentage</th>
                        <th>Total per Yarn Cost(Kg)</th>
                      </tr>
                    </thead>
                    <tbody id="mixtureBody">
                      <?php
                      $perYarn = 0;
                      $total = 0;
                      for ($i = 0; $i < $BasicInfo['NYarn']; $i++) {
                          $temp = ProductInfo($i);
                          $total += $temp['Total'];
                          echo $temp["Template"];
                      }
                      ?>
                    </tbody>
                    <tfoot>
                      <?php echo '<tr><th></th><th colspan=3>Total Yarn Cost</th><th>100%</th><th>';
                            echo round($total,2);
                            echo ' PKR</th></tr>'; ?>
                    </tfoot>
                  </table>
                </div>
              </div>

              <!-- Per Piece  -->
              <div class="row">
                <div class="col col-md-12">
                  <table class="table" cellspacing="0">
                    <thead>
                      <tr>
                        <th colspan="4">Per Piece Information</th>
                      </tr>

                      <tr>
                        <th style="width: 5%;"></th>
                        <th>Categories</th>
                        
                        <?php echo ($_POST["Product"] == "Apparel" ? "<th>Width</th><th>Length</th><th>Total</th>": "<th></th>")?>
                      </tr>
                    </thead>
                    <tbody>
                    <?php
                    

                    $temp = '';
                    $PerPiece = 0;
                    $PerPieceTotal = 0;


                    function get($value){
                      if($value[2] == 1){
                        $GLOBALS["PerPieceTotal"] = $GLOBALS["PerPiece"] * ($_POST[$value[1]] * .01);
                        $temp = "<td>".$_POST[$value[1]]."%</td>" ;
                      }else {
                        $GLOBALS["PerPieceTotal"] = $_POST[$value[1]."_W"] * $_POST[$value[1]."_H"] * $value[3];
                        $temp = "<td>".$_POST[$value[1]."_W"]."</td><td>".$_POST[$value[1]."_H"]."</td>";
                      }

                      return $temp;
                    }

                    if($_POST["Product"] == "Apparel"){
                      foreach ($RowDetails_ApparelPiece as $key => $value) {
                        echo "<tr>
                            <td>".($key + 1)."</td>
                            <td>".$value[0]." x ".$value[3]."</td>
                            ".get($value)."
                            <td>".$PerPieceTotal."</td>
                          </tr>";
                          $PerPiece += $PerPieceTotal;
                      }
                    }else{
                      foreach ($RowDetails_Piece as $key => $value) {
                        echo "<tr>
                            <td>".($key + 1)."</td>
                            <td>".$value[0]."</td>
                            <td>".$_POST[$value[1]]."</td>
                          </tr>";
                        }
                        $gsm = $_POST[$RowDetails_Piece[0][1]];
                        $width = $_POST[$RowDetails_Piece[1][1]];
                        $height = $_POST[$RowDetails_Piece[2][1]];

                        $PerPiece = (($height * $width) / 10000) * $gsm;
                    }
                    $temp = $_POST["Product"] == "Apparel" ? 'colspan=3':'';
                    echo "</tbody><tfoot><tr><th></th><th $temp>Per Weight ".$_POST["Product"] == "Mattress Cover" ? ' X 2 layers':''."</th><th> ".round($PerPiece * ($_POST["Product"] == "Mattress Cover" ? 2 : 1), 2)." gram</th></tr></tfoot>";
                    ?>
                  </table>
                </div>
              </div>

              <!-- Waste -->
              <div class="row">
                <div class="col col-md-12">
                    <table class="table" cellspacing="0">
                      <thead>
                        <tr >
                          <th colspan="4">Production Wastages</th>
                        </tr>
                        <tr>
                          <th style="width: 5%;"></th>
                          <th>Categories</th>
                          <th>Percentages</th>
                          <th>Cost</th>
                        </tr>
                      </thead>
                      <tbody>
                          <?php
                          $totalWaste = 0;
                          $totalWastePercent = 0;
                          $temp = '';
                          $cost = 0;
                          $percent = 0;

                          for ($i = 0; $i < count($WasteArray); $i++) {
                              $percent = $_POST['W' . $WasteArray[$i][1]];
                              $cost = round(($percent / 100) * $total, 2);

                              $totalWastePercent = $totalWastePercent + $percent;
                              $totalWaste = $totalWaste + $cost;

                              $temp =
                                  $temp .
                                  '<tr><td>' .
                                  ($i + 1) .
                                  '</td><td>' .
                                  $WasteArray[$i][0] .
                                  '</td><td>' .
                                  $percent .
                                  '%</span></td><td>' .
                                  $cost .
                                  '</td></tr>';
                          }

                          echo $temp;
                          ?>
                      </tbody>
                      <tfoot>
                            <tr>
                              <th></th>
                              <th>Total Waste</th>

                              <td><span><?php echo round($totalWastePercent, 2); ?></span> %</td>
                              <th><span><?php echo round($totalWaste, 2); ?></span> PKR</th>
                            </tr>
                          </tfoot>
                    </table>
                </div>
              </div>  

              <!-- Fabric Cost -->
              <div class="row">
                <div class="col col-md-12">
                  <table class="table" cellspacing="0">
                    <thead>
                      <tr >
                        <th colspan="3">Fabric Cost Information</th>
                      </tr>

                      <tr>
                        <th></th>
                        <th>Categories</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Total Yarn Cost</td>
                        <td><?php echo $total; ?></td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Weaving / Knitting Cost</td>
                        <td><?php echo $_POST['Knitting']; ?></td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>Fabric Dying Cost</td>
                        <td><?php echo $_POST['Fabrice_Dying']; ?></td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>Total Waste Cost</td>
                        <td><?php echo $totalWaste; ?></td>
                      </tr>
                      <tr>
                        <th></th>
                        <th>Total Fabric Cost <strong class='detailsHeading'>:</strong>
                        </th>
                        <?php
                            $FabricCost_KG = round($total + $_POST['Knitting'] + $_POST['Fabrice_Dying'] + $totalWaste, 2);
                            $FabricCost_PC = round($FabricCost_KG * (round($PerPiece, 2) / 1000), 2);

                            $coverterKG = round(1000 / round($PerPiece, 2), 2);
                        ?>

                        <th id="TotalCost"><?php echo $FabricCost_KG; ?> PKR per KG</th>
                      </tr>
                      <tr>
                        <td>5</td>
                        <td>Per piece weight (in gram)</td>
                        <td><?php echo round($PerPiece, 2) ?> gram</td>
                      </tr>
                      <tfoot>
                        <tr>
                          <th></th>
                          <th>Per Piece Fabric Cost <strong class='detailsHeading'></th>
                          <th><span id="FabriceCost"><?php echo round($FabricCost_PC,2); ?></span> PKR Per Piece</th>
                        </tr>
                      </tfoot>
                    </tbody>
                  </table>
                </div>
              </div>   
          </div>

          <!-- Page 2 -->
          <div class="row">
              <!-- Stock + Per Piece + CMT -->
              <div class="row">
                <!-- CMT  -->
                <div class="col col-12">
                  <table class="table" cellspacing="0">
                    <thead>
                      <tr>
                        <th colspan="5">CMT Cost</th>
                      </tr>

                      <tr>
                        <th style="width: 5%;"></th>
                        <th style="width: 25%;">Categories</th>
                        <th style="width: 25%;">Per PC(<span id="PerPiece"><?php echo $_POST[
                            'Per_piece_Weight'
                        ]; ?></span> gram)</th>
                        <th style="width: 25%;">Per Kg(<span id="Perkg"><?php echo $coverterKG; ?></span> Piece)</th>
                      </tr>
                    </thead>
                    <tbody>

                    <tr>
                        <td>1</td>
                        <td>Fabric Cost</td>
                        <td><?php echo round($FabricCost_PC, 2); ?></td>
                        <td><?php echo $FabricCost_KG; ?> </td>
                      </tr>

                      <?php
                      $counter = 2;
                      $Factory_KG = $FabricCost_KG;
                      $Factory_PC = $FabricCost_PC;

                      foreach ($RowDetails_Factory as $key => $value) {
                          $temp = round($_POST[$value[1]] * $coverterKG, 2);
                          echo "<tr>
                                <td>$counter</td>
                                <td>" .
                              $value[0] .
                              "</td>
                                <td>" .
                              $_POST[$value[1]] .
                              "</td>
                                <td>" .
                              $temp .
                              "</td>
                              </tr>";

                          $counter++;
                          $Factory_KG += $_POST[$value[1]];
                          $Factory_PC += $temp;
                      }
                      ?>

                    </tbody>
                    <tfoot>
                      <tr>
                        <th></th>
                        <th>Total CMT Cost</th>
                        <th><?php echo round($Factory_PC,2); ?></th>
                        <th><?php echo round($Factory_KG,2); ?> </th>
                      </tr>

                    </tfoot>
                  </table>
                </div>
              </div>
          </div>

          <!-- Page 3 -->
          <div class="row page">
            <!-- Net Operation  -->
            <div class="row">
              <div class="col col-md-12">                
                <table class="table" cellspacing="0">
                  <thead>
                    
                    <tr >
                      <th colspan="6">Operating Cost</th>
                    </tr>

                    <tr >
                      <th style="width: 5%;"></th>
                      <th>Categories</th>
                      <th>Percentages</th>
                      <th>Per PC</th>
                      <th>Per Kg</th>
                    </tr>
                  </thead>
                  <tbody>

                    <?php
                    $Operating_KG = 0;
                    $Operating_PC = 0;

                    foreach ($RowDetails_Operation as $key => $value) {
                      if(isset($_POST[$value[1]."_isCheck"]) != 1){
                        $value[2] = 0;
                      }
                      
                      $Operating_KG += round(($_POST[$value[1]] / 100) * $Factory_KG, 2);
                      $Operating_PC += round(($_POST[$value[1]] / 100) * $Factory_PC, 2);

                      echo "<tr>
                              <td>" .($key + 1)."</td>
                              <td>" .$value[0]."</td>
                              <td>" .$_POST[$value[1]]."% </td>
                              <td>" .round(($_POST[$value[1]] / 100) * $Factory_PC, 2) ."</td>
                              <td>" .round(($_POST[$value[1]] / 100) * $Factory_KG, 2) ."</td>
                            </tr>";
                    }
                    ?>                    
                  </tbody>
                  <tfoot>
                    <tr>
                      <th></th>
                      <th colspan="2">Total Operating Cost</th>
                      <th><?php echo round($Operating_PC,2); ?></th>
                      <th><?php echo round($Operating_KG,2); ?></th>
                    </tr>
    
                  </tfoot>
                </table>
              </div>
            </div>
              
            <!-- Net Operation  -->
            <div class="row"> 
              <div class="col col-md-12">
                <table class="table" cellspacing="0">
                    <thead>
                      <tr >
                        <th colspan="5">Finance / Coporate / GP</th>
                      </tr>
                      <tr >
                        <th style="width: 5%;"></th>
                        <th>Categories</th>
                        <th>Percentages</th>
                        <th>Per PC</th>
                        <th>Per KG</th>
                      </tr>
                    </thead>
                    <tbody>
                    <?php

                        $days = $_POST['PaymentDays'];

                        $Finance_PC = $Operating_PC + $Factory_PC;
                        $Finance_KG = $Operating_KG + $Factory_KG;

                        $GP_PC = ($_POST["GP"]/100) * $Finance_PC;
                        $GP_KG = ($_POST["GP"]/100) * $Finance_KG;

                        $RFinance_PC = ($_POST["Finance"]/100) * $Finance_PC;
                        $RFinance_KG = ($_POST["Finance"]/100) * $Finance_KG;

                        $Payment_PC = $days * 0.01 * $Finance_PC;
                        $Payment_KG = $days * 0.01 * $Finance_KG;

                        $Coporate_PC = $GP_PC + $RFinance_PC + $Payment_PC;
                        $Coporate_KG = $GP_KG + $RFinance_KG + $Payment_KG;

                        $Finance_PC = $Finance_PC + $Coporate_PC;
                        $Finance_KG = $Finance_KG + $Coporate_KG;
                      ?>

                      <tr>
                        <td>1</td>
                        <td>Running Finance Cost</td>
                        <td><?php echo $_POST["Finance"] ?> %</td>
                        <td><?php echo round($RFinance_PC, 2); ?></td>
                        <td><?php echo round($RFinance_KG, 2); ?></td>
                      </tr>

                      <tr>
                        <td>2</td>
                        <td>Gross Profit</td>
                        <td><?php echo $_POST["GP"] ?>%</td>
                        <td><?php echo round($GP_PC, 2); ?></td>
                        <td><?php echo round($GP_KG, 2); ?></td>
                      </tr>
                      
                      <tr>
                        <td>3</td>
                        <td>Payment Terms</td>
                        <td>
                          <?php echo ($days == 2 ? '30' : ($days == 4 ? '60': ($days == 6 ? '80' :'120'))) .' Days (' .$days .'%)'; ?>
                        </td>
                        <td><?php echo round($Payment_PC, 2); ?></td>
                        <td><?php echo round($Payment_KG, 2); ?></td>
                      </tr>
                      
                    </tbody>
                    <tfoot>
                      
                      <tr>
                        <th></th>
                        <th colspan="2">Total Finance / Coporate / GP</th>
                        <th><span><?php echo round(
                            $Coporate_PC,
                            2
                        ); ?></span> PKR</th>
                        <th><span><?php echo round(
                            $Coporate_KG,
                            2
                        ); ?></span> PKR</th>
                      </tr>
      
                    </tfoot>
                  </table>
                
              </div>  
            </div>
          
            <div class="row">
              <div class="col col-12">
                <table class="table" cellspacing="0">
                  <thead>
                    <tr >
                      <th colspan="4">Final Price For Customer</th>
                    </tr>

                    <tr >
                      <th style="width: 5%;"></th>
                      <th style="width: 25%;">Title</th>
                      <th style="width: 25%;">Per PC</th>
                      <th style="width: 25%;">Per Kg</th>
                      <?php echo ($_POST["Stock"] == "Per Pack" ? "<th style='width: 25%;'>Per Pack</th>": "")?>
                    </tr>
                  </thead>
                  <tbody id="NetCost">
                    <tr>
                      <th>1</th>
                      <th>Cost in PKR</th>
                      <td><?php echo round($Finance_PC, 2); ?> PKR Per PC</td>
                      <td><?php echo round($Finance_KG, 2); ?> PKR Per KG</td>
                      <?php echo ($_POST["Stock"] == "Per Pack" ? "<td>".round($Finance_PC * $_POST["PackSize"], 2)." PKR Per Pack</td>": "")?>
                    </tr>
                    <?php if($_POST["isCurrency"] == "on"){
                      echo "<tr>
                      <th>2</th>
                      <th>Cost in ".$_POST["CurrencyName"]."</th>
                      <td>".round(($Finance_PC) / $_POST["CurrencyRate"], 2)." ".$_POST["CurrencyName"]." Per PC</td>
                      <td>".round($Finance_KG / $_POST["CurrencyRate"], 2)." ".$_POST["CurrencyName"]." Per KG</td>
                      ".($_POST["Stock"] == 'Per Pack' ? '<td>'.round(($Finance_PC * $_POST["PackSize"]) / $_POST["CurrencyRate"], 2)." ".$_POST["CurrencyName"].' Per Pack</td>':'')."</tr>";
                    }?>
                  </tbody>
                  
                </table>
              </div>
            </div>
          </div>

        </div>
    </div>
  </div>
      


</body>
</html>