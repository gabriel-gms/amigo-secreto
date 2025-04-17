import { Router } from 'express'
import * as event from '../controllers/eventos'
import * as pessoa from '../controllers/pessoa'

const router = Router()

router.get('/ping', (req,res)=>{
    res.json({pong: true})
})

router.get('/event/:id', event.get)
router.get('/event/:id_event/search', pessoa.searchPerson)

export default router 