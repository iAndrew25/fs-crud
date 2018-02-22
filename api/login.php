<?php
	require_once('database/connect.php');
	require_once('utils.php');

	$request_body = file_get_contents('php://input');
	if(isset($request_body)) {
		$data = json_decode($request_body);
		if(userExists($data->email)) {
			$userId = login($data->email, $data->password);
			if($userId) {
				http_response_code(200);
				echo json_encode(setResult(true, 'Success!', userData($userId)));
			} else {
				http_response_code(400);
				echo json_encode(setResult(false, 'Incorrect password.', null));
			}
		} else {
			http_response_code(404);
			echo json_encode(setResult(false, 'The e-mail you entered does not exist in our database.', null));
		}
	}
?>