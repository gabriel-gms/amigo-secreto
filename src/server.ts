import express, { urlencoded } from 'express'
import cors from 'cors'
import 'dotenv/config'
import https from 'https'
import http from 'http'
import siteRoutes  from './routes/site'
import { interceptador } from './util/interceptador'

//CONFIGS
const serverPort:number = process.env.PORT ? parseInt(process.env.PORT) : 9000

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//MIDDLEWARES
app.use(interceptador)

//ROUTES
app.use('/', siteRoutes)

////////////////
const runServer = (port:number, server: http.Server) => {
    server.listen(port, ()=>{
        console.log(`Server rodando na ${port}`)
    })
}

const regularServer = http.createServer(app)

if(process.env.NODE_ENV == 'production'){

}
else {
    runServer(serverPort, regularServer)
}