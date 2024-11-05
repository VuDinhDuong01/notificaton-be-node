import { Request, Response } from 'express';
import { notificationService } from '~/services/notificationService';


export const notificationController={
    createNotification:async (req: Request, res: Response):Promise<any>=>{
        try{
            const result = await notificationService.createNotification(req.body)
            return res.json(result)
        }catch(error){
            console.log(error)
        }
    },
     getAllNotification:async (req: Request, res: Response):Promise<any>=>{
        try{
            const result = await notificationService.getNotification(req.body)
            return res.json(result)
        }catch(error){
            console.log(error)
        }
    },
     updateNotification:async (req: Request, res: Response):Promise<any>=>{
        try{
            const result = await notificationService.updateNotification(req.body)
            return res.json(result)
        }catch(error){
            console.log(error)
        }
    }
}