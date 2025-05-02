import React, { useState, useEffect } from "react";
import { Typography, Button, Card, CardContent, CardHeader, Box, Link } from "@mui/material";
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
    borderRadius: theme.shape.borderRadius,
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
    "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
    },
    marginBottom: theme.spacing(2),
}));

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
    backgroundColor: theme.palette.success.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(2),
    textAlign: "center",
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
    padding: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1, 2),
    fontWeight: 600,
    borderRadius: theme.shape.borderRadius,
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
        transform: "scale(1.05)",
    },
}));

const ListItem = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(1, 0),
    borderBottom: `1px solid rgba(0, 0, 0, 0.1)`,
    "&:last-child": {
        borderBottom: "none",
    },
}));

const IncomeList = () => {
    const [incomes, setIncomes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchIncomes = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch("http://localhost:8000/incomes");
                if (!response.ok) {
                    throw new Error("Failed to fetch incomes");
                }
                const data = await response.json();
                setIncomes(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchIncomes();
    }, []);

    if (loading) {
        return <Typography variant="body1">Loading incomes...</Typography>;
    }

    if (error) {
        return <Typography variant="body1">Error: {error}</Typography>;
    }

    return (
        <ListContainer>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <StyledCard>
                    <StyledCardHeader title="Incomes" />
                    <StyledCardContent>
                        {incomes.length === 0 ? (
                            <Typography variant="body1">No incomes found.</Typography>
                        ) : (
                            <div>
                                {incomes.map((income) => (
                                    <ListItem key={income.id}>
                                        <Typography variant="body1">
                                            <Link
                                                component={RouterLink}
                                                to={`/incomes/${income.id}`}
                                                style={{ textDecoration: "none", color: "inherit" }}
                                            >
                                                {income.source}
                                            </Link>
                                        </Typography>
                                        <Typography variant="body1">${income.amount}</Typography>
                                        <Link component={RouterLink} to={`/incomes/${income.id}`} style={{ textDecoration: "none" }}>
                                            <StyledButton variant="outlined" size="small" color="primary">
                                                View Details
                                            </StyledButton>
                                        </Link>
                                    </ListItem>
                                ))}
                            </div>
                        )}
                        <Link component={RouterLink} to="/add-income">
                            <StyledButton variant="contained" color="primary">
                                Add Income
                            </StyledButton>
                        </Link>
                    </StyledCardContent>
                </StyledCard>
            </motion.div>
        </ListContainer>
    );
};

export default IncomeList;
