// http://localhost:8000/index.html
//('Poll', 'Image', 'Doc','Text')

const express = require("express");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/" + "uploads");
  },
  filename: (req, file, cb) => {
    console.log("file:" + file);
    console.log("name: " + Date.now() + path.extname(file.originalname))
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
const app = express();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.static("public"));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const port = 8000;
app.listen(port, () => {
  console.log("listen port 8000");
});

const { createPool } = require("mysql");
const pool = createPool({
  host: "132.145.18.222",
  user: "acs2000",
  password: "wnd2VKSANY5",
  database: "acs2000",
  connectionLimit: 3,
});



// ----------------------------------------------
// REAL CASES START HERE
// ----------------------------------------------

// RESOURCE GETTERS
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/" + "pages/login.html");
});

// CSS getters
app.get("/stylesheet", function (req, res) {
  res.sendFile(__dirname + "/" + "styles/stylesheet.css");
});

app.get("/styles", function (req, res) {
  res.sendFile(__dirname + "/" + "styles/styles.css");
});

app.get("/calendarCSS", function (req, res) {
  res.sendFile(__dirname + "/" + "styles/calendarCSS.css");
});

// HTML getters
app.get("/registration", function (req, res) {
  res.sendFile(__dirname + "/" + "pages/registration.html");
});

app.get("/login", function (req, res) {
  res.sendFile(__dirname + "/" + "pages/login.html");
});

app.get("/homepage", function (req, res) {
  res.sendFile(__dirname + "/" + "pages/homepage.html");
});

app.get("/calendar", function (req, res) {
  res.sendFile(__dirname + "/" + "pages/calendar.html");
});

app.get("/settings", function (req, res) {
  res.sendFile(__dirname + "/" + "pages/settings.html");
});

app.get("/settingsProfile", function (req, res) {
  res.sendFile(__dirname + "/" + "pages/settingsProfile.html");
});

app.get("/settingsThread", function (req, res) {
  res.sendFile(__dirname + "/" + "pages/settingsThread.html");
});

app.get("/server", function (req, res) {
  res.sendFile(__dirname + "/" + "pages/server.html");
});

app.get("/quill", function (req, res) {
  res.sendFile(__dirname + "/" + "pages/quill.html");
});

// JS getters
app.get("/login-registration", function (req, res) {
  res.sendFile(__dirname + "/" + "scripts/login-registration.js");
});

app.get("/scriptjavascript", function (req, res) {
  res.sendFile(__dirname + "/" + "scripts/javascript.js");
});

app.get("/comment", function (req, res) {
  res.sendFile(__dirname + "/" + "scripts/comment.js");
});

app.get("/app", function (req, res) {
  res.sendFile(__dirname + "/" + "scripts/app.js");
});

app.get("/addthread", function (req, res) {
  res.sendFile(__dirname + "/" + "scripts/addthread.js");
});

app.get("/creategroup", function (req, res) {
  res.sendFile(__dirname + "/" + "scripts/creategroup.js");
});

app.get("/deleteserver", function (req, res) {
  res.sendFile(__dirname + "/" + "scripts/deleteserver.js");
});

app.get("/get_user_servers", function (req, res) {
  res.sendFile(__dirname + "/" + "scripts/get_user_servers.js");
});

app.get("/loadComments", function (req, res) {
  res.sendFile(__dirname + "/" + "scripts/loadComments.js");
});

app.get("/loadserver", function (req, res) {
  res.sendFile(__dirname + "/" + "scripts/loadserver.js");
});

app.get("/loadthread", function (req, res) {
  res.sendFile(__dirname + "/" + "scripts/loadthread.js");
});

app.get("/popupmenu", function (req, res) {
  res.sendFile(__dirname + "/" + "scripts/popupmenu.js");
});

app.get("/popupmenuserver", function (req, res) {
  res.sendFile(__dirname + "/" + "scripts/popupmenuserver.js");
});

app.get("/threadcomment", function (req, res) {
  res.sendFile(__dirname + "/" + "scripts/threadcomment.js");
});

app.get("/textpost", function (req, res) {
  res.sendFile(__dirname + "/" + "scripts/textpost.js");
});

app.get("/newquill", function (req, res) {
  res.sendFile(__dirname + "/" + "scripts/newquill.js");
});

