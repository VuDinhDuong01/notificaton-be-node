import Router from 'express'
import { formController } from '~/controllers/formController'


const router = Router()

router.post('/form',formController.createForm)


export default router