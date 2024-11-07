
import { client } from "~/utils/connect-db";
export const formService = {
  createForm: async (payload: any) => {
    const insertForm = 'INSERT INTO form(content,sender_notification, receiver_notification) VALUES ($1, $2, $3) RETURNING *'
    const valuesInsertForm = [payload?.content, payload?.sender_notification, payload?.receiver_notification]
    const result = await client.query(insertForm, valuesInsertForm)
    return result.rows[0]
  }
}