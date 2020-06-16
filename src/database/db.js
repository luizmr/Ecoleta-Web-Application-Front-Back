// importar a dependencia do sqlite3
// verbose metodo do sqlite pra leitura
const sqlite3 = require('sqlite3').verbose()

// criar o objeto que irá fazer operações no banco de dados
// new mais classe mais construtor - metodo dabase com argumento que irá entender que tera que criar uma database com o caminho informado
const db = new sqlite3.Database('./src/database/database.db')

module.exports = db

// utilizar o objeto do db para nossas operações
// serialize() -> vai rodar uma função
// db.serialize(() => {
//     // criar uma tabela com comandos SQL (tudo com comando sql)
//     // run vai ler a string e interpretar o codigo sql
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `) // vai dizer as colunas dentro da tabela - ID INTEIRO, CHAVE PRIMARIA E SE AUTO INCREMENTA
//     // todas as tabelas criadas -> se a tabela nao existir, ela cria. se existir, ela nao faz nada

//     // inserir dados na tabela
//     const query = `
//     INSERT INTO places (
//         image,
//         name,
//         address,
//         address2,
//         state,
//         city,
//         items
//     ) VALUES (?, ?, ?, ?, ?, ?, ?);
// ` // insere na tabela places os items da tabela com seus valores
//     const values = [
//         'https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1602&q=80',
//         'Papersider',
//         'Guilherme Gemballa, Jardim América',
//         'Nº 260',
//         'Santa Catarina',
//         'Rio do Sul',
//         'Papéis e Papelão',
//     ] //valores a serem inseridos no db

//     function afterInsertData(err) {
//         if (err) {
//             return console.log(err)
//         }

//         console.log('Cadastrado com Sucesso')
//         // this referencia a resposta que o run vai ter
//         console.log(this)
//     }

//     // função callback no terceiro item - so vai ser executada quando query e values forem obtidos
//     db.run(query, values, afterInsertData) // se deixar sem (err), ela ira funcionar como callback, nao vai chamar imediatamente a função

// consultar dados na tabela
// seleciona todos os dados da tabela places
// rows sao os registros da tabela
// db.all(`SELECT * FROM places`, function (err, rows) {
//     if (err) {
//         return console.log(err)
//     }

//     console.log('Aqui estao os registros')
//     console.log(rows)
// })

// deletar um dado na tabela
// vai deletar onde id =1
//     db.run(`DELETE FROM places WHERE id = ?`, [3], function (err) {
//         if (err) {
//             return console.log(err)
//         }

//         console.log('Registro deletado com sucesso')
//     })
// })
