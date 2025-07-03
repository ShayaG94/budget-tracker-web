const express = require("express");
const router = express.Router(); // Create a new router instance
const expenses = require("../controllers/expenses");

router.route("/").get(expenses.index).post(expenses.createExpense);

router.get("/new", expenses.renderNewForm);

router.route("/:id").get(expenses.show).put(expenses.updateExpense).delete(expenses.deleteExpense);

router.get("/:id/edit", expenses.renderEditForm);

module.exports = router; // Export the router