app.get("/addmember", function (req, res) {
  res.sendFile(__dirname + "/" + "scripts/addmember.js");
});

app.get("/getuserinfo", function (req, res) {
  res.sendFile(__dirname + "/" + "scripts/getuserinfo.js");
});



// DATABASE STUFF - TODO MAYBE SPLIT INTO GETTERS, SETTERS, CHANGERS and DELETERS

app.post("/add_new_user", upload.none(), (req, res) => { // insertId in the response gives the ID

  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;
  let firstname = req.body.firstname;
  let surname = req.body.surname;

  let query = "INSERT INTO `User`(username, password, email, firstname, surname, gender) VALUES ('"+username+"','"+password+"','"+email+"','"+firstname+"','"+surname+"', 'default')";

  pool.query(query, (err, queryResult, fields) => {
    if (err) {
      res.send(err);
      return console.log(err);
    }
    res.end(JSON.stringify(queryResult.insertId));
    return console.log(queryResult);
  });
});

app.post("/get_user_pass", upload.none(), (req, res) => {

  let email = req.body.email;

  let query = "SELECT password FROM User WHERE User.email = '"+email+"'";

  pool.query(query, (err, queryResult, fields) => {
    if (err) {
      res.send(err);
      return console.log(err);
    }
    res.end(JSON.stringify(queryResult));
    return console.log(queryResult);
  });
});

app.post("/get_user_info", upload.none(), (req, res) => {

  let userId = req.body.userId;

  let query = "SELECT * FROM User WHERE User.userid = '"+userId+"'";

  pool.query(query, (err, queryResult, fields) => {
    if (err) {
      res.send(err);
      return console.log(err);
    }
    res.end(JSON.stringify(queryResult));
    return console.log(queryResult);
  });
});

app.post("/get_user_id", upload.none(), (req, res) => {

  let email = req.body.email;

  let query = "SELECT userid FROM User WHERE User.email = '"+email+"'";

  pool.query(query, (err, queryResult, fields) => {
    if (err) {
      res.send(err);
      return console.log(err);
    }
    res.end(JSON.stringify(queryResult[0].userid));
    return console.log(queryResult);
  });
});

app.post("/delete_user", upload.none(), (req, res) => {

  let userId = req.body.userId;

  let query = "DELETE FROM User WHERE User.userId = '"+userId+"'";

  pool.query(query, (err, queryResult, fields) => {
    if (err) {
      res.send(err);
      return console.log(err);
    }
    res.end(JSON.stringify(queryResult.insertId));
    return console.log(queryResult);
  });
});

app.post("/add_server", upload.none(), (req, res) => {

  let creatorId = req.body.creatorId;
  let name = req.body.name;
  let description = req.body.description;

  let query = "INSERT INTO Server(creatorid, name, description) VALUES ('"+creatorId+"','"+name+"','"+description+"')";

  pool.query(query, (err, queryResult, fields) => {
    if (err) {
      res.send(err);
      return console.log(err);
    }
    let serverId = queryResult.insertId;
    let query1 = "INSERT INTO Userinserver(serverid, userid, permission) VALUES ('"+serverId+"','"+creatorId+"', 'creator')";

    pool.query(query1, (err, queryResult, fields) => {
      if (err) {
        res.send(err);
        return console.log(err);
      }
      return console.log(queryResult);
    });

    res.end(JSON.stringify(queryResult.insertId));
    return console.log(queryResult);
  });
});

app.post("/delete_server", upload.none(), (req, res) => {

  let serverId = req.body.serverId;

  let query = "DELETE FROM Server WHERE Server.serverId = '"+serverId+"'";

  pool.query(query, (err, queryResult, fields) => {
    if (err) {
      res.send(err);
      return console.log(err);
    }
    res.end(JSON.stringify(queryResult.insertId));
    return console.log(queryResult);
  });
});

// Adding threads

app.post("/add_text_thread", upload.none(), (req, res) => {

  let title = req.body.title;
  let body = req.body.body;
  let serverId = req.body.serverId;
  let creatorId = req.body.creatorId;

  let query = "INSERT INTO Thread(title, body, serverId, creatorId, threadType) VALUES ('"+title+"','"+body+"','"+serverId+"','"+creatorId+"','Text')";

  pool.query(query, (err, queryResult, fields) => {
    if (err) {
      res.send(err);
      return console.log(err);
    }
    res.end(JSON.stringify(queryResult.insertId));
    return console.log(queryResult);
  });
});

