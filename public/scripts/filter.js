document.addEventListener("DOMContentLoaded", () => {
    sumIndexExpenses();

    const sortFilterModalEl = document.getElementById("sortFilterModal");
    sortFilterModalEl.addEventListener("hidden.bs.modal", () => {
        document.getElementById("filterButton").focus();
    });

    const priceSlider = document.getElementById("priceSlider");
    const minPriceInput = document.getElementById("minPrice");
    const maxPriceInput = document.getElementById("maxPrice");

    const dynamicMax = Number(priceSlider.dataset.maxPrice || 10000);

    noUiSlider.create(priceSlider, {
        start: [0, dynamicMax],
        connect: true,
        range: { min: 0, max: dynamicMax },
        format: {
            to: (value) => Math.round(value),
            from: (value) => Number(value),
        },
    });

    priceSlider.noUiSlider.on("update", (values, handle) => {
        const value = Number(values[handle]);
        const formatted = value.toLocaleString();
        if (handle === 0) minPriceInput.value = formatted;
        else maxPriceInput.value = formatted;
    });

    minPriceInput.addEventListener("input", () => {
        const value = Number(minPriceInput.value.replace(/,/g, ""));
        if (!isNaN(value)) priceSlider.noUiSlider.set([value, null]);
    });

    maxPriceInput.addEventListener("input", () => {
        const value = Number(maxPriceInput.value.replace(/,/g, ""));
        if (!isNaN(value)) priceSlider.noUiSlider.set([null, value]);
    });

    minPriceInput.addEventListener("blur", () => {
        const value = Number(minPriceInput.value.replace(/,/g, ""));
        if (!isNaN(value)) minPriceInput.value = value.toLocaleString();
    });

    maxPriceInput.addEventListener("blur", () => {
        const value = Number(maxPriceInput.value.replace(/,/g, ""));
        if (!isNaN(value)) maxPriceInput.value = value.toLocaleString();
    });

    const startDateInput = document.getElementById("startDate");
    const endDateInput = document.getElementById("endDate");
    const customDateInputs = document.getElementById("customDateInputs");
    const monthSelector = document.getElementById("monthSelector");

    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const dateRangeNav = document.getElementById("dateRangeNav");

    function formatDate(date) {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, "0");
        const d = String(date.getDate()).padStart(2, "0");
        return `${y}-${m}-${d}`;
    }

    function disableDateInputs() {
        startDateInput.setAttribute("disabled", true);
        endDateInput.setAttribute("disabled", true);
    }

    function enableDateInputs() {
        startDateInput.removeAttribute("disabled");
        endDateInput.removeAttribute("disabled");
    }

    function setYTD() {
        startDateInput.value = formatDate(startOfYear);
        endDateInput.value = formatDate(today);
        disableDateInputs();
        customDateInputs.style.display = "none";
    }

    function setMTD() {
        startDateInput.value = formatDate(startOfMonth);
        endDateInput.value = formatDate(today);
        disableDateInputs();
        customDateInputs.style.display = "none";
    }

    function setCustom() {
        enableDateInputs();
        customDateInputs.style.display = "flex";
    }

    // Handle nav clicks
    dateRangeNav.addEventListener("click", (e) => {
        const target = e.target;
        if (!target.classList.contains("nav-link")) return;
        e.preventDefault();

        document
            .querySelectorAll("#dateRangeNav .nav-link")
            .forEach((link) => link.classList.remove("active"));
        target.classList.add("active");
        monthSelector.selectedIndex = 0;

        const range = target.getAttribute("data-range");
        if (range === "ytd") setYTD();
        else if (range === "mtd") setMTD();
        else if (range === "custom") setCustom();
    });

    // Default: YTD
    setYTD();

    // Month selector logic
    monthSelector.addEventListener("change", () => {
        const selectedMonth = monthSelector.value;
        const [year, month] = selectedMonth.split("-").map(Number);
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        startDateInput.value = formatDate(startDate);
        endDateInput.value = formatDate(endDate);
        monthSelector.classList.add("active-month");

        disableDateInputs();
        customDateInputs.style.display = "none";

        document
            .querySelectorAll("#dateRangeNav .nav-link")
            .forEach((link) => link.classList.remove("active"));
    });

    document.getElementById("selectAllBtn").addEventListener("click", () => {
        document.querySelectorAll(".category-check").forEach((cb) => (cb.checked = true));
    });

    document.getElementById("deselectAllBtn").addEventListener("click", () => {
        document.querySelectorAll(".category-check").forEach((cb) => (cb.checked = false));
    });

    document.querySelectorAll(".only-btn").forEach((button) => {
        button.addEventListener("click", () => {
            const targetCategory = button.getAttribute("data-category");
            document.querySelectorAll(".category-check").forEach((cb) => {
                cb.checked = cb.value === targetCategory;
            });
        });
    });

    document.getElementById("selectAllNobBtn").addEventListener("click", () => {
        document.querySelectorAll(".nob-check").forEach((cb) => (cb.checked = true));
    });

    document.getElementById("deselectAllNobBtn").addEventListener("click", () => {
        document.querySelectorAll(".nob-check").forEach((cb) => (cb.checked = false));
    });

    document.querySelectorAll(".only-nob-btn").forEach((button) => {
        button.addEventListener("click", () => {
            const targetNob = button.getAttribute("data-nob");
            document.querySelectorAll(".nob-check").forEach((cb) => {
                cb.checked = cb.value === targetNob;
            });
        });
    });

    document.getElementById("applyFilterBtn").addEventListener("click", () => {
        const selectedCategories = Array.from(
            document.querySelectorAll(".category-check:checked")
        ).map((cb) => cb.value);

        const selectedNOBs = Array.from(document.querySelectorAll(".nob-check:checked")).map(
            (cb) => cb.value
        );

        const filterStartDate = new Date(startDateInput.value);
        const filterEndDate = new Date(endDateInput.value);

        const minPrice = Number(minPriceInput.value.replace(/,/g, "")) || 0;
        const maxPrice = Number(maxPriceInput.value.replace(/,/g, "")) || Infinity;

        const expenseItems = document.querySelectorAll(".expense-item");

        expenseItems.forEach((item) => {
            const expense = JSON.parse(item.dataset.expense.trim());
            let visible =
                selectedCategories.includes(expense.category) &&
                selectedNOBs.includes(expense.nob) &&
                new Date(expense.date) >= filterStartDate &&
                new Date(expense.date) <= filterEndDate &&
                expense.price >= minPrice &&
                expense.price <= maxPrice;

            item.style.display = visible ? "" : "none";
        });

        const anyVisible = Array.from(expenseItems).some((item) => item.style.display !== "none");
        document.getElementById("noResultsMessage").style.display = anyVisible ? "none" : "";
        sumIndexExpenses();
    });

    document.getElementById("resetFilterBtn").addEventListener("click", () => {
        document.querySelectorAll(".category-check").forEach((cb) => (cb.checked = true));
        document.querySelectorAll(".nob-check").forEach((cb) => (cb.checked = true));

        startDateInput.value = formatDate(startOfYear);
        endDateInput.value = formatDate(today);
        disableDateInputs();

        minPriceInput.value = "0";
        maxPriceInput.value = dynamicMax.toLocaleString();
        priceSlider.noUiSlider.set([0, dynamicMax]);

        document.querySelectorAll(".expense-item").forEach((item) => {
            item.style.display = "";
        });

        document.getElementById("noResultsMessage").style.display = "none";
        sumIndexExpenses();
    });
});
