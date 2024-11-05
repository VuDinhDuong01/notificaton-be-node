
import { client } from "~/utils/connect-db"

export const notificationService={
    createNotification:async (payload: any)=>{
        const insert = 'INSERT INTO notification(sender_id, receiver_id,content ) VALUES ($1, $2, $3) RETURNING *'
        const values = [payload.sender_id, payload.receiver_id, payload.content]
        const result=  await client.query(insert, values);
        return result.rows[0]
    },

    updateNotification:async(payload:any)=>{
        const update = 'UPDATE notification SET check_view_notification = $1 WHERE id = $2 RETURNING *';
        const values = [payload.check_view_notification, payload.id]
        const result=  await client.query(update, values);
        return result.rows[0]
    },

    getNotification: async (payload: any)=>{
          const select = 'SELECT * FROM notification WHERE receiver_id = $1 ORDER BY created_at DESC';
        const values = [payload.id]
        const result=  await client.query(select, values);
        return result.rows
    }
}