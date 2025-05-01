import React from "react";

function AddExpenseForm() {
    return (
        <div>
            <h1>Add New Expense</h1>
            <form id="addExpenseForm">
                <label htmlFor="date">Date:</label>
                <input type="date" id="date" name="date" required />

                <label htmlFor="store">Store:</label>
                <input type="text" id="store" name="store" required />

                <label htmlFor="category">Category:</label>
                <input type="text" id="category" name="category" required />

                <label htmlFor="description">Description (Optional):</label>
                <input type="text" id="description" name="description" />

                <label htmlFor="amount">Amount:</label>
                <input type="number" id="amount" name="amount" step="0.01" required />

                <button type="submit">Add Expense</button>
            </form>
            <div id="message"></div>
        </div>
    );
}

export default AddExpenseForm;
