<?php
	require_once('database/connect.php');
	require_once('utils.php');

	$request_body = file_get_contents('php://input');
	if(isset($request_body)) {
		$data = json_decode($request_body);
		if(userExists($data->email)) {
			http_response_code(400);
			echo json_encode(setResult(false, 'Email already exists.', null));
		} else {
			if(!filter_var($data->email, FILTER_VALIDATE_EMAIL)) {
				http_response_code(400);
				echo json_encode(setResult(false, 'Invalid email.', null));
			} else {
				$email = sanitize($data->email);
				$name = sanitize($data->name);
				$pass = generateRandomString();
				$token = md5(generateRandomString() . $email);

				if(signup($name, $email, $pass, $token)) {
					//send email
					http_response_code(200);
					echo json_encode(setResult(true, 'Your account has been successfully created. You will receive the password on the provided e-mail. Please change it ASAP.', null));
				} else {
					http_response_code(500);
					echo json_encode(setResult(false, 'Something happened.', null));
				}
			}
		}
	}
?>