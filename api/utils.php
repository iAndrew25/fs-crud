<?php
	require_once('database/connect.php');

	function userExists($email) {
		global $con;
		$email = sanitize($email);

		return mysqli_num_rows(mysqli_query($con, "SELECT * FROM users WHERE email = '$email' OR username = '$email'")) == 1 ? true : false;
	}

	function login($email, $password) {
		global $con;
		$email = sanitize($email);
		$userID = userIdFromEmail($email);
		$password = md5(sanitize($password));
		$passwordFirstLog = sanitize($password);

		return mysqli_num_rows(mysqli_query($con, "SELECT * FROM users WHERE (email = '$email' OR username = '$email') AND (password = '$password' OR password = '$passwordFirstLog"))) == 1 ? $userID : false;
	}

	function userIdFromEmail($email) {
		global $con;
		$email = sanitize($email);

		return mysqli_fetch_assoc(mysqli_query($con, "SELECT id FROM users WHERE email = '$email' OR username = '$email'"))['id'];
	}
	
	function userData($userID) {
		global $con;
		$userID = (int)$userID;

		return mysqli_fetch_assoc(mysqli_query($con, "SELECT email, name, phone, token, id, username, role FROM users WHERE id = $userID"));
	}

	function getUserByToken($token) {
		global $con;
		$token = sanitize($token);

		return mysqli_fetch_assoc(mysqli_query($con, "SELECT email, name, id, phone, role FROM users WHERE token = '$token'"));
	}

	function getIdsByToken($token) {
		global $con;
		$token = sanitize($token);
		$userId = getUserByToken($token)['id'];

		if(isset($userId)) {
			$ids = array();
			$result = mysqli_query($con, "SELECT * FROM user_ids WHERE user_id = $userId");
			while($row = mysqli_fetch_assoc($result)) {
				$ids[] = $row;
			}

			return $ids;
		} else {
			return false;
		}
	}

	function sanitize($data) {
		global $con;
		return htmlspecialchars(mysqli_real_escape_string($con, $data));
	}

	function setIds($data) {
		global $con;
		// check if user id exists
		$user_id = sanitize($data->user_id ?: 0);
		$ck = sanitize($data->ck ?: null);
		$csb = sanitize($data->csb ?: null);
		$cbb = sanitize($data->cbb ?: null);
		$hk = sanitize($data->hk ?: null);
		$hsb = sanitize($data->hsb ?: null);
		$hbb = sanitize($data->hbb ?: null);
		$created_date = sanitize($data->created_date ?: 0);
		$mode = sanitize($data->mode);

		if($mode == 'EDIT') {
			$id = sanitize($data->id ?: null);
			return mysqli_query($con, "UPDATE user_ids SET ck = '$ck', csb = '$csb', cbb = '$cbb', hk = '$hk', hsb = '$hsb', hbb = '$hbb' WHERE id = $id") ? true : false;
		} else if($mode == 'ADD') {
			return mysqli_query($con, "INSERT INTO user_ids(user_id, ck, csb, cbb, hk, hsb, hbb, created_date) VALUES('$user_id', '$ck', '$csb', '$cbb', '$hk', '$hsb', '$hbb', '$created_date')") ? true : false;
		} else {
			return false;
		}
	}

	function changePassword($email) {
		global $con;

		$email = sanitize($email ?: null);
		$newPass = generateRandomString();
		$encryptedPass = md5($newPass);

		return mysqli_query($con, "UPDATE users SET password = '$encryptedPass' WHERE email = '$email'") ? $newPass : false;
	}

	function setUser($user) {
		global $con;

		$user_id = sanitize($user->id ?: 0);
		$name = sanitize($user->name ?: 0);
		$phone = sanitize($user->phone ?: 0);
		$email = sanitize($user->email ?: 0);
		$password = md5(sanitize($user->password ?: 0));
		$mode = sanitize($user->mode ?: 0);

		if($mode == 'FIRST_LOG') {
			$token = md5(generateRandomString() . $email);
			return mysqli_query($con, "UPDATE users SET name = '$name', phone = '$phone', email = '$email', password = '$password', token = '$token' WHERE id = '$user_id'") ? true : false;
		} else {
			if($mode == 'CHANGE_INFO') {
				return mysqli_query($con, "UPDATE users SET phone = '$phone', email = '$email' WHERE id = '$user_id'") ? true : false;
			} else if($mode == 'CHANGE_PASSWORD') {
				return mysqli_query($con, "UPDATE users SET phone = '$phone', email = '$email', password = '$password' WHERE id = '$user_id'") ? true : false;		
			} else {
				return false;
			}
		}
	}

	function getAll($token) {
		global $con;
		$token = sanitize($token);
		$userRole = getUserByToken($token)['role'];

		if($userRole == 'ADMIN') {
			$ids = array();
			$query = "SELECT 
				user_ids.id, 
				user_ids.ck, 
				user_ids.csb, 
				user_ids.cbb, 
				user_ids.hk, 
				user_ids.hsb, 
				user_ids.hbb, 
				user_ids.created_date,
				users.name, 
				users.phone, 
				users.boiler, 
				users.flat
				FROM users
				INNER JOIN user_ids ON users.id = user_ids.user_id";

			$result = mysqli_query($con, $query);
			while($row = mysqli_fetch_assoc($result)) {
				$ids[] = $row;
			}
			return $ids;
		} else {
			return false;
		}
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