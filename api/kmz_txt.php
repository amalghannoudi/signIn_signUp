<?php
/* converitir du KMZ en TXT */
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: PUT, GET, POST");
header('Access-Control-Allow-Headers:Content-Type,Authorization,X-Requested-With');
header('Content-Type:application/json;charset=UTF-8');

$coordinates = array();

$file_kmz = $_FILES['file']['tmp_name'];
/*extraire zip*/
$zip = new ZipArchive;

if ($zip->open($file_kmz) === TRUE) {
    $kml = $zip->getFromName('doc.kml');
    $xml = simplexml_load_string($kml);

    // parcourir le fichier kml pour extraire coordinates
    foreach ($xml->Document->Placemark as $placemark) {
        
        $coord_string = (string) $placemark->LineString->coordinates;
        $coord_array = explode(',0', $coord_string);

        foreach ($coord_array as $coord) {
            $coord_parts = explode(',', $coord);
    
                if (count($coord_parts) == 2) {
                    list($longitude, $latitude) = $coord_parts;

                    list($longitude, $latitude) = explode(',', $coord);

            // Convertir en valeurs numérique
            $latitude = floatval($latitude);
            $longitude = floatval($longitude);
            if (($longitude!=0 ) || ($latitude!=0))
            // api
            {$url = "https://api.opentopodata.org/v1/srtm30m?locations=$latitude,$longitude";
            $response = file_get_contents($url);
            $data = json_decode($response, true);

            if (isset($data['status']) && $data['status'] === 'OK') {
                $elevation = $data['results'][0]['elevation'];
            } else {
                $elevation = null;
            }

            $coordinates[] = array(
                'latitude' => $latitude,
                'longitude' => $longitude,
                'elevation' => $elevation
            );
        }}}
    }

    $json = json_encode($coordinates);

    file_put_contents('coordinates3D.json', $json);

    header('Content-Type: application/json');
    echo $json;
}
?>
