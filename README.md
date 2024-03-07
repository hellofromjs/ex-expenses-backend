## Setup

Make a copy of `.env.example` and rename it to `.env`. Provide values to `.env` file.
Run `npm install` then `npm run dev` to start application in development mode.

## Endpoints

### Login

- **Endpoint:** `/api/v1/login`
- **Method:** `POST`

```js
{
    "email": "john@gmail.com",
    "password": "123456789"
}
```

### Register

- **Endpoint:** `/api/v1/register`
- **Method:** `POST`

```js
{
	"username": "john",
    "email": "john@gmail.com",
    "password": "123456789",
	"passwordRepeat": "123456789"
}
```

### Logout

- **Endpoint:** `/api/v1/logout`
- **Method:** `GET` `AUTH`

### Refresh

- **Endpoint:** `/api/v1/refresh`
- **Method:** `GET` `AUTH`

### Get Expenses

- **Endpoint:** `/expenses`
- **Method:** `GET` `AUTH`

### Create Expense

- **Endpoint:** `/expenses`
- **Method:** `POST` `AUTH`

### Delete Expense

- **Endpoint:** `/expenses`
- **Method:** `DELETE` `AUTH`

### Get Expenses Categories

- **Endpoint:** `/expense-caregories`
- **Method:** `GET`

### Create Expense Category

- **Endpoint:** `/expense-caregories`
- **Method:** `POST` `AUTH`

### Delete Expense Category

- **Endpoint:** `/expense-caregories`
- **Method:** `DELETE` `AUTH`
