import jwt from 'jsonwebtoken'
import User from '../model/User.js'
import config from '../config/config.js'
import httpStatus from '../helpers/httpStatusCodes.js'
import { createAccessToken } from '../helpers/helpers.js'

const handleRefreshToken = async (req, res) => {
	const cookies = req.cookies
	
	if (!cookies?.jwt) {
		return res.sendStatus(httpStatus.UNAUTHORIZED)
	}

	const refreshToken = cookies.jwt

	const foundUser = await User.findOne({ refreshToken }).exec()
	if (!foundUser) {
		return res.sendStatus(httpStatus.FORBIDDEN)
	}

	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET,
		{ algorithm: config.jwtAlgorithm },
		(error, decoded) => {
			if (error || foundUser._id.toString() !== decoded.id) return res.sendStatus(httpStatus.FORBIDDEN)
			
			const accessToken = createAccessToken(foundUser, foundUser.roles)
			res.json({ id: foundUser._id, roles: foundUser.roles, accessToken, username: foundUser.username })
		}
	)
}

export { handleRefreshToken }