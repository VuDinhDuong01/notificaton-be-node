import { client } from '~/utils/connect-db'
import { getSocket } from '~/utils/socket'
export const formService = {
  createForm: async (payload: any) => {
    const user = getSocket()
    const insertForm =
      'INSERT INTO form(content,sender_notification, receiver_notification) VALUES ($1, $2, $3) RETURNING *'
    const valuesInsertForm = [payload?.content, payload?.sender_notification, payload?.receiver_notification]
    const result = await client.query(insertForm, valuesInsertForm)

    const insert = 'INSERT INTO notification(id, sender_id, receiver_id, content) VALUES ($1, $2, $3, $4) RETURNING *'
    const valuesInsertNotification = [
      payload?.id,
      payload?.sender_notification,
      payload?.receiver_notification,
      payload?.content
    ]
    await client.query(insert, valuesInsertNotification)
    const receiver_to = user[payload?.receiver_notification]?.socket_id
    if (receiver_to) {
      const receiverSocket = user[payload?.receiver_notification]?.socket
      // gửi tới socket cụ thể
      receiverSocket.emit('server-form-data', payload)
    }
    return result.rows[0]
  }
}
