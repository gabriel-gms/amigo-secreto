import { RequestHandler } from "express";
import z from "zod"
import * as pessoa from "../services/pessoa"
import { decryptMatch } from "../util/match";

export const getAll: RequestHandler = async (req,res)=>{
    const { id_evento, id_grupo } = req.params

    const all = await pessoa.readAll({
        id_evento: parseInt(id_evento),
        id_grupo: parseInt(id_grupo)
    })

    if(all){
        res.status(200).json({ pessoas: all })
        return
    }
    res.json({ message: 'não foi possivel realizar a requisição' })
    return
}

export const get: RequestHandler = async (req,res)=>{
    const { id_evento, id_grupo, id } = req.params

    const uniquePeople = await pessoa.read({
        id_evento: parseInt(id_evento),
        id_grupo: parseInt(id_grupo),
        id: parseInt(id),
    })

    if(uniquePeople){
        res.status(200).json({ pessoa: uniquePeople })
        return
    }
    res.json({ message: 'não foi possível realizar a requisição' })
    return
}

export const post: RequestHandler = async (req,res)=>{
    const validatorDatas = z.object({
        name: z.string(),
        cpf: z.string()
    })
    const peopleData = validatorDatas.safeParse(req.body)
    if(!peopleData.success){
        res.json({ message: 'dados inválidos' })
        return
    }

    const { id_evento, id_grupo } = req.params

    const createPeople = await pessoa.create({
        name: peopleData.data.name,
        cpf:peopleData.data.cpf,
        id_evento: parseInt(id_evento),
        id_grupo: parseInt(id_grupo)
    })

    if(!createPeople){
        res.json({ msg: "ocorreu um erro" })
        return
    }
    res.json({ peoples: createPeople })
}

export const put: RequestHandler = async (req, res)=>{
    const validatorDatas = z.object({
        name: z.string().optional(),
        cpf: z.string().optional(),
        amigo_secreto: z.string().optional()
    })
    const peopleData = validatorDatas.safeParse(req.body)
    if(!peopleData.success){
        res.json({ message: 'dados inválidos' })
        return
    }

    const { id_evento, id_grupo, id } = req.params

    const peopleEdit = await pessoa.update({
        id_evento: parseInt(id_evento),
        id_grupo: parseInt(id_grupo),
        id: parseInt(id)
    }, peopleData.data)

    if(!peopleData){
        res.json({ msg:"não foi possivel modificar" })
        return
    }
    res.json({ peopleUpdate: peopleEdit })
}

export const delet: RequestHandler = async (req, res)=>{
    const { id, id_evento, id_grupo } = req.params

    const peopleDeleted = await pessoa.deletPeople({
        id_evento: parseInt(id_evento),
        id_grupo: parseInt(id_grupo),
        id: parseInt(id)
    })
    if(!peopleDeleted){
        res.json({msg:"Não foi possível deletar"})
        return
    }
    res.json({ deleted: peopleDeleted })
}

export const searchPerson: RequestHandler = async (req, res) => {
    const { id_event } = req.params

    const searchPersonSchema = z.object({
        cpf: z.string()
    })
    const query = searchPersonSchema.safeParse(req.query)
    if(!query.success){
        res.json({error:'Dados inválidos'})
        return
    }

    const personItem = await pessoa.read({
        id_evento: parseInt(id_event),
        cpf: query.data.cpf
    })
    if(personItem && personItem.amigo_secreto){
        const matchId = decryptMatch(personItem.amigo_secreto)

        const personMatched = await pessoa.read({
            id_evento: parseInt(id_event),
            id: matchId
        })
        if(personMatched){
            res.json({
                person: {
                    id: personItem.id,
                    name: personItem.name
                },
                personMatched: {
                    id: personMatched.id,
                    name: personMatched.name
                }
            })
            return
        }
    }
    res.json({error:'ocorreu um erro'})
    return
}