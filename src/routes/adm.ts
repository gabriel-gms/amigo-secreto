import { Router } from "express"
import * as auth from "../controllers/auth"
import * as evento from "../controllers/eventos"
import * as grupo from "../controllers/grupo"

const router = Router()

router.post('/login', auth.login)

router.get('/ping', auth.token, (req,res)=>{
    res.json({pong: true})
})

//EVENTOS
router.get('/evento', auth.token, evento.getAll)
router.get('/evento/:id', auth.token, evento.get)
router.post('/evento', auth.token, evento.post)
router.put('/evento/:id', auth.token, evento.put)
router.delete('/evento/:id', auth.token, evento.delet)
router.delete('/evento', auth.token, evento.deletAll)

//GRUPOS
router.get('/evento/:id_evento/grupo', auth.token, grupo.getAll)
router.get('/evento/:id_evento/grupo/:id', auth.token, grupo.get)
router.post('/evento/:id_evento/grupo', auth.token, grupo.post)
router.put('/evento/:id_evento/grupo/:id', auth.token, grupo.put)
router.delete('/evento/:id_evento/grupo/:id', auth.token, grupo.delet)

//PESSOAS

export default router