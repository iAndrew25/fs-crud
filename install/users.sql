CREATE TABLE users (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(160),
	email VARCHAR(160),
	password VARCHAR(160),
	token VARCHAR(160),
	phone VARCHAR(160),
	boiler BOOLEAN DEFAULT FALSE,
	flat INT
)

CREATE TABLE user_ids (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	user_id INT,
	ck INT,
	csb INT,
	cbb INT,
	hk INT,
	hsb INT,
	hbb INT,
	created_date INT
)