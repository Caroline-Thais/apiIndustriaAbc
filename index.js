const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const connection = require('./API maquinas/database/database');
const Maquina = require('./API maquinas/database/Maquina');

const port = process.env.PORT || 8087;

//Configuração cors
app.use(cors());

//Configurações body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Banco de dados
connection.authenticate().then(() => {
    console.log('Conectado com o bd.')
}).catch(error => {
    console.log('error')
});


//Porta
app.listen(8087, () => {
    console.log("Api rodando na porta 8087.");
});

/*//"Banco de dados"
var DB = {
    maquinas: [
        {
            id: 1,
            name: "13",
            status: "funcionando"
        },
        {
            id: 2,
            name: "29",
            status: "parada"
        },
        {
            id: 3,
            name: "56",
            status: "manutenção"
        }
    ]
}*/

//Endpoints
app.get("/maquinas", (req, res) => {
    res.statusCode = 200;
    res.json(DB.maquinas);
});

app.get("/maquinas/:id", (req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);
        var maquina = DB.maquinas.find(m => m.id == id);
        if(maquina != undefined){
            res.statusCode = 200;
            res.json(maquina);
        }else{
            res.sendStatus(404);
        }
    }
});

app.post("/maquina", (req, res) => {
    var { name, status } = req.body;
    DB.maquinas.push({
        name,
        status
    });
    res.sendStatus(200);
});

app.delete("/maquina/:id", (req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);
        var index = DB.maquinas.findIndex(maquinas => maquinas.id == id);

        if(index == -1){
            res.sendStatus(404);
        }else{
            DB.maquinas.splice(index, 1);
            res.sendStatus(200);
        }
    }
});

app.put("/maquina/:id", (req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);
        var maquina = DB.maquinas.find(maquinas => maquinas.id == id);
        if(maquina != undefined){
            var { name, status} = req.body;
            if( name != undefined){
                maquina.name = name;
            }
            if( status != undefined){
                maquina.status = status;
            }
            res.sendStatus(200);
        }else{
            res.sendStatus(404);
        }
    }
});
