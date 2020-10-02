const express = require('express');
const cors = require('cors');
const monk = require('monk');

const app = express();
const db = monk('localhost/poppem');
const pops = db.get('pops');

app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        message: 'Poppem! 🤖'
    });
});

function isValidPop(pop){
    return pop.name && pop.name.toString().trim() !== '' &&
    pop.content && pop.content.toString().trim() !== '';

}

app.post('/pops', (req, res) => {
    if(isValidPop(req.body)){
        //insert into db..
        const pop = {
            name: req.body.name.toString(),
            content: req.body.content.toString(),
            created: new Date()
        };

        pops
            .insert(pop)
            .then(createdPop => {
                res.json(createdPop);
            });
    } else{
        res.status(422);
        res.json({
            message: 'Hey! Name and Content are Required!'
        });
    }
});


app.listen(5000, () => {
    console.log('Listening on http://localhost: 5000');
});