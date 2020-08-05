# board-made-by-nodejscrud-module-mysql-ejs-fs-express-body-parser-

#mysql
create table board(
	id int not null auto_increment primary key,
	title varchar(100) not null,
	content varchar(500) not null,
	wdate varchar(10) not null
)
