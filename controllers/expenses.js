// controllers/expenses.js

const Expense = require("../models/expense");
const sanitizeExpense = require("../utils/sanitizeExpense");
const { computeStats } = require("../utils/statsUtils");
const { extractCategories, extractNobs, extractAvailableMonths } = require("../utils/entryUtils");
const { sortSet } = require("../utils/sortUtils");

/** Category and business-name lists for the form dropdowns, straight from the database. */
async function formOptions() {
    const [categories, nobs] = await Promise.all([Expense.distinct("category"), Expense.distinct("nob")]);
    return { categories: sortSet(new Set(categories)), nobs: sortSet(new Set(nobs)) };
}

function notFound() {
    const err = new Error("Expense not found");
    err.status = 404;
    return err;
}

module.exports = {
    // The index page lists every expense (the filters run in the browser),
    // so the stats are computed from the same list instead of extra queries.
    index: async (req, res) => {
        const expenses = await Expense.find({}).sort({ date: -1 });
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
        res.render("expenses/new", await formOptions());
    },

    createExpense: async (req, res) => {
        const expense = new Expense(sanitizeExpense(req.body.expense));
        await expense.save();
        res.redirect(`/expenses/${expense._id}`);
    },

    show: async (req, res) => {
        const expense = await Expense.findById(req.params.id);
        if (!expense) throw notFound();
        res.render("expenses/show", { expense });
    },

    renderEditForm: async (req, res) => {
        const expense = await Expense.findById(req.params.id);
        if (!expense) throw notFound();
        res.render("expenses/edit", { expense, ...(await formOptions()) });
    },

    updateExpense: async (req, res) => {
        const expense = await Expense.findByIdAndUpdate(req.params.id, sanitizeExpense(req.body.expense), {
            new: true,
            runValidators: true,
        });
        if (!expense) throw notFound();
        res.redirect(`/expenses/${expense._id}`);
    },

    deleteExpense: async (req, res) => {
        await Expense.findByIdAndDelete(req.params.id);
        res.redirect("/expenses");
    },
};
