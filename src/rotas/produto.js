import express from 'express'
import openDB  from '../configDB.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const query = 'SELECT * FROM Produtos'
  const db = await openDB()
  const resultado = await db.all(query)
  res.send(resultado)
})

router.post('/', async (req, res) => {
  const { titulo, descricao, valor } = req.body
  const query = 'INSERT INTO Produtos(titulo, descricao, valor) VALUES (:titulo, :descricao, :valor)'
  const db = await openDB()
  await db.run(query, {
    ':titulo': titulo,
    ':descricao': descricao,
    ':valor': valor
  })
  res.send('Produto criado!')
})

router.get('/:id', async (req, res) => {
  const query = 'SELECT * FROM Produtos WHERE ID = :id'
  const db = await openDB()
  const resultado = await db.get(query, { ':id': req.params.id })
  res.send(resultado)
})

router.put('/:id', async (req, res) => {
  const { titulo, descricao, valor } = req.body

  const query = 'UPDATE Produtos SET titulo=?, descricao=? ,valor=? WHERE id = ?'
  const queryDois = 'SELECT * FROM Produtos WHERE id = :id'

  const db = await openDB()

  await db.run(query, titulo, descricao, valor, req.params.id)
  const resultado = await db.get(queryDois, { ':id': req.params.id })

  res.send(resultado)
})

router.delete('/:id', async (req,res) => {
  const db = await openDB()
  const query = 'DELETE FROM Produtos WHERE id=?'
  await db.run(query, req.params.id)
  res.send('Deletado produto!')
})

export default router
