import mongoose, { Schema } from 'mongoose'

const ObjectId = mongoose.Types.ObjectId;
const notificationSchema = new Schema({
  sender_notification: { type: ObjectId, default: null },
  receiver_notification: { type: ObjectId, default: null },
  content: { type: String, default: '' },
  check_view_notification: { type: Boolean, default: false },
  created_At: { type: Date, default: Date.now },
  created_By: { type: ObjectId, default: null },
  updated_At: { type: Date, default: Date.now },
  updated_By: { type: ObjectId, default: null }
}, {
  collection: 'notification'
})


notificationSchema.pre('save', function (next) {
  if (this.isNew || this.isModified("updated_By")) {
    if (this.created_At.getTime() === this.updated_At.getTime()) {
      (this.updated_At as any) = null
    }
  }
  next()
});
export const notificationModel = mongoose.model('notification', notificationSchema)
