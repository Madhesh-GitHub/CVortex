// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();
app.use(express.json());
app.use(cors());
require('dotenv').config({ path: '../.env' });

// 1. Connect to MongoDB (Make sure your MongoDB is running!)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// 2. Define the Schema (The Blueprint)
const InvoiceSchema = new mongoose.Schema({
    invoiceNumber: String,
    companyName: String,
    companySubtitle: String,
    companyRole: String,
    billTo: String,
    issuedDate: String,
    dueDate: String,
    paymentUpi: String,
    bankName: String,
    notes: String,
    items: [
        {
            description: String,
            qty: Number,
            rate: Number
        }
    ]
});

const Invoice = mongoose.model('Invoice', InvoiceSchema);

// 3. Create Routes (The API Endpoints)

// SAVE an invoice
app.post('/api/invoices', async (req, res) => {
    try {
        const newInvoice = new Invoice(req.body);
        const savedInvoice = await newInvoice.save();
        res.status(201).json(savedInvoice);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET all invoices
app.get('/api/invoices', async (req, res) => {
    try {
        const invoices = await Invoice.find();
        res.json(invoices);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// START the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
app.post('/api/send-email', async (req, res) => {
    const { to, clientName, invoiceNo, total, items } = req.body;

    // 1. Create Transporter (Use your real email here)
    // For Gmail, you need to generate an 'App Password' in Google Security settings
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com', // PUT YOUR GMAIL HERE
            pass: 'your-app-password'     // PUT YOUR GMAIL APP PASSWORD HERE (Not your login password)
        }
    });

    // 2. Format the Items for Email
    const itemsHtml = items.map(item =>
        `<li>${item.description}: ₹${item.rate} x ${item.qty}</li>`
    ).join('');

    // 3. Email Content
    const mailOptions = {
        from: 'EditLab Accounts <your-email@gmail.com>',
        to: to, // Client's email
        subject: `Invoice ${invoiceNo} from EditLab`,
        html: `
      <h2>Hello ${clientName},</h2>
      <p>Here is the summary of your invoice <strong>${invoiceNo}</strong>.</p>
      
      <h3>Items:</h3>
      <ul>${itemsHtml}</ul>
      
      <h3>Total Amount: ₹${total.toLocaleString()}</h3>
      
      <p>Please make the payment to the bank details mentioned in the invoice.</p>
      <p>Regards,<br>Sanjay (EditLab)</p>
    `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});