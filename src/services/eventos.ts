import { PrismaClient, Prisma } from "@prisma/client"

const prisma = new PrismaClient()

export const readAll = async () => {
    try{
        const eventos = await prisma.eventos.findMany()
        return eventos
    } catch (error) { 
        return {error}
    }
}

export const read = async ( id: number ) => {
    try{
        const evento = await prisma.eventos.findFirst({
            where: {
                id
            } 
        })
        return evento
    } catch (error) { 
        return false
    }
}

type EventPostData = Prisma.Args<typeof prisma.eventos, 'create'>['data']
export const create = async (dataEvents: EventPostData) => {
    try {
        const createEvent = await prisma.eventos.create({
            data: dataEvents
        })
        return createEvent
    } catch (error) {
        return {error}
    }
}

type EventUpData = Prisma.Args<typeof prisma.eventos, 'update'>['data']
export const update = async (id: number, data: EventUpData) => {
    try {
        const eventoModificado = await prisma.eventos.update({
            where: {id},
            data
        })
        return eventoModificado
    } catch (error) {
        return false
    }
}

export const deletar = async (id:number) => {
    try {
        const deletado = prisma.eventos.delete({
            where: {id}
        })
        return deletado
    } catch (error) {
        return false
    }
}

export const deletarTodos = async () => {
    try {
        const todos = await prisma.eventos.deleteMany()
        return todos
    } catch (error) {
        return false
    }
}