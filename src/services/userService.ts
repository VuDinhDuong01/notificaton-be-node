
import {client} from '~/utils/connect-db'

export const userService={
    login:async (payload:{name: string, password: string })=>{
        const insert = 'SELECT * FROM users WHERE name = $1 AND password = $2'
        const values = [payload.name, payload.password]
        const result=  await client.query(insert, values);
        return result.rows[0]
    }, 
    getAllUser:async ()=>{
        const result = await client.query('SELECT * FROM users')
        return result.rows
    }, 
}