app.post("/add_document_thread", upload.none(), (req, res) => {

  let title = req.body.title;
  let body = req.body.body;
  let serverId = req.body.serverId;
  let creatorId = req.body.creatorId;
  let docLink = req.body.docLink;

  let query1 = "INSERT INTO Thread(title, body, serverId, creatorId, threadType) VALUES ('"+title+"','"+body+"','"+serverId+"','"+creatorId+"','Doc')";
  
  pool.query(query1,(err, queryResult, fields) => {
    if (err) {
      res.send(err);
      return console.log(err);
    }

    let threadId = JSON.stringify(queryResult.insertId);
    let query2 = "INSERT INTO Threaddoc(threadId, doclink) VALUES ('"+threadId+"','"+docLink+"')"

    pool.query(query2,(err, queryResult, fields) => {
      if (err) {
        res.send(err);
        return console.log(err);
      }
      res.end(threadId);
      return console.log(queryResult);
    });

    return console.log(queryResult);
  });
});

app.post("/change_document", upload.none(), (req, res) => { 
  let threadId = req.body.threadId;
  let newDocument = req.body.newDocument;

  let query = "UPDATE Threaddoc SET Threaddoc.doclink = '"+newDocument+"' WHERE Threaddoc.threadid = '"+threadId+"'";

  pool.query(query, (err, queryResult, fields) => {
    if (err) {
      res.send(err);
      return console.log(err);
    }
    res.end(JSON.stringify(queryResult.insertId));
    return console.log(queryResult);
  });
});


app.post("/add_image_thread", upload.single('file'), (req, res) => {

  let title = req.body.title;
  let body = req.body.body;
  let serverId = req.body.serverId;
  let creatorId = req.body.creatorId;
  let image = req.file.filename;

  console.log(req.file.originalname);

  let query1 = "INSERT INTO Thread(title, body, serverId, creatorId, threadType) VALUES ('"+title+"','"+body+"','"+serverId+"','"+creatorId+"','Image')";
  
  pool.query(query1,(err, queryResult, fields) => {
    if (err) {
      res.send(err);
      return console.log(err);
    }

    let threadId = JSON.stringify(queryResult.insertId);
    let query2 = "INSERT INTO Threadimage(threadId, image) VALUES ('"+threadId+"','"+image+"')"

    pool.query(query2,(err, queryResult, fields) => {
      if (err) {
        res.send(err);
        return console.log(err);
      }
      res.end(threadId);
      return console.log(queryResult);
    });
    return console.log(queryResult);
  });
});

app.post("/add_poll_thread", upload.none(), (req, res) => {

  let title = req.body.title;
  let body = req.body.body;
  let serverId = req.body.serverId;
  let creatorId = req.body.creatorId;

  let query = "INSERT INTO Thread(title, body, serverId, creatorId, threadType) VALUES ('"+title+"','"+body+"','"+serverId+"','"+creatorId+"','Poll')";

  pool.query(query, (err, queryResult, fields) => {
    if (err) {
      res.send(err);
      return console.log(err);
    }
    res.end(JSON.stringify(queryResult.insertId));
    return console.log(queryResult);
  });
});

app.post("/add_poll_option", upload.none(), (req, res) => { //returns id of the option, wont be needed as options can be IDd by threadID

  let threadId = req.body.threadId;
  let option = req.body.option;


  let query = "INSERT INTO Threadpoll(threadid, option) VALUES ('"+threadId+"','"+option+"')";

  pool.query(query, (err, queryResult, fields) => {
    if (err) {
      res.send(err);
      return console.log(err);
    }
    res.end(JSON.stringify(queryResult.insertId));
    return console.log(queryResult);
  });
});

app.post("/add_poll_response", upload.none(), (req, res) => { 
  let optionId = req.body.optionId;
  let userId = req.body.userId;

  let query = "INSERT INTO Pollresponse(optionid, userid) VALUES ('"+optionId+"','"+userId+"')";

  pool.query(query, (err, queryResult, fields) => {
    if (err) {
      res.send(err);
      return console.log(err);
    }
    res.end(JSON.stringify(queryResult.insertId));
    return console.log(queryResult);
  });
});

