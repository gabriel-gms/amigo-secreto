import { RequestHandler } from "express"
import * as grupo from "../services/grupo"
import z, { boolean, string } from "zod"

export const getAll: RequestHandler = async (req, res) => {
    const {id_evento} = req.params
    const allGroups = await grupo.readAll(parseInt(id_evento))
    if(allGroups) {
        res.json({ grupos: allGroups }); return
    }
    res.json({ message: "não foi possível pegar os grupos" }); return
}

export const get: RequestHandler = async (req, res) => {
    const {id_evento} = req.params
    const {id} = req.params

    const group = await grupo.read(parseInt(id_evento), parseInt(id))

    if(group) {
        res.json({ grupo: group })
        return
    }

    res.json({ message: "grupo não encontrado" })
}

export const post: RequestHandler = async (req, res) => {
    const validatorDatas = z.object({
        name_grupo: z.string()
    })

    const group = validatorDatas.safeParse(req.body)

    if(!group.success) {
        res.json({message: "dados inválidos"})
        return
    }

    const {id_evento} = req.params

    const postGroup = await grupo.create({
        name_grupo: group.data.name_grupo,
        id_evento: parseInt(id_evento)
    })

    if(!postGroup) {
        res.json({message:"não foi possivel criar o grupo"})
        return
    }

    res.json({ grupo: postGroup })
}

export const put: RequestHandler = async (req,res) => {
    const validatorDatas = z.object({
        name_grupo: z.string().optional()
    })

    const groupEdit = validatorDatas.safeParse(req.body)

    if(!groupEdit.success) {
        res.json({message: "dados inválidos"})
        return
    }

    const { id_evento } = req.params
    const { id } = req.params

    const upGroup = await grupo.update({
        id: parseInt(id),
        id_evento: parseInt(id_evento)
    }, req.body)

    if(!upGroup) {
        res.json({message:"não foi possivel criar o grupo"})
        return
    }

    res.json({ grupo: upGroup })
}

export const delet: RequestHandler = async (req, res) => {
    const { id, id_evento } = req.params

    const deletado = await grupo.excluir({
        id: parseInt(id),
        id_evento: parseInt(id_evento)
    })

    if(!deletado) {
        res.json({message:"não foi possivel deletar"})
        return
    }

    res.json({ grupoDeletado: deletado })
} 