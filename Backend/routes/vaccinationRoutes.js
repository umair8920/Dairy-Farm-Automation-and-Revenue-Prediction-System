const express = require('express');
const db = require('../db');

const router = express.Router();

// POST method for adding a new vaccination record
router.post("/vaccinations", (req, res) => {
    const { vaccination_id, livestock_id, vaccine_name, vaccine_date, next_vaccination_date } = req.body;

    if (!vaccination_id || !livestock_id || !vaccine_name || !vaccine_date) {
        return res.status(400).json({ error: "vaccination_id, livestock_id, vaccine_name, vaccine_date are required fields." });
    }

    const sql = "INSERT INTO vaccinations (vaccination_id, livestock_id, vaccine_name, vaccine_date, next_vaccination_date) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [vaccination_id, livestock_id, vaccine_name, vaccine_date, next_vaccination_date], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Provide information about the added vaccination record
        const addedVaccination = {
            vaccination_id: vaccination_id,
            livestock_id: livestock_id,
            vaccine_name: vaccine_name,
            vaccine_date: vaccine_date,
            next_vaccination_date: next_vaccination_date
            // Add other fields if needed
        };

        return res.status(201).json({ success: true, addedVaccination });
    });
});

// GET method for fetching all vaccination records
router.get("/vaccinations", (req, res) => {
    const sql = "SELECT * FROM vaccinations";
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.status(200).json(data);
    });
});

// DELETE method for deleting a vaccination record by vaccination_id
router.delete("/vaccinations/:vaccination_id", (req, res) => {
    const vaccination_id = req.params.vaccination_id;

    const sql = "DELETE FROM vaccinations WHERE vaccination_id = ?";
    db.query(sql, [vaccination_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            // No rows were affected, meaning no vaccination record was found with the given vaccination_id
            return res.status(404).json({ error: "Vaccination record not found" });
        }

        return res.status(200).json({ success: true, message: "Vaccination record deleted successfully" });
    });
});

// PUT method for updating an existing vaccination record by vaccination_id
router.put("/vaccinations/:vaccination_id", (req, res) => {
    const vaccination_id = req.params.vaccination_id;
    const { livestock_id, vaccine_name, vaccine_date, next_vaccination_date } = req.body;

    if (!livestock_id || !vaccine_name || !vaccine_date) {
        return res.status(400).json({ error: "livestock_id, vaccine_name, and vaccine_date are required fields." });
    }

    const sql = "UPDATE vaccinations SET livestock_id = ?, vaccine_name = ?, vaccine_date = ?, next_vaccination_date = ? WHERE vaccination_id = ?";
    db.query(sql, [livestock_id, vaccine_name, vaccine_date, next_vaccination_date, vaccination_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            // No rows were affected, meaning no vaccination record was found with the given vaccination_id
            return res.status(404).json({ error: "Vaccination record not found" });
        }

        // Provide information about the updated vaccination record
        const updatedVaccination = {
            vaccination_id: vaccination_id,
            livestock_id: livestock_id,
            vaccine_name: vaccine_name,
            vaccine_date: vaccine_date,
            next_vaccination_date: next_vaccination_date
            // Add other fields if needed
        };

        return res.status(200).json({ success: true, updatedVaccination });
    });
});

module.exports = router;
