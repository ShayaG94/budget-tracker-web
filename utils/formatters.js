module.exports.formatCurrencyILS = (number) => {
    if (typeof number !== "number" || isNaN(number)) {
        // Handle cases where the input is not a valid number
        return "N/A"; // Or throw an error, or return a default value
    }
    return new Intl.NumberFormat("en-IL", {
        style: "currency",
        currency: "ILS",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })
        .format(number)
        .replace(/^(\D+)/, "$1 ")
        .replace(/\s+/, " ");
};

module.exports.formatDate = (date) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        console.warn(
            "Invalid Date object provided to formatDateToDDMMYYYY. Returning empty string."
        );
        return "";
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};
