
import {client} from '~/utils/connect-db'
import { signJWT } from '~/utils/jwt';

export const userService={
    login:async (payload:{name: string, password: string })=>{
        const insert = 'SELECT * FROM users WHERE name = $1 AND password = $2'
        const values = [payload.name, payload.password]
        const result=  await client.query(insert, values);
        const token = await signJWT({user_id:result.rows[0].id})
        return {
            access_token: token,
            data: result.rows[0]
        }
    }, 
    getAllUser:async ()=>{
        const result = await client.query('SELECT * FROM users')
        return result.rows
    }, 
}