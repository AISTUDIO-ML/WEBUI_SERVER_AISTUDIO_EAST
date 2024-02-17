import mongoose, { Schema } from 'mongoose'

mongoose.connect('mongodb://localhost:27017/aistudio')

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  billing_email: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    required: true
  },
  tax_id: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  languages: {
    type: Array<string>,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  shipping_address: {
    type: Boolean,
    required: true
  },
  last_login: {
    type: Date,
    default: Date.now()
  }
})

export default mongoose.models.User || mongoose.model('User', UserSchema, 'users')
