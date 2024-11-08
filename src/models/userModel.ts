import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
  username: { type: String, default: '' },
  password:{type: String, default:""}
},{
  collection:'user'
})

export const userModel = mongoose.model('user', userSchema)
