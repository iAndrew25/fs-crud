<?php
	require_once("./../database/connect.php");
	require_once("./../utils.php");

	$request_body = file_get_contents('php://input');
	if(isset($request_body)) {
		$data = json_decode($request_body);
		$response = setIds($data);

		//if($response) {
			http_response_code(200);
			echo json_encode(setResult(true, 'Success!', $response));
		//} else {
		//	http_response_code(400);
		//	echo json_encode(setResult(false, 'Something happened.', null));
		//}
	}
?>