const express = require("express")

const router = express.Router()

const cors = require('cors')

const conectaBancoDeDados = require('./bancoDeDados')
conectaBancoDeDados()

const Livro = require('./livroModel')

const app = express()
app.use(express.json())
const porta = 1111



/* lista inicial de livros q n precisa mais ser usada dps da conexao c o mongodb
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
]*/

    async function mostraLivro(request, response) {
        try {
            const verLivros = await Livro.find()
    
            response.json(verLivros)
        } catch(erro) {
            console.log(erro)
        }
    }

    async function criaLivro(request,response) {
        const novoLivro = new Livro ({
            nome: request.body.nome,
            categoria: request.body.categoria,
            autor: request.body.autor
        })
            try {
                const livroCriado = await novoLivro.save()
                response.status(201).json(livroCriado)
            } catch(erro) {
                console.log(erro)
            }
    }

    async function atualizaLivro(request, response) {
    
        try {
            const livroEncontrado = await Livro.findById(request.params.id)
            if (request.body.nome) {
                livroEncontrado.nome = request.body.nome
            }
            if (request.body.categoria) {
                livroEncontrado.categoria = request.body.categoria
            }
            if (request.body.autor) {
                livroEncontrado.autor = request.body.autor
            }
    
            const livroAtualizadoaNoBancoDeDados = await livroEncontrado.save() 
            response.json(livroAtualizadoaNoBancoDeDados)
        } catch(erro) {
            console.log(erro)
        }
    }

    async function deletaLivro(request, response) {
        try {
            await Livro.findByIdAndDelete(request.params.id)
            response.json({ mensagem: 'Livro deletado com sucesso!'})
    
        } catch(erro) {
            console.log(erro)
        }
    }

function mostraPorta() {
    console.log("Servidor criado e rodando na porta ", porta)
}



app.use(router.get('/livros', mostraLivro))
app.use(router.post('/livros', criaLivro))
app.use(router.patch('/livros/:id', atualizaLivro))
app.use(router.delete('/livros/:id', deletaLivro))

app.listen(porta, mostraPorta)