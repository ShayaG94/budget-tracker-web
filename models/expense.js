const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    nob: { type: String, required: true },
    deductable: { type: Boolean, required: true },
});

module.exports = mongoose.model("Expense", ExpenseSchema);
