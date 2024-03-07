import mongoose from 'mongoose';

const { Schema } = mongoose;

const expenseSchema = new Schema({
    kind: {
        type: Number, // 0 - income (money in); 1 - expense (money out)
        required: true,
    },
	amount: {
        type: Number,
        required: true
    },
	time: {
        type: Date,
        required: true
    },
	user_id: {
        type: Schema.Types.ObjectId,
		ref: 'User',
        required: true
    },
    expense_category: {
        type: Schema.Types.ObjectId,
        ref: 'ExpenseCategory',
        required: true
    },
});

export default mongoose.model('Expense', expenseSchema);