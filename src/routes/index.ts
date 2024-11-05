import { Application } from "express";

import notificationRoute from './notificationRoute'
import formRoute from './formRoute'
import userRoute from './userRoute'
export const appRouter=(app: Application)=>{
    app.use("/api/v1", notificationRoute)
    app.use("/api/v1", formRoute)
    app.use("/api/v1", userRoute)
}