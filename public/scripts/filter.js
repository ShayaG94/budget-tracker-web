document.addEventListener("DOMContentLoaded", () => {
    sumIndexExpenses();
    // When the Apply Filters button is clicked, force it to lose focus.
    document.getElementById("applyFilterBtn").addEventListener("click", function () {
        this.blur();
    });

    // When the modal finishes hiding, move focus to the filter button (outside the modal).
    const sortFilterModalEl = document.getElementById("sortFilterModal");
    sortFilterModalEl.addEventListener("hidden.bs.modal", () => {
        document.getElementById("filterButton").focus();
    });
    /* ---------------------------
     Price Slider Initialization
  ---------------------------- */
    const priceSlider = document.getElementById("priceSlider");
    const minPriceInput = document.getElementById("minPrice");
    const maxPriceInput = document.getElementById("maxPrice");

    // Create the slider without tooltips.
    const dynamicMax = Number(document.getElementById("priceSlider").dataset.maxPrice || 10000);

    noUiSlider.create(priceSlider, {
        start: [0, dynamicMax],
        connect: true,
        range: { min: 0, max: dynamicMax },
        format: {
            to: (value) => Math.round(value),
            from: (value) => Number(value),
        },
    });

    // Sync slider values to the input fields with thousand separators.
    priceSlider.noUiSlider.on("update", (values, handle) => {
        const value = Number(values[handle]);
        const formatted = value.toLocaleString();
        if (handle === 0) {
            minPriceInput.value = formatted;
        } else {
            maxPriceInput.value = formatted;
        }
    });

    // Update the slider as the user edits the input fields.
    minPriceInput.addEventListener("input", () => {
        const rawValue = minPriceInput.value.replace(/,/g, "");
        const value = Number(rawValue);
        if (!isNaN(value)) {
            priceSlider.noUiSlider.set([value, null]);
        }
    });
    maxPriceInput.addEventListener("input", () => {
        const rawValue = maxPriceInput.value.replace(/,/g, "");
        const value = Number(rawValue);
        if (!isNaN(value)) {
            priceSlider.noUiSlider.set([null, value]);
        }
    });

    // Reformat the input fields on blur
    minPriceInput.addEventListener("blur", () => {
        const rawValue = minPriceInput.value.replace(/,/g, "");
        const value = Number(rawValue);
        if (!isNaN(value)) {
            minPriceInput.value = value.toLocaleString();
        }
    });
    maxPriceInput.addEventListener("blur", () => {
        const rawValue = maxPriceInput.value.replace(/,/g, "");
        const value = Number(rawValue);
        if (!isNaN(value)) {
            maxPriceInput.value = value.toLocaleString();
        }
    });

    /* ---------------------------
     Date Range Setup (YTD)
  ---------------------------- */
    const startDateInput = document.getElementById("startDate");
    const endDateInput = document.getElementById("endDate");
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 1);

    function formatDate(date) {
        const year = date.getFullYear();
        let month = (date.getMonth() + 1).toString().padStart(2, "0");
        let day = date.getDate().toString().padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    startDateInput.value = formatDate(startOfYear);
    endDateInput.value = formatDate(today);

    /* ---------------------------
         Apply Filters
  ---------------------------- */
    document.getElementById("applyFilterBtn").addEventListener("click", () => {
        const selectedCategories = Array.from(
            document.querySelectorAll('#categoryChecklist input[type="checkbox"]:checked')
        ).map((cb) => cb.value);
        const selectedNOBs = Array.from(
            document.querySelectorAll('#nobChecklist input[type="checkbox"]:checked')
        ).map((cb) => cb.value);
        const filterStartDate = new Date(startDateInput.value);
        const filterEndDate = new Date(endDateInput.value);
        // remove all commas before converting
        const rawMin = minPriceInput.value.replace(/,/g, "");
        const rawMax = maxPriceInput.value.replace(/,/g, "");
        const minPrice = Number(rawMin) || 0;
        const maxPrice = Number(rawMax) || Infinity;

        const expenseItems = document.querySelectorAll(".expense-item");
        expenseItems.forEach((item) => {
            const expense = JSON.parse(item.dataset.expense.trim());
            let visible = true;
            if (!selectedCategories.includes(expense.category)) visible = false;
            if (!selectedNOBs.includes(expense.nob)) visible = false;
            const expenseDate = new Date(expense.date);
            if (expenseDate < filterStartDate || expenseDate > filterEndDate) visible = false;
            if (expense.price < minPrice || expense.price > maxPrice) visible = false;
            item.style.display = visible ? "" : "none";
        });

        // After you've shown/hidden each .expense-item:
        const anyVisible = Array.from(expenseItems).some((item) => item.style.display !== "none");
        // If any item is visible, hide the no-results message; otherwise, show it.
        // Show or hide the no-results message:
        document.getElementById("noResultsMessage").style.display = anyVisible ? "none" : "";
        sumIndexExpenses();
    });

    /* ---------------------------
         Reset Filters
  ---------------------------- */
    document.getElementById("resetFilterBtn").addEventListener("click", () => {
        document
            .querySelectorAll('#categoryChecklist input[type="checkbox"]')
            .forEach((cb) => (cb.checked = true));
        document
            .querySelectorAll('#nobChecklist input[type="checkbox"]')
            .forEach((cb) => (cb.checked = true));
        startDateInput.value = formatDate(startOfYear);
        endDateInput.value = formatDate(today);
        minPriceInput.value = 0;
        maxPriceInput.value = 10000;
        priceSlider.noUiSlider.set([0, 10000]);
        document.querySelectorAll(".expense-item").forEach((item) => {
            item.style.display = "";
        });
    });

    const dateRangeNav = document.getElementById("dateRangeNav");

    // Helper function to format a date to yyyy-mm-dd.
    function formatDate(date) {
        const year = date.getFullYear();
        let month = (date.getMonth() + 1).toString().padStart(2, "0");
        let day = date.getDate().toString().padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    // Disable the date inputs.
    function disableDateInputs() {
        endDateInput.setAttribute("disabled", true);
    }

    // Enable manual input.
    function enableDateInputs() {
        startDateInput.removeAttribute("disabled");
        endDateInput.removeAttribute("disabled");
    }

    // Set the YTD date range.
    function setYTD() {
        const today = new Date();
        const startOfYear = new Date(today.getFullYear(), 0, 1);
        startDateInput.value = formatDate(startOfYear);
        endDateInput.value = formatDate(today);
        disableDateInputs();
    }

    // Set the MTD date range.
    function setMTD() {
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        startDateInput.value = formatDate(startOfMonth);
        endDateInput.value = formatDate(today);
        disableDateInputs();
    }

    // Set custom: enable manual modifications.
    function setCustom() {
        enableDateInputs();
    }

    // Event listener for nav button clicks.
    dateRangeNav.addEventListener("click", (e) => {
        e.preventDefault();
        const target = e.target;
        if (target.tagName !== "A") return;

        // Remove active class from all nav links.
        const links = dateRangeNav.querySelectorAll(".nav-link");
        links.forEach((link) => link.classList.remove("active"));

        // Add active class to the clicked link.
        target.classList.add("active");

        // Adjust date fields based on selection.
        const range = target.getAttribute("data-range");
        if (range === "ytd") {
            setYTD();
        } else if (range === "mtd") {
            setMTD();
        } else if (range === "custom") {
            setCustom();
        }
    });

    // By default, set YTD on load.
    setYTD();
});
