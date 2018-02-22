<?php
	global $con;
	$con = mysqli_connect("localhost", "root", "", "labloc");

	if(mysqli_connect_errno()) {
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}
?>