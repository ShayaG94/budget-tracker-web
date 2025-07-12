/**
 * Given a list of entries with a .date (Date) and .price (Number),
 * compute:
 *  - maxPrice: highest price (or 0 if none)
 *  - sum: sum of all prices
 *  - totalDays: days between newest and oldest date
 */
function computeStats(entries) {
    if (!Array.isArray(entries) || entries.length === 0) {
        return { maxPrice: 0, sum: 0, totalDays: 0 };
    }

    // Prices
    const prices = entries.map((e) => e.price || 0);
    const maxPrice = Math.max(...prices, 0);
    const sum = prices.reduce((acc, p) => acc + p, 0);

    // Dates (entries sorted descending by date assumed)
    const newest = new Date(entries[0].date);
    const oldest = new Date(entries[entries.length - 1].date);
    const totalDays = Math.floor((newest - oldest) / (1000 * 60 * 60 * 24));

    return { maxPrice, sum, totalDays };
}

module.exports = { computeStats };
