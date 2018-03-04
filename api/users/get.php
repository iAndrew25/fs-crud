<?php
	require_once("./../database/connect.php");
	require_once("./../utils.php");

	$tokenId = $_GET["tokenId"];
	if(isset($tokenId)) {
		$userData = getUserByToken($tokenId);

		if(isset($userData)) {
			http_response_code(200);
			echo json_encode(setResult(true, 'Success!', $userData));
		} else {
			http_response_code(500);
			echo json_encode(setResult(false, 'Something happened.', null));
		}
	} else {
		http_response_code(404);
		echo json_encode(setResult(false, 'No token set.', null));
	}
?>