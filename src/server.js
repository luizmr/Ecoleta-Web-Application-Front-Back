const express = require('express')
const server = express()

// pegar o banco de dados - esta recebendo o module.exports da const db
const db = require('./database/db.js')

// configurar caminhos da aplicação -> pagina inicial
// get -> verbo http -> fluxo da aplicação -> ta pedindo "/"
// req -> requisição(pergunta)
// res -> resposta
// server.get('/', (req, res) => {
//     // manda resposta pro servidor
//     res.send('Cheguei')
// })

// Configurar pasta public
// traz os arquivos desta pasta para o mesmo direotio da pagina inicial
server.use(express.static('public'))

// habilitar o uso do req.body
server.use(express.urlencoded({ extended: true }))

// utilizando template engine -> pedindo o pacote instalado e salvando na variavel
const nunjucks = require('nunjucks')
// pede o caminho dos arquivos html / sem cache e liga o nunjucks ao express server
nunjucks.configure('src/views', { express: server, noCache: true })

server.get('/', (req, res) => {
    // manda resposta pro servidor com o arquivo que é a pag inicial
    // dirname da o nome do diretorio atual do server
    return res.render('index.html') // vai passar o index/renderizar pelo motor do nunjucks
})

server.get('/create-point', (req, res) => {
    // req.query - query strings da nossa url - onde aparece os dados enviados

    // manda resposta pro servidor com o arquivo que é a pag inicial
    // dirname da o nome do diretorio atual do server
    return res.render('create-point.html')
})

server.post('/savepoint', (req, res) => {
    // req.body -> corpo do formulario
    // inserir dados no banco de dados

    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?, ?, ?, ?, ?, ?, ?);
    ` // insere na tabela places os items da tabela com seus valores
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items,
    ] //valores a serem inseridos no db

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.send('Erro no Cadastro')
        }

        console.log('Cadastrado com Sucesso')
        // this referencia a resposta que o run vai ter
        console.log(this)

        return res.render('create-point.html', { saved: true })
    }

    // função callback no terceiro item - so vai ser executada quando query e values forem obtidos
    db.run(query, values, afterInsertData) // se deixar sem (err), ela ira funcionar como callback, nao vai chamar imediatamente a função
})

server.get('/search', (req, res) => {
    //pesquisa vazia

    const search = req.query.search

    if (search == '') {
        return res.render('search_results.html', { total: 0 })
    }
    // pegar os dados
    // like -> %--% -> qualquer coisa com tal palavra vem, ou antes, ou depois

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }

        const total = rows.length

        //console.log('Aqui estao os registros')
        //console.log(rows) // pra ver se os dados estao chegando

        // manda resposta pro servidor com o arquivo que é a pag inicial
        // dirname da o nome do diretorio atual do server
        // mostrar a pagina html com os dados do banco de dados {place rows}
        return res.render('search_results.html', { places: rows, total: total })
    })
})

// ligar o servidor
server.listen(3000)
