// Initially set sort order to ascending.
let sortAscending = true;

document.getElementById("sortButton").addEventListener("click", function () {
    // Get all expense items as an array.
    const expenseItems = Array.from(document.querySelectorAll(".expense-item"));

    expenseItems.sort((a, b) => {
        // Parse the JSON from the dataset attribute.
        const expenseA = JSON.parse(a.dataset.expense.trim());
        const expenseB = JSON.parse(b.dataset.expense.trim());

        // Create Date objects; adjust 'date' if your property is named differently.
        const dateA = new Date(expenseA.date);
        const dateB = new Date(expenseB.date);

        // Compare dates in ascending or descending order.
        return sortAscending ? dateA - dateB : dateB - dateA;
    });

    // Re-append sorted elements to the parent container.
    const parent = expenseItems[0].parentNode;
    expenseItems.forEach((item) => parent.appendChild(item));

    // Toggle the icon rotation by toggling the "flipped" CSS class.
    const sortIcon = this.querySelector("i");
    sortIcon.classList.toggle("flipped");

    // Switch the sort order for the next click.
    sortAscending = !sortAscending;
});
