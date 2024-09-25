const express = require('express');
const db = require('../db');

const router = express.Router();

// GET method for fetching all suggestions
router.get("/suggestions", (req, res) => {
    const sql = "SELECT * FROM `suggestions`";
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.status(200).json(data);
    });
});

// POST method for adding a new suggestion
router.post("/suggestions", (req, res) => {
    const { suggestion, temperature, activity } = req.body;

    if (!suggestion || !temperature) {
        return res.status(400).json({ error: "suggestion and temperature are required fields." });
    }

    const sql = "INSERT INTO `suggestions` (suggestion, temperature, activity) VALUES (?, ?, ?)";
    db.query(sql, [suggestion, temperature, activity], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Provide information about the added suggestion
        const addedSuggestion = {
            suggestion_id: result.insertId,
            suggestion: suggestion,
            temperature: temperature,
            activity: activity
            // Add other fields if needed
        };

        return res.status(201).json({ success: true, addedSuggestion });
    });
});

// DELETE route for deleting a suggestion by suggestion_id
router.delete("/suggestions/:suggestion_id", (req, res) => {
    const suggestion_id = req.params.suggestion_id;

    const sql = "DELETE FROM suggestions WHERE suggestion_id = ?";
    db.query(sql, [suggestion_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            // No rows were affected, meaning no record was found with the given suggestion_id
            return res.status(404).json({ error: "Record not found" });
        }

        return res.status(200).json({ success: true, message: "Record deleted successfully" });
    });
});

// PUT method for updating an existing suggestion by suggestion_id
router.put("/suggestions/:suggestion_id", (req, res) => {
    const suggestion_id = req.params.suggestion_id;
    const { suggestion, temperature, activity } = req.body;

    if (!suggestion || !temperature) {
        return res.status(400).json({ error: "suggestion and temperature are required fields." });
    }

    const sql = "UPDATE suggestions SET suggestion = ?, temperature = ?, activity = ? WHERE suggestion_id = ?";
    db.query(sql, [suggestion, temperature, activity, suggestion_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            // No rows were affected, meaning no record was found with the given suggestion_id
            return res.status(404).json({ error: "Record not found" });
        }

        // Provide information about the updated suggestion
        const updatedSuggestion = {
            suggestion_id: suggestion_id,
            suggestion: suggestion,
            temperature: temperature,
            activity: activity
            // Add other fields if needed
        };

        return res.status(200).json({ success: true, updatedSuggestion });
    });
});

module.exports = router;
