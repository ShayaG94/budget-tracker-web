require("dotenv").config();

const express = require("express");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const path = require("path");
const mongoose = require("mongoose");

const homeRoute = require("./routes/home");
const expensesRoutes = require("./routes/expenses");
const formatters = require("./utils/formatters");
const { getCurrentMonthYear } = require("./utils/dates/getCurrentMonthYear");
const { notFound, errorHandler } = require("./utils/errors/handlers");

const PORT = Number(process.env.PORT) || 3030;
const HOST = process.env.HOST || "127.0.0.1";
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/budget-tracker";

mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.disable("x-powered-by");

app.use(express.json({ limit: "300kb" }));
app.use(express.urlencoded({ limit: "300kb", extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.locals.formatters = formatters;
app.locals.getCurrentMonthYear = getCurrentMonthYear;

app.use("/", homeRoute);
app.use("/expenses", expensesRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, HOST, () => {
    console.log(`Budget Tracker: serving on http://${HOST}:${PORT}`);
});
