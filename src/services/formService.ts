import { formModel } from "~/models/formModel"
import { client } from "~/utils/connect-db";


export const formService={
    createForm:async(payload: any)=>{
        const insert = 'INSERT INTO form(title,user_created) VALUES ($1, $2) RETURNING *'
        const values = [payload.title, payload.user_created]
        const result=  await client.query(insert, values);
        return result.rows[0]
    }
}