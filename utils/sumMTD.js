/**
 * Sums the prices of items whose date falls in the current month up to today.
 *
 * @param {Array<{date: string|Date, price: number}>} items
 * @returns {number}
 */
function sumPricesMTD(items) {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    return items.reduce((total, { date, price }) => {
        const d = new Date(date);
        if (d.getFullYear() === year && d.getMonth() === month && d <= now) {
            return total + price;
        }
        return total;
    }, 0);
}
module.exports = sumPricesMTD;
