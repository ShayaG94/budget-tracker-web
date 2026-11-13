/**
 * Money helpers. Amounts are stored in the database as whole agorot
 * (1 shekel = 100 agorot) so sums never pick up floating-point errors.
 */

/** Shekels (number or numeric string) -> integer agorot. Leaves invalid input for Mongoose to reject. */
function toAgorot(value) {
    if (value === null || value === undefined || value === "") return value;
    const n = Number(value);
    return Number.isFinite(n) ? Math.round(n * 100) : value;
}

/** Integer agorot -> shekels. */
function fromAgorot(value) {
    return typeof value === "number" ? value / 100 : value;
}

module.exports = { toAgorot, fromAgorot };
