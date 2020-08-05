# board-made-by-nodejscrud-module-mysql-ejs-fs-express-body-parser-

#mysql
create table board(
	id int not null auto_increment primary key,
	title varchar(100) not null,
	content varchar(500) not null,
	wdate varchar(10) not null
)


CREATE TABLE `board_repl` (
	`id` INT(10,0) NOT NULL AUTO_INCREMENT,
	`parent_id` INT(10,0) NOT NULL,
	`content` VARCHAR(500) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`wdate` VARCHAR(10) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
AUTO_INCREMENT=2
;

