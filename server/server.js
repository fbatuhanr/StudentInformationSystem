const express = require('express');
const mysql = require('mysql');
const mysqlErrorKeys = require('mysql-error-keys');
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


/* OTHER */
app.post('/login', (req, res) => {

    console.log(req.body)

    const { username, password } = req.body
    console.log(username, password)

    if (username && password) {

        const sql = `SELECT * FROM Principal WHERE Username='${username}' AND Password='${password}'`;
        db.query(sql, (error, result) => {
            if (error) return res.json(error);

            return result.length > 0 ? res.send(true) : res.send(false);
        })
    } else {
        return res.send(false);
    }
});
app.post('/signup', (req, res) => {

    console.log(req.body)

    const { principalRegistrationCode } = req.body
    const codeCheckSql = `SELECT * FROM Settings WHERE PrincipalRegistrationCode='${principalRegistrationCode}'`;
    db.query(codeCheckSql, (error, result) => {
        if (error) throw error;
        if (!result.length) return res.send({ error: "Registration code is incorrect!" })

        const { username, password } = req.body
        const registerSql = `INSERT INTO Principal (Username, Password) VALUES ('${username}', '${password}')`;
        db.query(registerSql, (error, result) => {
            if (error) throw error;

            console.log("1 record inserted");
            return res.send(true);
        });
    })
});
app.post('/canteen-buy-product', (req, res) => {

    const { studentId } = req.body;
    const studentBalanceQuery = `SELECT Balance FROM Student WHERE ID=${studentId}`;
    db.query(studentBalanceQuery, (error, result) => {
        if (error) return res.json(error);

        const studentBalance = result[0].Balance;

        const { productId } = req.body;
        const productPriceQuery = `SELECT ProductPrice FROM Canteen WHERE ProductID=${productId}`;
        db.query(productPriceQuery, (error, result) => {
            if (error) return res.json(error);

            const productPrice = result[0].ProductPrice;

            if (studentBalance < productPrice)
                return res.send(false)

            const { buyDate } = req.body;
            const studentBoughtProductQuery = `INSERT INTO StudentBoughtProducts (StudentID, ProductID, BuyDate) VALUES (${studentId}, ${productId}, '${buyDate}')`;
            db.query(studentBoughtProductQuery, (error, result) => {
                if (error) return res.json(error);

                const studentNewBalance = studentBalance - productPrice;
                const updateStudentBalanceQuery = `UPDATE Student SET Balance=${studentNewBalance} WHERE ID=${studentId}`;
                db.query(updateStudentBalanceQuery, (error, result) => {
                    if (error) throw error;

                    return res.send(true);
                });
            });
        })
    })
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

    const sql = `SELECT * 
        FROM Student 
        INNER JOIN Class ON Student.ClassID = Class.ClassID
        INNER JOIN City ON Student.CityID = City.CityID
        INNER JOIN Parent ON Student.ParentID = Parent.ParentID`

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
app.get('/teacher', (req, res) => {

    const sql = "SELECT * FROM Teacher, TeacherClasses WHERE Teacher.TeacherID=TeacherClasses.TeacherID"
    db.query(sql, (err, data) => {
        if (err) return res.json(err);

        return res.json(data);
    })
})
app.get('/canteen', (req, res) => {
    const sql = "SELECT * FROM Canteen";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);

        return res.json(data);
    })
})
app.get('/attendance', (req, res) => {
    const sql = "SELECT *, DATE_FORMAT(date,'%Y-%m-%d') AS Date FROM Attendance";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);

        console.log(data)
        return res.json(data);
    })
})
app.get('/class-student', (req, res) => {

    const { ids } = req.query;

    const sql = `SELECT * FROM Student WHERE ClassID IN (${ids.toString()})`;
    db.query(sql, (err, data) => {
        if (err) return res.json(err);

        return res.json(data);
    })
})


app.get('/class/:id', (req, res) => {

    const classId = req.params.id;

    const sql = `SELECT * FROM Class WHERE ClassID='${classId}'`;
    db.query(sql, (err, data) => {
        if (err) return res.json(err);

        return res.json(data);
    })
})
app.get('/student/:id', (req, res) => {

    const studentId = req.params.id;

    const sql = `SELECT * FROM Student WHERE ID='${studentId}'`;
    db.query(sql, (err, data) => {
        if (err) return res.json(err);

        return res.json(data);
    })
})
app.get('/parent/:id', (req, res) => {

    const parentId = req.params.id;

    const sql = `SELECT * FROM Parent WHERE ParentID='${parentId}'`;
    db.query(sql, (err, data) => {
        if (err) return res.json(err);

        return res.json(data);
    })
})
app.get('/teacher/:id', (req, res) => {

    const teacherId = req.params.id;

    const sql = `SELECT * FROM Teacher WHERE TeacherID='${teacherId}'`;
    db.query(sql, (err, data) => {
        if (err) return res.json(err);

        return res.json(data);
    })
})

