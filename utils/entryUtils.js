const { sortSet } = require("./sortUtils");

/**
 * Extract all truthy values at `key` from an array of objects,
 * dedupe via a Set, then return a sorted Array.
 * @param {Array<object>} items
 * @param {string} key
 * @returns {string[]}
 */
function extractTags(items, key) {
    const s = new Set();
    for (const obj of items) {
        if (obj[key]) s.add(obj[key]);
    }
    return sortSet(s);
}

/**
 * Shortcut for extractTags(expenses, 'category')
 */
function extractCategories(expenses) {
    return extractTags(expenses, "category");
}

/**
 * Shortcut for extractTags(expenses, 'nob')
 */
function extractNobs(expenses) {
    return extractTags(expenses, "nob");
}

/**
 * Build a descending list of months that have data,
 * formatted as { label: "July 2025", key: "2025-07" }.
 * @param {Array<{date: string|Date}>} items
 * @returns {{label:string, key:string}[]}
 */
function extractAvailableMonths(items) {
    const formatter = new Intl.DateTimeFormat("en-US", {
        month: "long",
        year: "numeric",
    });
    const monthSet = new Set();

    for (const { date } of items) {
        const d = new Date(date);
        const label = formatter.format(d);
        const key = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0");
        monthSet.add(JSON.stringify({ label, key }));
    }

    const uniqueMonths = Array.from(monthSet, JSON.parse);
    uniqueMonths.sort((a, b) => b.key.localeCompare(a.key));

    return uniqueMonths;
}

module.exports = {
    extractTags,
    extractCategories,
    extractNobs,
    extractAvailableMonths,
};
