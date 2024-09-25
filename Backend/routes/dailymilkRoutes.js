const express = require('express');
const db = require('../db');

const router = express.Router();

// GET method for fetching all daily milk records
router.get("/dailymilk", (req, res) => {
    const sql = "SELECT * FROM `dailymilk`";
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.status(200).json(data);
    });
});

// POST method for adding a new daily milk record
router.post("/dailymilk", (req, res) => {
    const { date, price, quantity } = req.body;

    if (!date || !price || !quantity) {
        return res.status(400).json({ error: "date, price, quantity are required fields." });
    }

    const sql = "INSERT INTO `dailymilk` (date, price, quantity) VALUES (?, ?, ?)";
    db.query(sql, [date, price, quantity], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Provide information about the added daily milk record
        const addedRecord = {
            date: date,
            price: price,
            quantity: quantity,
            // Add other fields if needed
        };

        return res.status(201).json({ success: true, addedRecord });
    });
});

// DELETE route for deleting a daily milk record by milk_id
router.delete("/dailymilk/:milk_id", (req, res) => {
    const milk_id = req.params.milk_id;

    const sql = "DELETE FROM dailymilk WHERE milk_id = ?";
    db.query(sql, [milk_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            // No rows were affected, meaning no record was found with the given milk_id
            return res.status(404).json({ error: "Record not found" });
        }

        return res.status(200).json({ success: true, message: "Record deleted successfully" });
    });
});

// PUT method for updating an existing daily milk record by milk_id
router.put("/dailymilk/:milk_id", (req, res) => {
    const milk_id = req.params.milk_id;
    const { date, price, quantity } = req.body;

    if (!date || !price || !quantity) {
        return res.status(400).json({ error: "date, price, quantity are required fields." });
    }

    const sql = "UPDATE dailymilk SET date = ?, price = ?, quantity = ? WHERE milk_id = ?";
    db.query(sql, [date, price, quantity, milk_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            // No rows were affected, meaning no record was found with the given milk_id
            return res.status(404).json({ error: "Record not found" });
        }

        // Provide information about the updated daily milk record
        const updatedRecord = {
            milk_id: milk_id,
            date: date,
            price: price,
            quantity: quantity,
            // Add other fields if needed
        };

        return res.status(200).json({ success: true, updatedRecord });
    });
});

module.exports = router;
