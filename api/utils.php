<?php
	require_once('database/connect.php');

	function signup($name, $email, $password, $token) {
		global $con;
		return mysqli_query($con, "INSERT INTO users(name, email, password, token) VALUES('$name', '$email', '$password', '$token')") ? true : false;
	}

	function userExists($email) {
		global $con;
		$email = sanitize($email);

		return mysqli_num_rows(mysqli_query($con, "SELECT * FROM users WHERE email = '$email'")) == 1 ? true : false;
	}

	function login($email, $password) {
		global $con;
		$email = sanitize($email);
		$userID = userIdFromEmail($email);
		$password = $password;//md5(sanitize($password));

		return mysqli_num_rows(mysqli_query($con, "SELECT * FROM users WHERE email = '$email' AND password = '$password'")) == 1 ? $userID : false;
	}

	function userIdFromEmail($email) {
		global $con;
		$email = sanitize($email);

		return mysqli_fetch_array(mysqli_query($con, "SELECT id FROM users WHERE email = '$email'"), MYSQLI_ASSOC)['id'];
	}
	
	function userData($userID) {
		global $con;
		$userID = (int)$userID;

		return mysqli_fetch_array(mysqli_query($con, "SELECT email, name, phone, token FROM users WHERE id = $userID"), MYSQLI_ASSOC);
	}

	function getUserByToken($token) {
		global $con;
		$token = sanitize($token);

		return mysqli_fetch_array(mysqli_query($con, "SELECT email, name FROM users WHERE token = '$token'"), MYSQLI_ASSOC);
	}

	function sanitize($data) {
		global $con;
		return htmlspecialchars(mysqli_real_escape_string($con, $data));
	}

	function setResult($success, $message, $payload) {
		$result = new stdClass();
		$result->success = $success;
		$result->message = $message;
		$result->payload = $payload;
		return $result;
	}

	function generateRandomString() {
		return bin2hex(random_bytes(5));
	}

?>