const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mysql = require('mysql');
const { v4: uuidv4 } = require('uuid');
const md5 = require('md5');

const app = express();
const port = 3003;

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dp1'
});

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(cookieParser());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

const doAuth = function(req, res, next) {

    if (req.url.indexOf('/numbers') === 0) {
        const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
        const user = req.cookies.magicNumberSession ?
            users.find(u => u.session === req.cookies.magicNumberSession) :
            null;
        if (user && (user.role === 'admin' || user.role === 'manager')) {
            next();
        } else {
            res.status(401).json({});
        }
    } else if (req.url.indexOf('/users') === 0) {
        const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
        const user = req.cookies.magicNumberSession ?
            users.find(u => u.session === req.cookies.magicNumberSession) :
            null;
        if (user && (user.role === 'admin')) {
            next();
        } else {
            res.status(401).json({});
        }
    } else {
        next();
    }


}

// app.use(doAuth);


// SELECT column1, column2, ...
// FROM table_name;

app.get('/trees', (req, res) => {
    const sql = `
        SELECT id, title, height, type
        FROM trees
        ORDER BY type desc, title
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// INSERT INTO table_name (column1, column2, column3, ...)
// VALUES (value1, value2, value3, ...);

app.post('/trees', (req, res) => {
    const sql = `
        INSERT INTO trees (title, height, type)
        VALUES (?, ?, ?)
    `;
    con.query(sql, [req.body.title, req.body.height, req.body.type], (err) => {
        if (err) throw err;
        res.json({});
    });
});


// DELETE FROM table_name WHERE condition;

app.delete('/trees/:id', (req, res) => {
    const sql = `
        DELETE FROM trees
        WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err) => {
        if (err) throw err;
        res.json({});
    });
});


// UPDATE table_name
// SET column1 = value1, column2 = value2, ...
// WHERE condition;

app.put('/trees/:id', (req, res) => {
    const sql = `
        UPDATE trees
        SET title = ?, height = ?, type = ?
        WHERE id = ?
    `;
    con.query(sql, [req.body.title, req.body.height, req.body.type, req.params.id], (err) => {
        if (err) throw err;
        res.json({});
    });
});


//*************** LOGIN ********************/

app.post('/login', (req, res) => {
    const sessionId = uuidv4();

    const sql = `
        UPDATE users
        SET session = ?
        WHERE name = ? AND psw = ?
    `;

    con.query(sql, [sessionId, req.body.name, md5(req.body.psw)], (err, result) => {
        if (err) throw err;
        if (result.affectedRows) {
            res.cookie('treesSession', sessionId);
            res.json({
                status: 'ok',
                name: req.body.name
            });
        } else {
            res.json({
                status: 'error',
            });
        }
    });

});

app.post('/logout', (req, res) => {
    res.cookie('treesSession', '');
    res.json({
        status: 'logout',
    });
});



app.get('/login', (req, res) => {

    const sql = `
        SELECT name
        FROM users
        WHERE session = ?
    `;
    con.query(sql, [req.cookies.treesSession || ''], (err, result) => {
        if (err) throw err;

        if (result.length) {
            res.json({
                status: 'ok',
                name: result[0].name,
            });
        } else {
            res.json({
                status: 'error',
            });
        }

    });

});



app.listen(port, () => {
    console.log(`LN is on port number: ${port}`);
});