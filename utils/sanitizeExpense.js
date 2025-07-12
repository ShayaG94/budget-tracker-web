// utils/sanitizeExpense.js

/**
 * Turn form data into a clean expense payload.
 * - convert deductable checkbox
 * - replace "other" category/NOB with the new text
 * - strip out the temporary newCategory/newNob props
 */
function sanitizeExpense(raw) {
    const exp = { ...raw };
    exp.deductable = raw.deductable === "on";

    if (raw.category === "other" && raw.newCategory) {
        exp.category = raw.newCategory;
    }
    if (raw.nob === "other" && raw.newNob) {
        exp.nob = raw.newNob;
    }

    delete exp.newCategory;
    delete exp.newNob;
    return exp;
}

module.exports = sanitizeExpense;
