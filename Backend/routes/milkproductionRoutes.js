const express = require('express');
const db = require('../db');

const router = express.Router();

// POST method for adding a new milk production record
router.post("/milkproductions", (req, res) => {
    const { livestock_id, production_date, milk_quantity, milk_cost } = req.body;

    if (!livestock_id || !production_date || !milk_quantity || !milk_cost) {
        return res.status(400).json({ error: "livestock_id, production_date, milk_quantity, and milk_cost are required fields." });
    }

    const sql = "INSERT INTO milkproductions (livestock_id, production_date, milk_quantity, milk_cost) VALUES (?, ?, ?, ?)";
    db.query(sql, [livestock_id, production_date, milk_quantity, milk_cost], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Provide information about the added milk production record
        const addedMilkProduction = {
            production_id: result.insertId,
            livestock_id: livestock_id,
            production_date: production_date,
            milk_quantity: milk_quantity,
            milk_cost: milk_cost
            // Add other fields if needed
        };

        return res.status(201).json({ success: true, addedMilkProduction });
    });
});

// GET method for fetching all milk production records
router.get("/milkproductions", (req, res) => {
    const sql = "SELECT * FROM milkproductions";
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.status(200).json(data);
    });
});

// DELETE method for deleting a milk production record by production_id
router.delete("/milkproductions/:production_id", (req, res) => {
    const production_id = req.params.production_id;

    const sql = "DELETE FROM milkproductions WHERE production_id = ?";
    db.query(sql, [production_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            // No rows were affected, meaning no milk production record was found with the given production_id
            return res.status(404).json({ error: "Milk production record not found" });
        }

        return res.status(200).json({ success: true, message: "Milk production record deleted successfully" });
    });
});

// PUT method for updating an existing milk production record by production_id
router.put("/milkproductions/:production_id", (req, res) => {
    const production_id = req.params.production_id;
    const { livestock_id, production_date, milk_quantity, milk_cost } = req.body;

    if (!livestock_id || !production_date || !milk_quantity || !milk_cost) {
        return res.status(400).json({ error: "livestock_id, production_date, milk_quantity, and milk_cost are required fields." });
    }

    const sql = "UPDATE milkproductions SET livestock_id = ?, production_date = ?, milk_quantity = ?, milk_cost = ? WHERE production_id = ?";
    db.query(sql, [livestock_id, production_date, milk_quantity, milk_cost, production_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            // No rows were affected, meaning no milk production record was found with the given production_id
            return res.status(404).json({ error: "Milk production record not found" });
        }

        // Provide information about the updated milk production record
        const updatedMilkProduction = {
            production_id: production_id,
            livestock_id: livestock_id,
            production_date: production_date,
            milk_quantity: milk_quantity,
            milk_cost: milk_cost
            // Add other fields if needed
        };

        return res.status(200).json({ success: true, updatedMilkProduction });
    });
});

module.exports = router;