app.get('/student-restricted-products/:id', (req, res) => {

    const studentId = req.params.id;

    const sql = `SELECT ProductID FROM StudentRestrictedProducts WHERE StudentID='${studentId}'`;
    db.query(sql, (err, data) => {
        if (err) return res.json(err);

        return res.json(data);
    })
})
app.get('/teacher-classes/:id', (req, res) => {

    const teacherId = req.params.id;

    const sql = `SELECT ClassID FROM TeacherClasses WHERE TeacherID='${teacherId}'`;
    db.query(sql, (error, data) => {
        if (error) return res.json(error);

        return res.json(data);
    })
})
app.get('/student-attendance', (req, res) => {

    const { ids, startDate, endDate } = req.query;

    const sql = `SELECT *, DATE_FORMAT(date,'%Y-%m-%d') AS Date FROM Attendance WHERE (StudentID IN (${ids.toString()})) AND (Date BETWEEN '${startDate}' AND '${endDate}')`;
    db.query(sql, (error, data) => {
        if (error) return res.json(error);

        return res.json(data);
    })
})
app.get('/student-canteen-buy', (req, res) => {

    const { ids } = req.query;

    let sql = `SELECT *
        FROM StudentBoughtProducts
        INNER JOIN Canteen ON StudentBoughtProducts.ProductID = Canteen.ProductID`;
    sql = ids ? sql + ` WHERE (StudentID IN (${ids.toString()}))` : sql;

        console.log(ids)
        console.log(sql)
    db.query(sql, (error, data) => {
        if (error) return res.json(error);

        return res.json(data);
    })
})

/* INSERT */
app.post('/student', upload.single('photo'), (req, res) => {

    console.log(req.file)
    console.log(req.body)
    const { parentName, parentPhoneNumber, parentEmail } = req.body

    const parentSql = `INSERT INTO Parent (ParentName, ParentPhoneNumber, ParentEmail) VALUES ('${parentName}', '${parentPhoneNumber}', '${parentEmail}')`;

    db.query(parentSql, (error, result) => {
        if (error) throw error;

        const { name, number, classId, address, cityId, balance } = req.body
        const parentId = result.insertId;
        const photo = req.file;

        const studentSql = `INSERT INTO Student (Name, Number, ClassID, Address, Photo, CityID, ParentID, Balance) VALUES ('${name}', ${number}, ${classId}, '${address}', '${photo.path}', ${cityId}, ${parentId}, ${balance})`;

        db.query(studentSql, (error, result) => {
            if (error) throw error;

            const { restrictedProducts } = req.body
            if (!restrictedProducts)
                return res.send(true);

            const studentId = result.insertId;
            const stdRestrictedProducts = restrictedProducts.map(i => [studentId, i]);

            const restrictedProductsSql = 'INSERT INTO StudentRestrictedProducts (StudentID, ProductID) VALUES ?';
            db.query(restrictedProductsSql, [stdRestrictedProducts], (err, results, fields) => {
                if (err) throw err;

                console.log(`Inserted Rows: ${results.affectedRows}`);
                return res.send(true);
            });
        });
    });
});
app.post('/teacher', (req, res) => {

    const { name } = req.body;

    const teacherSql = `INSERT INTO Teacher (TeacherName) VALUES ('${name}')`;
    db.query(teacherSql, (error, result) => {
        if (error) throw error;
        console.log(result.affectedRows + " record(s) Teacher inserted");

        const { classes } = req.body;
        const teacherId = result.insertId;
        const teacherClasses = classes.map(i => [teacherId, i]);

        const teacherClassesSql = 'INSERT INTO TeacherClasses (TeacherID, ClassID) VALUES ?';
        db.query(teacherClassesSql, [teacherClasses], (error, result, fields) => {
            if (error) throw error;
            console.log(result.affectedRows + " record(s) TeacherClasses inserted");

            return res.send(true);
        });
    });
});
app.post('/class', (req, res) => {

    const { name } = req.body;
    const sql = `INSERT INTO Class (ClassName) VALUES ('${name}')`;

    db.query(sql, (err, result) => {
        if (err) throw err;

        console.log("1 record inserted");
        return res.send(true);
    });
});
app.post('/canteen', (req, res) => {

    const { productName, productPrice } = req.body;
    const sql = `INSERT INTO Canteen (ProductName, ProductPrice) VALUES ('${productName}', '${productPrice}')`;

    db.query(sql, (err, result) => {
        if (err) throw err;

        console.log("1 record inserted");
        return res.send(true);
    });
});

