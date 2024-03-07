import jwt from 'jsonwebtoken'
import config from '../config/config.js'
import User from '../model/User.js'
import httpStatus from '../helpers/httpStatusCodes.js'

const verifyJWT = (req, res, next) => {
	const authHeader = req.headers.authorization || req.headers.Authorization
	if (!authHeader?.startsWith('Bearer ')) {
		return res.sendStatus(httpStatus.UNAUTHORIZED)
	}

	const token = authHeader.split(' ')[1]

	jwt.verify(
		token,
		process.env.ACCESS_TOKEN_SECRET,
		{ algorithm: config.jwtAlgorithm },
		async (error, decoded) => {
			if (error) {
				return res.sendStatus(httpStatus.FORBIDDEN)
			}

			const user = await User.findOne({ _id: decoded.UserInfo.id }).exec()
			if (!user) {
				return res.status(httpStatus.UNAUTHORIZED).json({ "message": `No user matches ID ${id}.` })
			}

			req.user = user
			next()
		}
	)
}

export default verifyJWT