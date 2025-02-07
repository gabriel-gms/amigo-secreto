import { RequestHandler } from "express"
import * as eventos from "../services/eventos"
import z, { boolean, string } from "zod"

export const getAll:RequestHandler = async (req, res) => {
    const events = await eventos.readAll()
    
    if(!events){
        res.json({ message: "não existe eventos" })
        return
    }

    res.json ({eventos: events})
    return
}

export const get: RequestHandler = async (req, res) => {
    const event = await eventos.read()
    res.json({ evento: event })
}

export const post: RequestHandler = async (req, res) => {
    const validatorDatas = z.object({
        name: string(),
        agrupado: boolean(),
        status: boolean()
    })

    const dataEvents = validatorDatas.safeParse(req.body)

    if(!dataEvents.success) { 
        res.json({ message: "nome incorreto" }) 
        return 
    }

    const event = await eventos.create(dataEvents.data.name)
    res.json({ eventos: event })
}