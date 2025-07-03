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
