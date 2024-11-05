

import express from 'express'
import { notificationController } from '~/controllers/notificationController'

const router = express.Router()

router.post('/notification',notificationController.createNotification)
router.post('/filter-notification',notificationController.getAllNotification)
router.put('/notification',notificationController.updateNotification)

export default router