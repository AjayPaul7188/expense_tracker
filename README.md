Personal Expense Tracker
This is a RESTful API built with Node.js and Express.js to manage personal income and expenses. Users can add, update, delete, and retrieve transactions, as well as get summaries of their financial records.

Table of Contents:
1. Installation
2. Database Setup
3. Running the Application
4. API Endpoints
5. Postman Screenshots

Installation
Clone the repository:

bash

git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker


Install dependencies:

bash

npm install


Database Setup
Using SQLite
This project uses SQLite as the default database. The database file will be created when you run the application for the first time.

You can find the database file at ./expense_tracker.db.

Running the Application
Start the server:
bash

npm start
The server will run on http://localhost:3000.


API Endpoints:
1. Add a Transaction
Endpoint: POST /transactions
Description: Adds a new transaction (income or expense).
Request Body:
json

{
  "type": "income",
  "category": "Salary",
  "amount": 1000,
  "date": "2024-10-01",
  "description": "October Salary"
}
Response:
json

{
  "id": 1
}

2. Get All Transactions
Endpoint: GET /transactions
Description: Retrieves all transactions.
Response:
json

[
  {
    "id": 1,
    "type": "income",
    "category": "Salary",
    "amount": 1000,
    "date": "2024-10-01",
    "description": "October Salary"
  }
]


3. Get a Transaction by ID
Endpoint: GET /transactions/:id
Description: Retrieves a transaction by ID.
Response:
json

{
  "id": 1,
  "type": "income",
  "category": "Salary",
  "amount": 1000,
  "date": "2024-10-01",
  "description": "October Salary"
}


4. Update a Transaction
Endpoint: PUT /transactions/:id
Description: Updates a transaction by ID.
Request Body:
json

{
  "type": "expense",
  "category": "Food",
  "amount": 50,
  "date": "2024-10-05",
  "description": "Groceries"
}
Response:
json

{
  "updated": 1
}


5. Delete a Transaction
Endpoint: DELETE /transactions/:id
Description: Deletes a transaction by ID.
Response:
json

{
  "deleted": 1
}


6. Get Summary
Endpoint: GET /summary
Description: Retrieves a summary of total income, total expenses, and balance.
Response:
json

{
  "total_income": 1000,
  "total_expenses": 50,
  "balance": 950
}


Postman Screenshots
Below are screenshots demonstrating how to use the API endpoints via Postman.

1. POST /transactions - Add a Transaction\

2. GET /transactions - Get All Transactions

3. GET /transactions/
- Get a Transaction by ID

4. PUT /transactions/
- Update a Transaction

5. DELETE /transactions/
- Delete a Transaction

6. GET /summary - Get Summary
