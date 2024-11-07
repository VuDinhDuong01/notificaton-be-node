import express from 'express'
import { userController } from '~/controllers/userController'


const router = express.Router()

router.post('/user',userController.login)
router.get('/user',userController.getAllUser)


export default router