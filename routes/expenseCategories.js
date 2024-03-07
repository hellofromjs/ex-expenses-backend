import express from 'express'
import { getExpenseCategories, createExpenseCategories, deleteExpenseCategories } from '../controllers/expenseCategoriesController.js'
import verifyJWT from '../middleware/verifyJWT.js'
import multer from 'multer'
import path from 'path'
import verifyRoles from '../middleware/verifyRoles.js'
import ACCOUNT_ROLES from '../config/accountRoles.js'


const router = express.Router()

router.route('/')
	.get(verifyJWT, getExpenseCategories)
	.post(verifyJWT, verifyRoles(ACCOUNT_ROLES.Admin), createExpenseCategories)

router.route('/:id')
	.delete(verifyJWT, verifyRoles(ACCOUNT_ROLES.Admin), deleteExpenseCategories)

export default router