const express = require('express')
const server = express()
const db = require('./database/db')

// config pasta public
server.use(express.static('public'))

// habilitar req.body
server.use(express.urlencoded({ extended: true }))

// utilizando template engine
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
  express: server,
  noCache: true
})

// configurando caminhos da aplicação
server.get('/', (req, res) => {
  return res.render('index.html', {
    title: 'Um título'
  })
})

server.get('/create-point', (req, res) => {
  return res.render('create-point.html')
})

server.post('/savepoint', (req, res) => {
  // console.log(req.body)

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
    ) VALUES (?,?,?,?,?,?,?);
  `

  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items
  ]

  function afterInsertData(err) {
    if(err) {
      console.log(err)
      return res.render('create-point.html', { saved: false })
    }

    console.log('Cadastrado com sucesso!')
    console.log(this)

    return res.render('create-point.html', { saved: true })
  } 

  db.run(query, values, afterInsertData)

})

server.get('/search', (req, res) => {
  const search = req.query.search
  if(search === '') {
    return res.render('search-results.html', { total: 0 })
  } 

  // pegar os dados do bd
  // consultar dados
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
    if(err) return console.log(err)

    // passando o total de registros
    const total = rows.length

    // mostrar a pagina + enviando os dados
    return res.render('search-results.html', { places: rows, total })
  })

})


// servidor
server.listen(3000, () => {
  console.log('---------')
  console.log('Server on http://localhost:3000')
  console.log('---------')
})