app.post("/delete_poll_response", upload.none(), (req, res) => {

  let responseId = req.body.respsonseId;

  let query = "DELETE FROM Pollresponse WHERE Pollresponse.responseId = '"+responseId+"'";

  pool.query(query, (err, queryResult, fields) => {
    if (err) {
      res.send(err);
      return console.log(err);
    }
    res.end(JSON.stringify(queryResult.insertId));
    return console.log(queryResult);
  });
});

app.post("/add_user_to_server", upload.none(), (req, res) => { // returns 0 on success
  let serverId = req.body.serverId;
  let email = req.body.email;

  let query1 = "SELECT userid FROM User WHERE User.email = '"+email+"'";

  pool.query(query1, (err, queryResult, fields) => {
    if (err) {
      res.send(err);
      return console.log(err);
    }
    console.log(queryResult);
    let userId = JSON.stringify(queryResult[0].userid);
    let query2 = "INSERT INTO Userinserver(serverid, userid) VALUES ('"+serverId+"','"+userId+"')";

    pool.query(query2, (err, queryResult, fields) => {
      if (err) {
        res.send(err);
        return console.log(err);
      }
      res.end(JSON.stringify(queryResult.insertId));
      return console.log(queryResult);
    });


  });
});

app.post("/delete_user_from_server", upload.none(), (req, res) => { // returns 0 on success
  let serverId = req.body.serverId;
  let userId = req.body.userId;

  let query = "DELETE FROM Userinserver WHERE Userinserver.userid = '"+userId+"' AND Userinserver.serverid = '"+serverId+"'";

  pool.query(query, (err, queryResult, fields) => {
    if (err) {
      res.send(err);
      return console.log(err);
    }
    res.end(JSON.stringify(queryResult.insertId));
    return console.log(queryResult);
  });
});

app.post("/get_all_servers_with_user", upload.none(), (req, res) => { 
  let userId = req.body.userId;

  let query = "SELECT * FROM Server WHERE Server.serverid IN (SELECT serverid FROM Userinserver WHERE Userinserver.userid = '"+userId+"')";

  pool.query(query, (err, queryResult, fields) => {
    if (err) {
      res.send(err);
      return console.log(err);
    }
    res.end(JSON.stringify(queryResult));
    return console.log(queryResult);
  });
});

app.post("/get_server_by_id", upload.none(), (req, res) => { 
  let serverId = req.body.serverId;

  let query = "SELECT * FROM Server WHERE Server.serverid = '"+serverId+"'";

  pool.query(query, (err, queryResult, fields) => {
    if (err) {
      res.send(err);
      return console.log(err);
    }
    res.end(JSON.stringify(queryResult));
    return console.log(queryResult);
  });
});

app.post("/get_all_threads_in_server", upload.none(), (req, res) => { 
  let serverId = req.body.serverId;

  let query = "SELECT threadid FROM Thread WHERE Thread.serverid = '"+serverId+"'";

  pool.query(query, (err, queryResult, fields) => {
    if (err) {
      res.send(err);
      return console.log(err);
    }
    res.end(JSON.stringify(queryResult));
    return console.log(queryResult);
  });
});

app.post("/get_thread", upload.none(), (req, res) => { 
  let threadId = req.body.threadId;

  let query = "SELECT * FROM Thread WHERE Thread.threadid = '"+threadId+"'";

  pool.query(query, (err, queryResult, fields) => {
    if (err) {
      res.send(err);
      return console.log(err);
    }
    if (queryResult[0].threadtype == "Text") {
      res.end(JSON.stringify(queryResult));

    } else if (queryResult[0].threadtype == "Doc") {
      let threadPart = queryResult
      let query1 = "SELECT doclink FROM Threaddoc WHERE Threaddoc.threadid = '"+threadId+"'";

      pool.query(query1, (err, queryResult, fields) => {
        if (err) {
          res.send(err);
          return console.log(err);
        }
        let docPart = queryResult;
        var obj = {
                  "threadPart": threadPart,
                  "docPart": docPart
        };

        res.end(JSON.stringify(obj));
        return console.log(obj);
      });

    } else if (queryResult[0].threadtype == "Image") {
      let threadPart = queryResult
      let query1 = "SELECT image FROM Threadimage WHERE Threadimage.threadid = '"+threadId+"'";

      pool.query(query1, (err, queryResult, fields) => {
        if (err) {
          res.send(err);
          return console.log(err);
        }
        let imagePart = queryResult;
        var obj = {
                  "threadPart": threadPart,
                  "imagePart": imagePart
        };

        res.end(JSON.stringify(obj));
        return console.log(obj);
      });


    } else if (queryResult[0].threadtype == "Poll") {
      let threadPart = queryResult
      let query1 = "SELECT optionid, option FROM Threadpoll WHERE Threadpoll.threadid = '"+threadId+"'";

      pool.query(query1, (err, queryResult, fields) => {
        if (err) {
          res.send(err);
          return console.log(err);
        }
        let pollPart = queryResult;
        var obj = {
                  "threadPart": threadPart,
                  "pollPart": pollPart
        };

        res.end(JSON.stringify(obj));
        return console.log(obj);
      });
    }

    return console.log(queryResult[0].threadtype);
  });
});

