import React, { useState, useEffect } from "react";
import { Typography, Button, Card, CardContent, CardHeader, Box, Link, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";

// Styled components for a more modern look
const ListContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(4),
}));

const StyledCard = styled(Card)(({ theme }) => ({
    width: "100%",
    maxWidth: 600,
    borderRadius: 12,
    boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.08)",
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
    "&:hover": {
        transform: "translateY(-6px)",
        boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.12)",
    },
    marginBottom: theme.spacing(3),
    backgroundColor: "white",
}));

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
    backgroundColor: theme.palette.error.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(2.5),
    textAlign: "center",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginBottom: theme.spacing(1),
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
    padding: theme.spacing(3),
}));

const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(3),
    padding: theme.spacing(1.5, 3),
    fontWeight: 600,
    borderRadius: 10,
    transition: "transform 0.2s ease-in-out, background-color 0.3s ease",
    "&:hover": {
        transform: "scale(1.03)",
        backgroundColor: theme.palette.error.dark,
    },
    backgroundColor: theme.palette.error.main,
    color: theme.palette.primary.contrastText,
}));

const ListItem = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: theme.spacing(2, 0),
    borderBottom: `1px solid ${theme.palette.divider}`,
    "&:last-child": {
        borderBottom: "none",
    },
    gap: theme.spacing(1),
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.04)",
    },
}));

const Amount = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    color: theme.palette.error.main,
}));

const ExpenseList = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExpenses = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch("http://localhost:8000/expenses");
                if (!response.ok) {
                    throw new Error("Failed to fetch expenses");
                }
                const data = await response.json();
                setExpenses(data);
            } catch (err) {
                // Removed : any
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchExpenses();
    }, []);

    if (loading) {
        return (
            <ListContainer>
                <CircularProgress style={{ marginTop: "2rem" }} />
                <Typography variant="body1" style={{ marginTop: "1rem" }}>
                    Loading expenses...
                </Typography>
            </ListContainer>
        );
    }

    if (error) {
        return (
            <ListContainer>
                <Typography variant="body1" color="error" style={{ marginTop: "2rem" }}>
                    Error: {error}
                </Typography>
            </ListContainer>
        );
    }

    // Function to format date as dd/mm/yyyy
    const formatDate = (dateString) => {
        // Removed : string
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <ListContainer>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <StyledCard>
                    <StyledCardHeader title="Expenses" />
                    <StyledCardContent>
                        {expenses.length === 0 ? (
                            <Typography variant="body1" color="text.secondary" style={{ fontStyle: "italic" }}>
                                No expenses found.
                            </Typography>
                        ) : (
                            <div>
                                {expenses.map((expense) => {
                                    return (
                                        <Link
                                            key={expense._id}
                                            component={RouterLink}
                                            to={`/expenses/${expense._id}`}
                                            style={{
                                                textDecoration: "none",
                                                color: "inherit",
                                            }}
                                        >
                                            <ListItem>
                                                <Box>
                                                    <Typography variant="body1">{expense.source}</Typography>
                                                    <Typography variant="body2">Date: {formatDate(expense.date)}</Typography>
                                                    <Typography variant="body2">Store: {expense.store}</Typography>
                                                    <Typography variant="body2">Category: {expense.category}</Typography>
                                                </Box>
                                                <Amount>₪{expense.amount}</Amount>
                                            </ListItem>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                        <Link component={RouterLink} to="/add-expense">
                            <StyledButton variant="contained">Add Expense</StyledButton>
                        </Link>
                    </StyledCardContent>
                </StyledCard>
            </motion.div>
        </ListContainer>
    );
};

export default ExpenseList;
