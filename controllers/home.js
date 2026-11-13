const Expense = require("../models/expense");

/** Total of this month's expenses so far, summed by MongoDB (prices are stored in agorot). */
async function sumMonthToDate() {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); // local time (TZ=Asia/Jerusalem)
    const [result] = await Expense.aggregate([
        { $match: { date: { $gte: startOfMonth, $lte: now } } },
        { $group: { _id: null, total: { $sum: "$price" } } },
    ]);
    return result ? result.total / 100 : 0;
}

module.exports.home = async (req, res) => {
    res.render("home/home", {
        expenses: await sumMonthToDate(),
        incomes: null, // incomes are not tracked yet
    });
};
