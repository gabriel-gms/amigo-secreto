import { PrismaClient, Prisma } from "@prisma/client"

const prisma = new PrismaClient()

type listenner = { id_evento: number, id_grupo?: number }
export const readAll = async (filter: listenner)=>{
    try {
        return await prisma.pessoas.findMany({
            where: filter
        })
    } catch (error) {
        return false
    }
}

type listennerOne = { id_evento: number, id_grupo?: number, id: number, cpf?: string }
export const read = async (filter: listennerOne)=>{
    try {
        return await prisma.pessoas.findFirst({
            where: filter
        })
    } catch (error) {
        return false
    }
}

type peopleCreateData = Prisma.Args<typeof prisma.pessoas, 'create'>['data']
export const create = async (data: peopleCreateData)=>{
    try {
        return await prisma.pessoas.create({
            data
        })
    } catch (error) {
        return false
    }
}

type upPeopleData = { id_evento: number, id_grupo?: number, id?: number }
type peopleUpData = Prisma.Args<typeof prisma.pessoas, 'update'>['data']
export const update = async (filter: upPeopleData, data: peopleUpData)=>{
    try {
        return await prisma.pessoas.updateMany({
            where: filter,
            data
        })
    } catch (error) {
        return false
    }
}

type deletePeople = { id_evento?: number, id_grupo?: number, id: number }
export const deletPeople = async (filter: deletePeople) => {
    try {
        return await prisma.pessoas.delete({
            where: filter
        })
    } catch (error) {
        return false
    }
}