/* UPDATE OR INSERT */

/* 
app.put('/attendance/:studentId/:date', (req, res) => {

    const studentId = req.params.studentId;
    const date = req.params.date;
    const { status } = req.body;

    console.log(studentId)
    console.log(date)
    console.log(status)

    const sql = `SELECT * FROM Attendance WHERE StudentID=${studentId} AND Date='${date}'`;
    db.query(sql, (error, result) => {
        if (error) return res.json(error);

        if (result.length > 0) {

            const sql = `UPDATE Attendance SET Status=${status} WHERE StudentID=${studentId} AND Date='${date}'`;
            db.query(sql, (error, result) => {
                if (error) throw error;

                return res.send(true);
            });
        }
        else {

            const sql = `INSERT INTO Attendance (StudentID, Date, Status) VALUES (${studentId}, '${date}', ${status})`;
            db.query(sql, (error, result) => {
                if (error) throw error;

                return res.send(true);
            });
        }
    })
});
*/

app.post('/attendance', (req, res) => {
    const { studentId, date, status } = req.query;

    if (!studentId || !date || !status) {
        return res.status(400).send('Missing parameters');
    }

    const checkQuery = `SELECT * FROM Attendance WHERE StudentID=${studentId} AND Date='${date}'`;
    db.query(checkQuery, (error, result) => {
        if (error) return res.status(500).send(err);

        if (result.length > 0) {

            const updateQuery = `UPDATE Attendance SET Status=${status} WHERE StudentID=${studentId} AND Date='${date}'`;
            db.query(updateQuery, (error, result) => {
                if (error) throw error;

                return res.send(true);
            });

        } else {

            const insertQuery = `INSERT INTO Attendance (StudentID, Date, Status) VALUES (${studentId}, '${date}', ${status})`;
            db.query(insertQuery, (error, result) => {
                if (error) throw error;

                return res.send(true);
            });
        }
    });
});

