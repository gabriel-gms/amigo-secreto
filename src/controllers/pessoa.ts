import { RequestHandler } from "express";
import z from "zod"
import * as pessoa from "../services/pessoa"

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