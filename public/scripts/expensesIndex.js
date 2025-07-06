function sumIndexExpenses() {
    const items = document.querySelectorAll(".expense-item");
    const prices = Array.from(items).map((el) => {
        if (el.style.display === "none") return 0; // Skip hidden items
        const expense = JSON.parse(el.dataset.expense);
        return Number(expense.price) || 0;
    });

    const total = prices.reduce((acc, val) => acc + val, 0);

    // Format as ILS (₪)
    const formattedTotal = formattedSum(total);

    // Inject next to title
    const sum = document.querySelector("#totalExpenses");
    if (sum) {
        sum.innerText = formattedTotal;
    }
}

const formattedSum = (sum) => {
    return new Intl.NumberFormat("en-IL", {
        style: "currency",
        currency: "ILS",
    })
        .format(sum)
        .replace(/^(\D+)/, "$1 ")
        .replace(/\s+/, " ");
};
