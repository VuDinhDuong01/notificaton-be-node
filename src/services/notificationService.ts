
import { client } from "~/utils/connect-db"

export const notificationService={
    createNotification:async (payload: any)=>{
      const insert = 'INSERT INTO notification(id, sender_id, receiver_id, content) VALUES ($1, $2, $3, $4) RETURNING *';
      const newNotification = await client.query(insert, [payload.id, payload.sender_id, payload.receiver_id, payload.content])
        return newNotification.rows[0]
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