/* UPDATE */
app.post('/student/:id', upload.single('photo'), (req, res) => {

    console.log(req.file)

    const studentId = req.params.id;
    const { name, number, classId, address, cityId, photo, balance } = req.body

    const studentSql = `UPDATE Student SET Name='${name}', Number='${number}', ClassID='${classId}', Address='${address}', Photo='${req.file ? req.file.path : photo}', CityID='${cityId}', Balance='${balance}' WHERE ID='${studentId}'`;
    db.query(studentSql, (error, result) => {
        if (error) throw error;
        console.log(result.affectedRows + " record(s) student updated");

        const stdRestrictedProductsRemoveSql = `DELETE FROM StudentRestrictedProducts WHERE StudentID='${studentId}'`;
        db.query(stdRestrictedProductsRemoveSql, (error, result) => {
            if (error) throw error;
            console.log(result.affectedRows + " record(s) StudentRestrictedProducts deleted");

            const { restrictedProducts } = req.body;
            if (!restrictedProducts)
                return res.send(true);

            const stdRestrictedProducts = restrictedProducts.map(i => [studentId, i]);
            const stdRestrictedProductsSql = 'INSERT INTO StudentRestrictedProducts (StudentID, ProductID) VALUES ?';
            db.query(stdRestrictedProductsSql, [stdRestrictedProducts], (error, result, fields) => {
                if (error) throw error;
                console.log(result.affectedRows + " record(s) StudentRestrictedProducts inserted");

                const { parentId, parentName, parentPhoneNumber, parentEmail } = req.body;
                const parentSql = `UPDATE Parent SET ParentName='${parentName}', ParentPhoneNumber='${parentPhoneNumber}', ParentEmail='${parentEmail}' WHERE ParentID='${parentId}'`;
                db.query(parentSql, (error, result) => {
                    if (error) throw error;
                    console.log(result.affectedRows + " record(s) Parent Updated");

                    return res.send(true);
                });
            });
        });
    });
});
app.put('/teacher/:id', (req, res) => {

    const teacherId = req.params.id;
    const { name } = req.body;

    const teacherSql = `UPDATE Teacher SET TeacherName='${name}' WHERE TeacherID='${teacherId}'`;
    db.query(teacherSql, (error, result) => {
        if (error) throw error;
        console.log(result.affectedRows + " record(s) Teacher updated");

        const teacherClassesRemoveSql = `DELETE FROM TeacherClasses WHERE TeacherID='${teacherId}'`;
        db.query(teacherClassesRemoveSql, (error, result) => {
            if (error) throw error;
            console.log(result.affectedRows + " record(s) TeacherClasses deleted");

            const { classes } = req.body;
            const teacherClasses = classes.map(i => [teacherId, i]);
            const teacherClassesSql = 'INSERT INTO TeacherClasses (TeacherID, ClassID) VALUES ?';
            db.query(teacherClassesSql, [teacherClasses], (error, result, fields) => {
                if (error) throw error;
                console.log(result.affectedRows + " record(s) TeacherClasses inserted");

                return res.send(true);
            });
        });
    });
});
app.put('/class/:id', (req, res) => {

    const classId = req.params.id;
    const { name } = req.body;

    const sql = `UPDATE Class SET ClassName='${name}' WHERE ClassID='${classId}'`;
    db.query(sql, (err, result) => {
        if (err) throw err;

        console.log(result.affectedRows + " record(s) updated");
        return res.send(true);
    });
});
app.put('/canteen/:id', (req, res) => {

    const productId = req.params.id;
    const { productName, productPrice } = req.body;

    const sql = `UPDATE Canteen 
        SET ProductName='${productName}', ProductPrice='${productPrice}' 
        WHERE ProductID='${productId}'`;

    db.query(sql, (err, result) => {
        if (err) throw err;

        console.log(result.affectedRows + " record(s) updated");
        return res.send(true);
    });
});

/* DELETE */
app.delete('/student/:id', (req, res) => {

    const studentId = req.params.id;

    const stdRestrictedProductsSql = `DELETE FROM StudentRestrictedProducts WHERE StudentID='${studentId}'`;
    db.query(stdRestrictedProductsSql, (error, result) => {
        if (error) throw error;

        const studentSql = `DELETE FROM Student WHERE ID='${studentId}'`;
        db.query(studentSql, (error, result) => {
            if (error) throw error;

            console.log("Number of records deleted: " + result.affectedRows);
            return res.send(true);
        });
    });
});
app.delete('/teacher/:id', (req, res) => {

    const teacherId = req.params.id;

    const teacherClassesSql = `DELETE FROM TeacherClasses WHERE TeacherID='${teacherId}'`;
    db.query(teacherClassesSql, (error, result) => {
        if (error) throw error;

        const teacherSql = `DELETE FROM Teacher WHERE TeacherID='${teacherId}'`;
        db.query(teacherSql, (error, result) => {
            if (error) throw error;

            console.log("Number of records deleted: " + result.affectedRows);
            return res.send(true);
        });
    });
});
app.delete('/class/:id', (req, res) => {

    const classId = req.params.id;

    const sql = `DELETE FROM Class WHERE ClassID='${classId}'`;
    db.query(sql, (error, result) => {

        if (error) {
            if (error.code == mysqlErrorKeys.ER_ROW_IS_REFERENCED || error.code == mysqlErrorKeys.ER_ROW_IS_REFERENCED_2) {

                return res.send({ error: "The class could not be deleted because it was selected by student or teacher!" })
            }
            else {
                throw error;
            }
        }

        console.log("Number of records deleted: " + result.affectedRows);
        return res.send(true);
    });
});
app.delete('/canteen/:id', (req, res) => {

    const productId = req.params.id;

    const sql = `DELETE FROM Canteen WHERE ProductID='${productId}'`;
    db.query(sql, (error, result) => {

        if (error) {
            if (error.code == mysqlErrorKeys.ER_ROW_IS_REFERENCED || error.code == mysqlErrorKeys.ER_ROW_IS_REFERENCED_2) {

                return res.send({ error: "The product could not be deleted because it was selected as a restricted product!" })
            }
            else {
                throw error;
            }
        }
        console.log("Number of records deleted: " + result.affectedRows);
        return res.send(true);
    });
});