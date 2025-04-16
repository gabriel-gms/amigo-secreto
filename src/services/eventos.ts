import { PrismaClient, Prisma } from "@prisma/client"
import * as people from "./pessoa"
import { number } from "zod"
import * as encrypt from "../util/match"

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

export const sorteio = async (id:number): Promise<boolean>=>{
    const eventItem = await prisma.eventos.findFirst({ where: { id }, select: { agrupado: true } })

    if(eventItem){
        const peopleList = await people.readAll({ id_evento: id })
        if(peopleList){
            let sortedList: { id: number, match: number }[] = []
            let sortable: number[] = []

            let attempts = 0
            let maxAttempts = peopleList.length
            let keepTrying = true
            while(keepTrying && attempts < maxAttempts){
                keepTrying = false
                attempts++
                sortedList = []
                sortable = peopleList.map(v =>  v.id )

                for(let i in peopleList){
                    let sortableFiltered: number[] = sortable
                    if(eventItem.agrupado){
                        sortableFiltered = sortable.filter(sortableItem => {
                            let sortablePerson = peopleList.find(item => item.id === sortableItem)
                            return peopleList[i].id_grupo !== sortablePerson?.id_grupo
                        })
                    }

                    if(sortableFiltered.length === 0 || (sortableFiltered.length === 1 && peopleList[i].id === sortableFiltered[0])){
                        keepTrying = true
                    } else {
                        let sortedIndex = Math.floor(Math.random() * sortableFiltered.length)
                        while(sortableFiltered[sortedIndex] === peopleList[i].id){
                            sortedIndex = Math.floor(Math.random() * sortableFiltered.length)
                        }

                        sortedList.push({
                            id: peopleList[i].id,
                            match: sortableFiltered[sortedIndex]
                        })
                        sortable = sortable.filter(item => item !== sortableFiltered[sortedIndex])
                    }
                }
            }

            console.log(`ATTEMPTS: ${attempts}`);
            console.log(`MAX ATTEMPTS: ${maxAttempts}`);
            console.log(sortedList);
            

            if(attempts < maxAttempts){
                for (let i in sortedList){
                    await people.update({
                        id: sortedList[i].id,
                        id_evento: id
                    }, { amigo_secreto: encrypt.encryptMatch(sortedList[i].match) })
                }
                return true
            }
        }
    }

    return false
}