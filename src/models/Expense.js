import mongoose from 'mongoose'
const { Schema } = mongoose

const expenseSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  notes: { type: String },
})

export default mongoose.models.Expense || mongoose.model('Expense', expenseSchema)
