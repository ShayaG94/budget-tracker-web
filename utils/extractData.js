const { sortSets } = require("./sortSets");

module.exports.extractCategories = function (expenses) {
    const categories = new Set();

    expenses.forEach((expense) => {
        // If the expense has a "category" property, add it to the set.
        if (expense.category) {
            categories.add(expense.category);
        }
    });

    return sortSets(categories);
};

module.exports.extractNobs = function (expenses) {
    const nobs = new Set();
    expenses.forEach((expense) => {
        if (expense.nob) {
            nobs.add(expense.nob);
        }
    });
    return sortSets(nobs);
};

module.exports.extractAvailableMonths = function (expenses) {
    const formatter = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" });

    const monthSet = new Set();

    expenses.forEach((exp) => {
        const date = new Date(exp.date);
        const monthLabel = formatter.format(date); // "July 2025"
        const sortKey = date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0");
        monthSet.add(JSON.stringify({ label: monthLabel, key: sortKey }));
    });

    const uniqueMonths = Array.from(monthSet).map((str) => JSON.parse(str));

    // Sort descending by sortKey
    uniqueMonths.sort((a, b) => b.key.localeCompare(a.key));

    return uniqueMonths;
};
