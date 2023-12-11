<?php
/*convertir du KML en TXT*/
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: PUT, GET, POST");
header('Access-Control-Allow-Headers:Content-Type,Authorization,X-Requested-With');
header('Content-Type:application/json;charset=UTF-8');

/* ouvrir le fichier */
$file = $_FILES['file']['tmp_name'];

$kml = file_get_contents($file);
$xml = simplexml_load_string($kml);

$coordinates = '';

// parcourir pour extraire les coordonées
foreach ($xml->Document->Placemark as $placemark) {
    $coord_string = (string) $placemark->LineString->coordinates;
    $coord_array = explode(',0', $coord_string);
   for ($i=0;$i<count($coord_array);$i++)
   {  
    $coordinates .= $coord_array[$i] . "\n";
   }
}

header('Content-Type: text/plain');
echo $coordinates;




?>