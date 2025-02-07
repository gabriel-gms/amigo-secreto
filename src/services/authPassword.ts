export const passAuth = (senha: string) => {
    const diaAtual = Intl.DateTimeFormat('pt-br').format(new Date()).split('/').join('')
    if(senha === diaAtual){
        return senha
    }
    return false
}

export const createToken = () => {
    const diaAtual = Intl.DateTimeFormat('pt-br').format(new Date()).split('/').join('')
    return `${process.env.TOKEN}${diaAtual}`
}

export const validatorToken = (token:string) => {
    const currentToken = createToken()
    return token === currentToken
}