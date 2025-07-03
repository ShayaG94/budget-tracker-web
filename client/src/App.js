import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Container } from "@mui/material";
import HomePage from "./components/HomePage";
import AddExpenseForm from "./components/AddExpenseForm";
import ExpenseList from "./components/ExpenseList";
import AddIncomeForm from "./components/AddIncomeForm";
import IncomeList from "./components/IncomeList";

function App() {
    return (
        <Router>
            <div className="App">
                <AppBar position="static">
                    <Toolbar>
                        <Button color="inherit" component={Link} to="/">
                            Home
                        </Button>
                        <Button color="inherit" component={Link} to="/expenses">
                            Expenses
                        </Button>
                        <Button color="inherit" component={Link} to="/incomes">
                            Incomes
                        </Button>
                    </Toolbar>
                </AppBar>
                <Container>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/expenses/*" element={<ExpenseRoutes />} />
                        <Route path="/incomes/*" element={<IncomeRoutes />} />
                    </Routes>
                </Container>
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
