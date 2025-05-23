import { RequestHandler } from "express"
import * as eventos from "../services/eventos"
import z, { boolean, string } from "zod"
import * as pessoas from "../services/pessoa"

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
    const { id } = req.params
    const event = await eventos.read( parseInt(id) )

    if(!event){
        res.json({ message: "não existe esse evento"})
    }

    res.json({ evento: event })
    return
}

export const post: RequestHandler = async (req, res) => {
    const validatorDatas = z.object({
        name: string(),
        agrupado: boolean(),
        status: boolean()
    })

    const dataEvents = validatorDatas.safeParse(req.body)

    if(!dataEvents.success) { 
        res.json({ message: "dados incorretos" }) 
        return 
    }

    const event = await eventos.create(dataEvents.data)
    res.json({ eventos: event })
}

export const put: RequestHandler = async (req, res) => {
    const {id} = req.params

    const validatorDatas = z.object({
        name: string().optional(),
        agrupado: boolean().optional(),
        status: boolean().optional()
    })

    const dataUp = validatorDatas.safeParse(req.body)

    if(!dataUp.success){
        res.json({message: "dados inválidos"})
        return
    }

    const eventUp = await eventos.update(parseInt(id), dataUp.data)

    if(eventUp){

        if(eventUp.status){
            const sorteio = await eventos.sorteio(parseInt(id))
            if(!sorteio){
                res.json({msg: "impossivel de sortear"})
            }
        }
        else {
            await pessoas.update({id_evento: parseInt(id)}, {amigo_secreto: ''})
        }

        res.json({eventUpgrade: eventUp})
        return
    }

    res.json({message: "evento não modificado"})
    return
}

export const delet: RequestHandler = async (req,res) => {
    const {id} = req.params

    const eventoDeletado = await eventos.deletar(parseInt(id))

    if(eventoDeletado){
        res.json({ evento: eventoDeletado })
        return
    }

    res.json({message: "evento não existe"})
    return
}

export const deletAll: RequestHandler = async (req, res) => {
    const eventosDeletados = await eventos.deletarTodos()

    if(eventosDeletados){
        res.json({ deletados: eventosDeletados })
        return
    }

    res.json({ message: "não foi possivel deletar todos" })
    return
}