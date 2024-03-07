const httpStatus = {
	// 1xx - Informational
	// 2xx - Successful
	OK: 200, 				// operation completed successfully
	CREATED: 201,			// resource was successfully created
	ACCEPTED: 202,			// request was successful, but server will respond later, because job has been queued
	NO_CONTENT: 204,		// request was successful, but there is no data to return, like in delete request
	// 3xx - Redirection
	MOVED_PERMANENTLY: 301,	// resource has been permanently moved to a new location
	FOUND: 302,				// resource has been temporarily moved to a new location
	NOT_MODIFIED: 304,		// notify client that requested resource has not changed
	// 4xx - Client error
	BAD_REQUEST: 400,		// data being sent to the client is incorrect, malformed, missing, or in some way unusable by the server
	UNAUTHORIZED: 401,		// this response means "unauthenticated"
	FORBIDDEN: 403,			// client is authenticated, but don't have permission to perform this request
	NOT_FOUND: 404,			// resource was not found
	CONFLICT: 409,			// response is sent when a request conflicts with the current state of the server
	TOO_MANY_REQUESTS: 429,	// client is sending too many requests, used for API limiting
	// 5xx - Server error
	INTERNAL_SERVER_ERROR: 500, // server has encountered a situation it does not know how to handle
	SERVICE_UNAVAILABLE: 503,	// server that is down for maintenance or that is overloaded
}

export default httpStatus