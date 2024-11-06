import { Pool } from 'pg'

export const client = new Pool({
  user: 'postgres',
  password: '123456',
  host: 'db',
  port: 5432,
  database: 'demo'
})

const initializeDatabase = async () => {
    const userModel =  client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        password VARCHAR(100)  NOT NULL
      );
    `)


    const formModel= client.query(`
        CREATE TABLE IF NOT EXISTS form (
        id SERIAL PRIMARY KEY,
        content VARCHAR(100) NOT NULL,
        sender_notification VARCHAR(100)  NOT NULL,
        receiver_notification VARCHAR(100)  NOT NULL
      );
        `)

    const notificationModel = client.query(`  
        CREATE TABLE IF NOT EXISTS notification (
        id SERIAL PRIMARY KEY,
        sender_id VARCHAR(100) NOT NULL,
        receiver_id VARCHAR(100)  NOT NULL,
        content VARCHAR(100) NOT NULL  ,
        check_view_notification BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT NOW() 
      );`)

    await Promise.all([userModel, formModel,notificationModel])
 
}

export const connectPostgres = async () => {
  try {
    await client.connect()
    initializeDatabase()
    console.log('Connected to PostgreSQL database')
  } catch (error: any) {
    console.log('connect postgres failed:', error)
  }
}
