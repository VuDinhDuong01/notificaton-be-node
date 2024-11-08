import { Request, Response } from 'express';
import { userService } from '~/services/userService';


export const userController={
    login:async (req: Request, res: Response):Promise<any>=>{
        try{
            const result = await userService.login(req.body)
            return res.json(result)
        }catch(error){
            console.log(error)
        }
    },

    getAllUser:async (req: Request, res: Response):Promise<any>=>{
        try{
            const result = await userService.getAllUser()
        
            return res.json(result)
        }catch(error){

        }
    }
}