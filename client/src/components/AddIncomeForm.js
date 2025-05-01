import React from "react";

function AddIncomeForm() {
    return (
        <div>
            <h1>Add New Income</h1>
            <form id="addIncomeForm">
                <label htmlFor="date">Date:</label>
                <input type="date" id="date" name="date" required />

                <label htmlFor="source">Source:</label>
                <input type="text" id="source" name="source" required />

                <label htmlFor="description">Description (Optional):</label>
                <input type="text" id="description" name="description" />

                <label htmlFor="amount">Amount:</label>
                <input type="number" id="amount" name="amount" step="0.01" required />

                <button type="submit">Add Income</button>
            </form>
            <div id="message"></div>
        </div>
    );
}

export default AddIncomeForm;
