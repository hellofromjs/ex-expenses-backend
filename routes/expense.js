import express from 'express'
import { getExpenses, createExpense, deleteExpense } from '../controllers/expenseController.js'
import verifyJWT from '../middleware/verifyJWT.js'
import multer from 'multer'
import path from 'path'
import verifyRoles from '../middleware/verifyRoles.js'
import ACCOUNT_ROLES from '../config/accountRoles.js'


const router = express.Router()

router.route('/')
	.get(verifyJWT, verifyRoles(ACCOUNT_ROLES.Admin, ACCOUNT_ROLES.User), getExpenses)
	.post(verifyJWT, verifyRoles(ACCOUNT_ROLES.Admin, ACCOUNT_ROLES.User), createExpense)

router.route('/:id')
	.delete(verifyJWT, verifyRoles(ACCOUNT_ROLES.Admin, ACCOUNT_ROLES.User), deleteExpense)

export default router