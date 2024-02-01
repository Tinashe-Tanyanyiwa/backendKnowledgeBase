import dotenv from "dotenv";
dotenv.config();

// Set the port number
const port = process.env.PORT || 3000;

import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

// CONNECTION STRING
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
});

app.use(express.json());
app.use(cors());
//REQUEST
app.get("/", (req, res) => {
  res.json("Hello this is the backend");
});

//GET ALL ARTICLES FROM TABLE
app.get("/articles", (req, res) => {
  const q = "SELECT * FROM articles";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// CREATING A POST REQUESET, INSERTING VALUES INTO THE TABLE
app.post("/articles", (req, res) => {
  const q =
    "INSERT INTO articles (`articlesTitle`,`articlesImageUrl`,`articlesBriefDescription`,`articlesBody`,`articlesCategory`) VALUES (?)";
  const values = [
    req.body.articlesTitle,
    req.body.articlesImageUrl,
    req.body.articlesBriefDescription,
    req.body.articlesBody,
    req.body.articlesCategory,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Article has been created successfuly!");
  });
});

app.delete("/articles/:articlesId", (req, res) => {
  const articlesId = req.params.articlesId;
  const q = "DELETE FROM articles WHERE articlesId = ?";

  db.query(q, [articlesId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Article has been deleted successfuly!");
  });
});

app.listen(port, () => {
  console.log("connected to backend!");
});

// GET ALL USERS FROM TABLE
app.get("/user", (req, res) => {
  const q = "SELECT * FROM user";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// CREATING A POST REQUESET, INSERTING VALUES INTO THE USER TABLE
app.post("/user", (req, res) => {
  const q =
    "INSERT INTO user (`username`,`password`,`email`,`contact`,`role`) VALUES (?)";
  const values = [
    req.body.username,
    req.body.password,
    req.body.email,
    req.body.contact,
    req.body.role,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("User has been created successfuly!");
  });
});

// LOGIN PAGE
app.post("/user/login", (req, res) => {
  const q = "SELECT * FROM user WHERE username = ? AND password = ?";

  db.query(q, [req.body.username, req.body.password], (err, data) => {
    if (err) return res.json("Error");

    if (data.length > 0) {
      const user = data[0];

      // Check if the "role" column has the value "Administrator"
      if (user.role === "Administrator") {
        return res.json("Login Successful");
      } else {
        return res.json("Not Administrator");
      }
    } else {
      return res.json("No Record");
    }
  });
});

// CREATING A POST REQUESET, INSERTING VALUES INTO USER THE TABLE FOR SIGNUP PAGE
app.post("/user/signup", (req, res) => {
  const q =
    "INSERT INTO user (`username`,`password`,`email`,`contact`,`role`) VALUES (?)";
  const values = [
    req.body.username,
    req.body.password,
    req.body.email,
    req.body.contact,
    req.body.role,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Article has been created successfuly!");
  });
});

// UPDATING THE ARTICLE
app.put("/articles/:articlesId", (req, res) => {
  const articlesId = req.params.articlesId;
  const q =
    "UPDATE articles SET `articlesTitle` = ?,`articlesImageUrl` = ?,`articlesBriefDescription` = ?,`articlesBody` = ?, `articlesCategory` = ? WHERE articlesId = ?";
  const values = [
    req.body.articlesTitle,
    req.body.articlesImageUrl,
    req.body.articlesBriefDescription,
    req.body.articlesBody,
    req.body.articlesCategory,
  ];

  db.query(q, [...values, articlesId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Article has been updated successfuly!");
  });
});
// DISPLAY THE ARTICLE
app.get("/articles/:articlesId", (req, res) => {
  const q = "SELECT * FROM articles";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// CATEGORY SECTION OF THE DATABASE
// GET ALL CATEGORIES FROM TABLE
app.get("/category", (req, res) => {
  const q = "SELECT * FROM category";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//   CREATE NEW CATEGROY
app.post("/category", (req, res) => {
  const q =
    "INSERT INTO category (`categoryname`,`categorydescription`) VALUES (?)";
  const values = [req.body.categoryname, req.body.categorydescription];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Category has been created successfuly!");
  });
});
