import { RequestHandler } from "express";
import { z } from "zod";

export const login: RequestHandler = (req, res) => {
    const passValidator = z.object({
        password: z.string()
    })
    const validator = passValidator.safeParse(req.body)
    if(!validator.success){
        res.json({ erro: 'senha invalida' })
        return
    }

    
}