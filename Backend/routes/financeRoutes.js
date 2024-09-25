const express = require('express');
const db = require('../db');

const router = express.Router();

// POST method for adding a new finance record
router.post("/finances", (req, res) => {
    const { order_id, amount, milk_id, price, quantity, feed_id, cost, date } = req.body;

    if (!order_id || !amount || !milk_id || !price || !quantity || !feed_id || !cost || !date) {
        return res.status(400).json({ error: " order_id, amount, milk_id, price, quantity, feed_id, date, and cost are required fields." });
    }

    const sql = "INSERT INTO finances ( order_id, amount, milk_id, price, quantity, feed_id, cost, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [ order_id, amount, milk_id, price, quantity, feed_id, cost, date], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Provide information about the added finance record
        const addedFinance = {
        
            order_id: order_id,
            amount: amount,
            milk_id: milk_id,
            price: price,
            quantity: quantity,
            feed_id: feed_id,
            cost: cost,
            date: date
            // Add other fields if needed
        };

        return res.status(201).json({ success: true, addedFinance });
    });
});

// GET method for fetching all finance records
router.get("/finances", (req, res) => {
    const sql = "SELECT * FROM finances";
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.status(200).json(data);
    });
});

// DELETE method for deleting a finance record by finance_id
router.delete("/finances/:finance_id", (req, res) => {
    const finance_id = req.params.finance_id;

    const sql = "DELETE FROM finances WHERE finance_id = ?";
    db.query(sql, [finance_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            // No rows were affected, meaning no finance record was found with the given finance_id
            return res.status(404).json({ error: "Finance record not found" });
        }

        return res.status(200).json({ success: true, message: "Finance record deleted successfully" });
    });
});

// PUT method for updating an existing finance record by finance_id
router.put("/finances/:finance_id", (req, res) => {
    const finance_id = req.params.finance_id;
    const { order_id, amount, milk_id, price, quantity, feed_id, cost , date} = req.body;

    if (!order_id || !amount || !milk_id || !price || !quantity || !feed_id || !cost || !date) {
        return res.status(400).json({ error: "order_id, amount, milk_id, price, quantity, feed_id, date,,and cost are required fields." });
    }

    const sql = "UPDATE finances SET order_id = ?, amount = ?, milk_id = ?, price = ?, quantity = ?, feed_id = ?, cost = ?, date = ?  WHERE finance_id = ?";
    db.query(sql, [order_id, amount, milk_id, price, quantity, feed_id, cost, date, finance_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            // No rows were affected, meaning no finance record was found with the given finance_id
            return res.status(404).json({ error: "Finance record not found" });
        }

        // Provide information about the updated finance record
        const updatedFinance = {
            finance_id: finance_id,
            order_id: order_id,
            amount: amount,
            milk_id: milk_id,
            price: price,
            quantity: quantity,
            feed_id: feed_id,
            cost: cost,
            date: date
            // Add other fields if needed
        };

        return res.status(200).json({ success: true, updatedFinance });
    });
});

module.exports = router;
