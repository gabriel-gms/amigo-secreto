import { Router } from "express"
import * as auth from "../controllers/auth"
import * as evento from "../controllers/eventos"

const router = Router()

router.post('/login', auth.login)

router.get('/ping', auth.token, (req,res)=>{
    res.json({pong: true})
})

router.get('/evento', auth.token, evento.getAll)
router.get('/evento/:id', auth.token, evento.get)
router.post('/evento', auth.token, evento.post)
router.put('/evento/:id', auth.token, evento.put)

export default router