const express = require("express")

const router = express.Router()



const app = express()
app.use(express.json())
const porta = 1111



const livros = [
{
    nome: '1984',
    categoria: 'Romance distópico',
    autor: 'George Orwell'
},
{
    nome: 'Amanhã, amanhã, e ainda outro amanhã',
    categoria: 'Romance',
    autor: 'Gabrielle Zevin'
},
{
    nome: 'Os Sete Maridos de Evelyn Hugo',
    categoria: 'Romance',
    autor: 'Taylor Jenkins Reid'
}
]

    function mostraLivro(request, response) {

        response.json(livros) 
    }
function mostraPorta() {

    console.log("Servidor criado e rodando na porta ", porta)

}



app.use(router.get('/livros', mostraLivro))

app.listen(porta, mostraPorta)