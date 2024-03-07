import httpStatus from "../helpers/httpStatusCodes.js"
import ExpenseCategory from "../model/ExpenseCategory.js"
import mongoose from 'mongoose'

export const getExpenseCategories = async (req, res) => {
	const result = await ExpenseCategory.find()

	if (result == null) {
		return res.sendStatus(404)
	}

	return res.status(httpStatus.OK).json({ data: result })
}

export const createExpenseCategories = async (req, res) => {
	if (!req?.body?.title) {
		return res.status(400).json({ 'message': 'Missing title' })
	}

	try {
		const result = await ExpenseCategory.create({
			title: req.body.title,
		})

        const resultExp = await ExpenseCategory.find()

		res.status(201).json(resultExp)
	} catch (error) {
		console.error(error)
	}
}

export const deleteExpenseCategories = async (req, res) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		return res.sendStatus(404)
	}

	const result = await ExpenseCategory.findByIdAndDelete(req.params.id)

    const resultExp = await ExpenseCategory.find()

	return res.status(httpStatus.OK).json(resultExp)
}



