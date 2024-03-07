import mongoose from 'mongoose';

const { Schema } = mongoose;

const expenseCategorySchema = new Schema({
    title: {
        type: String,
        required: true
    },
});

export default mongoose.model('ExpenseCategory', expenseCategorySchema);