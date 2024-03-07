import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../model/User.js'
import httpStatus from '../helpers/httpStatusCodes.js'
import { createAccessToken } from '../helpers/helpers.js'
import config from '../config/config.js'

const handleLogin = async (req, res) => {
	const { email, password } = req.body

	if (!email || !password) {
		return res.status(httpStatus.BAD_REQUEST).json({ 'message': 'Email and password are required.' })
	}

	// check if user with provided details exist
	const foundUser = await User.findOne({ email: email }).exec()
	if (!foundUser) {
		return res.status(httpStatus.UNAUTHORIZED).json({ 'message': 'Email and/or password are incorrect.' })
	}

	// check if password is correct
	const match = await bcrypt.compare(password, foundUser.password)

	if (match) {
		// create JWTs
		const accessToken = createAccessToken(foundUser, foundUser.roles)

		const refreshToken = jwt.sign(
			{ "id": foundUser._id },
			process.env.REFRESH_TOKEN_SECRET,
			{ expiresIn: config.refreshTokenExpiration, algorithm: config.jwtAlgorithm }
		)

		// save refreshToken with current user
		foundUser.refreshToken = refreshToken
		await foundUser.save()

		// send Secure Cookie with refresh token
		res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: config.refreshTokenExpirationMs })

		// send authorization roles and access token to user
		res.json({ id: foundUser._id, roles: foundUser.roles, accessToken, username: foundUser.username })

	} else {
		res.sendStatus(httpStatus.UNAUTHORIZED)
	}
}

export { handleLogin }