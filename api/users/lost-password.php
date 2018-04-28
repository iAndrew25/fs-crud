<?php
	require_once("./../database/connect.php");
	require_once("./../utils.php");

	$request_body = file_get_contents('php://input');
	if(isset($request_body)) {
		$data = json_decode($request_body);
		$checkUser = userExists($data->email);

		if($checkUser) {
			$changed = changePassword($data->email);

			if(isset($changed)) {
				//email send
				http_response_code(200);
				echo json_encode(setResult(true, 'Success!', null));
			} else {
				http_response_code(500);
				echo json_encode(setResult(true, 'Something happened!', $response));
			}
		} else {
			http_response_code(404);
			echo json_encode(setResult(false, 'Email not found.', null));
		}
	}
?>