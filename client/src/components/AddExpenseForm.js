import React, { useState } from "react";
import { Typography, Button, TextField, Grid, Box, Card, CardContent, CardHeader } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";

// Styled components for a more modern look
const FormContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(4),
}));

const StyledFormCard = styled(Card)(({ theme }) => ({
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

const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(1.5, 3),
    fontWeight: 600,
    borderRadius: theme.shape.borderRadius,
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
        transform: "scale(1.05)",
    },
}));

const FormInputField = styled(TextField)(({ theme }) => ({
    margin: theme.spacing(1.5, 0),
    "& label": {
        fontWeight: 500,
        color: theme.palette.text.secondary,
    },
    "& .MuiInputBase-root": {
        borderRadius: theme.shape.borderRadius,
        backgroundColor: "white",
    },
    "& .MuiInputBase-input": {
        padding: theme.spacing(1.5),
    },
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgba(0, 0, 0, 0.1)",
    },
    "&:focus-within .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.primary.main,
        boxShadow: "0 0 0 2px rgba(0, 123, 255, 0.25)",
    },
}));

const MessageText = styled(Typography)(({ theme }) => ({
    marginTop: theme.spacing(2),
    padding: theme.spacing(1.5),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: (props) => (props.variant === "success" ? "rgba(0, 200, 83, 0.1)" : "rgba(255, 0, 0, 0.1)"),
    color: (props) => (props.variant === "success" ? "#00c853" : "#ff0000"),
    fontWeight: 600,
    textAlign: "center",
    border: (props) => (props.variant === "success" ? "1px solid rgba(0, 200, 83, 0.3)" : "1px solid rgba(255, 0, 0, 0.3)"),
}));

// Animation variants
const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } },
};

function AddExpenseForm() {
    const [formData, setFormData] = useState({
        date: "",
        store: "",
        category: "",
        description: "",
        amount: "",
    });
    const [message, setMessage] = useState("");

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage("");

        try {
            const response = await fetch("http://localhost:8000/expenses/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const responseData = await response.json();

            if (response.ok) {
                setMessage("Expense added successfully!");
                setFormData({
                    date: "",
                    store: "",
                    category: "",
                    description: "",
                    amount: "",
                });
            } else {
                setMessage(`Error adding expense: ${responseData.detail || "Something went wrong"}`);
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <FormContainer>
            <motion.div variants={formVariants} initial="hidden" animate="visible">
                <StyledFormCard>
                    <StyledCardHeader title="Add New Expense" />
                    <CardContent>
                        <form id="addExpenseForm" onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <FormInputField
                                        id="date"
                                        label="Date"
                                        name="date"
                                        type="date"
                                        required
                                        value={formData.date}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormInputField
                                        id="store"
                                        label="Store"
                                        name="store"
                                        type="text"
                                        required
                                        value={formData.store}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormInputField
                                        id="category"
                                        label="Category"
                                        name="category"
                                        type="text"
                                        required
                                        value={formData.category}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormInputField
                                        id="amount"
                                        label="Amount"
                                        name="amount"
                                        type="number"
                                        step="0.01"
                                        required
                                        value={formData.amount}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormInputField
                                        id="description"
                                        label="Description (Optional)"
                                        name="description"
                                        type="text"
                                        value={formData.description}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                            <StyledButton type="submit" variant="contained" color="primary">
                                Add Expense
                            </StyledButton>
                        </form>
                        {message && <MessageText variant={message.startsWith("Error") ? "error" : "success"}>{message}</MessageText>}
                    </CardContent>
                </StyledFormCard>
            </motion.div>
        </FormContainer>
    );
}

export default AddExpenseForm;
