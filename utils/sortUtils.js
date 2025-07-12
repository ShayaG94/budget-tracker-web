/**
 * Take a Set of primitives and return a sorted Array.
 * @param {Set<string>} set
 * @returns {string[]}
 */
function sortSet(set) {
    return Array.from(set).sort();
}

module.exports = { sortSet };
