CREATE TABLE users (
	id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(160),
	email VARCHAR(160),
	password VARCHAR(160),
	token VARCHAR(160),
	phone VARCHAR(160),
	boiler BOOLEAN DEFAULT FALSE,
	flat INT(6)
)