app.post("/get_poll_response_by_user", upload.none(), (req, res) => { 
  let userId = req.body.userId;
  let threadId = req.body.threadId;

  let query = "SELECT optionid FROM Pollresponse WHERE Pollresponse.optionid IN (SELECT optionid FROM Threadpoll WHERE Threadpoll.threadid = '"+threadId+"') AND Pollresponse.userid = '"+userId+"'";

  pool.query(query, (err, queryResult, fields) => {
    if (err) {
      res.send(err);
      return console.log(err);
    }
    res.end(JSON.stringify(queryResult));
    return console.log(queryResult);
  });
});

app.post("/delete_thread", upload.none(), (req, res) => { 
  let threadId = req.body.threadId;

  let query = "DELETE FROM Thread WHERE Thread.threadId = '"+threadId+"'";

  pool.query(query, (err, queryResult, fields) => {
    if (err) {
      res.send(err);
      return console.log(err);
    }
    res.end(JSON.stringify(queryResult.insertId));
    return console.log(queryResult);
  });
});

// NEW NEW HERE HERE ONWARD

app.post("/get_image", upload.none(), (req, res) => { // TODO test
  let imageName = req.body.imageName;
  res.sendFile(__dirname + "/uploads/" + imageName);
  return console.log("here");
});
//987e7865b9340d13f0cb15ab64b8310e

app.post("/add_general_comment", upload.none(), (req, res) => { // insertId in the response gives the ID

  let serverId = req.body.serverId;
  let userId = req.body.userId;
  let message = req.body.message;

  let query = "INSERT INTO `Generalcomment`(`serverid`, `userid`, `message`) VALUES ('"+serverId+"','"+userId+"','"+message+"')";

  pool.query(query, (err, queryResult, fields) => {
    if (err) {
      res.send(err);
      return console.log(err);
    }
    res.end(JSON.stringify(queryResult.insertId));
    return console.log(queryResult);
  });
});

app.post("/delete_general_comment", upload.none(), (req, res) => { 
  let generalCommentId = req.body.generalCommentId;

  let query = "DELETE FROM Generalcomment WHERE Generalcomment.generalcommentid = '"+generalCommentId+"'";

  pool.query(query, (err, queryResult, fields) => {
    if (err) {
      res.send(err);
      return console.log(err);
    }
    res.end(JSON.stringify(queryResult.insertId));
    return console.log(queryResult);
  });
});

app.post("/get_all_comments_in_server", upload.none(), (req, res) => { 
  let serverId = req.body.serverId;

  let query = "SELECT generalcommentid, userid, message FROM Generalcomment WHERE Generalcomment.serverid = '"+serverId+"'";

  pool.query(query, (err, queryResult, fields) => {
    if (err) {
      res.send(err);
      return console.log(err);
    }
    res.end(JSON.stringify(queryResult));
    return console.log(queryResult);
  });
});

app.post("/add_thread_comment", upload.none(), (req, res) => { // insertId in the response gives the ID

  let threadId = req.body.threadId;
  let userId = req.body.userId;
  let message = req.body.message;

  let query = "INSERT INTO `Threadcomment`(`threadid`, `userid`, `message`) VALUES ('"+threadId+"','"+userId+"','"+message+"')";

  pool.query(query, (err, queryResult, fields) => {
    if (err) {
      res.send(err);
      return console.log(err);
    }
    res.end(JSON.stringify(queryResult.insertId));
    return console.log(queryResult);
  });
});

