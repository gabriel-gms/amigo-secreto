import { PrismaClient, Prisma } from "@prisma/client"
import * as evento from "./eventos"

const prisma = new PrismaClient()

export const readAll = async (id_evento:number) => {
    try {
        const all = await prisma.grupo.findMany({
            where: { id_evento }
        })
        return all
    } catch (error) {
        return false
    }    
}

export const read = async (id_evento: number, id: number) => {
    try {
        const group = await prisma.grupo.findFirst({
            where: { id, id_evento }
        })
        return group
    } catch (error) {
        return false
    }
}

type GroupCreateData = Prisma.Args<typeof prisma.grupo, 'create'>['data']
export const create = async (data: GroupCreateData) => {
    try {
        if(!data.id_evento){
            return false
        }
        
        const grupoId = await evento.read(data.id_evento)
        if(!grupoId){
            return false
        }

        return await prisma.grupo.create({
            data
        })
    } catch (error) {
        return false
    }
}

type upFilters = { id: number, id_evento: number }
type GroupUpData = Prisma.Args<typeof prisma.grupo, 'update'>['data']
export const update = async (filter: upFilters, data:GroupUpData) => {
    try {
        return await prisma.grupo.update({
            where: filter,
            data
        })
    } catch (error) {
        return false
    }
}

type deleteFilters = { id: number, id_evento: number }
export const excluir = async (filter: deleteFilters) => {
    try {
        return await prisma.grupo.delete({
            where: filter
        })
    } catch (error) {
        return false
    }
}