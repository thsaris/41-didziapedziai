const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3003;

app.use(cors());

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());



// API
app.get('/dices', (req, res) => {
    let allData = fs.readFileSync('./data.json', 'utf8');
    allData = JSON.parse(allData);
    res.json(allData);
});

app.post('/dices', (req, res) => {
    let allData = fs.readFileSync('./data.json', 'utf8');
    allData = JSON.parse(allData);
    const id = uuidv4();
    const data = {
        number: req.body.number,
        size: req.body.size,
        color: req.body.color,
        id
    };
    promiseId = req.body.promiseId
    allData.push(data);
    allData = JSON.stringify(allData);
    fs.writeFileSync('./data.json', allData, 'utf8');

    res.json({
        message: 'OK',
        promiseId,
        id
    });
});


app.delete('/dices/:id', (req, res) => {
    let allData = fs.readFileSync('./data.json', 'utf8');
    allData = JSON.parse(allData);
    let deletedData = allData.filter(d => req.params.id !== d.id);
    deletedData = JSON.stringify(deletedData);
    fs.writeFileSync('./data.json', deletedData, 'utf8');

    res.json({ message: 'OK' });
});






app.listen(port, () => {
    console.log(`Dices is on port number: ${port}`);
});