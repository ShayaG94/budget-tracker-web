import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
    return (
        <div className="home-page">
            <h1>Welcome to your Budget Tracker</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/expenses">Expenses</Link>
                    </li>
                    <li>
                        <Link to="/incomes">Incomes</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default HomePage;
