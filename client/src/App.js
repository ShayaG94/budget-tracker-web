import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./components/HomePage";
import AddExpenseForm from "./components/AddExpenseForm";
import ExpenseList from "./components/ExpenseList";
import AddIncomeForm from "./components/AddIncomeForm"; // Import AddIncomeForm
import IncomeList from "./components/IncomeList"; // Import IncomeList
import "./App.css";

function App() {
    return (
        <Router>
            <div className="App">
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/expenses">Expenses</Link>
                        </li>
                        <li>
                            <Link to="/incomes">Incomes</Link>
                        </li>
                    </ul>
                </nav>
                <div className="container">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/expenses" element={<ExpenseRoutes />} />
                        <Route path="/incomes" element={<IncomeRoutes />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

function ExpenseRoutes() {
    return (
        <Routes>
            <Route path="/" element={<ExpenseList />} />
            <Route path="/add" element={<AddExpenseForm />} />
        </Routes>
    );
}

function IncomeRoutes() {
    return (
        <Routes>
            <Route path="/" element={<IncomeList />} />
            <Route path="/add" element={<AddIncomeForm />} />
        </Routes>
    );
}

export default App;
