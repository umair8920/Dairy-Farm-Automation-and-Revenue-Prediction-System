const express = require('express');
const db = require('../db');

const router = express.Router();

// GET method for fetching all feeds
router.get("/feeds", (req, res) => {
    const sql = "SELECT * FROM `feeds`";
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.status(200).json(data);
    });
});

// POST method for adding a new feed
router.post("/feeds", (req, res) => {
    const { feed_id, name, type, quantity, cost } = req.body;

    if (!feed_id || !name || !type || !quantity || !cost) {
        return res.status(400).json({ error: "feed_id, name, type, quantity, and cost are required fields." });
    }

    const sql = "INSERT INTO `feeds` (feed_id, name, type, quantity, cost) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [feed_id, name, type, quantity, cost], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Provide information about the added feed
        const addedFeed = {
            feed_id: feed_id,
            name: name,
            type: type,
            quantity: quantity,
            cost: cost
            // Add other fields if needed
        };

        return res.status(201).json({ success: true, addedFeed });
    });
});

// DELETE route for deleting a feed by feed_id
router.delete("/feeds/:feed_id", (req, res) => {
    const feed_id = req.params.feed_id;

    const sql = "DELETE FROM feeds WHERE feed_id = ?";
    db.query(sql, [feed_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            // No rows were affected, meaning no feed was found with the given feed_id
            return res.status(404).json({ error: "Feed not found" });
        }

        return res.status(200).json({ success: true, message: "Feed deleted successfully" });
    });
});

// PUT method for updating an existing feed by feed_id
router.put("/feeds/:feed_id", (req, res) => {
    const feed_id = req.params.feed_id;
    const { name, type, quantity, cost } = req.body;

    if (!name || !type || !quantity || !cost) {
        return res.status(400).json({ error: "Name, type, quantity, and cost are required fields." });
    }

    const sql = "UPDATE feeds SET name = ?, type = ?, quantity = ?, cost = ? WHERE feed_id = ?";
    db.query(sql, [name, type, quantity, cost, feed_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            // No rows were affected, meaning no feed was found with the given feed_id
            return res.status(404).json({ error: "Feed not found" });
        }

        // Provide information about the updated feed
        const updatedFeed = {
            feed_id: feed_id,
            name: name,
            type: type,
            quantity: quantity,
            cost: cost
            // Add other fields if needed
        };

        return res.status(200).json({ success: true, updatedFeed });
    });
});

module.exports = router;
