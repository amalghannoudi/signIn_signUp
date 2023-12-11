<?php
/* getUserById */
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once ('database.php');


$mycnx = mysqli_connect($host, $user, $password, $database);
$id = $_GET['id'];
  $sql = "SELECT * FROM compte WHERE id = $id";

  $result = $mycnx->query($sql);

  if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode($row);
  } else {
    echo "No data found";
  }

  $mycnx->close();
?>