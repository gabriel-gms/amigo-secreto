import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const readAll = async () => {
    try{
        const eventos = await prisma.eventos.findMany()
        return eventos
    } catch (error) { 
        return {error}
    }
}

export const read = async () => {
    try{
        const evento = await prisma.eventos.findUnique({
            
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