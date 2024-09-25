const express = require('express');
const db = require('../db');

const router = express.Router();



// GET method for fetching all orders
router.get("/orders", (req, res) => {
    const sql = "SELECT * FROM `orders`";
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.status(200).json(data);
    });
});

// POST method for adding a new order
router.post("/orders", (req, res) => {
    const { order_id, customer_name, order_date, ship_date, amount, status } = req.body;

    if (!order_id || !customer_name || !order_date || !ship_date || !amount || !status) {
        return res.status(400).json({ error: "order_id, customer_name, order_date, ship_date, amount, status are required fields." });
    }

    const sql = "INSERT INTO `orders` (order_id, customer_name, order_date, ship_date, amount, status) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, [order_id, customer_name, order_date, ship_date, amount, status], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Provide information about the added order
        const addedOrder = {
            order_id: order_id,
            customer_name: customer_name,
            order_date: order_date,
            ship_date: ship_date,
            amount: amount,
            status: status,
            // Add other fields if needed
        };


        // Assuming you have the required imports and database connection (db) set up
// DELETE route for deleting an order by order_id
router.delete("/orders/:order_id", (req, res) => {
  const order_id = req.params.order_id;

  const sql = "DELETE FROM orders WHERE order_id = ?";
  db.query(sql, [order_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (result.affectedRows === 0) {
      // No rows were affected, meaning no order was found with the given order_id
      return res.status(404).json({ error: "Order not found" });
    }

    return res.status(200).json({ success: true, message: "Order deleted successfully" });
  });
});





// PUT method for updating an existing order by order_id
router.put("/orders/:order_id", (req, res) => {
    const order_id = req.params.order_id;
    const { customer_name, order_date, ship_date, amount, status } = req.body;

    if (!customer_name || !order_date || !ship_date || !amount || !status) {
        return res.status(400).json({ error: "customer_name, order_date, ship_date, amount, status are required fields." });
    }

    const sql = "UPDATE orders SET customer_name = ?, order_date = ?, ship_date = ?, amount = ?, status = ? WHERE order_id = ?";
    db.query(sql, [customer_name, order_date, ship_date, amount, status, order_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            // No rows were affected, meaning no order was found with the given order_id
            return res.status(404).json({ error: "Order not found" });
        }

        // Provide information about the updated order
        const updatedOrder = {
            order_id: order_id,
            customer_name: customer_name,
            order_date: order_date,
            ship_date: ship_date,
            amount: amount,
            status: status,
            // Add other fields if needed
        };

        return res.status(200).json({ success: true, updatedOrder });
    });
});




        return res.status(201).json({ success: true, addedOrder });
    });
});


module.exports = router;