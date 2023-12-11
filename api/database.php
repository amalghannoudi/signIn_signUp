<?php
$host = "localhost";
$user = "root";
$password = "";
$database = "pfe";

$mycnx = new mysqli($host, $user, $password, $database);

if ($mycnx->connect_errno) {
  echo "Failed to connect to MySQL: " . $mycnx->connect_error;
  exit();
}
?>