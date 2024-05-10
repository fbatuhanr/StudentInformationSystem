const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express()
const bodyParser = require('body-parser');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(3001, () => {
    console.log("listening")
})

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "StudentInformationSystem",
    multipleStatements: true
})

app.get('/', (req, res) => {
    return res.json("From Backend Side")
})

app.post('/login', (req, res) => {

    console.log(req.body)
    let username = req.body.username;
    let password = req.body.password;
    console.log(username)
    console.log(password)

    if (username && password) {

        const sql = `SELECT * FROM Principal WHERE username='${username}' AND password='${password}'`;
        db.query(sql, (err, data) => {
            if(err) return res.json(err);

            return data.length > 0 ? res.send(true) : res.send(false);
        })
    } else {
        return res.send(false);
    }
});


/* FETCH DATA */
/*
app.get('/thesis', (req, res) => {
    const sql = "SELECT *, DATE_FORMAT(SubmissionDate, \"%Y-%m-%d\") AS SubmissionDate FROM Thesis";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);

        return res.json(data);
    })
})
app.get('/thesis/:id', (req, res) => {

    const thesisNo = req.params.id;

    const sql = `SELECT * FROM Thesis WHERE ThesisNo='${thesisNo}'`;
    db.query(sql, (err, data) => {
        if(err) return res.json(err);

        return res.json(data);
    })
})
*/

/* INSERT */
/*
app.post('/person', (req, res) => {

    const { name } = req.body;
    const sql = `INSERT INTO Person (Name) VALUES ('${name}')`;

    db.query(sql, (err, data) => {
        if (err) throw err;

        console.log("1 record inserted");
        return res.send(true);
    });
});
*/

/* UPDATE */
/*
app.put('/person/:id', (req, res) => {

    const personId = req.params.id;
    const { name } = req.body;

    const sql = `UPDATE Person SET Name='${name}' WHERE PersonID='${personId}'`;
    db.query(sql, (err, data) => {
        if (err) throw err;

        console.log(data.affectedRows + " record(s) updated");
        return res.send(true);
    });
});
*/

/* DELETE */
/*
app.delete('/thesis/:id', (req, res) => {

    const thesisNo = req.params.id;

    const sql = `DELETE FROM Thesis WHERE ThesisNo='${thesisNo}'`;
    db.query(sql, (err, result) => {
        if (err) throw err;

        console.log("Number of records deleted: " + result.affectedRows);
        return res.send(true);
    });
});
*/