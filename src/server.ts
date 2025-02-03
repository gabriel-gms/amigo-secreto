import express, { urlencoded } from 'express'
import cors from 'cors'
import 'dotenv/config'
import https from 'https'
import http from 'http'

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

const runServer = (port:number, server: http.Server) => {
    app.listen(port, ()=>{
        console.log(`Server rodando na ${port}`)
    })
}

