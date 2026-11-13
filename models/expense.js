const mongoose = require("mongoose");
const { toAgorot, fromAgorot } = require("../utils/money");

const ExpenseSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        date: { type: Date, required: true },
        // Stored as whole agorot (integer) to avoid floating-point rounding;
        // read and written in shekels thanks to the getter/setter.
        price: { type: Number, required: true, set: toAgorot, get: fromAgorot },
        category: { type: String, required: true, trim: true },
        nob: { type: String, required: true, trim: true }, // name of business
        deductable: { type: Boolean, required: true, default: false },
    },
    { toJSON: { getters: true }, toObject: { getters: true } }
);

ExpenseSchema.index({ date: -1 });

module.exports = mongoose.model("Expense", ExpenseSchema);
