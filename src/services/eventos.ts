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
        return {error}
    }
}

export const create = async (dataEvents: string) => {
    try {
        const createEvent = await prisma.eventos.create({
            data: {
                name: dataEvents
            }
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