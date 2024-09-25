const express = require('express');
const db = require('../db');

const router = express.Router();

// GET method for fetching all employees
router.get("/employees", (req, res) => {
    const sql = "SELECT * FROM `employees`";
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.status(200).json(data);
    });
});

// POST method for adding a new employee
router.post("/employees", (req, res) => {
    const { employee_id, name, task, phone, salary } = req.body;

    if (!employee_id || !name || !task || !phone || !salary) {
        return res.status(400).json({ error: "employee_id, name, task, phone, salary are required fields." });
    }

    const sql = "INSERT INTO `employees` (employee_id, name, task, phone, salary) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [employee_id, name, task, phone, salary], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Provide information about the added employee
        const addedEmployee = {
            employee_id: employee_id,
            name: name,
            task: task,
            phone: phone,
            salary: salary,
            // Add other fields if needed
        };

        return res.status(201).json({ success: true, addedEmployee });
    });
});

// DELETE route for deleting an employee by employee_id
router.delete("/employees/:employee_id", (req, res) => {
    const employee_id = req.params.employee_id;

    const sql = "DELETE FROM employees WHERE employee_id = ?";
    db.query(sql, [employee_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            // No rows were affected, meaning no employee was found with the given employee_id
            return res.status(404).json({ error: "Employee not found" });
        }

        return res.status(200).json({ success: true, message: "Employee deleted successfully" });
    });
});

// PUT method for updating an existing employee by employee_id
router.put("/employees/:employee_id", (req, res) => {
    const employee_id = req.params.employee_id;
    const { name, task, phone, salary } = req.body;

    if (!name || !task || !phone || !salary) {
        return res.status(400).json({ error: "name, task, phone, salary are required fields." });
    }

    const sql = "UPDATE employees SET name = ?, task = ?, phone = ?, salary = ? WHERE employee_id = ?";
    db.query(sql, [name, task, phone, salary, employee_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            // No rows were affected, meaning no employee was found with the given employee_id
            return res.status(404).json({ error: "Employee not found" });
        }

        // Provide information about the updated employee
        const updatedEmployee = {
            employee_id: employee_id,
            name: name,
            task: task,
            phone: phone,
            salary: salary,
            // Add other fields if needed
        };

        return res.status(200).json({ success: true, updatedEmployee });
    });
});

module.exports = router;
