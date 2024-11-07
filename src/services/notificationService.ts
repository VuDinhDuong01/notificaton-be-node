import { client } from '~/utils/connect-db'
import { getSocket } from '~/utils/socket'

export const notificationService = {

  createNotification: async (payload: any) => {
    const user = getSocket()
    const insert = 'INSERT INTO notification(id, sender_id, receiver_id, content) VALUES ($1, $2, $3, $4) RETURNING *'
    const valuesInsertNotification = [
      payload?.id,
      payload?.sender_notification,
      payload?.receiver_notification,
      payload?.content
    ]
    const newNotification = await client.query(insert, valuesInsertNotification)
    const receiver_to = user[payload?.receiver_notification]?.socket_id
    if(receiver_to){
      const receiverSocket = user[payload?.receiver_notification]?.socket;
      // gửi tới socket cụ thể
      receiverSocket.emit('server-form-data', payload);
    }
    return newNotification.rows[0]
  },

  updateNotification: async (payload: any) => {
    const update = 'UPDATE notification SET check_view_notification = $1 WHERE id = $2 RETURNING *'
    const values = [payload.check_view_notification, payload.id]
    const result = await client.query(update, values)
    return result.rows[0]
  },

  getNotification: async (payload: any) => {
    const select = 'SELECT * FROM notification WHERE receiver_id = $1 ORDER BY created_at DESC'
    const values = [payload.id]
    const result = await client.query(select, values)
    return result.rows
  }
}
