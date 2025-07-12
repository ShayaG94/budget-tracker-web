// controllers/expenses.js

const Expense = require("../models/expense");
const sanitizeExpense = require("../utils/sanitizeExpense");
const { computeStats } = require("../utils/statsUtils");
const { extractCategories, extractNobs, extractAvailableMonths } = require("../utils/entryUtils");

module.exports = {
    index: async (req, res, next) => {
        const expenses = await Expense.find({}).sort({ date: -1 });

        // Pull stats out in one call
        const { maxPrice, sum, totalDays } = computeStats(expenses);

        res.render("expenses/index/index", {
            title: "My Expenses",
            expensesList: expenses,
            categories: extractCategories(expenses),
            nobs: extractNobs(expenses),
            availableMonths: extractAvailableMonths(expenses),
            maxPrice,
            sum,
            totalDays,
        });
    },

    renderNewForm: async (req, res) => {
        const all = await Expense.find({});
        res.render("expenses/new", {
            categories: extractCategories(all),
            nobs: extractNobs(all),
        });
    },

    createExpense: async (req, res, next) => {
        const payload = sanitizeExpense(req.body.expense);
        const expense = new Expense(payload);
        await expense.save();
        res.redirect(`/expenses/${expense._id}`);
    },

    show: async (req, res, next) => {
        const expense = await Expense.findById(req.params.id);
        if (!expense) return res.redirect("/expenses");
        res.render("expenses/show", { expense });
    },

    renderEditForm: async (req, res, next) => {
        const expense = await Expense.findById(req.params.id);
        if (!expense) return res.redirect("/expenses");

        const all = await Expense.find({});
        res.render("expenses/edit", {
            expense,
            categories: extractCategories(all),
            nobs: extractNobs(all),
        });
    },

    updateExpense: async (req, res, next) => {
        const payload = sanitizeExpense(req.body.expense);
        const expense = await Expense.findByIdAndUpdate(req.params.id, payload, { new: true });
        res.redirect(`/expenses/${expense._id}`);
    },

    deleteExpense: async (req, res, next) => {
        await Expense.findByIdAndDelete(req.params.id);
        res.redirect("/expenses");
    },
};
