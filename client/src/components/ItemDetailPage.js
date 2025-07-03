import React, { useState, useEffect } from "react";
import { Typography, Button, Card, CardContent, CardHeader, Box, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useParams, Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";

// Styled components for a more modern look
const DetailContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
}));

const StyledCard = styled(Card)(({ theme }) => ({
    width: "100%",
    maxWidth: 600,
    borderRadius: theme.shape.borderRadius,
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
    "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
    },
}));

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(2),
    textAlign: "center",
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2),
    padding: theme.spacing(1, 2),
    fontWeight: 600,
    borderRadius: theme.shape.borderRadius,
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
        transform: "scale(1.05)",
    },
}));

const ItemDetailPage = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isExpense, setIsExpense] = useState(false);

    useEffect(() => {
        const fetchItemDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                const isExpenseRoute = window.location.pathname.includes("/expenses/");
                setIsExpense(isExpenseRoute);
                const endpoint = isExpenseRoute ? `http://localhost:8000/expenses/${id}` : `http://localhost:8000/incomes/${id}`;

                const response = await fetch(endpoint);
                if (!response.ok) {
                    throw new Error(`Failed to fetch ${isExpenseRoute ? "expense" : "income"} details`);
                }
                const data = await response.json();
                setItem(data);
            } catch (err) {
                // Removed : any
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchItemDetails();
    }, [id]);

    if (loading) {
        return (
            <DetailContainer>
                <CircularProgress />
                <Typography variant="body1">Loading details...</Typography>
            </DetailContainer>
        );
    }

    if (error) {
        return (
            <DetailContainer>
                <Typography variant="body1" color="error">
                    Error: {error}
                </Typography>
                <Link component={RouterLink} to={isExpense ? "/expenses" : "/incomes"}>
                    <StyledButton variant="contained" color="primary">
                        Back to {isExpense ? "Expenses" : "Incomes"}
                    </StyledButton>
                </Link>
            </DetailContainer>
        );
    }

    if (!item) {
        return (
            <DetailContainer>
                <Typography variant="body1">Item not found.</Typography>
                <Link component={RouterLink} to={isExpense ? "/expenses" : "/incomes"}>
                    <StyledButton variant="contained" color="primary">
                        Back to {isExpense ? "Expenses" : "Incomes"}
                    </StyledButton>
                </Link>
            </DetailContainer>
        );
    }

    return (
        <DetailContainer>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <StyledCard>
                    <StyledCardHeader title={isExpense ? "Expense Details" : "Income Details"} />
                    <StyledCardContent>
                        <Typography variant="h6">Source: {item.source}</Typography>
                        <Typography variant="body1">Amount: ${item.amount}</Typography>
                        <Typography variant="body1">Date: {new Date(item.date).toLocaleDateString()}</Typography>
                        {item.description && <Typography variant="body1">Description: {item.description}</Typography>}
                        <Link component={RouterLink} to={isExpense ? "/expenses" : "/incomes"}>
                            <StyledButton variant="contained" color="primary">
                                Back to {isExpense ? "Expenses" : "Incomes"}
                            </StyledButton>
                        </Link>
                    </StyledCardContent>
                </StyledCard>
            </motion.div>
        </DetailContainer>
    );
};

export default ItemDetailPage;
