// importando sqlite3
const sqlite3 = require('sqlite3').verbose()

// criar objeto bd
const db = new sqlite3.Database('./src/database/database.db')

module.exports = db

// utilizando o db

// db.serialize(() => {
//   // criar tabela
//   // db.run(`
//   //   CREATE TABLE IF NOT EXISTS places (
//   //     id INTEGER PRIMARY KEY AUTOINCREMENT,
//   //     image TEXT,
//   //     name TEXT,
//   //     address TEXT,
//   //     address2 TEXT,
//   //     state TEXT,
//   //     city TEXT,
//   //     items TEXT
//   //   );
//   // `)

//   // // inserir dados
//   // const query = `
//   //   INSERT INTO places (
//   //     image,
//   //     name,
//   //     address,
//   //     address2,
//   //     state,
//   //     city,
//   //     items
//   //   ) VALUES (?,?,?,?,?,?,?);
//   // `

//   // const values = [
//   //   "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1101&q=80",
//   //   "Papersiders",
//   //   "Guilherme Gembala, Jardim América",
//   //   "Número 260",
//   //   "Santa Catarina",
//   //   "Rio do Sul",
//   //   "Resíduos Eletrônicos, Lâmpadas"
//   // ]

//   // function afterInsertData(err) {
//   //   if(err) {
//   //     return console.log(err)
//   //   }
//   //   console.log('Cadastrado com sucesso!')
//   //   console.log(this)
//   // } 

//   // db.run(query, values, afterInsertData)

//   // // consultar dados
//   // db.all(`SELECT * FROM places`, function(err, rows) {
//   //   if(err) return console.log(err)
//   //   console.log('Registros:')
//   //   console.log(rows)
//   // })

//   // // deletar um dado da tabela
//   // db.run(`DELETE FROM places WHERE name = ?`, ["Papersiders"], function(err) {
//   //   if(err) return console.log(err)
//   //   console.log('Registro deletado com sucesso!')
//   // })

// })