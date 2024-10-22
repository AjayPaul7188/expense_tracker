const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


app.post('/transactions', (req, res) => {
    const { type, category, amount, date, description } = req.body;
    const query = `INSERT INTO transactions (type, category, amount, date, description)
                   VALUES (?, ?, ?, ?, ?)`;

    db.run(query, [type, category, amount, date, description], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID });
    });
});


app.get('/transactions', (req, res) => {
    const query = 'SELECT * FROM transactions';
    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});


app.get('/transactions/:id', (req, res) => {
    const query = 'SELECT * FROM transactions WHERE id = ?';
    db.get(query, [req.params.id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(row);
    });
});


app.put('/transactions/:id', (req, res) => {
    const { type, category, amount, date, description } = req.body;
    const query = `UPDATE transactions SET type = ?, category = ?, amount = ?, date = ?, description = ?
                   WHERE id = ?`;

    db.run(query, [type, category, amount, date, description, req.params.id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ updated: this.changes });
    });
});


app.delete('/transactions/:id', (req, res) => {
    const query = 'DELETE FROM transactions WHERE id = ?';
    db.run(query, [req.params.id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ deleted: this.changes });
    });
});


app.get('/summary', (req, res) => {
    const query = `SELECT 
                      SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as total_income,
                      SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as total_expenses
                   FROM transactions`;

    db.get(query, [], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        const balance = row.total_income - row.total_expenses;
        res.json({ total_income: row.total_income, total_expenses: row.total_expenses, balance });
    });
});
