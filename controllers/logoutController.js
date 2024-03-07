import User from '../model/User.js'
import httpStatus from '../helpers/httpStatusCodes.js'

const handleLogout = async (req, res) => {
	// TIP: delete accessToken on the client

	const cookies = req.cookies
	if (!cookies?.jwt) {
		return res.sendStatus(httpStatus.NO_CONTENT)
	}

	const refreshToken = cookies.jwt

	const foundUser = await User.findOne({ refreshToken }).exec()

	if (foundUser) { // delete refreshToken in the database
		foundUser.refreshToken = ''
		await foundUser.save()
	}

	// delete refreshToken cookie on the client
	res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
	res.sendStatus(httpStatus.NO_CONTENT)
}

export { handleLogout }