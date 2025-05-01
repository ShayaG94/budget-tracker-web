import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ExpenseList() {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchExpenses() {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch("http://localhost:8000/expenses/");
                if (!response.ok) {
                    const message = `HTTP error! status: ${response.status}`;
                    throw new Error(message);
                }
                const data = await response.json();
                setExpenses(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchExpenses();
    }, []);

    if (loading) {
        return <div>Loading expenses...</div>;
    }

    if (error) {
        return <div>Error loading expenses: {error}</div>;
    }

    return (
        <div>
            <h2>Existing Expenses</h2>
            <p>
                <Link to="/expenses/add">Add New Expense</Link>
            </p>
            <div id="expensesList">
                {expenses.length > 0 ? (
                    <ul>
                        {expenses.map((expense) => (
                            <li key={expense.id}>
                                <strong>Date:</strong> {expense.date}
                                <br />
                                <strong>Store:</strong> {expense.store}
                                <br />
                                <strong>Category:</strong> {expense.category}
                                <br />
                                <strong>Amount:</strong> {expense.amount}
                                <br />
                                <strong>ID:</strong> {expense.id}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No expenses recorded yet.</p>
                )}
            </div>
        </div>
    );
}

export default ExpenseList;
