// 모듈을 추출합니다.
var fs = require("fs");
var ejs = require("ejs");
var mysql = require("mysql");
var express = require("express");
var bodyParser = require("body-parser");

// 데이터베이스와 연결합니다.
var client = mysql.createConnection({
  user: "root",
  password: "1234",
  database: "Company",
});

// 서버를 생성합니다.
var app = express();
app.use("/css", express.static("css")); //css폴더 사용
app.use(bodyParser.urlencoded({ extended: false }));

// 서버를 실행합니다.
app.listen(52273, function () {
  console.log("server running at http://127.0.0.1:52273");
});

// 라우트(url이동)를 수행합니다.
app.get("/", function (request, response) {
  // 파일을 읽습니다.
  fs.readFile("board_list.html", "utf8", function (error, data) {
    // 데이터베이스 쿼리를 실행합니다.
    client.query("SELECT * FROM board order by id desc", function (
      error,
      results
    ) {
      // 응답합니다.
      response.send(
        ejs.render(data, {
          data: results,
        })
      );
    });
  });
});

// 등록 링크를 눌렀을 때
app.get("/insert", function (request, response) {
  // 파일을 읽습니다.
  fs.readFile("board_insert.html", "utf8", function (error, data) {
    // 응답합니다.
    response.send(data);
  });
});

//form에 데이터입력후 submit버튼을 눌렀을 때
app.post("/insert", function (request, response) {
  // 변수를 선언합니다.
  var body = request.body;
  var d = new Date();
  var year = d.getFullYear(); //년도
  var month = d.getMonth() + 1; //월. 1을 더해줘야 함.
  var date = d.getDate(); //일
  if (month < 10) {
    month = "0" + month;
  }
  if (date < 10) {
    date = "0" + date;
  }
  var ymd = year + "-" + month + "-" + date;
  // 데이터베이스 쿼리를 실행합니다.
  client.query(
    "INSERT INTO board (title, content, wdate) VALUES (?, ?, ?)",
    [body.title, body.content, ymd],
    function () {
      // 응답합니다.
      response.redirect("/"); //목록으로 이동.
    }
  );
});

// title링크를 클릭했을 때
app.get("/content/:id", function (request, response) {
  // 파일을 읽습니다.
  fs.readFile("board_content.html", "utf8", function (error, data) {
    // 데이터베이스 쿼리를 실행합니다.
    client.query(
      "SELECT * FROM board WHERE id = ?",
      [request.params.id],
      function (error, result1) {
        // 데이터베이스 쿼리를 실행합니다.
        client.query(
          "SELECT * FROM board_repl WHERE parent_id = ?",
          [request.params.id],
          function (error, result2) {
            // 응답합니다.
            response.send(
              ejs.render(data, {
                data: result1[0],
                data2: result2,
              })
            );
          }
        );
      }
    );
  });
});

// edit링크를 클릭했을 때
app.get("/edit/:id", function (request, response) {
  // 파일을 읽습니다.
  fs.readFile("board_edit.html", "utf8", function (error, data) {
    // 데이터베이스 쿼리를 실행합니다.
    client.query(
      "SELECT * FROM board WHERE id = ?",
      [request.params.id],
      function (error, result) {
        // 응답합니다.
        response.send(
          ejs.render(data, {
            data: result[0],
          })
        );
      }
    );
  });
});

//edit form에 데이터입력후 submit을 클릭했을 때
app.post("/edit/:id", function (request, response) {
  // 변수를 선언합니다.
  var body = request.body;

  // 데이터베이스 쿼리를 실행합니다.
  client.query(
    "UPDATE board SET title=?, content=?, wdate=? WHERE id=?",
    [body.title, body.content, body.wdate, request.params.id],
    function () {
      // 응답합니다.
      response.redirect("/"); //목록으로 이동
    }
  );
});

app.get("/delete/:id", function (request, response) {
  // 데이터베이스 쿼리를 실행합니다.
  client.query(
    "DELETE FROM board WHERE id=?",
    [request.param("id")],
    function () {
      // 응답합니다.
      response.redirect("/");
    }
  );
});
