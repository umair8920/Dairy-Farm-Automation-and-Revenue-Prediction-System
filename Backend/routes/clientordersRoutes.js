const express = require('express');
const db = require('../db');

const router = express.Router();

// GET method for fetching all client orders
router.get("/clientorders", (req, res) => {
    const sql = "SELECT * FROM `clientorders`";
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.status(200).json(data);
    });
});

// POST method for adding a new client order
router.post("/clientorders", (req, res) => {
    const { id, client_name, phone, shipping_address, item, quantity, order_date, delivery_date } = req.body;

    if (!id || !client_name || !phone || !shipping_address || !item || !quantity || !order_date || !delivery_date) {
        return res.status(400).json({ error: "id, client_name, phone, shipping_address, item, quantity, order_date, and delivery_date are required fields." });
    }

    const sql = "INSERT INTO `clientorders` (id, client_name, phone, shipping_address, item, quantity, order_date, delivery_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [id, client_name, phone, shipping_address, item, quantity, order_date, delivery_date], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Provide information about the added client order
        const addedClientOrder = {
            id: id,
            client_name: client_name,
            phone: phone,
            shipping_address: shipping_address,
            item: item,
            quantity: quantity,
            order_date: order_date,
            delivery_date: delivery_date
            // Add other fields if needed
        };

        return res.status(201).json({ success: true, addedClientOrder });
    });
});

// DELETE route for deleting a client order by id
router.delete("/clientorders/:id", (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM clientorders WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            // No rows were affected, meaning no client order was found with the given id
            return res.status(404).json({ error: "Client order not found" });
        }

        return res.status(200).json({ success: true, message: "Client order deleted successfully" });
    });
});

// PUT method for updating an existing client order by id
router.put("/clientorders/:id", (req, res) => {
    const id = req.params.id;
    const { client_name, phone, shipping_address, item, quantity, order_date, delivery_date } = req.body;

    if (!client_name || !phone || !shipping_address || !item || !quantity || !order_date || !delivery_date) {
        return res.status(400).json({ error: "client_name, phone, shipping_address, item, quantity, order_date, and delivery_date are required fields." });
    }

    const sql = "UPDATE clientorders SET client_name = ?, phone = ?, shipping_address = ?, item = ?, quantity = ?, order_date = ?, delivery_date = ? WHERE id = ?";
    db.query(sql, [client_name, phone, shipping_address, item, quantity, order_date, delivery_date, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            // No rows were affected, meaning no client order was found with the given id
            return res.status(404).json({ error: "Client order not found" });
        }

        // Provide information about the updated client order
        const updatedClientOrder = {
            id: id,
            client_name: client_name,
            phone: phone,
            shipping_address: shipping_address,
            item: item,
            quantity: quantity,
            order_date: order_date,
            delivery_date: delivery_date
            // Add other fields if needed
        };

        return res.status(200).json({ success: true, updatedClientOrder });
    });
});

module.exports = router;
