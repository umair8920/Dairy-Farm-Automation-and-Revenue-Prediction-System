const express = require('express');
const cors = require("cors");
const mysql = require("mysql");
const livestockRoutes = require('./routes/livestockRoutes');
const orderRoutes = require('./routes/orderRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const vaccinationRoutes = require('./routes/vaccinationRoutes');
const feedRoutes = require('./routes/feedRoutes');
const milkproductionRoutes = require('./routes/milkproductionRoutes');
const clientordersRoutes = require('./routes/clientordersRoutes');
const dailymilkRoutes = require('./routes/dailymilkRoutes');
const financeRoutes = require('./routes/financeRoutes');
const suggestionRoutes = require('./routes/suggestionRoutes');


const db = require('./db');
const app = express();
app.use(express.json());
app.use(cors());



app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE username = ? AND password = ?";

    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) return res.json("error");
        if (data.length > 0) {
            const userId = data[0].id; // Assuming you have an 'id' field in your login table

            // Send different responses based on the user's ID
            if (userId === 1) {
                return res.json({ status: "Login success", redirect: "/OwnerPanel" });
            } else if (userId === 2) {
                return res.json({ status: "Login success", redirect: "/ManagerPanel" });
            } else if (userId === 3) {
                return res.json({ status: "Login success", redirect: "/VeterinarianPanel" });
            } else {
                return res.json({ status: "Login success", redirect: "/defaultPage" });
            }
        } else {
            return res.json("Wrong Credentials")
        }
    })
});




app.use('/api', livestockRoutes);
app.use('/api', orderRoutes);
app.use('/api', employeeRoutes);
app.use('/api', vaccinationRoutes);
app.use('/api', feedRoutes);
app.use('/api', milkproductionRoutes);
app.use('/api', clientordersRoutes);
app.use('/api', dailymilkRoutes);
app.use('/api', financeRoutes);
app.use('/api', suggestionRoutes);

app.listen(8081, () => {
    console.log("listening");
});
