const Expense = require("../models/expense");
const { extractCategories, extractNobs } = require("../utils/extractData");

module.exports.index = async (req, res, next) => {
    const expenses = await Expense.find({}).sort({ date: -1 });
    const maxPrice = Math.max(...expenses.map((exp) => exp.price));
    res.render("expenses/index/index", {
        title: "My Expenses",
        expensesList: expenses,
        categories: extractCategories(expenses),
        nobs: extractNobs(expenses),
        maxPrice: maxPrice,
    });
};

module.exports.renderNewForm = async (req, res) => {
    const expenses = await Expense.find({});
    res.render("expenses/new", {
        categories: extractCategories(expenses),
        nobs: extractNobs(expenses),
    });
};

module.exports.createExpense = async (req, res, next) => {
    const newExpense = req.body.expense;
    newExpense.deductable = newExpense.deductable === "on";
    if (newExpense.category === "other") {
        newExpense.category = newExpense.newCategory;
    }
    if (newExpense.nob === "other") {
        newExpense.nob = newExpense.newNob;
    }
    const expense = new Expense(newExpense);
    await expense.save();
    // req.flash("success", "Successfully made a new expense!");
    res.redirect(`/expenses/${expense._id}`);
    // res.redirect(`/expenses/`);
};

module.exports.show = async (req, res, next) => {
    const { id } = req.params;
    const expense = await Expense.findById(id);
    if (!expense) {
        // req.flash("error", "Can't find that expense!");
        res.redirect("/expenses");
    }
    res.render("expenses/show", { expense });
};

module.exports.renderEditForm = async (req, res, next) => {
    const { id } = req.params;
    const expense = await Expense.findById(id);
    const expenses = await Expense.find({});

    if (!expense) {
        // req.flash("error", "Can't find that expense!");
        res.redirect("/expenses");
    }
    res.render("expenses/edit", {
        expense,
        categories: extractCategories(expenses),
        nobs: extractNobs(expenses),
    });
};

module.exports.updateExpense = async (req, res, next) => {
    const { id } = req.params;
    const edittedExpense = req.body.expense;
    req.body.expense.deductable = req.body.expense.deductable === "on";
    if (edittedExpense.category === "other") {
        edittedExpense.category = edittedExpense.newCategory;
    }
    if (edittedExpense.nob === "other") {
        edittedExpense.nob = edittedExpense.newNob;
    }
    const expense = await Expense.findByIdAndUpdate(id, { ...edittedExpense });
    await expense.save();
    // req.flash("success", "Successfully updated expense!");
    res.redirect(`/expenses/${expense._id}`);
};

module.exports.deleteExpense = async (req, res, next) => {
    const { id } = req.params;
    await Expense.findByIdAndDelete(id);
    // req.flash("success", "Successfully deleted expense!");
    res.redirect(`/expenses`);
};
