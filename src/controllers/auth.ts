import { RequestHandler } from "express";
import { z } from "zod";
import * as auth  from "../services/authPassword";

export const login: RequestHandler = (req, res) => {
    const passValidator = z.object({
        password: z.string()
    })
    const validator = passValidator.safeParse(req.body)
    if(!validator.success){
        res.json({ erro: 'senha invalida' })
        return
    }

    if(!auth.passAuth(validator.data.password) === true){
        res.json({ message: "senha incorreta" })
        return
    }
    
    const token = auth.createToken()
    res.json({ message: "senha correta, aprovado"+` ${token}`})
    return
}

export const token: RequestHandler = (req, res, next) => {
    
    if(!req.headers.authorization){
        res.json({message: "acesso negado"})
        return 
    }

    const token = req.headers.authorization.split(' ')[1]
    if(!auth.validatorToken(token)){
        res.json({message: "acesso negado"})
        return
    }

    next()
}