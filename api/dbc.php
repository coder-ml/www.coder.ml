<?php
$con = mysqli_connect("", "", "", "");
if(mysqli_connect_errno()) { $log = "Failed to connect to MySQL: ".mysqli_connect_error().'<br>'; echo $log; }
else { mysqli_set_charset($con,'utf8mb4'); }
?>
