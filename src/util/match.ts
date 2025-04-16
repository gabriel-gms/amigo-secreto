export const encryptMatch = (id: number): string => {
    return `${process.env.TOKEN}${id}${process.env.TOKEN}`
}

export const decryptMatch = (match: string): number => {
    let idString: string = match
        .replace(`${process.env.TOKEN}`, '')
        .replace(`${process.env.TOKEN}`, '')
    return parseInt(idString)
}