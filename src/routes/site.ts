import { Router } from 'express'
import * as event from '../controllers/eventos'

const router = Router()

router.get('/ping', (req,res)=>{
    res.json({pong: true})
})

router.get('/event/:id', event.get)


export default router 