import express from 'express'
import openDB  from '../configDB.js'

const router = express.Router()

router.get('/login', async (req, res) => {
  const query = 'SELECT * FROM Usuarios WHERE email = :email and senha = :senha'
  const { email, senha } = req.body
  const db = await openDB()
  await db.get(query, { ':email': email, ':senha': senha })

  res.send({ msg: 'Login feito', email })
})

router.get('/', async (req, res) => {
  const query = 'SELECT * FROM Usuarios'
  const db = await openDB()
  const resultado = await db.all(query)

  res.send(resultado)
})

router.post('/', async (req, res) => {
  const { nome, email, senha } = req.body
  const query = 'INSERT INTO Usuarios(nome, email, senha) VALUES (:nome, :email, :senha)'
  const db = await openDB()
  await db.run(query, {
    ':nome': nome,
    ':email': email,
    ':senha': senha
  })

  res.send('Usuario criado!')
})

router.put('/:id', async (req, res) => {
  const { nome, email, senha } = req.body

  const query = 'UPDATE Usuarios SET nome=?, email=? ,senha=? WHERE id = ?'
  const queryDois = 'SELECT * FROM Usuarios WHERE id = :id'

  const db = await openDB()

  await db.run(query, nome, email, senha, req.params.id)
  const resultado = await db.get(queryDois, { ':id': req.params.id })

  res.send(resultado)
})

router.delete('/:id', async (req,res) => {
  const db = await openDB()
  const query = 'DELETE FROM Usuarios WHERE id=?'
  await db.run(query, req.params.id)
  res.send('Deletado usuario!')
})

export default router
