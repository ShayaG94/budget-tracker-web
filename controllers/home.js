const Expense = require("../models/expense");
const sumPricesMTD = require("../utils/sumMTD");

module.exports.home = async (req, res, next) => {
    const expenses = await Expense.find({});
    const expensesMTD = sumPricesMTD(expenses);
    const incomesValue = 9876543.21; // Example income number
    // --- End Mock Data ---

    res.render("home/home", {
        expenses: expensesMTD, // Pass the expenses variable
        incomes: incomesValue, // Pass the incomes variable
    });
};