app.post("/delete_thread_comment", upload.none(), (req, res) => { 
  let threadCommentId = req.body.threadCommentId;

  let query = "DELETE FROM Threadcomment WHERE Threadcomment.threadcommentid = '"+threadCommentId+"'";

  pool.query(query, (err, queryResult, fields) => {
    if (err) {
      res.send(err);
      return console.log(err);
    }
    res.end(JSON.stringify(queryResult.insertId));
    return console.log(queryResult);
  });
});

app.post("/get_all_comments_on_thread", upload.none(), (req, res) => { 
  let threadId = req.body.threadId;

  let query = "SELECT threadcommentid, message, userid FROM Threadcomment WHERE Threadcomment.threadid = '"+threadId+"'";

  pool.query(query, (err, queryResult, fields) => {
    if (err) {
      res.send(err);
      return console.log(err);
    }
    res.end(JSON.stringify(queryResult));
    return console.log(queryResult);
  });
});

app.post("/get_num_of_comments_on_thread", upload.none(), (req, res) => { 
  let threadId = req.body.threadId;

  let query = "SELECT COUNT(threadcommentid) AS count FROM Threadcomment WHERE Threadcomment.threadid = '"+threadId+"'";

  pool.query(query, (err, queryResult, fields) => {
    if (err) {
      res.send(err);
      return console.log(err);
    }
    res.end(JSON.stringify(queryResult[0].count));
    return console.log(queryResult[0].count);
  });
});

app.post("/change_user_password", upload.none(), (req, res) => { 
  let userId = req.body.userId;
  let newPassword = req.body.newPassword;

  let query = "UPDATE User SET User.password = '"+newPassword+"' WHERE User.userid = '"+userId+"'";

  pool.query(query, (err, queryResult, fields) => {
    if (err) {
      res.send(err);
      return console.log(err);
    }
    res.end(JSON.stringify(queryResult.insertId));
    return console.log(queryResult);
  });
});

app.post("/change_thread_likes", upload.none(), (req, res) => { 
  let threadId = req.body.threadId;
  let sign = req.body.sign;
  let query = "";
  
  if (sign == "+") {
    query = "UPDATE Thread SET Thread.likecount = Thread.likecount + 1 WHERE Thread.threadid = '"+threadId+"'";
  } else if (sign == "-"){
    query = "UPDATE Thread SET Thread.likecount = Thread.likecount - 1 WHERE Thread.threadid = '"+threadId+"'";
  } else {
    res.end("Invalid Sign");
    return console.log("Invalid Sign");
  }

  pool.query(query, (err, queryResult, fields) => {
    if (err) {
      res.send(err);
      return console.log(err);
    }
    res.end(JSON.stringify(queryResult.insertId));
    return console.log(queryResult);
  });
});

app.post("/add_event", upload.none(), (req, res) => { // insertId in the response gives the ID

  let userId = req.body.userId;
  let name = req.body.name;
  let date = req.body.date;

  let query = "INSERT INTO `Calendar`(`userid`, `name`, `date`) VALUES ('"+userId+"','"+name+"','"+date+"')";

  pool.query(query, (err, queryResult, fields) => {
    if (err) {
      res.send(err);
      return console.log(err);
    }
    res.end(JSON.stringify(queryResult.insertId));
    return console.log(queryResult);
  });
});

app.post("/delete_event", upload.none(), (req, res) => { // insertId in the response gives the ID

  let eventId = req.body.eventId;

  let query = "DELETE FROM Calendar WHERE Calendar.eventid = '"+eventId+"'";

  pool.query(query, (err, queryResult, fields) => {
    if (err) {
      res.send(err);
      return console.log(err);
    }
    res.end(JSON.stringify(queryResult.insertId));
    return console.log(queryResult);
  });
});

app.post("/get_all_events_for_user", upload.none(), (req, res) => { // insertId in the response gives the ID

  let userId = req.body.userId;

  let query = "SELECT eventid, name, date FROM Calendar WHERE Calendar.userId = '"+userId+"'";

  pool.query(query, (err, queryResult, fields) => {
    if (err) {
      res.send(err);
      return console.log(err);
    }
    res.end(JSON.stringify(queryResult));
    return console.log(queryResult);
  });
});

// TODO
// "/change_user_image" 
// "/change_server_image"
// "/change_server_banner"
// "/add_general_image"
// "/delete_general_image"
// "/change_user_permission"
