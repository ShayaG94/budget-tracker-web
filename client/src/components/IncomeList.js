import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function IncomeList() {
    const [incomes, setIncomes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchIncomes() {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch("http://localhost:8000/incomes/"); // Corrected URL
                if (!response.ok) {
                    const message = `HTTP error! status: ${response.status}`;
                    throw new Error(message);
                }
                const data = await response.json();
                setIncomes(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchIncomes();
    }, []);

    if (loading) {
        return <div>Loading incomes...</div>;
    }

    if (error) {
        return <div>Error loading incomes: {error}</div>;
    }

    return (
        <div>
            <h2>Existing Incomes</h2>
            <p>
                <Link to="/incomes/add">Add New Income</Link>
            </p>
            <div id="incomesList">
                {incomes.length > 0 ? (
                    <ul>
                        {incomes.map((income) => (
                            <li key={income.id}>
                                {/* Adapt this to your Income model's fields */}
                                <strong>Date:</strong> {income.date}
                                <br />
                                <strong>Source:</strong> {income.source}
                                <br />
                                <strong>Amount:</strong> {income.amount}
                                <br />
                                <strong>ID:</strong> {income.id}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No incomes recorded yet.</p>
                )}
            </div>
        </div>
    );
}

export default IncomeList;
