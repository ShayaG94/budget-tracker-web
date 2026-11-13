// utils/sanitizeExpense.js

/**
 * Turn form data into a clean expense payload. Only known fields are kept,
 * so extra form fields can never end up in the database.
 * - "other" category / NOB is replaced by the text typed into the new-value box
 * - the deductable checkbox becomes a boolean
 */
function sanitizeExpense(raw = {}) {
    const text = (v) => (typeof v === "string" ? v.trim() : "");
    const category = raw.category === "other" ? text(raw.newCategory) : text(raw.category);
    const nob = raw.nob === "other" ? text(raw.newNob) : text(raw.nob);

    return {
        title: text(raw.title),
        date: raw.date,
        price: raw.price,
        category,
        nob,
        deductable: raw.deductable === "on" || raw.deductable === true,
    };
}

module.exports = sanitizeExpense;
