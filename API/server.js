const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");
const app = express();
//path.resolve()
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const port = 5000;
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employees",
});

app.post("/add_employee", (req, res) => {
  const sql =
    "INSERT INTO employee (`name`,`doj`,`role`,`salary`) VALUES (?, ?, ?, ?)";
  const values = [req.body.name, req.body.doj, req.body.role, req.body.salary];
  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occured" + err });
    return res.json({ success: "Student added successfully" });
  });
});

app.get("/employee", (req, res) => {
  const sql = "SELECT * FROM employee";
  db.query(sql, (err, result) => {
    if (err) res.json({ message: "Server error" });
    return res.json(result);
  });
});


app.put("/edit_employee/:id", (req, res) => {
  const id = req.params.id;
  const sql =
    "UPDATE employee SET `name`=?, `doj`=?, `role`=?, `salary`=? WHERE id=?";
  const values = [
    req.body.name,
    req.body.doj,
    req.body.role,
    req.body.salary,
    id,
  ];
  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occured" + err });
    return res.json({ success: "Student updated successfully" });
  });
});


app.delete("/delete_employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM employee WHERE id=?";
  const values = [id];
  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occured" + err });
    return res.json({ success: "Student updated successfully" });
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port} `);
});
