USE restaurant_trilogy;

CREATE TABLE users(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(70) NOT NULL, 
    lastname VARCHAR(70) NOT NULL,
    username VARCHAR(70) NOT NULL UNIQUE,
    password VARCHAR(99) NOT NULL,
    type_account VARCHAR(45) NOT NULL,
    created_at VARCHAR(45)
);

CREATE TABLE reservations(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    persons VARCHAR(45) NOT NULL,
    tables VARCHAR(45) NOT NULL,
    type_contact VARCHAR(45) NOT NULL,
    data_contact VARCHAR(45) NOT NULL,
    reservation_time VARCHAR(45) NOT NULL,
    reservation_date VARCHAR(45) NOT NULL,
    created_at VARCHAR(45),
    updated_at VARCHAR(45),
    
    userId INT,
    CONSTRAINT  fk_user_reservations FOREIGN KEY(userId) REFERENCES users(id)
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);


