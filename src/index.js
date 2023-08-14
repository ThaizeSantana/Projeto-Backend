import express from 'express'

import produtos from './rotas/produto.js'
import usuarios from './rotas/usuario.js'

const servidor = express()
const porta = process.env.PORTA || 4000


servidor.use(express.json())
servidor.use(express.urlencoded({ extended: true}))

servidor.use('/produtos', produtos)
servidor.use('/usuarios', usuarios)

servidor.listen(porta, ()=> {
  console.log('Minha API esta rodando no http://localhost:' + porta)
})

