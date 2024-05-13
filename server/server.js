const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({ storage: storage })

const app = express()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(4000, () => {
    console.log("listening")
})

const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "StudentInformationSystem",
    multipleStatements: true
})

app.get('/', (req, res) => {
    return res.json("From Backend Side")
})
app.use('/uploads', express.static(__dirname + '/uploads'))


app.post('/login', (req, res) => {

    console.log(req.body)

    const { username, password } = req.body
    console.log(username, password)

    if (username && password) {

        const sql = `SELECT * FROM Principal WHERE Username='${username}' AND Password='${password}'`;
        db.query(sql, (err, data) => {
            if (err) return res.json(err);

            return data.length > 0 ? res.send(true) : res.send(false);
        })
    } else {
        return res.send(false);
    }
});


/* FETCH DATA */
app.get('/city', (req, res) => {
    const sql = "SELECT * FROM City";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);

        return res.json(data);
    })
})
app.get('/class', (req, res) => {
    const sql = "SELECT * FROM Class";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);

        return res.json(data);
    })
})
app.get('/student', (req, res) => {
    const sql = "SELECT * FROM Student";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);

        return res.json(data);
    })
})
app.get('/parent', (req, res) => {
    const sql = "SELECT * FROM Parent";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);

        return res.json(data);
    })
})
app.get('/class/:id', (req, res) => {

    const classId = req.params.id;

    const sql = `SELECT * FROM Class WHERE ID='${classId}'`;
    db.query(sql, (err, data) => {
        if(err) return res.json(err);

        return res.json(data);
    })
})
app.get('/parent/:id', (req, res) => {

    const parentId = req.params.id;
    
    const sql = `SELECT * FROM Parent WHERE ID='${parentId}'`;
    db.query(sql, (err, data) => {
        if(err) return res.json(err);

        return res.json(data);
    })
})

/* INSERT */
app.post('/student', upload.single('photo'), (req, res) => {

    console.log(req.file)
    const { parentName, parentPhoneNumber, parentEmail } = req.body

    const parentSql = `INSERT INTO Parent (Name, PhoneNumber, Email) VALUES ('${parentName}', '${parentPhoneNumber}', '${parentEmail}')`;

    db.query(parentSql, (error, result) => {
        if (error) throw error;

        const { name, number, classId, address, cityId } = req.body
        const parentId = result.insertId;
        const photo = req.file;

        const studentSql = `INSERT INTO Student (Name, Number, ClassID, Address, Photo, CityID, ParentID) VALUES ('${name}', ${number}, ${classId}, '${address}', '${photo.path}', ${cityId}, ${parentId})`;

        db.query(studentSql, (error, result) => {
            if (error) throw error;
            return res.send(true);
        });
    });
});

app.post('/class', (req, res) => {

    const { name } = req.body;
    const sql = `INSERT INTO Class (Name) VALUES ('${name}')`;

    db.query(sql, (err, data) => {
        if (err) throw err;

        console.log("1 record inserted");
        return res.send(true);
    });
});

/* UPDATE */
app.put('/class/:id', (req, res) => {

    const classId = req.params.id;
    const { name } = req.body;

    const sql = `UPDATE Class SET Name='${name}' WHERE ID='${classId}'`;
    db.query(sql, (err, data) => {
        if (err) throw err;

        console.log(data.affectedRows + " record(s) updated");
        return res.send(true);
    });
});

/* DELETE */
app.delete('/class/:id', (req, res) => {

    const classId = req.params.id;

    const sql = `DELETE FROM Class WHERE ID='${classId}'`;
    db.query(sql, (err, result) => {
        if (err) throw err;

        console.log("Number of records deleted: " + result.affectedRows);
        return res.send(true);
    });
});