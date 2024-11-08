import { Request, Response } from 'express';
import { formService } from '~/services/formService';



export const formController={
    createForm:async (req: Request, res: Response):Promise<any>=>{
        try{
            const result = await formService.createForm(req.body)
            return res.json(result)
        }catch(error){

        }
    },
   
}