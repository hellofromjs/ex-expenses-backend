import jwt from 'jsonwebtoken'
import config from "../config/config.js"

export function createAccessToken(user, roles) {
	return jwt.sign(
		{
			"UserInfo": {
				"id": user._id,
				'username': user.username,
				"roles": roles,
			}
		},
		process.env.ACCESS_TOKEN_SECRET,
		{
			expiresIn: config.accessTokenExpiration,
			algorithm: config.jwtAlgorithm
		}
	)
}