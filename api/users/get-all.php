<?php
	require_once("./../database/connect.php");
	require_once("./../utils.php");

	$tokenId = $_GET["tokenId"];
	if(isset($tokenId)) {
		$userIds = getAll($tokenId);

		if(isset($userIds)) {
			http_response_code(200);
			echo json_encode(setResult(true, 'Success!', $userIds));
		} else {
			http_response_code(500);
			echo json_encode(setResult(false, 'Something happened.', null));
		}
	} else {
		http_response_code(404);
		echo json_encode(setResult(false, 'No token set.', null));
	}
?>