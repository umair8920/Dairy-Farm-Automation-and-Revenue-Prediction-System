const express = require('express');
const db = require('../db');

const router = express.Router();

// GET method for fetching all livestock
router.get("/livestock", (req, res) => {
    const sql = "SELECT * FROM `livestock`";
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.status(200).json(data);
    });
});

// POST method for adding a new livestock
router.post("/livestock", (req, res) => {
    const { livestock_id, age, color, breed, gender, healthstatus } = req.body;

    if (!livestock_id || !age || !color || !breed || !gender || !healthstatus) {
        return res.status(400).json({ error: "livestock_id, age, color, breed, gender, healthstatus are required fields." });
    }

    const sql = "INSERT INTO `livestock` (livestock_id, age, color, breed, gender, healthstatus) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, [livestock_id, age, color, breed, gender, healthstatus], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Provide information about the added livestock
        const addedLivestock = {
            livestock_id: livestock_id,
            age: age,
            color: color,
            breed: breed,
            gender: gender,
            healthstatus: healthstatus,
            // Add other fields if needed
        };

        return res.status(201).json({ success: true, addedLivestock });
    });
});

// DELETE route for deleting livestock by livestock_id
router.delete("/livestock/:livestock_id", (req, res) => {
    const livestock_id = req.params.livestock_id;

    const sql = "DELETE FROM livestock WHERE livestock_id = ?";
    db.query(sql, [livestock_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            // No rows were affected, meaning no livestock was found with the given livestock_id
            return res.status(404).json({ error: "Livestock not found" });
        }

        return res.status(200).json({ success: true, message: "Livestock deleted successfully" });
    });
});

// PUT method for updating an existing livestock by livestock_id
router.put("/livestock/:livestock_id", (req, res) => {
    const livestock_id = req.params.livestock_id;
    const { age, color, breed, gender, healthstatus } = req.body;

    if (!age || !color || !breed || !gender || !healthstatus) {
        return res.status(400).json({ error: "age, color, breed, gender, healthstatus are required fields." });
    }

    const sql = "UPDATE livestock SET age = ?, color = ?, breed = ?, gender = ?, healthstatus = ? WHERE livestock_id = ?";
    db.query(sql, [age, color, breed, gender, healthstatus, livestock_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            // No rows were affected, meaning no livestock was found with the given livestock_id
            return res.status(404).json({ error: "Livestock not found" });
        }

        // Provide information about the updated livestock
        const updatedLivestock = {
            livestock_id: livestock_id,
            age: age,
            color: color,
            breed: breed,
            gender: gender,
            healthstatus: healthstatus,
            // Add other fields if needed
        };

        return res.status(200).json({ success: true, updatedLivestock });
    });
});

module.exports = router;
