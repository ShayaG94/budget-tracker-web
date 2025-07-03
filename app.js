const express = require("express");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const path = require("path");
const mongoose = require("mongoose");

const homeRoute = require("./routes/home");
const expensesRoutes = require("./routes/expenses");

const formatters = require("./utils/formatters");
const getCurrentMonthYear = require("./utils/dates/getCurrentMonthYear");

const dbURL = "mongodb://localhost:27017/budget-tracker";

mongoose.set("strictQuery", true);
mongoose.connect(dbURL);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("vies", path.join(__dirname, "views"));

app.use(express.json({ limit: "300kb" }));
app.use(express.urlencoded({ limit: "300kb", extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.locals.formatters = formatters;
app.locals.getCurrentMonthYear = getCurrentMonthYear.getCurrentMonthYear;

app.use("/", homeRoute);
app.use("/expenses", expensesRoutes);

app.listen(3000, "0.0.0.0", () => {
    console.log("Budget Tracker: Serving on PORT 3000");
});
