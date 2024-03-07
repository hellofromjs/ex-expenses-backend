import httpStatus from "../helpers/httpStatusCodes.js"
import Expense from "../model/Expense.js"
import ExpenseCategory from "../model/ExpenseCategory.js"
import mongoose from 'mongoose'

export const getExpenses = async (req, res) => {
	const result = await Expense.find({ user_id: req.user._id })

	if (result == null) {
		return res.sendStatus(404)
	}

	return res.status(httpStatus.OK).json({ data: result })
}

export const createExpense = async (req, res) => {
	if (!req?.body?.kind) {
		return res.status(400).json({ 'message': 'Missing kind' })
	}
	if (!req?.body?.amount) {
		return res.status(400).json({ 'message': 'Missing amount' })
	}
	if (!req?.body?.time) {
		return res.status(400).json({ 'message': 'Missing time' })
	}
	if (!req?.body?.expense_category) {
		return res.status(400).json({ 'message': 'Missing expense_category' })
	}

	try {
		const result = await Expense.create({
			kind: req.body.kind,
			amount: req.body.amount,
			time: req.body.time,
			user_id: req.user._id,
			expense_category: req.body.expense_category,
		})

        const resultExp = await Expense.find()

		res.status(201).json(resultExp)
	} catch (error) {
		console.error(error)
	}
}

export const deleteExpense = async (req, res) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		return res.sendStatus(404)
	}

	const result = await Expense.findByIdAndDelete(req.params.id)

    const resultExp = await Expense.find()

	return res.status(httpStatus.OK).json(resultExp)
}



