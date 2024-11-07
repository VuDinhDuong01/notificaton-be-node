import mongoose, { Schema } from 'mongoose'

const ObjectId= mongoose.Types.ObjectId;
const formSchema = new Schema({
  title: { type: String, default: '' },
  user_create:{type: ObjectId, default: null}
},{
  collection:'form'
})

export const formModel = mongoose.model('form', formSchema)
